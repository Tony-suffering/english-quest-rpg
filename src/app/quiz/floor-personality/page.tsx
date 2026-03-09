'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// しょうもない床材性格診断
const QUESTIONS = [
  {
    q: '朝起きて最初にすることは？',
    options: [
      { text: 'カーテンを開けて太陽を浴びる', scores: { cork: 3, carpet: 0, tile: 1, flooring: 2 } },
      { text: '布団の中でスマホを見る', scores: { cork: 0, carpet: 3, tile: 0, flooring: 1 } },
      { text: 'シャワーを浴びる', scores: { cork: 1, carpet: 0, tile: 3, flooring: 1 } },
      { text: 'コーヒーを淹れる', scores: { cork: 2, carpet: 1, tile: 1, flooring: 3 } },
    ]
  },
  {
    q: '休日の過ごし方は？',
    options: [
      { text: '自然の中でハイキング', scores: { cork: 3, carpet: 0, tile: 0, flooring: 2 } },
      { text: '家でゴロゴロ映画鑑賞', scores: { cork: 1, carpet: 3, tile: 0, flooring: 1 } },
      { text: 'カフェで読書', scores: { cork: 2, carpet: 1, tile: 2, flooring: 2 } },
      { text: '友達とBBQ', scores: { cork: 1, carpet: 0, tile: 3, flooring: 1 } },
    ]
  },
  {
    q: 'ストレス解消法は？',
    options: [
      { text: 'ワインを飲む', scores: { cork: 3, carpet: 1, tile: 1, flooring: 1 } },
      { text: '寝る', scores: { cork: 1, carpet: 3, tile: 0, flooring: 1 } },
      { text: '掃除する', scores: { cork: 0, carpet: 0, tile: 3, flooring: 2 } },
      { text: '散歩する', scores: { cork: 2, carpet: 0, tile: 1, flooring: 3 } },
    ]
  },
  {
    q: '好きな温度は？',
    options: [
      { text: 'ちょっと暖かめ', scores: { cork: 3, carpet: 2, tile: 0, flooring: 1 } },
      { text: 'ひんやり涼しい', scores: { cork: 0, carpet: 0, tile: 3, flooring: 1 } },
      { text: '常温がいい', scores: { cork: 1, carpet: 1, tile: 1, flooring: 3 } },
      { text: '気にしない', scores: { cork: 1, carpet: 3, tile: 1, flooring: 1 } },
    ]
  },
  {
    q: '人生で大事なものは？',
    options: [
      { text: '自然との調和', scores: { cork: 3, carpet: 0, tile: 0, flooring: 2 } },
      { text: '快適さと安心', scores: { cork: 1, carpet: 3, tile: 1, flooring: 1 } },
      { text: '清潔さと美しさ', scores: { cork: 0, carpet: 0, tile: 3, flooring: 2 } },
      { text: 'バランスと調和', scores: { cork: 1, carpet: 1, tile: 1, flooring: 3 } },
    ]
  },
]

const RESULTS = {
  cork: {
    name: 'コルク',
    character: 'コルクじじい',
    avatar: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/32c616ad-8c26-4945-1e8e-35040d65a100/public',
    tagline: '「だって俺の床、コルクなんだもん！」',
    description: 'あなたは自然体で温かみのある人。足元から地球を感じたいタイプ。ワインの栓を抜くたびに床を思い出す。Hubermanも「足裏の感覚が脳に直結する」と言っている（たぶん）。',
    traits: ['エコ意識高い', '裸足で過ごしたい', 'ワイン好き', '幼稚園に縁がある'],
    hubermanBS: '足裏の温度受容器がコルクの断熱性により最適化され、副交感神経が活性化。結果、睡眠の質が14.7%向上する（ソース：俺の経験）',
    color: 'amber',
  },
  carpet: {
    name: 'カーペット',
    character: 'ふわふわさん',
    avatar: null,
    tagline: '「世界はもっとふわふわであるべき」',
    description: 'あなたは安心感を求める平和主義者。硬い現実より柔らかい夢を見たい。冬はこたつで溶けるタイプ。防音性能が高いので、夜中にこっそりスナック菓子を食べても大丈夫。',
    traits: ['インドア派', '猫を飼っている', 'こたつ愛好家', 'スリッパ不要論者'],
    hubermanBS: 'カーペットの繊維が足裏を包み込むことで、オキシトシン分泌が促進。孤独感が23%減少する（ソース：俺の妄想）',
    color: 'pink',
  },
  tile: {
    name: 'タイル',
    character: 'タイルおじさん',
    avatar: null,
    tagline: '「掃除のしやすさこそ正義」',
    description: 'あなたは清潔感を重視する完璧主義者。何かをこぼしても一瞬で拭ける安心感が好き。夏はひんやり、冬は床暖房。デザイン性も譲れない。コルクじじいとは犬猿の仲。',
    traits: ['潔癖症気味', 'モダンデザイン好き', '床暖房必須', '白い服を着る'],
    hubermanBS: 'タイルの冷たさが足裏の冷感受容器を刺激し、覚醒度が31%上昇。朝の目覚めが改善する（ソース：お風呂場での体験）',
    color: 'blue',
  },
  flooring: {
    name: 'フローリング',
    character: 'フローリング先輩',
    avatar: null,
    tagline: '「結局、バランスが大事なんだよ」',
    description: 'あなたはバランス感覚に優れた常識人。極端を嫌い、ちょうどいいを求める。無難だけど、それが強み。どんな家具とも相性がいい。人生も床材も、安定が一番。',
    traits: ['協調性が高い', '無印良品が好き', '観葉植物を育てる', 'スリッパ使用'],
    hubermanBS: '木目のパターンが視覚野を適度に刺激し、ストレスホルモンが18%減少。自然との接続感が得られる（ソース：雰囲気）',
    color: 'yellow',
  },
}

type FloorType = keyof typeof RESULTS

export default function FloorPersonalityQuiz() {
  const [currentQ, setCurrentQ] = useState(0)
  const [scores, setScores] = useState({ cork: 0, carpet: 0, tile: 0, flooring: 0 })
  const [result, setResult] = useState<FloorType | null>(null)
  const [showingResult, setShowingResult] = useState(false)

  const handleAnswer = (optionScores: typeof scores) => {
    const newScores = {
      cork: scores.cork + optionScores.cork,
      carpet: scores.carpet + optionScores.carpet,
      tile: scores.tile + optionScores.tile,
      flooring: scores.flooring + optionScores.flooring,
    }
    setScores(newScores)

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      // 結果を計算
      const winner = Object.entries(newScores).reduce((a, b) => a[1] > b[1] ? a : b)[0] as FloorType
      setResult(winner)
      setShowingResult(true)
    }
  }

  const restart = () => {
    setCurrentQ(0)
    setScores({ cork: 0, carpet: 0, tile: 0, flooring: 0 })
    setResult(null)
    setShowingResult(false)
  }

  const resultData = result ? RESULTS[result] : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-800 flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-stone-700">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white font-bold">IWASAKI</Link>
          <span className="text-stone-500 text-sm">しょうもない診断シリーズ #1</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          <AnimatePresence mode="wait">
            {!showingResult ? (
              <motion.div
                key={`q-${currentQ}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Title */}
                {currentQ === 0 && (
                  <div className="text-center mb-12">
                    <h1 className="text-3xl font-black text-white mb-2">床材性格診断</h1>
                    <p className="text-stone-500">あなたの魂は何の床材か？</p>
                    <p className="text-stone-600 text-xs mt-2">※科学的根拠は一切ありません</p>
                  </div>
                )}

                {/* Progress */}
                <div className="flex gap-1">
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${i <= currentQ ? 'bg-amber-400' : 'bg-stone-700'}`}
                    />
                  ))}
                </div>

                {/* Question */}
                <div className="text-center">
                  <span className="text-stone-500 text-sm">Q{currentQ + 1}/{QUESTIONS.length}</span>
                  <h2 className="text-xl font-bold text-white mt-2">{QUESTIONS[currentQ].q}</h2>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {QUESTIONS[currentQ].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt.scores)}
                      className="w-full p-4 bg-stone-800 border border-stone-700 rounded-xl text-white text-left hover:border-amber-400 hover:bg-stone-700 transition-all"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : resultData && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                {/* Result Header */}
                <div>
                  <span className="text-stone-500 text-sm">あなたの床材は...</span>
                  <h2 className={`text-4xl font-black mt-2 text-${resultData.color}-400`}>
                    {resultData.name}
                  </h2>
                </div>

                {/* Character */}
                <div className="relative">
                  {resultData.avatar ? (
                    <img
                      src={resultData.avatar}
                      alt={resultData.character}
                      className="w-32 h-32 rounded-full mx-auto border-4 border-amber-400"
                    />
                  ) : (
                    <div className={`w-32 h-32 rounded-full mx-auto bg-${resultData.color}-500/20 flex items-center justify-center text-4xl`}>
                      {resultData.name === 'カーペット' && '🛋️'}
                      {resultData.name === 'タイル' && '🧊'}
                      {resultData.name === 'フローリング' && '🪵'}
                    </div>
                  )}
                  <p className="text-white font-bold mt-3">{resultData.character}</p>
                  <p className={`text-${resultData.color}-400 text-sm italic`}>
                    {resultData.tagline}
                  </p>
                </div>

                {/* Description */}
                <div className="bg-stone-800/50 border border-stone-700 rounded-xl p-6 text-left">
                  <p className="text-stone-300 leading-relaxed">{resultData.description}</p>
                </div>

                {/* Traits */}
                <div className="flex flex-wrap justify-center gap-2">
                  {resultData.traits.map((trait, i) => (
                    <span
                      key={i}
                      className={`bg-${resultData.color}-500/20 text-${resultData.color}-400 text-sm px-3 py-1 rounded-full`}
                    >
                      {trait}
                    </span>
                  ))}
                </div>

                {/* Fake Huberman Science */}
                <div className="bg-black/50 border-l-4 border-cyan-400 p-4 text-left">
                  <p className="text-cyan-400 text-xs mb-1">神経科学的解説（嘘）</p>
                  <p className="text-stone-400 text-sm italic">{resultData.hubermanBS}</p>
                </div>

                {/* Share & Restart */}
                <div className="flex flex-col gap-3 pt-4">
                  <button
                    onClick={() => {
                      const text = `床材性格診断の結果、俺は「${resultData.name}」だった。${resultData.tagline}`
                      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://iwasaki-naisou.com/quiz/floor-personality')}`, '_blank')
                    }}
                    className="w-full py-3 bg-black border border-stone-700 text-white rounded-xl hover:bg-stone-800 transition-colors"
                  >
                    Xでシェアする
                  </button>
                  <button
                    onClick={restart}
                    className="w-full py-3 bg-stone-800 text-stone-400 rounded-xl hover:bg-stone-700 transition-colors"
                  >
                    もう一度やる
                  </button>
                  <Link
                    href="/"
                    className="text-stone-600 text-sm hover:text-stone-400"
                  >
                    トップに戻る
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-stone-700 text-center">
        <p className="text-stone-600 text-xs">
          有限会社イワサキ内装 | しょうもないコンテンツ部門
        </p>
      </footer>
    </div>
  )
}
