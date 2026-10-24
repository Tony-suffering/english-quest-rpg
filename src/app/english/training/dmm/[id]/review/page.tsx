import { notFound } from 'next/navigation';
import { getLessonReview } from '@/data/english/lesson-reviews';
import { getLessonAspiration } from '@/data/english/lesson-aspirations';
import { getDmmConversation, getPhrasesByDate } from '@/lib/d1';
import ReviewBoard from './ReviewBoard';

export const dynamic = 'force-dynamic';

export default async function LessonReviewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const review = getLessonReview(id);
    if (!review) notFound();
    // 会話(検死 + engaged)を読み込んで統合表示。失敗しても解説単体で出す。
    let conversation = null;
    try { conversation = await getDmmConversation(id); } catch { conversation = null; }
    // 「言いたかったこと」多層比較コーナー(任意)。
    const aspiration = getLessonAspiration(id);
    // その日のトレーニングに既にある英文。「登録済」表示に使う(date で絞るので数十〜数百行)
    let inTraining: string[] = [];
    try { inTraining = (await getPhrasesByDate(review.date)).map((p) => p.english); } catch { inTraining = []; }
    return <ReviewBoard review={review} conversation={conversation} aspiration={aspiration} inTraining={inTraining} />;
}
