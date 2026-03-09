'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Clock, Calendar, MapPin, Phone, Mail, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'

// Project Data - Yakumo Residence
const PROJECT = {
  client: 'Mr. Edmund Keith Henry',
  location: 'Yakumo 4-18-1, Meguro-ku, Tokyo',
  totalAmount: '¥2,552,000 (tax included)',
  startDate: '2026-02-10',
  endDate: '2026-02-26',
  totalDays: 15,
  totalArea: '269㎡',
  scope: 'Wallpaper replacement (ceiling & walls, floors 1-3)',
}

const SCHEDULE = [
  { date: '2/10', day: 'Tue', task: 'Project Start - 3F Western Room: Remove existing wallpaper', status: 'upcoming', floor: '3F' },
  { date: '2/11', day: 'Wed', task: '3F Western Room: Surface preparation', status: 'upcoming', floor: '3F', note: 'National Foundation Day' },
  { date: '2/12', day: 'Thu', task: '3F Western Room: Install new wallpaper', status: 'upcoming', floor: '3F', milestone: '3F Complete' },
  { date: '2/13', day: 'Fri', task: 'Skylight area: Remove existing wallpaper', status: 'upcoming', floor: 'Skylight', note: 'Scaffolding work' },
  { date: '2/14', day: 'Sat', task: 'Skylight area: Surface preparation', status: 'upcoming', floor: 'Skylight' },
  { date: '2/15', day: 'Sun', task: 'Site closed', status: '休', floor: '-' },
  { date: '2/16', day: 'Mon', task: 'Skylight area: Install new wallpaper', status: 'upcoming', floor: 'Skylight', milestone: 'Skylight Complete' },
  { date: '2/17', day: 'Tue', task: '2F Living/Atrium: Remove & prep (1/3)', status: 'upcoming', floor: '2F' },
  { date: '2/18', day: 'Wed', task: '2F Living/Atrium: Remove & prep (2/3)', status: 'upcoming', floor: '2F' },
  { date: '2/19', day: 'Thu', task: '2F Living/Atrium: Remove & prep (3/3)', status: 'upcoming', floor: '2F' },
  { date: '2/20', day: 'Fri', task: '2F Living/Atrium: Install new wallpaper (1/2)', status: 'upcoming', floor: '2F' },
  { date: '2/21', day: 'Sat', task: '2F Living/Atrium: Install new wallpaper (2/2)', status: 'upcoming', floor: '2F', milestone: '2F Living Complete' },
  { date: '2/22', day: 'Sun', task: 'Site closed', status: '休', floor: '-' },
  { date: '2/23', day: 'Mon', task: '2F Japanese Room: Full process (ceiling only)', status: 'upcoming', floor: '2F', note: "Emperor's Birthday" },
  { date: '2/24', day: 'Tue', task: '1F Hallway/Stairs: Remove & prep', status: 'upcoming', floor: '1F' },
  { date: '2/25', day: 'Wed', task: '1F Hallway/Stairs: Install new wallpaper', status: 'upcoming', floor: '1F' },
  { date: '2/26', day: 'Thu', task: 'Final touches, cleaning, self-inspection', status: 'upcoming', floor: 'All', milestone: 'Project Complete' },
]

const COST_BREAKDOWN = [
  { category: 'Scaffolding & Setup', items: [
    { name: 'Scaffolding installation', amount: 280000, note: 'For high areas' },
    { name: 'Transportation', amount: 86000 },
    { name: 'Lighting removal/reinstall', amount: 58000 },
    { name: 'Protection/covering', amount: 68000 },
    { name: 'Misc. expenses', amount: 68000 },
  ], subtotal: 560000 },
  { category: 'Wallpaper Work', items: [
    { name: 'Wallpaper replacement (269㎡ × ¥4,200)', amount: 1129800 },
    { name: 'Surface prep & removal', amount: 185000 },
    { name: 'High-area premium', amount: 200000, note: 'Atrium & stairs' },
  ], subtotal: 1514800 },
  { category: 'Site Management', items: [
    { name: 'Protection & cleaning', amount: 80000 },
    { name: 'Waste disposal', amount: 80000 },
    { name: 'Project management', amount: 85200 },
  ], subtotal: 245200 },
]

const FAQ = [
  { q: 'Can I stay home during the work?', a: 'Yes, this is a "live-in" renovation. We will work floor by floor to minimize disruption. We recommend staying out of the active work area each day.' },
  { q: 'Do I need to move furniture?', a: 'Yes, please move furniture away from walls before we begin each area. We will provide a schedule so you know which rooms to prepare.' },
  { q: 'What about dust and smell?', a: 'We use thorough protective covering (養生) and clean daily. Modern wallpaper adhesive has minimal odor, but we recommend ventilating.' },
  { q: 'What if there is a problem with the wall underneath?', a: 'Minor damage is included in our estimate. If we discover major issues (water damage, mold), we will consult with you before proceeding.' },
  { q: 'How do I pay?', a: 'Invoice will be issued after completion. Payment is due within 30 days via bank transfer.' },
]

export default function YakumoProjectPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const [showFullSchedule, setShowFullSchedule] = useState(false)

  const today = new Date().toISOString().split('T')[0]
  const projectStarted = today >= PROJECT.startDate
  const projectEnded = today > PROJECT.endDate

  // Calculate progress
  const completedDays = SCHEDULE.filter(s => s.status === 'complete').length
  const progressPercent = Math.round((completedDays / PROJECT.totalDays) * 100)

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-[#252423] text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-amber-400 text-sm mb-2">
            <span>IWASAKI INTERIOR</span>
            <span className="text-stone-500">|</span>
            <span>Project Portal</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Yakumo Residence
            <span className="block text-lg font-normal text-stone-400 mt-1">Interior Renovation Project</span>
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-stone-300">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Feb 10 - 26, 2026
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Meguro-ku, Tokyo
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Status Banner */}
        <div className={`mb-8 p-4 rounded-lg border-l-4 ${
          projectEnded ? 'bg-green-50 border-green-500' :
          projectStarted ? 'bg-amber-50 border-amber-500' :
          'bg-blue-50 border-blue-500'
        }`}>
          <div className="flex items-center gap-3">
            {projectEnded ? (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            ) : projectStarted ? (
              <Clock className="w-6 h-6 text-amber-600" />
            ) : (
              <Calendar className="w-6 h-6 text-blue-600" />
            )}
            <div>
              <p className="font-bold text-stone-800">
                {projectEnded ? 'Project Completed' :
                 projectStarted ? 'Work in Progress' :
                 'Scheduled to Begin February 10, 2026'}
              </p>
              <p className="text-sm text-stone-600">
                {projectEnded ? 'Thank you for choosing Iwasaki Interior.' :
                 projectStarted ? `Day ${completedDays + 1} of ${PROJECT.totalDays}` :
                 '16 days until project start'}
              </p>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <section className="bg-white border border-stone-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-stone-800 mb-4">Project Overview</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-stone-500">Client</p>
              <p className="font-medium text-stone-800">{PROJECT.client}</p>
            </div>
            <div>
              <p className="text-stone-500">Location</p>
              <p className="font-medium text-stone-800">{PROJECT.location}</p>
            </div>
            <div>
              <p className="text-stone-500">Scope</p>
              <p className="font-medium text-stone-800">{PROJECT.scope}</p>
            </div>
            <div>
              <p className="text-stone-500">Total Area</p>
              <p className="font-medium text-stone-800">{PROJECT.totalArea} (3 floors)</p>
            </div>
            <div>
              <p className="text-stone-500">Duration</p>
              <p className="font-medium text-stone-800">{PROJECT.totalDays} working days</p>
            </div>
            <div>
              <p className="text-stone-500">Total Cost</p>
              <p className="font-medium text-stone-800">{PROJECT.totalAmount}</p>
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section className="bg-white border border-stone-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-stone-800 mb-4">Work Schedule</h2>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-stone-500 mb-2">
              <span>Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Schedule List */}
          <div className="space-y-2">
            {(showFullSchedule ? SCHEDULE : SCHEDULE.slice(0, 7)).map((item, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  item.status === '休' ? 'bg-stone-100 text-stone-400' :
                  item.status === 'complete' ? 'bg-green-50' :
                  item.status === 'today' ? 'bg-amber-50 border border-amber-300' :
                  'bg-stone-50'
                }`}
              >
                <div className="w-16 flex-shrink-0">
                  <p className="font-bold text-stone-800">{item.date}</p>
                  <p className="text-xs text-stone-500">{item.day}</p>
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${item.status === '休' ? 'text-stone-400' : 'text-stone-700'}`}>
                    {item.task}
                  </p>
                  {item.note && (
                    <p className="text-xs text-stone-500 mt-1">{item.note}</p>
                  )}
                  {item.milestone && (
                    <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                      {item.milestone}
                    </span>
                  )}
                </div>
                <div className="flex-shrink-0">
                  {item.status === 'complete' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : item.status === '休' ? (
                    <span className="text-xs text-stone-400">OFF</span>
                  ) : (
                    <Circle className="w-5 h-5 text-stone-300" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowFullSchedule(!showFullSchedule)}
            className="mt-4 flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700"
          >
            {showFullSchedule ? (
              <>Show less <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>Show full schedule <ChevronDown className="w-4 h-4" /></>
            )}
          </button>
        </section>

        {/* Cost Breakdown */}
        <section className="bg-white border border-stone-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-stone-800 mb-4">Cost Breakdown</h2>

          <div className="space-y-6">
            {COST_BREAKDOWN.map((cat, idx) => (
              <div key={idx}>
                <h3 className="font-medium text-stone-700 mb-2">{cat.category}</h3>
                <div className="bg-stone-50 rounded-lg overflow-hidden">
                  {cat.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex justify-between items-center px-4 py-2 border-b border-stone-100 last:border-0">
                      <span className="text-sm text-stone-600">
                        {item.name}
                        {item.note && <span className="text-stone-400 ml-2">({item.note})</span>}
                      </span>
                      <span className="text-sm font-medium text-stone-800">
                        ¥{item.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center px-4 py-2 bg-stone-100">
                    <span className="text-sm font-medium text-stone-700">Subtotal</span>
                    <span className="font-bold text-stone-800">¥{cat.subtotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-stone-600">Total (before tax)</span>
              <span className="font-bold text-stone-800">¥2,320,000</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-stone-600">Consumption Tax (10%)</span>
              <span className="font-medium text-stone-800">¥232,000</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-stone-300">
              <span className="font-bold text-stone-800">Total (tax included)</span>
              <span className="text-xl font-black text-amber-600">¥2,552,000</span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white border border-stone-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-stone-800 mb-4">Frequently Asked Questions</h2>

          <div className="space-y-2">
            {FAQ.map((item, idx) => (
              <div key={idx} className="border border-stone-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-stone-50"
                >
                  <span className="font-medium text-stone-800">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {expandedFaq === idx && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-stone-600 bg-stone-50 p-3 rounded">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-[#252423] text-white rounded-xl p-6">
          <h2 className="text-lg font-bold mb-4">Contact Your Project Manager</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="text-stone-400 text-sm mb-1">Project Manager</p>
              <p className="font-medium">Kazuo Iwasaki</p>
              <p className="text-stone-400 text-sm">30 years of experience in interior finishing</p>
            </div>
            <div className="flex flex-col gap-2">
              <a href="tel:03-5638-7402" className="flex items-center gap-2 text-amber-400 hover:text-amber-300">
                <Phone className="w-4 h-4" />
                03-5638-7402
              </a>
              <a href="mailto:kaz@iwasaki-naisou.jp" className="flex items-center gap-2 text-amber-400 hover:text-amber-300">
                <Mail className="w-4 h-4" />
                kaz@iwasaki-naisou.jp
              </a>
            </div>
          </div>
          <p className="text-stone-500 text-xs mt-4">
            Office hours: Monday - Saturday, 9:00 - 18:00
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-stone-500 text-sm">
            Iwasaki Interior Co., Ltd. | Established 1994
          </p>
          <p className="text-stone-400 text-xs mt-1">
            This page is exclusively for project stakeholders.
          </p>
        </div>
      </footer>
    </div>
  )
}
