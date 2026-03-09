'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, MapPin, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type WorkRecord = {
  id: string
  site_name: string
  work_date: string
  location_name?: string
  before_photo_url: string
  after_photo_url: string
}

export default function StatsPage() {
  const [records, setRecords] = useState<WorkRecord[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // クライアントサイドでのみlocalStorageにアクセス
    if (typeof window !== 'undefined') {
      try {
        const loaded = JSON.parse(localStorage.getItem('work_records') || '[]')
        setRecords(loaded)
      } catch (error) {
        console.error('Failed to load work records:', error)
        setRecords([])
      }
    }
  }, [])

  // ハイドレーションエラーを防ぐため、マウント前は何も表示しない
  if (!mounted) {
    return null
  }

  // 年別統計
  const yearlyStats: { [year: number]: number } = {}
  records.forEach(r => {
    const year = new Date(r.work_date).getFullYear()
    yearlyStats[year] = (yearlyStats[year] || 0) + 1
  })

  // エリア別統計(location_nameから抽出)
  const areaStats: { [area: string]: number } = {}
  records.forEach(r => {
    if (r.location_name) {
      const match = r.location_name.match(/(.+区)/)
      const area = match ? match[1] : 'その他'
      areaStats[area] = (areaStats[area] || 0) + 1
    }
  })

  const maxYearly = Math.max(...Object.values(yearlyStats), 1)
  const maxArea = Math.max(...Object.values(areaStats), 1)

  const stats = {
    total: records.length,
    thisYear: records.filter(r => new Date(r.work_date).getFullYear() === new Date().getFullYear()).length,
    thisMonth: records.filter(r => {
      const date = new Date(r.work_date)
      const now = new Date()
      return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()
    }).length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-[#DAE2E8] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/my-map" className="flex items-center gap-2 text-[#252423] font-black">
              <ArrowLeft className="w-5 h-5" />
              マップに戻る
            </Link>
            <h1 className="text-lg font-black text-[#252423]">あなたの実績統計</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* サマリーカード */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border-2 border-[#10B981] p-6 text-center">
            <div className="text-4xl font-black text-[#10B981] mb-2">{stats.total}</div>
            <div className="text-sm text-[#252423] font-bold">総実績</div>
          </div>
          <div className="bg-white border-2 border-[#D4AF37] p-6 text-center">
            <div className="text-4xl font-black text-[#D4AF37] mb-2">{stats.thisYear}</div>
            <div className="text-sm text-[#252423] font-bold">今年</div>
          </div>
          <div className="bg-white border-2 border-[#82EDA6] p-6 text-center">
            <div className="text-4xl font-black text-[#82EDA6] mb-2">{stats.thisMonth}</div>
            <div className="text-sm text-[#252423] font-bold">今月</div>
          </div>
        </div>

        {/* 年別推移 */}
        <div className="bg-white border border-[#DAE2E8] p-6">
          <h2 className="text-lg font-black text-[#252423] mb-4 border-b-2 border-[#D4AF37] pb-2 inline-block">
            年別推移
          </h2>
          <div className="space-y-3">
            {Object.entries(yearlyStats).sort(([a], [b]) => Number(a) - Number(b)).map(([year, count]) => (
              <div key={year} className="flex items-center gap-4">
                <div className="w-16 text-sm font-bold text-[#252423]">{year}年</div>
                <div className="flex-1 bg-gray-100 h-8 relative">
                  <div
                    className="bg-[#10B981] h-full transition-all flex items-center justify-end px-2"
                    style={{ width: `${(count / maxYearly) * 100}%` }}
                  >
                    <span className="text-white font-black text-sm">{count}件</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* エリア別実績 */}
        {Object.keys(areaStats).length > 0 && (
          <div className="bg-white border border-[#DAE2E8] p-6">
            <h2 className="text-lg font-black text-[#252423] mb-4 border-b-2 border-[#D4AF37] pb-2 inline-block">
              エリア別実績
            </h2>
            <div className="space-y-3">
              {Object.entries(areaStats).sort(([, a], [, b]) => b - a).map(([area, count]) => (
                <div key={area} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-bold text-[#252423]">{area}</div>
                  <div className="flex-1 bg-gray-100 h-8 relative">
                    <div
                      className="bg-[#D4AF37] h-full transition-all flex items-center justify-end px-2"
                      style={{ width: `${(count / maxArea) * 100}%` }}
                    >
                      <span className="text-white font-black text-sm">{count}件</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 最近の現場(写真ギャラリー) */}
        <div className="bg-white border border-[#DAE2E8] p-6">
          <h2 className="text-lg font-black text-[#252423] mb-4 border-b-2 border-[#D4AF37] pb-2 inline-block">
            最近の現場
          </h2>
          {records.length === 0 ? (
            <div className="text-center py-8 text-[#252423]/50">
              <p>まだ記録がありません</p>
              <Link href="/record-work" className="inline-block mt-4 bg-[#10B981] text-white px-6 py-3 font-bold hover:bg-[#0ea572] transition-all">
                最初の記録をする
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {records.slice(0, 8).map(record => (
                <div key={record.id} className="aspect-square overflow-hidden border border-[#DAE2E8] hover:border-[#10B981] transition-all">
                  <img src={record.after_photo_url} alt={record.site_name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
