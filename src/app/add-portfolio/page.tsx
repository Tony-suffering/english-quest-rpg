'use client'

import { useState, useRef } from 'react'
import { Camera, Mic, Sparkles, Upload, X, Check, Loader2 } from 'lucide-react'

type GeneratedData = {
  title: string
  description: string
  location: string
  category: string
  area: string
  work_type: string
  tags: string[]
}

const AddPortfolio = () => {
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [voiceInput, setVoiceInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 画像選択
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setImages(prev => [...prev, ...files])

    // プレビュー生成
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  // 画像削除
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  // 音声入力開始/停止
  const toggleRecording = () => {
    if (isRecording) {
      // 停止
      setIsRecording(false)
      // TODO: 音声認識実装
      alert('音声認識機能は近日実装予定です')
    } else {
      // 開始
      setIsRecording(true)
      // TODO: Web Speech API実装
    }
  }

  // AI解析実行
  const analyzeWithAI = async () => {
    if (images.length === 0) {
      alert('写真を1枚以上選択してください')
      return
    }

    setIsAnalyzing(true)

    try {
      // 画像をBase64に変換
      const imageBase64List = await Promise.all(
        imagePreviews.map(async (preview) => preview)
      )

      // APIリクエスト
      const response = await fetch('/api/analyze-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          images: imageBase64List,
          voiceInput: voiceInput || ''
        })
      })

      if (!response.ok) throw new Error('解析に失敗しました')

      const data = await response.json()
      setGeneratedData(data)
    } catch {
      alert('AI解析に失敗しました。もう一度お試しください。')
    } finally {
      setIsAnalyzing(false)
    }
  }

  // 承認して保存
  const approveAndSave = async () => {
    if (!generatedData) return

    try {
      const response = await fetch('/api/save-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...generatedData,
          images: imagePreviews
        })
      })

      if (!response.ok) throw new Error('保存に失敗しました')

      alert('施工実績を追加しました!')
      // リセット
      setImages([])
      setImagePreviews([])
      setVoiceInput('')
      setGeneratedData(null)
    } catch {
      alert('保存に失敗しました')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ヘッダー */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">撮るだけポートフォリオ</h1>
          <p className="text-gray-600">
            現場の写真を撮って、音声でメモするだけ。AIが施工実績を自動作成します。
          </p>
        </div>

        {/* ステップ1: 写真撮影/アップロード */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-600" />
            ステップ1: 現場の写真を追加
          </h2>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            capture="environment"
            onChange={handleImageSelect}
            className="hidden"
          />

          {/* 画像プレビュー */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={preview}
                  alt={`プレビュー ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* アップロードボタン */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Upload className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">写真を追加</span>
          </button>
        </div>

        {/* ステップ2: 音声メモ */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Mic className="w-5 h-5 text-green-600" />
            ステップ2: 音声メモ (任意)
          </h2>

          <textarea
            value={voiceInput}
            onChange={(e) => setVoiceInput(e.target.value)}
            placeholder="例: 墨田区のマンション、6畳クロス張替え、サンゲツSP使用"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />

          <button
            onClick={toggleRecording}
            className={`mt-3 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            <Mic className="w-5 h-5" />
            {isRecording ? '録音停止' : '音声入力'}
          </button>
        </div>

        {/* ステップ3: AI解析 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            ステップ3: AIで自動生成
          </h2>

          <button
            onClick={analyzeWithAI}
            disabled={isAnalyzing || images.length === 0}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                AI解析中...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                AIで施工実績を生成
              </>
            )}
          </button>
        </div>

        {/* 生成結果プレビュー */}
        {generatedData && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-2 border-green-500">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              生成された施工実績
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
                <input
                  type="text"
                  value={generatedData.title}
                  onChange={(e) => setGeneratedData({ ...generatedData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">説明文</label>
                <textarea
                  value={generatedData.description}
                  onChange={(e) => setGeneratedData({ ...generatedData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">場所</label>
                  <input
                    type="text"
                    value={generatedData.location}
                    onChange={(e) => setGeneratedData({ ...generatedData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリ</label>
                  <select
                    value={generatedData.category}
                    onChange={(e) => setGeneratedData({ ...generatedData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="住宅・マンション">住宅・マンション</option>
                    <option value="店舗・オフィス">店舗・オフィス</option>
                    <option value="公共施設">公共施設</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">施工面積</label>
                  <input
                    type="text"
                    value={generatedData.area}
                    onChange={(e) => setGeneratedData({ ...generatedData, area: e.target.value })}
                    placeholder="例: 68㎡"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">工事内容</label>
                  <input
                    type="text"
                    value={generatedData.work_type}
                    onChange={(e) => setGeneratedData({ ...generatedData, work_type: e.target.value })}
                    placeholder="例: クロス・CF張替"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">タグ</label>
                <input
                  type="text"
                  value={generatedData.tags.join(', ')}
                  onChange={(e) => setGeneratedData({
                    ...generatedData,
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                  })}
                  placeholder="例: クロス, CF, 下地補修"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={approveAndSave}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <Check className="w-5 h-5" />
                承認して公開
              </button>
              <button
                onClick={() => setGeneratedData(null)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                やり直す
              </button>
            </div>
          </div>
        )}

        {/* 使い方ヒント */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">使い方のコツ</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• ビフォー/アフター写真を両方撮ると自動判定します</li>
            <li>• 音声メモは「場所、工事内容、使った材料」を話すとAIが理解します</li>
            <li>• 生成後に内容を編集できます</li>
            <li>• 承認すると施工実績マップに即座に反映されます</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AddPortfolio
