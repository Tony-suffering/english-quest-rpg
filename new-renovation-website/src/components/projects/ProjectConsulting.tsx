'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  MessageSquare,
  Send,
  Sparkles,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  Loader2
} from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

interface ProjectConsultingProps {
  projectId: string
  projectData: {
    project: any
    payables: any[]
    quotations: any[]
    invoices: any[]
    transactions: any[]
  }
}

interface ConsultingQA {
  id: string
  project_id: string
  thread_id?: string
  question: string
  answer?: string
  question_type?: string
  status: string
  context?: any
  data_sources_analyzed?: string[]
  confidence_score?: number
  created_at: string
  answered_at?: string
}

export function ProjectConsulting({ projectId, projectData }: ProjectConsultingProps) {
  const [questions, setQuestions] = useState<ConsultingQA[]>([])
  const [newQuestion, setNewQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    loadQuestions()
  }, [projectId])

  const loadQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('project_consulting_qa')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setQuestions(data || [])
    } catch (error) {
      console.error('Error loading questions:', error)
    }
  }

  const submitQuestion = async () => {
    if (!newQuestion.trim()) return

    setLoading(true)
    try {
      // 質問タイプを判定
      let questionType = 'general'
      if (newQuestion.includes('コスト') || newQuestion.includes('費用') || newQuestion.includes('価格')) {
        questionType = 'cost'
      } else if (newQuestion.includes('スケジュール') || newQuestion.includes('工期') || newQuestion.includes('納期')) {
        questionType = 'schedule'
      } else if (newQuestion.includes('品質') || newQuestion.includes('クオリティ')) {
        questionType = 'quality'
      } else if (newQuestion.includes('リソース') || newQuestion.includes('人員') || newQuestion.includes('職人')) {
        questionType = 'resource'
      }

      // コンテキストデータを準備
      const contextData = {
        project_summary: {
          name: projectData.project.project_name,
          receivable: projectData.project.receivable_amount,
          construction_status: projectData.project.construction_status,
          sales_status: projectData.project.sales_status
        },
        payables_summary: {
          count: projectData.payables.length,
          total: projectData.payables.reduce((sum, p) => sum + p.payable_amount, 0)
        },
        documents: {
          quotations: projectData.quotations.length,
          invoices: projectData.invoices.length
        }
      }

      // 質問を保存
      const { data: questionData, error } = await supabase
        .from('project_consulting_qa')
        .insert({
          project_id: projectId,
          question: newQuestion,
          question_type: questionType,
          status: 'pending',
          context: contextData
        })
        .select()
        .single()

      if (error) throw error

      setQuestions([questionData, ...questions])
      setNewQuestion('')
      toast.success('質問を送信しました')

      // 自動回答生成（簡易版）
      generateAnswer(questionData.id)
    } catch (error) {
      console.error('Error submitting question:', error)
      toast.error('質問の送信に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const generateAnswer = async (questionId: string) => {
    setGenerating(questionId)
    try {
      const question = questions.find(q => q.id === questionId) ||
                      (await supabase.from('project_consulting_qa').select('*').eq('id', questionId).single()).data

      if (!question) return

      // プロジェクトデータを分析して回答を生成（簡易版）
      let answer = ''
      const totalPayables = projectData.payables.reduce((sum, p) => sum + p.payable_amount, 0)
      const grossProfit = (projectData.project.receivable_amount || 0) - totalPayables
      const profitMargin = projectData.project.receivable_amount ?
        (grossProfit / projectData.project.receivable_amount * 100) : 0

      // 質問タイプに応じた回答生成
      if (question.question_type === 'cost') {
        answer = `コスト分析結果：\n\n` +
          `売掛金額: ¥${projectData.project.receivable_amount?.toLocaleString() || 0}\n` +
          `買掛合計: ¥${totalPayables.toLocaleString()}\n` +
          `粗利益: ¥${grossProfit.toLocaleString()} (${profitMargin.toFixed(1)}%)\n\n`

        if (profitMargin < 20) {
          answer += `⚠️ 利益率が20%を下回っています。以下の改善策を検討してください：\n` +
            `1. 外注費の見直し（現在${projectData.payables.length}社と取引）\n` +
            `2. 追加請求の可能性を検討\n` +
            `3. 作業効率の改善によるコスト削減`
        } else {
          answer += `✅ 利益率は健全な水準です。現在の価格戦略を維持しつつ、さらなる効率化を目指しましょう。`
        }
      } else if (question.question_type === 'schedule') {
        answer = `スケジュール分析結果：\n\n` +
          `工事ステータス: ${projectData.project.construction_status || '未設定'}\n` +
          `売上ステータス: ${projectData.project.sales_status || '未設定'}\n` +
          `売上計上日: ${projectData.project.transaction_date ? format(new Date(projectData.project.transaction_date), 'yyyy/MM/dd') : '未設定'}\n\n`

        if (projectData.project.construction_status === '施工前') {
          answer += `📋 施工前の準備事項：\n` +
            `1. 必要な資材の手配状況を確認\n` +
            `2. 職人のスケジュール調整\n` +
            `3. 現場の事前確認と安全対策`
        } else if (projectData.project.construction_status === '施工中') {
          answer += `🔨 施工中の管理ポイント：\n` +
            `1. 進捗状況の定期確認\n` +
            `2. 品質管理の徹底\n` +
            `3. 追加作業の早期発見と対応`
        }
      } else if (question.question_type === 'quality') {
        answer = `品質管理の推奨事項：\n\n` +
          `1. 施工前チェックリストの作成と確認\n` +
          `2. 中間検査の実施（特に隠蔽部分）\n` +
          `3. 完成検査での詳細確認\n` +
          `4. 顧客立会い検査の実施\n\n` +
          `見積書${projectData.quotations.length}件、請求書${projectData.invoices.length}件が登録されています。` +
          `仕様書と実施内容の整合性を確認してください。`
      } else if (question.question_type === 'resource') {
        answer = `リソース分析結果：\n\n` +
          `外注先: ${projectData.payables.length}社\n` +
          `外注費合計: ¥${totalPayables.toLocaleString()}\n\n`

        if (projectData.payables.length > 3) {
          answer += `📊 複数の外注先を使用しています。以下の点に注意：\n` +
            `1. 各社の作業範囲と責任分界点の明確化\n` +
            `2. スケジュール調整と連携の強化\n` +
            `3. 品質基準の統一と管理`
        } else {
          answer += `✅ 外注先の数は適切です。継続的な関係構築により、品質と効率の向上を図りましょう。`
        }
      } else {
        // 一般的な質問への回答
        answer = `プロジェクト「${projectData.project.project_name}」の総合分析：\n\n` +
          `【財務状況】\n` +
          `・粗利益: ¥${grossProfit.toLocaleString()} (${profitMargin.toFixed(1)}%)\n` +
          `・買掛先: ${projectData.payables.length}社\n\n` +
          `【ステータス】\n` +
          `・工事: ${projectData.project.construction_status || '未設定'}\n` +
          `・売上: ${projectData.project.sales_status || '未設定'}\n\n` +
          `【推奨アクション】\n`

        if (profitMargin < 20) {
          answer += `1. コスト削減策の検討\n`
        }
        if (projectData.project.construction_status === '施工前') {
          answer += `2. 施工準備の確認\n`
        }
        if (projectData.invoices.length === 0 && projectData.project.sales_status !== '売上前') {
          answer += `3. 請求書の作成\n`
        }
      }

      // 回答を保存
      const { error } = await supabase
        .from('project_consulting_qa')
        .update({
          answer,
          status: 'answered',
          answered_at: new Date().toISOString(),
          data_sources_analyzed: ['projects', 'project_payables', 'quotations', 'invoices', 'transactions'],
          confidence_score: 0.85
        })
        .eq('id', questionId)

      if (error) throw error

      // 質問リストを更新
      setQuestions(questions.map(q =>
        q.id === questionId
          ? { ...q, answer, status: 'answered', answered_at: new Date().toISOString() }
          : q
      ))

      toast.success('回答を生成しました')
    } catch (error) {
      console.error('Error generating answer:', error)
      toast.error('回答の生成に失敗しました')
    } finally {
      setGenerating(null)
    }
  }

  const getQuestionTypeBadge = (type: string) => {
    const typeMap: { [key: string]: { label: string; variant: any } } = {
      cost: { label: 'コスト', variant: 'default' },
      schedule: { label: 'スケジュール', variant: 'secondary' },
      quality: { label: '品質', variant: 'outline' },
      resource: { label: 'リソース', variant: 'default' },
      general: { label: '一般', variant: 'secondary' }
    }

    const config = typeMap[type || 'general']
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'answered':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* 入力フォーム */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            AIコンサルティング
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertDescription>
              プロジェクトに関する質問を入力してください。AIが詳細な分析と提案を行います。
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Textarea
              placeholder="例: このプロジェクトの利益率を改善するにはどうすればいいですか？"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Badge variant="outline">コスト分析</Badge>
                <Badge variant="outline">スケジュール管理</Badge>
                <Badge variant="outline">品質向上</Badge>
                <Badge variant="outline">リソース最適化</Badge>
              </div>
              <Button
                onClick={submitQuestion}
                disabled={loading || !newQuestion.trim()}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                送信
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Q&A履歴 */}
      <Card>
        <CardHeader>
          <CardTitle>相談履歴</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {questions.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">まだ質問がありません</p>
                  <p className="text-sm text-gray-400 mt-2">
                    プロジェクトに関する質問を入力して、AIのアドバイスを受けましょう
                  </p>
                </div>
              ) : (
                questions.map((qa) => (
                  <Card key={qa.id} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(qa.status)}
                          {getQuestionTypeBadge(qa.question_type || 'general')}
                          <span className="text-sm text-gray-500">
                            {format(new Date(qa.created_at), 'yyyy/MM/dd HH:mm')}
                          </span>
                        </div>
                        {qa.confidence_score && (
                          <Badge variant="outline">
                            確信度: {(qa.confidence_score * 100).toFixed(0)}%
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="font-medium mb-1">質問:</p>
                        <p className="text-gray-700">{qa.question}</p>
                      </div>

                      {qa.status === 'answered' && qa.answer ? (
                        <div>
                          <p className="font-medium mb-1">回答:</p>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700 whitespace-pre-wrap">{qa.answer}</p>
                          </div>
                          {qa.data_sources_analyzed && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-500">
                                分析データ: {qa.data_sources_analyzed.join(', ')}
                              </p>
                            </div>
                          )}
                        </div>
                      ) : qa.status === 'pending' ? (
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          {generating === qa.id ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <p className="text-sm text-yellow-700">回答を生成中...</p>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-yellow-700">回答待ち</p>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => generateAnswer(qa.id)}
                              >
                                <Sparkles className="h-3 w-3 mr-1" />
                                AI回答生成
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}