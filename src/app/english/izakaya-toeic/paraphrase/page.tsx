'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { T } from '@/data/izakaya-toeic/theme';
import {
  PARAPHRASE_BANK,
  PARAPHRASE_CATEGORIES,
  ParaphraseEntry,
  ParaphraseCategory,
  getRandomParaphraseQuiz,
} from '@/data/izakaya-toeic/paraphrase-bank';

// ─── Helpers ────────────────────────────────────────────────────────────────

const DIFFICULTY_LABELS: Record<string, string> = {
  basic: '基礎',
  intermediate: '中級',
  advanced: '上級',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  basic: T.green,
  intermediate: T.blue,
  advanced: T.purple,
};

function DifficultyDot({ level }: { level: string }) {
  return (
    <span style={{
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: DIFFICULTY_COLORS[level] || T.textMuted,
      display: 'inline-block',
      flexShrink: 0,
    }} />
  );
}

// ─── Browse Mode ─────────────────────────────────────────────────────────────

function BrowseEntry({ entry }: { entry: ParaphraseEntry }) {
  const [tipOpen, setTipOpen] = useState(false);
  const catMeta = PARAPHRASE_CATEGORIES.find(c => c.id === entry.category);

  return (
    <div style={{
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 10,
      padding: '12px 14px',
      marginBottom: 8,
      boxShadow: T.shadow,
    }}>
      {/* Main row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
        <DifficultyDot level={entry.difficulty} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{entry.audio}</span>
            <span style={{ fontSize: 12, color: T.textMuted, flexShrink: 0 }}>&rarr;</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.gold }}>{entry.answer}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            {catMeta && (
              <span style={{
                fontSize: 10,
                fontWeight: 600,
                color: T.textSub,
                background: T.bgSecondary,
                border: `1px solid ${T.borderLight}`,
                borderRadius: 4,
                padding: '1px 6px',
              }}>
                {catMeta.labelJa}
              </span>
            )}
            <span style={{
              fontSize: 10,
              color: DIFFICULTY_COLORS[entry.difficulty] || T.textMuted,
              fontWeight: 600,
            }}>
              {DIFFICULTY_LABELS[entry.difficulty]}
            </span>
          </div>
        </div>
      </div>

      {/* Tip toggle */}
      {entry.tip && (
        <>
          <button
            onClick={() => setTipOpen(v => !v)}
            style={{
              fontSize: 11,
              color: T.textMuted,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span style={{
              transition: 'transform 0.15s',
              transform: tipOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              display: 'inline-block',
              fontSize: 9,
            }}>
              &#9658;
            </span>
            ポイント
          </button>
          {tipOpen && (
            <p style={{
              fontSize: 12,
              color: T.textSub,
              lineHeight: 1.75,
              margin: '6px 0 0',
              padding: '8px 10px',
              background: T.goldBg,
              border: `1px solid ${T.goldBorder}`,
              borderRadius: 7,
              animation: 'izk-fadein 0.15s ease',
            }}>
              {entry.tip}
            </p>
          )}
        </>
      )}
    </div>
  );
}

// ─── Quiz Mode ────────────────────────────────────────────────────────────────

interface QuizState {
  questions: ParaphraseEntry[];
  current: number;
  revealed: boolean;
  results: ('o' | 'x')[];
  done: boolean;
}

function initQuiz(): QuizState {
  return {
    questions: getRandomParaphraseQuiz(10),
    current: 0,
    revealed: false,
    results: [],
    done: false,
  };
}

function QuizMode() {
  const [quiz, setQuiz] = useState<QuizState>(initQuiz);

  const restart = useCallback(() => setQuiz(initQuiz()), []);

  const reveal = () => {
    setQuiz(q => ({ ...q, revealed: true }));
  };

  const mark = (choice: 'o' | 'x') => {
    setQuiz(q => {
      const newResults = [...q.results, choice];
      const next = q.current + 1;
      if (next >= q.questions.length) {
        return { ...q, results: newResults, done: true, revealed: false };
      }
      return { ...q, results: newResults, current: next, revealed: false };
    });
  };

  if (quiz.done) {
    const correct = quiz.results.filter(r => r === 'o').length;
    const pct = Math.round((correct / quiz.questions.length) * 100);
    const color = pct >= 80 ? T.green : pct >= 60 ? T.gold : T.red;

    return (
      <div style={{ animation: 'izk-fadein 0.25s ease' }}>
        <div style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 14,
          padding: '28px 20px',
          textAlign: 'center',
          boxShadow: T.shadowMd,
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 11, color: T.textMuted, letterSpacing: 2, fontWeight: 700, marginBottom: 10 }}>RESULT</div>
          <div style={{ fontSize: 56, fontWeight: 900, color, lineHeight: 1, marginBottom: 4 }}>
            {pct}<span style={{ fontSize: 24 }}>%</span>
          </div>
          <div style={{ fontSize: 14, color: T.textSub, marginBottom: 20 }}>
            {correct} / {quiz.questions.length} 正解
          </div>

          {/* Per-question dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 20 }}>
            {quiz.results.map((r, i) => (
              <span
                key={i}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: r === 'o' ? T.green : T.red,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 800,
                  color: '#fff',
                }}
              >
                {r === 'o' ? 'O' : 'X'}
              </span>
            ))}
          </div>

          <div style={{ fontSize: 13, color: T.textSub, marginBottom: 20 }}>
            {pct >= 80
              ? 'すばらしい。このペースで続けよう。'
              : pct >= 60
              ? 'まずまず。苦手なカテゴリを重点的に。'
              : 'もう一周やってみよう。繰り返しが全て。'}
          </div>

          <button
            onClick={restart}
            style={{
              padding: '11px 28px',
              background: T.gold,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 800,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            もう一度
          </button>
        </div>
      </div>
    );
  }

  const q = quiz.questions[quiz.current];
  const progress = ((quiz.current) / quiz.questions.length) * 100;
  const catMeta = PARAPHRASE_CATEGORIES.find(c => c.id === q.category);

  return (
    <div>
      {/* Progress bar */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontSize: 10, color: T.textMuted, fontWeight: 700, letterSpacing: 1 }}>PROGRESS</span>
          <span style={{ fontSize: 10, color: T.gold, fontWeight: 700 }}>{quiz.current + 1} / {quiz.questions.length}</span>
        </div>
        <div style={{ height: 4, background: T.bgSecondary, borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${T.gold}, #FDE68A)`,
            borderRadius: 2,
            transition: 'width 0.4s ease',
          }} />
        </div>
        {/* Results so far */}
        {quiz.results.length > 0 && (
          <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
            {quiz.results.map((r, i) => (
              <span
                key={i}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: r === 'o' ? T.green : T.red,
                  display: 'inline-block',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card */}
      <div
        key={quiz.current}
        style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 14,
          padding: '24px 20px',
          boxShadow: T.shadowMd,
          marginBottom: 16,
          animation: 'izk-fadein 0.22s ease',
        }}
      >
        {/* Category + difficulty */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
          {catMeta && (
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              color: T.textSub,
              background: T.bgSecondary,
              border: `1px solid ${T.borderLight}`,
              borderRadius: 4,
              padding: '2px 7px',
            }}>
              {catMeta.labelJa}
            </span>
          )}
          <DifficultyDot level={q.difficulty} />
          <span style={{ fontSize: 10, color: DIFFICULTY_COLORS[q.difficulty] || T.textMuted, fontWeight: 600 }}>
            {DIFFICULTY_LABELS[q.difficulty]}
          </span>
        </div>

        {/* Question */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: 2, marginBottom: 8 }}>AUDIO</div>
          <div style={{
            fontSize: 18,
            fontWeight: 700,
            color: T.text,
            lineHeight: 1.5,
            padding: '12px 14px',
            background: T.bgSecondary,
            border: `1px solid ${T.borderLight}`,
            borderRadius: 8,
          }}>
            {q.audio}
          </div>
          <div style={{ fontSize: 11, color: T.textMuted, marginTop: 5 }}>
            選択肢ではどう言い換えられる?
          </div>
        </div>

        {/* Answer reveal */}
        {!quiz.revealed ? (
          <button
            onClick={reveal}
            style={{
              width: '100%',
              padding: '13px',
              background: T.goldBg,
              border: `2px dashed ${T.goldBorder}`,
              borderRadius: 10,
              color: T.gold,
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
          >
            タップして答えを見る
          </button>
        ) : (
          <div style={{ animation: 'izk-fadein 0.2s ease' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: 2, marginBottom: 8 }}>ANSWER</div>
            <div style={{
              fontSize: 18,
              fontWeight: 800,
              color: T.gold,
              padding: '12px 14px',
              background: T.goldBg,
              border: `1px solid ${T.goldBorder}`,
              borderRadius: 8,
              marginBottom: q.tip ? 10 : 16,
            }}>
              {q.answer}
            </div>

            {q.tip && (
              <p style={{
                fontSize: 12,
                color: T.textSub,
                lineHeight: 1.75,
                margin: '0 0 16px',
                padding: '8px 12px',
                background: T.bgSecondary,
                border: `1px solid ${T.borderLight}`,
                borderRadius: 7,
              }}>
                {q.tip}
              </p>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button
                onClick={() => mark('x')}
                style={{
                  padding: '13px',
                  background: 'rgba(239,68,68,0.08)',
                  border: `2px solid rgba(239,68,68,0.3)`,
                  borderRadius: 10,
                  color: T.red,
                  fontWeight: 800,
                  fontSize: 16,
                  cursor: 'pointer',
                }}
              >
                X
              </button>
              <button
                onClick={() => mark('o')}
                style={{
                  padding: '13px',
                  background: 'rgba(16,185,129,0.08)',
                  border: `2px solid rgba(16,185,129,0.3)`,
                  borderRadius: 10,
                  color: T.green,
                  fontWeight: 800,
                  fontSize: 16,
                  cursor: 'pointer',
                }}
              >
                O
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ParaphrasePage() {
  const [mode, setMode] = useState<'browse' | 'quiz'>('browse');
  const [categoryFilter, setCategoryFilter] = useState<ParaphraseCategory | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'basic' | 'intermediate' | 'advanced'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes izk-fadein {
        from { opacity: 0; transform: translateY(6px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const filtered = PARAPHRASE_BANK.filter(e => {
    if (categoryFilter !== 'all' && e.category !== categoryFilter) return false;
    if (difficultyFilter !== 'all' && e.difficulty !== difficultyFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!e.audio.toLowerCase().includes(q) && !e.answer.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      {/* Hero */}
      <div style={{
        padding: '36px 20px 28px',
        textAlign: 'center',
        background: `linear-gradient(180deg, #FFFBEB 0%, ${T.bg} 100%)`,
        borderBottom: `1px solid ${T.border}`,
      }}>
        <Link
          href="/english/izakaya-toeic"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 12,
            color: T.textMuted,
            textDecoration: 'none',
            marginBottom: 16,
          }}
        >
          &larr; 居酒屋TOEIC
        </Link>

        <div style={{
          display: 'inline-block',
          padding: '3px 12px',
          background: T.goldBg,
          border: `1px solid ${T.goldBorder}`,
          borderRadius: 4,
          fontSize: 10,
          fontWeight: 700,
          color: T.gold,
          letterSpacing: 3,
          marginBottom: 12,
          marginLeft: 8,
        }}>
          TOEIC SKILL
        </div>

        <h1 style={{
          fontSize: 'clamp(22px, 6vw, 32px)',
          fontWeight: 900,
          margin: '0 0 6px',
          letterSpacing: -0.5,
        }}>
          パラフレーズ辞典
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            color: T.gold,
            background: T.goldBg,
            border: `1px solid ${T.goldBorder}`,
            borderRadius: 20,
            padding: '2px 10px',
          }}>
            {PARAPHRASE_BANK.length} entries
          </span>
        </div>
        <p style={{ fontSize: 12, color: T.textMuted, margin: 0 }}>
          音声 &rarr; 選択肢の言い換えパターンを網羅
        </p>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '20px 16px 60px' }}>
        {/* Mode Toggle */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          marginBottom: 20,
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 12,
          padding: 4,
          boxShadow: T.shadow,
        }}>
          {(['browse', 'quiz'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: '9px',
                borderRadius: 8,
                border: 'none',
                background: mode === m ? T.gold : 'transparent',
                color: mode === m ? '#fff' : T.textMuted,
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all 0.18s',
              }}
            >
              {m === 'browse' ? 'ブラウズ' : 'クイズ'}
            </button>
          ))}
        </div>

        {/* Browse Mode */}
        {mode === 'browse' && (
          <div style={{ animation: 'izk-fadein 0.2s ease' }}>
            {/* Search */}
            <input
              type="text"
              placeholder="キーワード検索..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 10,
                fontSize: 13,
                color: T.text,
                outline: 'none',
                boxSizing: 'border-box',
                marginBottom: 12,
                boxShadow: T.shadow,
              }}
            />

            {/* Category pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              <button
                onClick={() => setCategoryFilter('all')}
                style={{
                  padding: '5px 11px',
                  borderRadius: 20,
                  border: `1px solid ${categoryFilter === 'all' ? T.gold : T.border}`,
                  background: categoryFilter === 'all' ? T.goldBg : T.surface,
                  color: categoryFilter === 'all' ? T.gold : T.textSub,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                すべて
              </button>
              {PARAPHRASE_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  style={{
                    padding: '5px 11px',
                    borderRadius: 20,
                    border: `1px solid ${categoryFilter === cat.id ? T.gold : T.border}`,
                    background: categoryFilter === cat.id ? T.goldBg : T.surface,
                    color: categoryFilter === cat.id ? T.gold : T.textSub,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {cat.labelJa}
                </button>
              ))}
            </div>

            {/* Difficulty pills */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              {(['all', 'basic', 'intermediate', 'advanced'] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setDifficultyFilter(d)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 20,
                    border: `1px solid ${difficultyFilter === d ? (DIFFICULTY_COLORS[d] || T.border) : T.border}`,
                    background: difficultyFilter === d ? `${(DIFFICULTY_COLORS[d] || T.gold)}14` : T.surface,
                    color: difficultyFilter === d ? (DIFFICULTY_COLORS[d] || T.textSub) : T.textMuted,
                    fontSize: 10,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {d === 'all' ? 'レベル全て' : DIFFICULTY_LABELS[d]}
                </button>
              ))}
            </div>

            {/* Count */}
            <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 12 }}>
              {filtered.length} 件
            </div>

            {/* List */}
            {filtered.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: T.textMuted,
                fontSize: 13,
              }}>
                該当するエントリがありません
              </div>
            ) : (
              filtered.map(entry => (
                <BrowseEntry key={entry.id} entry={entry} />
              ))
            )}
          </div>
        )}

        {/* Quiz Mode */}
        {mode === 'quiz' && (
          <div style={{ animation: 'izk-fadein 0.2s ease' }}>
            <div style={{
              background: T.goldBg,
              border: `1px solid ${T.goldBorder}`,
              borderRadius: 10,
              padding: '10px 14px',
              marginBottom: 16,
              fontSize: 12,
              color: '#78350F',
              lineHeight: 1.7,
            }}>
              音声フレーズを見て、選択肢での言い換えを思い浮かべよう。答えを見てから O / X で判定。10問ラウンド制。
            </div>
            <QuizMode key={mode} />
          </div>
        )}
      </div>
    </div>
  );
}
