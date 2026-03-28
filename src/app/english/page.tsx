import { redirect } from 'next/navigation';

// /english は英会話マスター365に統一
export default function EnglishHomePage() {
    redirect('/english/izakaya-toeic/kaiwa');
}
