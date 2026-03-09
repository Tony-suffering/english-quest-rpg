'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import ThreeBackground from '@/components/website/ThreeBackground'
import FloatingElements from '@/components/website/FloatingElements'
import PhilosophyCarousel from '@/components/website/PhilosophyCarousel'

// New Components
import HeroSection from '@/components/website/home/HeroSection'
import ServicesSection from '@/components/website/home/ServicesSection'
import PortfolioSection from '@/components/website/home/PortfolioSection'
import HistorySection from '@/components/website/home/HistorySection'
import StrengthsSection from '@/components/website/home/StrengthsSection'
import TopicsSection from '@/components/website/home/TopicsSection'
import AiDxSection from '@/components/website/home/AiDxSection'
import CtaSection from '@/components/website/home/CtaSection'

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // モバイル判定（初回のみ、SSR対応）
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden relative">
      {!isMobile && <ThreeBackground />}
      <FloatingElements glowTrigger={false} />
      <Header />

      {/* Hero */}
      <HeroSection />

      {/* 企業理念カルーセル */}
      <PhilosophyCarousel />

      {/* Services */}
      <ServicesSection />

      {/* 施工実績ギャラリー */}
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
  )
}
