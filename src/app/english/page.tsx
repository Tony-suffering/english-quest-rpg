import { redirect } from 'next/navigation';

// /english は2択ページにリダイレクト
export default function EnglishHomePage() {
    redirect('/');
}
