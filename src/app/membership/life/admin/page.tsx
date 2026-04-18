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
const INK = '#1C1917';
const TEXT = '#44403C';
const MUTE = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';
const BG = '#FAFAF9';
const PANEL = '#FFFFFF';

type DraftMap = Record<string, Partial<Recording>>;

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
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(false);
  const [drafts, setDrafts] = useState<DraftMap>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [showSelf, setShowSelf] = useState(false);
  const [activeMember, setActiveMember] = useState<string>('ALL');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [showOptional, setShowOptional] = useState<Record<string, boolean>>({});
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/life-recordings');
      const data = await res.json();
      if (data.success) setRecordings(data.recordings || []);
    } catch { /* */ }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const visibleRecordings = useMemo(() => {
    let list = recordings;
    if (!showSelf) list = list.filter(r => !!r.member_slug);
    if (activeMember !== 'ALL') list = list.filter(r => (r.member_slug || '__tonio') === activeMember);
    return list;
  }, [recordings, showSelf, activeMember]);

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
        // Scroll to next pending
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
        <div style={{ maxWidth: 880, margin: '0 auto', padding: '18px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.3em', color: FAINT, fontWeight: 500 }}>LIFE ADMIN</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontFamily: SERIF, fontSize: 22, color: GOLD, fontWeight: 600 }}>{totalPending}</span>
                <span style={{ fontSize: 11, color: FAINT, letterSpacing: '0.1em' }}>PENDING</span>
                <span style={{ fontSize: 11, color: FAINT, marginLeft: 8 }}>/ {totalAll} total</span>
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
          <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 10, marginBottom: -1 }}>
            <button
              onClick={() => setActiveMember('ALL')}
              style={tabStyle(activeMember === 'ALL')}
            >
              ALL <span style={{ opacity: 0.6, marginLeft: 4 }}>{memberStats.reduce((s, m) => s + m.pending, 0)}</span>
            </button>
            {memberStats.map(m => (
              <button
                key={m.slug}
                onClick={() => setActiveMember(m.slug)}
                style={tabStyle(activeMember === m.slug)}
              >
                {m.name}
                <span style={{
                  marginLeft: 6,
                  fontSize: 10,
                  background: m.pending > 0 ? GOLD : LINE,
                  color: m.pending > 0 ? '#fff' : MUTE,
                  padding: '1px 6px',
                  borderRadius: 10,
                  fontWeight: 600,
                }}>
                  {m.pending}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '24px 24px 120px' }}>
        {loading ? (
          <div style={{ fontSize: 14, color: FAINT }}>読み込み中...</div>
        ) : pendingList.length === 0 && convertedList.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
            color: FAINT,
            fontSize: 14,
          }}>
            <div style={{ fontSize: 40, marginBottom: 16, fontFamily: SERIF, color: LINE }}>—</div>
            <div>録音なし</div>
          </div>
        ) : (
          <>
            {/* PENDING SECTION */}
            {pendingList.length > 0 && (
              <>
                <SectionLabel count={pendingList.length} label="PENDING" color={GOLD} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
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
                          padding: '20px 20px 16px',
                        }}
                      >
                        {/* Meta row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, fontSize: 11, letterSpacing: '0.1em', color: FAINT }}>
                          <span>
                            {r.member_name || r.member_slug || 'TONIO'}
                            {r.member_slug && <span style={{ marginLeft: 6, color: MUTE }}>@{r.member_slug}</span>}
                          </span>
                          <span>{timeAgo(r.created_at)}</span>
                        </div>

                        {/* Japanese */}
                        <div style={{
                          fontFamily: SERIF,
                          fontSize: 18,
                          lineHeight: 1.7,
                          color: INK,
                          marginBottom: 16,
                        }}>
                          {r.japanese}
                        </div>

                        {/* Form */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <input
                            placeholder="english — how a native would actually say it"
                            value={d.english_attitude ?? ''}
                            onChange={e => updateDraft(r.id, { english_attitude: e.target.value })}
                            onKeyDown={handleKey(r)}
                            autoFocus={idx === 0}
                            style={inputStyle()}
                          />
                          <input
                            placeholder="context — 文脈、ニュアンス、使える場面"
                            value={d.context ?? ''}
                            onChange={e => updateDraft(r.id, { context: e.target.value })}
                            onKeyDown={handleKey(r)}
                            style={inputStyle()}
                          />

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
                                placeholder="category (optional)"
                                value={d.category ?? ''}
                                onChange={e => updateDraft(r.id, { category: e.target.value })}
                                onKeyDown={handleKey(r)}
                                style={{ ...inputStyle(), flex: 1, fontSize: 13 }}
                              />
                            </div>
                          )}

                          <div style={{ display: 'flex', gap: 8, marginTop: 6, alignItems: 'center' }}>
                            <button
                              onClick={() => convert(r)}
                              disabled={saving === r.id}
                              style={{
                                padding: '9px 20px',
                                fontSize: 12,
                                letterSpacing: '0.15em',
                                background: INK,
                                color: '#fff',
                                border: 'none',
                                borderRadius: 3,
                                cursor: saving === r.id ? 'not-allowed' : 'pointer',
                                opacity: saving === r.id ? 0.5 : 1,
                                fontWeight: 600,
                              }}
                            >
                              {saving === r.id ? 'SAVING…' : 'CONVERT'}
                            </button>
                            <button
                              onClick={() => setShowOptional(prev => ({ ...prev, [r.id]: !showOpt }))}
                              style={{
                                padding: '9px 12px',
                                fontSize: 11,
                                letterSpacing: '0.1em',
                                background: 'transparent',
                                color: MUTE,
                                border: 'none',
                                cursor: 'pointer',
                              }}
                            >
                              {showOpt ? '− MORE' : '+ MORE'}
                            </button>
                            <div style={{ flex: 1 }} />
                            <span style={{ fontSize: 10, color: FAINT, letterSpacing: '0.1em' }}>⌘↵</span>
                            <button
                              onClick={() => remove(r)}
                              style={{
                                padding: '9px 12px',
                                fontSize: 11,
                                letterSpacing: '0.1em',
                                background: 'transparent',
                                color: '#DC2626',
                                border: 'none',
                                cursor: 'pointer',
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

            {/* CONVERTED SECTION */}
            {convertedList.length > 0 && (
              <>
                <SectionLabel count={convertedList.length} label="CONVERTED" color={LINE} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {convertedList.map(r => {
                    const isExp = !!expanded[r.id];
                    return (
                      <div
                        key={r.id}
                        style={{
                          background: PANEL,
                          border: `1px solid ${LINE}`,
                          borderRadius: 4,
                          overflow: 'hidden',
                        }}
                      >
                        <button
                          onClick={() => setExpanded(prev => ({ ...prev, [r.id]: !isExp }))}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '12px 16px',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
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
                                padding: '6px 10px',
                                fontSize: 11,
                                letterSpacing: '0.1em',
                                background: 'transparent',
                                color: '#DC2626',
                                border: `1px solid ${LINE}`,
                                borderRadius: 3,
                                cursor: 'pointer',
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
    padding: '8px 14px',
    fontSize: 12,
    letterSpacing: '0.05em',
    background: active ? INK : 'transparent',
    color: active ? '#fff' : TEXT,
    border: active ? 'none' : `1px solid ${LINE}`,
    borderRadius: 3,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    fontWeight: active ? 600 : 500,
  };
}

function inputStyle(): React.CSSProperties {
  return {
    padding: '10px 14px',
    fontSize: 14,
    border: `1px solid ${LINE}`,
    borderRadius: 3,
    fontFamily: SANS,
    outline: 'none',
    background: PANEL,
    color: INK,
  };
}
