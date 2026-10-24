import { getAllPhrases, getAllMasteryWithDates, getAllMastery, getAllVoiceRecordings, getPlayerStats, getAllPhraseLinks } from '@/lib/d1';
import PhrasesPage from './TrainingClient';

// Server Component: fetch data at request time, pass to client
// This avoids the dev server deadlock where API routes can't compile
// while the training page's HMR WebSocket occupies the dev server.
export default async function TrainingPage() {
    let initialData: any = undefined;

    try {
        // 5s timeout to prevent dev server hang when D1 is slow
        const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000));
        const dataFetch = Promise.all([
            getAllPhrases().catch(() => []),
            getAllMasteryWithDates()
                .catch(() => getAllMastery()
                    .then(m => ({ mastery: m, lastLeveled: {}, cardPoints: {}, cardNames: {} }))
                    .catch(() => ({ mastery: {}, lastLeveled: {}, cardPoints: {}, cardNames: {} }))
                ),
            getAllVoiceRecordings().catch(() => ({})),
            getPlayerStats().catch(() => ({ total_xp: 0, sparks: 0, pity_counter: 0, legendary_count: 0 })),
            getAllPhraseLinks().catch(() => ({})),
        ]);

        const [phrases, masteryData, recordings, playerStats, links] = await Promise.race([dataFetch, timeout]) as any;

        initialData = {
            phrases,
            mastery: masteryData.mastery || {},
            lastLeveled: (masteryData as any).lastLeveled || {},
            cardPoints: (masteryData as any).cardPoints || {},
            retired: (masteryData as any).retired || {},
            recordings: recordings || {},
            links: links || {},
            playerStats,
        };
    } catch {
        // If D1 is unavailable or timeout, client will fall back to API fetch
    }

    return <PhrasesPage initialData={initialData} />;
}
