'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  LESSON_PLANS,
  CATEGORY_META,
  DIFFICULTY_LABEL,
} from '@/data/english/eikaiwa-lab';

const LS_KEY = 'eikaiwa-lab-completed';
const LS_ACTIVE = 'eikaiwa-lab-active';

interface ArsenalItem { source: string; sourceColor: string; en: string; jp: string }
interface GorokuRow { id: string; japanese: string; english: string | string[]; mastery_level: number }
interface CardPhrase { id: string; english: string; japanese: string }
interface SessionLog {
  id: string; session_id: number; session_date: string;
  highlights: string[]; struggle_points: string[];
  flow_rating: number | null; note: string; goroku_ids: string[];
  created_at: string;
}

function getLS(k: string, fb: string) { return typeof window === 'undefined' ? fb : localStorage.getItem(k) || fb; }
function shuffle<T>(a: T[]): T[] { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

function CopyBtn({ text, label, accent, icon }: { text: string; label: string; accent: string; icon: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000); }}
      style={{
        flex: 1, padding: '12px 8px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
        background: ok ? accent : '#FFF', color: ok ? '#FFF' : accent,
        border: `1.5px solid ${ok ? accent : accent + '30'}`, borderRadius: 12, cursor: 'pointer',
        transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      }}
    >
      <span style={{ fontSize: 16, lineHeight: 1 }}>{ok ? '' : icon}</span>
      <span>{ok ? 'COPIED' : label}</span>
    </button>
  );
}

function FlowDots({ rating, onRate, interactive }: { rating: number | null; onRate?: (r: number) => void; interactive?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <button key={i} onClick={() => interactive && onRate?.(i)} style={{
          width: 14, height: 14, borderRadius: '50%',
          background: (rating || 0) >= i ? '#D4AF37' : '#E7E5E4',
          border: 'none', cursor: interactive ? 'pointer' : 'default',
          transition: 'all 0.15s',
        }} />
      ))}
    </div>
  );
}

export default function EikaiwaLabPage() {
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [activeId, setActiveId] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [allArsenal, setAllArsenal] = useState<ArsenalItem[]>([]);
  const [showDetail, setShowDetail] = useState(false);
  const [wide, setWide] = useState(true);
  // Session log
  const [logs, setLogs] = useState<SessionLog[]>([]);
  const [rightTab, setRightTab] = useState<'arsenal' | 'log'>('arsenal');
  const [showLogForm, setShowLogForm] = useState(false);
  const [logHighlights, setLogHighlights] = useState('');
  const [logStruggles, setLogStruggles] = useState('');
  const [logRating, setLogRating] = useState<number>(0);
  const [logNote, setLogNote] = useState('');
  const [logSaving, setLogSaving] = useState(false);

  useEffect(() => {
    try { setCompletedIds(JSON.parse(getLS(LS_KEY, '[]'))); } catch { /* */ }
    const saved = parseInt(getLS(LS_ACTIVE, '0'), 10);
    if (saved && LESSON_PLANS.some(lp => lp.id === saved)) setActiveId(saved);
    else {
      try {
        const done: number[] = JSON.parse(getLS(LS_KEY, '[]'));
        const first = LESSON_PLANS.find(lp => !done.includes(lp.id));
        setActiveId(first?.id || 1);
      } catch { /* */ }
    }
    setMounted(true);
    const mq = window.matchMedia('(min-width: 960px)');
    setWide(mq.matches);
    const handler = (e: MediaQueryListEvent) => setWide(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Load arsenal
  useEffect(() => {
    if (!mounted) return;
    let off = false;
    async function load() {
      const items: ArsenalItem[] = [];
      try {
        const pR = await fetch('/api/phrases');
        if (pR.ok) {
          const phrases: CardPhrase[] = (await pR.json()).phrases || [];
          for (const p of phrases) items.push({ source: 'CARD', sourceColor: '#2563EB', en: p.english, jp: p.japanese });
        }
      } catch { /* */ }
      try {
        const r = await fetch('/api/goroku');
        if (r.ok) for (const g of ((await r.json()).entries || []).filter((e: GorokuRow) => e.mastery_level >= 3)) {
          const en = Array.isArray(g.english) ? g.english[1] || g.english[0] : g.english;
          items.push({ source: 'GOROKU', sourceColor: '#D4AF37', en, jp: g.japanese });
        }
      } catch { /* */ }
      if (!off) { setAllArsenal(shuffle(items)); setArsenalPage(0); }
    }
    load();
    return () => { off = true; };
  }, [mounted]);

  // Load session logs
  useEffect(() => {
    if (!mounted) return;
    fetch('/api/eikaiwa-log').then(r => r.ok ? r.json() : null).then(j => {
      if (j?.entries) setLogs(j.entries);
    }).catch(() => {});
  }, [mounted]);

  const [arsenalPage, setArsenalPage] = useState(0);
  const ARSENAL_PAGE_SIZE = 3;
  const arsenalMaxPage = Math.max(0, Math.ceil(allArsenal.length / ARSENAL_PAGE_SIZE) - 1);
  const arsenalSlice = allArsenal.slice(arsenalPage * ARSENAL_PAGE_SIZE, (arsenalPage + 1) * ARSENAL_PAGE_SIZE);
  const nextArsenal = useCallback(() => setArsenalPage(p => p >= arsenalMaxPage ? 0 : p + 1), [arsenalMaxPage]);

  const toggleComplete = useCallback((id: number) => {
    setCompletedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const selectLesson = useCallback((id: number) => {
    setActiveId(id);
    localStorage.setItem(LS_ACTIVE, String(id));
    setShowDetail(false);
    setShowLogForm(false);
  }, []);

  const saveLog = useCallback(async () => {
    if (logSaving) return;
    setLogSaving(true);
    const highlights = logHighlights.split('\n').map(s => s.trim()).filter(Boolean);
    const struggles = logStruggles.split('\n').map(s => s.trim()).filter(Boolean);
    const today = new Date(); const date = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    try {
      const r = await fetch('/api/eikaiwa-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: activeId, session_date: date,
          highlights, struggle_points: struggles,
          flow_rating: logRating || null, note: logNote,
        }),
      });
      if (r.ok) {
        const j = await r.json();
        setLogs(prev => [j.entry, ...prev]);
        setShowLogForm(false);
        setLogHighlights(''); setLogStruggles(''); setLogRating(0); setLogNote('');
        setRightTab('log');
      }
    } catch { /* */ }
    setLogSaving(false);
  }, [activeId, logHighlights, logStruggles, logRating, logNote, logSaving]);

  const lesson = LESSON_PLANS.find(lp => lp.id === activeId) || LESSON_PLANS[0];
  const cm = CATEGORY_META[lesson.category];
  const done = completedIds.includes(lesson.id);
  const activeLogs = logs.filter(l => l.session_id === activeId);

  const prompt = (() => {
    let p = lesson.chatgpt_prompt;
    if (arsenalSlice.length > 0) {
      const sample = arsenalSlice.map(a => a.en.length > 40 ? a.en.slice(0, 40) + '...' : a.en);
      p += `\n\nBonus: I also want to try using these if they fit: ${sample.map(s => `'${s}'`).join(', ')}.`;
    }
    return p;
  })();

  const cheat =
    lesson.target_expressions.map((e, i) => `${i + 1}. ${e.en} = ${e.jp}`).join('\n') +
    `\n\n[SECRET] ${lesson.secret_mission}`;

  const review =
    `Session ${String(lesson.id).padStart(2, '0')}: ${lesson.codename}\nTarget: ${lesson.target_expressions.map(e => e.en).join(' / ')}\n\n[PASTE TRANSCRIPT HERE]\n\nAnalyze: 1) Which targets did I use? 2) Unnatural phrasing? 3) New goroku candidates? 4) Flow rating 1-10`;

  if (!mounted) return null;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: wide ? '32px 40px 80px' : '20px 16px 80px' }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1C1917', margin: 0, letterSpacing: '-0.01em' }}>
            英会話Lab
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#1C1917', padding: '6px 14px', borderRadius: 10,
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.06em' }}>
                {logs.length} SESSIONS
              </span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 4,
              background: '#FAFAF9', padding: '6px 14px', borderRadius: 10,
              border: '1px solid #F5F5F4',
            }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#D4AF37', fontFamily: 'monospace' }}>
                {completedIds.length}
              </span>
              <span style={{ fontSize: 13, color: '#D6D3D1', fontFamily: 'monospace' }}>/ {LESSON_PLANS.length}</span>
            </div>
          </div>
        </div>
        <p style={{ fontSize: 12, color: '#A8A29E', margin: 0, letterSpacing: '0.04em', fontWeight: 500 }}>
          ChatGPT Prep {'  '}{'>'} {'  '}DMM Battle {'  '}{'>'} {'  '}Claude Debrief
        </p>
      </div>

      {/* ── Session strip ── */}
      <div style={{
        display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8, marginBottom: 28,
        scrollbarWidth: 'none',
      }}>
        {LESSON_PLANS.map(lp => {
          const active = lp.id === activeId;
          const c = CATEGORY_META[lp.category];
          const isDone = completedIds.includes(lp.id);
          const hasLog = logs.some(l => l.session_id === lp.id);
          return (
            <button key={lp.id} onClick={() => selectLesson(lp.id)} style={{
              flexShrink: 0, width: 52, height: 52, borderRadius: 12,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
              background: active ? c.color : isDone ? '#F0FDF4' : '#FFF',
              border: active ? `2px solid ${c.color}` : isDone ? '1.5px solid #86EFAC' : '1px solid #E7E5E4',
              cursor: 'pointer', transition: 'all 0.15s',
              boxShadow: active ? `0 4px 12px ${c.color}30` : 'none',
              position: 'relative',
            }}>
              <span style={{
                fontSize: 15, fontWeight: 800, fontFamily: 'monospace',
                color: active ? '#FFF' : isDone ? '#10B981' : '#78716C',
              }}>
                {String(lp.id).padStart(2, '0')}
              </span>
              <span style={{
                fontSize: 7, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' as const,
                color: active ? 'rgba(255,255,255,0.85)' : isDone ? '#10B981' : c.color,
              }}>
                {c.label.split(' ')[0]}
              </span>
              {hasLog && (
                <span style={{
                  position: 'absolute', top: -2, right: -2, width: 8, height: 8,
                  borderRadius: '50%', background: '#D4AF37', border: '2px solid #FFF',
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Main layout ── */}
      <div style={{
        display: wide ? 'grid' : 'flex',
        ...(wide
          ? { gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'start' }
          : { flexDirection: 'column' as const, gap: 24 }),
      }}>

        {/* ════ LEFT: Mission ════ */}
        <div>
          {/* Mission card */}
          <div style={{
            background: '#FFF', borderRadius: 20, marginBottom: 20,
            border: done ? '2px solid #10B981' : '1px solid #E7E5E4',
            overflow: 'hidden',
          }}>
            <div style={{ height: 4, background: `linear-gradient(90deg, ${cm.color}, ${cm.color}80)` }} />
            <div style={{ padding: '22px 28px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{
                  fontSize: 10, fontWeight: 800, fontFamily: 'monospace', letterSpacing: '0.12em',
                  color: cm.color, background: cm.bg, padding: '4px 10px', borderRadius: 6,
                }}>
                  SESSION {String(lesson.id).padStart(2, '0')}
                </span>
                <span style={{
                  fontSize: 9, fontWeight: 700, color: '#78716C',
                  background: '#F5F5F4', padding: '4px 10px', borderRadius: 6,
                  letterSpacing: '0.06em', textTransform: 'uppercase' as const,
                }}>
                  {CATEGORY_META[lesson.category].label}
                </span>
                <span style={{ display: 'inline-flex', gap: 3, marginLeft: 2 }}>
                  {[1, 2, 3].map(i => (
                    <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i <= lesson.difficulty ? '#D4AF37' : '#E7E5E4' }} />
                  ))}
                </span>
                <span style={{ fontSize: 9, color: '#A8A29E', letterSpacing: '0.05em', fontWeight: 600 }}>
                  {DIFFICULTY_LABEL[lesson.difficulty]}
                </span>
                {done && (
                  <span style={{ fontSize: 9, fontWeight: 800, color: '#10B981', marginLeft: 'auto', letterSpacing: '0.08em', background: '#F0FDF4', padding: '4px 10px', borderRadius: 6 }}>DONE</span>
                )}
              </div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#A8A29E', letterSpacing: '0.14em', marginBottom: 6, textTransform: 'uppercase' as const }}>
                {lesson.codename}
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1C1917', margin: '0 0 4px', lineHeight: 1.3 }}>
                {lesson.theme_jp}
              </h2>
              <div style={{ fontSize: 14, color: '#78716C', marginBottom: 20 }}>{lesson.theme_en}</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button onClick={() => setShowDetail(p => !p)} style={{
                  padding: '10px 22px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                  background: showDetail ? '#F5F5F4' : '#FFF', border: '1.5px solid #E7E5E4',
                  borderRadius: 10, cursor: 'pointer', color: '#57534E', transition: 'all 0.15s',
                }}>
                  {showDetail ? 'CLOSE' : 'BRIEFING'}
                </button>
                <button onClick={() => toggleComplete(lesson.id)} style={{
                  padding: '10px 22px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                  background: done ? '#10B981' : cm.color, border: 'none',
                  borderRadius: 10, cursor: 'pointer', color: '#FFF', transition: 'all 0.15s',
                  boxShadow: `0 2px 8px ${done ? '#10B981' : cm.color}30`,
                }}>
                  {done ? 'COMPLETED' : 'MARK DONE'}
                </button>
                <button onClick={() => setShowLogForm(p => !p)} style={{
                  padding: '10px 22px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                  background: showLogForm ? '#292524' : '#1C1917', border: 'none',
                  borderRadius: 10, cursor: 'pointer', color: '#D4AF37', transition: 'all 0.15s',
                }}>
                  LOG SESSION
                </button>
              </div>
            </div>
          </div>

          {/* Detail panel */}
          {showDetail && (
            <div style={{ background: '#FAFAF9', border: '1px solid #E7E5E4', borderRadius: 16, padding: '20px 24px', marginBottom: 20 }}>
              <div style={{ fontSize: 14, color: '#44403C', lineHeight: 1.75, marginBottom: 18 }}>{lesson.briefing}</div>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#A8A29E', letterSpacing: '0.12em', marginBottom: 10 }}>TALKING POINTS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {lesson.talking_points.map((tp, i) => (
                  <div key={i} style={{ fontSize: 13, color: '#44403C', lineHeight: 1.55, paddingLeft: 14, borderLeft: `3px solid ${cm.color}40`, paddingTop: 2, paddingBottom: 2 }}>{tp}</div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: '#78716C', marginTop: 16, padding: '10px 14px', background: '#FFF', borderRadius: 10, border: '1px solid #F5F5F4' }}>
                <span style={{ fontWeight: 700, color: '#D4AF37', fontSize: 10, letterSpacing: '0.08em' }}>TIP </span>{lesson.tips}
              </div>
            </div>
          )}

          {/* ── Log Session Form ── */}
          {showLogForm && (
            <div style={{
              background: '#1C1917', borderRadius: 20, padding: '24px 28px', marginBottom: 20,
              border: '1px solid #292524',
            }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#D4AF37', letterSpacing: '0.12em', marginBottom: 20 }}>
                SESSION LOG -- {lesson.codename}
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#78716C', letterSpacing: '0.1em', marginBottom: 6 }}>
                  FLOW RATING
                </div>
                <FlowDots rating={logRating} onRate={setLogRating} interactive />
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#78716C', letterSpacing: '0.1em', marginBottom: 6 }}>
                  HIGHLIGHTS -- What moments stood out?
                </div>
                <textarea
                  value={logHighlights} onChange={e => setLogHighlights(e.target.value)}
                  placeholder={"One per line:\nExpressed a complex idea\nUsed a new phrase naturally"}
                  style={{
                    width: '100%', minHeight: 80, padding: '12px 14px', fontSize: 13,
                    background: '#292524', border: '1px solid #44403C', borderRadius: 10,
                    color: '#E7E5E4', resize: 'vertical', lineHeight: 1.6,
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#78716C', letterSpacing: '0.1em', marginBottom: 6 }}>
                  STRUGGLE POINTS -- What couldn't you express?
                </div>
                <textarea
                  value={logStruggles} onChange={e => setLogStruggles(e.target.value)}
                  placeholder={"One per line:\nCouldn't explain X concept\nGrammar broke when..."}
                  style={{
                    width: '100%', minHeight: 60, padding: '12px 14px', fontSize: 13,
                    background: '#292524', border: '1px solid #44403C', borderRadius: 10,
                    color: '#E7E5E4', resize: 'vertical', lineHeight: 1.6,
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#78716C', letterSpacing: '0.1em', marginBottom: 6 }}>
                  NOTE
                </div>
                <textarea
                  value={logNote} onChange={e => setLogNote(e.target.value)}
                  placeholder="How did it feel? Any growth evidence?"
                  style={{
                    width: '100%', minHeight: 50, padding: '12px 14px', fontSize: 13,
                    background: '#292524', border: '1px solid #44403C', borderRadius: 10,
                    color: '#E7E5E4', resize: 'vertical', lineHeight: 1.6,
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <button onClick={saveLog} disabled={logSaving} style={{
                width: '100%', padding: '14px', fontSize: 12, fontWeight: 800,
                letterSpacing: '0.1em', background: '#D4AF37', color: '#1C1917',
                border: 'none', borderRadius: 12, cursor: logSaving ? 'wait' : 'pointer',
                opacity: logSaving ? 0.6 : 1, transition: 'all 0.15s',
              }}>
                {logSaving ? 'SAVING...' : 'SAVE SESSION LOG'}
              </button>
            </div>
          )}

          {/* Target Expressions */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#A8A29E', letterSpacing: '0.12em', marginBottom: 10, paddingLeft: 2 }}>
              TARGET EXPRESSIONS
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: wide ? 'repeat(auto-fill, minmax(220px, 1fr))' : '1fr',
              gap: 10,
            }}>
              {lesson.target_expressions.map((expr, i) => (
                <div key={i} style={{
                  background: '#FFF', border: '1px solid #F5F5F4', borderRadius: 12, padding: '14px 16px',
                  borderLeft: `3px solid ${cm.color}`, transition: 'box-shadow 0.15s',
                }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1C1917', marginBottom: 3, lineHeight: 1.3 }}>{expr.en}</div>
                  <div style={{ fontSize: 11, color: '#78716C' }}>{expr.jp}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Secret Mission */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.06), rgba(212,175,55,0.02))',
            border: '1px dashed rgba(212,175,55,0.35)',
            borderRadius: 14, padding: '14px 18px', marginBottom: 20,
            display: 'flex', alignItems: 'flex-start', gap: 12,
          }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#D4AF37', letterSpacing: '0.1em', background: 'rgba(212,175,55,0.1)', padding: '4px 8px', borderRadius: 6, flexShrink: 0, marginTop: 1 }}>SECRET</span>
            <span style={{ fontSize: 13, color: '#57534E', lineHeight: 1.5 }}>{lesson.secret_mission}</span>
          </div>

          {/* Copy bar */}
          <div style={{ display: 'flex', gap: 10, padding: '16px 18px', background: '#FAFAF9', borderRadius: 16, border: '1px solid #F5F5F4' }}>
            <CopyBtn text={prompt} label="CHATGPT" accent={cm.color} icon="G" />
            <CopyBtn text={cheat} label="CHEAT" accent="#10B981" icon="D" />
            <CopyBtn text={review} label="REVIEW" accent="#7C3AED" icon="C" />
          </div>
        </div>

        {/* ════ RIGHT PANEL ════ */}
        <div style={{
          ...(wide ? { position: 'sticky' as const, top: 32, maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' as const, scrollbarWidth: 'thin' as const } : {}),
        }}>
          {/* Tab switcher */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
            {(['arsenal', 'log'] as const).map(tab => (
              <button key={tab} onClick={() => setRightTab(tab)} style={{
                flex: 1, padding: '10px', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em',
                background: rightTab === tab ? '#1C1917' : '#FFF',
                color: rightTab === tab ? '#D4AF37' : '#78716C',
                border: rightTab === tab ? 'none' : '1px solid #E7E5E4',
                borderRadius: 12, cursor: 'pointer', transition: 'all 0.15s',
                textTransform: 'uppercase' as const,
              }}>
                {tab === 'arsenal' ? `ARSENAL (${allArsenal.length})` : `LOG (${logs.length})`}
              </button>
            ))}
          </div>

          {/* ── Arsenal tab ── */}
          {rightTab === 'arsenal' && (
            <>
              <div style={{
                background: 'linear-gradient(135deg, #1C1917, #292524)',
                borderRadius: 20, padding: '24px 24px 20px', marginBottom: 12, color: '#FFF',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#A8A29E', letterSpacing: '0.14em', marginBottom: 4 }}>YOUR ARSENAL</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      <span style={{ fontSize: 32, fontWeight: 800, color: '#D4AF37', fontFamily: 'monospace', lineHeight: 1 }}>{allArsenal.length}</span>
                      <span style={{ fontSize: 11, color: '#78716C' }}>phrases loaded</span>
                    </div>
                  </div>
                  <button onClick={nextArsenal} style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#D4AF37', fontSize: 20, fontWeight: 700, transition: 'all 0.15s',
                  }}>
                    {'>>'}
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 10, color: '#57534E' }}>Tap to deal next 3</span>
                  <span style={{ fontSize: 11, color: '#57534E', fontFamily: 'monospace' }}>{arsenalPage + 1} / {arsenalMaxPage + 1}</span>
                </div>
              </div>
              {allArsenal.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#A8A29E', fontSize: 13, background: '#FFF', borderRadius: 16, border: '1px solid #E7E5E4' }}>
                  Loading phrases...
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {arsenalSlice.map((item, i) => (
                    <div key={`${arsenalPage}-${i}`} style={{
                      background: '#FFF', borderRadius: 16, padding: '18px 20px',
                      border: '1px solid #E7E5E4', borderLeft: `4px solid ${item.sourceColor}`, transition: 'all 0.2s',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                        <span style={{
                          fontSize: 8, fontWeight: 800, color: item.sourceColor, letterSpacing: '0.1em',
                          background: `${item.sourceColor}0A`, padding: '3px 8px', borderRadius: 4, border: `1px solid ${item.sourceColor}20`,
                        }}>
                          {item.source === 'CARD' ? 'WORD REVIEW' : 'GOROKU'}
                        </span>
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: '#1C1917', lineHeight: 1.55, marginBottom: 6 }}>{item.en}</div>
                      <div style={{ fontSize: 12, color: '#A8A29E', lineHeight: 1.4 }}>{item.jp}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── Session Log tab ── */}
          {rightTab === 'log' && (
            <>
              {/* Stats header */}
              <div style={{
                background: 'linear-gradient(135deg, #1C1917, #292524)',
                borderRadius: 20, padding: '24px', marginBottom: 12, color: '#FFF',
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#A8A29E', letterSpacing: '0.14em', marginBottom: 8 }}>
                  SESSION HISTORY
                </div>
                <div style={{ display: 'flex', gap: 20 }}>
                  <div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: '#D4AF37', fontFamily: 'monospace', lineHeight: 1 }}>{logs.length}</div>
                    <div style={{ fontSize: 10, color: '#78716C', marginTop: 4 }}>total sessions</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: '#FFF', fontFamily: 'monospace', lineHeight: 1 }}>
                      {logs.length > 0 ? (logs.reduce((s, l) => s + (l.flow_rating || 0), 0) / logs.filter(l => l.flow_rating).length || 0).toFixed(1) : '--'}
                    </div>
                    <div style={{ fontSize: 10, color: '#78716C', marginTop: 4 }}>avg flow</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: '#10B981', fontFamily: 'monospace', lineHeight: 1 }}>
                      {logs.reduce((s, l) => s + l.goroku_ids.length, 0)}
                    </div>
                    <div style={{ fontSize: 10, color: '#78716C', marginTop: 4 }}>goroku earned</div>
                  </div>
                </div>
              </div>

              {/* Log entries for active lesson */}
              {activeLogs.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: '#A8A29E', letterSpacing: '0.12em', marginBottom: 8, paddingLeft: 4 }}>
                    THIS SESSION
                  </div>
                  {activeLogs.map(log => (
                    <div key={log.id} style={{
                      background: '#FFF', borderRadius: 16, padding: '18px 20px', marginBottom: 10,
                      border: `1px solid ${cm.color}20`, borderLeft: `4px solid ${cm.color}`,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <span style={{ fontSize: 11, color: '#78716C', fontFamily: 'monospace' }}>{log.session_date}</span>
                        <FlowDots rating={log.flow_rating} />
                      </div>
                      {log.highlights.length > 0 && (
                        <div style={{ marginBottom: 10 }}>
                          {log.highlights.map((h, i) => (
                            <div key={i} style={{ fontSize: 12, color: '#44403C', lineHeight: 1.5, paddingLeft: 10, borderLeft: '2px solid #D4AF3740', marginBottom: 4 }}>{h}</div>
                          ))}
                        </div>
                      )}
                      {log.struggle_points.length > 0 && (
                        <div style={{ marginBottom: 8 }}>
                          {log.struggle_points.map((s, i) => (
                            <div key={i} style={{ fontSize: 11, color: '#A8A29E', lineHeight: 1.5, paddingLeft: 10, borderLeft: '2px solid #E7E5E4', marginBottom: 3 }}>{s}</div>
                          ))}
                        </div>
                      )}
                      {log.note && <div style={{ fontSize: 12, color: '#78716C', lineHeight: 1.5, fontStyle: 'italic' }}>{log.note}</div>}
                      {log.goroku_ids.length > 0 && (
                        <div style={{ marginTop: 8, fontSize: 10, color: '#D4AF37', fontWeight: 700 }}>
                          {log.goroku_ids.length} goroku extracted
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* All logs timeline */}
              <div style={{ fontSize: 9, fontWeight: 800, color: '#A8A29E', letterSpacing: '0.12em', marginBottom: 8, paddingLeft: 4 }}>
                ALL SESSIONS
              </div>
              {logs.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#A8A29E', fontSize: 13, background: '#FFF', borderRadius: 16, border: '1px solid #E7E5E4' }}>
                  No sessions logged yet
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {logs.map(log => {
                    const lp = LESSON_PLANS.find(p => p.id === log.session_id);
                    const lc = lp ? CATEGORY_META[lp.category] : { color: '#78716C', label: '' };
                    return (
                      <button key={log.id} onClick={() => { selectLesson(log.session_id); setRightTab('log'); }} style={{
                        background: '#FFF', borderRadius: 12, padding: '12px 16px',
                        border: log.session_id === activeId ? `1.5px solid ${lc.color}40` : '1px solid #E7E5E4',
                        cursor: 'pointer', textAlign: 'left',
                        display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.15s',
                      }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: 10, background: lc.color,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 13, fontWeight: 800, color: '#FFF', fontFamily: 'monospace', flexShrink: 0,
                        }}>
                          {String(log.session_id).padStart(2, '0')}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: '#1C1917', marginBottom: 2 }}>
                            {lp?.codename || `Session ${log.session_id}`}
                          </div>
                          <div style={{ fontSize: 10, color: '#A8A29E', fontFamily: 'monospace' }}>{log.session_date}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                          <FlowDots rating={log.flow_rating} />
                          {log.goroku_ids.length > 0 && (
                            <span style={{ fontSize: 9, color: '#D4AF37', fontWeight: 700 }}>{log.goroku_ids.length} goroku</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
