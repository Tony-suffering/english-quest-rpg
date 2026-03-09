import { Metadata } from 'next';
import DailyWisdomContent from '@/components/pages/DailyWisdomContent';

export const metadata: Metadata = {
    title: '今日の言葉 | Daily Wisdom',
    description: '毎日一つの心に響く言葉をお届けします。',
};

export default function DailyWisdomPage() {
    return <DailyWisdomContent />;
}
