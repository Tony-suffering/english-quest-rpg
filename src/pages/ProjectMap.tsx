'use client'

import { useState } from 'react'
import { Network, Users, Building2 } from 'lucide-react'
import { projectsData, Project } from '../data/projects'
import { craftsmenData } from '../data/craftsmen'

const ProjectMap = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(projectsData[0])

  if (!selectedProject) return null

  // プロジェクトに関わった職人の情報を取得
  const members = selectedProject.members.map(member => {
    const craftsman = craftsmenData.find(c => c.id === member.craftsmanId)
    return { ...member, craftsman }
  }).filter(m => m.craftsman)

  // 円形配置の座標を計算
  const centerX = 300
  const centerY = 200
  const radius = 120

  const getMemberPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }
  }

  const getSpecialtyColor = (specialty: string[]) => {
    if (specialty.includes('クロス')) return '#3b82f6'
    if (specialty.includes('床') || specialty.includes('CF')) return '#10b981'
    if (specialty.includes('バリアフリー')) return '#f59e0b'
    if (specialty.includes('塗装')) return '#ef4444'
    if (specialty.includes('LGS')) return '#8b5cf6'
    return '#6b7280'
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* ヘッダー */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Network className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">職人ネットワーク</h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Network Visualization
            </span>
          </div>
          <p className="text-gray-600">イワサキ内装が誇る、50名超の職人ネットワークとプロジェクトの繋がりを可視化</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左サイドバー：案件リスト */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 max-h-[700px] overflow-y-auto">
              <h2 className="font-semibold text-gray-900 mb-3">案件一覧</h2>
              <div className="space-y-3">
                {projectsData.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${selectedProject?.id === project.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <Building2 className="w-3 h-3" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Users className="w-3 h-3 text-gray-600" />
                      <span className="text-gray-700">{project.members.length}名参加</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 右側：ネットワーク図と詳細 */}
          <div className="lg:col-span-2 space-y-6">
            {/* ネットワーク図 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 mb-4">関係性マップ</h2>
              <svg width="600" height="400" className="mx-auto">
                {/* 線（中心から各職人へ） */}
                {members.map((member, i) => {
                  const pos = getMemberPosition(i, members.length)
                  const strokeWidth = Math.max(1, member.involvement / 2)
                  return (
                    <line
                      key={`line-${i}`}
                      x1={centerX}
                      y1={centerY}
                      x2={pos.x}
                      y2={pos.y}
                      stroke={getSpecialtyColor(member.craftsman?.specialty || [])}
                      strokeWidth={strokeWidth}
                      opacity={0.6}
                    />
                  )
                })}

                {/* 中央：プロジェクト */}
                <g>
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r="40"
                    fill="#3b82f6"
                    stroke="#ffffff"
                    strokeWidth="3"
                  />
                  <text
                    x={centerX}
                    y={centerY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    案件
                  </text>
                </g>

                {/* 各職人 */}
                {members.map((member, i) => {
                  const pos = getMemberPosition(i, members.length)
                  const size = 20 + (member.involvement * 1.5)
                  return (
                    <g key={`member-${i}`}>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={size}
                        fill={getSpecialtyColor(member.craftsman?.specialty || [])}
                        stroke="#ffffff"
                        strokeWidth="2"
                        opacity={0.9}
                      />
                      <text
                        x={pos.x}
                        y={pos.y - size - 10}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="600"
                        fill="#374151"
                      >
                        {member.craftsman?.name}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + size + 15}
                        textAnchor="middle"
                        fontSize="9"
                        fill="#6b7280"
                      >
                        {member.role}
                      </text>
                    </g>
                  )
                })}
              </svg>

              {/* 凡例 */}
              <div className="mt-4 flex justify-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-gray-400" style={{ width: '2px' }} />
                  <span>関与度: 低</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-gray-400" style={{ width: '5px' }} />
                  <span>関与度: 高</span>
                </div>
              </div>
            </div>

            {/* プロジェクト詳細 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{selectedProject.name}</h2>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-600">発注者:</span>
                  <span className="ml-2 font-medium">{selectedProject.client}</span>
                </div>
                <div>
                  <span className="text-gray-600">場所:</span>
                  <span className="ml-2 font-medium">{selectedProject.location}</span>
                </div>
                <div>
                  <span className="text-gray-600">期間:</span>
                  <span className="ml-2 font-medium">
                    {selectedProject.startDate} 〜 {selectedProject.endDate}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">予算:</span>
                  <span className="ml-2 font-medium">¥{selectedProject.budget.toLocaleString()}</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">概要</h3>
                <p className="text-sm text-gray-700">{selectedProject.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">参加職人</h3>
                <div className="space-y-3">
                  {members.map((member, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                          style={{ backgroundColor: getSpecialtyColor(member.craftsman?.specialty || []) }}
                        >
                          {member.craftsman?.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{member.craftsman?.name}</div>
                          <div className="text-xs text-gray-500">{member.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          関与度: {member.involvement}/10
                        </div>
                        <div className="text-xs text-gray-500">{member.workDays}日間</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectMap
