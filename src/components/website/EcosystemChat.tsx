'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Character, CHARACTERS, EcosystemThread, sampleEcosystemThreads } from '@/data/ecosystem'

export default function EcosystemChat() {
  const [threads, setThreads] = useState<EcosystemThread[]>([])
  const [currentThreadIndex, setCurrentThreadIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem('ecosystem_chat_visible')
      if (saved === 'false') setIsVisible(false)
    } catch {
      // localStorage read failed silently
    }
  }, [])

  useEffect(() => {
    async function fetchThreads() {
      try {
        const res = await fetch('/api/ecosystem?limit=5')
        const data = await res.json()
        if (data.success && data.data.length > 0) {
          setThreads(data.data)
        } else {
          setThreads(sampleEcosystemThreads)
        }
      } catch {
        setThreads(sampleEcosystemThreads)
      } finally {
        setIsLoading(false)
      }
    }
    fetchThreads()
    const interval = setInterval(fetchThreads, 3 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (threads.length <= 1) return
    const interval = setInterval(() => {
      setCurrentThreadIndex(i => (i + 1) % threads.length)
    }, 20000)
    return () => clearInterval(interval)
  }, [threads.length])

  if (!mounted) return null

  const currentThread = threads[currentThreadIndex]

  // 閉じた状態
  if (!isVisible) {
    return (
      <button
        onClick={() => {
          setIsVisible(true)
          try {
            localStorage.setItem('ecosystem_chat_visible', 'true')
          } catch {
            // localStorage write failed silently
          }
        }}
        className="fixed bottom-[340px] left-0 z-40 hidden lg:block group"
      >
        <div className="w-1 h-20 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60 hover:w-2 transition-all duration-300 rounded-r-full" />
      </button>
    )
  }

  if (isLoading || !currentThread) return null

  return (
    <div className="fixed top-24 left-4 z-30 w-80 hidden lg:block">
      <div className="bg-gradient-to-b from-[#1a1612] to-[#0d0a08] border border-[#D4AF37]/40 shadow-2xl overflow-hidden">
        {/* ゴールドアクセントライン */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        {/* ヘッダー */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* キャラアバター */}
            <div className="flex -space-x-2">
              <img src="/icons/jijii.png" alt="じじい" className="w-7 h-7 rounded-full border border-[#D4AF37]/60 object-cover" />
              <img src="/icons/anya.png" alt="アーニャ" className="w-7 h-7 rounded-full border border-[#D4AF37]/60 object-cover" />
              <img src="/icons/takumi.png" alt="タクミ" className="w-7 h-7 rounded-full border border-[#D4AF37]/60 object-cover" />
            </div>
            <span className="text-sm font-bold text-[#D4AF37] tracking-wide">CREW TALK</span>
          </div>
          <button
            onClick={() => {
              setIsVisible(false)
              try {
                localStorage.setItem('ecosystem_chat_visible', 'false')
              } catch {
                // silent
              }
            }}
            className="text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors p-1"
            title="閉じる"
          >
            <X size={14} />
          </button>
        </div>

        {/* 区切り線 */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent mx-4" />

        {/* トリガー表示 */}
        {currentThread.messages[0]?.trigger && (
          <div className="px-4 py-2 text-[10px] text-[#D4AF37]/50 text-center">
            📺 {currentThread.messages[0].trigger}
          </div>
        )}

        {/* 会話 */}
        <div className="max-h-64 overflow-y-auto px-3 py-2 space-y-3">
          {currentThread.messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </div>

        {/* スレッドナビ */}
        {threads.length > 1 && (
          <div className="px-4 py-2 flex items-center justify-center gap-1.5 border-t border-[#D4AF37]/20">
            {threads.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentThreadIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentThreadIndex ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]/30 hover:bg-[#D4AF37]/50'
                  }`}
              />
            ))}
          </div>
        )}


        {/* 下部アクセント */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
      </div>
    </div>
  )
}

// キャラ別カラー
const CHAR_COLORS: Record<Character, string> = {
  jijii: '#D4AF37',   // ゴールド
  anya: '#EC4899',    // ピンク
  takumi: '#10B981'   // グリーン
}

const CHAR_ICONS: Record<Character, string> = {
  jijii: '/icons/jijii.png',
  anya: '/icons/anya.png',
  takumi: '/icons/takumi.png'
}

function MessageBubble({ message }: { message: { character: Character; message: string } }) {
  const color = CHAR_COLORS[message.character]
  const icon = CHAR_ICONS[message.character]
  const name = CHARACTERS[message.character].name

  return (
    <div className="flex items-start gap-2">
      <img
        src={icon}
        alt={name}
        className="w-8 h-8 rounded-full object-cover flex-shrink-0 border"
        style={{ borderColor: color }}
      />
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-bold block mb-0.5" style={{ color }}>
          {name}
        </span>
        <p className="text-xs text-white/90 leading-relaxed">
          {message.message}
        </p>
      </div>
    </div>
  )
}
