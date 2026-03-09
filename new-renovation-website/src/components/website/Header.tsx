'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'

type NavItem = {
  name: string
  href: string
  submenu?: { name: string; href: string }[]
}

const navigation: NavItem[] = [
  {
    name: '企業情報',
    href: '/corporate',
    submenu: [
      { name: '会社概要', href: '/corporate/about' },
      { name: '企業理念', href: '/corporate/philosophy' },
      { name: '沿革', href: '/corporate/history' },
    ],
  },
  {
    name: '事業案内',
    href: '/services',
    submenu: [
      { name: '内装工事', href: '/services/interior' },
      { name: 'リフォーム', href: '/services/reform' },
      { name: 'バリアフリー', href: '/services/barrier-free' },
      { name: '店舗デザイン', href: '/services/shop-design' },
      { name: '色彩・デザイン提案', href: '/services/color-design' },
    ],
  },
  { name: '施工実績', href: '/portfolio' },
  {
    name: 'お客様へ',
    href: '/technology',
    submenu: [
      { name: 'ゼヒトモご利用の方', href: '/lp/zehitomo' },
      { name: 'AI活用', href: '/technology/ai' },
      { name: '職人ネットワーク・マップログ', href: '/technology/craftsmen' },
      { name: '品質管理', href: '/technology/quality' },
    ],
  },
  { name: 'お知らせ', href: '/news' },
  { name: 'AIタクミ', href: '/chat' },
  { name: 'お問い合わせ', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set())
  const menuRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)

  // スクロール進捗バー
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const scrollableHeight = documentHeight - windowHeight
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0
      setScrollProgress(progress)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // メニュー開閉時の body scroll 制御
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      firstFocusableRef.current?.focus()
      // タクミ（DigitalHuman）を閉じるイベント
      window.dispatchEvent(new CustomEvent('closeTakumi'))
    } else {
      document.body.style.overflow = ''
      setExpandedMenus(new Set())
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Escapeキーでメニューを閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  const toggleSubmenu = (name: string) => {
    setExpandedMenus(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const handleMenuItemClick = () => setMobileMenuOpen(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[200] w-full bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#DAE2E8] shadow-sm">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative w-[180px] h-12">
                  <Image
                    src="/iwasaki-logo-new.png"
                    alt="イワサキ内装 ロゴ"
                    fill
                    className="object-contain object-left"
                    priority
                    sizes="180px"
                  />
                </div>
              </Link>
              {/* 色彩設計タグライン */}
              <div className="hidden xl:flex items-center ml-4 pl-4 border-l border-[#DAE2E8]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#E8B4B8] via-[#A8D5BA] to-[#B8C5E8]"></div>
                  <span className="text-xs text-[#252423]/70 font-medium">色彩設計 × 確かな施工</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:gap-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="group relative">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-x-1 text-sm font-medium leading-6 text-[#252423] hover:text-[#10B981] transition-colors py-2"
                  >
                    {item.name}
                    {item.submenu && <ChevronDown className="h-4 w-4" />}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.submenu && (
                    <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                      <div className="bg-[#FFFFFF]/95 backdrop-blur-md shadow-xl border border-[#DAE2E8] py-3 w-64 rounded-md">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="block px-6 py-4 text-sm text-[#252423] hover:bg-[#10B981]/10 hover:text-[#10B981] transition-colors mx-2 rounded-md"
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                ref={firstFocusableRef}
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#252423] hover:bg-[#DAE2E8] transition-colors z-[210] relative"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* スクロール進捗インジケーター（header内） */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DAE2E8]/20">
          <div
            className="absolute left-0 top-0 h-full bg-[#D4AF37] transition-all duration-100"
            style={{ width: `${scrollProgress / 2}%` }}
          />
          <div
            className="absolute right-0 top-0 h-full bg-[#D4AF37] transition-all duration-100"
            style={{ width: `${scrollProgress / 2}%` }}
          />
        </div>
      </header>

      {/* Mobile menu: headerの外で描画（タクミより高いz-index） */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-[300] bg-[#252423]/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <div
            ref={menuRef}
            className="fixed top-20 left-0 bottom-0 z-[310] w-[85%] max-w-sm bg-white shadow-2xl lg:hidden origin-top-left"
            role="dialog"
            aria-modal="true"
            aria-label="ナビゲーションメニュー"
          >
            <nav className="h-full overflow-y-auto">
              <div className="px-4 py-6 space-y-1">
                {navigation.map((item) => (
                  <div key={item.name} className="border-b border-[#DAE2E8] last:border-0">
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() => toggleSubmenu(item.name)}
                          className="w-full flex items-center justify-between px-4 py-4 text-left text-base font-medium text-[#252423] hover:bg-[#10B981]/5 active:bg-[#10B981]/10 transition-colors rounded-lg"
                          aria-expanded={expandedMenus.has(item.name)}
                        >
                          <span>{item.name}</span>
                          <ChevronRight
                            className={`h-5 w-5 text-[#10B981] transition-transform duration-200 ${expandedMenus.has(item.name) ? 'rotate-90' : ''}`}
                          />
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedMenus.has(item.name) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          <div className="pl-4 pb-2 space-y-1">
                            {item.submenu.map((subitem) => (
                              <Link
                                key={subitem.name}
                                href={subitem.href}
                                onClick={handleMenuItemClick}
                                className="block px-4 py-3 text-sm text-[#252423] hover:bg-[#10B981]/5 active:bg-[#10B981]/10 hover:text-[#10B981] transition-colors rounded-lg"
                              >
                                {subitem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={handleMenuItemClick}
                        className="block px-4 py-4 text-base font-medium text-[#252423] hover:bg-[#10B981]/5 active:bg-[#10B981]/10 hover:text-[#10B981] transition-colors rounded-lg"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </nav>
          </div>
        </>
      )}

      {/* 固定ヘッダー分のスペーサー */}
      <div className="h-20" aria-hidden="true" />
    </>
  )
}
