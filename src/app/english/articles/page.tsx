import type { Metadata } from 'next';
import ArticleMasterClient from './ArticleMasterClient';

export const metadata: Metadata = {
    title: '冠詞 a / the 撲滅 | 英語魂',
    description: '日本人最大の弱点・冠詞を、とにおの実ミスから逆算した専用エンジンで攻略する。',
};

export default function ArticlesPage() {
    return <ArticleMasterClient />;
}
