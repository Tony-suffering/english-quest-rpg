'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight } from 'lucide-react'

type NavItem = {
    name: string
    href: string
    submenu?: { name: string; href: string }[]
}

const navigation: NavItem[] = [
    {
        name: 'コンセプト',
        href: '/concept',
        submenu: [
            { name: '問題提起', href: '/concept#problem' },
            { name: '7つの構造ルール', href: '/concept#rules' },
            { name: '10の会話パターン', href: '/concept#patterns' },
            { name: 'RPGの設計思想', href: '/concept#philosophy' },
        ],
    },
    {
        name: 'トレーニング',
        href: '/training-guide',
        submenu: [
            { name: 'スロットマシン', href: '/training-guide#slot' },
            { name: 'パズルバトル', href: '/training-guide#battle' },
            { name: 'マリオランナー', href: '/training-guide#runner' },
            { name: 'チェーン / フィーバー', href: '/training-guide#chain' },
            { name: 'カードコレクション', href: '/training-guide#collection' },
            { name: 'アリーナ', href: '/training-guide#arena' },
        ],
    },
    {
        name: 'コンテンツ',
        href: '/content-guide',
        submenu: [
            { name: 'Memoria', href: '/content-guide#memoria' },
            { name: 'Requiem', href: '/content-guide#requiem' },
            { name: '俺語録', href: '/content-guide#goroku' },
            { name: 'Pro', href: '/content-guide#pro' },
            { name: 'Quest', href: '/content-guide#quest' },
            { name: '英会話Lab', href: '/content-guide#lab' },
        ],
    },
    {
        name: 'システム',
        href: '/system-guide',
        submenu: [
            { name: 'カード進化', href: '/system-guide#cards' },
            { name: 'エレメント', href: '/system-guide#elements' },
            { name: '日レベル', href: '/system-guide#daily' },
            { name: 'プレイヤーレベル', href: '/system-guide#player' },
            { name: 'サウンド', href: '/system-guide#sound' },
        ],
    },
    {
        name: 'テクノロジー',
        href: '/tech',
    },
    {
        name: 'アプリを開く',
        href: '/english/training',
    },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set())
    const menuRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()

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

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
            setExpandedMenus(new Set())
        }
        return () => { document.body.style.overflow = '' }
    }, [mobileMenuOpen])

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

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-[200] w-full transition-all duration-500 ease-in-out ${scrollProgress > 0 ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm' : 'bg-transparent border-b border-transparent'}`}
            >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-50" />

                <div
                    className="absolute bottom-0 left-0 h-[1px] z-[201] transition-all duration-[50ms] ease-out will-change-[width] opacity-70"
                    style={{ width: `${scrollProgress}%` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37] to-[#FFF] shadow-[0_0_15px_#D4AF37]" />
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-[2px] bg-gradient-to-l from-white via-[#F4CF57] to-transparent blur-[0.5px]" />
                </div>

                <nav className="mx-auto max-w-[1440px] px-6 lg:px-12" aria-label="Top">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center group cursor-pointer">
                            <Link href="/" className="flex flex-col items-center justify-center">
                                <span className="font-serif text-xl md:text-2xl tracking-[0.15em] text-[#252423] group-hover:text-[#D4AF37] transition-colors duration-500">
                                    TONIO LAB
                                </span>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="h-[1px] w-3 bg-[#D4AF37]/50" />
                                    <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-[#252423]/60 font-medium">とにおラボ</span>
                                    <span className="h-[1px] w-3 bg-[#D4AF37]/50" />
                                </div>
                            </Link>
                        </div>

                        <div className="hidden lg:flex lg:gap-x-6 items-center">
                            {navigation.map((item) => (
                                <div key={item.name} className="group relative h-16 flex items-center">
                                    <Link
                                        href={item.href}
                                        className={`relative inline-flex items-center gap-x-1 text-[11px] font-medium tracking-[0.1em] transition-colors duration-300 uppercase ${
                                            isActive(item.href) ? 'text-[#D4AF37]' : 'text-[#252423] hover:text-[#D4AF37]'
                                        } ${item.name === 'アプリを開く' ? 'px-4 py-1.5 bg-[#252423] text-white hover:bg-[#D4AF37] hover:text-white rounded-none' : ''}`}
                                    >
                                        <span className="relative z-10">{item.name}</span>
                                        {item.submenu && <ChevronDown className="h-3 w-3 opacity-30 group-hover:opacity-100 transition-opacity" />}
                                        {item.name !== 'アプリを開く' && (
                                            <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1px] bg-[#D4AF37] transition-all duration-300 ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                        )}
                                    </Link>

                                    {item.submenu && (
                                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-64 pt-2 hidden group-hover:block transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                                            <div className="relative bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-[#D4AF37]/10 py-3 rounded-sm overflow-hidden">
                                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/50 to-[#D4AF37]/0" />
                                                {item.submenu.map((subitem) => (
                                                    <Link
                                                        key={subitem.name}
                                                        href={subitem.href}
                                                        className="block px-6 py-3 text-xs tracking-wider text-[#252423]/80 hover:bg-[#D4AF37]/5 hover:text-[#D4AF37] transition-all border-l-2 border-transparent hover:border-[#D4AF37]"
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

                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#252423] hover:text-[#D4AF37] transition-colors z-[210] relative"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-expanded={mobileMenuOpen}
                                aria-label="Menu"
                            >
                                <div className="space-y-1.5 cursor-pointer group">
                                    <span className={`block w-6 h-[2px] bg-current transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                                    <span className={`block w-4 h-[2px] bg-current ml-auto transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'group-hover:w-6'}`} />
                                    <span className={`block w-6 h-[2px] bg-current transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                                </div>
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {mobileMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 z-[300] bg-[#252423]/60 backdrop-blur-sm lg:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-hidden="true"
                    />
                    <div
                        ref={menuRef}
                        className="fixed top-16 left-0 bottom-0 z-[310] w-[85%] max-w-sm bg-white shadow-2xl lg:hidden"
                        role="dialog"
                        aria-modal="true"
                    >
                        <nav className="h-full overflow-y-auto">
                            <div className="px-4 py-6 space-y-1">
                                {navigation.map((item) => (
                                    <div key={item.name} className="border-b border-[#DAE2E8] last:border-0">
                                        {item.submenu ? (
                                            <div>
                                                <button
                                                    onClick={() => toggleSubmenu(item.name)}
                                                    className={`w-full flex items-center justify-between px-4 py-4 text-left text-base font-medium transition-colors rounded-lg ${isActive(item.href) ? 'text-[#D4AF37]' : 'text-[#252423] hover:bg-[#D4AF37]/5'}`}
                                                    aria-expanded={expandedMenus.has(item.name)}
                                                >
                                                    <span>{item.name}</span>
                                                    <ChevronRight className={`h-5 w-5 text-[#D4AF37] transition-transform duration-200 ${expandedMenus.has(item.name) ? 'rotate-90' : ''}`} />
                                                </button>
                                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedMenus.has(item.name) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                    <div className="pl-4 pb-2 space-y-1">
                                                        <Link href={item.href} onClick={handleMenuItemClick} className="block px-4 py-3 text-sm text-[#252423]/60 hover:text-[#D4AF37] transition-colors rounded-lg">
                                                            {item.name} TOP
                                                        </Link>
                                                        {item.submenu.map((subitem) => (
                                                            <Link key={subitem.name} href={subitem.href} onClick={handleMenuItemClick} className="block px-4 py-3 text-sm text-[#252423] hover:bg-[#D4AF37]/5 hover:text-[#D4AF37] transition-colors rounded-lg">
                                                                {subitem.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <Link href={item.href} onClick={handleMenuItemClick} className={`block px-4 py-4 text-base font-medium transition-colors rounded-lg ${isActive(item.href) ? 'text-[#D4AF37]' : 'text-[#252423] hover:bg-[#D4AF37]/5 hover:text-[#D4AF37]'}`}>
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

            <div className="h-16" aria-hidden="true" />
        </>
    )
}
