import { xTweets } from '@/data/x-tweets';
import XPageClient from './XPageClient';

export const dynamic = 'force-dynamic';

export default function XAdminPage() {
    return <XPageClient tweets={xTweets} />;
}
