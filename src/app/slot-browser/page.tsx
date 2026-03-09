'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import { Plus, X, RefreshCw, ArrowLeft, ArrowRight, Maximize2, Minimize2, Smartphone, Monitor } from 'lucide-react'

interface BrowserSlot {
  id: string
  url: string
  inputUrl: string
  isLoading: boolean
}

const DEFAULT_SLOTS: BrowserSlot[] = [
  { id: '1', url: '/', inputUrl: '/', isLoading: false },
  { id: '2', url: '/services/reform', inputUrl: '/services/reform', isLoading: false },
  { id: '3', url: '/portfolio', inputUrl: '/portfolio', isLoading: false },
  { id: '4', url: '/corporate', inputUrl: '/corporate', isLoading: false },
]

const PRESET_SITES = [
  { name: 'TOP', url: '/' },
  { name: 'Reform', url: '/services/reform' },
  { name: 'Interior', url: '/services/interior' },
  { name: 'Shop Design', url: '/services/shop-design' },
  { name: 'Barrier Free', url: '/services/barrier-free' },
  { name: 'Portfolio', url: '/portfolio' },
  { name: 'Corporate', url: '/corporate' },
  { name: 'Technology', url: '/technology' },
  { name: 'News', url: '/news' },
  { name: 'Contact', url: '/contact' },
  { name: 'Journal', url: '/journal' },
  { name: 'Dev Log', url: '/dev-log' },
]

export default function SlotBrowserPage() {
  const [slots, setSlots] = useState<BrowserSlot[]>(DEFAULT_SLOTS)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile')
  const containerRef = useRef<HTMLDivElement>(null)

  const addSlot = () => {
    const newSlot: BrowserSlot = {
      id: Date.now().toString(),
      url: 'https://www.google.com',
      inputUrl: 'https://www.google.com',
      isLoading: false,
    }
    setSlots([...slots, newSlot])
  }

  const removeSlot = (id: string) => {
    if (slots.length > 1) {
      setSlots(slots.filter(slot => slot.id !== id))
    }
  }

  const updateSlotUrl = (id: string, newUrl: string) => {
    setSlots(slots.map(slot =>
      slot.id === id ? { ...slot, inputUrl: newUrl } : slot
    ))
  }

  const navigateSlot = (id: string) => {
    setSlots(slots.map(slot => {
      if (slot.id === id) {
        let url = slot.inputUrl
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'https://' + url
        }
        return { ...slot, url, isLoading: true }
      }
      return slot
    }))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter') {
      navigateSlot(id)
    }
  }

  const refreshSlot = (id: string) => {
    setSlots(slots.map(slot =>
      slot.id === id ? { ...slot, isLoading: true } : slot
    ))
    // Force iframe refresh by temporarily clearing URL
    setTimeout(() => {
      setSlots(prev => prev.map(slot =>
        slot.id === id ? { ...slot, isLoading: false } : slot
      ))
    }, 100)
  }

  const setPresetUrl = (id: string, url: string) => {
    setSlots(slots.map(slot =>
      slot.id === id ? { ...slot, url, inputUrl: url, isLoading: true } : slot
    ))
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const slotWidth = viewMode === 'mobile' ? 390 : 800

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-stone-900 flex flex-col"
    >
      {/* Top Toolbar */}
      <div className="bg-stone-800 border-b border-stone-700 px-4 py-2 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-white font-bold text-lg tracking-wider">SlotBrowser</h1>
          <span className="text-xs text-stone-400 bg-stone-700 px-2 py-0.5 rounded">EXPERIMENTAL</span>
        </div>

        <div className="flex-1" />

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-stone-700 rounded-lg p-1">
          <button
            onClick={() => setViewMode('mobile')}
            className={`p-2 rounded ${viewMode === 'mobile' ? 'bg-amber-500 text-white' : 'text-stone-400 hover:text-white'}`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('desktop')}
            className={`p-2 rounded ${viewMode === 'desktop' ? 'bg-amber-500 text-white' : 'text-stone-400 hover:text-white'}`}
            title="Desktop View"
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>

        {/* Add Slot Button */}
        <button
          onClick={addSlot}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Column</span>
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-2 text-stone-400 hover:text-white transition-colors"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Browser Columns */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex h-full p-4 gap-4" style={{ minWidth: slots.length * (slotWidth + 16) }}>
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="flex flex-col bg-stone-800 rounded-xl overflow-hidden border border-stone-700 shadow-2xl"
              style={{ width: slotWidth, minWidth: slotWidth }}
            >
              {/* Slot Header */}
              <div className="bg-stone-700 px-3 py-2 flex items-center gap-2">
                {/* Navigation Buttons */}
                <button className="p-1.5 text-stone-400 hover:text-white transition-colors rounded hover:bg-stone-600">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-stone-400 hover:text-white transition-colors rounded hover:bg-stone-600">
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => refreshSlot(slot.id)}
                  className="p-1.5 text-stone-400 hover:text-white transition-colors rounded hover:bg-stone-600"
                >
                  <RefreshCw className={`w-4 h-4 ${slot.isLoading ? 'animate-spin' : ''}`} />
                </button>

                {/* URL Input */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={slot.inputUrl}
                    onChange={(e) => updateSlotUrl(slot.id, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, slot.id)}
                    className="w-full bg-stone-800 text-white text-sm px-3 py-1.5 rounded-lg border border-stone-600 focus:border-amber-500 focus:outline-none"
                    placeholder="Enter URL..."
                  />
                </div>

                {/* Go Button */}
                <button
                  onClick={() => navigateSlot(slot.id)}
                  className="bg-amber-500 hover:bg-amber-400 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Go
                </button>

                {/* Close Button */}
                {slots.length > 1 && (
                  <button
                    onClick={() => removeSlot(slot.id)}
                    className="p-1.5 text-stone-400 hover:text-red-400 transition-colors rounded hover:bg-stone-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick Presets */}
              <div className="bg-stone-750 px-3 py-1.5 flex items-center gap-2 overflow-x-auto border-b border-stone-600" style={{ backgroundColor: '#3f3f46' }}>
                {PRESET_SITES.map((site) => (
                  <button
                    key={site.name}
                    onClick={() => setPresetUrl(slot.id, site.url)}
                    className="text-xs text-stone-400 hover:text-white px-2 py-1 rounded hover:bg-stone-600 transition-colors whitespace-nowrap"
                  >
                    {site.name}
                  </button>
                ))}
              </div>

              {/* Iframe Container */}
              <div className="flex-1 bg-white overflow-hidden relative">
                {slot.isLoading && (
                  <div className="absolute inset-0 bg-stone-900/50 flex items-center justify-center z-10">
                    <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
                  </div>
                )}
                <iframe
                  src={slot.url}
                  className="w-full h-full border-0"
                  style={{
                    height: 'calc(100vh - 160px)',
                    minHeight: '600px'
                  }}
                  onLoad={() => {
                    setSlots(prev => prev.map(s =>
                      s.id === slot.id ? { ...s, isLoading: false } : s
                    ))
                  }}
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  title={`Browser Slot ${slot.id}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-stone-800 border-t border-stone-700 px-4 py-2 flex items-center justify-between">
        <div className="text-xs text-stone-400">
          {slots.length} columns | {viewMode === 'mobile' ? 'Mobile' : 'Desktop'} view ({slotWidth}px)
        </div>
        <div className="text-xs text-stone-500">
          Note: Some sites may block iframe embedding due to security policies (X-Frame-Options)
        </div>
      </div>
    </div>
  )
}
