import { initLineAdminTable, listLineAdminItems } from '@/lib/d1';
import LineAdminClient from './LineAdminClient';

export const dynamic = 'force-dynamic';

export default async function LineAdminPage() {
    let initialItems: any[] = [];
    try {
        await initLineAdminTable();
        initialItems = await listLineAdminItems();
    } catch (err) {
        console.error('LINE admin init failed', err);
    }

    return <LineAdminClient initialItems={initialItems} />;
}
