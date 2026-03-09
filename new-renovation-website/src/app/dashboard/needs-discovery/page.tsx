'use client';

import { useState } from 'react';

export default function NeedsDiscoveryPage() {
  const [manifestNeed, setManifestNeed] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleDiscover = async () => {
    if (!manifestNeed.trim()) {
      setError('顕在ニーズを入力してください');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/discover-needs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          manifest_need: manifestNeed,
          context: context
        })
      });

      if (!response.ok) {
        throw new Error('分析に失敗しました');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            潜在ニーズ探査エンジン
          </h1>
          <p className="text-gray-600 mb-8">
            顕在ニーズから潜在ニーズを発掘し、ビジネス機会を見つけ出します
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                顕在ニーズ（顧客からの依頼内容）
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="例: 杉並区、6帖～10帖のクロス張り替えと塩ビシート貼り"
                value={manifestNeed}
                onChange={(e) => setManifestNeed(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                背景情報（オプション）
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
                placeholder="例: リフォーム済みマンション、入居前"
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={handleDiscover}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? '分析中...' : '潜在ニーズを発掘する'}
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-6">
            {/* 潜在ニーズ仮説 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                💡 潜在ニーズ仮説
              </h2>
              <div className="space-y-4">
                {result.hypothesis?.latent_needs?.map((need: any, index: number) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-semibold text-gray-900">
                        {need.need}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {need.emotion}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{need.reasoning}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  <strong>確信度:</strong> {(result.hypothesis?.hypothesis_confidence * 100).toFixed(0)}%
                </p>
              </div>
            </div>

            {/* 検索結果 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🔍 市場調査結果
              </h2>
              <div className="space-y-4">
                {result.search_results?.map((search: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      検索: {search.query}
                    </h3>
                    {search.error ? (
                      <p className="text-sm text-red-600">{search.error}</p>
                    ) : (
                      <div className="space-y-2">
                        {search.results?.slice(0, 3).map((item: any, idx: number) => (
                          <div key={idx} className="text-sm">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline font-medium"
                            >
                              {item.title}
                            </a>
                            <p className="text-gray-600 text-xs mt-1">{item.snippet}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 感情分析 */}
            {result.analysis?.sentiment_analysis && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  😰 感情分析
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">支配的な感情</p>
                    <p className="text-xl font-bold text-gray-900">
                      {result.analysis.sentiment_analysis.dominant_emotion}
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">強度</p>
                    <p className="text-xl font-bold text-gray-900">
                      {result.analysis.sentiment_analysis.intensity}
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">頻出フレーズ</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {result.analysis.sentiment_analysis.common_phrases?.map((phrase: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {phrase}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ビジネス機会 */}
            {result.analysis?.service_proposal && (
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">
                  💼 ビジネス機会提案
                </h2>
                <div className="bg-white/10 rounded-lg p-6 space-y-4">
                  <div>
                    <p className="text-blue-100 text-sm mb-1">サービス名</p>
                    <p className="text-2xl font-bold">{result.analysis.service_proposal.name}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-blue-100 text-sm mb-1">ターゲット</p>
                      <p className="font-semibold">{result.analysis.service_proposal.target}</p>
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm mb-1">価格モデル</p>
                      <p className="font-semibold">{result.analysis.service_proposal.pricing_model}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm mb-1">解決する痛み</p>
                    <p className="font-semibold">{result.analysis.service_proposal.pain_point}</p>
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm mb-1">提供する解決策</p>
                    <p className="font-semibold">{result.analysis.service_proposal.solution}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-blue-100 text-sm mb-2">イワサキ内装の独自価値</p>
                  <p className="text-lg">{result.analysis.iwasaki_value_proposition}</p>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-blue-100 text-sm mb-2">市場規模推定</p>
                  <p>{result.analysis.market_size_estimate}</p>
                </div>
              </div>
            )}

            {/* 次のアクション */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ⚡ 次のアクション
              </h2>
              <ul className="space-y-2">
                {result.next_actions?.map((action: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">{index + 1}.</span>
                    <span className="text-gray-700">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
