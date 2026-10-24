'use client';

/**
 * 生徒ページの本体
 *
 * 上: 生徒名・コーチ・レッスン一覧(日付と枚数)・使い方
 * 下: カードの仕組みそのもの(/english/training と同じ TrainingClient、端末内保存版)
 *
 * TrainingClient には initialData.phrases を渡す。渡すと localStorage の my-training-phrases は
 * 読まず、カードはここで渡した生徒の表現だけになる。進捗(レベル)は TrainingClient が
 * my-training-mastery / quest-* に保存するので、再訪時にここで読んで渡し戻す。
 */

import { useEffect, useMemo, useState } from 'react';
import PhrasesPage, { type TrainingInitialData } from '../../training/TrainingClient';
import TrainingTutorial from '../../training/TrainingTutorial';
import { studentCards, type Student } from '@/data/english/students';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const INK = '#1C1917';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';

function readJSON<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}

export default function StudentClient({ student }: { student: Student }) {
    const [data, setData] = useState<TrainingInitialData | null>(null);
    const [showHelp, setShowHelp] = useState(false);
    const [showLessons, setShowLessons] = useState(false);

    const cards = useMemo(() => studentCards(student), [student]);
    const total = cards.length;
    const latest = student.lessons[student.lessons.length - 1];

    useEffect(() => {
        // 端末に残っている進捗を読んで渡し戻す(保存先は TrainingClient と同じキー)
        const mastery = readJSON<Record<string, number>>('my-training-mastery', readJSON('quest-mastery', {}));
        const lastLeveled = readJSON<Record<string, string>>('quest-lastLeveled', {});
        const cardPoints = readJSON<Record<string, number>>('quest-cardPoints', {});
        setData({
            phrases: cards,
            mastery,
            lastLeveled,
            cardPoints,
            recordings: {},
            links: {},
        });
    }, [cards]);

    const [learned, setLearned] = useState(0);
    useEffect(() => {
        if (!data) return;
        const tick = () => {
            const m = readJSON<Record<string, number>>('my-training-mastery', {});
            setLearned(cards.filter(c => (m[c.id] ?? 0) >= 3).length);
        };
        tick();
        const t = setInterval(tick, 2000);
        return () => clearInterval(t);
    }, [data, cards]);

    return (
        <>
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '16px 16px 0' }}>
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, padding: '14px 16px', marginBottom: 12 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: FAINT, letterSpacing: '0.2em', marginBottom: 6 }}>
                        LESSON CARDS ・ コーチ: {student.coach}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                        <div style={{ fontSize: 20, fontWeight: 900, color: INK }}>{student.name}の英語カード</div>
                        <div style={{ fontSize: 12, color: SUB }}>
                            {total} 枚{learned > 0 && <span style={{ color: DEEPGOLD, fontWeight: 700 }}> ・ Lv.4 以上 {learned}</span>}
                            {latest && <span> ・ 最新 {latest.date.replace(/-/g, '/')}</span>}
                        </div>
                    </div>
                    {student.intro && (
                        <p style={{ fontSize: 12.5, color: '#44403C', lineHeight: 1.8, margin: '8px 0 0' }}>{student.intro}</p>
                    )}
                    <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                        <button
                            type="button"
                            onClick={() => setShowLessons(v => !v)}
                            aria-expanded={showLessons}
                            style={{ background: '#FAFAF9', border: `1px solid ${LINE}`, borderRadius: 8, padding: '6px 10px', fontSize: 11.5, fontWeight: 700, color: SUB, cursor: 'pointer' }}
                        >
                            レッスン一覧 ({student.lessons.length}) {showLessons ? '閉じる' : '開く'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowHelp(true)}
                            style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: '6px 10px', fontSize: 11.5, fontWeight: 700, color: DEEPGOLD, cursor: 'pointer' }}
                        >
                            使い方
                        </button>
                    </div>
                    {showLessons && (
                        <div style={{ marginTop: 10, display: 'grid', gap: 6 }}>
                            {[...student.lessons].reverse().map(l => (
                                <div key={l.date} style={{ borderTop: `1px solid ${LINE}`, paddingTop: 8 }}>
                                    <div style={{ fontSize: 11, fontWeight: 800, color: DEEPGOLD }}>
                                        {l.date.replace(/-/g, '/')}{l.title ? ` ・ ${l.title}` : ''} <span style={{ color: FAINT, fontWeight: 600 }}>({l.phrases.length}枚)</span>
                                    </div>
                                    <ul style={{ margin: '4px 0 0', paddingLeft: 16, fontSize: 12, color: '#44403C', lineHeight: 1.7 }}>
                                        {l.phrases.map(p => <li key={p.english}>{p.english}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                    <div style={{ marginTop: 10, fontSize: 10.5, color: FAINT, lineHeight: 1.6 }}>
                        進捗はこの端末のブラウザにだけ保存されます(登録不要・無料)。別の端末では最初からになります。
                    </div>
                </div>
            </div>

            {data ? (
                <>
                    <PhrasesPage initialData={data} onHelpClick={() => setShowHelp(true)} skipDefaultData />
                    <TrainingTutorial forceOpen={showHelp} key={showHelp ? 'open' : 'auto'} />
                </>
            ) : (
                <div style={{ textAlign: 'center', padding: 40, color: FAINT, fontSize: 13 }}>カードを読み込んでいます</div>
            )}
        </>
    );
}
