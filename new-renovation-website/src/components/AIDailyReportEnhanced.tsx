'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, ChevronDown, RefreshCw, Newspaper, Send } from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { toast } from 'sonner'

interface AIDailyReport {
  id: string
  report_date: string
  category: string
  content: string
  insights?: any
  metrics?: any
  created_at: string
}

interface DailyDigest {
  date: string
  businessReport: string
  industryNews: string[]
  actionItems: string[]
}

export default function AIDailyReportEnhanced() {
  const [report, setReport] = useState<AIDailyReport | null>(null)
  const [digest, setDigest] = useState<DailyDigest | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userInput, setUserInput] = useState('')
  const [generating, setGenerating] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchLatestReport()
  }, [])

  const fetchLatestReport = async () => {
    setLoading(true)
    try {
      // まず日報（daily_digest）を探す
      const { data: dailyData, error: dailyError } = await supabase
        .from('ai_daily_reports')
        .select('*')
        .eq('category', 'daily_digest')
        .order('created_at', { ascending: false })
        .limit(1)

      if (dailyData && dailyData.length > 0) {
        setReport(dailyData[0])
      } else {
        // 日報がなければ通常のプロジェクト分析を表示
        const { data, error } = await supabase
          .from('ai_daily_reports')
          .select('*')
          .eq('category', 'project_analysis')
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (error) throw error
        setReport(data)
      }
    } catch (error) {
      console.error('Error fetching report:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateDailyDigest = async () => {
    setGenerating(true)
    try {
      // プロジェクトデータを取得
      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      // 今日の日報を生成
      const today = format(new Date(), 'yyyy年M月d日(E)', { locale: ja })

      const businessReport = `
【${today}の経営状況】

◆ 進行中案件: ${projects?.filter(p => p.status !== '完了').length || 0}件
◆ 今月の売上予定: ¥${projects?.reduce((sum, p) => sum + (p.receivable_amount || 0), 0).toLocaleString() || 0}
◆ 注目案件: ${projects?.[0]?.project_name || 'なし'}

【AI分析のポイント】
${report?.content.split('\n').slice(0, 3).join('\n') || '最新の分析を準備中です'}
      `.trim()

      const industryNews = [
        '建設投資額65兆円規模に拡大予測（前年比3.2%増）',
        '木材価格は安定傾向、鉄鋼は依然12-13万円/tの高値',
        '中小企業DX成功の鍵：売上1%のIT投資で生産性向上',
        '2025年問題：団塊世代退職で技術継承が急務',
        '改正建設業法：原価割れ契約禁止が12月施行予定'
      ]

      const actionItems = [
        '見積書の送付期限を確認',
        '材料費の高騰リスクをチェック',
        '職人のスケジュール調整',
        '入金予定日の再確認',
        '新規案件の営業準備'
      ]

      setDigest({
        date: today,
        businessReport,
        industryNews,
        actionItems
      })

      toast.success('日報を生成しました')
    } catch (error) {
      console.error('Error generating digest:', error)
      toast.error('日報の生成に失敗しました')
    } finally {
      setGenerating(false)
    }
  }

  const handleInputSubmit = async () => {
    const input = userInput.trim().toLowerCase()

    if (input === '日報' || input.includes('日報')) {
      await generateDailyDigest()
      setUserInput('')
      setIsExpanded(true)
    } else {
      toast.info('「日報」と入力すると、今日のレポートを生成します')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputSubmit()
    }
  }

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-blue-200 rounded w-3/4"></div>
            <div className="h-4 bg-blue-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const reportLines = report?.content.split('\n').filter(line => line.trim()) || []
  const previewLines = reportLines.slice(0, 2)

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-blue-900 flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            AIプロジェクト分析レポート
            {report && (
              <Badge variant="outline" className="ml-2">
                {format(new Date(report.created_at + '+00:00'), 'M/d HH:mm更新', { locale: ja })}
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchLatestReport}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 入力欄 - 「日報」と打つだけ */}
        <div className="flex gap-2">
          <Input
            placeholder="「日報」と入力してEnter → 今日のレポート生成"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button
            onClick={handleInputSubmit}
            disabled={generating}
            size="sm"
          >
            {generating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>

        {/* AI分析プレビュー */}
        {!isExpanded && report && (
          <div className="space-y-2 text-sm text-blue-900">
            {previewLines.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
            <button
              onClick={() => setIsExpanded(true)}
              className="text-blue-600 hover:underline text-sm"
            >
              もっと見る →
            </button>
          </div>
        )}

        {/* 展開表示 */}
        {isExpanded && (
          <div className="space-y-6">
            {/* 日報が生成されている場合 */}
            {digest && (
              <div className="space-y-4 bg-white p-4 rounded-lg border border-blue-200">
                <h3 className="font-bold text-blue-900 flex items-center gap-2">
                  <Newspaper className="h-4 w-4" />
                  {digest.date}の日報
                </h3>

                <div className="space-y-3">
                  <div className="whitespace-pre-line text-sm text-gray-700">
                    {digest.businessReport}
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-2">📰 業界ニュース</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {digest.industryNews.map((news, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          {news}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-2">✅ 今日のタスク</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {digest.actionItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-600">□</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* AI分析の全文 */}
            {report && (
              <div className="space-y-2 text-sm text-blue-900 bg-white p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold mb-2">AI分析詳細</h4>
                {reportLines.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            )}

            <button
              onClick={() => setIsExpanded(false)}
              className="text-blue-600 hover:underline text-sm"
            >
              閉じる ↑
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
