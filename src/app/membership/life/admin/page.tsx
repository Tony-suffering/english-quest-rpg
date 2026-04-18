'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

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

type DraftMap = Record<string, Partial<Recording>>;

export default function LifeAdminPage() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(false);
  const [drafts, setDrafts] = useState<DraftMap>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [filter, setFilter] = useState<'pending' | 'all'>('pending');

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const url = filter === 'pending' ? '/api/life-recordings?pending=true' : '/api/life-recordings';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) setRecordings(data.recordings || []);
    } catch { /* */ }
    setLoading(false);
  }, [filter]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const grouped = useMemo(() => {
    const map: Record<string, Recording[]> = {};
    for (const r of recordings) {
      const key = r.member_slug || '__tonio';
      if (!map[key]) map[key] = [];
      map[key].push(r);
    }
    return map;
  }, [recordings]);

  const memberKeys = useMemo(() => Object.keys(grouped).sort(), [grouped]);

  const updateDraft = (id: string, patch: Partial<Recording>) => {
    setDrafts(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  };

  const convert = async (r: Recording) => {
    const draft = drafts[r.id] || {};
    const english_attitude = (draft.english_attitude ?? r.english_attitude ?? '').trim();
    const context = (draft.context ?? r.context ?? '').trim();
    if (!english_attitude || !context) {
      alert('english_attitude と context は必須');
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
        setRecordings(prev => prev.map(x => x.id === r.id ? { ...x, ...draft, english_attitude, context, status: 'converted' as const, converted_at: new Date().toISOString() } : x));
        setDrafts(prev => { const n = { ...prev }; delete n[r.id]; return n; });
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

  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: SANS, color: TEXT }}>
      <div style={{ borderBottom: `1px solid ${LINE}`, padding: '20px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.3em', color: FAINT, fontWeight: 500 }}>
            LIFE ADMIN
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setFilter('pending')}
              style={{ padding: '6px 12px', fontSize: 12, background: filter === 'pending' ? INK : '#fff', color: filter === 'pending' ? '#fff' : INK, border: `1px solid ${LINE}`, borderRadius: 4, cursor: 'pointer' }}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('all')}
              style={{ padding: '6px 12px', fontSize: 12, background: filter === 'all' ? INK : '#fff', color: filter === 'all' ? '#fff' : INK, border: `1px solid ${LINE}`, borderRadius: 4, cursor: 'pointer' }}
            >
              All
            </button>
            <button
              onClick={fetchAll}
              style={{ padding: '6px 12px', fontSize: 12, background: '#fff', color: INK, border: `1px solid ${LINE}`, borderRadius: 4, cursor: 'pointer' }}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px 120px' }}>
        {loading ? (
          <div style={{ fontSize: 14, color: FAINT }}>読み込み中...</div>
        ) : memberKeys.length === 0 ? (
          <div style={{ fontSize: 14, color: FAINT }}>録音なし</div>
        ) : (
          memberKeys.map(key => {
            const rows = grouped[key];
            const displayName = key === '__tonio' ? 'TONIO (自分)' : (rows[0]?.member_name ? `${rows[0].member_name} — @${key}` : `@${key}`);
            return (
              <div key={key} style={{ marginBottom: 48 }}>
                <div style={{ fontFamily: SERIF, fontSize: 20, color: INK, marginBottom: 4 }}>{displayName}</div>
                <div style={{ fontSize: 11, letterSpacing: '0.15em', color: FAINT, marginBottom: 16 }}>
                  {rows.length} RECORDINGS · {rows.filter(r => r.status === 'pending').length} PENDING
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {rows.map(r => {
                    const d = drafts[r.id] || {};
                    const isPending = r.status === 'pending';
                    return (
                      <div key={r.id} style={{ padding: 16, background: '#fff', border: `1px solid ${isPending ? GOLD : LINE}`, borderRadius: 4 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                          <div style={{ fontSize: 15, lineHeight: 1.6, color: INK, flex: 1 }}>
                            {r.japanese}
                          </div>
                          <div style={{ fontSize: 10, color: FAINT, letterSpacing: '0.15em', whiteSpace: 'nowrap' }}>
                            {r.created_at.slice(5, 16).replace('T', ' ')}
                          </div>
                        </div>

                        {isPending ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                            <input
                              placeholder="english_attitude (必須)"
                              value={d.english_attitude ?? ''}
                              onChange={e => updateDraft(r.id, { english_attitude: e.target.value })}
                              style={{ padding: '8px 12px', fontSize: 14, border: `1px solid ${LINE}`, borderRadius: 4, fontFamily: SANS }}
                            />
                            <input
                              placeholder="context (必須)"
                              value={d.context ?? ''}
                              onChange={e => updateDraft(r.id, { context: e.target.value })}
                              style={{ padding: '8px 12px', fontSize: 14, border: `1px solid ${LINE}`, borderRadius: 4, fontFamily: SANS }}
                            />
                            <div style={{ display: 'flex', gap: 8 }}>
                              <input
                                placeholder="english_short (任意)"
                                value={d.english_short ?? ''}
                                onChange={e => updateDraft(r.id, { english_short: e.target.value })}
                                style={{ flex: 1, padding: '8px 12px', fontSize: 13, border: `1px solid ${LINE}`, borderRadius: 4, fontFamily: SANS }}
                              />
                              <input
                                placeholder="category (任意)"
                                value={d.category ?? ''}
                                onChange={e => updateDraft(r.id, { category: e.target.value })}
                                style={{ flex: 1, padding: '8px 12px', fontSize: 13, border: `1px solid ${LINE}`, borderRadius: 4, fontFamily: SANS }}
                              />
                            </div>
                            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                              <button
                                onClick={() => convert(r)}
                                disabled={saving === r.id}
                                style={{ padding: '8px 16px', fontSize: 13, background: INK, color: '#fff', border: 'none', borderRadius: 4, cursor: saving === r.id ? 'not-allowed' : 'pointer', opacity: saving === r.id ? 0.5 : 1 }}
                              >
                                {saving === r.id ? '保存中...' : 'Convert'}
                              </button>
                              <button
                                onClick={() => remove(r)}
                                style={{ padding: '8px 16px', fontSize: 13, background: '#fff', color: '#DC2626', border: `1px solid ${LINE}`, borderRadius: 4, cursor: 'pointer' }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div style={{ marginTop: 12, paddingLeft: 12, borderLeft: `2px solid ${GOLD}`, fontSize: 14, lineHeight: 1.7, color: TEXT }}>
                            <div style={{ color: INK }}>{r.english_attitude}</div>
                            {r.context && <div style={{ fontSize: 12, color: MUTE, marginTop: 4 }}>{r.context}</div>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
