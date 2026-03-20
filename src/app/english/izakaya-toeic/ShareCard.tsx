'use client';

import { useCallback, useRef, useState } from 'react';
import { T } from '@/data/izakaya-toeic/theme';

interface ShareCardProps {
  type: 'episode' | 'score' | 'streak' | 'tonight';
  title: string;
  subtitle?: string;
  stats?: { label: string; value: string }[];
  rank?: string;
}

export default function ShareCard({ type, title, subtitle, stats, rank }: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const shareText = [
    title,
    subtitle,
    '#居酒屋TOEIC #TOEIC勉強',
    'toniolab.com/english/izakaya-toeic',
  ].filter(Boolean).join(' ');

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '居酒屋TOEIC',
          text: shareText,
          url: 'https://toniolab.com/english/izakaya-toeic',
        });
      } catch {
        // User cancelled or error
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Clipboard not available
      }
    }
  }, [shareText]);

  // Type-based accent
  const accentColor = type === 'tonight' ? T.purple : type === 'streak' ? T.green : T.gold;

  return (
    <div>
      {/* Visual Card */}
      <div
        ref={cardRef}
        style={{
          width: '100%',
          maxWidth: 320,
          aspectRatio: '320 / 180',
          background: T.surface,
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: T.shadowMd,
          border: `1px solid ${T.border}`,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Gold top border */}
        <div style={{ height: 4, background: T.gold, flexShrink: 0 }} />

        {/* Content area */}
        <div style={{
          flex: 1,
          padding: '14px 16px 10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          {/* Title block */}
          <div>
            <div style={{
              fontSize: 15,
              fontWeight: 800,
              color: T.text,
              lineHeight: 1.4,
              marginBottom: subtitle ? 4 : 0,
            }}>
              {title}
            </div>
            {subtitle && (
              <div style={{
                fontSize: 11,
                color: T.textSub,
                lineHeight: 1.4,
              }}>
                {subtitle}
              </div>
            )}
          </div>

          {/* Stats row */}
          {stats && stats.length > 0 && (
            <div style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
              {stats.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 10, color: T.textMuted }}>{s.label}</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: accentColor }}>{s.value}</span>
                </div>
              ))}
              {rank && (
                <div style={{
                  padding: '2px 10px',
                  background: T.goldBg,
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 700,
                  color: T.gold,
                  border: `1px solid ${T.goldBorder}`,
                }}>
                  {rank}
                </div>
              )}
            </div>
          )}

          {/* Bottom branding */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
            <div style={{ fontSize: 8, color: T.textMuted, letterSpacing: 0.5 }}>
              toniolab.com
            </div>
            <div style={{ fontSize: 10, color: T.textMuted, fontWeight: 600, letterSpacing: 0.5 }}>
              居酒屋TOEIC
            </div>
          </div>
        </div>
      </div>

      {/* Share buttons */}
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 14px',
            fontSize: 12,
            fontWeight: 600,
            color: T.gold,
            background: 'transparent',
            border: `1.5px solid ${T.goldBorder}`,
            borderRadius: 6,
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'all 0.15s',
          }}
        >
          X (Twitter)
        </a>
        <button
          onClick={handleShare}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 14px',
            fontSize: 12,
            fontWeight: 600,
            color: T.textSub,
            background: 'transparent',
            border: `1.5px solid ${T.border}`,
            borderRadius: 6,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {copied ? 'コピー済み' : 'Share'}
        </button>
      </div>
    </div>
  );
}
