'use client';

/**
 * 記録
 *
 * 最初に見せるのは4つだけ: 今日やった量 / 復習待ち / 連続 / 最後にやった日。
 * 復習する表現の一覧と、教材ごとの枚数、日ごとの履歴はその下。
 * 数字は全部「自己評価の回数」であって、英語力の測定ではないと書く。
 */

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
    loadCards, loadLog, summarize, localToday, dueCards, addDays, readCourseLearned, RATING_LABEL,
    type PracticeCard, type DayLog, type PracticeSummary,
} from '@/lib/english/practice/engine';
import { DECKS, resolveItems, type DeckItem } from '@/lib/english/practice/decks';
import { PageShell, Kicker, H1, H2, Card, Button, Footnote, Skeleton, C, FOCUS } from '@/components/english/public/ui';

const WEEKDAY = ['日', '月', '火', '水', '木', '金', '土'];

function weekdayOf(date: string): string {
    const [y, m, d] = date.split('-').map(Number);
    return WEEKDAY[new Date(y, m - 1, d).getDay()];
}

export default function RecordPage() {
    const [cards, setCards] = useState<Record<string, PracticeCard> | null>(null);
    const [log, setLog] = useState<Record<string, DayLog>>({});
    const [summary, setSummary] = useState<PracticeSummary | null>(null);
    const [dueItems, setDueItems] = useState<{ card: PracticeCard; item: DeckItem }[] | null>(null);
    const [courseLearned, setCourseLearned] = useState(0);
    const [showHistory, setShowHistory] = useState(false);
    const today = localToday();

    useEffect(() => {
        const c = loadCards();
        const l = loadLog();
        setCards(c);
        setLog(l);
        setSummary(summarize(c, l, today));
        setCourseLearned(readCourseLearned().size);
        const due = dueCards(c, today).slice(0, 30);
        if (due.length === 0) { setDueItems([]); return; }
        resolveItems(due.map(d => d.key)).then(map => {
            setDueItems(due.filter(d => map.has(d.key)).map(d => ({ card: d, item: map.get(d.key)! })));
        }).catch(() => setDueItems([]));
    }, [today]);

    const perDeck = useMemo(() => {
        if (!cards) return [];
        return DECKS.map(d => {
            const mine = Object.values(cards).filter(c => c.deck === d.id);
            return { deck: d, count: mine.length, far: mine.filter(c => c.box >= 5).length };
        }).filter(x => x.count > 0);
    }, [cards]);

    const history = useMemo(() => {
        const rows: { date: string; log: DayLog }[] = [];
        for (let i = 0; i < 30; i++) {
            const d = addDays(today, -i);
            if (log[d]?.reviewed) rows.push({ date: d, log: log[d] });
        }
        return rows;
    }, [log, today]);

    if (!summary || !cards) {
        return <PageShell><Kicker>TONIO LAB ・ 記録</Kicker><Skeleton h={120} /><div className="mt-3"><Skeleton h={200} /></div></PageShell>;
    }

    const empty = summary.activeDays === 0 && summary.totalCards === 0;

    return (
        <PageShell>
            <Kicker>TONIO LAB ・ 記録</Kicker>
            <H1 sub="自分の取り組みと、復習する表現。数字はすべて自己評価の回数です。">記録</H1>

            {empty ? (
                <Card className="p-5" accent={C.gold}>
                    <div className="text-[17px] font-black mb-1" style={{ color: C.ink }}>まだ記録がありません</div>
                    <p className="text-[13px] leading-relaxed mb-4" style={{ color: C.sub }}>最初の練習を終えると、ここに今日の量と復習する表現が出ます。</p>
                    <Button href="/english/today">練習をはじめる</Button>
                </Card>
            ) : (
                <>
                    <div className="grid grid-cols-2 gap-2">
                        <Stat label="今日" value={`${summary.today.reviewed} 問`} sub={summary.today.reviewed > 0 ? `${RATING_LABEL.good} ${summary.today.good} ・ ${RATING_LABEL.hard} ${summary.today.hard} ・ ${RATING_LABEL.again} ${summary.today.again}` : 'まだ練習していません'} />
                        <Stat label="復習待ち" value={`${summary.dueCount} 問`} sub={summary.dueCount > 0 ? '今日出せる復習' : '今日の復習はありません'} />
                        <Stat label="連続" value={`${summary.streak} 日`} sub="練習した日が続いた数" />
                        <Stat label="最後に練習した日" value={summary.lastDate === today ? '今日' : summary.lastDate ? summary.lastDate.slice(5).replace('-', '/') : '—'} sub={`これまでに ${summary.activeDays} 日`} />
                    </div>

                    {/* 最近7日 */}
                    <Card className="px-4 py-3 mt-3">
                        <div className="text-[10px] font-bold tracking-widest mb-2" style={{ color: C.faint }}>最近7日</div>
                        <div className="grid grid-cols-7 gap-1.5">
                            {summary.last7.map(d => (
                                <div key={d.date} className="text-center">
                                    <div className="text-[10px]" style={{ color: C.faint }}>{weekdayOf(d.date)}</div>
                                    <div
                                        className="mx-auto mt-1 rounded-lg h-9 flex items-center justify-center text-[12px] font-black"
                                        style={{ background: d.reviewed > 0 ? C.gold : '#F5F5F4', color: d.reviewed > 0 ? C.ink : C.faint, border: d.date === today ? `2px solid ${C.ink}` : '2px solid transparent' }}
                                        aria-label={`${d.date} ${d.reviewed}問`}
                                    >
                                        {d.reviewed > 0 ? d.reviewed : ''}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <H2 note={summary.dueCount > 30 ? `先頭30件を表示(全部で ${summary.dueCount})` : undefined}>復習する表現</H2>
                    {dueItems === null ? <Skeleton h={120} /> : dueItems.length === 0 ? (
                        <Card className="px-4 py-4 text-[13px]" style={{ color: C.sub }}>
                            今日の復習はありません。「少し迷った」「出てこなかった」の表現は、翌日以降にここへ戻ってきます。
                        </Card>
                    ) : (
                        <>
                            <div className="grid gap-2">
                                {dueItems.map(({ card, item }) => (
                                    <div key={card.key} className="rounded-xl border bg-white px-4 py-3" style={{ borderColor: C.line }}>
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <div className="text-[12.5px]" style={{ color: C.sub }}>{item.ja}</div>
                                                <div className="text-[15px] font-bold" style={{ color: C.ink }}>{item.en}</div>
                                            </div>
                                            <div className="shrink-0 text-right text-[10.5px]" style={{ color: C.faint }}>
                                                <div>前回: {card.lastRating ? RATING_LABEL[card.lastRating] : '—'}</div>
                                                <div>{card.next < today ? `${-1 * (daysDiff(today, card.next))}日前が期限` : '今日'}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3"><Button href="/english/today">復習をはじめる</Button></div>
                        </>
                    )}

                    {perDeck.length > 0 && (
                        <>
                            <H2>教材ごとの枚数</H2>
                            <div className="grid gap-2">
                                {perDeck.map(({ deck, count, far }) => (
                                    <div key={deck.id} className="rounded-xl border bg-white px-4 py-3 flex items-center justify-between gap-3" style={{ borderColor: C.line }}>
                                        <div>
                                            <div className="text-[14px] font-bold" style={{ color: C.ink }}>{deck.name}</div>
                                            <div className="text-[11.5px]" style={{ color: C.sub }}>練習した表現 {count}{deck.dynamic ? '' : ` / ${deck.count.toLocaleString()}`} ・ 30日間隔になった表現 {far}</div>
                                        </div>
                                        {deck.detailHref && <Link href={deck.detailHref} className="shrink-0 text-[12px] font-bold" style={{ color: C.deepGold }}>教材のページ</Link>}
                                    </div>
                                ))}
                                {courseLearned > 0 && (
                                    <div className="rounded-xl border bg-white px-4 py-3 flex items-center justify-between gap-3" style={{ borderColor: C.line }}>
                                        <div>
                                            <div className="text-[14px] font-bold" style={{ color: C.ink }}>百日課程の海図</div>
                                            <div className="text-[11.5px]" style={{ color: C.sub }}>「言えた」にした表現 {courseLearned} / 1,000(百日課程ページの記録。ここで「すぐ言えた」にした分も含む)</div>
                                        </div>
                                        <Link href="/english/course" className="shrink-0 text-[12px] font-bold" style={{ color: C.deepGold }}>海図を見る</Link>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    <div className="mt-8">
                        <button
                            type="button"
                            onClick={() => setShowHistory(v => !v)}
                            aria-expanded={showHistory}
                            className={`w-full rounded-xl border bg-white px-4 py-3 text-left text-[13px] font-bold flex items-center justify-between ${FOCUS}`}
                            style={{ borderColor: C.line, color: C.ink }}
                        >
                            詳しい履歴(直近30日)
                            <span style={{ color: C.faint }}>{showHistory ? '閉じる' : '開く'}</span>
                        </button>
                        {showHistory && (
                            <div className="mt-2 rounded-xl border bg-white overflow-hidden" style={{ borderColor: C.line }}>
                                {history.length === 0 ? (
                                    <div className="px-4 py-3 text-[12.5px]" style={{ color: C.sub }}>直近30日の記録はありません。</div>
                                ) : (
                                    <table className="w-full text-[12.5px]" style={{ borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ background: '#FAFAF9', color: C.faint }}>
                                                <th className="text-left px-3 py-2 font-bold">日付</th>
                                                <th className="text-right px-2 py-2 font-bold">問</th>
                                                <th className="text-right px-2 py-2 font-bold">すぐ</th>
                                                <th className="text-right px-2 py-2 font-bold">迷</th>
                                                <th className="text-right px-2 py-2 font-bold">出ず</th>
                                                <th className="text-right px-3 py-2 font-bold">新規</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.map(r => (
                                                <tr key={r.date} style={{ borderTop: `1px solid ${C.line}`, color: C.body }}>
                                                    <td className="px-3 py-2">{r.date.slice(5).replace('-', '/')}({weekdayOf(r.date)})</td>
                                                    <td className="text-right px-2 py-2 font-bold" style={{ color: C.ink }}>{r.log.reviewed}</td>
                                                    <td className="text-right px-2 py-2">{r.log.good}</td>
                                                    <td className="text-right px-2 py-2">{r.log.hard}</td>
                                                    <td className="text-right px-2 py-2">{r.log.again}</td>
                                                    <td className="text-right px-3 py-2">{r.log.newCards}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}

            <Footnote>
                この記録はこの端末のブラウザの中にだけあります。別の端末には引き継がれません。
                「すぐ言えた」の回数は自分の感覚の記録で、英語力や習得を保証するものではありません。
            </Footnote>
        </PageShell>
    );
}

function daysDiff(a: string, b: string): number {
    const [ay, am, ad] = a.split('-').map(Number);
    const [by, bm, bd] = b.split('-').map(Number);
    return Math.round((new Date(by, bm - 1, bd).getTime() - new Date(ay, am - 1, ad).getTime()) / 86400000);
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
    return (
        <div className="rounded-xl border bg-white px-4 py-3" style={{ borderColor: C.line }}>
            <div className="text-[10px] font-bold tracking-widest" style={{ color: C.faint }}>{label}</div>
            <div className="text-[20px] font-black leading-tight mt-0.5" style={{ color: C.ink }}>{value}</div>
            {sub && <div className="text-[11px] leading-snug mt-1" style={{ color: C.sub }}>{sub}</div>}
        </div>
    );
}
