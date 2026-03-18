'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { T } from '@/data/izakaya-toeic/theme';
import {
  SOUND_CHANGES,
  SOUND_CHANGE_CATEGORIES,
  SoundChangeEntry,
  SoundChangeType,
  getSoundChangeSummary,
} from '@/data/izakaya-toeic/sound-changes';

// ── TTS ──
function speakText(text: string, rate = 0.85) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = rate;
  const voices = window.speechSynthesis.getVoices();
  const en = voices.find(v => /google us|david|daniel/i.test(v.name) && v.lang.startsWith('en'));
  if (en) utter.voice = en;
  window.speechSynthesis.speak(utter);
}

function playTap() {
  if (typeof window === 'undefined') return;
  try {
    const ctx = new AudioContext();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = 880; g.gain.setValueAtTime(0.06, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.08);
  } catch { /* */ }
}

// ── Category colors ──
const TYPE_COLORS: Record<SoundChangeType, string> = {
  linking: '#3B82F6',
  reduction: '#F59E0B',
  assimilation: '#8B5CF6',
  elision: '#EF4444',
  flapping: '#10B981',
  contraction: '#EC4899',
};

function FreqBadge({ freq }: { freq: SoundChangeEntry['frequency'] }) {
  const map = {
    'every-test': { label: '毎回出る', bg: 'rgba(239,68,68,0.1)', color: '#EF4444' },
    'very-common': { label: '超頻出', bg: 'rgba(212,175,55,0.12)', color: '#D4AF37' },
    'common': { label: '頻出', bg: 'rgba(168,162,158,0.15)', color: '#57534E' },
  };
  const m = map[freq];
  return (
    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20, background: m.bg, color: m.color }}>
      {m.label}
    </span>
  );
}

function ImportanceDots({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {[1, 2, 3].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: '50%', display: 'inline-block',
          background: i <= level ? T.gold : T.border,
        }} />
      ))}
    </span>
  );
}

export default function SoundChangesPage() {
  const [selectedType, setSelectedType] = useState<SoundChangeType | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [ttsRate, setTtsRate] = useState(0.7);

  const summary = useMemo(() => getSoundChangeSummary(), []);

  const filtered = useMemo(() => {
    let items = SOUND_CHANGES;
    if (selectedType !== 'all') items = items.filter(e => e.type === selectedType);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(e =>
        e.written.toLowerCase().includes(q) ||
        e.spoken.toLowerCase().includes(q) ||
        e.spokenJa.includes(q) ||
        e.rule.toLowerCase().includes(q)
      );
    }
    return items;
  }, [selectedType, searchQuery]);

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20, padding: '10px 16px',
        background: 'rgba(250,250,249,0.92)', backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/english/izakaya-toeic" style={{ fontSize: 11, color: T.textMuted, textDecoration: 'none' }}>
              {'<'} 居酒屋TOEIC
            </Link>
            <span style={{ fontSize: 10, color: T.gold, fontWeight: 700 }}>{summary.total} entries</span>
          </div>
          <h1 style={{ fontSize: 18, fontWeight: 800, margin: '4px 0 0' }}>
            <span style={{ color: T.gold }}>音変化</span>辞典
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '16px 16px 60px' }}>

        {/* Intro */}
        <div style={{
          padding: '14px 18px', background: T.surface, borderRadius: 10,
          borderLeft: `3px solid ${T.gold}`, marginBottom: 16, boxShadow: T.shadow,
        }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%', background: '#78716C12', border: '1.5px solid #78716C',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 8, color: '#78716C',
            }}>権</div>
            <span style={{ fontSize: 10, fontWeight: 700, color: T.gold, letterSpacing: 1 }}>MASTER SAYS</span>
          </div>
          <p style={{ fontSize: 13, color: T.textSub, lineHeight: 1.8, margin: 0 }}>
            「聞こえないんじゃない。お前が思ってる音と違う音が出てるんだ。ネイティブの口から出る音を、そのまま覚えろ。スペルは忘れろ。」
          </p>
        </div>

        {/* Search */}
        <div style={{ marginBottom: 12 }}>
          <input
            type="text"
            placeholder="検索... (e.g. turn it off, ターニトフ)"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '10px 14px', background: T.surface,
              border: `1px solid ${T.border}`, borderRadius: 8,
              fontSize: 13, color: T.text, outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 16 }}>
          <button
            onClick={() => { setSelectedType('all'); playTap(); }}
            style={{
              padding: '5px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: 'pointer',
              background: selectedType === 'all' ? T.gold : T.surface,
              color: selectedType === 'all' ? '#fff' : T.textMuted,
              border: `1px solid ${selectedType === 'all' ? T.gold : T.border}`,
            }}
          >
            ALL ({summary.total})
          </button>
          {SOUND_CHANGE_CATEGORIES.map(cat => {
            const c = TYPE_COLORS[cat.type];
            const active = selectedType === cat.type;
            return (
              <button
                key={cat.type}
                onClick={() => { setSelectedType(cat.type); playTap(); }}
                style={{
                  padding: '5px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  background: active ? c : T.surface,
                  color: active ? '#fff' : c,
                  border: `1px solid ${active ? c : c + '30'}`,
                }}
              >
                {cat.nameJa} ({summary.byType[cat.type]})
              </button>
            );
          })}
        </div>

        {/* Speed control */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 10, color: T.textMuted, fontWeight: 600 }}>TTS Speed:</span>
          {[0.5, 0.7, 0.85, 1.0].map(r => (
            <button
              key={r}
              onClick={() => setTtsRate(r)}
              style={{
                padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer',
                background: ttsRate === r ? T.goldBg : T.bgSecondary,
                color: ttsRate === r ? T.gold : T.textMuted,
                border: `1px solid ${ttsRate === r ? T.goldBorder : 'transparent'}`,
              }}
            >
              {r}x
            </button>
          ))}
        </div>

        {/* Category descriptions (collapsed when filter active) */}
        {selectedType !== 'all' && (() => {
          const cat = SOUND_CHANGE_CATEGORIES.find(c => c.type === selectedType)!;
          return (
            <div style={{
              padding: '12px 16px', background: TYPE_COLORS[cat.type] + '08',
              borderRadius: 10, border: `1px solid ${TYPE_COLORS[cat.type]}20`,
              marginBottom: 16,
            }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: TYPE_COLORS[cat.type] }}>
                  {cat.nameJa} ({cat.nameEn})
                </span>
                <ImportanceDots level={cat.importance} />
              </div>
              <p style={{ fontSize: 12, color: T.textSub, lineHeight: 1.7, margin: 0 }}>
                {cat.description}
              </p>
            </div>
          );
        })()}

        {/* Entry list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filtered.map(entry => {
            const isOpen = expandedId === entry.id;
            const c = TYPE_COLORS[entry.type];
            return (
              <div key={entry.id}>
                <button
                  onClick={() => { setExpandedId(isOpen ? null : entry.id); playTap(); }}
                  style={{
                    display: 'flex', gap: 10, alignItems: 'center', width: '100%',
                    padding: '10px 12px', background: isOpen ? c + '06' : T.surface,
                    borderRadius: isOpen ? '10px 10px 0 0' : 10,
                    border: `1px solid ${isOpen ? c + '30' : T.border}`,
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                  }}
                >
                  {/* Written form */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 2 }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: T.text }}>{entry.written}</span>
                      <FreqBadge freq={entry.frequency} />
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: c }}>{entry.spoken}</span>
                      <span style={{ fontSize: 12, color: T.textMuted }}>({entry.spokenJa})</span>
                    </div>
                  </div>
                  {/* Play button */}
                  <button
                    onClick={e => { e.stopPropagation(); speakText(entry.written, ttsRate); }}
                    style={{
                      width: 32, height: 32, borderRadius: '50%', background: c + '10',
                      border: `1.5px solid ${c}30`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', flexShrink: 0, fontSize: 12, color: c, fontWeight: 900,
                    }}
                  >
                    P
                  </button>
                  <span style={{ fontSize: 10, color: T.textMuted, flexShrink: 0 }}>{isOpen ? 'v' : '>'}</span>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div style={{
                    padding: '12px 14px', background: T.bgSecondary,
                    borderRadius: '0 0 10px 10px', border: `1px solid ${c}20`, borderTop: 'none',
                    animation: 'izk-fadein 0.2s ease',
                  }}>
                    {/* Rule */}
                    <div style={{ fontSize: 12, color: T.textSub, lineHeight: 1.7, marginBottom: 10 }}>
                      {entry.rule}
                    </div>

                    {/* TOEIC Context */}
                    <div style={{
                      padding: '8px 12px', background: T.goldBg, borderRadius: 6, marginBottom: 10,
                      borderLeft: `3px solid ${T.gold}`,
                    }}>
                      <div style={{ fontSize: 9, color: T.gold, fontWeight: 700, letterSpacing: 1, marginBottom: 2 }}>TOEIC CONTEXT</div>
                      <div style={{ fontSize: 12, color: T.textSub, lineHeight: 1.6 }}>{entry.toeicContext}</div>
                    </div>

                    {/* Examples */}
                    <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: 1, marginBottom: 6 }}>EXAMPLES</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
                      {entry.examples.map((ex, i) => (
                        <div key={i} style={{
                          padding: '8px 10px', background: T.surface, borderRadius: 6,
                          border: `1px solid ${T.border}`,
                        }}>
                          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: 4 }}>
                            <button
                              onClick={() => speakText(ex.sentence, ttsRate)}
                              style={{
                                padding: '2px 6px', background: c + '10', border: `1px solid ${c}30`,
                                borderRadius: 4, fontSize: 9, fontWeight: 700, color: c, cursor: 'pointer', flexShrink: 0,
                              }}
                            >
                              PLAY
                            </button>
                            <span style={{
                              padding: '2px 5px', background: T.bgSecondary, borderRadius: 3,
                              fontSize: 9, fontWeight: 700, color: T.textMuted, flexShrink: 0,
                            }}>
                              Part {ex.toeicPart}
                            </span>
                          </div>
                          <div style={{ fontSize: 13, color: T.text, lineHeight: 1.6, fontWeight: 500 }}>
                            {ex.sentence}
                          </div>
                          <div style={{ fontSize: 12, color: c, fontWeight: 700, marginTop: 2 }}>
                            {ex.soundVersion}
                          </div>
                          <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>
                            {ex.translation}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Master tip */}
                    <div style={{
                      padding: '8px 12px', background: T.surface, borderRadius: 6,
                      borderLeft: `3px solid #78716C`,
                    }}>
                      <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 3 }}>
                        <div style={{
                          width: 16, height: 16, borderRadius: '50%', background: '#78716C12', border: '1px solid #78716C',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 6, color: '#78716C',
                        }}>権</div>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#78716C', letterSpacing: 0.5 }}>MASTER'S TIP</span>
                      </div>
                      <div style={{ fontSize: 12, color: T.textSub, lineHeight: 1.7 }}>{entry.masterTip}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: T.textMuted, fontSize: 13 }}>
            該当する音変化が見つかりません
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link href="/english/izakaya-toeic" style={{ fontSize: 12, color: T.textMuted, textDecoration: 'none' }}>
            居酒屋TOEIC Top
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes izk-fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
