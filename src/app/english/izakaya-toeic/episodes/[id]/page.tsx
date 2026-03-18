'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getEpisode, getNextEpisode } from '@/data/izakaya-toeic/episodes';
import { CHARACTER_MAP } from '@/data/izakaya-toeic/characters';
import { StoryLine, ToeicQuestion } from '@/data/izakaya-toeic/types';
import { recordEpisodeResult, getEpisodeResult, addVocabToDeck, getVocabDeck, updateVocabMastery, VocabDeckItem } from '@/data/izakaya-toeic/progress';
import { T, parseConversation, isConversation } from '@/data/izakaya-toeic/theme';

type Phase = 'story' | 'quiz' | 'results';

// ── Sound FX ──
function playSound(type: 'correct' | 'wrong' | 'tap' | 'complete' | 'levelup' | 'slot-spin' | 'slot-stop') {
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
    if (type === 'slot-spin') { for (let i = 0; i < 6; i++) make(300 + i * 80, i * 0.05, 0.06, 'square', 0.04); }
    if (type === 'slot-stop') make(600, 0, 0.08, 'triangle', 0.08);
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
  const char = line.speaker !== 'narration' ? CHARACTER_MAP[line.speaker] : null;
  if (line.speaker === 'narration') {
    return (
      <div style={{ padding: '12px 0', textAlign: 'center', animation: isNew ? 'izk-fadein 0.4s ease' : undefined }}>
        {line.action && <div style={{ fontSize: 11, color: T.textMuted, fontStyle: 'italic', marginBottom: 2 }}>{line.action}</div>}
        <div style={{ fontSize: 13, color: T.textMuted, fontStyle: 'italic' }}>{line.japanese}</div>
        {showEnglish && line.english && (
          <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2, opacity: 0.7 }}>{line.english}</div>
        )}
      </div>
    );
  }
  const color = char?.color || T.textSub;
  return (
    <div style={{ display: 'flex', gap: 8, padding: '5px 0', animation: isNew ? 'izk-fadein 0.4s ease' : undefined }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%', background: color + '12', border: `2px solid ${color}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 900, fontSize: 10, color, flexShrink: 0, marginTop: 2,
      }}>
        {char?.initial || '?'}
      </div>
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
  );
}

// ── Quiz Question (NO auto-advance -- user clicks "次へ") ──
function QuizQuestion({
  question, qIndex, total, onNext,
}: {
  question: ToeicQuestion; qIndex: number; total: number;
  onNext: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const correctIdx = question.choices.findIndex(c => c.isCorrect);
  const hasConvo = isConversation(question.audioScript);

  useEffect(() => {
    if (question.audioScript && !hasConvo) {
      const timer = setTimeout(() => speakText(question.audioScript!), 500);
      return () => clearTimeout(timer);
    }
  }, [question.audioScript, hasConvo]);

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
        <button onClick={() => speakText(question.audioScript!)} style={{
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

// ── Vocab Slot Review Mini-Game ──
function VocabSlotReview({ deck, onComplete }: { deck: VocabDeckItem[]; onComplete: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [spinText, setSpinText] = useState('');
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });

  const current = deck[currentIdx];
  if (!current) return null;

  const handleSpin = () => {
    playSound('slot-spin');
    setSpinning(true);
    setShowMeaning(false);

    // Slot-style text flicker
    let count = 0;
    const interval = setInterval(() => {
      const randomWord = deck[Math.floor(Math.random() * deck.length)];
      setSpinText(randomWord.meaning);
      count++;
      if (count > 8) {
        clearInterval(interval);
        setSpinText(current.meaning);
        setSpinning(false);
        setShowMeaning(true);
        playSound('slot-stop');
      }
    }, 80);
  };

  const handleJudge = (correct: boolean) => {
    updateVocabMastery(current.word, correct);
    playSound(correct ? 'correct' : 'wrong');
    setStats(s => ({ correct: s.correct + (correct ? 1 : 0), wrong: s.wrong + (correct ? 0 : 1) }));

    if (currentIdx + 1 < deck.length) {
      setTimeout(() => {
        setCurrentIdx(p => p + 1);
        setShowMeaning(false);
        setSpinText('');
      }, 400);
    } else {
      setTimeout(() => {
        playSound('complete');
        onComplete();
      }, 400);
    }
  };

  const progress = ((currentIdx + (showMeaning ? 1 : 0)) / deck.length) * 100;

  return (
    <div style={{ animation: 'izk-fadein 0.3s ease' }}>
      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 10, color: T.gold, fontWeight: 700, letterSpacing: 1 }}>
          SLOT REVIEW {currentIdx + 1}/{deck.length}
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 11, color: T.green, fontWeight: 700 }}>O:{stats.correct}</span>
          <span style={{ fontSize: 11, color: T.red, fontWeight: 700 }}>X:{stats.wrong}</span>
        </div>
      </div>
      <div style={{ height: 3, background: T.bgSecondary, borderRadius: 2, marginBottom: 16, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})`, transition: 'width 0.4s' }} />
      </div>

      {/* Card */}
      <div style={{
        padding: '24px 20px', background: T.surface, borderRadius: 14,
        border: `1.5px solid ${T.goldBorder}`, textAlign: 'center',
        boxShadow: T.shadowMd, marginBottom: 14,
        minHeight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* English word */}
        <div style={{ fontSize: 24, fontWeight: 900, color: T.text, marginBottom: 4 }}>{current.word}</div>
        {current.partOfSpeech && (
          <span style={{ padding: '2px 8px', background: T.goldBg, color: T.gold, fontSize: 10, fontWeight: 700, borderRadius: 3, marginBottom: 12 }}>
            {current.partOfSpeech}
          </span>
        )}

        {/* Meaning area */}
        {!showMeaning && !spinning ? (
          <button onClick={handleSpin} style={{
            marginTop: 12, padding: '12px 32px',
            background: `linear-gradient(135deg, ${T.gold}, #B8941F)`,
            border: 'none', borderRadius: 8, color: '#fff', fontWeight: 800, fontSize: 14,
            cursor: 'pointer', boxShadow: T.shadowMd,
            animation: 'izk-pulse 2s infinite',
          }}>
            SPIN
          </button>
        ) : spinning ? (
          <div style={{
            marginTop: 12, fontSize: 18, fontWeight: 700, color: T.gold,
            minHeight: 30, display: 'flex', alignItems: 'center',
            animation: 'izk-shake 0.1s infinite',
          }}>
            {spinText}
          </div>
        ) : (
          <div style={{ marginTop: 12, animation: 'izk-fadein 0.3s ease' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: T.gold, marginBottom: 4 }}>{current.meaning}</div>
            {current.example && (
              <div style={{ fontSize: 12, color: T.textMuted, fontStyle: 'italic', marginTop: 8, lineHeight: 1.6 }}>
                "{current.example}"
              </div>
            )}
          </div>
        )}

        {/* Source episode */}
        <div style={{ marginTop: 14, fontSize: 10, color: T.textMuted }}>
          from: {current.sourceEpisodeTitle}
        </div>
      </div>

      {/* Judge buttons */}
      {showMeaning && (
        <div style={{ display: 'flex', gap: 8, animation: 'izk-fadein 0.2s ease' }}>
          <button onClick={() => handleJudge(false)} style={{
            flex: 1, padding: '12px', background: T.red + '08', border: `1.5px solid ${T.red}30`,
            borderRadius: 8, color: T.red, fontWeight: 800, fontSize: 14, cursor: 'pointer',
          }}>
            X 知らなかった
          </button>
          <button onClick={() => handleJudge(true)} style={{
            flex: 1, padding: '12px', background: T.green + '08', border: `1.5px solid ${T.green}30`,
            borderRadius: 8, color: T.green, fontWeight: 800, fontSize: 14, cursor: 'pointer',
          }}>
            O 知ってた
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main ──
export default function EpisodeDetailPage() {
  const params = useParams();
  const episodeId = params.id as string;
  const episode = getEpisode(episodeId);
  const nextEp = episodeId ? getNextEpisode(episodeId) : undefined;

  const [phase, setPhase] = useState<Phase>('story');
  const [visibleLines, setVisibleLines] = useState(5);
  const [quizIndex, setQuizIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [savedVocab, setSavedVocab] = useState<Set<string>>(new Set());
  const [showSlotReview, setShowSlotReview] = useState(false);
  const [showEnglish, setShowEnglish] = useState(true);
  const [expandedQ, setExpandedQ] = useState<number | null>(null);
  const storyEndRef = useRef<HTMLDivElement>(null);

  // Story player state
  const [storyCurrentLine, setStoryCurrentLine] = useState(-1);
  const [storyPlaying, setStoryPlaying] = useState(false);
  const [storySpeed, setStorySpeed] = useState(() => {
    if (typeof window === 'undefined') return 0.9;
    try { return parseFloat(localStorage.getItem('izakaya_tts_speed') || '0.9'); } catch { return 0.9; }
  });
  const storyPlayingRef = useRef(false);
  const storyLineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const storyListRef = useRef<HTMLDivElement>(null);

  const playStoryLine = useCallback((idx: number) => {
    if (!episode || idx < 0 || idx >= episode.story.length) {
      setStoryPlaying(false);
      storyPlayingRef.current = false;
      return;
    }
    setStoryCurrentLine(idx);
    const line = episode.story[idx];
    const txt = line.english || line.japanese;
    const gender = line.speaker !== 'narration' && CHARACTER_MAP[line.speaker]
      ? (/female|lisa|mina|yuki/i.test(line.speaker) ? 'female' : 'male')
      : 'male';
    speakText(txt, gender as 'male' | 'female', storySpeed);
    storyLineRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    const check = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        clearInterval(check);
        if (storyPlayingRef.current && idx + 1 < episode.story.length) {
          setTimeout(() => playStoryLine(idx + 1), 500);
        } else if (idx + 1 >= episode.story.length) {
          setStoryPlaying(false);
          storyPlayingRef.current = false;
        }
      }
    }, 100);
  }, [episode, storySpeed]);

  // Cleanup TTS on unmount or phase change
  useEffect(() => {
    return () => { window.speechSynthesis?.cancel(); storyPlayingRef.current = false; };
  }, [phase]);

  const previousBest = useMemo(() => episodeId ? getEpisodeResult(episodeId) : undefined, [episodeId]);

  useEffect(() => {
    if (phase === 'story') storyEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [visibleLines, phase]);

  // Auto-save all vocab to deck on results
  useEffect(() => {
    if (phase === 'results' && episode) {
      episode.vocabHighlights.forEach(v => {
        addVocabToDeck(v.word, v.meaning, episode.id, episode.title, v.example, v.partOfSpeech);
      });
      setSavedVocab(new Set(episode.vocabHighlights.map(v => v.word)));
    }
  }, [phase, episode]);

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
    setShowSlotReview(false); setExpandedQ(null);
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
            <span style={{ fontSize: 10, color: T.gold, fontWeight: 700, letterSpacing: 1 }}>EP.{episode.number}</span>
            <span style={{ fontSize: 14, fontWeight: 700 }}>{episode.title}</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '16px 16px 60px' }}>

        {/* STORY -- Memoria-style conversation player */}
        {phase === 'story' && (() => {
          const storyLines = episode.story;
          const totalLines = storyLines.length;

          // Player state is managed via component-level state:
          // - storyCurrentLine: active line index (-1 = none)
          // - storyPlaying: auto-play in progress
          // - storySpeed: TTS speed (0.5-1.5)
          // These are declared above in the main component body.

          return (
          <div>
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

            {/* Compact controls bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
              background: T.surface, borderRadius: 10, border: `1px solid ${T.border}`,
              marginBottom: 12, boxShadow: T.shadow,
            }}>
              {/* Play / Pause */}
              <button
                onClick={() => {
                  if (storyPlaying) {
                    window.speechSynthesis?.cancel();
                    setStoryPlaying(false);
                    storyPlayingRef.current = false;
                  } else {
                    setStoryPlaying(true);
                    storyPlayingRef.current = true;
                    const startIdx = storyCurrentLine < 0 ? 0 : storyCurrentLine;
                    playStoryLine(startIdx);
                  }
                }}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: storyPlaying ? T.red + '12' : T.goldBg,
                  border: `1.5px solid ${storyPlaying ? T.red + '40' : T.goldBorder}`,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 900,
                  color: storyPlaying ? T.red : T.gold, flexShrink: 0,
                }}
              >
                {storyPlaying ? 'II' : '|>'}
              </button>
              {/* Progress bar */}
              <div style={{ flex: 1, height: 3, background: T.bgSecondary, borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: totalLines > 0 ? `${((storyCurrentLine + 1) / totalLines) * 100}%` : '0%',
                  background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})`,
                  transition: 'width 0.3s', borderRadius: 2,
                }} />
              </div>
              {/* Speed */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: T.textMuted }}>{storySpeed.toFixed(1)}x</span>
                <input
                  type="range" min="0.5" max="1.5" step="0.1"
                  value={storySpeed}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setStorySpeed(v);
                    try { localStorage.setItem('izakaya_tts_speed', String(v)); } catch {}
                  }}
                  style={{ width: 50, accentColor: T.gold, height: 3, cursor: 'pointer' }}
                />
              </div>
              {/* EN toggle */}
              <button onClick={() => setShowEnglish(p => !p)} style={{
                padding: '3px 8px', background: showEnglish ? T.goldBg : 'transparent',
                border: `1px solid ${showEnglish ? T.goldBorder : T.border}`,
                borderRadius: 4, fontSize: 9, fontWeight: 700,
                color: showEnglish ? T.gold : T.textMuted, cursor: 'pointer', flexShrink: 0,
              }}>
                {showEnglish ? 'EN' : 'EN'}
              </button>
              {/* Counter */}
              <span style={{ fontSize: 9, color: T.textMuted, fontWeight: 600, flexShrink: 0 }}>
                {storyCurrentLine >= 0 ? storyCurrentLine + 1 : 0}/{totalLines}
              </span>
            </div>

            {/* Story lines list */}
            <div style={{
              background: T.surface, borderRadius: 12, border: `1px solid ${T.border}`,
              overflow: 'hidden', boxShadow: T.shadowMd, marginBottom: 16,
            }}>
              <div ref={storyListRef} style={{ padding: '6px 0' }}>
                {storyLines.map((line, i) => {
                  const isActive = i === storyCurrentLine;
                  const char = line.speaker !== 'narration' ? CHARACTER_MAP[line.speaker] : null;
                  const color = char?.color || T.textMuted;
                  const isNarration = line.speaker === 'narration';

                  return (
                    <div
                      key={i}
                      ref={el => { storyLineRefs.current[i] = el; }}
                      onClick={() => {
                        window.speechSynthesis?.cancel();
                        setStoryPlaying(false);
                        storyPlayingRef.current = false;
                        setStoryCurrentLine(i);
                        const txt = line.english || line.japanese;
                        const gender = !isNarration && CHARACTER_MAP[line.speaker]
                          ? (/female|lisa|mina|yuki/i.test(line.speaker) ? 'female' : 'male')
                          : 'male';
                        speakText(txt, gender as 'male' | 'female', storySpeed);
                      }}
                      style={{
                        display: 'flex', gap: 12, alignItems: 'flex-start',
                        padding: isActive ? '14px 16px' : '10px 16px',
                        background: isActive ? `${color}08` : 'transparent',
                        borderLeft: isActive ? `3px solid ${color}` : '3px solid transparent',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      {/* Speaker badge */}
                      {isNarration ? (
                        <div style={{
                          width: 28, height: 28, borderRadius: '50%', background: T.bgSecondary,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 9, fontWeight: 800, color: T.textMuted, flexShrink: 0, marginTop: 3,
                        }}>N</div>
                      ) : (
                        <div style={{
                          width: 28, height: 28, borderRadius: '50%', background: color + '12', border: `1.5px solid ${color}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 900, fontSize: 11, color, flexShrink: 0, marginTop: 3,
                        }}>
                          {char?.initial || '?'}
                        </div>
                      )}
                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Speaker name for non-narration */}
                        {!isNarration && (
                          <div style={{ fontSize: 12, fontWeight: 700, color, marginBottom: 3 }}>
                            {char?.name.split('\uFF08')[0]}
                            {line.mood && line.mood !== 'normal' && (
                              <span style={{ color: T.textMuted, fontWeight: 400, marginLeft: 6, fontSize: 11 }}>({line.mood})</span>
                            )}
                          </div>
                        )}
                        {/* Action */}
                        {line.action && (
                          <div style={{ fontSize: 12, color: T.textMuted, fontStyle: 'italic', marginBottom: 4 }}>{line.action}</div>
                        )}
                        {/* Japanese */}
                        <div style={{
                          fontSize: isActive ? 17 : 15,
                          color: isNarration ? T.textSub : T.text,
                          fontStyle: isNarration ? 'italic' : 'normal',
                          lineHeight: 1.8, fontWeight: isActive ? 600 : 400,
                        }}>
                          {line.japanese}
                        </div>
                        {/* English */}
                        {showEnglish && line.english && (
                          <div style={{
                            fontSize: isActive ? 14 : 13,
                            color: isActive ? T.gold : T.textMuted,
                            lineHeight: 1.6, marginTop: 3, fontStyle: 'italic',
                          }}>
                            {line.english}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Start Quiz button (always visible at bottom) ── */}
            <div style={{ textAlign: 'center' }}>
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
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', background: '#78716C12', border: '2px solid #78716C',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 9, color: '#78716C',
                  }}>権</div>
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
            />
          </div>
        )}

        {/* RESULTS */}
        {phase === 'results' && !showSlotReview && (
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
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', background: '#78716C12', border: '1.5px solid #78716C',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 8, color: '#78716C',
                }}>権</div>
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

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
              {/* Slot Review CTA */}
              {vocabDeck.length > 0 && (
                <button
                  onClick={() => { setShowSlotReview(true); playSound('slot-spin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{
                    width: '100%', padding: '16px 20px',
                    background: `linear-gradient(135deg, ${T.gold}, #B8941F)`,
                    border: 'none', borderRadius: 12, color: '#fff', fontWeight: 800, fontSize: 15,
                    cursor: 'pointer', boxShadow: T.shadowMd,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  }}
                >
                  <span style={{ fontSize: 18 }}>SLOT</span>
                  <span>スロットで単語復習 ({vocabDeck.length}語)</span>
                </button>
              )}

              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={handleRestart} style={{
                  flex: 1, padding: '12px 16px', background: T.surface, border: `1px solid ${T.border}`,
                  borderRadius: 8, color: T.textSub, fontWeight: 600, fontSize: 13, cursor: 'pointer',
                }}>もう一度</button>
                {nextEp && (
                  <Link href={`/english/izakaya-toeic/episodes/${nextEp.id}`} style={{
                    flex: 1, padding: '12px 16px', background: T.gold, borderRadius: 8,
                    color: '#fff', fontWeight: 800, fontSize: 13, textDecoration: 'none', textAlign: 'center',
                  }}>次: EP.{nextEp.number}</Link>
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
                  <div style={{ fontSize: 11, color: T.textMuted }}>全エピソードの語彙をスロットで復習</div>
                </div>
                <span style={{ fontSize: 12, color: T.green, fontWeight: 700 }}>{'>'}</span>
              </Link>
            </div>
          </div>
        )}

        {/* SLOT REVIEW MODE */}
        {phase === 'results' && showSlotReview && (
          <div>
            <button onClick={() => setShowSlotReview(false)} style={{
              display: 'block', marginBottom: 14, fontSize: 11, color: T.textMuted,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}>
              {'<'} 結果に戻る
            </button>
            <VocabSlotReview
              deck={vocabDeck}
              onComplete={() => {
                playSound('levelup');
                setShowSlotReview(false);
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes izk-fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes izk-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
        @keyframes izk-shake { 0% { transform: translateX(-1px); } 50% { transform: translateX(1px); } 100% { transform: translateX(-1px); } }
      `}</style>
    </div>
  );
}
