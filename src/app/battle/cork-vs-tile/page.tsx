'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// コルクじじい vs タイルおじさん 床材バトル

const CORK_JIJII = {
  name: 'コルクじじい',
  avatar: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/32c616ad-8c26-4945-1e8e-35040d65a100/public',
  color: 'amber',
  catchphrase: 'だって俺の床、コルクなんだもん！',
  stats: { warmth: 95, eco: 90, sound: 85, maintenance: 60, style: 70 },
}

const TILE_OJISAN = {
  name: 'タイルおじさん',
  avatar: null,
  emoji: '🧊',
  color: 'blue',
  catchphrase: '掃除のしやすさこそ正義！',
  stats: { warmth: 30, eco: 50, sound: 40, maintenance: 95, style: 90 },
}

// バトルの台詞
const BATTLE_SCRIPT = [
  { speaker: 'cork', text: 'よう、タイル野郎。今日こそ決着つけようじゃねえか。' },
  { speaker: 'tile', text: 'ふん、コルクジジイか。その古臭い床材、まだ使ってるのか。' },
  { speaker: 'cork', text: '古臭いだと？コルクは自然の恵みだ。ポルトガルのコルク樫から取れる、地球に優しい素材よ。' },
  { speaker: 'tile', text: '地球に優しい？俺のタイルは100年持つぞ。サステナブルってのはそういうことだ。' },
  { speaker: 'cork', text: 'だが冷てえだろう！冬の朝、お前の床に素足で立ってみろ。心臓止まるぞ。' },
  { speaker: 'tile', text: '床暖房があるだろうが。技術の進歩を知らんのか、昭和の遺物め。' },
  { speaker: 'cork', text: '床暖房？電気代いくらかかると思ってんだ。コルクなら何もしなくても暖かい。断熱性能ナンバーワンよ。' },
  { speaker: 'tile', text: 'だがコルクは水に弱い。キッチンで使ったら膨らむだろうが。' },
  { speaker: 'cork', text: '...それは認める。だが寝室にはコルク一択だ。Hubermanも言ってた、足裏の感覚が睡眠に影響するって。' },
  { speaker: 'tile', text: 'Huberman？お前もあのポッドキャスト聴いてんのか。' },
  { speaker: 'cork', text: '1000時間聴いた。' },
  { speaker: 'tile', text: '...俺は1200時間だ。' },
  { speaker: 'cork', text: 'なん...だと...' },
  { speaker: 'tile', text: 'まあいい。結局、適材適所ってことだろう。寝室はコルク、キッチンと風呂はタイル。' },
  { speaker: 'cork', text: '...ちっ、たまには正論言うじゃねえか。' },
  { speaker: 'tile', text: 'だが玄関は譲らんぞ。' },
  { speaker: 'cork', text: '玄関こそコルクだろうが！靴脱いだ瞬間の「おかえり」感、お前にわかるか！？' },
  { speaker: 'tile', text: '高級感のある大理石調タイルの「ようこそ」感がわからんのか！？' },
  { speaker: 'both', text: '...また来週やるか。' },
]

export default function CorkVsTileBattle() {
  const [currentLine, setCurrentLine] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [votes, setVotes] = useState({ cork: 127, tile: 89 })
  const [hasVoted, setHasVoted] = useState(false)

  useEffect(() => {
    if (isPlaying && currentLine < BATTLE_SCRIPT.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1)
      }, 2500)
      return () => clearTimeout(timer)
    } else if (currentLine >= BATTLE_SCRIPT.length - 1) {
      setIsPlaying(false)
    }
  }, [isPlaying, currentLine])

  const startBattle = () => {
    setCurrentLine(0)
    setIsPlaying(true)
    setShowAll(false)
  }

  const vote = (side: 'cork' | 'tile') => {
    if (hasVoted) return
    setVotes(prev => ({ ...prev, [side]: prev[side] + 1 }))
    setHasVoted(true)
  }

  const totalVotes = votes.cork + votes.tile
  const corkPercent = Math.round((votes.cork / totalVotes) * 100)
  const tilePercent = 100 - corkPercent

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900">
      {/* Header */}
      <header className="p-4 border-b border-stone-700">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white font-bold">IWASAKI</Link>
          <span className="text-red-500 text-sm font-bold animate-pulse">LIVE BATTLE</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            <span className="text-amber-400">コルク</span>
            <span className="text-stone-500 mx-2">VS</span>
            <span className="text-blue-400">タイル</span>
          </h1>
          <p className="text-stone-500">床材界の宿命の対決</p>
        </div>

        {/* Battle Arena */}
        <div className="bg-stone-800/50 border border-stone-700 rounded-2xl overflow-hidden mb-8">
          {/* Fighters */}
          <div className="grid grid-cols-2 border-b border-stone-700">
            {/* Cork */}
            <div className="p-6 text-center border-r border-stone-700">
              <img
                src={CORK_JIJII.avatar}
                alt={CORK_JIJII.name}
                className="w-24 h-24 rounded-full mx-auto border-4 border-amber-400 mb-3"
              />
              <h3 className="text-amber-400 font-bold text-lg">{CORK_JIJII.name}</h3>
              <p className="text-stone-500 text-xs italic">"{CORK_JIJII.catchphrase}"</p>
            </div>

            {/* Tile */}
            <div className="p-6 text-center">
              <div className="w-24 h-24 rounded-full mx-auto border-4 border-blue-400 mb-3 bg-blue-500/20 flex items-center justify-center text-5xl">
                {TILE_OJISAN.emoji}
              </div>
              <h3 className="text-blue-400 font-bold text-lg">{TILE_OJISAN.name}</h3>
              <p className="text-stone-500 text-xs italic">"{TILE_OJISAN.catchphrase}"</p>
            </div>
          </div>

          {/* Battle Log */}
          <div className="p-6 min-h-[300px] max-h-[400px] overflow-y-auto">
            {!isPlaying && currentLine === 0 ? (
              <div className="text-center py-12">
                <p className="text-stone-500 mb-6">バトルを開始しますか？</p>
                <button
                  onClick={startBattle}
                  className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 transition-colors"
                >
                  FIGHT!
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {BATTLE_SCRIPT.slice(0, showAll ? undefined : currentLine + 1).map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${line.speaker === 'tile' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {line.speaker === 'cork' && (
                        <img src={CORK_JIJII.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-amber-400" />
                      )}
                      {line.speaker === 'tile' && (
                        <div className="w-10 h-10 rounded-full border-2 border-blue-400 bg-blue-500/20 flex items-center justify-center">
                          🧊
                        </div>
                      )}
                      {line.speaker === 'both' && (
                        <div className="w-10 h-10 rounded-full border-2 border-purple-400 bg-purple-500/20 flex items-center justify-center text-xs">
                          両者
                        </div>
                      )}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`max-w-[70%] p-3 rounded-2xl ${
                        line.speaker === 'cork'
                          ? 'bg-amber-500/20 text-amber-100 rounded-tl-none'
                          : line.speaker === 'tile'
                          ? 'bg-blue-500/20 text-blue-100 rounded-tr-none'
                          : 'bg-purple-500/20 text-purple-100 mx-auto rounded-t-none'
                      }`}
                    >
                      {line.text}
                    </div>
                  </motion.div>
                ))}

                {isPlaying && (
                  <div className="flex justify-center py-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          {currentLine > 0 && (
            <div className="p-4 border-t border-stone-700 flex justify-center gap-4">
              {!showAll && !isPlaying && currentLine < BATTLE_SCRIPT.length - 1 && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="px-4 py-2 bg-stone-700 text-white rounded hover:bg-stone-600"
                >
                  続きを見る
                </button>
              )}
              {!showAll && (
                <button
                  onClick={() => { setShowAll(true); setIsPlaying(false); setCurrentLine(BATTLE_SCRIPT.length - 1) }}
                  className="px-4 py-2 bg-stone-700 text-stone-400 rounded hover:bg-stone-600"
                >
                  全部見る
                </button>
              )}
              <button
                onClick={startBattle}
                className="px-4 py-2 bg-stone-700 text-stone-400 rounded hover:bg-stone-600"
              >
                最初から
              </button>
            </div>
          )}
        </div>

        {/* Vote Section */}
        <div className="bg-stone-800/50 border border-stone-700 rounded-2xl p-6 mb-8">
          <h3 className="text-center text-white font-bold mb-6">どっちを支持する？</h3>

          {/* Vote Bar */}
          <div className="relative h-12 rounded-full overflow-hidden mb-4">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500"
              style={{ width: `${corkPercent}%` }}
            />
            <div
              className="absolute inset-y-0 right-0 bg-gradient-to-l from-blue-600 to-blue-400 transition-all duration-500"
              style={{ width: `${tilePercent}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <span className="text-white font-bold drop-shadow-lg">{corkPercent}%</span>
              <span className="text-white font-bold drop-shadow-lg">{tilePercent}%</span>
            </div>
          </div>

          {/* Vote Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => vote('cork')}
              disabled={hasVoted}
              className={`py-3 rounded-lg font-bold transition-all ${
                hasVoted
                  ? 'bg-stone-700 text-stone-500 cursor-not-allowed'
                  : 'bg-amber-500 text-white hover:bg-amber-400'
              }`}
            >
              コルク派 ({votes.cork})
            </button>
            <button
              onClick={() => vote('tile')}
              disabled={hasVoted}
              className={`py-3 rounded-lg font-bold transition-all ${
                hasVoted
                  ? 'bg-stone-700 text-stone-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-400'
              }`}
            >
              タイル派 ({votes.tile})
            </button>
          </div>

          {hasVoted && (
            <p className="text-center text-stone-500 text-sm mt-4">投票ありがとう！</p>
          )}
        </div>

        {/* Stats Comparison */}
        <div className="bg-stone-800/50 border border-stone-700 rounded-2xl p-6">
          <h3 className="text-center text-white font-bold mb-6">ステータス比較</h3>

          <div className="space-y-4">
            {[
              { label: '暖かさ', key: 'warmth' },
              { label: 'エコ度', key: 'eco' },
              { label: '防音性', key: 'sound' },
              { label: 'メンテ', key: 'maintenance' },
              { label: 'おしゃれ', key: 'style' },
            ].map(({ label, key }) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-amber-400">{CORK_JIJII.stats[key as keyof typeof CORK_JIJII.stats]}</span>
                  <span className="text-stone-500">{label}</span>
                  <span className="text-blue-400">{TILE_OJISAN.stats[key as keyof typeof TILE_OJISAN.stats]}</span>
                </div>
                <div className="flex gap-1 h-2">
                  <div className="flex-1 bg-stone-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${CORK_JIJII.stats[key as keyof typeof CORK_JIJII.stats]}%`, marginLeft: 'auto' }}
                    />
                  </div>
                  <div className="flex-1 bg-stone-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 rounded-full"
                      style={{ width: `${TILE_OJISAN.stats[key as keyof typeof TILE_OJISAN.stats]}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-stone-500 hover:text-white transition-colors">
            トップに戻る
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-stone-700 text-center">
        <p className="text-stone-600 text-xs">
          イワサキ内装 presents: 床材プロレス
        </p>
      </footer>
    </div>
  )
}
