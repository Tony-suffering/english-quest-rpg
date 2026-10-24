'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import EnglishSidebar from '@/components/EnglishSidebar';
import { FORGE_ENTRIES } from '@/data/english/forge-contents';

// --- Types ---
interface StartCard {
  id: string;
  english: string;
  japanese: string;
  category: string;
}

// Element styling
const ELEM: Record<string, { label: string; fg: string; bg: string; glow: string }> = {
  earth:   { label: 'EARTH',   fg: '#92400E', bg: '#FEF3C7', glow: '#F59E0B' },
  wind:    { label: 'WIND',    fg: '#065F46', bg: '#D1FAE5', glow: '#10B981' },
  thunder: { label: 'THUNDER', fg: '#5B21B6', bg: '#EDE9FE', glow: '#8B5CF6' },
  flame:   { label: 'FLAME',   fg: '#DC2626', bg: '#FEE2E2', glow: '#EF4444' },
  aqua:    { label: 'AQUA',    fg: '#0369A1', bg: '#E0F2FE', glow: '#0EA5E9' },
};

const TYPE_BADGE: Record<string, { label: string; fg: string; bg: string }> = {
  story:        { label: 'STORY',        fg: '#92400E', bg: '#FEF3C7' },
  conversation: { label: 'TALK',         fg: '#065F46', bg: '#D1FAE5' },
  scene:        { label: 'SCENE',        fg: '#1E3A5F', bg: '#DBEAFE' },
  column:       { label: 'COLUMN',       fg: '#5B21B6', bg: '#EDE9FE' },
};

type Filter = 'all' | 'used' | 'unused';

// Build usage map from data file (source of truth)
function buildUsageMap(): Map<string, { forgeId: string; title: string; type: string; daySlot: number; month: string }[]> {
  const map = new Map<string, { forgeId: string; title: string; type: string; daySlot: number; month: string }[]>();
  for (const entry of FORGE_ENTRIES) {
    for (const card of entry.sourceCards) {
      const key = card.english.toLowerCase();
      const existing = map.get(key) || [];
      existing.push({
        forgeId: entry.id,
        title: entry.title,
        type: entry.type,
        daySlot: entry.daySlot,
        month: entry.month,
      });
      map.set(key, existing);
    }
  }
  return map;
}

// Check if a START card's text contains a source card reference
function matchCard(cardEnglish: string, sourceKey: string): boolean {
  return cardEnglish.toLowerCase().includes(sourceKey.toLowerCase());
}

export default function ForgeCardsPage() {
  const [startCards, setStartCards] = useState<StartCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const usageMap = useMemo(() => buildUsageMap(), []);

  // Load START cards from API
  useEffect(() => {
    async function load() {
      try {
        const [phrasesRes, masteryRes] = await Promise.all([
          fetch('/api/phrases').then(r => r.json()).catch(() => ({ phrases: [] })),
          fetch('/api/phrase-mastery').then(r => r.json()).catch(() => ({ mastery: {} })),
        ]);
        const phrases = phrasesRes.phrases || phrasesRes || [];
        const mastery = masteryRes.mastery || masteryRes || {};
        const cards: StartCard[] = [];
        for (const p of phrases) {
          if (mastery[p.id] === 6) {
            cards.push({ id: p.id, english: p.english, japanese: p.japanese, category: p.category || 'earth' });
          }
        }
        cards.sort((a, b) => a.english.localeCompare(b.english));
        setStartCards(cards);
      } catch { /* silent */ }
      finally { setLoading(false); }
    }
    load();
  }, []);

  // Match each START card to forge usage
  const cardUsages = useMemo(() => {
    const result = new Map<string, { forgeId: string; title: string; type: string; daySlot: number; month: string }[]>();
    for (const card of startCards) {
      const matches: { forgeId: string; title: string; type: string; daySlot: number; month: string }[] = [];
      for (const [sourceKey, entries] of usageMap) {
        if (matchCard(card.english, sourceKey)) {
          matches.push(...entries);
        }
      }
      result.set(card.id, matches);
    }
    return result;
  }, [startCards, usageMap]);

  // Stats
  const usedCount = startCards.filter(c => (cardUsages.get(c.id) || []).length > 0).length;
  const unusedCount = startCards.length - usedCount;
  const pct = startCards.length > 0 ? Math.round((usedCount / startCards.length) * 100) : 0;

  // Filter
  const filtered = useMemo(() => {
    if (filter === 'all') return startCards;
    return startCards.filter(c => {
      const used = (cardUsages.get(c.id) || []).length > 0;
      return filter === 'used' ? used : !used;
    });
  }, [startCards, cardUsages, filter]);

  // Truncate long card text
  function truncate(s: string, n: number) { return s.length > n ? s.slice(0, n) + '...' : s; }

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: '#FAFAF9' }}>
        <EnglishSidebar />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: '#A8A29E', fontSize: 15 }}>Loading START cards...</div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FAFAF9' }}>
      <EnglishSidebar />
      <main style={{ flex: 1, maxWidth: 900, margin: '0 auto', padding: '28px 20px', overflow: 'auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <Link href="/english/forge" style={{
            fontSize: 12, color: '#D4AF37', textDecoration: 'none', fontWeight: 600,
          }}>
            &larr; FORGE
          </Link>
          <h1 style={{
            fontSize: 22, fontWeight: 800, color: '#1C1917',
            margin: '12px 0 4px 0', letterSpacing: '0.02em',
          }}>
            START Card Manager
          </h1>
          <p style={{ fontSize: 13, color: '#78716C', margin: 0 }}>
            STARTに到達したカードの使用状況。Forgeコンテンツの素材として使われたかどうか。
          </p>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
          borderRadius: 14, overflow: 'hidden', border: '1px solid #E7E5E4',
          background: '#FFF', marginBottom: 20,
        }}>
          {[
            { value: startCards.length, label: 'TOTAL', color: '#1C1917' },
            { value: usedCount, label: 'FORGED', color: '#D4AF37' },
            { value: unusedCount, label: 'WAITING', color: '#A8A29E' },
            { value: FORGE_ENTRIES.length, label: 'CONTENTS', color: '#10B981' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '16px 12px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid #F5F5F4' : 'none',
            }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#A8A29E', letterSpacing: '0.12em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          background: '#FFF', borderRadius: 12, padding: '16px 20px',
          border: '1px solid #E7E5E4', marginBottom: 20,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.05em' }}>
              FORGE COVERAGE
            </span>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#1C1917' }}>{pct}%</span>
          </div>
          <div style={{ height: 10, borderRadius: 5, background: '#F5F5F4', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 5, transition: 'width 0.6s ease',
              background: `linear-gradient(90deg, #D4AF37 0%, #10B981 ${Math.max(pct, 20)}%)`,
              width: `${pct}%`,
            }} />
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: 10, color: '#A8A29E', marginTop: 4,
          }}>
            <span>{usedCount} cards used as source material</span>
            <span>{unusedCount} available for new content</span>
          </div>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          {([
            { key: 'all' as Filter, label: `ALL (${startCards.length})`, color: '#1C1917' },
            { key: 'used' as Filter, label: `FORGED (${usedCount})`, color: '#D4AF37' },
            { key: 'unused' as Filter, label: `WAITING (${unusedCount})`, color: '#A8A29E' },
          ]).map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{
              padding: '7px 16px', borderRadius: 8, fontSize: 11, fontWeight: 700,
              letterSpacing: '0.06em', cursor: 'pointer', transition: 'all 0.2s',
              border: filter === f.key ? 'none' : '1px solid #E7E5E4',
              background: filter === f.key ? f.color : '#FFF',
              color: filter === f.key ? '#FFF' : '#78716C',
            }}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Card list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(card => {
            const usages = cardUsages.get(card.id) || [];
            const isUsed = usages.length > 0;
            const isExpanded = expandedCard === card.id;
            const elem = ELEM[card.category] || ELEM.earth;

            return (
              <div key={card.id} style={{
                background: '#FFF', borderRadius: 12, overflow: 'hidden',
                border: `1px solid ${isUsed ? elem.glow + '30' : '#E7E5E4'}`,
                transition: 'all 0.2s',
                boxShadow: isExpanded ? '0 4px 16px rgba(0,0,0,0.06)' : '0 1px 2px rgba(0,0,0,0.02)',
              }}>
                {/* Card row */}
                <div
                  onClick={() => setExpandedCard(isExpanded ? null : card.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 18px', cursor: 'pointer',
                    background: isUsed
                      ? `linear-gradient(90deg, ${elem.bg} 0%, #FFF 60%)`
                      : '#FFF',
                  }}
                >
                  {/* Status indicator */}
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                    background: isUsed ? elem.glow : '#D6D3D1',
                    boxShadow: isUsed ? `0 0 8px ${elem.glow}50` : 'none',
                  }} />

                  {/* Element badge */}
                  <span style={{
                    fontSize: 8, fontWeight: 800, letterSpacing: '0.1em',
                    color: elem.fg, background: elem.bg,
                    padding: '2px 7px', borderRadius: 4, flexShrink: 0,
                  }}>
                    {elem.label}
                  </span>

                  {/* Card text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 13, fontWeight: 600, color: '#1C1917',
                      lineHeight: 1.4,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {truncate(card.english, 70)}
                    </div>
                    {card.japanese && (
                      <div style={{
                        fontSize: 11, color: '#A8A29E', marginTop: 1,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {card.japanese}
                      </div>
                    )}
                  </div>

                  {/* Usage count */}
                  {isUsed && (
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: '#D4AF37',
                      background: '#FEF9E7', padding: '3px 10px', borderRadius: 6,
                      flexShrink: 0,
                    }}>
                      x{usages.length}
                    </span>
                  )}

                  {/* Expand arrow */}
                  <span style={{
                    fontSize: 14, color: '#D6D3D1', flexShrink: 0,
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)',
                    transition: 'transform 0.2s',
                  }}>
                    &rsaquo;
                  </span>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div style={{
                    padding: '0 18px 16px 18px',
                    borderTop: '1px solid #F5F5F4',
                  }}>
                    {/* Full text */}
                    <div style={{
                      fontSize: 13, color: '#44403C', lineHeight: 1.6,
                      padding: '12px 14px', margin: '12px 0',
                      background: '#FAFAF9', borderRadius: 8,
                      borderLeft: `3px solid ${elem.glow}`,
                    }}>
                      {card.english}
                    </div>

                    {usages.length === 0 ? (
                      <div style={{
                        fontSize: 12, color: '#A8A29E', fontStyle: 'italic',
                        padding: '4px 0',
                      }}>
                        Not yet used in any Forge content. Available as source material.
                      </div>
                    ) : (
                      <>
                        <div style={{
                          fontSize: 9, fontWeight: 700, color: '#78716C',
                          letterSpacing: '0.1em', marginBottom: 8,
                        }}>
                          APPEARS IN
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {usages.map((u, i) => {
                            const tb = TYPE_BADGE[u.type] || TYPE_BADGE.story;
                            return (
                              <Link key={i} href="/english/forge" style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: '8px 12px', borderRadius: 8,
                                background: '#FAFAF9', border: '1px solid #E7E5E4',
                                textDecoration: 'none', transition: 'background 0.15s',
                              }}>
                                <span style={{
                                  fontSize: 8, fontWeight: 800, letterSpacing: '0.08em',
                                  color: tb.fg, background: tb.bg,
                                  padding: '2px 7px', borderRadius: 3, flexShrink: 0,
                                }}>
                                  {tb.label}
                                </span>
                                <span style={{ fontSize: 13, fontWeight: 600, color: '#1C1917' }}>
                                  {u.title}
                                </span>
                                <span style={{
                                  fontSize: 11, color: '#A8A29E', marginLeft: 'auto', flexShrink: 0,
                                }}>
                                  {u.month} / {u.daySlot}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '48px 20px', color: '#A8A29E',
          }}>
            {filter === 'unused' ? 'All START cards have been forged!' :
             filter === 'used' ? 'No cards forged yet.' :
             'No START cards found.'}
          </div>
        )}
      </main>
    </div>
  );
}
