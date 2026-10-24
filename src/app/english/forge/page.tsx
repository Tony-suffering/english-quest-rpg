'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import { FORGE_ENTRIES, type ForgeEntry, type ForgeExpression } from '@/data/english/forge-contents';
import EnglishSidebar from '@/components/EnglishSidebar';
import ReviewCalendar, { loadReviewed, saveReviewed } from '@/components/english/ReviewCalendar';

// --- Constants ---
const TYPE_STYLE: Record<string, { label: string; fg: string; bg: string; border: string }> = {
  story:        { label: 'STORY',        fg: '#92400E', bg: '#FEF3C7', border: '#F59E0B' },
  conversation: { label: 'CONVERSATION', fg: '#065F46', bg: '#D1FAE5', border: '#10B981' },
  scene:        { label: 'SCENE',        fg: '#1E3A5F', bg: '#DBEAFE', border: '#3B82F6' },
  column:       { label: 'COLUMN',       fg: '#5B21B6', bg: '#EDE9FE', border: '#8B5CF6' },
};

const EXPR_TYPE_COLORS: Record<string, { fg: string; bg: string }> = {
  idiom:          { fg: '#DB2777', bg: '#FCE7F3' },
  'phrasal-verb': { fg: '#059669', bg: '#D1FAE5' },
  expression:     { fg: '#2563EB', bg: '#DBEAFE' },
  slang:          { fg: '#D97706', bg: '#FEF3C7' },
};

const CATEGORY_COLORS: Record<string, { fg: string; bg: string }> = {
  story:        { fg: '#92400E', bg: '#FEF3C7' },
  conversation: { fg: '#065F46', bg: '#D1FAE5' },
  scene:        { fg: '#1E3A5F', bg: '#DBEAFE' },
  column:       { fg: '#5B21B6', bg: '#EDE9FE' },
};

// --- Helpers ---
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildMonthKey(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}`;
}

function highlightText(
  text: string,
  sourceCards: { english: string }[],
  pickable: ForgeExpression[],
  onPickClick: (expr: ForgeExpression) => void,
  registered: Set<string>,
): React.ReactNode[] {
  const allTerms = [
    ...sourceCards.map(c => ({ text: c.english, kind: 'source' as const })),
    ...pickable.map(p => ({ text: p.expression, kind: 'pick' as const })),
  ].sort((a, b) => b.text.length - a.text.length);

  if (allTerms.length === 0) return [text];

  const pattern = new RegExp(
    `(${allTerms.map(t => escapeRegex(t.text)).join('|')})`,
    'gi'
  );

  const parts = text.split(pattern);
  return parts.map((part, i) => {
    const matchedSource = sourceCards.find(c => c.english.toLowerCase() === part.toLowerCase());
    const matchedPick = pickable.find(p => p.expression.toLowerCase() === part.toLowerCase());

    if (matchedSource) {
      return (
        <span key={i} style={{
          background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
          color: '#92400E', padding: '1px 6px', borderRadius: 4,
          fontWeight: 600, borderBottom: '2px solid #D4AF37',
        }}>
          {part}
        </span>
      );
    }

    if (matchedPick) {
      const isReg = registered.has(matchedPick.expression.toLowerCase());
      return (
        <span key={i} onClick={() => !isReg && onPickClick(matchedPick)} style={{
          background: isReg
            ? 'linear-gradient(135deg, #D1FAE5, #A7F3D0)'
            : 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
          color: isReg ? '#047857' : '#065F46',
          padding: '1px 6px', borderRadius: 4, fontWeight: 500,
          borderBottom: isReg ? '2px solid #10B981' : '2px dashed #6EE7B7',
          cursor: isReg ? 'default' : 'pointer', transition: 'all 0.2s',
        }}>
          {part}{isReg && <span style={{ marginLeft: 3, fontSize: 10 }}>OK</span>}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// --- Storage ---
const STORAGE_KEY_REGISTERED = 'forge-registered-expressions';
const STORAGE_KEY_READ = 'forge-read-entries';

function loadRegistered(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_REGISTERED) || '[]')); }
  catch { return new Set(); }
}
function saveRegistered(s: Set<string>) {
  localStorage.setItem(STORAGE_KEY_REGISTERED, JSON.stringify([...s]));
}
function loadReadEntries(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_READ) || '[]')); }
  catch { return new Set(); }
}
function saveReadEntries(s: Set<string>) {
  localStorage.setItem(STORAGE_KEY_READ, JSON.stringify([...s]));
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function ForgePage() {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [registered, setRegistered] = useState<Set<string>>(new Set());
  const [readEntries, setReadEntries] = useState<Set<string>>(new Set());
  const [registerTarget, setRegisterTarget] = useState<ForgeExpression | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [registerDate, setRegisterDate] = useState(''); // YYYY-MM-DD for date picker
  const [isMobile, setIsMobile] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  const todayDate = now.getDate();
  const todayMonth = now.getMonth();
  const todayYear = now.getFullYear();

  // Reviewed days (calendar checkmarks)
  const reviewKey = `forge-reviewed-${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
  const [reviewedDays, setReviewedDays] = useState<Set<number>>(new Set());

  useEffect(() => { setReviewedDays(loadReviewed(reviewKey)); }, [reviewKey]);
  useEffect(() => { setRegistered(loadRegistered()); setReadEntries(loadReadEntries()); }, []);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check(); window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Build entries for current month
  const monthEntries = useMemo(() => {
    const key = buildMonthKey(viewYear, viewMonth);
    return FORGE_ENTRIES.filter(e => (e.month || '2026-04') === key);
  }, [viewYear, viewMonth]);

  // Calendar entries format
  const calendarEntries = useMemo(() =>
    monthEntries.map(e => ({
      id: e.id,
      day_slot: e.daySlot,
      japanese: e.titleJa,
      category: e.type,
    })),
    [monthEntries]
  );

  // By day
  const byDay = useMemo(() => {
    const map: Record<number, ForgeEntry[]> = {};
    monthEntries.forEach(e => {
      if (!map[e.daySlot]) map[e.daySlot] = [];
      map[e.daySlot].push(e);
    });
    return map;
  }, [monthEntries]);

  // Auto-select today
  useEffect(() => {
    if (monthEntries.length > 0 && selectedDay === null) {
      setSelectedDay(todayDate);
    }
  }, [monthEntries.length, selectedDay, todayDate]);

  // Scroll detail to top on day change
  useEffect(() => { detailRef.current?.scrollTo(0, 0); }, [selectedDay]);

  // "played" = all expressions registered for that entry
  const playedIds = useMemo(() => {
    const ids = new Set<string>();
    for (const entry of monthEntries) {
      const allReg = entry.pickableExpressions.every(
        p => registered.has(p.expression.toLowerCase())
      );
      if (allReg && entry.pickableExpressions.length > 0) ids.add(entry.id);
    }
    return ids;
  }, [monthEntries, registered]);

  // Auto-complete: when all expressions registered, mark day as reviewed
  useEffect(() => {
    if (!selectedDay) return;
    const dayEntries = byDay[selectedDay] || [];
    if (dayEntries.length === 0) return;
    const allDone = dayEntries.every(e => playedIds.has(e.id));
    if (allDone && !reviewedDays.has(selectedDay)) {
      const next = new Set(reviewedDays);
      next.add(selectedDay);
      setReviewedDays(next);
      saveReviewed(reviewKey, next);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playedIds, selectedDay]);

  // Sync card usage to DB (once per session per entry)
  const syncedForgeIds = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (!selectedDay) return;
    const dayEntries = byDay[selectedDay] || [];
    dayEntries.forEach(entry => {
      if (syncedForgeIds.current.has(entry.id)) return;
      syncedForgeIds.current.add(entry.id);
      const usageEntries = entry.sourceCards.map(card => ({
        card_english: card.english,
        card_japanese: card.japanese,
        forge_id: entry.id,
        forge_title: entry.title,
        forge_type: entry.type,
      }));
      fetch('/api/forge-usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entries: usageEntries }),
      }).catch(() => {});
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay]);

  // Selected day entries
  const selectedEntries = useMemo(() =>
    selectedDay ? (byDay[selectedDay] || []) : [],
    [selectedDay, byDay]
  );

  // Month nav
  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelectedDay(null);
  };
  const goToday = () => {
    setViewYear(todayYear); setViewMonth(todayMonth); setSelectedDay(todayDate);
  };

  // Pick expression
  const handlePickClick = useCallback((expr: ForgeExpression) => {
    setRegisterTarget(expr);
    setRegisterSuccess(false);
    // Default to today's date
    const d = new Date();
    setRegisterDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
  }, []);

  const handleRegister = useCallback(async () => {
    if (!registerTarget || !registerDate) return;
    setRegistering(true);
    try {
      const res = await fetch('/api/phrases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          english: registerTarget.expression,
          japanese: registerTarget.meaning,
          category: 'expression',
          date: registerDate,
        }),
      });
      if (res.ok || res.status === 409) {
        setRegistered(prev => {
          const next = new Set(prev);
          next.add(registerTarget.expression.toLowerCase());
          saveRegistered(next);
          return next;
        });
        setRegisterSuccess(true);
        setTimeout(() => { setRegisterTarget(null); setRegisterSuccess(false); }, 1200);
      }
    } catch { /* silent */ }
    finally { setRegistering(false); }
  }, [registerTarget]);

  // --- RENDER ---
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#FAFAF9' }}>
      <EnglishSidebar />
      <div style={{
        flex: 1, display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        overflow: 'hidden', height: '100vh',
      }}>

        {/* LEFT: Calendar */}
        <div style={{
          width: isMobile ? '100%' : 340,
          minWidth: isMobile ? undefined : 300,
          borderRight: isMobile ? 'none' : '1px solid #E7E5E4',
          borderBottom: isMobile ? '1px solid #E7E5E4' : 'none',
          background: '#FFF',
          display: 'flex', flexDirection: 'column',
          maxHeight: isMobile ? 380 : '100vh',
          overflow: 'auto',
        }}>
          <ReviewCalendar
            title="FORGE"
            subtitle="STARTカードから生まれるコンテンツ"
            accent="#D4AF37"
            accentBg="#FEF9E7"
            entries={calendarEntries}
            categoryColors={CATEGORY_COLORS}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
            viewYear={viewYear}
            viewMonth={viewMonth}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
            onGoToday={goToday}
            storagePrefix="forge"
            playedIds={playedIds}
            isMobile={isMobile}
            headerRight={
              <Link href="/english/forge/cards" style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                color: '#D4AF37', background: '#FEF9E7',
                padding: '5px 12px', borderRadius: 6,
                border: '1px solid #D4AF3730',
                textDecoration: 'none',
              }}>
                CARDS
              </Link>
            }
          />
        </div>

        {/* RIGHT: Detail Panel */}
        <div
          ref={detailRef}
          style={{
            flex: 1, overflow: 'auto',
            padding: isMobile ? '16px 14px' : '24px 32px',
          }}
        >
          {selectedEntries.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              height: '100%', minHeight: 300, color: '#A8A29E',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 16,
                background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, fontWeight: 800, color: '#D4AF37',
                marginBottom: 16,
              }}>
                F
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#78716C', marginBottom: 6 }}>
                {selectedDay ? 'No content for this day' : 'Select a day'}
              </div>
              <div style={{ fontSize: 12, color: '#A8A29E' }}>
                {selectedDay
                  ? 'Content will be added here over time'
                  : 'Choose a highlighted day from the calendar'}
              </div>
            </div>
          ) : (
            selectedEntries.map(entry => {
              const ts = TYPE_STYLE[entry.type] || TYPE_STYLE.story;
              const pickedCount = entry.pickableExpressions.filter(
                p => registered.has(p.expression.toLowerCase())
              ).length;
              const allPicked = pickedCount === entry.pickableExpressions.length;

              return (
                <div key={entry.id}>
                  {/* Entry header */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    marginBottom: 16, flexWrap: 'wrap',
                  }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                      color: ts.fg, background: ts.bg,
                      padding: '3px 10px', borderRadius: 6,
                      border: `1px solid ${ts.border}30`,
                    }}>
                      {ts.label}
                    </span>
                    <span style={{ fontSize: 12, color: '#A8A29E' }}>{entry.genre}</span>
                    <span style={{ fontSize: 12, color: '#D6D3D1' }}>|</span>
                    <span style={{
                      fontSize: 12, fontWeight: 600,
                      color: allPicked ? '#10B981' : '#78716C',
                    }}>
                      {pickedCount}/{entry.pickableExpressions.length} expressions
                    </span>

                    {/* Auto-completion indicator */}
                    {allPicked && (
                      <span style={{
                        marginLeft: 'auto', padding: '5px 14px', borderRadius: 8,
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
                        background: 'linear-gradient(135deg, #D4AF37, #F59E0B)',
                        color: '#FFF',
                      }}>
                        COMPLETE
                      </span>
                    )}
                  </div>

                  <h1 style={{
                    fontSize: 24, fontWeight: 800, color: '#1C1917',
                    margin: '0 0 4px 0', lineHeight: 1.3,
                  }}>
                    {entry.title}
                  </h1>
                  <p style={{ fontSize: 15, color: '#78716C', margin: '0 0 20px 0', fontWeight: 500 }}>
                    {entry.titleJa}
                  </p>

                  {/* Source cards */}
                  <div style={{
                    background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
                    borderRadius: 12, padding: '14px 18px', marginBottom: 16,
                    border: '1px solid #F59E0B30',
                  }}>
                    <div style={{
                      fontSize: 10, fontWeight: 700, color: '#92400E',
                      letterSpacing: '0.1em', marginBottom: 10,
                    }}>
                      SOURCE CARDS
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {entry.sourceCards.map((card, i) => (
                        <span key={i} style={{
                          fontSize: 11, fontWeight: 600, color: '#92400E',
                          background: '#FFF', padding: '4px 10px', borderRadius: 8,
                          border: '1px solid #F59E0B40',
                        }}>
                          {card.english.length > 30 ? card.english.slice(0, 30) + '...' : card.english}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Legend */}
                  <div style={{
                    display: 'flex', gap: 16, marginBottom: 16,
                    fontSize: 11, color: '#A8A29E',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{
                        display: 'inline-block', width: 10, height: 10, borderRadius: 3,
                        background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                        border: '1px solid #F59E0B60',
                      }} />
                      START card
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{
                        display: 'inline-block', width: 10, height: 10, borderRadius: 3,
                        background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
                        borderBottom: '2px dashed #6EE7B7',
                      }} />
                      Tap to register
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div style={{
                    background: '#FFF', borderRadius: 16, padding: isMobile ? '20px 16px' : '28px 32px',
                    border: '1px solid #E7E5E4', marginBottom: 20,
                    lineHeight: 1.85, fontSize: 15, color: '#292524',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                  }}>
                    {/* Setting for conversation/scene */}
                    {entry.content.kind !== 'story' && (
                      <div style={{
                        fontSize: 13, color: '#78716C', fontStyle: 'italic',
                        marginBottom: 20, padding: '10px 14px',
                        background: '#FAFAF9', borderRadius: 8,
                        borderLeft: '3px solid #D6D3D1',
                      }}>
                        {entry.content.kind === 'conversation'
                          ? entry.content.setting
                          : entry.content.setting}
                      </div>
                    )}

                    {/* Characters for scene */}
                    {entry.content.kind === 'scene' && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                        {entry.content.characters.map((c, i) => (
                          <div key={i} style={{
                            background: '#FAFAF9', borderRadius: 8, padding: '8px 14px',
                            border: '1px solid #E7E5E4', flex: '1 1 160px',
                          }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#1C1917' }}>{c.name}</div>
                            <div style={{ fontSize: 11, color: '#78716C' }}>{c.trait}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Story paragraphs */}
                    {entry.content.kind === 'story' && entry.content.paragraphs.map((p, i) => (
                      <p key={i} style={{ margin: '0 0 16px 0' }}>
                        {highlightText(p, entry.sourceCards, entry.pickableExpressions, handlePickClick, registered)}
                      </p>
                    ))}

                    {/* Conversation/Scene lines */}
                    {(entry.content.kind === 'conversation' || entry.content.kind === 'scene') && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {entry.content.lines.map((line, i) => {
                          const isLeft = i % 2 === 0;
                          const direction = 'direction' in line ? (line as any).direction : undefined;
                          return (
                            <div key={i}>
                              {direction && (
                                <div style={{
                                  fontSize: 11, color: '#A8A29E', fontStyle: 'italic',
                                  textAlign: 'center', marginBottom: 4,
                                }}>
                                  ({direction})
                                </div>
                              )}
                              <div style={{
                                display: 'flex',
                                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                              }}>
                                <div style={{
                                  maxWidth: '85%',
                                  background: isLeft
                                    ? 'linear-gradient(135deg, #F5F5F4, #FAFAF9)'
                                    : 'linear-gradient(135deg, #FFFBEB, #FEF9E7)',
                                  borderRadius: isLeft ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
                                  padding: '10px 16px',
                                  border: `1px solid ${isLeft ? '#E7E5E4' : '#F5D98060'}`,
                                }}>
                                  <div style={{
                                    fontSize: 10, fontWeight: 700,
                                    color: isLeft ? '#D4AF37' : '#92400E',
                                    letterSpacing: '0.05em', marginBottom: 3,
                                  }}>
                                    {line.speaker}
                                  </div>
                                  <div style={{ fontSize: 14, lineHeight: 1.7 }}>
                                    {highlightText(
                                      line.text, entry.sourceCards,
                                      entry.pickableExpressions, handlePickClick, registered,
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* EXPRESSION LIST */}
                  <div style={{
                    background: '#FFF', borderRadius: 16, padding: isMobile ? '18px 14px' : '24px 28px',
                    border: '1px solid #E7E5E4', marginBottom: 32,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                  }}>
                    <div style={{
                      fontSize: 10, fontWeight: 700, color: '#065F46',
                      letterSpacing: '0.1em', marginBottom: 14,
                    }}>
                      EXPRESSIONS TO COLLECT
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {entry.pickableExpressions.map((expr, i) => {
                        const isReg = registered.has(expr.expression.toLowerCase());
                        const tc = EXPR_TYPE_COLORS[expr.type] || EXPR_TYPE_COLORS.expression;
                        return (
                          <div
                            key={i}
                            onClick={() => !isReg && handlePickClick(expr)}
                            style={{
                              display: 'flex', alignItems: 'flex-start', gap: 12,
                              padding: '12px 14px', borderRadius: 10,
                              background: isReg ? '#F0FDF4' : '#FAFAF9',
                              border: `1px solid ${isReg ? '#BBF7D0' : '#E7E5E4'}`,
                              cursor: isReg ? 'default' : 'pointer',
                              transition: 'all 0.2s',
                            }}
                          >
                            <div style={{
                              width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                              background: isReg ? 'linear-gradient(135deg, #10B981, #059669)' : '#E7E5E4',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: '#FFF', fontSize: 11, fontWeight: 700, marginTop: 2,
                            }}>
                              {isReg ? 'OK' : (i + 1)}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                                <span style={{ fontSize: 14, fontWeight: 700, color: '#1C1917' }}>
                                  {expr.expression}
                                </span>
                                <span style={{
                                  fontSize: 9, fontWeight: 700, letterSpacing: '0.06em',
                                  color: tc.fg, background: tc.bg,
                                  padding: '1px 6px', borderRadius: 3,
                                }}>
                                  {expr.type.toUpperCase()}
                                </span>
                              </div>
                              <div style={{ fontSize: 12, color: '#78716C', marginBottom: 2 }}>
                                {expr.meaning}
                              </div>
                              <div style={{ fontSize: 11, color: '#A8A29E', lineHeight: 1.4 }}>
                                {expr.context}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* REGISTER MODAL */}
      {registerTarget && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}
          onClick={() => !registering && setRegisterTarget(null)}
        >
          <div
            style={{
              background: '#FFF', borderRadius: 20, padding: '28px 32px',
              maxWidth: 420, width: '100%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              animation: 'forgeModalIn 0.25s ease',
            }}
            onClick={e => e.stopPropagation()}
          >
            {registerSuccess ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10B981, #059669)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px', color: '#FFF', fontSize: 22, fontWeight: 700,
                }}>OK</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1C1917' }}>Registered!</div>
                <div style={{ fontSize: 12, color: '#78716C', marginTop: 4 }}>
                  My Phrasesに追加されました
                </div>
              </div>
            ) : (
              <>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                  color: '#D4AF37', marginBottom: 14,
                }}>
                  REGISTER EXPRESSION
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#1C1917', marginBottom: 6 }}>
                  {registerTarget.expression}
                </div>
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: '0.06em',
                  color: (EXPR_TYPE_COLORS[registerTarget.type] || EXPR_TYPE_COLORS.expression).fg,
                  background: (EXPR_TYPE_COLORS[registerTarget.type] || EXPR_TYPE_COLORS.expression).bg,
                  padding: '2px 7px', borderRadius: 3, display: 'inline-block', marginBottom: 14,
                }}>
                  {registerTarget.type.toUpperCase()}
                </span>
                <div style={{
                  background: '#FAFAF9', borderRadius: 10, padding: '14px 18px',
                  border: '1px solid #E7E5E4', marginBottom: 14,
                }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1C1917', marginBottom: 4 }}>
                    {registerTarget.meaning}
                  </div>
                  <div style={{ fontSize: 12, color: '#78716C', lineHeight: 1.5 }}>
                    {registerTarget.context}
                  </div>
                </div>

                {/* Date picker for training calendar */}
                <div style={{
                  background: '#FFF', borderRadius: 10, padding: '14px 18px',
                  border: '1px solid #E7E5E4', marginBottom: 14,
                }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: '#D4AF37',
                    letterSpacing: '0.08em', marginBottom: 8,
                  }}>
                    TRAINING DATE
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input
                      type="date"
                      value={registerDate}
                      onChange={e => setRegisterDate(e.target.value)}
                      style={{
                        flex: 1, padding: '8px 12px', borderRadius: 8,
                        border: '1px solid #E7E5E4', fontSize: 14, fontWeight: 600,
                        color: '#1C1917', background: '#FAFAF9',
                        outline: 'none',
                      }}
                    />
                    <button
                      onClick={() => {
                        const d = new Date();
                        setRegisterDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
                      }}
                      style={{
                        padding: '8px 14px', borderRadius: 8,
                        border: '1px solid #E7E5E4', background: '#FFF',
                        fontSize: 11, fontWeight: 700, color: '#78716C',
                        cursor: 'pointer', whiteSpace: 'nowrap',
                      }}
                    >
                      Today
                    </button>
                  </div>
                  <div style={{ fontSize: 11, color: '#A8A29E', marginTop: 6 }}>
                    /english/training のこの日付にカードとして登録
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => setRegisterTarget(null)}
                    style={{
                      flex: 1, padding: '10px 0', borderRadius: 10,
                      background: '#F5F5F4', border: '1px solid #E7E5E4',
                      color: '#78716C', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                    }}
                  >Cancel</button>
                  <button
                    onClick={handleRegister}
                    disabled={registering || !registerDate}
                    style={{
                      flex: 1, padding: '10px 0', borderRadius: 10,
                      background: (registering || !registerDate) ? '#D6D3D1' : 'linear-gradient(135deg, #10B981, #059669)',
                      border: 'none', color: '#FFF', fontWeight: 700, fontSize: 13,
                      cursor: (registering || !registerDate) ? 'wait' : 'pointer',
                      boxShadow: (registering || !registerDate) ? 'none' : '0 4px 12px rgba(16,185,129,0.3)',
                    }}
                  >{registering ? '...' : 'Register'}</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes forgeModalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
