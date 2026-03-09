'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const CorkJijiiTV = dynamic(
    () => import('@/components/website/CorkJijiiTV'),
    { ssr: false }
)

export default function TVPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white flex flex-col">
            {/* ミニヘッダー */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-stone-200 px-6 py-3 flex items-center justify-between">
                <Link href="/crew" className="text-stone-600 hover:text-amber-600 transition-colors text-sm font-medium">
                    Back to Crew
                </Link>
                <span className="text-stone-400 text-xs tracking-wider">CORK JIJII TV</span>
            </div>

            {/* TV フルスクリーン */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-5xl">
                    <CorkJijiiTV />
                </div>
            </div>

            {/* フッター */}
            <div className="bg-gradient-to-r from-amber-50 to-emerald-50 border-t border-stone-200 px-6 py-4 text-center">
                <p className="text-stone-500 text-xs tracking-wide">
                    Cork Jijii TV — Live from Iwasaki Naisou
                </p>
            </div>
        </div>
    )
}
