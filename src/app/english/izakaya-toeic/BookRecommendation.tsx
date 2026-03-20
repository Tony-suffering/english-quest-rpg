'use client';

import { useMemo } from 'react';
import { T } from '@/data/izakaya-toeic/theme';
import { getBooksForSkill, RecommendedBook } from '@/data/izakaya-toeic/recommended-books';

interface BookRecommendationProps {
  skill?: string;
  limit?: number;
  context?: 'episode' | 'hub' | 'page';
}

const CATEGORY_LABELS: Record<string, string> = {
  listening: 'Listening',
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  practice: 'Practice',
  strategy: 'Strategy',
};

export default function BookRecommendation({ skill, limit = 2, context = 'episode' }: BookRecommendationProps) {
  const books = useMemo(() => {
    if (!skill) return [];
    const matched = getBooksForSkill(skill);
    return matched.slice(0, limit);
  }, [skill, limit]);

  if (books.length === 0) return null;

  const isCompact = context === 'episode';

  return (
    <div style={{
      padding: isCompact ? '14px 16px' : '18px 20px',
      background: T.surface,
      borderRadius: 12,
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      marginBottom: 14,
    }}>
      {/* Section header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        marginBottom: 12,
      }}>
        <div style={{
          width: 18, height: 18, borderRadius: '50%',
          background: T.goldBg, border: `1.5px solid ${T.gold}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 8, fontWeight: 900, color: T.gold,
        }}>本</div>
        <span style={{
          fontSize: 10, fontWeight: 700, color: T.gold,
          letterSpacing: 1,
        }}>RECOMMENDED BOOKS</span>
      </div>

      {/* Book cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {books.map(book => (
          <BookCard key={book.id} book={book} compact={isCompact} />
        ))}
      </div>
    </div>
  );
}

function BookCard({ book, compact }: { book: RecommendedBook; compact: boolean }) {
  return (
    <div style={{
      padding: compact ? '12px 14px' : '14px 16px',
      background: T.bgSecondary,
      borderRadius: 10,
      border: `1px solid ${T.borderLight}`,
    }}>
      {/* Title + category */}
      <div style={{ marginBottom: 8 }}>
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 8,
          marginBottom: 4,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 13, fontWeight: 700, color: T.text,
              lineHeight: 1.5,
            }}>{book.title}</div>
            <div style={{
              fontSize: 11, color: T.textMuted, marginTop: 2,
            }}>{book.author}</div>
          </div>
          <span style={{
            fontSize: 9, fontWeight: 700, color: T.gold,
            padding: '2px 6px', background: T.goldBg,
            borderRadius: 3, flexShrink: 0, marginTop: 2,
            letterSpacing: 0.5,
          }}>{CATEGORY_LABELS[book.category] || book.category}</span>
        </div>
      </div>

      {/* Master comment -- speech bubble style */}
      <div style={{
        position: 'relative' as const,
        padding: '8px 12px',
        background: T.surface,
        borderRadius: 8,
        borderLeft: `3px solid ${T.gold}`,
        marginBottom: 10,
      }}>
        <div style={{
          display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4,
        }}>
          <div style={{
            width: 16, height: 16, borderRadius: '50%',
            background: '#78716C12', border: '1.5px solid #78716C',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 6, color: '#78716C',
          }}>権</div>
          <span style={{ fontSize: 9, fontWeight: 700, color: T.textMuted }}>MASTER</span>
        </div>
        <p style={{
          margin: 0, fontSize: 12, color: T.text,
          lineHeight: 1.7, fontWeight: 500,
        }}>{book.masterComment}</p>
      </div>

      {/* Description */}
      {!compact && (
        <p style={{
          margin: '0 0 10px', fontSize: 12, color: T.textSub,
          lineHeight: 1.7,
        }}>{book.description}</p>
      )}

      {/* Score range + Amazon link */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 8,
      }}>
        <span style={{
          fontSize: 10, color: T.textMuted, fontWeight: 600,
        }}>
          {book.targetScore[0]}-{book.targetScore[1]}点向け
        </span>
        <a
          href={book.amazonUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '6px 14px',
            background: 'transparent',
            border: `1.5px solid ${T.gold}`,
            borderRadius: 6,
            color: T.gold,
            fontSize: 11,
            fontWeight: 700,
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.15s',
            letterSpacing: 0.3,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = T.goldBg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Amazon{'>'} 見る
        </a>
      </div>
    </div>
  );
}
