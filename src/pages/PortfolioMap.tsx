import { useState, useEffect, useRef } from 'react'
import { MapPin, Building2, Home, Users } from 'lucide-react'
import { portfolioData, PortfolioItem } from '../data/portfolio'

const PortfolioMap = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])

  const categories = [
    { id: 'all', label: 'すべて', icon: MapPin },
    { id: '住宅・マンション', label: '住宅・マンション', icon: Home },
    { id: '店舗・オフィス', label: '店舗・オフィス', icon: Building2 },
    { id: '公共施設', label: '公共施設', icon: Users },
  ]

  const filteredData = selectedCategory === 'all'
    ? portfolioData
    : portfolioData.filter(item => item.category === selectedCategory)

  // Google Maps初期化
  useEffect(() => {
    const loadMap = () => {
      if (!window.google) {
        // Google Maps APIが読み込まれていない場合は待機
        setTimeout(loadMap, 100)
        return
      }

      const mapElement = document.getElementById('map')
      if (!mapElement) return

      // 東京23区の中心
      const center = { lat: 35.6895, lng: 139.6917 }

      const newMap = new google.maps.Map(mapElement, {
        zoom: 11,
        center,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      })

      setMap(newMap)
    }

    loadMap()
  }, [])

  // マーカー更新
  useEffect(() => {
    if (!map) return

    // 既存のマーカーをクリア
    markersRef.current.forEach(marker => marker.setMap(null))

    // 新しいマーカーを作成
    const newMarkers = filteredData
      .filter(item => item.coordinates)
      .map(item => {
        const marker = new google.maps.Marker({
          position: item.coordinates!,
          map,
          title: item.title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: getCategoryColor(item.category),
            fillOpacity: 0.8,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        })

        marker.addListener('click', () => {
          setSelectedItem(item)
          map.panTo(item.coordinates!)
        })

        return marker
      })

    markersRef.current = newMarkers

    // クリーンアップ
    return () => {
      markersRef.current.forEach(marker => marker.setMap(null))
    }
  }, [map, filteredData])

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case '住宅・マンション':
        return '#3b82f6' // blue
      case '店舗・オフィス':
        return '#10b981' // green
      case '公共施設':
        return '#f59e0b' // amber
      default:
        return '#6b7280' // gray
    }
  }

  const handleItemClick = (item: PortfolioItem) => {
    setSelectedItem(item)
    if (map && item.coordinates) {
      map.panTo(item.coordinates)
      map.setZoom(14)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* ヘッダー */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">施工実績マップ</h1>
          <p className="text-gray-600">東京23区を中心に、これまでの施工実績を地図上でご覧いただけます</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左サイドバー：カテゴリとリスト */}
          <div className="lg:col-span-1 space-y-4">
            {/* カテゴリフィルター */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-semibold text-gray-900 mb-3">カテゴリで絞り込み</h2>
              <div className="space-y-2">
                {categories.map((cat) => {
                  const Icon = cat.icon
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{cat.label}</span>
                      <span className="ml-auto text-sm">
                        ({selectedCategory === cat.id ? filteredData.length :
                          cat.id === 'all' ? portfolioData.length :
                          portfolioData.filter(item => item.category === cat.id).length})
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 施工実績リスト */}
            <div className="bg-white rounded-lg shadow-sm p-4 max-h-[600px] overflow-y-auto">
              <h2 className="font-semibold text-gray-900 mb-3">施工実績一覧</h2>
              <div className="space-y-3">
                {filteredData.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedItem?.id === item.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                        style={{ backgroundColor: getCategoryColor(item.category) }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(item.completion_date).getFullYear()}年{new Date(item.completion_date).getMonth() + 1}月
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 右側：地図と詳細 */}
          <div className="lg:col-span-2 space-y-4">
            {/* 地図 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden" style={{ height: '500px' }}>
              <div id="map" style={{ width: '100%', height: '100%' }} />
            </div>

            {/* 選択された施工実績の詳細 */}
            {selectedItem && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={selectedItem.image_url}
                    alt={selectedItem.title}
                    className="w-48 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{selectedItem.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {selectedItem.location}
                        </p>
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getCategoryColor(selectedItem.category) }}
                      >
                        {selectedItem.category}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">{selectedItem.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {selectedItem.area && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          施工面積: {selectedItem.area}
                        </span>
                      )}
                      {selectedItem.work_type && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          工事内容: {selectedItem.work_type}
                        </span>
                      )}
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        完成: {new Date(selectedItem.completion_date).getFullYear()}年{new Date(selectedItem.completion_date).getMonth() + 1}月
                      </span>
                    </div>
                    {selectedItem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {selectedItem.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioMap
