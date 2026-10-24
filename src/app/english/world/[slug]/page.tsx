import { notFound } from 'next/navigation';
import { getWorldEpisode, worldEpisodes } from '@/data/english/world-episodes';
import EpisodeView from './EpisodeView';

export function generateStaticParams() {
    return worldEpisodes.map(e => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const ep = getWorldEpisode(slug);
    return { title: ep ? `${ep.title} | 世界の内側` : '世界の内側' };
}

export default async function WorldEpisodeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const ep = getWorldEpisode(slug);
    if (!ep) notFound();
    return <EpisodeView ep={ep} />;
}
