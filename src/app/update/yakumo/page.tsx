'use client'

import { useState } from 'react'
import { Check, Camera, Send, AlertCircle } from 'lucide-react'

// 現場更新フォーム - スマホで使いやすいシンプルなUI
// URL: /update/yakumo

const SCHEDULE = [
  { date: '2/10', task: '3F 洋室：剥がし', status: 'upcoming' },
  { date: '2/11', task: '3F 洋室：下地', status: 'upcoming' },
  { date: '2/12', task: '3F 洋室：貼り', status: 'upcoming' },
  { date: '2/13', task: '天窓：剥がし', status: 'upcoming' },
  { date: '2/14', task: '天窓：下地', status: 'upcoming' },
  { date: '2/16', task: '天窓：貼り', status: 'upcoming' },
  { date: '2/17', task: '2F：剥がし・下地 1/3', status: 'upcoming' },
  { date: '2/18', task: '2F：剥がし・下地 2/3', status: 'upcoming' },
  { date: '2/19', task: '2F：剥がし・下地 3/3', status: 'upcoming' },
  { date: '2/20', task: '2F：貼り 1/2', status: 'upcoming' },
  { date: '2/21', task: '2F：貼り 2/2', status: 'upcoming' },
  { date: '2/23', task: '2F 和室：一式', status: 'upcoming' },
  { date: '2/24', task: '1F：剥がし・下地', status: 'upcoming' },
  { date: '2/25', task: '1F：貼り', status: 'upcoming' },
  { date: '2/26', task: '完工・清掃・検査', status: 'upcoming' },
]

export default function YakumoUpdatePage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [status, setStatus] = useState<'complete' | 'delayed' | null>(null)
  const [notes, setNotes] = useState('')
  const [notifyClient, setNotifyClient] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!selectedDate || !status) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/project-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: 'yakumo',
          date: selectedDate,
          status,
          notes: notes || undefined,
          notifyClient,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error('Update failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">更新完了</h1>
          <p className="text-stone-400 mb-6">
            {notifyClient ? 'クライアントに通知しました' : '記録しました'}
          </p>
          <button
            onClick={() => {
              setSubmitted(false)
              setSelectedDate(null)
              setStatus(null)
              setNotes('')
            }}
            className="px-6 py-3 bg-stone-800 text-white rounded-lg"
          >
            続けて更新
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-900 text-white">
      {/* Header */}
      <header className="bg-stone-800 p-4 sticky top-0 z-10">
        <h1 className="text-lg font-bold">八雲邸 進捗更新</h1>
        <p className="text-stone-400 text-sm">Edmund Keith Henry 様</p>
      </header>

      <main className="p-4 pb-32">
        {/* Step 1: Select Date */}
        <section className="mb-8">
          <h2 className="text-sm text-stone-400 uppercase tracking-wide mb-3">
            1. 日付を選択
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {SCHEDULE.map((item) => (
              <button
                key={item.date}
                onClick={() => setSelectedDate(item.date)}
                className={`p-3 rounded-lg text-left transition-all ${
                  selectedDate === item.date
                    ? 'bg-amber-500 text-black'
                    : 'bg-stone-800 hover:bg-stone-700'
                }`}
              >
                <p className="font-bold">{item.date}</p>
                <p className="text-xs opacity-70 truncate">{item.task}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Step 2: Status */}
        {selectedDate && (
          <section className="mb-8">
            <h2 className="text-sm text-stone-400 uppercase tracking-wide mb-3">
              2. ステータス
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setStatus('complete')}
                className={`p-4 rounded-lg flex items-center gap-3 transition-all ${
                  status === 'complete'
                    ? 'bg-green-500 text-black'
                    : 'bg-stone-800 hover:bg-stone-700'
                }`}
              >
                <Check className="w-6 h-6" />
                <span className="font-bold">完了</span>
              </button>
              <button
                onClick={() => setStatus('delayed')}
                className={`p-4 rounded-lg flex items-center gap-3 transition-all ${
                  status === 'delayed'
                    ? 'bg-red-500 text-white'
                    : 'bg-stone-800 hover:bg-stone-700'
                }`}
              >
                <AlertCircle className="w-6 h-6" />
                <span className="font-bold">遅延</span>
              </button>
            </div>
          </section>
        )}

        {/* Step 3: Notes (optional) */}
        {status && (
          <section className="mb-8">
            <h2 className="text-sm text-stone-400 uppercase tracking-wide mb-3">
              3. メモ（任意）
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="特記事項があれば..."
              className="w-full p-4 bg-stone-800 rounded-lg text-white placeholder:text-stone-500 resize-none"
              rows={3}
            />
          </section>
        )}

        {/* Step 4: Notify */}
        {status && (
          <section className="mb-8">
            <label className="flex items-center gap-3 p-4 bg-stone-800 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={notifyClient}
                onChange={(e) => setNotifyClient(e.target.checked)}
                className="w-5 h-5 rounded bg-stone-700 border-stone-600 text-amber-500 focus:ring-amber-500"
              />
              <span>クライアントに通知する</span>
            </label>
          </section>
        )}
      </main>

      {/* Fixed Submit Button */}
      {selectedDate && status && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-stone-900 border-t border-stone-800">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-4 bg-amber-500 text-black font-bold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? '送信中...' : '更新を送信'}
          </button>
        </div>
      )}
    </div>
  )
}
