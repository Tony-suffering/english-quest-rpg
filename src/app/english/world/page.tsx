import Link from 'next/link';
import { worldEpisodes } from '@/data/english/world-episodes';

export const metadata = {
    title: '世界の内側 | The World Inside',
};

export default function WorldEpisodeListPage() {
    const episodes = [...worldEpisodes].sort((a, b) => b.number - a.number);

    return (
        <main style={{
            maxWidth: 860,
            margin: '0 auto',
            padding: '40px 20px 96px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#1c1917',
        }}>
            <header style={{ marginBottom: 36 }}>
                <div style={{ fontSize: 12, letterSpacing: 3, color: '#a8a29e', textTransform: 'uppercase' }}>The World Inside</div>
                <h1 style={{ fontSize: 32, fontWeight: 700, margin: '6px 0 10px', letterSpacing: 0.5 }}>世界の内側</h1>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: '#57534e', margin: 0, maxWidth: 640 }}>
                    オンライン英会話の先生は、その国に住む一次情報源。レッスンで出たトピックを全部裏取りして、
                    「現地の人の体感」と「統計」の両方が見える物語にした番組。ニュースより、たぶん面白い。
                </p>
            </header>

            {episodes.length === 0 && (
                <div style={{ padding: 40, background: '#fafaf9', border: '1px dashed #e7e5e4', borderRadius: 12, textAlign: 'center', color: '#78716c' }}>
                    まだエピソードがありません。
                </div>
            )}

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 16 }}>
                {episodes.map(ep => (
                    <li key={ep.slug}>
                        <Link
                            href={`/english/world/${ep.slug}`}
                            style={{
                                display: 'block',
                                padding: '22px 24px',
                                background: 'white',
                                border: '1px solid #e7e5e4',
                                borderRadius: 16,
                                textDecoration: 'none',
                                color: 'inherit',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                <span style={{
                                    fontSize: 11, fontWeight: 700, letterSpacing: 1,
                                    color: '#10B981', background: 'rgba(16,185,129,0.1)',
                                    padding: '3px 10px', borderRadius: 999,
                                }}>EP {String(ep.number).padStart(2, '0')}</span>
                                <span style={{ fontSize: 11, letterSpacing: 1.5, color: '#a8a29e', textTransform: 'uppercase' }}>{ep.flag || ep.country}</span>
                                {!ep.published && (
                                    <span style={{ fontSize: 10, fontWeight: 700, color: '#b45309', background: '#fef3c7', padding: '2px 8px', borderRadius: 6 }}>下書き</span>
                                )}
                            </div>
                            <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.4, marginBottom: 8 }}>{ep.title}</div>
                            <div style={{ fontSize: 14, color: '#57534e', lineHeight: 1.7 }}>{ep.hook}</div>
                            <div style={{ marginTop: 14, fontSize: 12, color: '#a8a29e', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                                <span>{ep.date}</span>
                                {ep.durationLabel && <span>{ep.durationLabel}</span>}
                                {ep.factChecks && <span>裏取り {ep.factChecks.length} 件</span>}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
