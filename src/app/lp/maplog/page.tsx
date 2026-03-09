'use client'

import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import MapLogAppSection from '@/components/website/MapLogAppSection'
import CustomerReviews from '@/components/website/CustomerReviews'
import RealTimeStats from '@/components/website/RealTimeStats'
import CompanyInfoSection from '@/components/website/CompanyInfoSection'
import { QRCodeSVG } from 'qrcode.react'
import { Smartphone, MapPin, Camera, MessageCircle, Star, Users, Clock, Shield } from 'lucide-react'

export default function MapLogLPPage() {
  const maplogAppUrl = 'https://maplog.iwasaki-naisou.com'

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-green-500 text-white px-6 py-2 text-sm font-bold mb-6 rounded-full shadow-lg">
              🎉 新サービスリリース
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              MapLog<span className="text-green-600">（マップログ）</span><br />
              <span className="text-gray-700 text-3xl sm:text-4xl">職人とお客様をつなぐ、新しいプラットフォーム</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
              施工記録を地図で見える化。お客様は施工の進捗をリアルタイム確認、<br className="hidden sm:block" />
              職人は実績を自動でポートフォリオ化。<br className="hidden sm:block" />
              <span className="font-bold text-green-600">信頼関係を築き、継続的なお付き合いをサポートします。</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href={maplogAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-10 py-5 font-bold text-xl hover:bg-green-600 transition-all shadow-xl hover:shadow-2xl rounded-lg flex items-center gap-3"
              >
                <Smartphone className="w-6 h-6" />
                <span>MapLogアプリを開く</span>
              </a>
              <a
                href="#features"
                className="bg-white text-gray-900 px-10 py-5 font-bold text-xl border-2 border-gray-300 hover:border-green-500 transition-all rounded-lg"
              >
                詳しく見る
              </a>
            </div>

            <p className="text-sm text-gray-500">
              ✓ 完全無料　✓ 簡単登録（1分で完了）　✓ iOS/Android対応
            </p>
          </div>

          {/* スクリーンショット風画像 */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white border-4 border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gray-100 border-b border-gray-200 p-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500 ml-2">MapLog - マップログ</span>
              </div>
              <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-24 h-24 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800">施工記録を地図で可視化</h3>
                  <p className="text-gray-600 mt-2">※ 実際のアプリ画面イメージ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MapLogの特徴 */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              MapLogの3つの特徴
            </h2>
            <p className="text-lg text-gray-600">
              職人もお客様も、みんなが嬉しい機能が満載
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 特徴1: 地図で見える */}
            <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-500 p-8 rounded-2xl hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 text-center">地図で見える化</h3>
              <p className="text-gray-700 leading-relaxed text-center mb-4">
                施工した現場が地図にピンで表示。「どこで何件やったか」が一目瞭然。職人は実績の見える化、お客様は近所の施工例を確認できます。
              </p>
              <div className="bg-white border border-green-200 p-4 rounded-lg">
                <h4 className="font-bold text-sm text-gray-800 mb-2">こんな方に</h4>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>✓ 職人：実績を視覚的にアピール</li>
                  <li>✓ お客様：近所の施工例を確認</li>
                  <li>✓ 営業：エリアカバー率を可視化</li>
                </ul>
              </div>
            </div>

            {/* 特徴2: 簡単記録 */}
            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-500 p-8 rounded-2xl hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 text-center">写真1枚で記録完了</h3>
              <p className="text-gray-700 leading-relaxed text-center mb-4">
                現場で写真を撮るだけ。GPS情報が自動で記録され、地図に反映。手間なく施工記録が蓄積されます。
              </p>
              <div className="bg-white border border-blue-200 p-4 rounded-lg">
                <h4 className="font-bold text-sm text-gray-800 mb-2">簡単3ステップ</h4>
                <ol className="space-y-1 text-xs text-gray-600">
                  <li>1. 現場で写真撮影</li>
                  <li>2. 簡単なメモ入力（任意）</li>
                  <li>3. 送信ボタンで完了</li>
                </ol>
              </div>
            </div>

            {/* 特徴3: 信頼関係 */}
            <div className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-500 p-8 rounded-2xl hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 text-center">直接つながる</h3>
              <p className="text-gray-700 leading-relaxed text-center mb-4">
                職人とお客様が直接やりとり。施工内容の相談、見積もり依頼、口コミ投稿まで、アプリ内で完結します。
              </p>
              <div className="bg-white border border-purple-200 p-4 rounded-lg">
                <h4 className="font-bold text-sm text-gray-800 mb-2">できること</h4>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>✓ メッセージで直接やりとり</li>
                  <li>✓ 施工後の評価・口コミ投稿</li>
                  <li>✓ 友人への職人紹介</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 利用者の声（実データ待ち） */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-12 text-center">
            お客様の声
          </h2>

          <CustomerReviews />
        </div>
      </section>

      {/* 実績統計（実データ） */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-12 text-center">
            実績データ（リアルタイム集計）
          </h2>

          <RealTimeStats />
        </div>
      </section>

      {/* MapLogアプリ詳細セクション */}
      <MapLogAppSection />

      {/* 会社情報セクション */}
      <CompanyInfoSection />

      {/* 最終CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-500 to-green-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
            今すぐMapLogを始めよう
          </h2>
          <p className="text-lg sm:text-xl mb-10 opacity-90 leading-relaxed">
            完全無料。1分で登録完了。<br />
            職人もお客様も、今すぐアプリをダウンロード。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href={maplogAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-green-600 px-12 py-6 font-black text-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl rounded-lg flex items-center gap-3"
            >
              <Smartphone className="w-6 h-6" />
              <span>MapLogアプリを開く</span>
            </a>

            <div className="bg-white p-4 rounded-lg shadow-xl">
              <QRCodeSVG
                value={maplogAppUrl}
                size={120}
                level="H"
                includeMargin
                fgColor="#10B981"
              />
            </div>
          </div>

          <div className="mt-8 text-sm opacity-75">
            <p>有限会社イワサキ内装</p>
            <p>Email: kaz@iwasaki-naisou.jp</p>
            <p>HP: https://iwasaki-naisou.com</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
