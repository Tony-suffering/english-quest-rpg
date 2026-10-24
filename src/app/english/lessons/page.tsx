import EnglishSidebar from '@/components/EnglishSidebar';
import { lessons } from '@/data/english/lessons';

export const metadata = {
    title: 'レッスン・アーカイブ | 英語魂',
};

function renderTranscript(transcript: string) {
    return transcript.split('\n').map((line, i) => {
        const isStudent = line.startsWith('Student:');
        const isTeacher = line.startsWith('Teacher:');
        const speaker = isStudent ? 'Student' : isTeacher ? 'Teacher' : null;
        const text = speaker ? line.slice(speaker.length + 1).trim() : line;
        return (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                {speaker && (
                    <span style={{
                        flexShrink: 0,
                        width: 62,
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        color: isStudent ? '#8a6d1a' : '#047857',
                        marginTop: 3,
                    }}>{speaker === 'Student' ? 'とにお' : '先生'}</span>
                )}
                <span style={{ fontSize: 14.5, lineHeight: 1.8, color: isStudent ? '#1c1917' : '#134e4a' }}>{text}</span>
            </div>
        );
    });
}

export default function LessonsArchivePage() {
    const sorted = [...lessons].sort((a, b) => b.date.localeCompare(a.date));

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#FAFAF9' }}>
            <EnglishSidebar />
            <main style={{
                flex: 1,
                maxWidth: 860,
                margin: '0 auto',
                padding: '40px 20px 96px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                color: '#1c1917',
            }}>
                <header style={{ marginBottom: 32 }}>
                    <div style={{ fontSize: 12, letterSpacing: 3, color: '#a8a29e', textTransform: 'uppercase' }}>Lesson Archive</div>
                    <h1 style={{ fontSize: 30, fontWeight: 700, margin: '6px 0 10px', letterSpacing: 0.5 }}>レッスン・アーカイブ</h1>
                    <p style={{ fontSize: 14, lineHeight: 1.8, color: '#57534e', margin: 0, maxWidth: 660 }}>
                        DMM英会話の生レッスンの全文と、そこから生まれた全成果物(ツッコミ・語録・ドシエ・世界の内側・note)を1箇所に。
                        派生物だけ残して元の会話が消えたら本末転倒。ここが源泉の保管庫。
                    </p>
                </header>

                {sorted.map(lesson => (
                    <article key={lesson.slug} style={{ marginBottom: 44, background: 'white', border: '1px solid #e7e5e4', borderRadius: 16, overflow: 'hidden' }}>
                        <div style={{ padding: '22px 24px', borderBottom: '1px solid #f0efee' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                <span style={{ fontSize: 12, color: '#a8a29e' }}>{lesson.date}</span>
                                {lesson.country && (
                                    <span style={{ fontSize: 11, letterSpacing: 1, color: '#8a6d1a', background: 'rgba(212,175,55,0.12)', padding: '2px 10px', borderRadius: 999 }}>{lesson.country}</span>
                                )}
                            </div>
                            <h2 style={{ fontSize: 21, fontWeight: 700, margin: '0 0 8px', lineHeight: 1.4 }}>{lesson.title}</h2>
                            <div style={{ fontSize: 13, color: '#78716c', marginBottom: 10 }}>情報源: {lesson.teacher}</div>
                            <p style={{ fontSize: 14.5, lineHeight: 1.85, color: '#44403c', margin: 0 }}>{lesson.summary}</p>

                            <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {lesson.links.map((l, i) => (
                                    <a key={i} href={l.href} style={{
                                        fontSize: 12.5,
                                        fontWeight: 600,
                                        color: '#0e7490',
                                        border: '1px solid #d1e9ef',
                                        background: '#f0fbfd',
                                        padding: '6px 12px',
                                        borderRadius: 8,
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 6,
                                    }}>
                                        {l.label}
                                        {l.draft && <span style={{ fontSize: 10, fontWeight: 700, color: '#b45309', background: '#fef3c7', padding: '1px 6px', borderRadius: 5 }}>下書き</span>}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <details style={{ padding: '0 24px' }}>
                            <summary style={{ cursor: 'pointer', padding: '16px 0', fontSize: 13, fontWeight: 700, color: '#57534e', listStyle: 'none' }}>
                                全文文字起こしを開く / 閉じる
                            </summary>
                            <div style={{ padding: '4px 0 24px' }}>
                                {renderTranscript(lesson.transcript)}
                            </div>
                        </details>
                    </article>
                ))}
            </main>
        </div>
    );
}
