'use client';

export default function EdmundEstimatePage() {
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white text-gray-900 font-serif">

        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl tracking-[1em] mb-8">御 見 積 書</h1>
          <p className="text-right text-lg mb-8">令和8年1月19日</p>

          <div className="flex justify-between items-start">
            <div className="text-left">
              <p className="text-xl border-b-2 border-gray-900 pb-1 inline-block mb-2">
                エドモンド キース ヘンリー 様
              </p>
            </div>
            <div className="text-right text-sm leading-relaxed">
              <p className="font-bold text-lg mb-2">有限会社 イワサキ内装</p>
              <p>〒130-0021</p>
              <p>東京都墨田区緑 1-24-2</p>
              <p>タカミビル101</p>
              <p className="mt-2">代表取締役　岩崎 和男</p>
            </div>
          </div>
        </header>

        {/* Total Amount */}
        <section className="border-4 border-gray-900 p-6 mb-12">
          <div className="text-center">
            <p className="text-lg mb-2">御見積金額</p>
            <p className="text-4xl font-bold">￥2,320,000-<span className="text-lg font-normal">（税別）</span></p>
            <p className="text-sm mt-2">※消費税（10%）別途</p>
          </div>
        </section>

        {/* Project Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-bold border-l-4 border-gray-900 pl-3 mb-4">■ 工事概要</h2>
          <table className="w-full border-collapse">
            <tbody className="text-sm">
              <tr className="border-b border-gray-300">
                <td className="py-2 w-1/4 font-bold bg-gray-50 px-3">工事名称</td>
                <td className="py-2 px-3">目黒区八雲 邸内装改修工事（クロス貼り替え・仮設工事）</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="py-2 w-1/4 font-bold bg-gray-50 px-3">施工場所</td>
                <td className="py-2 px-3">東京都目黒区八雲 4-18-1</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="py-2 w-1/4 font-bold bg-gray-50 px-3">施工期間</td>
                <td className="py-2 px-3">2026年2月10日（火）～ 2月26日（木）【15作業日】</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="py-2 w-1/4 font-bold bg-gray-50 px-3">施工面積</td>
                <td className="py-2 px-3">延べ約 269㎡（1階～3階 天壁一式）</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="py-2 w-1/4 font-bold bg-gray-50 px-3">施工条件</td>
                <td className="py-2 px-3">在宅工事（家具移動は施主様にてご対応）</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="py-2 w-1/4 font-bold bg-gray-50 px-3">見積有効期限</td>
                <td className="py-2 px-3">令和8年1月31日まで</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Scope */}
        <section className="mb-10">
          <h2 className="text-xl font-bold border-l-4 border-gray-900 pl-3 mb-4">■ 施工範囲</h2>
          <table className="w-full border-collapse border border-gray-400 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 py-2 px-3 text-left">フロア</th>
                <th className="border border-gray-400 py-2 px-3 text-left">施工箇所</th>
                <th className="border border-gray-400 py-2 px-3 text-right">面積</th>
                <th className="border border-gray-400 py-2 px-3 text-left">備考</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 py-2 px-3">3階</td>
                <td className="border border-gray-400 py-2 px-3">洋室（天壁）</td>
                <td className="border border-gray-400 py-2 px-3 text-right">43㎡</td>
                <td className="border border-gray-400 py-2 px-3"></td>
              </tr>
              <tr>
                <td className="border border-gray-400 py-2 px-3"></td>
                <td className="border border-gray-400 py-2 px-3">吹き抜け天窓周り</td>
                <td className="border border-gray-400 py-2 px-3 text-right">―</td>
                <td className="border border-gray-400 py-2 px-3">高所</td>
              </tr>
              <tr>
                <td className="border border-gray-400 py-2 px-3">2階</td>
                <td className="border border-gray-400 py-2 px-3">リビング、ダイニング、吹き抜け、階段、玄関、和室（天井のみ）</td>
                <td className="border border-gray-400 py-2 px-3 text-right">200㎡</td>
                <td className="border border-gray-400 py-2 px-3"></td>
              </tr>
              <tr>
                <td className="border border-gray-400 py-2 px-3">1階</td>
                <td className="border border-gray-400 py-2 px-3">廊下（天壁）、階段</td>
                <td className="border border-gray-400 py-2 px-3 text-right">26㎡</td>
                <td className="border border-gray-400 py-2 px-3"></td>
              </tr>
              <tr className="bg-gray-100 font-bold">
                <td className="border border-gray-400 py-2 px-3" colSpan={2}>合計</td>
                <td className="border border-gray-400 py-2 px-3 text-right">269㎡</td>
                <td className="border border-gray-400 py-2 px-3"></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Cost Breakdown */}
        <section className="mb-10">
          <h2 className="text-xl font-bold border-l-4 border-gray-900 pl-3 mb-4">■ 見積内訳</h2>
          <table className="w-full border-collapse border border-gray-400 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 py-2 px-2 text-center w-8">項目</th>
                <th className="border border-gray-400 py-2 px-2 text-left">仕様・内容</th>
                <th className="border border-gray-400 py-2 px-2 text-right w-16">数量</th>
                <th className="border border-gray-400 py-2 px-2 text-center w-12">単位</th>
                <th className="border border-gray-400 py-2 px-2 text-right w-20">単価</th>
                <th className="border border-gray-400 py-2 px-2 text-right w-24">金額</th>
                <th className="border border-gray-400 py-2 px-2 text-left w-24">備考</th>
              </tr>
            </thead>
            <tbody>
              {/* Section 1 */}
              <tr className="bg-blue-50">
                <td className="border border-gray-400 py-2 px-2 text-center font-bold">1</td>
                <td className="border border-gray-400 py-2 px-2 font-bold" colSpan={6}>仮設・諸工事（司建設株式会社）</td>
              </tr>
              <tr>
                <td className="border border-gray-400 py-1 px-2"></td>
                <td className="border border-gray-400 py-1 px-2">仮設足場工</td>
                <td className="border border-gray-400 py-1 px-2 text-right">54</td>
                <td className="border border-gray-400 py-1 px-2 text-center">m³</td>
                <td className="border border-gray-400 py-1 px-2 text-right">―</td>
                <td className="border border-gray-400 py-1 px-2 text-right">¥280,000</td>
                <td className="border border-gray-400 py-1 px-2">高所作業用</td>
              </tr>
              <tr>
                <td className="border border-gray-400 py-1 px-2"></td>
                <td className="border border-gray-400 py-1 px-2">運搬搬入費</td>
                <td className="border border-gray-400 py-1 px-2 text-right">1</td>
                <td className="border border-gray-400 py-1 px-2 text-center">式</td>
                <td className="border border-gray-400 py-1 px-2 text-right">―</td>
                <td className="border border-gray-400 py-1 px-2 text-right">¥86,000</td>
                <td className="border border-gray-400 py-1 px-2">損料共</td>
              </tr>
              <tr>
                <td className="border border-gray-400 py-1 px-2"></td>
                <td className="border border-gray-400 py-1 px-2">照明器具 撤去・復旧</td>
                <td className="border border-gray-400 py-1 px-2 text-right">1</td>
                <td className="border border-gray-400 py-1 px-2 text-center">式</td>
                <td className="border border-gray-400 py-1 px-2 text-right">―</td>
                <td className="border border-gray-400 py-1 px-2 text-right">¥58,000</td>
                <td className="border border-gray-400 py-1 px-2"></td>
              </tr>
              <tr>
                <td className="border border-gray-400 py-1 px-2"></td>
                <td className="border border-gray-400 py-1 px-2">仮設養生費</td>
                <td className="border border-gray-400 py-1 px-2 text-right">1</td>
                <td className="border border-gray-400 py-1 px-2 text-center">式</td>
                <td className="border border-gray-400 py-1 px-2 text-right">―</td>
                <td className="border border-gray-400 py-1 px-2 text-right">¥68,000</td>
                <td className="border border-gray-400 py-1 px-2"></td>
              </tr>
              <tr>
                <td className="border border-gray-400 py-1 px-2"></td>
                <td className="border border-gray-400 py-1 px-2">諸経費</td>
                <td className="border border-gray-400 py-1 px-2 text-right">1</td>
                <td className="border border-gray-400 py-1 px-2 text-center">式</td>
                <td className="border border-gray-400 py-1 px-2 text-right">―</td>
                <td className="border border-gray-400 py-1 px-2 text-right">¥68,000</td>
                <td className="border border-gray-400 py-1 px-2">発生材処分共</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-400 py-2 px-2"></td>
                <td className="border border-gray-400 py-2 px-2 font-bold text-right" colSpan={4}>仮設工事 小計</td>
                <td className="border border-gray-400 py-2 px-2 text-right font-bold">¥560,000</td>
                <td className="border border-gray-400 py-2 px-2"></td>
              </tr>

              {/* Section 2 */}
              <tr className="bg-green-50">
                <td className="border border-gray-400 py-2 px-2 text-center font-bold">2</td>
                <td className="border border-gray-400 py-2 px-2 font-bold" colSpan={6}>内装工事（クロス貼り替え）</td>
              </tr>
              <tr>
                <td className="border border-gray-400 py-1 px-2"></td>
                <td className="border border-gray-400 py-1 px-2">クロス貼り替え工事</td>
                <td className="border border-gray-400 py-1 px-2 text-right">269</td>
                <td className="border border-gray-400 py-1 px-2 text-center">㎡</td>
                <td className="border border-gray-400 py-1 px-2 text-right">4,200</td>
                <td className="border border-gray-400 py-1 px-2 text-right">¥1,129,800</td>
                <td className="border border-gray-400 py-1 px-2">材工共</td>
              </tr>
              <tr>
                <td className="border border-gray-400 py-1 px-2"></td>
                <td className="border border-gray-400 py-1 px-2">下地調整・既存剥がし</td>
                <td className="border border-gray-400 py-1 px-2 text-right">1</td>
                <td className="border border-gray-400 py-1 px-2 text-center">式</td>
                <td className="border border-gray-400 py-1 px-2 text-right">―</td>
                <td className="border border-gray-400 py-1 px-2 text-right">¥185,000</td>
                <td className="border border-gray-400 py-1 px-2"></td>
              </tr>
              <tr>
                <td className="border border-gray-400 py-1 px-2"></td>
                <td className="border border-gray-400 py-1 px-2">高所作業加算</td>
                <td className="border border-gray-400 py-1 px-2 text-right">1</td>
                <td className="border border-gray-400 py-1 px-2 text-center">式</td>
                <td className="border border-gray-400 py-1 px-2 text-right">―</td>
                <td className="border border-gray-400 py-1 px-2 text-right">¥200,000</td>
                <td className="border border-gray-400 py-1 px-2">吹抜・階段部</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-400 py-2 px-2"></td>
                <td className="border border-gray-400 py-2 px-2 font-bold text-right" colSpan={4}>内装工事 小計</td>
                <td className="border border-gray-400 py-2 px-2 text-right font-bold">¥1,514,800</td>
                <td className="border border-gray-400 py-2 px-2"></td>
              </tr>

              {/* Section 3 */}
              <tr className="bg-yellow-50">
                <td className="border border-gray-400 py-2 px-2 text-center font-bold">3</td>
                <td className="border border-gray-400 py-2 px-2 font-bold" colSpan={6}>現場諸経費・管理費</td>
              </tr>
              <tr>
                <td className="border border-gray-400 py-1 px-2"></td>
                <td className="border border-gray-400 py-1 px-2">現場養生費・美装費</td>
                <td className="border border-gray-400 py-1 px-2 text-right">1</td>
                <td className="border border-gray-400 py-1 px-2 text-center">式</td>
                <td className="border border-gray-400 py-1 px-2 text-right">―</td>
                <td className="border border-gray-400 py-1 px-2 text-right">¥80,000</td>
                <td className="border border-gray-400 py-1 px-2"></td>
              </tr>
              <tr>
                <td className="border border-gray-400 py-1 px-2"></td>
                <td className="border border-gray-400 py-1 px-2">産廃収集運搬・処分費</td>
                <td className="border border-gray-400 py-1 px-2 text-right">1</td>
                <td className="border border-gray-400 py-1 px-2 text-center">式</td>
                <td className="border border-gray-400 py-1 px-2 text-right">―</td>
                <td className="border border-gray-400 py-1 px-2 text-right">¥80,000</td>
                <td className="border border-gray-400 py-1 px-2"></td>
              </tr>
              <tr>
                <td className="border border-gray-400 py-1 px-2"></td>
                <td className="border border-gray-400 py-1 px-2">現場運営・管理諸経費</td>
                <td className="border border-gray-400 py-1 px-2 text-right">1</td>
                <td className="border border-gray-400 py-1 px-2 text-center">式</td>
                <td className="border border-gray-400 py-1 px-2 text-right">―</td>
                <td className="border border-gray-400 py-1 px-2 text-right">¥85,200</td>
                <td className="border border-gray-400 py-1 px-2"></td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-400 py-2 px-2"></td>
                <td className="border border-gray-400 py-2 px-2 font-bold text-right" colSpan={4}>諸経費 小計</td>
                <td className="border border-gray-400 py-2 px-2 text-right font-bold">¥245,200</td>
                <td className="border border-gray-400 py-2 px-2"></td>
              </tr>

              {/* Totals */}
              <tr className="bg-gray-200">
                <td className="border border-gray-400 py-2 px-2"></td>
                <td className="border border-gray-400 py-2 px-2 font-bold text-right" colSpan={4}>総合計（税別）</td>
                <td className="border border-gray-400 py-2 px-2 text-right font-bold text-lg">¥2,320,000</td>
                <td className="border border-gray-400 py-2 px-2"></td>
              </tr>
              <tr>
                <td className="border border-gray-400 py-2 px-2"></td>
                <td className="border border-gray-400 py-2 px-2 text-right" colSpan={4}>消費税（10%）</td>
                <td className="border border-gray-400 py-2 px-2 text-right">¥232,000</td>
                <td className="border border-gray-400 py-2 px-2"></td>
              </tr>
              <tr className="bg-gray-300">
                <td className="border border-gray-400 py-2 px-2"></td>
                <td className="border border-gray-400 py-2 px-2 font-bold text-right" colSpan={4}>総合計（税込）</td>
                <td className="border border-gray-400 py-2 px-2 text-right font-bold text-lg">¥2,552,000</td>
                <td className="border border-gray-400 py-2 px-2"></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Notes */}
        <section className="mb-10">
          <h2 className="text-xl font-bold border-l-4 border-gray-900 pl-3 mb-4">■ 備考・特記事項</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm leading-relaxed">
            <li>本見積書の有効期限は、令和8年1月31日までとさせていただきます。</li>
            <li>仮設工事費（56万円）は、司建設株式会社への外注費用を含んでおります。</li>
            <li>在宅での施工となります。施工箇所の家具・備品の移動は、施主様にてご対応をお願いいたします。</li>
            <li>工事中は徹底した養生を行い、生活空間への影響を最小限に抑えます。</li>
            <li>高所作業（吹き抜け・天窓部）は、安全を確保するため専門の仮設足場を使用いたします。</li>
            <li>お支払い条件：工事完了後、請求書発行より30日以内のお振込みをお願いいたします。</li>
          </ol>
        </section>

        {/* Schedule */}
        <section className="mb-10">
          <h2 className="text-xl font-bold border-l-4 border-gray-900 pl-3 mb-4">■ 施工工程表</h2>
          <p className="text-sm mb-2">工期：2026年2月10日（火）～ 2月26日（木）　計15作業日</p>
          <p className="text-sm mb-4 text-gray-600">※日曜日は現場休止日とします。祝日（2/11, 2/23）は近隣配慮のうえ作業調整いたします。</p>

          <table className="w-full border-collapse border border-gray-400 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 py-2 px-2 w-16">日付</th>
                <th className="border border-gray-400 py-2 px-2 w-12">曜日</th>
                <th className="border border-gray-400 py-2 px-2">施工箇所・内容</th>
                <th className="border border-gray-400 py-2 px-2 w-28">備考</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: '2/10', day: '火', work: '【着工】3F 洋室：既存クロス剥がし', note: '' },
                { date: '2/11', day: '水', work: '3F 洋室：下地調整', note: '建国記念の日' },
                { date: '2/12', day: '木', work: '3F 洋室：新規クロス貼り', note: '3F完了' },
                { date: '2/13', day: '金', work: '天窓部：既存クロス剥がし', note: '足場内作業' },
                { date: '2/14', day: '土', work: '天窓部：下地調整', note: '' },
                { date: '2/15', day: '日', work: '（現場休止）', note: '', isRest: true },
                { date: '2/16', day: '月', work: '天窓部：新規クロス貼り', note: '天窓部完了' },
                { date: '2/17', day: '火', work: '2F リビング・吹抜：剥がし・下地（1/3）', note: '吹き抜け部開始' },
                { date: '2/18', day: '水', work: '2F リビング・吹抜：剥がし・下地（2/3）', note: '' },
                { date: '2/19', day: '木', work: '2F リビング・吹抜：剥がし・下地（3/3）', note: '' },
                { date: '2/20', day: '金', work: '2F リビング・吹抜：新規貼り（1/2）', note: '' },
                { date: '2/21', day: '土', work: '2F リビング・吹抜：新規貼り（2/2）', note: '2Fリビング完了' },
                { date: '2/22', day: '日', work: '（現場休止）', note: '', isRest: true },
                { date: '2/23', day: '月', work: '2F 和室：剥がし・下地・貼り（一式）', note: '天皇誕生日' },
                { date: '2/24', day: '火', work: '1F 廊下・階段：既存剥がし・下地', note: '' },
                { date: '2/25', day: '水', work: '1F 廊下・階段：新規クロス貼り', note: '' },
                { date: '2/26', day: '木', work: '【完工】残工事・清掃・自主検査', note: '' },
              ].map((row, idx) => (
                <tr key={idx} className={row.isRest ? 'bg-gray-100 text-gray-500' : ''}>
                  <td className="border border-gray-400 py-1 px-2 text-center">{row.date}</td>
                  <td className={`border border-gray-400 py-1 px-2 text-center ${row.day === '日' ? 'text-red-600' : row.day === '土' ? 'text-blue-600' : ''}`}>{row.day}</td>
                  <td className="border border-gray-400 py-1 px-2">{row.work}</td>
                  <td className="border border-gray-400 py-1 px-2">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Policy */}
        <section className="mb-10">
          <h2 className="text-xl font-bold border-l-4 border-gray-900 pl-3 mb-4">■ 施工方針</h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-bold">【上階から下階へ】</p>
              <p className="text-gray-700">3階からスタートし、天窓・吹き抜けを経て、最終的に1階へと施工を進めます。これにより、仕上がった箇所を汚すリスクを最小限に抑えます。</p>
            </div>
            <div>
              <p className="font-bold">【仮設足場の効率的運用】</p>
              <p className="text-gray-700">天窓・吹き抜け部分の作業を前半～中盤に集中させ、足場の設置期間を最適化いたします。</p>
            </div>
            <div>
              <p className="font-bold">【在宅工事への配慮】</p>
              <p className="text-gray-700">生活空間への影響を最小限に抑えるため、徹底した養生と清掃を毎日実施いたします。</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm pt-8 border-t border-gray-300">
          <p>― 以上 ―</p>
        </footer>

      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .min-h-screen {
            min-height: auto;
          }
        }
        @page {
          size: A4;
          margin: 15mm;
        }
      `}</style>
    </div>
  );
}
