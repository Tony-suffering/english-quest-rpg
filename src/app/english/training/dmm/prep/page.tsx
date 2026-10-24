// スピーチ暗記 — DMMレッスン前に「言いたいこと」を完璧な英語で仕込んで丸暗記する。
// /english/training/dmm の派生。事後の検死ではなく、事前の仕込み。
import { initSpeechPrepTable, listSpeechPrep } from '@/lib/d1';
import SpeechPrepClient from './SpeechPrepClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SpeechPrepPage() {
    let topics: any[] = [];
    let initError: string | null = null;
    try {
        await initSpeechPrepTable();
        topics = await listSpeechPrep();
    } catch (err) {
        initError = String(err);
    }
    return <SpeechPrepClient initialTopics={topics} initError={initError} />;
}
