'use client';

/**
 * 練習の本体(1セット)
 *
 * 流れは1つだけ:
 *   日本語を見る → 英語を思い出す(声に出す) → 英語と音声を確かめる → 自己評価 → 次へ
 *
 * 自己評価は3つ(すぐ言えた / 少し迷った / 出てこなかった)。自動採点はしていない。
 * 1セット = 復習(最大10) + 新しい表現(最初は5)。終わると「今日はここまで」。
 *
 * URL
 *   /english/today            いまの教材で始める(途中のセットがあれば続きから)
 *   /english/today?deck=m365  教材を切り替えて始める(先生が生徒に渡す用)
 *   /english/today?extra=1    今日の分を終えた人が、もう1セット足す
 *   /english/today?restart=1  途中のセットを捨てて作り直す
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Volume2, RotateCcw } from 'lucide-react';
import {
    loadState, loadCards, setDeck, abandonSession, startSession, planSession, applyRating, finishSession,
    dueCards, localToday, readCourseLearned, newBudgetFor, RATING_LABEL,
    type PracticeState, type Rating, type SessionState,
} from '@/lib/english/practice/engine';
import { getDeck, loadDeck, resolveItems, loadCourseClips, youtubeUrl, type DeckItem } from '@/lib/english/practice/decks';
import { ttsSupported, warmVoices, speak, stopSpeech } from '@/lib/english/practice/tts';
import { PageShell, Card, Button, Notice, Footnote, Skeleton, C, FOCUS } from '@/components/english/public/ui';

type Phase = 'loading' | 'error' | 'empty' | 'card' | 'done';
type Clip = { v: string; t: number; s: string };

export default function TodayPracticePage() {
    const [phase, setPhase] = useState<Phase>('loading');
    const [state, setState] = useState<PracticeState | null>(null);
    const [items, setItems] = useState<Map<string, DeckItem>>(new Map());
    const [revealed, setRevealed] = useState(false);
    const [busy, setBusy] = useState(false);
    const [saveWarn, setSaveWarn] = useState(false);
    const [ttsOk, setTtsOk] = useState(true);
    const [speaking, setSpeaking] = useState(false);
    const [clips, setClips] = useState<Record<string, Clip[]>>({});
    const [doneSession, setDoneSession] = useState<SessionState | null>(null);
    const [emptyInfo, setEmptyInfo] = useState<{ moreNew: boolean; dueUnresolved: number }>({ moreNew: false, dueUnresolved: 0 });
    const deckItemsRef = useRef<DeckItem[] | null>(null);
    const answerRef = useRef<HTMLDivElement>(null);

    // ───────────── セットを用意する ─────────────
    const prepare = useCallback(async (opts: { extra?: boolean } = {}) => {
        setPhase('loading');
        setRevealed(false);
        try {
            const sp = new URLSearchParams(window.location.search);
            const wantDeck = sp.get('deck');
            const extra = opts.extra ?? sp.get('extra') === '1';
            const restart = sp.get('restart') === '1';
            let s = loadState();
            if (wantDeck && getDeck(wantDeck) && wantDeck !== s.deck) s = setDeck(s, wantDeck);
            if (restart && s.session) s = abandonSession(s);
            const today = localToday();

            // 続きから
            if (s.session && s.session.keys.some(k => !s.session!.results[k])) {
                const map = await resolveItems(s.session.keys);
                const pending = s.session.keys.filter(k => !s.session!.results[k] && map.has(k));
                if (pending.length > 0) {
                    setItems(map);
                    setState(s);
                    setPhase('card');
                    return;
                }
                s = abandonSession(s);
            }

            // 新しいセットを組む
            const cards = loadCards();
            const deckItems = await loadDeck(s.deck as Parameters<typeof loadDeck>[0]);
            deckItemsRef.current = deckItems;
            const skipNew = s.deck === 'course'
                ? new Set([...readCourseLearned()].map(en => `c1000:${en}`))
                : undefined;
            const due = dueCards(cards, today);
            const dueMap = await resolveItems(due.map(c => c.key));
            const availableKeys = new Set(dueMap.keys());
            const plan = planSession(cards, s.deck, deckItems.map(i => i.key), s, today, { extra, skipNew, availableKeys });

            if (plan.reviewKeys.length + plan.newKeys.length === 0) {
                const unlearned = deckItems.some(i => !cards[i.key] && !skipNew?.has(i.key));
                setEmptyInfo({ moreNew: unlearned && newBudgetFor(s, today, true) > 0, dueUnresolved: due.length - availableKeys.size });
                setState(s);
                setPhase('empty');
                return;
            }

            const map = new Map<string, DeckItem>(dueMap);
            for (const it of deckItems) if (plan.newKeys.includes(it.key)) map.set(it.key, it);
            s = startSession(s, plan, today);
            setItems(map);
            setState(s);
            setPhase('card');
            if (typeof window !== 'undefined' && window.history.replaceState && window.location.search) {
                window.history.replaceState(null, '', '/english/today');
            }
        } catch {
            setPhase('error');
        }
    }, []);

    useEffect(() => {
        setTtsOk(ttsSupported());
        warmVoices();
        prepare();
        return () => stopSpeech();
    }, [prepare]);

    // 百日課程のカードがあるときだけ、動画クリップの一覧を読む(任意の追加素材)
    useEffect(() => {
        if (phase !== 'card') return;
        if ([...items.values()].some(i => i.deck === 'course')) {
            loadCourseClips().then(setClips).catch(() => { /* 無ければ出さないだけ */ });
        }
    }, [phase, items]);

    // ───────────── いま出すカード ─────────────
    const session = state?.session ?? null;
    const resolvableKeys = useMemo(() => (session ? session.keys.filter(k => items.has(k)) : []), [session, items]);
    const pending = useMemo(() => (session ? resolvableKeys.filter(k => !session.results[k]) : []), [session, resolvableKeys]);
    const currentKey = pending[0] ?? null;
    const current = currentKey ? items.get(currentKey) ?? null : null;
    const isNew = !!(session && currentKey && session.newKeys.includes(currentKey));
    const total = resolvableKeys.length;
    const position = total - pending.length + 1;

    const play = useCallback((text?: string) => {
        const t = text ?? current?.en;
        if (!t || !ttsOk) return;
        speak(t, { onStart: () => setSpeaking(true), onEnd: () => setSpeaking(false), onError: () => setTtsOk(false) });
    }, [current, ttsOk]);

    const reveal = useCallback(() => {
        setRevealed(true);
        setTimeout(() => answerRef.current?.focus(), 30);
    }, []);

    const rate = useCallback((rating: Rating) => {
        if (!state || !session || !currentKey || !current || busy) return;
        setBusy(true);
        stopSpeech();
        const res = applyRating(state, currentKey, current.deck, rating, { courseEn: current.deck === 'course' ? current.en : undefined });
        if (!res.saved) setSaveWarn(true);
        const nextSession = res.state.session;
        const left = nextSession ? nextSession.keys.filter(k => !nextSession.results[k] && items.has(k)) : [];
        setRevealed(false);
        if (left.length === 0 && nextSession) {
            setDoneSession(nextSession);
            const fin = finishSession(res.state);
            setState(fin);
            setPhase('done');
        } else {
            setState(res.state);
        }
        setBusy(false);
    }, [state, session, currentKey, current, busy, items]);

    // キーボード: Enter/Space で英語を見る、1/2/3 で評価、P で音声
    useEffect(() => {
        if (phase !== 'card') return;
        const onKey = (e: KeyboardEvent) => {
            const tag = (e.target as HTMLElement)?.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA') return;
            if (!revealed && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); reveal(); return; }
            if (revealed) {
                if (e.key === '1') { e.preventDefault(); rate('good'); }
                else if (e.key === '2') { e.preventDefault(); rate('hard'); }
                else if (e.key === '3') { e.preventDefault(); rate('again'); }
                else if (e.key.toLowerCase() === 'p') { e.preventDefault(); play(); }
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [phase, revealed, reveal, rate, play]);

    const deckName = (id: string) => getDeck(id)?.name ?? id;

    // ───────────── 画面 ─────────────
    if (phase === 'loading') {
        return (
            <PageShell width={560}>
                <div className="text-[11px] font-bold tracking-widest mb-3" style={{ color: C.faint }}>教材を読み込んでいます</div>
                <Skeleton h={320} />
            </PageShell>
        );
    }

    if (phase === 'error') {
        return (
            <PageShell width={560}>
                <Card className="p-5">
                    <div className="text-[17px] font-black mb-2" style={{ color: C.ink }}>教材を読み込めませんでした</div>
                    <p className="text-[13px] leading-relaxed mb-4" style={{ color: C.sub }}>通信状態を確かめて、もう一度お試しください。記録は消えていません。</p>
                    <Button onClick={() => prepare()}>もう一度読み込む</Button>
                    <div className="mt-2"><Button href="/english/home" variant="ghost" size="md">ホームへ戻る</Button></div>
                </Card>
            </PageShell>
        );
    }

    if (phase === 'empty') {
        return (
            <PageShell width={560}>
                <Card className="p-5" accent={C.green}>
                    <div className="text-[11px] font-bold tracking-widest mb-1" style={{ color: C.deepGreen }}>今日はここまで</div>
                    <div className="text-[18px] font-black mb-2" style={{ color: C.ink }}>今日の分は終わっています</div>
                    <p className="text-[13px] leading-relaxed mb-4" style={{ color: C.sub }}>
                        復習は、評価した日から間をあけて出ます。明日またここを開いてください。
                        {emptyInfo.dueUnresolved > 0 && ` 読み込めない教材の復習が ${emptyInfo.dueUnresolved} 件あります(その教材を開くと戻ります)。`}
                    </p>
                    {emptyInfo.moreNew && <Button onClick={() => prepare({ extra: true })}>もう1セットやる(新しい表現を追加)</Button>}
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        <Button href="/english/record" variant="outline" size="md">記録を見る</Button>
                        <Button href="/english/materials" variant="outline" size="md">教材を見る</Button>
                    </div>
                </Card>
            </PageShell>
        );
    }

    if (phase === 'done' && doneSession) {
        const results = doneSession.results;
        const rated = doneSession.keys.filter(k => results[k]);
        const count = (r: Rating) => rated.filter(k => results[k] === r).length;
        const missed = rated.filter(k => results[k] === 'again').map(k => items.get(k)).filter((x): x is DeckItem => !!x);
        const today = localToday();
        const stillDue = state ? dueCards(loadCards(), today).length : 0;
        const canMoreNew = state ? newBudgetFor(state, today, true) > 0 : false;
        return (
            <PageShell width={560}>
                <Card className="p-5" accent={C.green}>
                    <div className="text-[11px] font-bold tracking-widest mb-1" style={{ color: C.deepGreen }}>今日はここまで</div>
                    <div className="text-[20px] font-black mb-3" style={{ color: C.ink }}>{rated.length} 問 練習しました</div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                        {(['good', 'hard', 'again'] as Rating[]).map(r => (
                            <div key={r} className="rounded-xl px-2 py-2.5 text-center" style={{ background: '#FAFAF9', border: `1px solid ${C.line}` }}>
                                <div className="text-[10.5px] font-bold" style={{ color: C.sub }}>{RATING_LABEL[r]}</div>
                                <div className="text-[18px] font-black" style={{ color: C.ink }}>{count(r)}</div>
                            </div>
                        ))}
                    </div>
                    <p className="text-[12px] leading-relaxed" style={{ color: C.faint }}>
                        数字は自己評価の回数です。「少し迷った」「出てこなかった」の表現は、明日以降また出ます。
                    </p>
                </Card>

                {missed.length > 0 && (
                    <div className="mt-4">
                        <div className="text-[13px] font-black mb-2" style={{ color: C.ink }}>今日 出てこなかった表現</div>
                        <div className="grid gap-2">
                            {missed.map(it => (
                                <div key={it.key} className="rounded-xl border bg-white px-4 py-3 flex items-start justify-between gap-3" style={{ borderColor: C.line }}>
                                    <div className="min-w-0">
                                        <div className="text-[12.5px]" style={{ color: C.sub }}>{it.ja}</div>
                                        <div className="text-[15px] font-bold" style={{ color: C.ink }}>{it.en}</div>
                                    </div>
                                    {ttsOk && (
                                        <button type="button" onClick={() => play(it.en)} aria-label={`${it.en} を再生`} className={`shrink-0 rounded-lg p-2 hover:bg-[#F5F5F4] ${FOCUS}`} style={{ color: C.deepGold }}>
                                            <Volume2 size={18} aria-hidden />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-5 grid gap-2">
                    {(stillDue > 0 || canMoreNew) && (
                        <Button onClick={() => prepare({ extra: true })} variant="outline">
                            もう1セットやる{stillDue > 0 ? `(復習 ${Math.min(stillDue, 10)} 問)` : '(新しい表現を追加)'}
                        </Button>
                    )}
                    <Button href="/english/record" variant="gold">記録を見る</Button>
                    <Button href="/english/home" variant="ghost" size="md">ホームへ戻る</Button>
                </div>
                {saveWarn && <div className="mt-4"><Notice tone="warn">記録を保存できませんでした。このブラウザでは保存領域が使えないか、いっぱいになっています。練習はできますが、次回に記録は残りません。</Notice></div>}
            </PageShell>
        );
    }

    if (!current || !session) {
        // 想定外(セットが空のまま card になった)。作り直す
        return (
            <PageShell width={560}>
                <Card className="p-5">
                    <Button onClick={() => prepare()}>セットを作り直す</Button>
                </Card>
            </PageShell>
        );
    }

    const clip = current.deck === 'course' ? clips[current.en]?.[0] : undefined;

    return (
        <PageShell width={560}>
            {/* 進み具合 */}
            <div className="flex items-center justify-between mb-2">
                <div className="text-[11px] font-bold tracking-widest" style={{ color: C.faint }}>
                    {position} / {total}
                </div>
                <Link href="/english/home" className="text-[12px] font-bold" style={{ color: C.sub }}>中断してホームへ</Link>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden mb-4" style={{ background: '#E7E5E4' }} aria-hidden>
                <div className="h-full rounded-full transition-all" style={{ width: `${Math.round(((position - 1) / Math.max(1, total)) * 100)}%`, background: C.gold }} />
            </div>

            {saveWarn && <div className="mb-3"><Notice tone="warn">記録を保存できませんでした。このブラウザでは保存領域が使えないか、いっぱいになっています。</Notice></div>}

            <Card className="p-5 md:p-7">
                <div className="flex items-center gap-2 mb-4">
                    <span className="rounded-md px-2 py-0.5 text-[10.5px] font-black tracking-wider" style={{ background: isNew ? '#ECFDF5' : '#FFFBEB', color: isNew ? C.deepGreen : '#92400E' }}>
                        {isNew ? '新しい表現' : '復習'}
                    </span>
                    <span className="text-[11px]" style={{ color: C.faint }}>{deckName(current.deck)}{current.position ? ` ・ ${current.position}` : ''}</span>
                </div>

                {/* 1. 日本語 */}
                <div className="text-[11px] font-bold tracking-widest mb-1" style={{ color: C.faint }}>日本語</div>
                <div className="text-[24px] md:text-[26px] font-black leading-snug mb-5" style={{ color: C.ink }} lang="ja">
                    {current.ja}
                </div>

                {!revealed ? (
                    <>
                        <p className="text-[12.5px] leading-relaxed mb-4" style={{ color: C.sub }}>
                            英語で言うと? 声に出してみてから、英語を見てください。
                        </p>
                        <Button onClick={reveal}>英語を見る</Button>
                        <div className="mt-2 text-center text-[11px]" style={{ color: C.faint }}>Enter または スペースでも開けます</div>
                    </>
                ) : (
                    <div ref={answerRef} tabIndex={-1} className="outline-none">
                        {/* 3. 英語と音声 */}
                        <div className="text-[11px] font-bold tracking-widest mb-1" style={{ color: C.faint }}>英語</div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="text-[22px] md:text-[24px] font-black leading-snug" style={{ color: C.ink }} lang="en">{current.en}</div>
                            <button
                                type="button"
                                onClick={() => play()}
                                disabled={!ttsOk}
                                aria-label="英語を読み上げる"
                                className={`shrink-0 rounded-xl px-3 py-2.5 font-bold text-[12px] inline-flex items-center gap-1.5 ${FOCUS} ${ttsOk ? 'bg-[#FFFBEB] hover:bg-[#FEF3C7]' : 'bg-[#F5F5F4] opacity-50'}`}
                                style={{ color: C.deepGold, border: `1px solid ${ttsOk ? '#FDE68A' : C.line}` }}
                            >
                                <Volume2 size={16} aria-hidden /> {speaking ? '再生中' : '音声'}
                            </button>
                        </div>
                        {!ttsOk && <div className="text-[11.5px] mb-3" style={{ color: C.faint }}>この端末のブラウザでは音声を再生できません。文字で確認してください。</div>}

                        {current.note && (
                            <div className="rounded-xl px-4 py-3 mb-3 text-[13px] leading-relaxed" style={{ background: '#FAFAF9', color: C.body, border: `1px solid ${C.line}` }}>
                                <div className="text-[10.5px] font-bold tracking-widest mb-1" style={{ color: C.faint }}>使い方のメモ</div>
                                {current.note}
                            </div>
                        )}

                        {current.alt && current.alt.length > 0 && (
                            <details className="mb-3 rounded-xl border px-4 py-2.5" style={{ borderColor: C.line }}>
                                <summary className={`cursor-pointer text-[12.5px] font-bold ${FOCUS}`} style={{ color: C.sub }}>別の言い方 ({current.alt.length})</summary>
                                <div className="mt-2 grid gap-2">
                                    {current.alt.map(a => (
                                        <div key={a.label} className="flex items-start justify-between gap-2">
                                            <div>
                                                <div className="text-[10.5px] font-bold" style={{ color: C.faint }}>{a.label}</div>
                                                <div className="text-[14px] font-medium" style={{ color: C.ink }} lang="en">{a.en}</div>
                                            </div>
                                            {ttsOk && (
                                                <button type="button" onClick={() => play(a.en)} aria-label={`${a.en} を再生`} className={`shrink-0 rounded-lg p-1.5 hover:bg-[#F5F5F4] ${FOCUS}`} style={{ color: C.deepGold }}>
                                                    <Volume2 size={16} aria-hidden />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </details>
                        )}

                        {clip && (
                            <a href={youtubeUrl(clip)} target="_blank" rel="noopener noreferrer" className={`block mb-4 text-[12px] font-bold ${FOCUS}`} style={{ color: C.deepGold }}>
                                実際の会話で聞く(YouTube・別タブで開きます)
                            </a>
                        )}

                        {/* 4. 自己評価 */}
                        <div className="text-[11px] font-bold tracking-widest mt-4 mb-2" style={{ color: C.faint }}>自分で評価する</div>
                        <div className="grid gap-2">
                            <RateButton n="1" label={RATING_LABEL.good} sub="そのまま次へ。間をあけて復習" color={C.green} onClick={() => rate('good')} disabled={busy} />
                            <RateButton n="2" label={RATING_LABEL.hard} sub="早めにもう一度出ます" color={C.gold} onClick={() => rate('hard')} disabled={busy} />
                            <RateButton n="3" label={RATING_LABEL.again} sub="明日もう一度出ます" color="#DC2626" onClick={() => rate('again')} disabled={busy} />
                        </div>
                        <div className="mt-3 text-[11px] leading-relaxed" style={{ color: C.faint }}>
                            正解判定はしていません。自分の感覚で選んでください。キーボードは 1 / 2 / 3、P で音声。
                        </div>
                    </div>
                )}
            </Card>

            <Footnote>
                <RotateCcw size={11} aria-hidden style={{ display: 'inline', verticalAlign: '-1px', marginRight: 4 }} />
                途中でやめても、次に開いたとき続きから始められます。
            </Footnote>
        </PageShell>
    );
}

function RateButton({ n, label, sub, color, onClick, disabled }: { n: string; label: string; sub: string; color: string; onClick: () => void; disabled?: boolean }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`w-full min-h-[56px] rounded-xl border bg-white px-4 py-2.5 text-left flex items-center gap-3 hover:bg-[#FAFAF9] active:bg-[#F5F5F4] transition-colors ${FOCUS} ${disabled ? 'opacity-50' : ''}`}
            style={{ borderColor: C.line, borderLeft: `5px solid ${color}` }}
        >
            <span className="shrink-0 w-6 h-6 rounded-md text-[11px] font-black inline-flex items-center justify-center" style={{ background: '#F5F5F4', color: C.sub }} aria-hidden>{n}</span>
            <span className="min-w-0">
                <span className="block text-[15px] font-black" style={{ color: C.ink }}>{label}</span>
                <span className="block text-[11.5px]" style={{ color: C.sub }}>{sub}</span>
            </span>
        </button>
    );
}
