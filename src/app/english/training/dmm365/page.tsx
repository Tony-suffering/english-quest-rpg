// DMM 365 -- Server Component
// 月カレンダー + 日クリックで単体ビュー (表現 / DMM会話 タブ)
// status state machine 無し、 ただの表現リスト
import {
    initDmm365Tables,
    listDmm365SessionsWithAmmo,
    listDmmConversations,
} from '@/lib/d1';
import Dmm365CalendarClient from './Dmm365CalendarClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Dmm365Page() {
    let initialData: any = undefined;
    let initError: string | null = null;

    try {
        await initDmm365Tables();
        const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 7000));
        const dataFetch = Promise.all([
            listDmm365SessionsWithAmmo().catch(() => []),
            listDmmConversations().catch(() => []),
        ]);
        const [sessions, dmmConversations] = await Promise.race([dataFetch, timeout]) as any;
        initialData = { sessions, dmmConversations };
    } catch (err) {
        initError = String(err);
    }

    return <Dmm365CalendarClient initialData={initialData} initError={initError} />;
}
