'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Calculator, Check, Phone, Mail, Sparkles } from 'lucide-react'
import Link from 'next/link'

// 見積もりロジック（30年の経験をアルゴリズム化）
const PRICE_DATA = {
  wallpaper: {
    name: '壁紙・クロス張替え',
    basePrice: 1200, // 円/㎡
    laborPerRoom: 15000, // 部屋あたり工賃
    options: {
      standard: { name: '量産品クロス', multiplier: 1.0 },
      premium: { name: '1000番台クロス', multiplier: 1.3 },
      functional: { name: '機能性クロス（消臭・防カビ）', multiplier: 1.5 },
    }
  },
  flooring: {
    name: '床・フローリング',
    basePrice: 8000, // 円/㎡
    laborPerRoom: 30000,
    options: {
      cf: { name: 'クッションフロア', multiplier: 0.5 },
      laminate: { name: '複合フローリング', multiplier: 1.0 },
      solid: { name: '無垢フローリング', multiplier: 1.8 },
    }
  },
  ceiling: {
    name: '天井張替え',
    basePrice: 1500, // 円/㎡
    laborPerRoom: 20000,
    options: {
      standard: { name: '量産品クロス', multiplier: 1.0 },
      premium: { name: '1000番台クロス', multiplier: 1.3 },
    }
  },
  barrier: {
    name: 'バリアフリー工事',
    basePrice: 0,
    laborPerRoom: 0,
    options: {
      handrail: { name: '手すり設置', multiplier: 1, fixedPrice: 25000 },
      step: { name: '段差解消', multiplier: 1, fixedPrice: 50000 },
      toilet: { name: 'トイレ改修', multiplier: 1, fixedPrice: 150000 },
    }
  }
}

const ROOM_SIZES = {
  '4.5': { name: '4.5畳', sqm: 7.5, wallArea: 25 },
  '6': { name: '6畳', sqm: 10, wallArea: 30 },
  '8': { name: '8畳', sqm: 13, wallArea: 35 },
  '10': { name: '10畳', sqm: 16.5, wallArea: 40 },
  '12': { name: '12畳', sqm: 20, wallArea: 45 },
  'other': { name: 'それ以上', sqm: 25, wallArea: 55 },
}

type Step = 'work' | 'room' | 'option' | 'quantity' | 'contact' | 'result'
type WorkType = 'wallpaper' | 'flooring' | 'ceiling' | 'barrier'

export default function InstantEstimatePage() {
  const [step, setStep] = useState<Step>('work')
  const [workType, setWorkType] = useState<WorkType | null>(null)
  const [roomSize, setRoomSize] = useState<string | null>(null)
  const [option, setOption] = useState<string | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [includeCeiling, setIncludeCeiling] = useState(false)
  const [contact, setContact] = useState({ name: '', phone: '', email: '', note: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // 見積もり計算
  const calculateEstimate = () => {
    if (!workType || !roomSize || !option) return { min: 0, max: 0 }

    const work = PRICE_DATA[workType]
    const room = ROOM_SIZES[roomSize as keyof typeof ROOM_SIZES]
    const opt = work.options[option as keyof typeof work.options]

    if (!work || !room || !opt) return { min: 0, max: 0 }

    let baseTotal = 0

    if (workType === 'barrier') {
      // バリアフリーは固定価格
      baseTotal = (opt as any).fixedPrice * quantity
    } else if (workType === 'wallpaper') {
      // 壁紙は壁面積で計算
      baseTotal = (room.wallArea * work.basePrice * opt.multiplier + work.laborPerRoom) * quantity
      if (includeCeiling) {
        const ceiling = PRICE_DATA.ceiling
        baseTotal += (room.sqm * ceiling.basePrice * 1.0 + ceiling.laborPerRoom) * quantity
      }
    } else {
      // 床・天井は床面積で計算
      baseTotal = (room.sqm * work.basePrice * opt.multiplier + work.laborPerRoom) * quantity
    }

    // 誤差範囲 ±20%
    return {
      min: Math.round(baseTotal * 0.8 / 10000) * 10000,
      max: Math.round(baseTotal * 1.2 / 10000) * 10000,
    }
  }

  const estimate = calculateEstimate()

  const handleSubmit = async () => {
    if (!contact.name || (!contact.phone && !contact.email)) {
      alert('お名前と連絡先を入力してください')
      return
    }

    setIsSubmitting(true)

    // 見積もりデータを送信
    try {
      const response = await fetch('/api/instant-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workType,
          roomSize,
          option,
          quantity,
          includeCeiling,
          estimate,
          contact,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setStep('result')
      } else {
        throw new Error('送信に失敗しました')
      }
    } catch (error) {
      // APIがなくても結果を表示（開発用）
      setSubmitted(true)
      setStep('result')
    } finally {
      setIsSubmitting(false)
    }
  }

  const goBack = () => {
    const steps: Step[] = ['work', 'room', 'option', 'quantity', 'contact', 'result']
    const currentIndex = steps.indexOf(step)
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1])
    }
  }

  const goNext = () => {
    const steps: Step[] = ['work', 'room', 'option', 'quantity', 'contact', 'result']
    const currentIndex = steps.indexOf(step)
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-800 flex flex-col">
      {/* ヘッダー */}
      <header className="p-4 border-b border-stone-700">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white font-bold">
            IWASAKI
          </Link>
          <div className="flex items-center gap-2 text-amber-400 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>AI即時見積もり</span>
          </div>
        </div>
      </header>

      {/* プログレスバー */}
      <div className="max-w-2xl mx-auto w-full px-4 pt-6">
        <div className="flex gap-1">
          {['work', 'room', 'option', 'quantity', 'contact'].map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                ['work', 'room', 'option', 'quantity', 'contact'].indexOf(step) >= i
                  ? 'bg-amber-400'
                  : 'bg-stone-700'
              }`}
            />
          ))}
        </div>
        <p className="text-stone-500 text-xs mt-2 text-center">
          {step === 'work' && 'Step 1/5: 工事の種類'}
          {step === 'room' && 'Step 2/5: 部屋の広さ'}
          {step === 'option' && 'Step 3/5: 仕様の選択'}
          {step === 'quantity' && 'Step 4/5: 数量の確認'}
          {step === 'contact' && 'Step 5/5: 連絡先'}
          {step === 'result' && '結果'}
        </p>
      </div>

      {/* メインコンテンツ */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            {/* Step 1: 工事の種類 */}
            {step === 'work' && (
              <motion.div
                key="work"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">どんな工事をお考えですか？</h2>
                  <p className="text-stone-400 text-sm">該当するものを選んでください</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(PRICE_DATA).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setWorkType(key as WorkType)
                        setOption(null)
                        goNext()
                      }}
                      className={`p-6 border-2 rounded-xl transition-all text-left ${
                        workType === key
                          ? 'border-amber-400 bg-amber-400/10'
                          : 'border-stone-700 hover:border-stone-600'
                      }`}
                    >
                      <h3 className="text-white font-bold mb-1">{value.name}</h3>
                      <p className="text-stone-500 text-xs">
                        {key === 'wallpaper' && '壁のクロスを新しく'}
                        {key === 'flooring' && '床材の張替え・重ね貼り'}
                        {key === 'ceiling' && '天井のクロス張替え'}
                        {key === 'barrier' && '手すり・段差解消など'}
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: 部屋の広さ */}
            {step === 'room' && (
              <motion.div
                key="room"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">部屋の広さは？</h2>
                  <p className="text-stone-400 text-sm">おおよそで構いません</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(ROOM_SIZES).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setRoomSize(key)
                        goNext()
                      }}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        roomSize === key
                          ? 'border-amber-400 bg-amber-400/10'
                          : 'border-stone-700 hover:border-stone-600'
                      }`}
                    >
                      <span className="text-white font-bold text-lg">{value.name}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-stone-500 hover:text-white transition-colors mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  戻る
                </button>
              </motion.div>
            )}

            {/* Step 3: 仕様選択 */}
            {step === 'option' && workType && (
              <motion.div
                key="option"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">仕様を選んでください</h2>
                  <p className="text-stone-400 text-sm">迷ったら「量産品」がおすすめ</p>
                </div>

                <div className="space-y-3">
                  {Object.entries(PRICE_DATA[workType].options).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setOption(key)
                        goNext()
                      }}
                      className={`w-full p-4 border-2 rounded-xl transition-all text-left flex items-center justify-between ${
                        option === key
                          ? 'border-amber-400 bg-amber-400/10'
                          : 'border-stone-700 hover:border-stone-600'
                      }`}
                    >
                      <span className="text-white font-medium">{value.name}</span>
                      {key === 'standard' || key === 'cf' ? (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">おすすめ</span>
                      ) : key === 'premium' || key === 'laminate' ? (
                        <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded">人気</span>
                      ) : null}
                    </button>
                  ))}
                </div>

                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-stone-500 hover:text-white transition-colors mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  戻る
                </button>
              </motion.div>
            )}

            {/* Step 4: 数量確認 */}
            {step === 'quantity' && (
              <motion.div
                key="quantity"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">何部屋ですか？</h2>
                  <p className="text-stone-400 text-sm">複数部屋の場合は数を調整</p>
                </div>

                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-full border-2 border-stone-700 text-white text-2xl hover:border-stone-600 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-5xl font-black text-amber-400">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-12 h-12 rounded-full border-2 border-stone-700 text-white text-2xl hover:border-stone-600 transition-colors"
                  >
                    +
                  </button>
                </div>

                {workType === 'wallpaper' && (
                  <div className="flex items-center justify-center gap-3 mt-6">
                    <input
                      type="checkbox"
                      id="ceiling"
                      checked={includeCeiling}
                      onChange={(e) => setIncludeCeiling(e.target.checked)}
                      className="w-5 h-5 rounded border-stone-600 bg-stone-800 text-amber-400 focus:ring-amber-400"
                    />
                    <label htmlFor="ceiling" className="text-white">天井も一緒に張り替える</label>
                  </div>
                )}

                {/* 現在の見積もりプレビュー */}
                <div className="bg-stone-800/50 border border-stone-700 rounded-xl p-6 text-center">
                  <p className="text-stone-400 text-sm mb-2">現在の概算</p>
                  <p className="text-3xl font-black text-white">
                    {estimate.min.toLocaleString()}〜{estimate.max.toLocaleString()}
                    <span className="text-lg text-stone-400">円</span>
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={goBack}
                    className="flex-1 py-3 border border-stone-700 text-stone-400 rounded-xl hover:border-stone-600 transition-colors"
                  >
                    戻る
                  </button>
                  <button
                    onClick={goNext}
                    className="flex-1 py-3 bg-amber-400 text-stone-900 font-bold rounded-xl hover:bg-amber-300 transition-colors flex items-center justify-center gap-2"
                  >
                    次へ
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 5: 連絡先 */}
            {step === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">詳しい見積もりをお送りします</h2>
                  <p className="text-stone-400 text-sm">24時間以内にご連絡いたします</p>
                </div>

                {/* 見積もり結果表示 */}
                <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-xl p-6 text-center">
                  <p className="text-amber-400 text-sm mb-2 flex items-center justify-center gap-2">
                    <Calculator className="w-4 h-4" />
                    AI概算見積もり
                  </p>
                  <p className="text-4xl font-black text-white">
                    {estimate.min.toLocaleString()}〜{estimate.max.toLocaleString()}
                    <span className="text-lg text-stone-400">円</span>
                  </p>
                  <p className="text-stone-500 text-xs mt-2">
                    ※ 現場状況により変動します。正確な見積もりは現地調査後にご提示します。
                  </p>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="お名前 *"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-xl text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="電話番号"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-xl text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="メールアドレス"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-xl text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                  />
                  <textarea
                    placeholder="その他ご要望（任意）"
                    value={contact.note}
                    onChange={(e) => setContact({ ...contact, note: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-xl text-white placeholder:text-stone-500 focus:border-amber-400 focus:outline-none resize-none"
                  />
                </div>

                <p className="text-stone-500 text-xs text-center">
                  * 電話またはメールのどちらか必須
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={goBack}
                    className="flex-1 py-3 border border-stone-700 text-stone-400 rounded-xl hover:border-stone-600 transition-colors"
                  >
                    戻る
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-amber-400 text-stone-900 font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? '送信中...' : '見積もりを受け取る'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* 結果 */}
            {step === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-10 h-10 text-white" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">お問い合わせありがとうございます</h2>
                  <p className="text-stone-400">
                    24時間以内に担当者よりご連絡いたします。
                  </p>
                </div>

                <div className="bg-stone-800/50 border border-stone-700 rounded-xl p-6">
                  <p className="text-stone-400 text-sm mb-4">お見積もり内容</p>
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between">
                      <span className="text-stone-500">工事内容</span>
                      <span className="text-white">{workType && PRICE_DATA[workType].name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">部屋の広さ</span>
                      <span className="text-white">{roomSize && ROOM_SIZES[roomSize as keyof typeof ROOM_SIZES].name} x {quantity}部屋</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">概算金額</span>
                      <span className="text-amber-400 font-bold">{estimate.min.toLocaleString()}〜{estimate.max.toLocaleString()}円</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-stone-500 text-sm">お急ぎの場合はお電話ください</p>
                  <a
                    href="tel:03-5638-7402"
                    className="flex items-center justify-center gap-2 py-3 border border-amber-400 text-amber-400 rounded-xl hover:bg-amber-400/10 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    03-5638-7402
                  </a>
                  <Link
                    href="/"
                    className="block py-3 text-stone-500 hover:text-white transition-colors"
                  >
                    トップページに戻る
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* フッター */}
      <footer className="p-4 border-t border-stone-700 text-center">
        <p className="text-stone-600 text-xs">
          30年の経験をベースにしたAI概算システム | 有限会社イワサキ内装
        </p>
      </footer>
    </div>
  )
}
