import { redirect } from 'next/navigation';

// /english は /english/izakaya-toeic に統一
export default function EnglishHomePage() {
    redirect('/english/izakaya-toeic');
}
