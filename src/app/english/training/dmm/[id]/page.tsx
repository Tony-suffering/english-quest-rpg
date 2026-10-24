import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDmmConversation, getPhrasesByDate } from '@/lib/d1';
import { getLessonReview } from '@/data/english/lesson-reviews';
import DmmConversationViewer from './DmmConversationViewer';
import ReviewBoard from './review/ReviewBoard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// その日のトレーニングに既にある英文。「登録済」表示に使う(date で絞るので数十〜数百行)
async function englishInTraining(date: string): Promise<string[]> {
    try { return (await getPhrasesByDate(date)).map((p) => p.english); } catch { return []; }
}

export default async function DmmConversationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const conversation = await getDmmConversation(id);
    if (!conversation) notFound();
    // 解説がある回は統合ビュー(会話 + 検死 + 解説 + engaged)を直接描画。入口を1つに。
    const review = getLessonReview(id);
    if (review) return <ReviewBoard review={review} conversation={conversation} inTraining={await englishInTraining(review.date)} />;

    return (
        <main style={{
            maxWidth: 880,
            margin: '0 auto',
            padding: '32px 20px 80px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#1c1917',
        }}>
            <header style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Link href="/english/training/dmm" style={{ fontSize: 12, color: '#78716c', textDecoration: 'none' }}>← DMM 一覧</Link>
                    <div style={{ fontSize: 12, color: '#a8a29e' }}>id: {conversation.id}</div>
                </div>
                <h1 style={{ fontSize: 26, fontWeight: 600, margin: '4px 0 6px', letterSpacing: 0.5 }}>{conversation.title}</h1>
                <div style={{ fontSize: 13, color: '#57534e', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                    <span>{conversation.date}</span>
                    {conversation.teacher_name && <span>講師: {conversation.teacher_name}</span>}
                    {conversation.duration_minutes && <span>{conversation.duration_minutes} 分</span>}
                    <span>{conversation.turns.length} ターン</span>
                </div>
                {conversation.notes && (
                    <div style={{ marginTop: 12, padding: '10px 14px', background: '#fafaf9', borderRadius: 8, fontSize: 13, color: '#44403c', borderLeft: '3px solid #d6d3d1' }}>
                        {conversation.notes}
                    </div>
                )}
            </header>

            <DmmConversationViewer conversation={conversation} />
        </main>
    );
}
