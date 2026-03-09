'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { RefreshCw, Copy, Check } from 'lucide-react'

// リフォームを先延ばしにする言い訳ジェネレーター

const EXCUSES = {
  money: [
    '今月ちょっと厳しくて...',
    'ボーナス出たら考えます',
    '子供の教育費が...',
    '車検が近いので...',
    '投資に回したいので...',
    '老後の貯金が心配で...',
    '住宅ローンがまだ...',
    '税金の支払いが...',
  ],
  timing: [
    '年度末で忙しくて...',
    '子供の受験が終わったら...',
    '引っ越しを考えてるので...',
    '仕事が落ち着いたら...',
    'コロナが落ち着いたら...',
    '来年の春には...',
    '夏は暑いので秋に...',
    '冬は寒いので春に...',
  ],
  family: [
    '妻（夫）に相談しないと...',
    '親の意見も聞かないと...',
    '子供の意見も...',
    '家族会議で決めます',
    '義母が反対してて...',
    'ペットがストレスを感じるかも...',
  ],
  other: [
    'まだ使えるし...',
    '慣れちゃったので...',
    '他の業者さんも見てみたくて...',
    'DIYでやろうかと...',
    'YouTubeで自分でできるって...',
    'もうすぐAIが全部やってくれるって聞いたので...',
    '風水的にまだタイミングじゃない',
    '占いで今年は動くなって言われて...',
  ],
}

const COMEBACKS = [
  { excuse: 'money', comeback: '10年我慢すると、劣化で工事費が1.5倍になりますよ。今が一番安いです。' },
  { excuse: 'money', comeback: '分割払いもできますよ。月々の負担を計算してみましょうか？' },
  { excuse: 'timing', comeback: '実は閑散期の今が一番スケジュール取りやすいんです。' },
  { excuse: 'timing', comeback: '「いつかやる」は「永遠にやらない」と同義です。' },
  { excuse: 'family', comeback: '無料で現地見積もりできます。ご家族皆様でご覧になれば話が早いですよ。' },
  { excuse: 'other', comeback: 'DIY失敗の修正工事、結構やってます...結局高くつくんですよね。' },
  { excuse: 'other', comeback: '「まだ使える」と「快適」は別物です。我慢の日々、本当に必要ですか？' },
]

const TRUTH_BOMBS = [
  '本当の理由：めんどくさい',
  '本当の理由：業者と話すのが怖い',
  '本当の理由：どこに頼めばいいかわからない',
  '本当の理由：相場がわからなくて不安',
  '本当の理由：騙されそうで怖い',
  '本当の理由：家を見られるのが恥ずかしい',
  '本当の理由：決断するのがストレス',
]

export default function ExcuseGenerator() {
  const [excuse, setExcuse] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [truthBomb, setTruthBomb] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const generateExcuse = () => {
    const categories = Object.keys(EXCUSES) as (keyof typeof EXCUSES)[]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    const excuseList = EXCUSES[randomCategory]
    const randomExcuse = excuseList[Math.floor(Math.random() * excuseList.length)]
    const randomTruth = TRUTH_BOMBS[Math.floor(Math.random() * TRUTH_BOMBS.length)]

    setCategory(randomCategory)
    setExcuse(randomExcuse)
    setTruthBomb(randomTruth)
  }

  const copyExcuse = () => {
    if (excuse) {
      navigator.clipboard.writeText(excuse)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getComeback = () => {
    if (!category) return null
    const relevant = COMEBACKS.filter(c => c.excuse === category)
    if (relevant.length === 0) return COMEBACKS[Math.floor(Math.random() * COMEBACKS.length)].comeback
    return relevant[Math.floor(Math.random() * relevant.length)].comeback
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-800 flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-stone-700">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white font-bold">IWASAKI</Link>
          <span className="text-stone-500 text-sm">しょうもないシリーズ #3</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
            リフォーム先延ばし
            <br />
            言い訳ジェネレーター
          </h1>
          <p className="text-stone-500 text-sm mb-8">
            今日も工事を先延ばしにする、完璧な言い訳を生成します
          </p>

          {/* Generator */}
          <div className="bg-stone-800/50 border border-stone-700 rounded-2xl p-8 mb-6">
            {!excuse ? (
              <div className="py-8">
                <p className="text-stone-500 mb-6">ボタンを押して言い訳を生成</p>
                <button
                  onClick={generateExcuse}
                  className="px-8 py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-400 transition-colors"
                >
                  言い訳を生成する
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Category Badge */}
                <div>
                  <span className="text-xs text-stone-500 uppercase tracking-widest">
                    カテゴリ: {category === 'money' && 'お金系'}
                    {category === 'timing' && 'タイミング系'}
                    {category === 'family' && '家族系'}
                    {category === 'other' && 'その他'}
                  </span>
                </div>

                {/* Excuse */}
                <div className="bg-black/30 rounded-xl p-6">
                  <p className="text-2xl text-white font-bold leading-relaxed">
                    「{excuse}」
                  </p>
                </div>

                {/* Copy Button */}
                <button
                  onClick={copyExcuse}
                  className="flex items-center justify-center gap-2 mx-auto text-stone-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'コピーしました' : 'コピー'}
                </button>

                {/* Truth Bomb */}
                <div className="border-t border-stone-700 pt-6">
                  <p className="text-red-400 text-sm">
                    {truthBomb}
                  </p>
                </div>

                {/* Comeback */}
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                  <p className="text-emerald-400 text-xs uppercase tracking-widest mb-2">
                    業者の切り返し
                  </p>
                  <p className="text-emerald-100 text-sm">
                    {getComeback()}
                  </p>
                </div>

                {/* Regenerate */}
                <button
                  onClick={generateExcuse}
                  className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-stone-700 text-white rounded-xl hover:bg-stone-600 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  もう一回
                </button>
              </motion.div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center mb-8">
            <div className="bg-stone-800/30 rounded-xl p-4">
              <p className="text-2xl font-black text-amber-400">{Object.values(EXCUSES).flat().length}</p>
              <p className="text-stone-500 text-xs">言い訳パターン</p>
            </div>
            <div className="bg-stone-800/30 rounded-xl p-4">
              <p className="text-2xl font-black text-red-400">100%</p>
              <p className="text-stone-500 text-xs">見抜かれる確率</p>
            </div>
            <div className="bg-stone-800/30 rounded-xl p-4">
              <p className="text-2xl font-black text-emerald-400">0円</p>
              <p className="text-stone-500 text-xs">相談料</p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-500/30 rounded-xl p-6">
            <p className="text-white font-bold mb-2">言い訳はもういい？</p>
            <p className="text-stone-400 text-sm mb-4">見積もりは無料、相談も無料。言い訳より簡単。</p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-white text-stone-900 font-bold rounded-xl hover:bg-stone-100 transition-colors"
            >
              とりあえず相談してみる
            </Link>
          </div>

          {/* Share */}
          <div className="mt-6">
            <button
              onClick={() => {
                const text = excuse ? `今日のリフォーム先延ばし言い訳：「${excuse}」\n\n${truthBomb}` : 'リフォーム言い訳ジェネレーター'
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://iwasaki-naisou.com/generator/excuse')}`, '_blank')
              }}
              className="text-stone-500 text-sm hover:text-white transition-colors"
            >
              Xでシェアして共感を得る
            </button>
          </div>

          {/* Back */}
          <Link href="/" className="block mt-8 text-stone-600 hover:text-stone-400 transition-colors">
            トップに戻る
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-stone-700 text-center">
        <p className="text-stone-600 text-xs">
          イワサキ内装 | 言い訳を聞くのも仕事のうちです
        </p>
      </footer>
    </div>
  )
}
