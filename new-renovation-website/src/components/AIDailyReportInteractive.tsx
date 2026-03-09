'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, ChevronDown, RefreshCw, Calendar, TrendingUp, AlertCircle, Target, CheckCircle, MessageSquare, Send, ThumbsUp, ThumbsDown, Settings } from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

interface AIDailyReport {
  id: string
  report_date: string
  category: string
  content: string
  insights?: any
  metrics?: any
  created_at: string
  updated_at: string
}

interface Feedback {
  id: string
  report_id: string
  feedback_text: string
  feedback_type: string
  priority_topics: string[]
  ignore_topics: string[]
  created_at: string
}

export default function AIDailyReportInteractive() {
  const [report, setReport] = useState<AIDailyReport | null>(null)
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | 'request'>('request')
  const [priorityTopics, setPriorityTopics] = useState<string[]>([])
  const [ignoreTopics, setIgnoreTopics] = useState<string[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const supabase = createClient()

  // 利用可能なトピック
  const availableTopics = [
    '施工前案件の分析',
    '売上前案件の分析',
    '資金繰り分析',
    '取引先分析',
    '粗利率分析',
    'スケジュール競合',
    '支払い予定',
    '入金予定',
    '新規開拓',
    '外注管理',
    '経費削減',
    'リスク分析'
  ]

  useEffect(() => {
    fetchLatestReport()
  }, [])

  const fetchLatestReport = async () => {
    setLoading(true)
    try {
      // 最新のレポートを取得
      const { data, error } = await supabase
        .from('ai_daily_reports')
        .select('*')
        .eq('category', 'project_analysis')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error) throw error
      setReport(data)

      // このレポートのフィードバックを取得
      if (data) {
        const { data: feedbackData } = await supabase
          .from('ai_report_feedback')
          .select('*')
          .eq('report_id', data.id)
          .order('created_at', { ascending: false })

        if (feedbackData) {
          setFeedbacks(feedbackData)
        }
      }
    } catch (error) {
      console.error('Error fetching report:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendFeedback = async () => {
    if (!feedbackText.trim() || !report) return

    try {
      // フィードバックを保存
      const { error } = await supabase
        .from('ai_report_feedback')
        .insert({
          report_id: report.id,
          feedback_text: feedbackText,
          feedback_type: feedbackType,
          priority_topics: priorityTopics,
          ignore_topics: ignoreTopics
        })

      if (error) throw error

      // 設定を保存（優先トピックと無視トピック）
      if (priorityTopics.length > 0 || ignoreTopics.length > 0) {
        await supabase
          .from('ai_report_preferences')
          .insert({
            preference_type: 'analysis_topics',
            preference_value: {
              priority: priorityTopics,
              ignore: ignoreTopics
            }
          })
      }

      toast.success('フィードバックを送信しました。次回の分析に反映されます。')
      setFeedbackText('')
      setShowFeedbackForm(false)
      setFeedbackType('request')
      setPriorityTopics([])
      setIgnoreTopics([])

      // フィードバックリストを更新
      fetchLatestReport()
    } catch (error) {
      console.error('Error sending feedback:', error)
      toast.error('フィードバックの送信に失敗しました')
    }
  }

  const handleTopicToggle = (topic: string, list: 'priority' | 'ignore') => {
    if (list === 'priority') {
      setPriorityTopics(prev =>
        prev.includes(topic)
          ? prev.filter(t => t !== topic)
          : [...prev, topic]
      )
      // 優先リストに追加したら無視リストから削除
      setIgnoreTopics(prev => prev.filter(t => t !== topic))
    } else {
      setIgnoreTopics(prev =>
        prev.includes(topic)
          ? prev.filter(t => t !== topic)
          : [...prev, topic]
      )
      // 無視リストに追加したら優先リストから削除
      setPriorityTopics(prev => prev.filter(t => t !== topic))
    }
  }

  const getReportIcon = () => {
    const icons = [
      <TrendingUp className="h-4 w-4" key="trending" />,
      <AlertCircle className="h-4 w-4" key="alert" />,
      <Target className="h-4 w-4" key="target" />,
      <CheckCircle className="h-4 w-4" key="check" />
    ]
    return icons[Math.floor(Math.random() * icons.length)]
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

  if (!report) {
    return null
  }

  const reportLines = report.content.split('\n').filter(line => line.trim())
  const previewLines = reportLines.slice(0, 2)
  const hasMetrics = report.metrics && Object.keys(report.metrics).length > 0
  const hasInsights = report.insights && Object.keys(report.insights).length > 0

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-blue-900 flex items-center gap-2">
            {getReportIcon()}
            AIプロジェクト分析レポート
            <Badge variant="outline" className="ml-2">
              {format(new Date(report.created_at + '+00:00'), 'M/d HH:mm更新', { locale: ja })}
            </Badge>
          </CardTitle>
          <div className="flex gap-2">
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>分析設定</DialogTitle>
                  <DialogDescription>
                    次回以降の分析で重点的に見てほしいトピックを選択してください
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>優先的に分析してほしいトピック</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {availableTopics.map(topic => (
                        <div key={topic} className="flex items-center space-x-2">
                          <Checkbox
                            checked={priorityTopics.includes(topic)}
                            onCheckedChange={() => handleTopicToggle(topic, 'priority')}
                            disabled={ignoreTopics.includes(topic)}
                          />
                          <label className="text-sm">{topic}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>分析不要なトピック</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {availableTopics.map(topic => (
                        <div key={topic} className="flex items-center space-x-2">
                          <Checkbox
                            checked={ignoreTopics.includes(topic)}
                            onCheckedChange={() => handleTopicToggle(topic, 'ignore')}
                            disabled={priorityTopics.includes(topic)}
                          />
                          <label className="text-sm">{topic}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setShowSettings(false)
                      toast.success('設定を保存しました')
                    }}
                    className="w-full"
                  >
                    設定を保存
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchLatestReport}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* プレビューまたは全文表示 */}
          <div className="text-sm text-gray-700 space-y-2">
            {isExpanded ? (
              <>
                {reportLines.map((line, index) => (
                  <p key={index} className={line.startsWith('🔴') ? 'font-bold text-red-600' :
                                          line.startsWith('🟡') ? 'font-semibold text-yellow-600' :
                                          line.startsWith('✅') ? 'text-green-600' : ''}>
                    {line}
                  </p>
                ))}

                {/* メトリクス表示 */}
                {hasMetrics && (
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      分析メトリクス
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(report.metrics).map(([key, value]: [string, any]) => {
                        // オブジェクトの場合は特別な処理
                        if (typeof value === 'object' && value !== null) {
                          // 配列の場合
                          if (Array.isArray(value)) {
                            return (
                              <div key={key} className="col-span-2">
                                <span className="text-gray-600">{key}:</span>
                                <span className="font-medium ml-2">{value.join(', ')}</span>
                              </div>
                            )
                          }
                          // オブジェクトで特定のプロパティがある場合
                          if (value.name && value.percentage) {
                            return (
                              <div key={key} className="flex justify-between">
                                <span className="text-gray-600">{key}:</span>
                                <span className="font-medium">{value.name} ({value.percentage}%)</span>
                              </div>
                            )
                          }
                          // その他のオブジェクト
                          return (
                            <div key={key} className="col-span-2">
                              <span className="text-gray-600">{key}:</span>
                              <span className="font-medium ml-2">{JSON.stringify(value, null, 2)}</span>
                            </div>
                          )
                        }
                        // プリミティブ値の場合
                        return (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600">{key}:</span>
                            <span className="font-medium">{String(value)}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* インサイト表示 */}
                {hasInsights && (
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      推奨アクション
                    </h4>
                    <ul className="space-y-1 text-xs">
                      {Object.values(report.insights).map((insight: any, index: number) => {
                        // インサイトがオブジェクトの場合の処理
                        let displayText = ''
                        if (typeof insight === 'object' && insight !== null) {
                          if (insight.text) {
                            displayText = String(insight.text)
                          } else if (insight.message) {
                            displayText = String(insight.message)
                          } else if (Array.isArray(insight)) {
                            displayText = insight.join(', ')
                          } else {
                            displayText = JSON.stringify(insight)
                          }
                        } else {
                          displayText = String(insight)
                        }

                        return (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{displayText}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}

                {/* フィードバック履歴 */}
                {feedbacks.length > 0 && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">過去のフィードバック</h4>
                    <div className="space-y-2">
                      {feedbacks.slice(0, 3).map(feedback => (
                        <div key={feedback.id} className="text-xs p-2 bg-white rounded">
                          <div className="flex items-center gap-2 mb-1">
                            {feedback.feedback_type === 'positive' && <ThumbsUp className="h-3 w-3 text-green-500" />}
                            {feedback.feedback_type === 'negative' && <ThumbsDown className="h-3 w-3 text-red-500" />}
                            {feedback.feedback_type === 'request' && <MessageSquare className="h-3 w-3 text-blue-500" />}
                            <span className="text-gray-500">
                              {format(new Date(feedback.created_at + '+00:00'), 'MM/dd HH:mm', { locale: ja })}
                            </span>
                          </div>
                          <p className="text-gray-700">{feedback.feedback_text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* フィードバックフォーム */}
                {showFeedbackForm && (
                  <div className="mt-4 p-4 bg-white rounded-lg border">
                    <h4 className="font-semibold text-sm mb-3">レポートへのフィードバック</h4>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={feedbackType === 'positive' ? 'default' : 'outline'}
                          onClick={() => setFeedbackType('positive')}
                        >
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          良い分析
                        </Button>
                        <Button
                          size="sm"
                          variant={feedbackType === 'negative' ? 'default' : 'outline'}
                          onClick={() => setFeedbackType('negative')}
                        >
                          <ThumbsDown className="h-3 w-3 mr-1" />
                          改善希望
                        </Button>
                        <Button
                          size="sm"
                          variant={feedbackType === 'request' ? 'default' : 'outline'}
                          onClick={() => setFeedbackType('request')}
                        >
                          <MessageSquare className="h-3 w-3 mr-1" />
                          リクエスト
                        </Button>
                      </div>
                      <Textarea
                        placeholder="このレポートについてのご意見をお聞かせください。次回の分析に反映させます。"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setShowFeedbackForm(false)
                            setFeedbackText('')
                          }}
                        >
                          キャンセル
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSendFeedback}
                          disabled={!feedbackText.trim()}
                        >
                          <Send className="h-3 w-3 mr-1" />
                          送信
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              previewLines.map((line, index) => (
                <p key={index} className="text-sm text-gray-700">
                  {line}
                </p>
              ))
            )}
          </div>

          {/* 展開/折りたたみボタンとフィードバックボタン */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-700"
            >
              {isExpanded ? (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  折りたたむ
                </>
              ) : (
                <>
                  <ChevronRight className="h-4 w-4 mr-1" />
                  続きを読む
                </>
              )}
            </Button>
            {isExpanded && !showFeedbackForm && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFeedbackForm(true)}
                className="text-blue-600"
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                フィードバックを送る
              </Button>
            )}
          </div>
        </div>

        {/* 最終更新時刻 */}
        {isExpanded && (
          <div className="mt-4 pt-3 border-t text-xs text-gray-500 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(report.created_at + '+00:00'), 'yyyy年MM月dd日 HH:mm', { locale: ja })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}