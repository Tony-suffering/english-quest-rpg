'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';
import { Sparkles, TrendingUp, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DailyReport {
  id: string;
  report_date: string;
  title: string;
  content: string;
  metrics?: any;
  insights?: any;
  category: string;
}

export default function AIDailyReport() {
  const [report, setReport] = useState<DailyReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const supabase = createClient();

  const fetchReport = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('ai_daily_reports')
        .select('*')
        .eq('report_date', today)
        .eq('category', 'project_analysis')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching report:', error);
      }

      // titleフィールドがない場合のデフォルト設定
      if (data && !data.title) {
        data.title = 'AI案件分析レポート';
      }

      setReport(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchReport();
  }, []);

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            AI案件分析レポート
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderMetricsIcons = () => {
    if (!report?.insights) return null;

    const { profitHealth, workload } = report.insights;

    return (
      <div className="flex gap-2 mt-2">
        {profitHealth === 'good' ? (
          <span className="flex items-center gap-1 text-green-600 text-sm">
            <TrendingUp className="h-4 w-4" />
            収益健全
          </span>
        ) : (
          <span className="flex items-center gap-1 text-yellow-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            収益改善必要
          </span>
        )}

        {workload === 'high' && (
          <span className="flex items-center gap-1 text-orange-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            高負荷
          </span>
        )}
      </div>
    );
  };

  // コンテンツを行で分割して、最初の1-2行だけを取得
  const getDisplayContent = () => {
    if (!report?.content) return '';

    const lines = report.content.split('\n').filter(line => line.trim());
    const maxLines = 2; // 5行から2行に変更

    if (!isExpanded && lines.length > maxLines) {
      // 最初の2行だけ表示して、末尾に...を追加
      return lines.slice(0, maxLines).join('\n') + '...';
    }

    return report.content;
  };

  // 表示する行数を確認
  const shouldShowExpandButton = () => {
    if (!report?.content) return false;
    const lines = report.content.split('\n').filter(line => line.trim());
    return lines.length > 2; // 5行から2行に変更
  };

  return (
    <Card className="w-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
          {report?.title || 'AI案件分析レポート'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {report ? (
          <div className="space-y-4">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {getDisplayContent()}
            </div>

            {shouldShowExpandButton() && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    閉じる
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    続きを読む
                  </>
                )}
              </Button>
            )}

            {/* メトリクスアイコンも展開時のみ表示 */}
            {isExpanded && renderMetricsIcons()}

            {/* 推奨アクションも展開時のみ表示 */}
            {isExpanded && report.insights?.recommendation && report.insights.recommendation.length > 0 && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm font-semibold mb-1">📌 推奨アクション:</p>
                <ul className="text-sm space-y-1">
                  {report.insights.recommendation.map((rec: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-yellow-600">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {isExpanded && (
              <div className="text-xs text-gray-500 mt-4">
                最終更新: {new Date().toLocaleString('ja-JP')}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">本日の案件分析レポートはまだありません</p>
            <p className="text-xs text-gray-400 mt-2">ターミナルで「日報」と入力してレポートを生成してください</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}