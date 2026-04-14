'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface GrindEntry {
    id: string;
    date: string;
    youtube_id: string;
    title: string;
    title_ja: string;
    note: string;
    tags: string;
    duration: number;
    created_at: string;
}

const TOKEN_KEY = 'grind-admin-token';

function extractYouTubeId(input: string): string | null {
    if (!input) return null;
    const trimmed = input.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
    const patterns = [
        /youtu\.be\/([a-zA-Z0-9_-]{11})/,
        /[?&]v=([a-zA-Z0-9_-]{11})/,
        /\/embed\/([a-zA-Z0-9_-]{11})/,
        /\/shorts\/([a-zA-Z0-9_-]{11})/,
    ];
    for (const p of patterns) {
        const m = trimmed.match(p);
        if (m) return m[1];
    }
    return null;
}

function todayLocal(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function GrindAdminPage() {
    const [token, setToken] = useState<string | null>(null);
    const [tokenInput, setTokenInput] = useState('');
    const [authError, setAuthError] = useState('');

    const [entries, setEntries] = useState<GrindEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form
    const [fDate, setFDate] = useState(todayLocal());
    const [fUrl, setFUrl] = useState('');
    const [fTitle, setFTitle] = useState('');
    const [fTitleJa, setFTitleJa] = useState('');
    const [fNote, setFNote] = useState('');
    const [fTags, setFTags] = useState('');
    const [fDuration, setFDuration] = useState('180');
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState('');
    const [flash, setFlash] = useState('');

    // Load token from storage
    useEffect(() => {
        const saved = localStorage.getItem(TOKEN_KEY);
        if (saved) setToken(saved);
    }, []);

    const loadEntries = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/study-log', { cache: 'no-store' });
            const data = await res.json();
            setEntries(data.entries || []);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { if (token) loadEntries(); }, [token, loadEntries]);

    const handleAuth = async () => {
        setAuthError('');
        // Test token with a dry PATCH (no id -> returns 400 if auth OK, 401 if wrong token)
        try {
            const res = await fetch('/api/study-log', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'x-admin-token': tokenInput },
                body: JSON.stringify({}),
            });
            if (res.status === 401) {
                setAuthError('パスワードが違う');
                return;
            }
            localStorage.setItem(TOKEN_KEY, tokenInput);
            setToken(tokenInput);
        } catch {
            setAuthError('接続エラー');
        }
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setTokenInput('');
    };

    const resetForm = () => {
        setFDate(todayLocal());
        setFUrl('');
        setFTitle('');
        setFTitleJa('');
        setFNote('');
        setFTags('');
        setFDuration('180');
        setEditingId(null);
        setFormError('');
    };

    const startEdit = (entry: GrindEntry) => {
        setEditingId(entry.id);
        setFDate(entry.date);
        setFUrl(`https://youtu.be/${entry.youtube_id}`);
        setFTitle(entry.title);
        setFTitleJa(entry.title_ja || '');
        setFNote(entry.note || '');
        setFTags(entry.tags || '');
        setFDuration(String(entry.duration || 180));
        setFormError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const flashMsg = (msg: string) => {
        setFlash(msg);
        setTimeout(() => setFlash(''), 2000);
    };

    const handleSave = async () => {
        if (!token) return;
        setFormError('');
        const ytId = extractYouTubeId(fUrl);
        if (!ytId) { setFormError('YouTube URLが無効'); return; }
        if (!fTitle.trim()) { setFormError('タイトル必須'); return; }

        setSaving(true);
        try {
            if (editingId) {
                const res = await fetch('/api/study-log', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
                    body: JSON.stringify({
                        id: editingId,
                        title: fTitle,
                        titleJa: fTitleJa,
                        note: fNote,
                        tags: fTags,
                    }),
                });
                if (!res.ok) throw new Error('Update failed');
                flashMsg('Updated');
            } else {
                const res = await fetch('/api/study-log', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
                    body: JSON.stringify({
                        date: fDate,
                        youtubeId: ytId,
                        title: fTitle,
                        titleJa: fTitleJa,
                        note: fNote,
                        tags: fTags,
                        duration: Number(fDuration) || 0,
                    }),
                });
                if (!res.ok) throw new Error('Save failed');
                flashMsg('Saved');
            }
            await loadEntries();
            resetForm();
        } catch (e: any) {
            setFormError(e.message || 'Failed');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!token) return;
        if (!confirm('削除していい？')) return;
        try {
            await fetch(`/api/study-log?id=${encodeURIComponent(id)}`, {
                method: 'DELETE',
                headers: { 'x-admin-token': token },
            });
            await loadEntries();
            flashMsg('Deleted');
        } catch { /* silent */ }
    };

    // ─── LOGIN GATE ──────────
    if (!token) {
        return (
            <div style={{
                minHeight: '100vh', background: '#FAFAF9',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 20,
            }}>
                <div style={{
                    background: '#FFF', borderRadius: 20, padding: '40px 44px',
                    maxWidth: 400, width: '100%',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: 14,
                        background: 'linear-gradient(135deg, #D4AF37, #F59E0B)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 24, fontWeight: 800, color: '#FFF',
                        marginBottom: 18,
                    }}>G</div>
                    <div style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                        color: '#D4AF37', marginBottom: 4,
                    }}>
                        GRIND ADMIN
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#1C1917', marginBottom: 18 }}>
                        管理者パスワード
                    </div>
                    <input
                        type="password"
                        value={tokenInput}
                        onChange={e => setTokenInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAuth()}
                        placeholder="Password"
                        style={{
                            width: '100%', padding: '12px 14px', borderRadius: 10,
                            border: '1px solid #E7E5E4', fontSize: 14,
                            background: '#FAFAF9', outline: 'none', boxSizing: 'border-box',
                            marginBottom: 12,
                        }}
                    />
                    {authError && (
                        <div style={{
                            fontSize: 12, color: '#DC2626', marginBottom: 12,
                            padding: '8px 12px', background: '#FEE2E2', borderRadius: 6,
                        }}>
                            {authError}
                        </div>
                    )}
                    <button
                        onClick={handleAuth}
                        style={{
                            width: '100%', padding: '12px 0', borderRadius: 10,
                            background: 'linear-gradient(135deg, #D4AF37, #F59E0B)',
                            border: 'none', color: '#FFF', fontWeight: 700, fontSize: 13,
                            letterSpacing: '0.05em', cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(212,175,55,0.3)',
                        }}
                    >
                        LOGIN
                    </button>
                    <Link href="/english/grind" style={{
                        display: 'block', textAlign: 'center', marginTop: 16,
                        fontSize: 11, color: '#A8A29E', textDecoration: 'none',
                    }}>
                        ← 公開ページに戻る
                    </Link>
                </div>
            </div>
        );
    }

    // ─── ADMIN UI ──────────
    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9', padding: '32px 24px' }}>
            <div style={{ maxWidth: 880, margin: '0 auto' }}>
                {/* Header */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    marginBottom: 24, flexWrap: 'wrap',
                }}>
                    <div style={{
                        width: 40, height: 40, borderRadius: 10,
                        background: 'linear-gradient(135deg, #D4AF37, #F59E0B)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 18, fontWeight: 800, color: '#FFF',
                    }}>G</div>
                    <div>
                        <div style={{
                            fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
                            color: '#D4AF37',
                        }}>
                            GRIND ADMIN
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: '#1C1917' }}>
                            動画ログ管理
                        </div>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                        <Link href="/english/grind" style={{
                            fontSize: 11, fontWeight: 700,
                            color: '#78716C', background: '#FFF',
                            padding: '8px 14px', borderRadius: 6,
                            border: '1px solid #E7E5E4', textDecoration: 'none',
                        }}>
                            公開ページ →
                        </Link>
                        <button
                            onClick={logout}
                            style={{
                                fontSize: 11, fontWeight: 700,
                                color: '#DC2626', background: '#FEE2E2',
                                padding: '8px 14px', borderRadius: 6,
                                border: '1px solid #FECACA', cursor: 'pointer',
                            }}
                        >
                            LOGOUT
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div style={{
                    background: '#FFF', borderRadius: 14, padding: '22px 26px',
                    border: '1px solid #E7E5E4', marginBottom: 24,
                }}>
                    <div style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                        color: '#D4AF37', marginBottom: 14,
                    }}>
                        {editingId ? 'EDIT ENTRY' : 'NEW ENTRY'}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <Field label="DATE">
                            <input
                                type="date"
                                value={fDate}
                                onChange={e => setFDate(e.target.value)}
                                disabled={!!editingId}
                                style={inputStyle}
                            />
                        </Field>
                        <Field label="SECONDS">
                            <input
                                type="number"
                                value={fDuration}
                                onChange={e => setFDuration(e.target.value)}
                                disabled={!!editingId}
                                style={inputStyle}
                            />
                        </Field>
                    </div>

                    {!editingId && (
                        <Field label="YOUTUBE URL">
                            <input
                                type="text"
                                value={fUrl}
                                onChange={e => setFUrl(e.target.value)}
                                placeholder="https://youtu.be/..."
                                style={inputStyle}
                            />
                        </Field>
                    )}

                    <Field label="TITLE (英語)">
                        <input
                            type="text"
                            value={fTitle}
                            onChange={e => setFTitle(e.target.value)}
                            placeholder="Shadowing day 12 -- still can't catch 'gonna'"
                            style={inputStyle}
                        />
                    </Field>

                    <Field label="TITLE (日本語)">
                        <input
                            type="text"
                            value={fTitleJa}
                            onChange={e => setFTitleJa(e.target.value)}
                            placeholder="シャドーイング12日目"
                            style={inputStyle}
                        />
                    </Field>

                    <Field label="NOTE">
                        <textarea
                            value={fNote}
                            onChange={e => setFNote(e.target.value)}
                            rows={3}
                            placeholder="今日の気づき、詰まった所、明日やる事"
                            style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                        />
                    </Field>

                    <Field label="TAGS (カンマ区切り)">
                        <input
                            type="text"
                            value={fTags}
                            onChange={e => setFTags(e.target.value)}
                            placeholder="shadowing, listening, toeic"
                            style={inputStyle}
                        />
                    </Field>

                    {formError && (
                        <div style={{
                            fontSize: 12, color: '#DC2626', marginBottom: 10,
                            padding: '8px 12px', background: '#FEE2E2', borderRadius: 6,
                        }}>
                            {formError}
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                        {editingId && (
                            <button
                                onClick={resetForm}
                                disabled={saving}
                                style={{
                                    flex: 1, padding: '11px 0', borderRadius: 10,
                                    background: '#F5F5F4', border: '1px solid #E7E5E4',
                                    color: '#78716C', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            style={{
                                flex: 2, padding: '11px 0', borderRadius: 10,
                                background: saving ? '#D6D3D1' : 'linear-gradient(135deg, #D4AF37, #F59E0B)',
                                border: 'none', color: '#FFF', fontWeight: 700, fontSize: 13,
                                cursor: saving ? 'wait' : 'pointer',
                                boxShadow: saving ? 'none' : '0 4px 12px rgba(212,175,55,0.3)',
                            }}
                        >
                            {saving ? 'Saving...' : (editingId ? 'Update' : 'Save')}
                        </button>
                    </div>
                </div>

                {/* Flash */}
                {flash && (
                    <div style={{
                        marginBottom: 14, padding: '10px 16px',
                        background: '#D1FAE5', color: '#065F46',
                        borderRadius: 8, fontSize: 12, fontWeight: 700,
                        border: '1px solid #A7F3D0',
                    }}>
                        {flash}
                    </div>
                )}

                {/* List */}
                <div style={{
                    background: '#FFF', borderRadius: 14, padding: '20px 24px',
                    border: '1px solid #E7E5E4',
                }}>
                    <div style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                        color: '#78716C', marginBottom: 14,
                    }}>
                        ALL ENTRIES ({entries.length})
                    </div>
                    {loading ? (
                        <div style={{ color: '#A8A29E', fontSize: 12 }}>Loading...</div>
                    ) : entries.length === 0 ? (
                        <div style={{ color: '#A8A29E', fontSize: 12 }}>まだ無い</div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {entries.map(entry => (
                                <div key={entry.id} style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '10px 14px', borderRadius: 10,
                                    background: '#FAFAF9', border: '1px solid #E7E5E4',
                                }}>
                                    <img
                                        src={`https://img.youtube.com/vi/${entry.youtube_id}/default.jpg`}
                                        alt=""
                                        style={{ width: 56, height: 42, borderRadius: 4, objectFit: 'cover', flexShrink: 0 }}
                                    />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            fontSize: 10, color: '#D4AF37', fontWeight: 700,
                                            letterSpacing: '0.05em', marginBottom: 2,
                                        }}>
                                            {entry.date}
                                        </div>
                                        <div style={{
                                            fontSize: 13, fontWeight: 700, color: '#1C1917',
                                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                        }}>
                                            {entry.title}
                                        </div>
                                        {entry.title_ja && (
                                            <div style={{
                                                fontSize: 11, color: '#78716C',
                                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                            }}>
                                                {entry.title_ja}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => startEdit(entry)}
                                        style={{
                                            fontSize: 10, fontWeight: 700,
                                            color: '#78716C', background: '#FFF',
                                            padding: '6px 12px', borderRadius: 5,
                                            border: '1px solid #E7E5E4', cursor: 'pointer',
                                        }}
                                    >
                                        EDIT
                                    </button>
                                    <button
                                        onClick={() => handleDelete(entry.id)}
                                        style={{
                                            fontSize: 10, fontWeight: 700,
                                            color: '#DC2626', background: '#FEE2E2',
                                            padding: '6px 12px', borderRadius: 5,
                                            border: '1px solid #FECACA', cursor: 'pointer',
                                        }}
                                    >
                                        DEL
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div style={{ marginBottom: 12 }}>
            <div style={{
                fontSize: 9, fontWeight: 700, color: '#78716C',
                letterSpacing: '0.08em', marginBottom: 5,
            }}>
                {label}
            </div>
            {children}
        </div>
    );
}

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '9px 12px',
    borderRadius: 8,
    border: '1px solid #E7E5E4',
    fontSize: 13,
    color: '#1C1917',
    background: '#FAFAF9',
    outline: 'none',
    boxSizing: 'border-box',
};
