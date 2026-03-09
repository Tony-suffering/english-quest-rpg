'use client'

import { useState, useEffect } from 'react'
import { Calendar, MapPin, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type WorkRecord = {
  id: string
  site_name: string
  work_date: string
  location_name?: string
  before_photo_url: string
  after_photo_url: string
  memo?: string
}

export default function TimelinePage() {
  const [records, setRecords] = useState<WorkRecord[]>([])
  const [filter, setFilter] = useState<'all' | 'year' | 'month'>('all')
  const [mounted, setMounted] = useState(false)

  // デモデータ
  const demoRecords: WorkRecord[] = [
    {
      id: 'demo-1',
      site_name: '港区 S様邸 リノベーション',
      work_date: '2023-11-15',
      location_name: '東京都港区',
      before_photo_url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop',
      after_photo_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
      memo: 'リビングの全面改装。明るい色調のクロスに変更し、開放感のある空間に仕上げました。',
    },
    {
      id: 'demo-2',
      site_name: '渋谷区 オフィス改修工事',
      work_date: '2023-10-20',
      location_name: '東京都渋谷区',
      before_photo_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      after_photo_url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop',
      memo: '会議室の防音工事と内装リニューアル。モダンで落ち着いた雰囲気に。',
    },
    {
      id: 'demo-3',
      site_name: '世田谷区 K様邸 和室リフォーム',
      work_date: '2023-09-05',
      location_name: '東京都世田谷区',
      before_photo_url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&h=300&fit=crop',
      after_photo_url: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=400&h=300&fit=crop',
      memo: '畳の表替えと障子の張り替え。伝統的な美しさを取り戻しました。',
    },
  ]

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      try {
        const loaded = JSON.parse(localStorage.getItem('work_records') || '[]')
        // ローカルストレージが空の場合はデモデータを表示
        if (loaded.length === 0) {
          setRecords(demoRecords)
        } else {
          setRecords(loaded)
        }
      } catch (error) {
        console.error('Failed to load work records:', error)
        setRecords(demoRecords)
      }
    }
  }, [])

  // ハイドレーションエラーを防ぐため、マウント前は何も表示しない
  if (!mounted) {
    return null
  }

  const filteredRecords = records.filter(r => {
    const date = new Date(r.work_date)
    const now = new Date()
    if (filter === 'year') return date.getFullYear() === now.getFullYear()
    if (filter === 'month') return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()
    return true
  })

  // 年月別グループ化
  const groupedRecords: { [key: string]: WorkRecord[] } = {}
  filteredRecords.forEach(record => {
    const date = new Date(record.work_date)
    const key = `${date.getFullYear()}年${date.getMonth() + 1}月`
    if (!groupedRecords[key]) groupedRecords[key] = []
    groupedRecords[key].push(record)
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-[#DAE2E8] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2 text-[#252423] font-black">
              <ArrowLeft className="w-5 h-5" />
              ホームに戻る
            </Link>
            <h1 className="text-lg font-black text-[#252423]">施工タイムライン（デモ）</h1>
            <div className="w-20"></div>
          </div>

          <div className="flex gap-2">
            {[
              { key: 'all', label: '全期間' },
              { key: 'year', label: '今年' },
              { key: 'month', label: '今月' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-4 py-2 font-bold text-sm transition-all ${filter === key
                    ? 'bg-[#10B981] text-white'
                    : 'bg-white border border-[#DAE2E8] text-[#252423] hover:border-[#10B981]'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {Object.keys(groupedRecords).length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-[#252423]/20" />
            <h2 className="text-xl font-black text-[#252423] mb-2">記録がありません</h2>
            <p className="text-[#252423]/60 mb-6">これはデモ画面です。実際のアプリでは、職人が現場で撮影した写真がここに自動的に記録されます。</p>
          </div>
        ) : (
          Object.entries(groupedRecords).map(([period, periodRecords]) => (
            <div key={period}>
              <h2 className="text-lg font-black text-[#252423] mb-4 border-b-2 border-[#D4AF37] pb-2 inline-block">
                📅 {period}
              </h2>
              <div className="space-y-4">
                {periodRecords.map(record => (
                  <div key={record.id} className="bg-white border border-[#DAE2E8] p-4 hover:shadow-lg transition-all">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <h3 className="font-black text-[#252423] mb-2">{record.site_name}</h3>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div>
                            <div className="text-xs font-bold text-[#252423] mb-1">📸 BEFORE</div>
                            <img src={record.before_photo_url} alt="Before" className="w-full aspect-video object-cover border border-[#DAE2E8]" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#252423] mb-1">📸 AFTER</div>
                            <img src={record.after_photo_url} alt="After" className="w-full aspect-video object-cover border border-[#DAE2E8]" />
                          </div>
                        </div>
                        <div className="space-y-1 text-xs text-[#252423]/70">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-[#10B981]" />
                            {new Date(record.work_date).toLocaleDateString('ja-JP')}
                          </div>
                          {record.location_name && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3 text-[#10B981]" />
                              {record.location_name}
                            </div>
                          )}
                          {record.memo && (
                            <div className="mt-2 p-2 bg-gray-50 border border-[#DAE2E8] text-xs">
                              💬 {record.memo}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
