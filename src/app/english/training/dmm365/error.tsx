'use client';

// Error boundary -- Dmm365Client が crash した時に表示
import { useEffect } from 'react';
import Link from 'next/link';

export default function Dmm365Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('[dmm365] runtime error:', error);
    }, [error]);

    return (
        <div style={{
            minHeight: '100vh',
            background: '#fafaf9',
            padding: '40px 20px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#1c1917',
        }}>
            <div style={{ maxWidth: 600, margin: '0 auto' }}>
                <Link href="/english/training" style={{
                    fontSize: 12,
                    color: '#78716c',
                    textDecoration: 'none',
                    padding: '6px 10px',
                    border: '1px solid #e7e5e4',
                    borderRadius: 8,
                    background: '#fff',
                    display: 'inline-block',
                    marginBottom: 20,
                }}>← トレーニング</Link>

                <div style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: 12,
                    padding: 20,
                    marginBottom: 16,
                }}>
                    <div style={{ fontSize: 12, color: '#dc2626', letterSpacing: 1, fontWeight: 700, marginBottom: 8 }}>
                        DMM 365 — ERROR
                    </div>
                    <div style={{ fontSize: 16, color: '#991b1b', fontWeight: 600, marginBottom: 8 }}>
                        ページの読み込みでエラー
                    </div>
                    <div style={{
                        fontSize: 12,
                        color: '#7f1d1d',
                        fontFamily: 'ui-monospace, monospace',
                        background: '#fff',
                        padding: 12,
                        borderRadius: 6,
                        wordBreak: 'break-all',
                    }}>
                        {error.message || 'Unknown error'}
                    </div>
                    {error.digest && (
                        <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 6 }}>
                            digest: {error.digest}
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                    <button
                        onClick={reset}
                        style={{
                            background: '#D4AF37',
                            color: '#fff',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: 'pointer',
                        }}
                    >再試行</button>
                    <Link
                        href="/api/dmm365?init=true"
                        style={{
                            background: '#fff',
                            color: '#78716c',
                            border: '1px solid #e7e5e4',
                            padding: '10px 20px',
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 600,
                            textDecoration: 'none',
                        }}
                    >DB 初期化</Link>
                    <Link
                        href="/english/training"
                        style={{
                            background: '#fff',
                            color: '#78716c',
                            border: '1px solid #e7e5e4',
                            padding: '10px 20px',
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 600,
                            textDecoration: 'none',
                        }}
                    >戻る</Link>
                </div>
            </div>
        </div>
    );
}
