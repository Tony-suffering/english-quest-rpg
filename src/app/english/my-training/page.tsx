import { redirect } from 'next/navigation';

// Daily Training は英語魂の /english/training(D1 連携の本体)に統合。
// 旧 RPG 版(localStorage の my-training-phrases)は 2026-10-24 に廃止。
export default function MyTrainingPage() {
    redirect('/english/training');
}
