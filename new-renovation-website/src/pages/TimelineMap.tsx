'use client'

import { useState } from 'react'
import { Calendar, Clock, User, CheckCircle, AlertCircle, Circle } from 'lucide-react'
import { schedulesData, ScheduleItem } from '../data/schedules'
import { craftsmenData } from '../data/craftsmen'

const TimelineMap = () => {
  const [selectedMonth, setSelectedMonth] = useState('2025-10')
  const [selectedCraftsman, setSelectedCraftsman] = useState<string | null>(null)

  // 月の開始日と終了日を取得
  const monthStart = new Date(`${selectedMonth}-01`)
  const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0)
  const daysInMonth = monthEnd.getDate()

  // 日付の配列を生成
  const dates = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(monthStart)
    date.setDate(i + 1)
    return date
  })

  // 職人ごとにスケジュールをグループ化
  const craftsmanSchedules = craftsmenData.map(craftsman => {
    const schedules = schedulesData.filter(s =>
      s.craftsmanId === craftsman.id &&
      s.startDate.startsWith(selectedMonth)
    )
    return { craftsman, schedules }
  })

  const getScheduleStatus = (status: ScheduleItem['status']) => {
    switch (status) {
      case 'completed':
        return { icon: CheckCircle, color: 'bg-green-500', text: '完了' }
      case 'in_progress':
        return { icon: AlertCircle, color: 'bg-blue-500', text: '作業中' }
      case 'scheduled':
        return { icon: Clock, color: 'bg-gray-400', text: '予定' }
    }
  }

  const getDatePosition = (date: string) => {
    const d = new Date(date)
    const dayOfMonth = d.getDate()
    return ((dayOfMonth - 1) / daysInMonth) * 100
  }

  const getDateWidth = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    return (duration / daysInMonth) * 100
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* ヘッダー */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">稼働タイムライン</h1>
            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              内部管理用
            </span>
          </div>
          <p className="text-gray-600">職人の稼働状況をタイムラインで可視化</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 月選択 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center gap-4">
            <label className="font-semibold text-gray-900">表示月:</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="2025-10">2025年10月</option>
              <option value="2025-11">2025年11月</option>
              <option value="2025-12">2025年12月</option>
            </select>
          </div>
        </div>

        {/* タイムライン */}
        <div className="bg-white rounded-lg shadow-sm overflow-auto">
          <div className="min-w-[1200px]">
            {/* ヘッダー：日付 */}
            <div className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10">
              <div className="grid grid-cols-[200px_1fr]">
                <div className="p-4 font-semibold text-gray-900 border-r border-gray-200">
                  職人
                </div>
                <div className="relative h-16 px-2">
                  <div className="flex justify-between items-center h-full">
                    {dates.map((date, i) => {
                      const isWeekend = date.getDay() === 0 || date.getDay() === 6
                      return (
                        <div
                          key={i}
                          className={`flex-1 text-center text-xs ${
                            isWeekend ? 'text-red-500 font-medium' : 'text-gray-600'
                          }`}
                        >
                          <div>{date.getDate()}</div>
                          <div className="text-[10px]">
                            {['日', '月', '火', '水', '木', '金', '土'][date.getDay()]}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* 職人ごとの稼働状況 */}
            <div>
              {craftsmanSchedules.map(({ craftsman, schedules }) => (
                <div
                  key={craftsman.id}
                  className={`grid grid-cols-[200px_1fr] border-b border-gray-200 hover:bg-gray-50 ${
                    selectedCraftsman === craftsman.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedCraftsman(
                    selectedCraftsman === craftsman.id ? null : craftsman.id
                  )}
                >
                  {/* 職人名 */}
                  <div className="p-4 border-r border-gray-200">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">{craftsman.name}</div>
                        <div className="text-xs text-gray-500">{craftsman.specialty.join('・')}</div>
                      </div>
                    </div>
                  </div>

                  {/* タイムライン */}
                  <div className="relative h-20 px-2">
                    {/* 日付区切り線 */}
                    <div className="absolute inset-0 flex">
                      {dates.map((_, i) => (
                        <div key={i} className="flex-1 border-r border-gray-100" />
                      ))}
                    </div>

                    {/* スケジュールバー */}
                    {schedules.map((schedule) => {
                      const status = getScheduleStatus(schedule.status)
                      const StatusIcon = status.icon
                      const left = getDatePosition(schedule.startDate)
                      const width = getDateWidth(schedule.startDate, schedule.endDate)

                      return (
                        <div
                          key={schedule.id}
                          className="absolute top-2 h-16"
                          style={{
                            left: `${left}%`,
                            width: `${width}%`,
                          }}
                        >
                          <div
                            className={`h-full ${status.color} rounded px-2 py-1 text-white text-xs shadow-md hover:shadow-lg transition-shadow cursor-pointer`}
                            title={`${schedule.projectName}\n${schedule.startDate} 〜 ${schedule.endDate}\n${schedule.workDays}日間`}
                          >
                            <div className="flex items-center gap-1 mb-1">
                              <StatusIcon className="w-3 h-3" />
                              <span className="font-medium truncate">{schedule.projectName}</span>
                            </div>
                            <div className="text-[10px] opacity-90">{schedule.workDays}日間</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 凡例 */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-gray-900 mb-3">ステータス</h3>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">完了</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-700">作業中</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-700">予定</span>
            </div>
          </div>
        </div>

        {/* 統計情報 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-600 mb-1">総案件数</div>
            <div className="text-3xl font-bold text-gray-900">
              {schedulesData.filter(s => s.startDate.startsWith(selectedMonth)).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-600 mb-1">稼働中</div>
            <div className="text-3xl font-bold text-blue-600">
              {schedulesData.filter(s =>
                s.startDate.startsWith(selectedMonth) && s.status === 'in_progress'
              ).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-600 mb-1">完了</div>
            <div className="text-3xl font-bold text-green-600">
              {schedulesData.filter(s =>
                s.startDate.startsWith(selectedMonth) && s.status === 'completed'
              ).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineMap
