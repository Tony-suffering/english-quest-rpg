'use client';

/**
 * 今日の練習(とにおラボの玄関)
 *
 * 開いて最初に押すものを1つにする。
 *   - 初めての人     : 練習をはじめる(5問だけ)
 *   - 途中でやめた人 : 続きから
 *   - 今日まだの人   : 今日の練習をはじめる(復習 n + 新しい表現 m)
 *   - 今日終えた人   : 今日はここまで(もう1セットは選べる)
 *
 * 教材の選択、耳の診断、説明の閲覧は始める条件にしない。
 * 保存は端末内だけ(src/lib/english/practice/engine.ts)。
 */

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
    loadState, loadCards, loadLog, summarize, localToday, newBudgetFor, type PracticeState, type PracticeSummary,
} from '@/lib/english/practice/engine';
import { getDeck } from '@/lib/english/practice/decks';
import { PageShell, Kicker, Card, Button, Footnote, Skeleton, C } from '@/components/english/public/ui';

export default function EnglishHome() {
    const [state, setState] = useState<PracticeState | null>(null);
    const [summary, setSummary] = useState<PracticeSummary | null>(null);

    useEffect(() => {
        const s = loadState();
        const cards = loadCards();
        const log = loadLog();
        setState(s);
        setSummary(summarize(cards, log, localToday()));
        try { if (!localStorage.getItem('tl_welcome_seen')) localStorage.setItem('tl_welcome_seen', 'true'); } catch { /* noop */ }
    }, []);

    const today = localToday();
    const deck = getDeck(state?.deck ?? 'course') ?? getDeck('course')!;

    const view = useMemo(() => {
        if (!state || !summary) return null;
        const session = state.session;
        const remaining = session ? session.keys.filter(k => !session.results[k]).length : 0;
        const inProgress = !!session && remaining > 0 && session.keys.length > 0;
        const budget = newBudgetFor(state, today, false);
        const firstTime = summary.totalCards === 0 && summary.activeDays === 0;
        const nothingLeft = summary.dueCount === 0 && budget === 0;
        return { session, remaining, inProgress, budget, firstTime, nothingLeft };
    }, [state, summary, today]);

    return (
        <PageShell>
            <Kicker>TONIO LAB ・ 英語の練習</Kicker>
            <h1 className="text-[26px] md:text-[30px] font-black leading-snug tracking-tight mb-3" style={{ color: C.ink }}>
                知っている英語を、<br />会話で出るようにする。
            </h1>
            <p className="text-[13.5px] leading-relaxed mb-6" style={{ color: C.body }}>
                単語や文法は勉強したのに、会話になると出てこない。そういう人のための1日5分の練習です。
                日本語を見て英語を思い出し、答えを確かめて、自分で評価する。思い出せなかった表現は、後日もう一度出ます。
            </p>

            {!view ? (
                <Skeleton h={190} />
            ) : view.inProgress ? (
                <Card className="p-5" accent={C.gold}>
                    <div className="text-[11px] font-bold tracking-widest mb-1" style={{ color: C.deepGold }}>途中のセットがあります</div>
                    <div className="text-[18px] font-black mb-1" style={{ color: C.ink }}>残り {view.remaining} 問</div>
                    <div className="text-[12.5px] mb-4" style={{ color: C.sub }}>前回の続きから始められます。</div>
                    <Button href="/english/today">続きから</Button>
                    <div className="mt-2">
                        <Button href="/english/today?restart=1" variant="ghost" size="md">最初からやり直す</Button>
                    </div>
                </Card>
            ) : view.firstTime ? (
                <Card className="p-5" accent={C.gold}>
                    <div className="text-[11px] font-bold tracking-widest mb-1" style={{ color: C.deepGold }}>はじめての人へ</div>
                    <div className="text-[18px] font-black mb-1" style={{ color: C.ink }}>まずは5問だけ。3分ほどで終わります</div>
                    <div className="text-[12.5px] leading-relaxed mb-4" style={{ color: C.sub }}>
                        教材は「{deck.name}」から始まります。設定も登録もいりません。あとから教材は変えられます。
                    </div>
                    <Button href="/english/today">練習をはじめる</Button>
                </Card>
            ) : view.nothingLeft ? (
                <Card className="p-5" accent={C.green}>
                    <div className="text-[11px] font-bold tracking-widest mb-1" style={{ color: C.deepGreen }}>今日はここまで</div>
                    <div className="text-[18px] font-black mb-1" style={{ color: C.ink }}>
                        今日は {summary!.today.reviewed} 問 練習しました
                    </div>
                    <div className="text-[12.5px] leading-relaxed mb-4" style={{ color: C.sub }}>
                        すぐ言えた {summary!.today.good} ・ 少し迷った {summary!.today.hard} ・ 出てこなかった {summary!.today.again}。
                        復習は明日以降に出ます。
                    </div>
                    <Button href="/english/record" variant="outline">記録を見る</Button>
                    <div className="mt-2">
                        <Button href="/english/today?extra=1" variant="ghost" size="md">もう1セットやる(新しい表現を追加)</Button>
                    </div>
                </Card>
            ) : (
                <Card className="p-5" accent={C.gold}>
                    <div className="text-[11px] font-bold tracking-widest mb-1" style={{ color: C.deepGold }}>
                        {summary!.today.reviewed > 0 ? '今日の続き' : '今日の練習'}
                    </div>
                    <div className="text-[18px] font-black mb-1" style={{ color: C.ink }}>
                        復習 {Math.min(summary!.dueCount, 10)} 問{view.budget > 0 ? ` ＋ 新しい表現 ${view.budget} 問` : ''}
                    </div>
                    <div className="text-[12.5px] leading-relaxed mb-4" style={{ color: C.sub }}>
                        {summary!.dueCount > 10 ? `復習待ちは全部で ${summary!.dueCount} 問。1セット10問ずつ出ます。` : '前に迷った表現を先に出し、そのあと新しい表現が続きます。'}
                    </div>
                    <Button href="/english/today">{summary!.today.reviewed > 0 ? '続けて練習する' : '今日の練習をはじめる'}</Button>
                </Card>
            )}

            {/* いまの教材 */}
            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3" style={{ borderColor: C.line }}>
                <div className="min-w-0">
                    <div className="text-[10px] font-bold tracking-widest" style={{ color: C.faint }}>いまの教材</div>
                    <div className="text-[14px] font-bold truncate" style={{ color: C.ink }}>{deck.name}<span className="font-medium text-[12px] ml-2" style={{ color: C.sub }}>{deck.tagline}</span></div>
                </div>
                <Link href="/english/materials" className="shrink-0 text-[12.5px] font-bold" style={{ color: C.deepGold }}>教材を変える</Link>
            </div>

            {/* 今日の数字(やった日だけ) */}
            {summary && summary.activeDays > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                    {[
                        ['今日', `${summary.today.reviewed} 問`],
                        ['復習待ち', `${summary.dueCount} 問`],
                        ['連続', `${summary.streak} 日`],
                    ].map(([k, v]) => (
                        <div key={k} className="rounded-xl border bg-white px-3 py-2.5 text-center" style={{ borderColor: C.line }}>
                            <div className="text-[10px] font-bold tracking-widest" style={{ color: C.faint }}>{k}</div>
                            <div className="text-[16px] font-black" style={{ color: C.ink }}>{v}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* 任意のもの */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Link href="/english/record" className="rounded-xl border bg-white px-4 py-3 hover:bg-[#FAFAF9]" style={{ borderColor: C.line, textDecoration: 'none' }}>
                    <div className="text-[13.5px] font-bold" style={{ color: C.ink }}>記録を見る</div>
                    <div className="text-[12px]" style={{ color: C.sub }}>今日の量、最近の日、復習する表現</div>
                </Link>
                <Link href="/english/ear" className="rounded-xl border bg-white px-4 py-3 hover:bg-[#FAFAF9]" style={{ borderColor: C.line, textDecoration: 'none' }}>
                    <div className="text-[13.5px] font-bold" style={{ color: C.ink }}>耳の診断(任意・5分)</div>
                    <div className="text-[12px]" style={{ color: C.sub }}>速度と雑音をどこまで上げても聞けるか測る</div>
                </Link>
            </div>

            <Footnote>
                無料・登録不要。練習の記録はこの端末のブラウザの中にだけ保存されます。別の端末には引き継がれません。
                ブラウザのデータを消すと記録も消えます。詳しくは <Link href="/english/info" style={{ color: C.deepGold }}>使い方・案内</Link>。
            </Footnote>
        </PageShell>
    );
}
