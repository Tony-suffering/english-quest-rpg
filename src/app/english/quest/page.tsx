'use client';

import { useState, useEffect, useMemo } from 'react';
import { getStage, getStageInfo, STAGE_INFO, type QuestPhrase } from '@/data/quest-phrases';
import { ELEMENT_COLORS, ELEMENT_LABELS } from '@/data/english/elements';
import { addQuestPhraseToTraining, isInTraining } from '@/lib/local-store';

// ── Progress ───────────────────────────────────────────
const PROGRESS_KEY = 'quest-progress';

interface QuestState {
  stage: number;
  index: number; // current position in stage
  caught: Record<string, boolean>; // phraseId → caught
}

function loadState(): QuestState {
  if (typeof window === 'undefined') return { stage: 1, index: 0, caught: {} };
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { stage: 1, index: 0, caught: {} };
}

function saveState(state: QuestState) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(state));
}

// ── Component ──────────────────────────────────────────
export default function QuestPage() {
  const [state, setState] = useState<QuestState>({ stage: 1, index: 0, caught: {} });
  const [showCatchEffect, setShowCatchEffect] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showStageSelect, setShowStageSelect] = useState(false);

  useEffect(() => {
    const saved = loadState();
    // Check URL for ?stage=N
    const params = new URLSearchParams(window.location.search);
    const urlStage = params.get('stage');
    if (urlStage) {
      const s = parseInt(urlStage, 10);
      if (s >= 1 && s <= 10) {
        saved.stage = s;
        saved.index = 0;
      }
    }
    setState(saved);
    saveState(saved);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const stageCards = useMemo(() => getStage(state.stage), [state.stage]);
  const stageInfo = getStageInfo(state.stage);
  const currentCard = stageCards[state.index] || null;
  const isCaught = currentCard ? (state.caught[currentCard.id] || isInTraining(currentCard.id)) : false;
  const caughtInStage = stageCards.filter(c => state.caught[c.id] || isInTraining(c.id)).length;

  const update = (partial: Partial<QuestState>) => {
    setState(prev => {
      const next = { ...prev, ...partial };
      saveState(next);
      return next;
    });
  };

  const goTo = (index: number) => {
    if (index >= 0 && index < stageCards.length) {
      update({ index });
    }
  };

  const changeStage = (stage: number) => {
    update({ stage, index: 0 });
    setShowStageSelect(false);
  };

  const catchPhrase = () => {
    if (!currentCard || isCaught) return;
    addQuestPhraseToTraining({
      id: currentCard.id,
      english: currentCard.english,
      japanese: currentCard.japanese,
      element: currentCard.element,
    });
    setState(prev => {
      const next = { ...prev, caught: { ...prev.caught, [currentCard.id]: true } };
      saveState(next);
      return next;
    });
    setShowCatchEffect(true);
    setTimeout(() => setShowCatchEffect(false), 1200);
  };

  if (!currentCard) return null;

  const elemColor = ELEMENT_COLORS[currentCard.element] || '#78716C';
  const progressPct = ((state.index + 1) / stageCards.length) * 100;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', position: 'relative' }}>

      {/* Top bar */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #E7E5E4',
        padding: '12px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button onClick={() => setShowStageSelect(!showStageSelect)}
          style={{
            background: 'none', border: '1px solid #E7E5E4', borderRadius: 8,
            padding: '6px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 700,
            color: '#D4AF37', display: 'flex', alignItems: 'center', gap: 6,
          }}>
          STAGE {state.stage}
          <span style={{ fontSize: 10, color: '#A8A29E' }}>
            {stageInfo?.titleJa || ''}
          </span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, color: '#A8A29E' }}>
            {caughtInStage}/{stageCards.length} GET
          </span>
          <span style={{ fontSize: 14, fontWeight: 800, color: '#1C1917' }}>
            {state.index + 1}/{stageCards.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: '#E7E5E4' }}>
        <div style={{
          height: '100%', background: '#D4AF37',
          width: `${progressPct}%`, transition: 'width 0.3s ease',
        }} />
      </div>

      {/* Stage select dropdown */}
      {showStageSelect && (
        <div style={{
          position: 'absolute', top: 52, left: 20, right: 20, zIndex: 100,
          background: '#fff', borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          border: '1px solid #E7E5E4', padding: 12,
        }}>
          {STAGE_INFO.map(s => {
            const hasCards = getStage(s.stage).length > 1;
            const isActive = s.stage === state.stage;
            return (
              <button key={s.stage}
                onClick={() => hasCards && changeStage(s.stage)}
                disabled={!hasCards}
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: 10,
                  background: isActive ? 'rgba(212,175,55,0.08)' : 'transparent',
                  border: 'none', cursor: hasCards ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
                  opacity: hasCards ? 1 : 0.3,
                }}>
                <span style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: isActive ? '#D4AF37' : '#F5F5F4',
                  color: isActive ? '#fff' : '#78716C',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700,
                }}>
                  {s.stage}
                </span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1C1917' }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: 11, color: '#A8A29E' }}>{s.titleJa}</div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Main content area */}
      <div style={{
        maxWidth: 560, margin: '0 auto',
        padding: isMobile ? '16px 16px 120px' : '24px 20px 120px',
      }}>

        {/* Stage intro (only on first card) */}
        {state.index === 0 && stageInfo && (
          <div style={{
            marginBottom: 20, padding: '20px', borderRadius: 16,
            background: 'linear-gradient(135deg, #FFFBEB, #fff)',
            border: '1px solid rgba(212,175,55,0.2)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.12em', marginBottom: 8 }}>
              STAGE {state.stage} -- {stageInfo.title}
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#1C1917', marginBottom: 10, lineHeight: 1.5 }}>
              {stageInfo.hack}
            </div>
            <div style={{ fontSize: 13, color: '#78716C', lineHeight: 1.8 }}>
              {stageInfo.hackDetail}
            </div>
          </div>
        )}

        {/* The phrase card */}
        <div style={{
          background: '#fff', borderRadius: 20, overflow: 'hidden',
          border: isCaught ? '2px solid #10B981' : '1px solid #E7E5E4',
          boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          position: 'relative',
        }}>
          {/* Caught badge */}
          {isCaught && (
            <div style={{
              position: 'absolute', top: 14, right: 14,
              background: '#10B981', color: '#fff',
              padding: '3px 10px', borderRadius: 8,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
            }}>
              GET!
            </div>
          )}

          {/* Element bar */}
          <div style={{
            padding: '12px 20px',
            borderBottom: '1px solid #F5F5F4',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              width: 10, height: 10, borderRadius: '50%', background: elemColor,
            }} />
            <span style={{ fontSize: 12, color: elemColor, fontWeight: 600 }}>
              {ELEMENT_LABELS[currentCard.element]}
            </span>
            <span style={{ fontSize: 11, color: '#D6D3D1', marginLeft: 'auto' }}>
              #{state.index + 1}
            </span>
          </div>

          {/* English phrase -- big and clear */}
          <div style={{
            padding: isMobile ? '28px 20px' : '36px 28px',
            textAlign: 'center',
            borderBottom: '1px solid #F5F5F4',
          }}>
            <div style={{
              fontSize: isMobile ? 24 : 30, fontWeight: 700, color: '#1C1917',
              lineHeight: 1.4, letterSpacing: '-0.02em',
            }}>
              {currentCard.english}
            </div>
            <div style={{
              fontSize: isMobile ? 16 : 18, fontWeight: 500, color: '#78716C',
              marginTop: 12,
            }}>
              {currentCard.japanese}
            </div>
          </div>

          {/* Explanation -- always visible, this is the core */}
          <div style={{ padding: isMobile ? '20px 16px' : '24px 24px' }}>
            {/* Hack connection */}
            {currentCard.hack && (
              <div style={{
                padding: '10px 14px', borderRadius: 10, marginBottom: 16,
                background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.12)',
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.1em', marginBottom: 4 }}>
                  HACK CONNECTION
                </div>
                <div style={{ fontSize: 13, color: '#92400E', fontWeight: 500, lineHeight: 1.6 }}>
                  {currentCard.hack}
                </div>
              </div>
            )}

            {/* Main explanation */}
            <div style={{
              fontSize: 14, color: '#44403C', lineHeight: 2,
              marginBottom: 16,
            }}>
              {currentCard.explanation}
            </div>

            {/* Example conversation */}
            <div style={{
              padding: '14px 16px', borderRadius: 12,
              background: '#FAFAF9', border: '1px solid #F5F5F4',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#A8A29E', letterSpacing: '0.1em', marginBottom: 8 }}>
                EXAMPLE
              </div>
              <div style={{ fontSize: 13, color: '#44403C', lineHeight: 1.8, marginBottom: 6 }}>
                {currentCard.example}
              </div>
              <div style={{ fontSize: 12, color: '#A8A29E', lineHeight: 1.7 }}>
                {currentCard.exampleJa}
              </div>
            </div>
          </div>

          {/* GET button */}
          <div style={{ padding: '0 16px 20px' }}>
            {isCaught ? (
              <div style={{
                width: '100%', padding: 14, borderRadius: 14, textAlign: 'center',
                background: '#F0FDF4', border: '1px solid #BBF7D0',
                color: '#16A34A', fontSize: 14, fontWeight: 700,
              }}>
                Training に追加済み -- GET!
              </div>
            ) : (
              <button onClick={catchPhrase}
                style={{
                  width: '100%', padding: 14, borderRadius: 14,
                  background: '#D4AF37', border: 'none',
                  color: '#fff', fontSize: 16, fontWeight: 800, cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(212,175,55,0.3)',
                  letterSpacing: '0.08em',
                  transition: 'all 0.15s ease',
                }}>
                GET!
              </button>
            )}
          </div>
        </div>

        {/* Mini map -- dots showing progress through stage */}
        <div style={{
          marginTop: 20, padding: '12px 16px', borderRadius: 12,
          background: '#fff', border: '1px solid #E7E5E4',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
            {stageCards.map((card, i) => {
              const caught = state.caught[card.id] || isInTraining(card.id);
              const isHere = i === state.index;
              return (
                <div key={card.id}
                  onClick={() => goTo(i)}
                  style={{
                    width: isHere ? 14 : 8, height: 8, borderRadius: 4,
                    background: isHere ? '#D4AF37' : caught ? '#10B981' : '#E7E5E4',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation bar (fixed bottom) */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: '#fff', borderTop: '1px solid #E7E5E4',
        padding: '12px 20px', paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 50,
      }}>
        <button onClick={() => goTo(state.index - 1)}
          disabled={state.index === 0}
          style={{
            padding: '10px 24px', borderRadius: 10,
            background: state.index === 0 ? '#FAFAF9' : '#fff',
            border: `1px solid ${state.index === 0 ? '#F5F5F4' : '#E7E5E4'}`,
            color: state.index === 0 ? '#D6D3D1' : '#57534E',
            fontSize: 14, fontWeight: 600, cursor: state.index === 0 ? 'default' : 'pointer',
          }}>
          Back
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#1C1917' }}>
            {state.index + 1}
          </div>
          <div style={{ fontSize: 10, color: '#A8A29E' }}>
            / {stageCards.length}
          </div>
        </div>

        <button onClick={() => goTo(state.index + 1)}
          disabled={state.index >= stageCards.length - 1}
          style={{
            padding: '10px 24px', borderRadius: 10,
            background: state.index >= stageCards.length - 1 ? '#FAFAF9' : '#D4AF37',
            border: 'none',
            color: state.index >= stageCards.length - 1 ? '#D6D3D1' : '#fff',
            fontSize: 14, fontWeight: 700,
            cursor: state.index >= stageCards.length - 1 ? 'default' : 'pointer',
            boxShadow: state.index < stageCards.length - 1 ? '0 2px 8px rgba(212,175,55,0.2)' : 'none',
          }}>
          Next
        </button>
      </div>

      {/* Catch effect overlay */}
      {showCatchEffect && (
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            fontSize: isMobile ? 48 : 64, fontWeight: 900, color: '#10B981',
            textShadow: '0 0 40px rgba(16,185,129,0.4)',
            animation: 'catchPop 1.2s cubic-bezier(0.34,1.56,0.64,1) forwards',
          }}>
            GET!
          </div>
        </div>
      )}

      <style>{`
        @keyframes catchPop {
          0% { opacity: 0; transform: scale(0.3); }
          30% { opacity: 1; transform: scale(1.2); }
          60% { transform: scale(1); }
          100% { opacity: 0; transform: scale(1) translateY(-30px); }
        }
      `}</style>
    </div>
  );
}
