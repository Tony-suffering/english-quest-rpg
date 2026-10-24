'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface TurnDraft {
    role: 'student' | 'teacher';
    original: string;
    native?: string;
    engaged?: string;
    minute?: number;
}

// Parse a raw transcript into turns.
// Accepted role markers (case-insensitive, with or without colon variants):
//   生徒: / 講師: / Student: / Teacher:
// Inline rewrite markers for student lines (own line, immediately after a student line):
//   [native]  / [ネイティブ] / ネイティブ:    -- 「俺の表現の修正」 (clean native + 一言しゃれた)
//   [engaged] / [エンゲージ] / エンゲージ:    -- 「本物の会話の深さ」 (逆質問・vulnerability 等)
// Inline minute marker anywhere within an original line: [m:5] or [5分]
function parseTranscript(raw: string): TurnDraft[] {
    const lines = raw.split(/\r?\n/);
    const turns: TurnDraft[] = [];
    let current: TurnDraft | null = null;
    let currentExtra: 'native' | 'engaged' | null = null;
    const pushCurrent = () => {
        if (current) {
            current.original = current.original.trim();
            if (current.original.length > 0) turns.push(current);
            current = null;
        }
        currentExtra = null;
    };
    const studentRe = /^(?:生徒|Student)\s*[:：]\s*(.*)$/i;
    const teacherRe = /^(?:講師|Teacher)\s*[:：]\s*(.*)$/i;
    const nativeRe = /^(?:\[native\]|\[ネイティブ\]|ネイティブ)\s*[:：]?\s*(.*)$/i;
    const engagedRe = /^(?:\[engaged\]|\[エンゲージ\]|エンゲージ)\s*[:：]?\s*(.*)$/i;

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
            if (current && !currentExtra) current.original += '\n';
            continue;
        }
        const sm = trimmed.match(studentRe);
        const tm = trimmed.match(teacherRe);
        const nm = trimmed.match(nativeRe);
        const em = trimmed.match(engagedRe);
        if (sm) {
            pushCurrent();
            current = { role: 'student', original: sm[1] || '' };
        } else if (tm) {
            pushCurrent();
            current = { role: 'teacher', original: tm[1] || '' };
        } else if (nm && current && current.role === 'student') {
            current.native = (current.native ? current.native + '\n' : '') + (nm[1] || '');
            currentExtra = 'native';
        } else if (em && current && current.role === 'student') {
            current.engaged = (current.engaged ? current.engaged + '\n' : '') + (em[1] || '');
            currentExtra = 'engaged';
        } else if (current) {
            if (currentExtra === 'native') {
                current.native = (current.native || '') + '\n' + trimmed;
            } else if (currentExtra === 'engaged') {
                current.engaged = (current.engaged || '') + '\n' + trimmed;
            } else {
                current.original += (current.original ? '\n' : '') + trimmed;
            }
        }
    }
    pushCurrent();

    // Strip minute markers and capture into .minute
    const minuteRe = /\[m:(\d{1,3})\]|\[(\d{1,3})\s*分\]/;
    return turns.map(t => {
        const m = t.original.match(minuteRe);
        if (m) {
            const minute = parseInt(m[1] || m[2], 10);
            return {
                ...t,
                minute,
                original: t.original.replace(minuteRe, '').trim(),
            };
        }
        return t;
    });
}

export default function DmmAdminPage() {
    const router = useRouter();
    const today = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);

    const [title, setTitle] = useState('');
    const [date, setDate] = useState(today);
    const [teacherName, setTeacherName] = useState('');
    const [duration, setDuration] = useState('25');
    const [notes, setNotes] = useState('');
    const [raw, setRaw] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const parsed = useMemo(() => parseTranscript(raw), [raw]);
    const studentCount = parsed.filter(t => t.role === 'student').length;
    const teacherCount = parsed.filter(t => t.role === 'teacher').length;
    const nativeCount = parsed.filter(t => t.role === 'student' && t.native).length;
    const engagedCount = parsed.filter(t => t.role === 'student' && t.engaged).length;

    async function save() {
        setError(null);
        setSuccess(null);
        if (!title.trim()) { setError('title が空'); return; }
        if (!date.trim()) { setError('date が空'); return; }
        if (parsed.length === 0) { setError('turns が 0 件 -- 生徒:/講師: マーカーで書いてください'); return; }
        setSubmitting(true);
        try {
            const res = await fetch('/api/dmm-conversations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date,
                    title: title.trim(),
                    teacher_name: teacherName.trim() || null,
                    duration_minutes: duration ? parseInt(duration, 10) : null,
                    turns: parsed,
                    notes: notes.trim() || null,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setSuccess(`保存 OK -- id=${data.conversation.id}`);
                setTimeout(() => router.push(`/english/training/dmm/${data.conversation.id}`), 600);
            } else {
                setError(data.error || 'unknown error');
            }
        } catch (err) {
            setError(String(err));
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '32px 20px 80px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#1c1917',
        }}>
            <header style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
                <div>
                    <div style={{ fontSize: 12, letterSpacing: 2, color: '#78716c', textTransform: 'uppercase' }}>DMM 英会話 — 新規登録</div>
                    <h1 style={{ fontSize: 26, fontWeight: 600, margin: '4px 0 0' }}>会話を登録</h1>
                </div>
                <Link href="/english/training/dmm" style={{ fontSize: 13, color: '#57534e' }}>← 一覧</Link>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {/* LEFT: form */}
                <section>
                    <div style={{ display: 'grid', gap: 12 }}>
                        <Field label="タイトル" required>
                            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="DMM 復帰一発目 (British teacher in Spain)" style={INPUT} />
                        </Field>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                            <Field label="日付" required>
                                <input type="date" value={date} onChange={e => setDate(e.target.value)} style={INPUT} />
                            </Field>
                            <Field label="講師">
                                <input value={teacherName} onChange={e => setTeacherName(e.target.value)} placeholder="British teacher" style={INPUT} />
                            </Field>
                            <Field label="時間 (分)">
                                <input type="number" min={1} max={120} value={duration} onChange={e => setDuration(e.target.value)} style={INPUT} />
                            </Field>
                        </div>
                        <Field label="ノート (任意)">
                            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} placeholder="どこで録ったか、音質、印象 など" style={{ ...INPUT, fontFamily: 'inherit', resize: 'vertical' }} />
                        </Field>
                        <Field label="トランスクリプト (生徒: / 講師: で各行始める)">
                            <textarea
                                value={raw}
                                onChange={e => setRaw(e.target.value)}
                                rows={26}
                                placeholder={SAMPLE_PLACEHOLDER}
                                style={{ ...INPUT, fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace', fontSize: 12.5, lineHeight: 1.55, resize: 'vertical' }}
                            />
                        </Field>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 4 }}>
                            <button
                                onClick={save}
                                disabled={submitting}
                                style={{
                                    padding: '12px 24px',
                                    background: submitting ? '#a8a29e' : '#10B981',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 10,
                                    fontSize: 14,
                                    fontWeight: 600,
                                    cursor: submitting ? 'wait' : 'pointer',
                                }}
                            >{submitting ? '保存中…' : '保存'}</button>
                            {error && <span style={{ fontSize: 12, color: '#dc2626' }}>{error}</span>}
                            {success && <span style={{ fontSize: 12, color: '#059669' }}>{success}</span>}
                        </div>
                        <details style={{ marginTop: 8, fontSize: 12, color: '#57534e' }}>
                            <summary style={{ cursor: 'pointer' }}>マーカーの書き方</summary>
                            <pre style={{ background: '#fafaf9', padding: 12, borderRadius: 8, marginTop: 8, fontSize: 11.5, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{MARKER_HELP}</pre>
                        </details>
                    </div>
                </section>

                {/* RIGHT: live preview */}
                <section>
                    <div style={{ position: 'sticky', top: 16 }}>
                        <div style={{ fontSize: 12, letterSpacing: 2, color: '#78716c', textTransform: 'uppercase', marginBottom: 8 }}>プレビュー</div>
                        <div style={{ fontSize: 12, color: '#57534e', marginBottom: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            <span>生徒: {studentCount}</span>
                            <span>講師: {teacherCount}</span>
                            <span>NATIVE: {nativeCount} / {studentCount}</span>
                            <span>ENGAGED: {engagedCount} / {studentCount}</span>
                        </div>
                        <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', display: 'grid', gap: 8, paddingRight: 4 }}>
                            {parsed.length === 0 && (
                                <div style={{ padding: 24, color: '#a8a29e', fontSize: 13, textAlign: 'center', background: '#fafaf9', borderRadius: 8 }}>
                                    左にトランスクリプトを貼ってください
                                </div>
                            )}
                            {parsed.map((t, i) => (
                                <div
                                    key={i}
                                    style={{
                                        padding: '10px 12px',
                                        borderRadius: 8,
                                        background: t.role === 'student' ? '#fef3c7' : '#dbeafe',
                                        border: t.role === 'student' ? '1px solid #fde68a' : '1px solid #bfdbfe',
                                        fontSize: 12.5,
                                        lineHeight: 1.55,
                                    }}
                                >
                                    <div style={{ fontSize: 10, letterSpacing: 1, color: '#78716c', textTransform: 'uppercase', marginBottom: 4 }}>
                                        {t.role === 'student' ? '生徒' : '講師'} {t.minute != null ? `· ${t.minute}分` : ''}
                                    </div>
                                    <div style={{ whiteSpace: 'pre-wrap' }}>{t.original}</div>
                                    {t.native && (
                                        <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px dashed rgba(0,0,0,0.1)', color: '#059669', whiteSpace: 'pre-wrap' }}>
                                            <span style={{ fontSize: 10, letterSpacing: 1, marginRight: 6, fontWeight: 700, background: '#10B981', color: 'white', padding: '1px 5px', borderRadius: 3 }}>NATIVE</span>{t.native}
                                        </div>
                                    )}
                                    {t.engaged && (
                                        <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px dashed rgba(0,0,0,0.1)', color: '#5b21b6', whiteSpace: 'pre-wrap' }}>
                                            <span style={{ fontSize: 10, letterSpacing: 1, marginRight: 6, fontWeight: 700, background: '#8B5CF6', color: 'white', padding: '1px 5px', borderRadius: 3 }}>ENGAGED</span>{t.engaged}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

const INPUT: React.CSSProperties = {
    padding: '10px 12px',
    border: '1px solid #d6d3d1',
    borderRadius: 8,
    fontSize: 13,
    width: '100%',
    boxSizing: 'border-box',
    background: 'white',
};

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
    return (
        <label style={{ display: 'block', fontSize: 12, color: '#57534e' }}>
            <div style={{ marginBottom: 4, fontWeight: 500 }}>
                {label}{required && <span style={{ color: '#dc2626', marginLeft: 4 }}>*</span>}
            </div>
            {children}
        </label>
    );
}

const MARKER_HELP = `生徒: で生徒の発話、講師: で講師の発話を始めます。
複数行に渡る発話は次のマーカーまで全部一塊として扱われます。

[native]  = 「俺の表現の修正」: 同じ内容を、 自然な native 口語 + 一言しゃれた表現で言うクリーン版 (現実的な学習ターゲット)
[engaged] = 「本物の会話の深さ」: punchline じゃなく、 逆質問・vulnerability・具体的 observation・pushback など、 ガチで engaged な native conversationalist の返し (stretch)

[m:5] や [5分] を発話内に書くと、その turn が経過5分目のものとして記録されます。

例:
生徒: I started English again because it's just fun.
[native] I picked English back up because, honestly, it's just fun for me.
[engaged] Yeah, I started again -- but I gotta be honest, I'm still figuring out why. Maybe it's just that the sound of English is wired into me somehow. Does that make sense to you, as someone who picked up Spanish?

講師: That makes sense.`;

const SAMPLE_PLACEHOLDER = `生徒: Hello. Can you hear me?
[native] Hey, can you hear me alright?
[engaged] Hey -- mic check. You getting me clearly? Sometimes my mic picks up weird stuff from the street.

講師: Nice to meet you. I can hear you fine. Can you hear me okay?

生徒: Yes. I'm outside now, so there's some noise.
[native] Yeah, I can hear you fine. Just a heads-up -- I'm outside right now.
[engaged] Yeah, loud and clear. One thing though -- I'm taking this lesson from outside. Don't worry, I've got headphones in, but if a fire truck rolls by, that's on me. How does it sound on your end?

...`;
