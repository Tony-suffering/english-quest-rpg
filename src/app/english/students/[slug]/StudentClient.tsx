'use client';

/**
 * 生徒ページの本体
 *
 * 上: 生徒名・コーチ・レッスン一覧(日付と枚数)
 * 下: 英語魂の現行 TrainingClient(iwasaki-naisou-website origin/main の写し。./eigo/ 配下)を
 *     そのまま動かす。PP(PlayPhrase)、YouGlish、自動の繰り返し再生、録音、研究、TIME ATTACK、
 *     スロット、GOD GRID まで全部入り。
 *
 * D1 にはつながない。/api/* は local-api(ブラウザ内の fetch 置き換え)が受けて、
 * 生徒の端末の localStorage(tl_*)に保存する。カードは、コーチが data に書いた表現を
 * tl_phrases に流し込んで出す(id は固定なので、レッスンを足しても進捗はずれない)。
 */

import { useEffect, useMemo, useState } from 'react';
import PhrasesPage, { type TrainingInitialData } from './eigo/TrainingClient';
import { installLocalApi } from '@/lib/local-api';
import { studentCards, type Student } from '@/data/english/students';

const DEEPGOLD = '#9A7B16';
const INK = '#1C1917';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';

type StoredPhrase = { id: string; english: string; japanese: string; category: string; date: string; created_at?: string };

function readJSON<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}

/** コーチの表現を端末の tl_phrases に流し込む(追加と更新だけ。生徒が自分で足した分は残す) */
function seedPhrases(cards: ReturnType<typeof studentCards>) {
    const existing = readJSON<StoredPhrase[]>('tl_phrases', []);
    const byId = new Map(existing.filter(p => p && typeof p.id === 'string').map(p => [p.id, p]));
    for (const c of cards) {
        const prev = byId.get(c.id);
        byId.set(c.id, {
            ...(prev ?? {}),
            id: c.id,
            english: c.english,
            japanese: c.japanese,
            category: c.category,
            date: c.date,
            created_at: prev?.created_at ?? `${c.date}T12:00:00.000Z`,
        });
    }
    try { localStorage.setItem('tl_phrases', JSON.stringify([...byId.values()])); } catch { /* 容量切れ等 */ }
    // 端末内の音声クリップを「サーバーへ移行」しようとして消さないように印を付ける
    try { localStorage.setItem('clips_migrated_v1', 'done'); } catch { /* noop */ }
}

export default function StudentClient({ student }: { student: Student }) {
    const [ready, setReady] = useState(false);
    const [initial, setInitial] = useState<TrainingInitialData | undefined>(undefined);
    const [showLessons, setShowLessons] = useState(false);
    const [learned, setLearned] = useState(0);

    const cards = useMemo(() => studentCards(student), [student]);
    const latest = student.lessons[student.lessons.length - 1];

    useEffect(() => {
        installLocalApi();       // 先に fetch を置き換える(子の useEffect より先に走らせるため、ここで)
        seedPhrases(cards);
        // RETIRE(除外)の状態だけは initialData 経由でしか戻らないので、端末の保存から渡す。
        // phrases を渡さないので、カード本体は /api/training-init(端末内)から読まれる
        const m = readJSON<Record<string, { retired?: boolean }>>('tl_mastery', {});
        const retired: Record<string, boolean> = {};
        for (const [id, v] of Object.entries(m)) if (v?.retired) retired[id] = true;
        setInitial({ retired } as unknown as TrainingInitialData);
        setReady(true);
    }, [cards]);

    useEffect(() => {
        if (!ready) return;
        const tick = () => {
            const m = readJSON<Record<string, { level?: number }>>('tl_mastery', {});
            setLearned(cards.filter(c => (m[c.id]?.level ?? 0) >= 3).length);
        };
        tick();
        const t = setInterval(tick, 2000);
        return () => clearInterval(t);
    }, [ready, cards]);

    return (
        <>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '12px 16px 0' }}>
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, padding: '12px 16px', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                        <div>
                            <div style={{ fontSize: 10, fontWeight: 800, color: FAINT, letterSpacing: '0.2em', marginBottom: 4 }}>
                                LESSON CARDS ・ コーチ: {student.coach}
                            </div>
                            <div style={{ fontSize: 18, fontWeight: 900, color: INK }}>{student.name}の英語カード</div>
                        </div>
                        <div style={{ fontSize: 12, color: SUB, textAlign: 'right' }}>
                            {cards.length} 枚
                            {learned > 0 && <span style={{ color: DEEPGOLD, fontWeight: 700 }}> ・ Lv.4 以上 {learned}</span>}
                            {latest && <span> ・ 最新 {latest.date.replace(/-/g, '/')}</span>}
                            <button
                                type="button"
                                onClick={() => setShowLessons(v => !v)}
                                aria-expanded={showLessons}
                                style={{ marginLeft: 10, background: '#FAFAF9', border: `1px solid ${LINE}`, borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: SUB, cursor: 'pointer' }}
                            >
                                レッスン一覧 {showLessons ? '閉じる' : '開く'}
                            </button>
                        </div>
                    </div>
                    {student.intro && (
                        <p style={{ fontSize: 12, color: '#44403C', lineHeight: 1.7, margin: '8px 0 0' }}>{student.intro}</p>
                    )}
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
                    <div style={{ marginTop: 8, fontSize: 10.5, color: FAINT, lineHeight: 1.6 }}>
                        進捗・録音・クリップはこの端末のブラウザにだけ保存されます(登録不要)。別の端末では最初からになります。
                    </div>
                </div>
            </div>

            {ready ? (
                <PhrasesPage initialData={initial} />
            ) : (
                <div style={{ textAlign: 'center', padding: 40, color: FAINT, fontSize: 13 }}>カードを読み込んでいます</div>
            )}
        </>
    );
}
