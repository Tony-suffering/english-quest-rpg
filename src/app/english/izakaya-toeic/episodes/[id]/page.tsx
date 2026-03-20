'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getEpisode } from '@/data/izakaya-toeic/episodes';
import { CHARACTER_MAP } from '@/data/izakaya-toeic/characters';
import { StoryLine, ToeicQuestion } from '@/data/izakaya-toeic/types';
import { recordEpisodeResult, getEpisodeResult, addVocabToDeck, getVocabDeck, VocabDeckItem } from '@/data/izakaya-toeic/progress';
import { T, parseConversation, isConversation } from '@/data/izakaya-toeic/theme';
import { THIRTY_DAY_PLAN, getCompletedDays, markDayComplete } from '@/data/izakaya-toeic/thirty-day-plan';
import EpisodeTutorial from '../EpisodeTutorial';
import BookRecommendation from '../../BookRecommendation';

type Phase = 'story' | 'quiz' | 'results';

// ── Sound FX ──
function playSound(type: 'correct' | 'wrong' | 'tap' | 'complete' | 'levelup') {
  if (typeof window === 'undefined') return;
  try {
    const ctx = new AudioContext();
    const make = (freq: number, t: number, dur: number, wave: OscillatorType = 'sine', vol = 0.12) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.value = freq; o.type = wave;
      g.gain.setValueAtTime(vol, ctx.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + t + dur);
      o.start(ctx.currentTime + t); o.stop(ctx.currentTime + t + dur);
    };
    if (type === 'correct') { make(523, 0, 0.15); make(659, 0.08, 0.15); make(784, 0.16, 0.25); }
    if (type === 'wrong') { make(200, 0, 0.2, 'sawtooth', 0.08); make(150, 0.1, 0.2, 'sawtooth', 0.06); }
    if (type === 'tap') make(800, 0, 0.04, 'sine', 0.06);
    if (type === 'complete') { make(523, 0, 0.2); make(659, 0.1, 0.2); make(784, 0.2, 0.2); make(1047, 0.3, 0.4); }
    if (type === 'levelup') { make(392, 0, 0.15); make(523, 0.1, 0.15); make(659, 0.2, 0.15); make(784, 0.3, 0.3); }
  } catch { /* */ }
}

// ── TTS ──
function speakText(text: string, gender: 'male' | 'female' = 'male', rate = 0.9) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = rate;
  const voices = window.speechSynthesis.getVoices();
  const enVoices = voices.filter(v => v.lang.startsWith('en'));
  if (gender === 'female') {
    const fem = enVoices.find(v => /female|zira|samantha/i.test(v.name));
    if (fem) utter.voice = fem;
    utter.pitch = 1.1;
  } else {
    const mal = enVoices.find(v => /male|david|daniel|google us/i.test(v.name) && !/female/i.test(v.name));
    if (mal) utter.voice = mal;
    utter.pitch = 0.95;
  }
  window.speechSynthesis.speak(utter);
}

// ── Pre-generated audio playback (OpenAI TTS) with browser TTS fallback ──
function playAudioFile(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const audio = new Audio(src);
    audio.onended = () => resolve(true);
    audio.onerror = () => resolve(false);
    audio.play().catch(() => resolve(false));
  });
}

async function playQuizAudio(episodeId: string, qIndex: number, fallbackText: string) {
  const src = `/audio/${episodeId}/q${qIndex + 1}.mp3`;
  const played = await playAudioFile(src);
  if (!played) {
    speakText(fallbackText);
  }
}

// ── Conversation Player (Memoria-style) ──
function ConversationPlayer({ script, onDone }: { script: string; onDone?: () => void }) {
  const lines = useMemo(() => parseConversation(script), [script]);
  const [currentLine, setCurrentLine] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const playingRef = useRef(false);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const playLine = useCallback((idx: number) => {
    if (idx < 0 || idx >= lines.length) return;
    setCurrentLine(idx);
    const line = lines[idx];
    speakText(line.text, line.gender);
    lineRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    const check = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        clearInterval(check);
        if (playingRef.current && idx + 1 < lines.length) {
          setTimeout(() => playLine(idx + 1), 400);
        } else if (idx + 1 >= lines.length) {
          setIsPlaying(false);
          playingRef.current = false;
          onDone?.();
        }
      }
    }, 100);
  }, [lines, onDone]);

  const handlePlayAll = useCallback(() => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      playingRef.current = false;
    } else {
      setIsPlaying(true);
      playingRef.current = true;
      playLine(0);
    }
  }, [isPlaying, playLine]);

  const handleTapLine = useCallback((idx: number) => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    playingRef.current = false;
    setCurrentLine(idx);
    speakText(lines[idx].text, lines[idx].gender);
  }, [lines]);

  useEffect(() => () => { window.speechSynthesis?.cancel(); playingRef.current = false; }, []);

  const SC = { M: '#3B82F6', W: '#EC4899', M1: '#3B82F6', M2: '#6366F1', W1: '#EC4899', W2: '#F97316' };

  return (
    <div style={{ background: T.surface, borderRadius: 12, border: `1px solid ${T.border}`, overflow: 'hidden', boxShadow: T.shadow }}>
      <div style={{ padding: '10px 16px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: T.bgSecondary }}>
        <div style={{ fontSize: 10, color: T.gold, fontWeight: 700, letterSpacing: 1 }}>LISTENING</div>
        <button onClick={handlePlayAll} style={{
          padding: '5px 14px', background: isPlaying ? T.red + '12' : T.goldBg,
          border: `1px solid ${isPlaying ? T.red + '30' : T.goldBorder}`,
          borderRadius: 6, color: isPlaying ? T.red : T.gold, fontSize: 11, fontWeight: 700, cursor: 'pointer',
        }}>
          {isPlaying ? 'STOP' : 'PLAY ALL'}
        </button>
      </div>
      <div style={{ maxHeight: 280, overflowY: 'auto', padding: '8px 0' }}>
        {lines.map((line, i) => {
          const isActive = i === currentLine;
          const color = SC[line.speaker as keyof typeof SC] || T.blue;
          return (
            <div key={i} ref={el => { lineRefs.current[i] = el; }} onClick={() => handleTapLine(i)}
              style={{
                display: 'flex', gap: 8, alignItems: 'flex-start', padding: '6px 16px',
                background: isActive ? `${color}08` : 'transparent',
                borderLeft: isActive ? `3px solid ${color}` : '3px solid transparent',
                cursor: 'pointer', transition: 'all 0.15s',
              }}>
              <div style={{ width: 20, minWidth: 20, fontSize: 10, fontWeight: 800, color, marginTop: 3, textAlign: 'center' }}>
                {line.speakerLabel === 'Man' ? 'M' : 'W'}
              </div>
              <div style={{ fontSize: 13, color: isActive ? T.text : T.textSub, lineHeight: 1.6, fontWeight: isActive ? 600 : 400 }}>
                {line.text}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ height: 2, background: T.bgSecondary }}>
        <div style={{ height: '100%', width: lines.length > 0 ? `${((currentLine + 1) / lines.length) * 100}%` : '0%', background: T.gold, transition: 'width 0.3s' }} />
      </div>
    </div>
  );
}

// ── Story Line (bilingual: Japanese + English) ──
function StoryLineView({ line, isNew, showEnglish }: { line: StoryLine; isNew: boolean; showEnglish: boolean }) {
  // Scene image (light-novel style illustration)
  const sceneImageEl = line.sceneImage ? (
    <div style={{
      maxWidth: '100%',
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 12,
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      animation: isNew ? 'izk-fadein 0.4s ease' : undefined,
    }}>
      <img
        src={`/izakaya-scenes/${line.sceneImage}`}
        alt={line.action || line.japanese}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  ) : null;

  const char = line.speaker !== 'narration' ? CHARACTER_MAP[line.speaker] : null;
  if (line.speaker === 'narration') {
    return (
      <>
        {sceneImageEl}
        <div style={{ padding: '12px 0', textAlign: 'center', animation: isNew ? 'izk-fadein 0.4s ease' : undefined }}>
          {line.action && <div style={{ fontSize: 11, color: T.textMuted, fontStyle: 'italic', marginBottom: 2 }}>{line.action}</div>}
          <div style={{ fontSize: 13, color: T.textMuted, fontStyle: 'italic' }}>{line.japanese}</div>
          {showEnglish && line.english && (
            <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2, opacity: 0.7 }}>{line.english}</div>
          )}
        </div>
      </>
    );
  }
  const color = char?.color || T.textSub;
  return (
    <>
      {sceneImageEl}
      <div style={{ display: 'flex', gap: 8, padding: '5px 0', animation: isNew ? 'izk-fadein 0.4s ease' : undefined }}>
      <img
        src={`/characters/${char?.id || 'master'}.png`}
        alt={char?.name || '?'}
        style={{
          width: 48, height: 48, borderRadius: '50%', border: `2px solid ${color}`,
          objectFit: 'cover', flexShrink: 0, marginTop: 2,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'baseline', marginBottom: 2 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color }}>{char?.name.split('\uFF08')[0]}</span>
          {line.mood && line.mood !== 'normal' && (
            <span style={{ fontSize: 9, color: T.textMuted, fontWeight: 500 }}>
              ({line.mood})
            </span>
          )}
          {line.action && <span style={{ fontSize: 10, color: T.textMuted, fontStyle: 'italic' }}>{line.action}</span>}
        </div>
        <div style={{ padding: '7px 11px', background: T.bgSecondary, borderRadius: '2px 10px 10px 10px' }}>
          <div style={{ fontSize: 14, lineHeight: 1.7, color: T.text }}>{line.japanese}</div>
          {showEnglish && line.english && (
            <div style={{ fontSize: 12, lineHeight: 1.6, color: T.gold, marginTop: 3, fontStyle: 'italic' }}>
              {line.english}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

// ── Quiz Question (NO auto-advance -- user clicks "次へ") ──
function QuizQuestion({
  question, qIndex, total, onNext, episodeId,
}: {
  question: ToeicQuestion; qIndex: number; total: number;
  onNext: (correct: boolean) => void; episodeId: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const correctIdx = question.choices.findIndex(c => c.isCorrect);
  const hasConvo = isConversation(question.audioScript);

  useEffect(() => {
    if (question.audioScript && !hasConvo) {
      const timer = setTimeout(() => playQuizAudio(episodeId, qIndex, question.audioScript!), 500);
      return () => clearTimeout(timer);
    }
  }, [question.audioScript, hasConvo, episodeId, qIndex]);

  const handleSelect = useCallback((idx: number) => {
    if (revealed) return;
    playSound('tap');
    setSelected(idx);
    setRevealed(true);
    setTimeout(() => playSound(question.choices[idx].isCorrect ? 'correct' : 'wrong'), 200);
  }, [revealed, question]);

  const isCorrect = selected !== null && question.choices[selected]?.isCorrect;
  const diffColor = question.difficulty === 'easy' ? T.green : question.difficulty === 'medium' ? T.gold : T.red;

  return (
    <div style={{ animation: 'izk-fadein 0.3s ease' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ padding: '3px 10px', background: T.goldBg, borderRadius: 4, fontSize: 12, fontWeight: 800, color: T.gold }}>
          Q{qIndex + 1} / {total}
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: diffColor, display: 'inline-block' }} />
          <span style={{ fontSize: 11, color: T.textMuted }}>{question.scoreLevel}</span>
        </div>
      </div>

      {/* Audio */}
      {question.audioScript && hasConvo ? (
        <div style={{ marginBottom: 16 }}>
          <ConversationPlayer script={question.audioScript} />
        </div>
      ) : question.audioScript ? (
        <button onClick={() => playQuizAudio(episodeId, qIndex, question.audioScript!)} style={{
          width: '100%', padding: '12px 16px', background: T.surface, borderRadius: 10,
          marginBottom: 16, textAlign: 'left', cursor: 'pointer',
          border: `1px solid ${T.border}`, borderLeftWidth: 3, borderLeftColor: T.gold,
        }}>
          <div style={{ fontSize: 10, color: T.gold, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>YOU HEAR (tap to replay)</div>
          <div style={{ fontSize: 15, color: T.text, fontWeight: 500, lineHeight: 1.6 }}>{question.audioScript}</div>
        </button>
      ) : null}

      {/* Question text */}
      {question.questionText && (
        <div style={{ padding: '10px 14px', background: T.bgSecondary, borderRadius: 8, marginBottom: 14, fontSize: 14, color: T.text, lineHeight: 1.6, border: `1px solid ${T.border}` }}>
          {question.questionText}
        </div>
      )}

      {/* Choices */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
        {question.choices.map((choice, idx) => {
          const letter = String.fromCharCode(65 + idx);
          let bg = T.surface;
          let borderC = T.border;
          let txtC = T.text;
          if (revealed) {
            if (idx === correctIdx) { bg = T.green + '08'; borderC = T.green; txtC = '#065F46'; }
            else if (idx === selected) { bg = T.red + '08'; borderC = T.red; txtC = '#991B1B'; }
            else { txtC = T.textMuted; }
          }
          return (
            <button key={idx} onClick={() => handleSelect(idx)} disabled={revealed}
              style={{
                display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', background: bg,
                border: `1.5px solid ${borderC}`, borderRadius: 8, cursor: revealed ? 'default' : 'pointer',
                textAlign: 'left', transition: 'all 0.15s',
                opacity: revealed && idx !== correctIdx && idx !== selected ? 0.4 : 1,
              }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                background: revealed && idx === correctIdx ? T.green + '15' : revealed && idx === selected ? T.red + '15' : T.bgSecondary,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11, color: txtC, flexShrink: 0,
              }}>{letter}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: txtC, lineHeight: 1.5 }}>{choice.text}</div>
                {revealed && (idx === selected || idx === correctIdx) && choice.explanation && (
                  <div style={{ marginTop: 6, fontSize: 12, color: T.textSub, lineHeight: 1.6, paddingTop: 6, borderTop: `1px solid ${T.border}` }}>
                    {choice.trapType && (
                      <span style={{ display: 'inline-block', padding: '1px 5px', background: T.red + '10', color: T.red, fontSize: 9, fontWeight: 800, borderRadius: 2, marginRight: 4, verticalAlign: 'middle' }}>
                        {choice.trapType.toUpperCase()}
                      </span>
                    )}
                    {choice.isCorrect && (
                      <span style={{ display: 'inline-block', padding: '1px 5px', background: T.green + '10', color: T.green, fontSize: 9, fontWeight: 800, borderRadius: 2, marginRight: 4, verticalAlign: 'middle' }}>
                        CORRECT
                      </span>
                    )}
                    {choice.explanation}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation + 次へ button (shown after answering) */}
      {revealed && (
        <div style={{ animation: 'izk-fadein 0.3s ease' }}>
          <div style={{
            padding: '14px 16px', background: T.surface, borderRadius: 10,
            border: `1px solid ${T.border}`, borderLeftWidth: 3,
            borderLeftColor: isCorrect ? T.green : T.red, marginBottom: 14,
          }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                background: isCorrect ? T.green + '12' : T.red + '12',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 900, color: isCorrect ? T.green : T.red,
              }}>
                {isCorrect ? 'O' : 'X'}
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: isCorrect ? T.green : T.red }}>
                {isCorrect ? 'CORRECT' : 'INCORRECT'}
              </span>
            </div>
            <div style={{ fontSize: 13, color: T.textSub, lineHeight: 1.8 }}>{question.explanation}</div>

            {/* Paraphrase map */}
            {question.paraphraseMap && question.paraphraseMap.length > 0 && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 10, color: T.gold, fontWeight: 700, marginBottom: 6 }}>PARAPHRASE MAP</div>
                {question.paraphraseMap.map((pm, i) => (
                  <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, marginBottom: 3 }}>
                    <span style={{ color: T.textMuted, background: T.bgSecondary, padding: '2px 6px', borderRadius: 3 }}>{pm.original}</span>
                    <span style={{ color: T.gold, fontWeight: 700, fontSize: 10 }}>{'>'}</span>
                    <span style={{ color: T.text, fontWeight: 600, background: T.goldBg, padding: '2px 6px', borderRadius: 3 }}>{pm.paraphrased}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Skill tip */}
            {question.skillTag && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
                <span style={{ padding: '2px 8px', background: T.goldBg, color: T.gold, fontSize: 10, fontWeight: 700, borderRadius: 3, letterSpacing: 0.5 }}>
                  SKILL: {question.skillTag}
                </span>
              </div>
            )}
          </div>

          {/* NEXT BUTTON */}
          <button
            onClick={() => onNext(isCorrect || false)}
            style={{
              width: '100%', padding: '14px 20px',
              background: T.gold,
              border: 'none', borderRadius: 10,
              color: '#fff', fontWeight: 800, fontSize: 15, cursor: 'pointer',
              boxShadow: T.shadowMd,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {qIndex + 1 < total ? (
              <>次へ <span style={{ fontSize: 12, opacity: 0.7 }}>Q{qIndex + 2}/{total}</span></>
            ) : (
              <>結果を見る</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Vocab Slot Card ──
const MASTERY_LABELS = ['NEW', 'SEEN', 'OK', 'DONE'];
const MASTERY_COLORS = [T.textMuted, T.blue, T.gold, T.green];

function VocabCard({ item, onTap }: { item: VocabDeckItem; onTap?: () => void }) {
  const mc = MASTERY_COLORS[item.masteryLevel];
  return (
    <button onClick={onTap} style={{
      display: 'flex', gap: 10, alignItems: 'center', width: '100%', padding: '10px 12px',
      background: T.surface, borderRadius: 8, border: `1px solid ${T.border}`,
      cursor: onTap ? 'pointer' : 'default', textAlign: 'left', transition: 'all 0.15s',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 8, flexShrink: 0,
        background: mc + '10', border: `1.5px solid ${mc}30`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ fontSize: 8, fontWeight: 800, color: mc, letterSpacing: 0.5 }}>{MASTERY_LABELS[item.masteryLevel]}</div>
        <div style={{ fontSize: 10, color: mc, fontWeight: 700 }}>{'*'.repeat(item.masteryLevel || 0) || '-'}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.text }}>{item.word}</div>
        <div style={{ fontSize: 12, color: T.textSub }}>{item.meaning}</div>
      </div>
      {item.partOfSpeech && (
        <span style={{ padding: '2px 6px', background: T.bgSecondary, color: T.textMuted, fontSize: 9, fontWeight: 600, borderRadius: 3, flexShrink: 0 }}>
          {item.partOfSpeech}
        </span>
      )}
    </button>
  );
}


// ── Main ──
export default function EpisodeDetailPage() {
  const params = useParams();
  const episodeId = params.id as string;
  const episode = getEpisode(episodeId);

  // 30-day program lock check
  const dayPlan = useMemo(() => THIRTY_DAY_PLAN.find(d => d.episodeId === episodeId), [episodeId]);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  useEffect(() => { setCompletedDays(getCompletedDays()); }, []);
  const isUnlocked = !dayPlan || dayPlan.day === 1 || completedDays.includes(dayPlan.day - 1);

  // Next day info for results CTA
  const nextDayPlan = useMemo(() => {
    if (!dayPlan) return undefined;
    return THIRTY_DAY_PLAN.find(d => d.day === dayPlan.day + 1);
  }, [dayPlan]);
  const nextDayEpisode = useMemo(() => {
    if (!nextDayPlan) return undefined;
    return getEpisode(nextDayPlan.episodeId);
  }, [nextDayPlan]);

  const [phase, setPhase] = useState<Phase>('story');
  const [visibleLines, setVisibleLines] = useState(5);
  const [quizIndex, setQuizIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [savedVocab, setSavedVocab] = useState<Set<string>>(new Set());
  const [showEnglish, setShowEnglish] = useState(true);
  const [expandedQ, setExpandedQ] = useState<number | null>(null);
  const storyEndRef = useRef<HTMLDivElement>(null);

  // Vocab save modal state
  const [showVocabModal, setShowVocabModal] = useState(false);
  const [vocabWord, setVocabWord] = useState('');
  const [vocabMeaning, setVocabMeaning] = useState('');
  const [vocabType, setVocabType] = useState('word');
  const [vocabExample, setVocabExample] = useState('');

  // Story player state
  const [storyCurrentLine, setStoryCurrentLine] = useState(-1);
  const [storyPlaying, setStoryPlaying] = useState(false);
  const [storySpeed, setStorySpeed] = useState(() => {
    if (typeof window === 'undefined') return 0.9;
    try { return parseFloat(localStorage.getItem('izakaya_tts_speed') || '0.9'); } catch { return 0.9; }
  });
  const storyPlayingRef = useRef(false);
  const storyAudioRef = useRef<HTMLAudioElement | null>(null);
  const storyLineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const storyListRef = useRef<HTMLDivElement>(null);

  // Voice selector state (Memoria-style)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [maleVoice, setMaleVoice] = useState<string>('');
  const [femaleVoice, setFemaleVoice] = useState<string>('');
  const [savedPhrases, setSavedPhrases] = useState<Set<string>>(new Set());

  // Initialize savedPhrases from vocab deck on mount
  useEffect(() => {
    const deck = getVocabDeck();
    const existing = new Set(deck.map(d => d.word));
    if (existing.size > 0) setSavedPhrases(existing);
  }, []);

  // Line mode (sequential / shuffle / repeat-one)
  type LineMode = 'sequential' | 'shuffle' | 'repeat-one';
  const [lineMode, setLineMode] = useState<LineMode>('sequential');
  const lineModeRef = useRef<LineMode>('sequential');
  useEffect(() => { lineModeRef.current = lineMode; }, [lineMode]);

  // Progress bar state
  const [storyProgress, setStoryProgress] = useState(0);
  const storyProgressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startStoryProgress = () => {
    setStoryProgress(0);
    let elapsed = 0;
    if (storyProgressRef.current) clearInterval(storyProgressRef.current);
    storyProgressRef.current = setInterval(() => {
      elapsed += 50;
      setStoryProgress(Math.min((elapsed / 3000) * 100, 100));
    }, 50);
  };
  const stopStoryProgress = () => {
    if (storyProgressRef.current) {
      clearInterval(storyProgressRef.current);
      storyProgressRef.current = null;
    }
  };

  // Voice loading (Memoria-style)
  const loadVoices = useCallback(() => {
    const allVoices = window.speechSynthesis.getVoices();
    const enVoices = allVoices.filter(v => v.lang.startsWith('en'));
    setVoices(enVoices);
    if (enVoices.length > 0) {
      setMaleVoice(prev => {
        if (prev) return prev;
        const def = enVoices.find(v => /male|david|daniel|google us/i.test(v.name) && !/female/i.test(v.name)) || enVoices[0];
        return def.name;
      });
      setFemaleVoice(prev => {
        if (prev) return prev;
        const def = enVoices.find(v => /female|zira|samantha/i.test(v.name)) || enVoices[1] || enVoices[0];
        return def.name;
      });
    }
  }, []);

  const getVoiceByName = useCallback((name: string) => {
    const allVoices = window.speechSynthesis.getVoices();
    const selected = allVoices.find(v => v.name === name);
    if (selected) return selected;
    const enVoices = allVoices.filter(v => v.lang.startsWith('en'));
    if (enVoices.length > 0) {
      return enVoices.find(v => v.name.includes('Google US English')) || enVoices[0];
    }
    return allVoices.find(v => v.lang.includes('en')) || null;
  }, []);

  // Load voices on mount
  useEffect(() => {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, [loadVoices]);

  const cycleLineMode = () => {
    const modes: LineMode[] = ['sequential', 'shuffle', 'repeat-one'];
    const currentIdx = modes.indexOf(lineMode);
    const nextMode = modes[(currentIdx + 1) % modes.length];
    setLineMode(nextMode);
    lineModeRef.current = nextMode;
  };

  const getNextStoryIndex = useCallback((currentIdx: number) => {
    if (!episode) return -1;
    const total = episode.story.length;
    const mode = lineModeRef.current;
    if (mode === 'repeat-one') return currentIdx;
    if (mode === 'shuffle') {
      let next = Math.floor(Math.random() * total);
      if (total > 1) while (next === currentIdx) next = Math.floor(Math.random() * total);
      return next;
    }
    return currentIdx + 1 < total ? currentIdx + 1 : -1;
  }, [episode]);

  const toggleSavePhrase = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPhrases(prev => {
      const next = new Set(prev);
      if (next.has(text)) next.delete(text); else next.add(text);
      return next;
    });
  };

  const openStoryVocabModal = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setVocabExample(text);
    setVocabWord('');
    setVocabMeaning('');
    setVocabType('word');
    setShowVocabModal(true);
  };

  const stopStoryAudio = useCallback(() => {
    if (storyAudioRef.current) {
      storyAudioRef.current.pause();
      storyAudioRef.current = null;
    }
    window.speechSynthesis?.cancel();
  }, []);

  // Returns a promise that resolves when playback ends (true=audio, false=TTS fallback used)
  const speakStoryLine = useCallback((line: StoryLine, rate: number, lineIndex: number): Promise<void> => {
    stopStoryAudio();
    const txt = line.english || line.japanese;
    if (!txt) return Promise.resolve();

    // Try pre-generated MP3 first
    const padded = String(lineIndex + 1).padStart(3, '0');
    const src = `/audio/${episodeId}/story-${padded}.mp3`;

    return new Promise<void>((resolve) => {
      const audio = new Audio(src);
      storyAudioRef.current = audio;
      audio.playbackRate = rate;
      audio.onended = () => { storyAudioRef.current = null; resolve(); };
      audio.onerror = () => {
        // Fallback to browser TTS
        storyAudioRef.current = null;
        if (typeof window === 'undefined' || !window.speechSynthesis) { resolve(); return; }
        const utterance = new SpeechSynthesisUtterance(txt);
        const isFemale = line.speaker !== 'narration' && /female|lisa|mina|yuki/i.test(line.speaker);
        const voiceName = isFemale ? femaleVoice : maleVoice;
        const voice = getVoiceByName(voiceName);
        if (voice) utterance.voice = voice;
        utterance.lang = 'en-US';
        utterance.rate = rate;
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        window.speechSynthesis.speak(utterance);
      };
      audio.play().catch(() => {
        audio.onerror?.(new Event('error'));
      });
    });
  }, [episodeId, maleVoice, femaleVoice, getVoiceByName, stopStoryAudio]);

  const playStoryLine = useCallback((idx: number) => {
    if (!episode || idx < 0 || idx >= episode.story.length) {
      setStoryPlaying(false);
      storyPlayingRef.current = false;
      stopStoryProgress();
      return;
    }
    setStoryCurrentLine(idx);
    const line = episode.story[idx];
    startStoryProgress();

    speakStoryLine(line, storySpeed, idx).then(() => {
      stopStoryProgress();
      setStoryProgress(100);
      if (storyPlayingRef.current) {
        const nextIdx = getNextStoryIndex(idx);
        if (nextIdx >= 0) {
          setTimeout(() => playStoryLine(nextIdx), 400);
        } else {
          setStoryPlaying(false);
          storyPlayingRef.current = false;
        }
      }
    });
  }, [episode, storySpeed, speakStoryLine, getNextStoryIndex]);

  const playStoryPrevious = useCallback(() => {
    if (!episode) return;
    stopStoryAudio();
    stopStoryProgress();
    const prev = storyCurrentLine <= 0 ? episode.story.length - 1 : storyCurrentLine - 1;
    setStoryCurrentLine(prev);
    speakStoryLine(episode.story[prev], storySpeed, prev);
    startStoryProgress();
  }, [episode, storyCurrentLine, storySpeed, speakStoryLine, stopStoryAudio]);

  const playStoryNext = useCallback(() => {
    if (!episode) return;
    stopStoryAudio();
    stopStoryProgress();
    const next = storyCurrentLine + 1 >= episode.story.length ? 0 : storyCurrentLine + 1;
    setStoryCurrentLine(next);
    speakStoryLine(episode.story[next], storySpeed, next);
    startStoryProgress();
  }, [episode, storyCurrentLine, storySpeed, speakStoryLine, stopStoryAudio]);

  const toggleStoryPlay = useCallback(() => {
    if (storyPlaying) {
      stopStoryAudio();
      setStoryPlaying(false);
      storyPlayingRef.current = false;
      stopStoryProgress();
    } else {
      setStoryPlaying(true);
      storyPlayingRef.current = true;
      const startIdx = storyCurrentLine < 0 ? 0 : storyCurrentLine;
      playStoryLine(startIdx);
    }
  }, [storyPlaying, storyCurrentLine, playStoryLine]);

  // Cleanup TTS on unmount or phase change
  useEffect(() => {
    return () => { stopStoryAudio(); storyPlayingRef.current = false; stopStoryProgress(); };
  }, [phase]);

  const previousBest = useMemo(() => episodeId ? getEpisodeResult(episodeId) : undefined, [episodeId]);

  useEffect(() => {
    // no auto-scroll
  }, [visibleLines, phase]);

  // Auto-save all vocab to deck on results + mark day complete
  useEffect(() => {
    if (phase === 'results' && episode) {
      episode.vocabHighlights.forEach(v => {
        addVocabToDeck(v.word, v.meaning, episode.id, episode.title, v.example, v.partOfSpeech);
      });
      setSavedVocab(new Set(episode.vocabHighlights.map(v => v.word)));
      if (dayPlan) {
        markDayComplete(dayPlan.day);
        setCompletedDays(getCompletedDays());
      }
    }
  }, [phase, episode, dayPlan]);

  const handleShowMore = useCallback(() => {
    if (!episode) return;
    playSound('tap');
    setVisibleLines(prev => Math.min(prev + 6, episode.story.length));
  }, [episode]);

  const handleStartQuiz = useCallback(() => {
    window.speechSynthesis?.cancel();
    setStoryPlaying(false); storyPlayingRef.current = false;
    setPhase('quiz'); setQuizIndex(0); setResults([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNext = useCallback((correct: boolean) => {
    const nr = [...results, correct];
    setResults(nr);
    if (!episode) return;
    if (quizIndex + 1 < episode.questions.length) {
      setQuizIndex(p => p + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      recordEpisodeResult(episode.id, nr.filter(Boolean).length, episode.questions.length);
      playSound('complete');
      setPhase('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [quizIndex, episode, results]);

  const handleRestart = useCallback(() => {
    window.speechSynthesis?.cancel();
    setPhase('story'); setVisibleLines(5); setQuizIndex(0); setResults([]);
    setExpandedQ(null);
    setStoryCurrentLine(-1); setStoryPlaying(false); storyPlayingRef.current = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!episode) {
    return (
      <div style={{ minHeight: '100vh', background: T.bg, color: T.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Episode not found</div>
          <Link href="/english/izakaya-toeic" style={{ color: T.gold, textDecoration: 'none' }}>back</Link>
        </div>
      </div>
    );
  }

  // Lock screen for locked episodes
  if (!isUnlocked && dayPlan) {
    const prevDayPlan = THIRTY_DAY_PLAN.find(d => d.day === dayPlan.day - 1);
    const prevEpisodeId = prevDayPlan?.episodeId;
    return (
      <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
        {/* Header */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 20, padding: '10px 16px',
          background: 'rgba(250,250,249,0.92)', backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${T.border}`,
        }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <Link href="/english/izakaya-toeic" style={{ fontSize: 11, color: T.textMuted, textDecoration: 'none' }}>
              {'<'} 居酒屋TOEIC
            </Link>
          </div>
        </div>

        <div style={{ maxWidth: 640, margin: '0 auto', padding: '80px 16px', textAlign: 'center' }}>
          {/* Lock Icon */}
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: T.goldBg, border: `2px solid ${T.goldBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: T.gold, letterSpacing: 2 }}>LOCK</span>
          </div>

          <h1 style={{
            fontSize: 24, fontWeight: 900, color: T.text,
            margin: '0 0 8px', letterSpacing: -0.5,
          }}>
            LOCKED
          </h1>

          <p style={{
            fontSize: 14, color: T.textSub, margin: '0 0 8px', lineHeight: 1.6,
          }}>
            DAY {dayPlan?.day || episode.number} -- {episode.title}
          </p>

          <p style={{
            fontSize: 15, color: T.textSub, margin: '0 0 32px', lineHeight: 1.8,
          }}>
            Day {dayPlan.day - 1} をクリアすると解放されます
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320, margin: '0 auto' }}>
            {prevEpisodeId && (
              <Link href={`/english/izakaya-toeic/episodes/${prevEpisodeId}`} style={{
                display: 'block', padding: '14px 24px',
                background: T.gold, color: '#fff', borderRadius: 10,
                fontWeight: 800, fontSize: 15, textDecoration: 'none',
                boxShadow: `0 4px 20px ${T.gold}40`,
                textAlign: 'center',
              }}>
                Day {dayPlan.day - 1} に挑戦する
              </Link>
            )}
            <Link href="/english/izakaya-toeic/program" style={{
              display: 'block', padding: '12px 24px',
              background: T.surface, color: T.textSub,
              border: `1px solid ${T.border}`, borderRadius: 10,
              fontWeight: 700, fontSize: 14, textDecoration: 'none',
              textAlign: 'center',
            }}>
              プログラムに戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const correctCount = results.filter(Boolean).length;
  const totalQ = episode.questions.length;
  const accuracy = totalQ > 0 ? correctCount / totalQ : 0;
  const vocabDeck = typeof window !== 'undefined' ? getVocabDeck().filter(d => d.sourceEpisode === episode.id) : [];

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
            <div style={{ display: 'flex', gap: 5 }}>
              {(['story', 'quiz', 'results'] as Phase[]).map(p => (
                <div key={p} style={{
                  width: phase === p ? 16 : 6, height: 5, borderRadius: 3,
                  background: phase === p ? T.gold : T.border, transition: 'all 0.3s',
                }} />
              ))}
            </div>
          </div>
          <div style={{ marginTop: 4, display: 'flex', gap: 8, alignItems: 'baseline' }}>
            <span style={{ fontSize: 10, color: T.gold, fontWeight: 700, letterSpacing: 1 }}>DAY {dayPlan?.day || episode.number}</span>
            <span style={{ fontSize: 14, fontWeight: 700 }}>{episode.title}</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '16px 16px 60px' }}>

        {/* STORY -- Memoria-style conversation player */}
        {phase === 'story' && (() => {
          const storyLines = episode.story;
          const totalLines = storyLines.length;
          const activeLine = storyCurrentLine >= 0 ? storyLines[storyCurrentLine] : null;
          const activeChar = activeLine && activeLine.speaker !== 'narration' ? CHARACTER_MAP[activeLine.speaker] : null;
          const activeColor = activeChar?.color || T.textMuted;

          return (
          <div>
            {/* Hero image */}
            {episode.id === 'ep-001' && (
              <div style={{
                margin: '-16px -16px 16px', overflow: 'hidden',
                position: 'relative',
              }}>
                <img
                  src="/izakaya-scenes/ep-001/hero.webp"
                  alt={episode.title}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                  padding: '40px 20px 16px',
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: T.gold, letterSpacing: 2, marginBottom: 4 }}>
                    EPISODE 1
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', lineHeight: 1.3 }}>
                    {episode.title}
                  </div>
                </div>
              </div>
            )}

            {/* Guide banner */}
            <div style={{
              padding: '12px 14px', background: T.goldBg, borderRadius: 10,
              border: `1px solid ${T.goldBorder}`, marginBottom: 14, lineHeight: 1.7,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.gold, letterSpacing: 1, marginBottom: 4 }}>HOW TO USE</div>
              <div style={{ fontSize: 12, color: T.textSub }}>
                1. ストーリーを聴いて内容を理解する<br/>
                2. 覚えたい表現は「トレーニングに追加」で保存<br/>
                3. 聴き終わったら下の「TOEIC問題に挑戦」へ
              </div>
            </div>

            {/* Tags row */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{ padding: '3px 8px', background: T.goldBg, color: T.gold, fontSize: 10, fontWeight: 700, borderRadius: 3 }}>
                {episode.subtitle}
              </span>
              <span style={{ padding: '3px 8px', background: T.bgSecondary, color: T.textMuted, fontSize: 10, fontWeight: 600, borderRadius: 3 }}>
                {episode.targetScoreRange[0]}-{episode.targetScoreRange[1]}
              </span>
              {previousBest && (
                <span style={{ padding: '3px 8px', background: T.green + '08', color: T.green, fontSize: 10, fontWeight: 700, borderRadius: 3 }}>
                  BEST: {previousBest.correctCount}/{previousBest.totalQuestions}
                </span>
              )}
            </div>

            <h2 style={{ fontSize: 11, fontWeight: 600, color: T.textMuted, textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 16 }}>
              Story Conversation
            </h2>

            {/* Current Line Display */}
            <div style={{ backgroundColor: T.bgSecondary, borderRadius: 12, padding: 20, marginBottom: 24 }}>
              {activeLine ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: activeColor, textTransform: 'uppercase' as const, letterSpacing: 1 }}>
                      {activeLine.speaker !== 'narration' ? (
                        <img
                          src={`/characters/${activeChar?.id || 'master'}.png`}
                          alt={activeChar?.name || '?'}
                          style={{
                            width: 40, height: 40, borderRadius: '50%', border: `2px solid ${activeColor}`,
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <div style={{
                          width: 20, height: 20, borderRadius: '50%', backgroundColor: T.textMuted,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 9, fontWeight: 700, color: '#fff',
                        }}>N</div>
                      )}
                      {activeLine.speaker === 'narration' ? 'Narration' : activeChar?.name.split('\uFF08')[0]}
                    </div>
                    {activeLine.english && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (savedPhrases.has(activeLine.english!)) {
                            setSavedPhrases(prev => { const n = new Set(prev); n.delete(activeLine.english!); return n; });
                          } else {
                            addVocabToDeck(activeLine.english!, activeLine.japanese, episode.id, episode.title, '', 'expression');
                            setSavedPhrases(prev => new Set(prev).add(activeLine.english!));
                            playSound('correct');
                          }
                        }}
                        style={{
                          background: savedPhrases.has(activeLine.english!) ? T.green + '12' : T.goldBg,
                          border: `1px solid ${savedPhrases.has(activeLine.english!) ? T.green + '40' : T.goldBorder}`,
                          cursor: 'pointer', padding: '5px 12px', borderRadius: 6,
                          fontSize: 11, fontWeight: 700,
                          color: savedPhrases.has(activeLine.english!) ? T.green : T.gold,
                        }}
                      >
                        {savedPhrases.has(activeLine.english!) ? '追加済み' : '仕込み帳に追加'}
                      </button>
                    )}
                  </div>
                  {activeLine.action && (
                    <div style={{ fontSize: 12, color: T.textMuted, fontStyle: 'italic', marginBottom: 6 }}>{activeLine.action}</div>
                  )}
                  <div style={{ fontSize: 15, color: T.text, lineHeight: 1.6, minHeight: 48 }}>
                    {activeLine.japanese}
                  </div>
                  {activeLine.english && (
                    <div style={{
                      fontSize: 14, color: T.textMuted, lineHeight: 1.6,
                      marginTop: 12, paddingTop: 12,
                      borderTop: `1px solid ${T.border}`,
                    }}>
                      {activeLine.english}
                    </div>
                  )}
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '16px 0', color: T.textMuted, fontSize: 14, minHeight: 48 }}>
                  Select a line to play
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ height: 4, backgroundColor: T.border, borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${storyProgress}%`, backgroundColor: T.gold, transition: 'width 0.05s linear' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: T.textMuted }}>
                <span>{storyCurrentLine >= 0 ? storyCurrentLine + 1 : 0} / {totalLines}</span>
                <span>{storySpeed.toFixed(2)}x</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, marginBottom: 32 }}>
              {/* Shuffle Button */}
              <button
                onClick={cycleLineMode}
                style={{ background: 'none', border: 'none', color: lineMode === 'shuffle' ? T.gold : T.textMuted, cursor: 'pointer', padding: 8 }}
                title={lineMode === 'sequential' ? 'Sequential' : lineMode === 'shuffle' ? 'Shuffle' : 'Repeat One'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
                </svg>
              </button>

              <button onClick={playStoryPrevious} style={{ background: 'none', border: 'none', color: T.text, cursor: 'pointer', padding: 8 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              <button
                onClick={toggleStoryPlay}
                style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: T.gold, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {storyPlaying ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#000">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#000" style={{ marginLeft: 3 }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <button onClick={playStoryNext} style={{ background: 'none', border: 'none', color: T.text, cursor: 'pointer', padding: 8 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>

              {/* Repeat Button */}
              <button
                onClick={cycleLineMode}
                style={{ background: 'none', border: 'none', color: lineMode === 'repeat-one' ? T.gold : T.textMuted, cursor: 'pointer', padding: 8, position: 'relative' as const }}
                title={lineMode === 'repeat-one' ? 'Repeat One' : 'Repeat Off'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
                </svg>
                {lineMode === 'repeat-one' && <span style={{ position: 'absolute' as const, fontSize: 9, fontWeight: 'bold', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: T.gold }}>1</span>}
              </button>
            </div>

            {/* Speed Control */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
              <span style={{ fontSize: 12, color: T.textMuted, minWidth: 32 }}>0.5x</span>
              <input
                type="range" min="0.5" max="1.5" step="0.05"
                value={storySpeed}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setStorySpeed(v);
                  try { localStorage.setItem('izakaya_tts_speed', String(v)); } catch {}
                }}
                style={{ width: 150, accentColor: T.gold }}
              />
              <span style={{ fontSize: 12, color: T.textMuted, minWidth: 32 }}>1.5x</span>
              <span style={{ fontSize: 14, color: T.gold, fontWeight: 600, minWidth: 45, textAlign: 'center' }}>{storySpeed.toFixed(2)}x</span>
            </div>

            {/* Voice Selectors */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginBottom: 32, flexWrap: 'wrap' as const }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: '#FF69B4' }}>Female:</span>
                <select
                  value={femaleVoice}
                  onChange={(e) => setFemaleVoice(e.target.value)}
                  style={{
                    backgroundColor: T.bgSecondary, color: T.text,
                    border: `1px solid ${T.border}`, borderRadius: 8,
                    padding: '6px 10px', fontSize: 11, cursor: 'pointer', minWidth: 140,
                  }}
                >
                  {voices.map((v) => (
                    <option key={v.name} value={v.name}>{v.name.replace('Microsoft ', '').replace(' Online (Natural)', '')}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: '#4A9EFF' }}>Male:</span>
                <select
                  value={maleVoice}
                  onChange={(e) => setMaleVoice(e.target.value)}
                  style={{
                    backgroundColor: T.bgSecondary, color: T.text,
                    border: `1px solid ${T.border}`, borderRadius: 8,
                    padding: '6px 10px', fontSize: 11, cursor: 'pointer', minWidth: 140,
                  }}
                >
                  {voices.map((v) => (
                    <option key={v.name} value={v.name}>{v.name.replace('Microsoft ', '').replace(' Online (Natural)', '')}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* EN Toggle */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <button onClick={() => setShowEnglish(p => !p)} style={{
                padding: '6px 14px', background: showEnglish ? T.goldBg : 'transparent',
                border: `1px solid ${showEnglish ? T.goldBorder : T.border}`,
                borderRadius: 6, fontSize: 11, fontWeight: 700,
                color: showEnglish ? T.gold : T.textMuted, cursor: 'pointer',
              }}>
                {showEnglish ? 'EN ON' : 'EN OFF'}
              </button>
            </div>

            {/* Conversation Lines List */}
            <h3 style={{ fontSize: 11, fontWeight: 600, color: T.textMuted, textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 16 }}>
              Lines ({totalLines})
            </h3>
            <div ref={storyListRef} style={{ display: 'flex', flexDirection: 'column' as const, gap: 2 }}>
              {storyLines.map((line, i) => {
                const isActive = i === storyCurrentLine;
                const char = line.speaker !== 'narration' ? CHARACTER_MAP[line.speaker] : null;
                const color = char?.color || T.textMuted;
                const isNarration = line.speaker === 'narration';

                const handleLineClick = () => {
                  stopStoryAudio();
                  stopStoryProgress();
                  setStoryPlaying(false);
                  storyPlayingRef.current = false;
                  setStoryCurrentLine(i);
                  speakStoryLine(line, storySpeed, i);
                  startStoryProgress();
                };

                return (
                  <div key={i} ref={el => { storyLineRefs.current[i] = el; }}>
                    {line.sceneImage && (
                      <div style={{
                        margin: '12px 0', borderRadius: 12, overflow: 'hidden',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                      }}>
                        <img
                          src={`/izakaya-scenes/${line.sceneImage}`}
                          alt={line.action || line.japanese}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </div>
                    )}
                    <div
                      onClick={handleLineClick}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 16,
                        padding: '12px 16px',
                        backgroundColor: isActive ? T.bgSecondary : 'transparent',
                        borderRadius: 8, cursor: 'pointer',
                      }}
                    >
                    <div style={{ width: 24, textAlign: 'center', fontSize: 13, color: isActive ? T.gold : T.textMuted }}>
                      {isActive && storyPlaying ? '\u266B' : i + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color, marginBottom: 4, textTransform: 'uppercase' as const }}>
                        {isNarration ? (
                          <div style={{
                            width: 16, height: 16, borderRadius: '50%', backgroundColor: T.textMuted,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 8, fontWeight: 700, color: '#fff', flexShrink: 0,
                          }}>N</div>
                        ) : (
                          <img
                            src={`/characters/${char?.id || 'master'}.png`}
                            alt={char?.name || '?'}
                            style={{
                              width: 36, height: 36, borderRadius: '50%', border: `1.5px solid ${color}`,
                              objectFit: 'cover', flexShrink: 0,
                            }}
                          />
                        )}
                        {isNarration ? 'Narration' : char?.name.split('\uFF08')[0]}
                      </div>
                      <div style={{
                        fontSize: 14, color: isActive ? T.gold : T.text, lineHeight: 1.5,
                        fontStyle: isNarration ? 'italic' : 'normal',
                      }}>
                        {line.japanese}
                      </div>
                      {showEnglish && line.english && (
                        <div style={{
                          fontSize: 13, color: T.textMuted, lineHeight: 1.5,
                          marginTop: 4, paddingLeft: 8,
                          borderLeft: `2px solid ${T.border}`,
                        }}>
                          {line.english}
                        </div>
                      )}
                    </div>
                    {line.english && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (savedPhrases.has(line.english!)) {
                            setSavedPhrases(prev => { const n = new Set(prev); n.delete(line.english!); return n; });
                          } else {
                            addVocabToDeck(line.english!, line.japanese, episode.id, episode.title, '', 'expression');
                            setSavedPhrases(prev => new Set(prev).add(line.english!));
                            playSound('correct');
                          }
                        }}
                        style={{
                          background: savedPhrases.has(line.english!) ? T.green + '12' : 'none',
                          border: `1px solid ${savedPhrases.has(line.english!) ? T.green + '40' : T.border}`,
                          cursor: 'pointer', padding: '4px 8px', borderRadius: 5,
                          fontSize: 10, fontWeight: 700, flexShrink: 0,
                          color: savedPhrases.has(line.english!) ? T.green : T.textMuted,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {savedPhrases.has(line.english!) ? '追加済み' : '+仕込み帳'}
                      </button>
                    )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Start Quiz button */}
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <button onClick={handleStartQuiz} style={{
                padding: '14px 36px', background: T.gold, border: 'none', borderRadius: 10,
                color: '#fff', fontWeight: 800, fontSize: 15, cursor: 'pointer',
                boxShadow: T.shadowMd, transition: 'all 0.2s',
              }}>
                TOEIC問題に挑戦 ({totalQ}問)
              </button>
            </div>
          </div>
          );
        })()}

        {/* QUIZ */}
        {phase === 'quiz' && (
          <div>
            {quizIndex === 0 && (
              <div style={{
                textAlign: 'center', marginBottom: 20, padding: '14px 18px',
                background: T.surface, borderRadius: 10,
                border: `1px solid ${T.border}`, borderLeftWidth: 3, borderLeftColor: T.gold,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 4 }}>
                  <img src="/characters/master.png" alt="マスター" style={{
                    width: 28, height: 28, borderRadius: '50%', border: '2px solid #78716C', objectFit: 'cover',
                  }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.textMuted }}>マスター</span>
                </div>
                <p style={{ fontSize: 13, color: T.textSub, margin: 0, lineHeight: 1.7 }}>
                  「さて、ここからがTOEICの時間だ。さっきの話を思い出しながら解け。」
                </p>
              </div>
            )}

            <div style={{ height: 3, background: T.bgSecondary, borderRadius: 2, marginBottom: 16, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${((quizIndex + (results.length > quizIndex ? 1 : 0)) / totalQ) * 100}%`,
                background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})`, transition: 'width 0.4s',
              }} />
            </div>

            <QuizQuestion
              key={episode.questions[quizIndex].id}
              question={episode.questions[quizIndex]}
              qIndex={quizIndex}
              total={totalQ}
              onNext={handleNext}
              episodeId={episode.id}
            />
          </div>
        )}

        {/* RESULTS */}
        {phase === 'results' && (
          <div style={{ animation: 'izk-fadein 0.5s ease' }}>
            {/* Score */}
            <div style={{
              textAlign: 'center', padding: '28px 20px',
              background: T.surface, borderRadius: 14, marginBottom: 14,
              border: `1.5px solid ${accuracy >= 0.8 ? T.goldBorder : T.border}`,
              boxShadow: accuracy === 1 ? T.goldGlow : T.shadow,
            }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: accuracy >= 0.8 ? T.gold : accuracy >= 0.6 ? T.green : T.red }}>
                {correctCount}/{totalQ}
              </div>
              <div style={{ fontSize: 14, color: T.textSub, marginTop: 4, lineHeight: 1.6 }}>
                {accuracy === 1 ? '完璧。マスターも認める実力だ。'
                  : accuracy >= 0.8 ? 'いい線いってる。あと少しだ。'
                    : accuracy >= 0.6 ? '悪くない。間違えた問題を復習しろ。'
                      : 'まだまだだ。解説をよく読んで出直してこい。'}
              </div>
              {previousBest && previousBest.correctCount < correctCount && (
                <div style={{ marginTop: 8, padding: '4px 12px', background: T.goldBg, borderRadius: 4, display: 'inline-block' }}>
                  <span style={{ fontSize: 11, color: T.gold, fontWeight: 700 }}>
                    NEW BEST! (前回: {previousBest.correctCount}/{previousBest.totalQuestions})
                  </span>
                </div>
              )}
            </div>

            {/* Master tip */}
            <div style={{
              padding: '16px 18px', background: T.surface, borderRadius: 12,
              border: `1px solid ${T.border}`, borderLeftWidth: 3, borderLeftColor: T.gold, marginBottom: 14,
              boxShadow: T.shadow,
            }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
                <img src="/characters/master.png" alt="マスター" style={{
                  width: 24, height: 24, borderRadius: '50%', border: '1.5px solid #78716C', objectFit: 'cover',
                }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: T.gold, letterSpacing: 1 }}>MASTER'S TIP</span>
              </div>
              <p style={{ fontSize: 14, color: T.text, lineHeight: 1.8, margin: 0, fontWeight: 500 }}>
                {episode.masterTip.japanese}
              </p>
              {episode.masterTip.english && (
                <p style={{ fontSize: 12, color: T.textMuted, margin: '6px 0 0', fontStyle: 'italic', lineHeight: 1.6 }}>
                  {episode.masterTip.english}
                </p>
              )}
            </div>

            {/* Detailed Review (expandable) */}
            <div style={{
              padding: '16px 18px', background: T.surface, borderRadius: 12,
              border: `1px solid ${T.border}`, marginBottom: 14, boxShadow: T.shadow,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: 1, marginBottom: 10 }}>REVIEW (tap to expand)</div>
              {episode.questions.map((q, i) => {
                const isOpen = expandedQ === i;
                const correct = results[i];
                const correctChoice = q.choices.find(c => c.isCorrect);
                return (
                  <div key={q.id} style={{ marginBottom: 6 }}>
                    <button onClick={() => { setExpandedQ(isOpen ? null : i); playSound('tap'); }}
                      style={{
                        display: 'flex', gap: 8, alignItems: 'center', width: '100%', padding: '8px 10px',
                        background: isOpen ? (correct ? T.green + '05' : T.red + '05') : T.bgSecondary,
                        borderRadius: isOpen ? '8px 8px 0 0' : 8, border: 'none', cursor: 'pointer', textAlign: 'left',
                        transition: 'all 0.15s',
                      }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%',
                        background: correct ? T.green + '12' : T.red + '12',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 800, color: correct ? T.green : T.red, flexShrink: 0,
                      }}>
                        {correct ? 'O' : 'X'}
                      </div>
                      <div style={{ flex: 1, fontSize: 12, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>
                        Q{i + 1}. {q.questionText || q.audioScript?.split('\n')[0]?.replace(/^[MW]\d?:\s*/, '') || ''}
                      </div>
                      <span style={{ fontSize: 10, color: T.textMuted, flexShrink: 0 }}>{isOpen ? 'v' : '>'}</span>
                    </button>
                    {isOpen && (
                      <div style={{
                        padding: '10px 12px', background: T.bgSecondary,
                        borderRadius: '0 0 8px 8px', animation: 'izk-fadein 0.2s ease',
                      }}>
                        {/* Answer */}
                        <div style={{ fontSize: 12, color: T.textSub, marginBottom: 6 }}>
                          <span style={{ fontWeight: 700, color: T.green }}>A: {correctChoice?.text}</span>
                        </div>
                        {/* Explanation */}
                        <div style={{ fontSize: 12, color: T.textSub, lineHeight: 1.7, marginBottom: 6 }}>
                          {q.explanation}
                        </div>
                        {/* Paraphrase */}
                        {q.paraphraseMap && q.paraphraseMap.length > 0 && (
                          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {q.paraphraseMap.map((pm, pi) => (
                              <span key={pi} style={{ fontSize: 10, padding: '2px 6px', background: T.goldBg, color: T.gold, borderRadius: 3, fontWeight: 600 }}>
                                {pm.original} {'>'} {pm.paraphrased}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Vocab cards */}
            {episode.vocabHighlights.length > 0 && (
              <div style={{
                padding: '16px 18px', background: T.surface, borderRadius: 12,
                border: `1px solid ${T.border}`, marginBottom: 14, boxShadow: T.shadow,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: T.gold, letterSpacing: 1 }}>
                    VOCABULARY ({episode.vocabHighlights.length})
                  </div>
                  <span style={{ fontSize: 10, color: T.green, fontWeight: 600 }}>auto-saved to deck</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {vocabDeck.map((item, i) => (
                    <VocabCard key={i} item={item} onTap={() => speakText(item.word)} />
                  ))}
                </div>
              </div>
            )}

            {/* Book recommendations */}
            <BookRecommendation skill={episode.targetSkill} limit={2} context="episode" />

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={handleRestart} style={{
                  flex: 1, padding: '12px 16px', background: T.surface, border: `1px solid ${T.border}`,
                  borderRadius: 8, color: T.textSub, fontWeight: 600, fontSize: 13, cursor: 'pointer',
                }}>もう一度</button>
                {nextDayPlan && nextDayEpisode && (
                  <Link href={`/english/izakaya-toeic/episodes/${nextDayEpisode.id}`} style={{
                    flex: 1, padding: '12px 16px', background: T.gold, borderRadius: 8,
                    color: '#fff', fontWeight: 800, fontSize: 13, textDecoration: 'none', textAlign: 'center',
                  }}>次: DAY {nextDayPlan.day}</Link>
                )}
              </div>

              {/* Training page link */}
              <Link href="/english/training" style={{
                display: 'flex', gap: 10, alignItems: 'center', width: '100%',
                padding: '14px 16px', background: T.surface, borderRadius: 10,
                border: `1px solid ${T.green}20`, textDecoration: 'none', color: T.text,
                boxShadow: T.shadow,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, background: T.greenBg, border: `1.5px solid ${T.green}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 900, color: T.green, flexShrink: 0,
                }}>T</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>TOEIC単語トレーニング</div>
                  <div style={{ fontSize: 11, color: T.textMuted }}>保存した語彙をトレーニングで復習</div>
                </div>
                <span style={{ fontSize: 12, color: T.green, fontWeight: 700 }}>{'>'}</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── Vocab Save Modal ── */}
      {showVocabModal && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: 20,
          }}
          onClick={() => setShowVocabModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: T.surface, borderRadius: 16, padding: 24,
              width: '100%', maxWidth: 420, border: `1px solid ${T.border}`,
              boxShadow: T.shadowMd,
            }}
          >
            <div style={{ fontSize: 11, color: T.gold, fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>
              SAVE TO TRAINING DECK
            </div>
            <div style={{
              fontSize: 13, color: T.textSub, marginBottom: 16, padding: 12,
              background: T.bgSecondary, borderRadius: 8, lineHeight: 1.6,
              borderLeft: `3px solid ${T.gold}`,
            }}>
              {vocabExample}
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 11, color: T.textMuted, marginBottom: 4 }}>Word / Phrase *</label>
              <input
                type="text" value={vocabWord} onChange={(e) => setVocabWord(e.target.value)}
                placeholder="e.g. get the hang of" autoFocus
                style={{
                  width: '100%', padding: 10, borderRadius: 8,
                  border: `1px solid ${T.border}`, background: T.bg, color: T.text,
                  fontSize: 14, boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 11, color: T.textMuted, marginBottom: 4 }}>Type</label>
              <select
                value={vocabType} onChange={(e) => setVocabType(e.target.value)}
                style={{
                  width: '100%', padding: 8, borderRadius: 8,
                  border: `1px solid ${T.border}`, background: T.bg, color: T.text, fontSize: 13,
                }}
              >
                <option value="word">word</option>
                <option value="phrasal verb">phrasal verb</option>
                <option value="idiom">idiom</option>
                <option value="slang">slang</option>
                <option value="collocation">collocation</option>
                <option value="expression">expression</option>
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11, color: T.textMuted, marginBottom: 4 }}>Meaning *</label>
              <input
                type="text" value={vocabMeaning} onChange={(e) => setVocabMeaning(e.target.value)}
                placeholder="意味を入力..."
                style={{
                  width: '100%', padding: 10, borderRadius: 8,
                  border: `1px solid ${T.border}`, background: T.bg, color: T.text,
                  fontSize: 14, boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setShowVocabModal(false)}
                style={{
                  flex: 1, padding: 10, borderRadius: 8,
                  border: `1px solid ${T.border}`, background: 'transparent',
                  color: T.textMuted, fontSize: 13, cursor: 'pointer',
                }}
              >Cancel</button>
              <button
                onClick={() => {
                  if (!vocabWord.trim() || !vocabMeaning.trim()) return;
                  addVocabToDeck(vocabWord.trim(), vocabMeaning.trim(), episode.id, episode.title, vocabExample, vocabType);
                  setSavedVocab(prev => new Set(prev).add(vocabWord.trim()));
                  setShowVocabModal(false);
                  playSound('correct');
                }}
                disabled={!vocabWord.trim() || !vocabMeaning.trim()}
                style={{
                  flex: 1, padding: 10, borderRadius: 8, border: 'none',
                  background: (vocabWord.trim() && vocabMeaning.trim()) ? T.gold : T.bgSecondary,
                  color: (vocabWord.trim() && vocabMeaning.trim()) ? '#fff' : T.textMuted,
                  fontWeight: 700, fontSize: 13,
                  cursor: (vocabWord.trim() && vocabMeaning.trim()) ? 'pointer' : 'default',
                }}
              >Save</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes izk-fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes izk-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
        @keyframes izk-shake { 0% { transform: translateX(-1px); } 50% { transform: translateX(1px); } 100% { transform: translateX(-1px); } }
      `}</style>
      <EpisodeTutorial />
    </div>
  );
}
