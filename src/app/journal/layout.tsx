'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const MEMBER_KEY = 'tl_member_auth';

function checkPass(input: string): boolean {
    const hash = Array.from(input).reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0);
    return hash === 105006906; // "noren"
}

function PasswordGate({ onAuth }: { onAuth: () => void }) {
    const [pass, setPass] = useState('');
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);

    const submit = () => {
        if (checkPass(pass)) {
            localStorage.setItem(MEMBER_KEY, 'true');
            onAuth();
        } else {
            setError(true);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            backgroundColor: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', padding: 24,
        }}>
            <div style={{ maxWidth: 360, width: '100%', textAlign: 'center' }}>
                <div style={{
                    fontSize: 10, letterSpacing: '0.3em', color: '#D4AF37',
                    fontWeight: 700, marginBottom: 24,
                }}>
                    MEMBERS ONLY
                </div>
                <div style={{
                    fontSize: 22, fontWeight: 300, color: '#fff',
                    lineHeight: 1.7, marginBottom: 8,
                }}>
                    とにおのジャーナル
                </div>
                <div style={{
                    fontSize: 13, color: '#666', marginBottom: 12, lineHeight: 1.8,
                }}>
                    開発と英語学習の全記録。133+エントリ。
                </div>
                <div style={{
                    fontSize: 12, color: '#555', marginBottom: 40, lineHeight: 1.8,
                }}>
                    noteメンバーシップの合言葉を入力してください
                </div>

                <div style={{
                    animation: shake ? 'passShake 0.4s ease' : undefined,
                }}>
                    <input
                        type="password"
                        value={pass}
                        onChange={(e) => { setPass(e.target.value); setError(false); }}
                        onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
                        placeholder="合言葉"
                        autoFocus
                        style={{
                            width: '100%',
                            padding: '14px 20px',
                            fontSize: 16,
                            fontWeight: 500,
                            backgroundColor: '#111',
                            border: error ? '2px solid #EF4444' : '2px solid #222',
                            borderRadius: 12,
                            color: '#fff',
                            textAlign: 'center',
                            letterSpacing: '0.15em',
                            outline: 'none',
                            transition: 'border-color 0.2s ease',
                        }}
                        onFocus={(e) => { if (!error) e.target.style.borderColor = '#D4AF37'; }}
                        onBlur={(e) => { if (!error) e.target.style.borderColor = '#222'; }}
                    />
                </div>

                {error && (
                    <div style={{
                        fontSize: 12, color: '#EF4444', marginTop: 12,
                    }}>
                        合言葉が違います
                    </div>
                )}

                <button
                    onClick={submit}
                    disabled={!pass.trim()}
                    style={{
                        marginTop: 20,
                        padding: '14px 48px',
                        borderRadius: 12,
                        backgroundColor: pass.trim() ? '#D4AF37' : '#222',
                        border: 'none',
                        color: pass.trim() ? '#000' : '#555',
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: pass.trim() ? 'pointer' : 'default',
                        letterSpacing: '0.1em',
                        transition: 'all 0.2s ease',
                        width: '100%',
                    }}
                >
                    入室する
                </button>

                <div style={{
                    marginTop: 40,
                    padding: '16px 20px',
                    backgroundColor: '#0a0a0a',
                    borderRadius: 10,
                    border: '1px solid #1a1a1a',
                }}>
                    <div style={{ fontSize: 11, color: '#444', lineHeight: 1.8 }}>
                        合言葉はnoteメンバーシップ<br />
                        「傍聴席プラン」加入後にお知らせします
                    </div>
                    <a
                        href="https://note.com/tonio_english/membership"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-block',
                            marginTop: 12,
                            fontSize: 12,
                            color: '#D4AF37',
                            textDecoration: 'none',
                            fontWeight: 600,
                        }}
                    >
                        メンバーシップを見る →
                    </a>
                </div>

                <Link
                    href="/"
                    style={{
                        display: 'inline-block',
                        marginTop: 24,
                        fontSize: 12,
                        color: '#555',
                        textDecoration: 'none',
                    }}
                >
                    トップに戻る
                </Link>
            </div>

            <style>{`
                @keyframes passShake {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-8px); }
                    40% { transform: translateX(8px); }
                    60% { transform: translateX(-6px); }
                    80% { transform: translateX(6px); }
                }
            `}</style>
        </div>
    );
}

export default function JournalLayout({ children }: { children: React.ReactNode }) {
    const [isAuthed, setIsAuthed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const memberAuth = localStorage.getItem(MEMBER_KEY);
        if (memberAuth === 'true') {
            setIsAuthed(true);
        }
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div style={{
                minHeight: '100vh', backgroundColor: '#000',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#333',
            }}>
                Loading...
            </div>
        );
    }

    if (!isAuthed) {
        return <PasswordGate onAuth={() => setIsAuthed(true)} />;
    }

    return <>{children}</>;
}
