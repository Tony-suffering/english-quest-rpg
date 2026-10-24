'use client';

/**
 * Silent Bartender -- PWA install gate.
 *
 * Responsibilities:
 *   - Register /bar-sw.js (scope: /english/bar/) on mount
 *   - Attach <link rel="manifest" href="/bar-manifest.json"> to <head>
 *   - Capture beforeinstallprompt and surface a soft "ホーム画面に追加" banner
 *     once the player is invested (>= 3 nights) and hasn't dismissed it
 *
 * Self-contained: no page.tsx edits required. Drop-in.
 */

import { useEffect, useState, useCallback } from 'react';
import { loadStats } from '@/lib/english/bar/storage';

// Minimal shape for the beforeinstallprompt event (not in lib.dom).
interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
    prompt(): Promise<void>;
}

const DISMISS_KEY = 'tonio-bar-install-dismissed';
const MIN_NIGHTS = 3;

// Light-theme palette, matches page.tsx.
const COLORS = {
    bg: '#FFF8E1',
    border: '#C8A45C',
    amber: '#B8860B',
    amberDim: '#8B6508',
    text: '#1C1917',
    textDim: '#57534E',
};

function isStandalone(): boolean {
    if (typeof window === 'undefined') return false;
    // iOS-specific + the standards-track display-mode query.
    const iosStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    const mqStandalone = typeof window.matchMedia === 'function'
        && window.matchMedia('(display-mode: standalone)').matches;
    return iosStandalone || mqStandalone;
}

function wasDismissed(): boolean {
    if (typeof window === 'undefined') return false;
    try {
        return window.localStorage.getItem(DISMISS_KEY) === '1';
    } catch {
        return false;
    }
}

function ensureManifestLink(): void {
    if (typeof document === 'undefined') return;
    const href = '/bar-manifest.json';
    const existing = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
    if (existing) {
        // If another route installed a different manifest, swap the href so
        // the current scope wins while this component is mounted.
        if (existing.dataset.installGate === 'bar') return;
        existing.setAttribute('data-install-gate-prev', existing.href);
        existing.href = href;
        existing.dataset.installGate = 'bar';
        return;
    }
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = href;
    link.dataset.installGate = 'bar';
    document.head.appendChild(link);
}

export default function InstallGate() {
    const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [visible, setVisible] = useState(false);

    // 1) Attach manifest + register SW (idempotent).
    useEffect(() => {
        ensureManifestLink();
        if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
        navigator.serviceWorker
            .register('/bar-sw.js', { scope: '/english/bar/' })
            .catch(() => {
                // SW registration failing is non-fatal; game still works online.
            });
    }, []);

    // 2) Listen for install prompt + decide visibility.
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (isStandalone() || wasDismissed()) return;

        const stats = loadStats();
        if (stats.totalNights < MIN_NIGHTS) return;

        const onPrompt = (e: Event) => {
            e.preventDefault();
            setPrompt(e as BeforeInstallPromptEvent);
            setVisible(true);
        };
        const onInstalled = () => {
            setVisible(false);
            setPrompt(null);
        };
        window.addEventListener('beforeinstallprompt', onPrompt as EventListener);
        window.addEventListener('appinstalled', onInstalled);
        return () => {
            window.removeEventListener('beforeinstallprompt', onPrompt as EventListener);
            window.removeEventListener('appinstalled', onInstalled);
        };
    }, []);

    const handleInstall = useCallback(async () => {
        if (!prompt) return;
        try {
            await prompt.prompt();
            const choice = await prompt.userChoice;
            if (choice.outcome === 'accepted') {
                setVisible(false);
            }
        } catch {
            // Some browsers throw if called twice -- swallow silently.
        } finally {
            setPrompt(null);
        }
    }, [prompt]);

    const handleDismiss = useCallback(() => {
        setVisible(false);
        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(DISMISS_KEY, '1');
            }
        } catch {
            // ignore
        }
    }, []);

    if (!visible || !prompt) return null;

    return (
        <div
            role="region"
            aria-label="ホーム画面に追加"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                padding: '10px 14px',
                background: COLORS.bg,
                borderBottom: `1px solid ${COLORS.border}`,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
            }}
        >
            <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{
                    fontSize: 10, letterSpacing: 3, fontWeight: 800,
                    color: COLORS.amberDim, marginBottom: 2,
                }}>
                    HOME SCREEN
                </div>
                <div style={{
                    fontSize: 12, color: COLORS.text,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                    ホーム画面に追加してオフラインで遊ぶ
                </div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button
                    onClick={() => { void handleInstall(); }}
                    style={{
                        padding: '8px 14px',
                        borderRadius: 8,
                        background: COLORS.amber,
                        color: '#FAF6EC',
                        border: 'none',
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: 1,
                        cursor: 'pointer',
                        minHeight: 36,
                    }}
                >
                    追加
                </button>
                <button
                    onClick={handleDismiss}
                    aria-label="閉じる"
                    style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        background: 'transparent',
                        color: COLORS.textDim,
                        border: `1px solid ${COLORS.border}`,
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: 'pointer',
                        minHeight: 36,
                    }}
                >
                    閉じる
                </button>
            </div>
        </div>
    );
}
