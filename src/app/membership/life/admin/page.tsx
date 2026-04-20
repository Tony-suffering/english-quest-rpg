'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

interface Recording {
  id: string;
  japanese: string;
  english_short: string | null;
  english_attitude: string | null;
  english_full: string | null;
  english_monologue: string | null;
  context: string | null;
  literal: string | null;
  category: string | null;
  status: 'pending' | 'converted';
  created_at: string;
  converted_at: string | null;
  member_slug: string | null;
  member_name: string | null;
}

const SERIF = "'Noto Serif JP', 'Source Serif Pro', Georgia, 'Times New Roman', serif";
const SANS = "'Inter', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const GOLD = '#D4AF37';
const GOLD_DIM = '#B8971F';
const GOLD_BG = '#FFFBEB';
const GOLD_BORDER = '#FDE68A';
const GREEN = '#10B981';
const GREEN_BG = '#ECFDF5';
const INK = '#1C1917';
const TEXT = '#44403C';
const MUTE = '#78716C';
const FAINT = '#A8A29E';
const GHOST = '#D6D3D1';
const LINE = '#E7E5E4';
const LINE_LIGHT = '#F5F5F4';
const BG = '#FAFAF9';
const PANEL = '#FFFFFF';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

type DraftMap = Record<string, Partial<Recording>>;

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfWeek(y: number, m: number) { return new Date(y, m, 1).getDay(); }

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return iso.slice(5, 10);
}

export default function LifeAdminPage() {
  const now = new Date();

  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(false);
  const [drafts, setDrafts] = useState<DraftMap>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [showSelf, setShowSelf] = useState(true);
  const [activeMember, setActiveMember] = useState<string>('ALL');

  // Calendar + date filter
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // null = all dates

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [showOptional, setShowOptional] = useState<Record<string, boolean>>({});
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/life-recordings?all=true');
      const data = await res.json();
      if (data.success) setRecordings(data.recordings || []);
    } catch { /* */ }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // Base list: member + self toggle filters
  const memberFiltered = useMemo(() => {
    let list = recordings;
    if (!showSelf) list = list.filter(r => !!r.member_slug);
    if (activeMember !== 'ALL') list = list.filter(r => (r.member_slug || '__tonio') === activeMember);
    return list;
  }, [recordings, showSelf, activeMember]);

  // Date-filtered list
  const visibleRecordings = useMemo(() => {
    if (!selectedDate) return memberFiltered;
    return memberFiltered.filter(r => r.created_at.startsWith(selectedDate));
  }, [memberFiltered, selectedDate]);

  // Calendar map: per-date { pending, converted }
  const dateMap = useMemo(() => {
    const map: Record<string, { pending: number; converted: number }> = {};
    for (const r of memberFiltered) {
      const d = r.created_at.split('T')[0];
      if (!map[d]) map[d] = { pending: 0, converted: 0 };
      if (r.status === 'pending') map[d].pending++;
      else map[d].converted++;
    }
    return map;
  }, [memberFiltered]);

  const memberStats = useMemo(() => {
    const map: Record<string, { slug: string; name: string; total: number; pending: number }> = {};
    for (const r of recordings) {
      const slug = r.member_slug || '__tonio';
      if (!showSelf && slug === '__tonio') continue;
      if (!map[slug]) {
        map[slug] = {
          slug,
          name: r.member_name || (slug === '__tonio' ? 'TONIO' : slug),
          total: 0,
          pending: 0,
        };
      }
      map[slug].total++;
      if (r.status === 'pending') map[slug].pending++;
    }
    return Object.values(map).sort((a, b) => b.pending - a.pending || a.slug.localeCompare(b.slug));
  }, [recordings, showSelf]);

  const totalPending = visibleRecordings.filter(r => r.status === 'pending').length;
  const totalAll = visibleRecordings.length;

  const pendingList = useMemo(
    () => visibleRecordings.filter(r => r.status === 'pending')
      .sort((a, b) => (a.created_at > b.created_at ? 1 : -1)),
    [visibleRecordings]
  );
  const convertedList = useMemo(
    () => visibleRecordings.filter(r => r.status === 'converted')
      .sort((a, b) => (a.converted_at || a.created_at) > (b.converted_at || b.created_at) ? -1 : 1),
    [visibleRecordings]
  );

  // Calendar grid
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);
  const prevMonth = () => { if (viewMonth === 0) { setViewYear(viewYear - 1); setViewMonth(11); } else setViewMonth(viewMonth - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewYear(viewYear + 1); setViewMonth(0); } else setViewMonth(viewMonth + 1); };
  const goToday = () => {
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    setSelectedDate(toDateStr(now));
  };
  const todayStr = toDateStr(now);

  const updateDraft = (id: string, patch: Partial<Recording>) => {
    setDrafts(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  };

  const convert = async (r: Recording) => {
    const draft = drafts[r.id] || {};
    const english_attitude = (draft.english_attitude ?? r.english_attitude ?? '').trim();
    const context = (draft.context ?? r.context ?? '').trim();
    if (!english_attitude || !context) {
      alert('english と context は必須');
      return;
    }
    setSaving(r.id);
    try {
      const res = await fetch('/api/life-recordings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: r.id,
          english_attitude,
          context,
          english_short: draft.english_short ?? r.english_short ?? '',
          english_full: draft.english_full ?? r.english_full ?? '',
          english_monologue: draft.english_monologue ?? r.english_monologue ?? '',
          literal: draft.literal ?? r.literal ?? null,
          category: draft.category ?? r.category ?? null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setRecordings(prev => prev.map(x =>
          x.id === r.id
            ? { ...x, ...draft, english_attitude, context, status: 'converted' as const, converted_at: new Date().toISOString() }
            : x
        ));
        setDrafts(prev => { const n = { ...prev }; delete n[r.id]; return n; });
        const nextPending = pendingList.find(p => p.id !== r.id && !drafts[p.id]);
        if (nextPending && cardRefs.current[nextPending.id]) {
          setTimeout(() => cardRefs.current[nextPending.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
        }
      }
    } catch { /* */ }
    setSaving(null);
  };

  const remove = async (r: Recording) => {
    if (!confirm(`削除: ${r.japanese.slice(0, 30)}...`)) return;
    try {
      const res = await fetch('/api/life-recordings', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: r.id }),
      });
      const data = await res.json();
      if (data.success) setRecordings(prev => prev.filter(x => x.id !== r.id));
    } catch { /* */ }
  };

  const handleKey = (r: Recording) => (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      convert(r);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: SANS, color: TEXT }}>
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${LINE}`, background: PANEL, position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '18px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.3em', color: FAINT, fontWeight: 500 }}>LIFE ADMIN</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontFamily: SERIF, fontSize: 22, color: GOLD, fontWeight: 600 }}>{totalPending}</span>
                <span style={{ fontSize: 11, color: FAINT, letterSpacing: '0.1em' }}>PENDING</span>
                <span style={{ fontSize: 11, color: FAINT, marginLeft: 8 }}>/ {totalAll}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: MUTE, letterSpacing: '0.1em', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={showSelf}
                  onChange={e => setShowSelf(e.target.checked)}
                  style={{ accentColor: GOLD, cursor: 'pointer' }}
                />
                SHOW MINE
              </label>
              <button
                onClick={fetchAll}
                style={{ padding: '6px 12px', fontSize: 11, letterSpacing: '0.15em', background: PANEL, color: INK, border: `1px solid ${LINE}`, borderRadius: 3, cursor: 'pointer' }}
              >
                REFRESH
              </button>
            </div>
          </div>

          {/* Member tabs */}
          <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 10 }}>
            <button onClick={() => setActiveMember('ALL')} style={tabStyle(activeMember === 'ALL')}>
              ALL <span style={{ opacity: 0.6, marginLeft: 4 }}>{memberStats.reduce((s, m) => s + m.pending, 0)}</span>
            </button>
            {memberStats.map(m => (
              <button key={m.slug} onClick={() => setActiveMember(m.slug)} style={tabStyle(activeMember === m.slug)}>
                {m.name}
                <span style={{
                  marginLeft: 6, fontSize: 10,
                  background: m.pending > 0 ? GOLD : LINE,
                  color: m.pending > 0 ? '#fff' : MUTE,
                  padding: '1px 6px', borderRadius: 10, fontWeight: 600,
                }}>
                  {m.pending}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '20px 24px 120px' }}>
        {/* ───────── Calendar ───────── */}
        <div style={{
          background: PANEL, border: `1px solid ${LINE}`, borderRadius: 6,
          padding: '16px 16px 12px', marginBottom: 20,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <button onClick={prevMonth} style={calNavBtn}>‹</button>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 600, color: INK }}>
                {viewYear}.{String(viewMonth + 1).padStart(2, '0')}
              </span>
              <button
                onClick={goToday}
                style={{
                  padding: '3px 10px', fontSize: 10, letterSpacing: '0.15em',
                  background: 'transparent', color: MUTE,
                  border: `1px solid ${LINE}`, borderRadius: 3, cursor: 'pointer', fontWeight: 600,
                }}
              >
                TODAY
              </button>
              {selectedDate && (
                <button
                  onClick={() => setSelectedDate(null)}
                  style={{
                    padding: '3px 10px', fontSize: 10, letterSpacing: '0.15em',
                    background: INK, color: '#fff',
                    border: 'none', borderRadius: 3, cursor: 'pointer', fontWeight: 600,
                  }}
                >
                  ALL DATES ×
                </button>
              )}
            </div>
            <button onClick={nextMonth} style={calNavBtn}>›</button>
          </div>

          {/* Weekday header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: 4 }}>
            {WEEKDAYS.map((d, i) => (
              <div key={i} style={{ fontSize: 10, color: GHOST, fontWeight: 600, letterSpacing: '0.1em' }}>{d}</div>
            ))}
          </div>

          {/* Day grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const cellDate = new Date(viewYear, viewMonth, day);
              const cellKey = toDateStr(cellDate);
              const isSelected = cellKey === selectedDate;
              const isToday = cellKey === todayStr;
              const data = dateMap[cellKey];
              const hasPending = data && data.pending > 0;
              const hasConverted = data && data.converted > 0;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(cellKey === selectedDate ? null : cellKey)}
                  style={{
                    aspectRatio: '1',
                    minHeight: 48,
                    border: isSelected ? `2px solid ${INK}` : hasPending ? `1px solid ${GOLD_BORDER}` : `1px solid ${LINE_LIGHT}`,
                    borderRadius: 6,
                    cursor: 'pointer',
                    background: isSelected ? INK : isToday ? GOLD_BG : hasPending ? '#FFFEF9' : PANEL,
                    color: isSelected ? '#fff' : isToday ? GOLD_DIM : INK,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: 3, padding: 2,
                    fontFamily: SANS,
                    transition: 'all 0.1s ease',
                  }}
                >
                  <span style={{
                    fontSize: 14, fontWeight: isSelected || isToday ? 800 : 500,
                  }}>
                    {day}
                  </span>
                  {data && (
                    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                      {hasPending && (
                        <span style={{
                          fontSize: 9, fontWeight: 700,
                          color: isSelected ? GOLD : GOLD_DIM,
                          background: isSelected ? 'rgba(212,175,55,0.2)' : GOLD_BG,
                          padding: '1px 5px', borderRadius: 8,
                          lineHeight: 1.3,
                        }}>
                          {data.pending}
                        </span>
                      )}
                      {hasConverted && (
                        <span style={{
                          fontSize: 9, fontWeight: 700,
                          color: isSelected ? GREEN : GREEN,
                          background: isSelected ? 'rgba(16,185,129,0.2)' : GREEN_BG,
                          padding: '1px 5px', borderRadius: 8,
                          lineHeight: 1.3,
                        }}>
                          {data.converted}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{
            display: 'flex', gap: 16, justifyContent: 'center',
            marginTop: 10, paddingTop: 10, borderTop: `1px solid ${LINE_LIGHT}`,
            fontSize: 10, color: MUTE, letterSpacing: '0.05em',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 10, height: 10, background: GOLD_BG, border: `1px solid ${GOLD_BORDER}`, borderRadius: 3 }} />
              PENDING
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 10, height: 10, background: GREEN_BG, border: `1px solid ${GREEN}`, borderRadius: 3 }} />
              CONVERTED
            </span>
            <span style={{ color: FAINT }}>クリックで日付絞り込み</span>
          </div>
        </div>

        {/* Selected date banner */}
        {selectedDate && (
          <div style={{
            marginBottom: 16, padding: '10px 14px',
            background: INK, color: '#fff',
            borderRadius: 4, fontSize: 12, letterSpacing: '0.1em',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontWeight: 700 }}>FILTER</span>
            <span style={{ fontFamily: SERIF, fontSize: 15 }}>{selectedDate}</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.7 }}>
              {pendingList.length} pending · {convertedList.length} converted
            </span>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div style={{ fontSize: 14, color: FAINT, padding: 20 }}>読み込み中...</div>
        ) : pendingList.length === 0 && convertedList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: FAINT, fontSize: 14 }}>
            <div style={{ fontSize: 40, marginBottom: 16, fontFamily: SERIF, color: LINE }}>—</div>
            <div>{selectedDate ? `${selectedDate} の録音なし` : '録音なし'}</div>
          </div>
        ) : (
          <>
            {/* PENDING */}
            {pendingList.length > 0 && (
              <>
                <SectionLabel count={pendingList.length} label="PENDING" color={GOLD} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 44 }}>
                  {pendingList.map((r, idx) => {
                    const d = drafts[r.id] || {};
                    const showOpt = !!showOptional[r.id];
                    return (
                      <div
                        key={r.id}
                        ref={el => { cardRefs.current[r.id] = el; }}
                        style={{
                          background: PANEL,
                          border: `1px solid ${LINE}`,
                          borderLeft: `3px solid ${GOLD}`,
                          borderRadius: 4,
                          padding: '22px 24px 18px',
                        }}
                      >
                        {/* Meta */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, fontSize: 11, letterSpacing: '0.1em', color: FAINT }}>
                          <span>
                            {r.member_name || r.member_slug || 'TONIO'}
                            {r.member_slug && <span style={{ marginLeft: 6, color: MUTE }}>@{r.member_slug}</span>}
                          </span>
                          <span>
                            {r.created_at.slice(0, 10)} · {timeAgo(r.created_at)}
                          </span>
                        </div>

                        {/* Japanese — big */}
                        <div style={{
                          fontFamily: SERIF,
                          fontSize: 22,
                          lineHeight: 1.65,
                          color: INK,
                          marginBottom: 20,
                          fontWeight: 500,
                        }}>
                          〝{r.japanese}〞
                        </div>

                        {/* Form */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          <div>
                            <label style={fieldLabel}>ENGLISH — ネイティブが実際に言うやつ</label>
                            <input
                              placeholder="how a native would actually say it"
                              value={d.english_attitude ?? ''}
                              onChange={e => updateDraft(r.id, { english_attitude: e.target.value })}
                              onKeyDown={handleKey(r)}
                              autoFocus={idx === 0}
                              style={inputStyle()}
                            />
                          </div>

                          <div>
                            <label style={fieldLabel}>CONTEXT — なぜそうなるのか、文脈、ニュアンス</label>
                            <textarea
                              placeholder="文脈、ニュアンス、使える場面、他の言い方との違い"
                              value={d.context ?? ''}
                              onChange={e => updateDraft(r.id, { context: e.target.value })}
                              onKeyDown={handleKey(r)}
                              rows={3}
                              style={{ ...inputStyle(), resize: 'vertical', minHeight: 72, fontFamily: SANS, lineHeight: 1.6 }}
                            />
                          </div>

                          {showOpt && (
                            <div style={{ display: 'flex', gap: 8 }}>
                              <input
                                placeholder="short (optional)"
                                value={d.english_short ?? ''}
                                onChange={e => updateDraft(r.id, { english_short: e.target.value })}
                                onKeyDown={handleKey(r)}
                                style={{ ...inputStyle(), flex: 1, fontSize: 13 }}
                              />
                              <input
                                placeholder="full (optional)"
                                value={d.english_full ?? ''}
                                onChange={e => updateDraft(r.id, { english_full: e.target.value })}
                                onKeyDown={handleKey(r)}
                                style={{ ...inputStyle(), flex: 1, fontSize: 13 }}
                              />
                              <input
                                placeholder="category (optional)"
                                value={d.category ?? ''}
                                onChange={e => updateDraft(r.id, { category: e.target.value })}
                                onKeyDown={handleKey(r)}
                                style={{ ...inputStyle(), flex: 1, fontSize: 13 }}
                              />
                            </div>
                          )}

                          <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
                            <button
                              onClick={() => convert(r)}
                              disabled={saving === r.id}
                              style={{
                                padding: '11px 24px', fontSize: 12, letterSpacing: '0.15em',
                                background: INK, color: '#fff', border: 'none', borderRadius: 3,
                                cursor: saving === r.id ? 'not-allowed' : 'pointer',
                                opacity: saving === r.id ? 0.5 : 1, fontWeight: 700,
                              }}
                            >
                              {saving === r.id ? 'SAVING…' : 'CONVERT'}
                            </button>
                            <button
                              onClick={() => setShowOptional(prev => ({ ...prev, [r.id]: !showOpt }))}
                              style={{
                                padding: '9px 12px', fontSize: 11, letterSpacing: '0.1em',
                                background: 'transparent', color: MUTE, border: 'none', cursor: 'pointer',
                              }}
                            >
                              {showOpt ? '− MORE' : '+ MORE'}
                            </button>
                            <div style={{ flex: 1 }} />
                            <span style={{ fontSize: 10, color: FAINT, letterSpacing: '0.1em' }}>⌘↵ to save</span>
                            <button
                              onClick={() => remove(r)}
                              style={{
                                padding: '9px 12px', fontSize: 11, letterSpacing: '0.1em',
                                background: 'transparent', color: '#DC2626', border: 'none', cursor: 'pointer',
                              }}
                            >
                              DELETE
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* CONVERTED */}
            {convertedList.length > 0 && (
              <>
                <SectionLabel count={convertedList.length} label="CONVERTED" color={GREEN} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {convertedList.map(r => {
                    const isExp = !!expanded[r.id];
                    return (
                      <div
                        key={r.id}
                        style={{ background: PANEL, border: `1px solid ${LINE}`, borderRadius: 4, overflow: 'hidden' }}
                      >
                        <button
                          onClick={() => setExpanded(prev => ({ ...prev, [r.id]: !isExp }))}
                          style={{
                            width: '100%', textAlign: 'left', padding: '12px 16px',
                            background: 'transparent', border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 12,
                          }}
                        >
                          <span style={{ fontSize: 10, color: FAINT, letterSpacing: '0.1em', minWidth: 60 }}>
                            {r.member_name || r.member_slug || 'TONIO'}
                          </span>
                          <span style={{ fontSize: 13, color: INK, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {r.japanese}
                          </span>
                          <span style={{ fontSize: 13, color: GOLD, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {r.english_attitude}
                          </span>
                          <span style={{ fontSize: 10, color: FAINT, letterSpacing: '0.1em' }}>
                            {timeAgo(r.converted_at || r.created_at)}
                          </span>
                        </button>
                        {isExp && (
                          <div style={{ padding: '4px 16px 16px', borderTop: `1px solid ${LINE}` }}>
                            <div style={{ fontFamily: SERIF, fontSize: 16, color: INK, marginTop: 10, marginBottom: 10, lineHeight: 1.6 }}>
                              {r.japanese}
                            </div>
                            <div style={{ paddingLeft: 12, borderLeft: `2px solid ${GOLD}`, marginBottom: 12 }}>
                              <div style={{ fontSize: 15, color: INK, lineHeight: 1.6 }}>{r.english_attitude}</div>
                              {r.context && <div style={{ fontSize: 12, color: MUTE, marginTop: 6, lineHeight: 1.6 }}>{r.context}</div>}
                            </div>
                            <button
                              onClick={() => remove(r)}
                              style={{
                                padding: '6px 10px', fontSize: 11, letterSpacing: '0.1em',
                                background: 'transparent', color: '#DC2626',
                                border: `1px solid ${LINE}`, borderRadius: 3, cursor: 'pointer',
                              }}
                            >
                              DELETE
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SectionLabel({ count, label, color }: { count: number; label: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0 14px' }}>
      <span style={{ width: 4, height: 4, borderRadius: 4, background: color }} />
      <span style={{ fontSize: 11, letterSpacing: '0.2em', color: MUTE, fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 11, color: FAINT }}>{count}</span>
      <span style={{ flex: 1, height: 1, background: LINE }} />
    </div>
  );
}

function tabStyle(active: boolean): React.CSSProperties {
  return {
    padding: '8px 14px', fontSize: 12, letterSpacing: '0.05em',
    background: active ? INK : 'transparent',
    color: active ? '#fff' : TEXT,
    border: active ? 'none' : `1px solid ${LINE}`,
    borderRadius: 3, cursor: 'pointer', whiteSpace: 'nowrap',
    display: 'flex', alignItems: 'center', fontWeight: active ? 600 : 500,
  };
}

const calNavBtn: React.CSSProperties = {
  background: 'transparent', border: 'none', cursor: 'pointer',
  fontSize: 22, color: MUTE, padding: '4px 12px', lineHeight: 1,
};

const fieldLabel: React.CSSProperties = {
  display: 'block',
  fontSize: 10, letterSpacing: '0.15em', color: MUTE, fontWeight: 600,
  marginBottom: 5,
};

function inputStyle(): React.CSSProperties {
  return {
    width: '100%',
    padding: '11px 14px', fontSize: 14,
    border: `1px solid ${LINE}`, borderRadius: 3,
    fontFamily: SANS, outline: 'none',
    background: PANEL, color: INK,
    boxSizing: 'border-box',
  };
}
