'use client';

import { useState, useEffect, useCallback } from 'react';
import type { YomiqueDay, YomiqueExercise, YomiqueStats, YomiqueDayProgress, YomiqueDayStory } from '@/types/yomique';
import { YOMIQUE_PHASES, YOMIQUE_CHARACTERS, YOMIQUE_STORY_ARC } from '@/types/yomique';
import type { StoryLine } from '@/types/lisque';
import { LISQUE_CHARACTERS } from '@/types/lisque';

// ─── Storage ───────────────────────────────────────────────
const STORAGE_KEY = 'yomique_stats';

function loadStats(): YomiqueStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { currentDay: 1, totalCompleted: 0, totalCorrect: 0, streakDays: 0, dayProgress: {} };
}
function saveStats(stats: YomiqueStats) { localStorage.setItem(STORAGE_KEY, JSON.stringify(stats)); }

// ─── Colors ────────────────────────────────────────────────
const C = {
  gold: '#D4AF37', green: '#10B981', blue: '#3B82F6', red: '#EF4444',
  purple: '#8B5CF6', amber: '#F59E0B', pink: '#EC4899',
  bg: '#FAFAF9', card: '#FFFFFF', border: '#E7E5E4',
  textPrimary: '#1C1917', textSecondary: '#78716C', textMuted: '#A8A29E',
};

// ─── Auto-generate options when not provided ──────────────
function seededShuffle<T>(arr: T[], seed: string): T[] {
  const out = [...arr];
  let h = 0;
  for (let i = 0; i < seed.length; i++) { h = ((h << 5) - h + seed.charCodeAt(i)) | 0; }
  for (let i = out.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) & 0x7fffffff;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function generateYomiqueOptions(ex: YomiqueExercise): string[] {
  if (ex.options && ex.options.length >= 2) return ex.options;

  const answer = ex.answer;

  // For truefalse: always True/False
  if (ex.type === 'truefalse') {
    return ['True', 'False'];
  }

  // For scan/vocabulary/main_idea/inference/order: generate plausible distractors from passage
  const passageWords = ex.passage.text.split(/\s+/).filter(w => w.length > 3);
  const unique = [...new Set(passageWords.map(w => w.replace(/[^a-zA-Z]/g, '')))].filter(w => w.toLowerCase() !== answer.toLowerCase() && w.length > 2);
  const distractors = seededShuffle(unique, ex.id).slice(0, 3);

  // If answer is a longer phrase, create distractors by swapping key words
  if (answer.split(' ').length > 2) {
    const genericFalse = [
      'It is not mentioned in the text.',
      'The opposite is stated.',
      'This refers to a different section.',
    ];
    const opts = [answer, ...genericFalse.slice(0, 3)];
    return seededShuffle(opts, ex.id);
  }

  const opts = [answer, ...distractors];
  while (opts.length < 4) opts.push(`(None of the above)`);
  return seededShuffle(opts.slice(0, 4), ex.id);
}

// Use LISQUE_CHARACTERS for avatar rendering (shared cast)
const ALL_CHARS = LISQUE_CHARACTERS;

function CharAvatar({ id, size = 36 }: { id: string; size?: number }) {
  const char = ALL_CHARS[id as keyof typeof ALL_CHARS];
  const [imgFailed, setImgFailed] = useState(false);
  if (!char) return null;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      border: `2px solid ${char.color}`, overflow: 'hidden',
      backgroundColor: `${char.color}15`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {!imgFailed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={char.avatar} alt={char.name} width={size} height={size} style={{ objectFit: 'cover' }}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span style={{ fontSize: size * 0.35, fontWeight: 800, color: char.color }}>{char.name[0]}</span>
      )}
    </div>
  );
}

function DialogueLine({ line }: { line: StoryLine }) {
  if (line.speaker === 'narration') {
    return <div style={{ padding: '8px 16px', fontSize: 13, color: C.textSecondary, lineHeight: 1.8, fontStyle: 'italic', textAlign: 'center', margin: '4px 0' }}>{line.text}</div>;
  }
  const char = ALL_CHARS[line.speaker as keyof typeof ALL_CHARS];
  if (!char) return null;
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', margin: '6px 0' }}>
      <CharAvatar id={line.speaker} size={32} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: char.color, marginBottom: 2 }}>
          {char.name}
          {line.action && <span style={{ fontWeight: 400, color: C.textMuted, marginLeft: 6 }}>{line.action}</span>}
        </div>
        <div style={{ padding: '10px 14px', borderRadius: '2px 12px 12px 12px', backgroundColor: `${char.color}08`, border: `1px solid ${char.color}20`, fontSize: 14, color: C.textPrimary, lineHeight: 1.7 }}>
          {line.text}
          {line.english && <div style={{ fontSize: 12, color: C.blue, marginTop: 4, fontStyle: 'italic' }}>{line.english}</div>}
        </div>
      </div>
    </div>
  );
}

function StoryPanel({ story, title, onContinue, onSkip }: { story: YomiqueDayStory; title: string; onContinue: () => void; onSkip?: () => void }) {
  const lines = story.opening;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, padding: '24px 20px 120px' }}>
      <div style={{ maxWidth: 580, margin: '0 auto' }}>
        {/* Skip button */}
        {onSkip && (
          <div style={{ textAlign: 'right', marginBottom: 8 }}>
            <button onClick={onSkip} style={{ background: 'none', border: 'none', fontSize: 12, color: C.textMuted, cursor: 'pointer', padding: '4px 8px', textDecoration: 'underline' }}>スキップ</button>
          </div>
        )}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 10, color: C.textMuted, letterSpacing: '0.1em', marginBottom: 4 }}>{story.scene}</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: C.textPrimary }}>{title}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          {story.cast.filter(c => c !== 'narration').map(id => {
            const ch = ALL_CHARS[id as keyof typeof ALL_CHARS];
            if (!ch) return null;
            return <div key={id} style={{ textAlign: 'center' }}><CharAvatar id={id} size={40} /><div style={{ fontSize: 9, color: C.textMuted, marginTop: 3 }}>{ch.name}</div></div>;
          })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {lines.map((line, i) => <DialogueLine key={i} line={line} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button onClick={onContinue} style={{ padding: '14px 40px', borderRadius: 10, fontSize: 15, fontWeight: 700, backgroundColor: C.amber, color: '#fff', border: 'none', cursor: 'pointer', boxShadow: `0 4px 12px ${C.amber}30` }}>特訓開始</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────
export default function YomiquePage() {
  const [allDays, setAllDays] = useState<YomiqueDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<YomiqueStats>(loadStats);
  const [view, setView] = useState<'map' | 'story-open' | 'lesson' | 'story-close'>('map');
  const [selectedDay, setSelectedDay] = useState<YomiqueDay | null>(null);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    Promise.all([
      import('@/data/english/yomique/days-01-15').then(m => m.YOMIQUE_DAYS_01_15),
      import('@/data/english/yomique/days-16-18').then(m => m.YOMIQUE_DAYS_16_18),
      import('@/data/english/yomique/days-19-21').then(m => m.YOMIQUE_DAYS_19_21),
      import('@/data/english/yomique/days-22-24').then(m => m.YOMIQUE_DAYS_22_24),
      import('@/data/english/yomique/days-25-27').then(m => m.YOMIQUE_DAYS_25_27),
      import('@/data/english/yomique/days-28-30').then(m => m.YOMIQUE_DAYS_28_30),
      import('@/data/english/yomique/story').then(m => m.YOMIQUE_STORIES).catch(() => ({} as Record<number, YomiqueDayStory>)),
    ]).then(([d1, d16, d19, d22, d25, d28, st]) => {
      const days = [...d1, ...d16, ...d19, ...d22, ...d25, ...d28].sort((a, b) => a.day - b.day);
      days.forEach(d => { if (st[d.day]) d.story = st[d.day]; });
      setAllDays(days);
      setLoading(false);
    });
  }, []);

  const updateStats = useCallback((fn: (s: YomiqueStats) => YomiqueStats) => {
    setStats(prev => { const next = fn(prev); saveStats(next); return next; });
  }, []);

  const currentExercise = selectedDay?.exercises[currentExIndex] ?? null;

  const checkAnswer = useCallback(() => {
    if (!currentExercise) return;
    setShowResult(true);
    setSessionTotal(t => t + 1);
    const correct = userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase();
    if (correct) setSessionCorrect(c => c + 1);
    updateStats(s => ({ ...s, totalCompleted: s.totalCompleted + 1, totalCorrect: s.totalCorrect + (correct ? 1 : 0) }));
  }, [currentExercise, userAnswer, updateStats]);

  const nextExercise = useCallback(() => {
    if (!selectedDay) return;
    setShowTranslation(false);
    if (currentExIndex < selectedDay.exercises.length - 1) {
      setCurrentExIndex(i => i + 1); setUserAnswer(''); setShowResult(false);
    } else {
      updateStats(s => {
        const dp: YomiqueDayProgress = {
          day: selectedDay.day, started: true, completedCount: 10,
          bestScore: Math.max(sessionCorrect, s.dayProgress[selectedDay.day]?.bestScore ?? 0),
          lastVisit: new Date().toISOString(),
        };
        return { ...s, currentDay: Math.max(s.currentDay, selectedDay.day + 1), dayProgress: { ...s.dayProgress, [selectedDay.day]: dp } };
      });
      setView(selectedDay.story?.closing.length ? 'story-close' : 'map');
    }
  }, [selectedDay, currentExIndex, sessionCorrect, updateStats]);

  const startDay = useCallback((day: YomiqueDay) => {
    setSelectedDay(day);
    setCurrentExIndex(0); setUserAnswer(''); setShowResult(false); setShowTranslation(false);
    setSessionCorrect(0); setSessionTotal(0);
    setView(day.story?.opening.length ? 'story-open' : 'lesson');
    updateStats(s => ({
      ...s, dayProgress: { ...s.dayProgress, [day.day]: { ...(s.dayProgress[day.day] || { day: day.day, bestScore: 0, completedCount: 0 }), started: true, lastVisit: new Date().toISOString() } },
    }));
  }, [updateStats]);

  // Scroll to current phase on mount
  useEffect(() => {
    if (view === 'map') {
      const currentPhase = allDays.find(d => d.day === stats.currentDay)?.phase;
      if (currentPhase) {
        const el = document.getElementById(`yomique-phase-${currentPhase}`);
        if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
      }
    }
  }, [view, allDays, stats.currentDay]);

  if (loading) {
    return <div style={{ minHeight: '100vh', backgroundColor: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ textAlign: 'center' }}><div style={{ fontSize: 24, fontWeight: 900, color: C.amber }}>YomiQue</div><div style={{ fontSize: 12, color: C.textMuted, marginTop: 8 }}>Loading...</div></div></div>;
  }

  // ─── Story Opening ─────────────────────────────────────
  if (view === 'story-open' && selectedDay?.story) {
    return <StoryPanel story={selectedDay.story} title={`DAY ${selectedDay.day}: ${selectedDay.theme}`} onContinue={() => setView('lesson')} onSkip={() => setView('lesson')} />;
  }

  // ─── Story Closing ─────────────────────────────────────
  if (view === 'story-close' && selectedDay?.story) {
    const pct = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;
    return (
      <div style={{ minHeight: '100vh', backgroundColor: C.bg, padding: '40px 20px' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 12, color: C.amber, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 8 }}>DAY {selectedDay.day} COMPLETE</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: C.textPrimary, marginBottom: 20 }}>{selectedDay.theme}</div>
            <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontSize: 56, fontWeight: 900, color: pct >= 70 ? C.green : pct >= 40 ? C.gold : C.red }}>{pct}</span>
              <span style={{ fontSize: 18, color: C.textMuted }}>%</span>
            </div>
            <div style={{ fontSize: 13, color: C.textSecondary, marginTop: 4 }}>{sessionCorrect} / {sessionTotal} 正解</div>
          </div>
          {selectedDay.story.closing.length > 0 && (
            <div style={{ padding: '20px', backgroundColor: C.card, borderRadius: 16, border: `1px solid ${C.border}`, marginBottom: 24 }}>
              <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 12 }}>AFTER TRAINING</div>
              {selectedDay.story.closing.map((line, i) => <DialogueLine key={i} line={line} />)}
            </div>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => startDay(selectedDay)} style={{ padding: '12px 24px', backgroundColor: C.amber, color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>もう1回</button>
            <button onClick={() => setView('map')} style={{ padding: '12px 24px', backgroundColor: 'transparent', color: C.textSecondary, border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>マップに戻る</button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Lesson View ─────────────────────────────────────────
  if (view === 'lesson' && selectedDay && currentExercise) {
    const ex = currentExercise;
    const progress = ((currentExIndex + 1) / selectedDay.exercises.length) * 100;
    const options = generateYomiqueOptions(ex);
    const isCorrect = userAnswer.trim().toLowerCase() === ex.answer.toLowerCase();
    const phaseColor = YOMIQUE_PHASES.find(p => p.phase === selectedDay.phase)?.color || C.amber;

    const typeLabels: Record<string, string> = { scan: 'SCAN', main_idea: 'MAIN IDEA', vocabulary: 'VOCABULARY', order: 'ORDER', inference: 'INFERENCE', truefalse: 'TRUE / FALSE' };
    const typeColors: Record<string, { bg: string; fg: string }> = {
      scan: { bg: '#DBEAFE', fg: '#1D4ED8' }, main_idea: { bg: '#D1FAE5', fg: '#059669' },
      vocabulary: { bg: '#FEF3C7', fg: '#D97706' }, order: { bg: '#EDE9FE', fg: '#7C3AED' },
      inference: { bg: '#FCE7F3', fg: '#DB2777' }, truefalse: { bg: '#E0F2FE', fg: '#0284C7' },
    };
    const tc = typeColors[ex.type] || { bg: '#F3F4F6', fg: '#6B7280' };

    return (
      <div style={{ minHeight: '100vh', backgroundColor: C.bg }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: C.bg, borderBottom: `1px solid ${C.border}`, padding: '12px 20px' }}>
          <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setView('map')} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: C.textSecondary, padding: '4px 8px' }}>&#x2190;</button>
            <div style={{ flex: 1 }}><div style={{ height: 4, backgroundColor: C.border, borderRadius: 2, overflow: 'hidden' }}><div style={{ height: '100%', backgroundColor: phaseColor, borderRadius: 2, width: `${progress}%`, transition: 'width 0.3s ease' }} /></div></div>
            <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 600, minWidth: 40, textAlign: 'right' }}>{currentExIndex + 1}/{selectedDay.exercises.length}</div>
          </div>
        </div>

        <div style={{ maxWidth: 700, margin: '0 auto', padding: '24px 20px 120px' }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: phaseColor, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 4 }}>DAY {selectedDay.day} - {YOMIQUE_PHASES.find(p => p.phase === selectedDay.phase)?.label}</div>
            <div style={{ fontSize: 13, color: C.textSecondary }}>{selectedDay.theme}</div>
          </div>

          {/* Character Intro */}
          {ex.characterIntro && <div style={{ marginBottom: 16 }}><DialogueLine line={{ speaker: ex.characterIntro.speaker, text: ex.characterIntro.text, mood: ex.characterIntro.mood as StoryLine['mood'] }} /></div>}

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
            <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', backgroundColor: tc.bg, color: tc.fg }}>{typeLabels[ex.type] || ex.type.toUpperCase()}</span>
            <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, backgroundColor: ex.difficulty === 'beginner' ? '#F0FDF4' : ex.difficulty === 'growing' ? '#FFFBEB' : '#FEF2F2', color: ex.difficulty === 'beginner' ? '#16A34A' : ex.difficulty === 'growing' ? '#D97706' : '#DC2626' }}>
              {ex.difficulty === 'beginner' ? 'EASY' : ex.difficulty === 'growing' ? 'MEDIUM' : 'HARD'}
            </span>
            <span style={{ fontSize: 10, color: C.textMuted, marginLeft: 'auto' }}>{ex.passage.sourceType} / {ex.passage.wordCount} words</span>
          </div>

          {/* Reading Passage */}
          <div style={{ padding: '20px', backgroundColor: C.card, borderRadius: 12, border: `1px solid ${C.border}`, marginBottom: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: 15, color: C.textPrimary, lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>{ex.passage.text}</div>
            <button onClick={() => setShowTranslation(!showTranslation)} style={{ marginTop: 12, fontSize: 11, color: C.textMuted, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
              {showTranslation ? '日本語訳を隠す' : '日本語訳を見る'}
            </button>
            {showTranslation && <div style={{ marginTop: 8, fontSize: 13, color: C.textSecondary, lineHeight: 1.7, borderTop: `1px solid ${C.border}`, paddingTop: 10 }}>{ex.jaTranslation}</div>}
          </div>

          <div style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary, lineHeight: 1.7, marginBottom: 16 }}>{ex.question}</div>

          {/* Answer Options (all tap/choice, no text input) */}
          {!showResult && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {options.map((opt, i) => (
                  <button key={i} onClick={() => setUserAnswer(opt)} style={{
                    padding: '14px 20px', textAlign: 'left', borderRadius: 12, fontSize: 14, lineHeight: 1.6,
                    border: userAnswer === opt ? `2px solid ${phaseColor}` : `1.5px solid ${C.border}`,
                    backgroundColor: userAnswer === opt ? `${phaseColor}08` : C.card,
                    color: C.textPrimary, cursor: 'pointer', fontWeight: userAnswer === opt ? 600 : 400,
                    transition: 'all 0.15s ease', boxShadow: userAnswer === opt ? `0 2px 8px ${phaseColor}20` : 'none',
                  }}>
                    <span style={{ color: C.textMuted, fontSize: 12, fontWeight: 700, marginRight: 10 }}>{String.fromCharCode(65 + i)}</span>
                    {opt}
                  </button>
                ))}
              </div>
              <button onClick={checkAnswer} disabled={!userAnswer.trim()} style={{
                marginTop: 16, padding: '14px 32px', borderRadius: 12, fontSize: 15, fontWeight: 700, width: '100%',
                backgroundColor: userAnswer.trim() ? phaseColor : '#E5E5E5',
                color: userAnswer.trim() ? '#fff' : '#aaa', border: 'none', cursor: userAnswer.trim() ? 'pointer' : 'default',
                boxShadow: userAnswer.trim() ? `0 4px 12px ${phaseColor}30` : 'none', transition: 'all 0.2s ease',
              }}>回答する</button>
            </>
          )}

          {showResult && (
            <div style={{ marginTop: 8 }}>
              <div style={{ padding: '16px 20px', borderRadius: 12, marginBottom: 16, backgroundColor: isCorrect ? '#F0FDF4' : '#FEF2F2', border: `1px solid ${isCorrect ? '#BBF7D0' : '#FECACA'}` }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: isCorrect ? '#16A34A' : '#DC2626', marginBottom: 4 }}>{isCorrect ? '正解!' : '不正解'}</div>
                {!isCorrect && <div style={{ fontSize: 14, color: C.textPrimary }}>正解: <strong>{ex.answer}</strong></div>}
              </div>

              {ex.reaction && (
                <div style={{ marginBottom: 12 }}>
                  <DialogueLine line={{ speaker: ex.reaction.speaker, text: isCorrect ? ex.reaction.correct : ex.reaction.wrong, mood: isCorrect ? 'excited' : 'thinking' }} />
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                <div style={{ padding: '14px 16px', backgroundColor: '#FEF2F2', borderRadius: 10, borderLeft: `3px solid ${C.red}` }}>
                  <div style={{ fontSize: 11, color: C.red, fontWeight: 700, marginBottom: 4, letterSpacing: '0.05em' }}>TRAP - なぜ読み間違える？</div>
                  <div style={{ fontSize: 13, color: '#7F1D1D', lineHeight: 1.7 }}>{ex.trap}</div>
                </div>
                <div style={{ padding: '14px 16px', backgroundColor: '#F0FDF4', borderRadius: 10, borderLeft: `3px solid ${C.green}` }}>
                  <div style={{ fontSize: 11, color: C.green, fontWeight: 700, marginBottom: 4, letterSpacing: '0.05em' }}>TIP - こうやって読む</div>
                  <div style={{ fontSize: 13, color: '#14532D', lineHeight: 1.7 }}>{ex.tip}</div>
                </div>
              </div>

              <button onClick={nextExercise} style={{
                padding: '14px 32px', borderRadius: 10, fontSize: 15, fontWeight: 700, width: '100%',
                backgroundColor: phaseColor, color: '#fff', border: 'none', cursor: 'pointer', boxShadow: `0 4px 12px ${phaseColor}30`,
              }}>{currentExIndex < selectedDay.exercises.length - 1 ? '次の問題へ' : '結果を見る'}</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── Map View ────────────────────────────────────────────
  const completedDays = Object.values(stats.dayProgress).filter(d => d.completedCount >= 10).length;
  const accuracyPct = stats.totalCompleted > 0 ? Math.round((stats.totalCorrect / stats.totalCompleted) * 100) : 0;
  const isCurrent = (dayNum: number) => dayNum === stats.currentDay;

  const phaseDescriptions: Record<number, string> = {
    1: '英文を構造的に読む力の基礎を叩き込む10日間。単語ではなく「塊」で捉える訓練。',
    2: '段落レベルの文章を正確に読み解く。主旨・推論・語彙の総合力が問われる。',
    3: '契約書、メール、レポート。実際のビジネス文書を制限時間内に処理する実戦。',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg }}>
      {/* ── Hero Section ── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(160deg, #FFFBEB 0%, #FEF3C7 40%, #FAFAF9 100%)',
        borderBottom: `1px solid ${C.border}`,
        padding: '52px 20px 48px', textAlign: 'center',
      }}>
        {/* Subtle dot pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'radial-gradient(circle, #92400E 1px, transparent 1px)',
          backgroundSize: '24px 24px', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 560, margin: '0 auto' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-block', padding: '5px 16px', borderRadius: 20,
            backgroundColor: `${C.amber}12`, border: `1px solid ${C.amber}25`,
            fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: '#92400E',
            marginBottom: 16,
          }}>
            READING QUEST
          </div>

          {/* Title with accent line */}
          <div style={{ fontSize: 38, fontWeight: 900, color: C.textPrimary, marginBottom: 6, lineHeight: 1.1 }}>
            ヨミクエ
          </div>
          <div style={{
            width: 40, height: 3, borderRadius: 2,
            background: `linear-gradient(90deg, ${C.amber}, #92400E)`,
            margin: '0 auto 14px',
          }} />
          <div style={{ fontSize: 14, color: '#92400E', fontWeight: 700, marginBottom: 8 }}>
            {YOMIQUE_STORY_ARC.title}
          </div>
          <div style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.9, maxWidth: 420, margin: '0 auto' }}>
            {YOMIQUE_STORY_ARC.subtitle}
          </div>

          {/* ── Character Lineup ── */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 16, marginTop: 28,
            padding: '0 8px', flexWrap: 'wrap',
          }}>
            {Object.values(YOMIQUE_CHARACTERS).map(ch => (
              <div key={ch.id} style={{ textAlign: 'center', minWidth: 48 }}>
                <CharAvatar id={ch.id} size={44} />
                <div style={{ fontSize: 10, fontWeight: 700, color: C.textPrimary, marginTop: 4 }}>{ch.name}</div>
              </div>
            ))}
          </div>

          {/* ── Stats Dashboard ── */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 12, marginTop: 32,
          }}>
            {[
              { label: '進捗', value: `${completedDays}`, sub: '/ 30 days', color: C.amber, pct: Math.round((completedDays / 30) * 100) },
              { label: '正答率', value: accuracyPct > 0 ? `${accuracyPct}%` : '--', sub: accuracyPct > 0 ? `${stats.totalCorrect} correct` : 'no data', color: C.green, pct: accuracyPct },
              { label: '総問題数', value: `${stats.totalCompleted}`, sub: 'exercises', color: C.gold, pct: Math.min(100, Math.round((stats.totalCompleted / 300) * 100)) },
            ].map(s => (
              <div key={s.label} style={{
                flex: 1, maxWidth: 140, padding: '16px 12px 14px',
                backgroundColor: C.card, borderRadius: 14,
                border: `1px solid ${C.border}`,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: C.textMuted, marginBottom: 6, textTransform: 'uppercase' as const }}>{s.label}</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: C.textMuted, marginTop: 4 }}>{s.sub}</div>
                {/* Mini progress bar */}
                <div style={{ marginTop: 8, height: 3, backgroundColor: `${s.color}15`, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', backgroundColor: s.color, borderRadius: 2, width: `${s.pct}%`, transition: 'width 0.6s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Phase Sections & Day Grid ── */}
      <div style={{ maxWidth: 740, margin: '0 auto', padding: '36px 20px 80px' }}>
        {YOMIQUE_PHASES.map((phase) => {
          const phaseDays = allDays.filter(d => d.phase === phase.phase);
          const phaseCompleted = phaseDays.filter(d => stats.dayProgress[d.day]?.completedCount >= 10).length;
          const phaseTotal = phaseDays.length;
          const phasePct = phaseTotal > 0 ? Math.round((phaseCompleted / phaseTotal) * 100) : 0;

          return (
            <div key={phase.phase} id={`yomique-phase-${phase.phase}`} style={{ marginBottom: 44 }}>
              {/* Phase Header */}
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20,
                padding: '20px 24px', borderRadius: 16,
                background: `linear-gradient(135deg, ${phase.color}08, ${phase.color}03)`,
                border: `1px solid ${phase.color}15`,
              }}>
                {/* Phase number circle */}
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                  background: `linear-gradient(135deg, ${phase.color}, ${phase.color}CC)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 18, fontWeight: 900,
                  boxShadow: `0 4px 12px ${phase.color}30`,
                }}>
                  {phase.phase}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: C.textPrimary, marginBottom: 2 }}>
                    {phase.label}
                  </div>
                  <div style={{ fontSize: 11, color: phase.color, fontWeight: 600, letterSpacing: '0.05em', marginBottom: 6 }}>
                    {phase.labelEn} -- Day {phase.days}
                  </div>
                  <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.7 }}>
                    {phaseDescriptions[phase.phase]}
                  </div>
                </div>
                {/* Phase progress */}
                <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 60 }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: phaseCompleted === phaseTotal && phaseTotal > 0 ? C.green : phase.color }}>
                    {phaseCompleted}/{phaseTotal}
                  </div>
                  <div style={{
                    marginTop: 4, height: 4, width: 60, backgroundColor: `${phase.color}15`, borderRadius: 2, overflow: 'hidden',
                  }}>
                    <div style={{ height: '100%', backgroundColor: phaseCompleted === phaseTotal && phaseTotal > 0 ? C.green : phase.color, borderRadius: 2, width: `${phasePct}%`, transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              </div>

              {/* Day Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 12 }}>
                {phaseDays.map(day => {
                  const dp = stats.dayProgress[day.day];
                  const completed = dp?.completedCount >= 10;
                  const started = dp?.started && !completed;
                  const locked = false; // All days unlocked - learn at your own pace
                  const current = isCurrent(day.day);
                  const hasStory = !!day.story;
                  const progressPct = completed ? 100 : started ? ((dp?.completedCount ?? 0) / 10) * 100 : 0;

                  return (
                    <button key={day.day} onClick={() => !locked && startDay(day)} disabled={locked}
                      style={{
                        position: 'relative', padding: '18px 16px 16px', textAlign: 'left',
                        backgroundColor: completed ? `${phase.color}08` : current ? '#FEFEFE' : C.card,
                        border: current ? `2px solid ${phase.color}` : completed ? `1.5px solid ${phase.color}30` : `1px solid ${C.border}`,
                        borderRadius: 16, overflow: 'hidden',
                        cursor: locked ? 'not-allowed' : 'pointer',
                        opacity: locked ? 0.35 : 1,
                        transition: 'all 0.2s ease',
                        boxShadow: current ? `0 4px 20px ${phase.color}18` : completed ? `0 2px 8px ${phase.color}08` : '0 1px 4px rgba(0,0,0,0.03)',
                      }}
                      onMouseEnter={(e) => { if (!locked) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${phase.color}15`; }}}
                      onMouseLeave={(e) => { if (!locked) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = current ? `0 4px 20px ${phase.color}18` : '0 1px 4px rgba(0,0,0,0.03)'; }}}
                    >
                      {/* Progress bar at top of card */}
                      {(started || completed) && (
                        <div style={{
                          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                          backgroundColor: `${phase.color}15`,
                        }}>
                          <div style={{
                            height: '100%', backgroundColor: completed ? C.green : phase.color,
                            width: `${progressPct}%`, transition: 'width 0.4s ease',
                          }} />
                        </div>
                      )}

                      {/* Current day indicator */}
                      {current && (
                        <div style={{
                          position: 'absolute', top: 10, right: 10,
                          padding: '3px 8px', borderRadius: 6,
                          backgroundColor: phase.color, color: '#fff',
                          fontSize: 9, fontWeight: 800, letterSpacing: '0.08em',
                          boxShadow: `0 2px 8px ${phase.color}40`,
                        }}>
                          NOW
                        </div>
                      )}

                      {/* Header row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        {/* State icon */}
                        <div style={{
                          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          backgroundColor: completed ? `${C.green}12` : locked ? '#F5F5F4' : `${phase.color}08`,
                          border: `1px solid ${completed ? `${C.green}25` : locked ? '#E7E5E4' : `${phase.color}15`}`,
                        }}>
                          {completed ? (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5.5" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          ) : locked ? (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="2" y="5" width="8" height="6" rx="1.5" stroke="#A8A29E" strokeWidth="1.2"/><path d="M4 5V3.5a2 2 0 014 0V5" stroke="#A8A29E" strokeWidth="1.2" strokeLinecap="round"/></svg>
                          ) : (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polygon points="4,2 10,6 4,10" fill={phase.color} opacity="0.7"/></svg>
                          )}
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 800, color: locked ? C.textMuted : phase.color, letterSpacing: '0.06em' }}>
                          DAY {day.day}
                        </span>
                        {/* Score badge for completed/started */}
                        {completed && dp?.bestScore !== undefined && (
                          <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, color: C.green }}>
                            {dp.bestScore}/10
                          </span>
                        )}
                        {started && !current && (
                          <span style={{
                            marginLeft: 'auto', fontSize: 10, fontWeight: 700, color: C.gold,
                            padding: '2px 7px', borderRadius: 5, backgroundColor: `${C.gold}12`,
                          }}>
                            {dp?.completedCount ?? 0}/10
                          </span>
                        )}
                      </div>

                      {/* Theme text */}
                      <div style={{ fontSize: 13, fontWeight: 700, color: locked ? C.textMuted : C.textPrimary, lineHeight: 1.5, marginBottom: 3 }}>
                        {day.theme}
                      </div>
                      <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.4, marginBottom: hasStory ? 10 : 0 }}>
                        {day.themeEn}
                      </div>

                      {/* Cast avatars */}
                      {hasStory && day.story && (
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                          {day.story.cast.filter(c => c !== 'narration').slice(0, 4).map((id, i) => {
                            const ch = ALL_CHARS[id as keyof typeof ALL_CHARS];
                            return ch ? (
                              <div key={id} style={{
                                width: 22, height: 22, borderRadius: '50%',
                                border: `1.5px solid ${ch.color}`,
                                backgroundColor: `${ch.color}18`,
                                marginLeft: i === 0 ? 0 : -6,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 8, fontWeight: 800, color: ch.color,
                                zIndex: 4 - i,
                                position: 'relative',
                              }}>
                                {ch.name[0]}
                              </div>
                            ) : null;
                          })}
                          <span style={{ fontSize: 9, color: C.textMuted, marginLeft: 6 }}>STORY</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
