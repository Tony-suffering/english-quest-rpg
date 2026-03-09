'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin, Phone, Mail, Star, Wrench, CheckCircle, Clock, XCircle } from 'lucide-react'
import { craftsmenData, Craftsman, CraftsmanStatus } from '../data/craftsmen'

const CraftsmenMap = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all')
  const [selectedCraftsman, setSelectedCraftsman] = useState<Craftsman | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])

  const statusOptions = [
    { id: 'all', label: 'すべて', icon: MapPin, color: '#6b7280' },
    { id: 'available', label: '対応可能', icon: CheckCircle, color: '#10b981' },
    { id: 'busy', label: '稼働中', icon: Clock, color: '#f59e0b' },
    { id: 'off', label: '休み', icon: XCircle, color: '#ef4444' },
  ]

  const specialties = [
    'all',
    'クロス',
    '床',
    'CF',
    'バリアフリー',
    '塗装',
    'LGS',
  ]

  const filteredData = craftsmenData.filter(craftsman => {
    const statusMatch = selectedStatus === 'all' || craftsman.status === selectedStatus
    const specialtyMatch = selectedSpecialty === 'all' || craftsman.specialty.includes(selectedSpecialty)
    return statusMatch && specialtyMatch
  })

  // Google Maps初期化
  useEffect(() => {
    const loadMap = () => {
      if (!window.google) {
        setTimeout(loadMap, 100)
        return
      }

      const mapElement = document.getElementById('craftsmen-map')
      if (!mapElement) return

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

    markersRef.current.forEach(marker => marker.setMap(null))

    const newMarkers = filteredData.map(craftsman => {
      const marker = new google.maps.Marker({
        position: craftsman.coordinates,
        map,
        title: craftsman.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: getStatusColor(craftsman.status),
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 3,
        },
      })

      marker.addListener('click', () => {
        setSelectedCraftsman(craftsman)
        map.panTo(craftsman.coordinates)
      })

      return marker
    })

    markersRef.current = newMarkers

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null))
    }
  }, [map, filteredData])

  const getStatusColor = (status: CraftsmanStatus): string => {
    switch (status) {
      case 'available':
        return '#10b981' // green
      case 'busy':
        return '#f59e0b' // amber
      case 'off':
        return '#ef4444' // red
      default:
        return '#6b7280' // gray
    }
  }

  const getStatusLabel = (status: CraftsmanStatus): string => {
    switch (status) {
      case 'available':
        return '対応可能'
      case 'busy':
        return '稼働中'
      case 'off':
        return '休み'
      default:
        return '不明'
    }
  }

  const handleCraftsmanClick = (craftsman: Craftsman) => {
    setSelectedCraftsman(craftsman)
    if (map) {
      map.panTo(craftsman.coordinates)
      map.setZoom(14)
    }
  }

  const getSkillStars = (level: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < level ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* ヘッダー */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Wrench className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">職人マップ</h1>
            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              内部管理用
            </span>
          </div>
          <p className="text-gray-600">職人ネットワークの稼働状況を地図上で管理</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左サイドバー */}
          <div className="lg:col-span-1 space-y-4">
            {/* 稼働状況フィルター */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-semibold text-gray-900 mb-3">稼働状況</h2>
              <div className="space-y-2">
                {statusOptions.map((option) => {
                  const Icon = option.icon
                  const count = option.id === 'all'
                    ? craftsmenData.length
                    : craftsmenData.filter(c => c.status === option.id).length
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedStatus(option.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        selectedStatus === option.id
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" style={{ color: option.color }} />
                      <span>{option.label}</span>
                      <span className="ml-auto text-sm">({count})</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 専門分野フィルター */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-semibold text-gray-900 mb-3">専門分野</h2>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => setSelectedSpecialty(specialty)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedSpecialty === specialty
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {specialty === 'all' ? 'すべて' : specialty}
                  </button>
                ))}
              </div>
            </div>

            {/* 職人リスト */}
            <div className="bg-white rounded-lg shadow-sm p-4 max-h-[500px] overflow-y-auto">
              <h2 className="font-semibold text-gray-900 mb-3">職人一覧 ({filteredData.length}人)</h2>
              <div className="space-y-3">
                {filteredData.map((craftsman) => (
                  <button
                    key={craftsman.id}
                    onClick={() => handleCraftsmanClick(craftsman)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedCraftsman?.id === craftsman.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{craftsman.name}</h3>
                        <p className="text-xs text-gray-500">{craftsman.mainArea}</p>
                      </div>
                      <span
                        className="px-2 py-1 rounded text-xs font-medium text-white"
                        style={{ backgroundColor: getStatusColor(craftsman.status) }}
                      >
                        {getStatusLabel(craftsman.status)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {craftsman.specialty.map((s, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{craftsman.rating.toFixed(1)}</span>
                      <span className="mx-1">•</span>
                      <span>経験{craftsman.experience}年</span>
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
              <div id="craftsmen-map" style={{ width: '100%', height: '100%' }} />
            </div>

            {/* 選択された職人の詳細 */}
            {selectedCraftsman && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedCraftsman.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedCraftsman.mainArea}
                    </p>
                  </div>
                  <span
                    className="px-3 py-1.5 rounded-lg text-sm font-medium text-white"
                    style={{ backgroundColor: getStatusColor(selectedCraftsman.status) }}
                  >
                    {getStatusLabel(selectedCraftsman.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">評価:</span>
                    <span>{selectedCraftsman.rating.toFixed(1)}/5.0</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Wrench className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">経験:</span>
                    <span>{selectedCraftsman.experience}年</span>
                  </div>
                  {selectedCraftsman.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <a href={`tel:${selectedCraftsman.phone}`} className="text-blue-600 hover:underline">
                        {selectedCraftsman.phone}
                      </a>
                    </div>
                  )}
                  {selectedCraftsman.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <a href={`mailto:${selectedCraftsman.email}`} className="text-blue-600 hover:underline">
                        {selectedCraftsman.email}
                      </a>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">専門分野</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCraftsman.specialty.map((s, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3">スキルレベル</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">クロス</span>
                      <div className="flex gap-0.5">{getSkillStars(selectedCraftsman.skills.wallpaper)}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">床材</span>
                      <div className="flex gap-0.5">{getSkillStars(selectedCraftsman.skills.flooring)}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">バリアフリー</span>
                      <div className="flex gap-0.5">{getSkillStars(selectedCraftsman.skills.barrierFree)}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">塗装</span>
                      <div className="flex gap-0.5">{getSkillStars(selectedCraftsman.skills.painting)}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">大工</span>
                      <div className="flex gap-0.5">{getSkillStars(selectedCraftsman.skills.carpentry)}</div>
                    </div>
                  </div>
                </div>

                {selectedCraftsman.notes && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">備考</h4>
                    <p className="text-sm text-gray-700">{selectedCraftsman.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CraftsmenMap
