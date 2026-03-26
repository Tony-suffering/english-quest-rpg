'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'eigodamashii_install_dismissed';
const DISMISS_DAYS = 7; // Show again after 7 days

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches
    || ('standalone' in navigator && (navigator as Record<string, unknown>).standalone === true);
}

function isDismissed(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return false;
  const dismissedAt = parseInt(stored, 10);
  const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
  return daysSince < DISMISS_DAYS;
}

export default function InstallBanner() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Delay showing by 3 seconds so it doesn't compete with page load
    const timer = setTimeout(() => {
      if (!isStandalone() && !isDismissed()) {
        setVisible(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setClosing(true);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  const gold = '#D4AF37';

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9000,
      padding: '0 12px 12px',
      pointerEvents: 'none',
      opacity: closing ? 0 : 1,
      transform: closing ? 'translateY(20px)' : 'translateY(0)',
      transition: 'all 0.3s ease',
      animation: 'installBannerSlideUp 0.4s ease-out',
    }}>
      <style>{`
        @keyframes installBannerSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{
        maxWidth: 480,
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: 16,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #E7E5E4',
        padding: '16px 18px',
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
      }}>
        {/* App icon */}
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          backgroundColor: gold,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{
            fontSize: 16,
            fontWeight: 900,
            color: '#fff',
          }}>
            英
          </span>
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 13,
            fontWeight: 700,
            color: '#1C1917',
            marginBottom: 2,
          }}>
            ホーム画面に追加
          </div>
          <div style={{
            fontSize: 11,
            color: '#78716C',
            lineHeight: 1.5,
          }}>
            アプリのように全画面で使えます
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/install"
          onClick={dismiss}
          style={{
            padding: '8px 16px',
            borderRadius: 10,
            backgroundColor: gold,
            color: '#000',
            fontSize: 12,
            fontWeight: 700,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          設定する
        </Link>

        {/* Close */}
        <button
          onClick={dismiss}
          style={{
            background: 'none',
            border: 'none',
            padding: 4,
            cursor: 'pointer',
            color: '#A8A29E',
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
