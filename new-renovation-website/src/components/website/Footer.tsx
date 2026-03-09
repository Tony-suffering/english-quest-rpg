import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const footerNavigation = {
    company: [
      { name: '会社概要', href: '/corporate/about' },
      { name: '企業理念', href: '/corporate/philosophy' },
      { name: '沿革', href: '/corporate/history' },
    ],
    services: [
      { name: '内装工事', href: '/services/interior' },
      { name: 'リフォーム', href: '/services/reform' },
      { name: 'バリアフリー', href: '/services/barrier-free' },
      { name: '店舗デザイン', href: '/services/shop-design' },
    ],
    support: [
      { name: 'お知らせ', href: '/news' },
      { name: 'お問い合わせ', href: '/contact' },
      { name: 'プライバシーポリシー', href: '/privacy' },
    ],
    social: [
      { name: 'Facebook', href: '#', icon: Facebook },
      { name: 'Twitter', href: '#', icon: Twitter },
      { name: 'Instagram', href: '#', icon: Instagram },
      { name: 'LinkedIn', href: '#', icon: Linkedin },
    ],
  }

  return (
    <footer className="bg-[#252423]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="text-2xl font-bold text-[#FFFFFF]">
              イワサキ内装
            </div>
            <p className="text-sm leading-6 text-[#DAE2E8]">
              地域に根差した内装工事で、<br />
              安心と満足をお届けします。
            </p>
            <div className="flex space-x-6">
              {footerNavigation.social.map((item) => {
                const Icon = item.icon
                return (
                  <a key={item.name} href={item.href} className="text-[#DAE2E8] hover:text-[#82EDA6] transition-colors">
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-[#FFFFFF]">企業情報</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-[#DAE2E8] hover:text-[#82EDA6] transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-[#FFFFFF]">事業案内</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.services.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-[#DAE2E8] hover:text-[#82EDA6] transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-[#FFFFFF]">サポート</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.support.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-[#DAE2E8] hover:text-[#82EDA6] transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-[#FFFFFF]/10 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs leading-5 text-[#DAE2E8]">
              &copy; {new Date().getFullYear()} 有限会社イワサキ内装 All rights reserved.
            </p>
            <Link href="/journal" className="text-[8px] text-[#DAE2E8]/30 hover:text-[#DAE2E8]/50 transition-colors">
              開発記録
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
