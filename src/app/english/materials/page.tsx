'use client';

/**
 * 教材
 *
 * 上: 「今日の練習」に流せる会話の教材。おすすめは1つだけ(百日課程)。
 * 下: 目的がちがう教材(TOEIC / 英検の英作文)、読む・聞く、ほかの練習ツール。
 * 既存のページのURLと進捗はそのまま。ここは入口を整理するだけ。
 */

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loadState, loadCards, setDeck, type PracticeState, type PracticeCard } from '@/lib/english/practice/engine';
import { DECKS, readMyPhrases, type DeckDef } from '@/lib/english/practice/decks';
import { PageShell, Kicker, H1, H2, Card, Button, LinkRow, Footnote, Skeleton, C, FOCUS } from '@/components/english/public/ui';

const EXAM = [
    { href: '/english/toeic', title: '居酒屋TOEIC', desc: '30日の物語を読みながらTOEICの語彙と文法を入れる。300例文と310単語。' },
    { href: '/english/writepass', title: 'ライトパス(英検1級 英作文)', desc: '意見論述と要約の模範解答を1日1本写す30日。全文を型に分解した表つき。' },
    { href: '/english/write', title: '英作文の型', desc: '意見の論点10個と要約の型5つ。埋めるのは名詞と動詞だけ。' },
];

const READ_LISTEN = [
    { href: '/english/newspaper', title: 'The Tonio Times(英字新聞)', desc: 'A4一枚の英字新聞。文をタップすると日本語が出る。読み上げつき。' },
    { href: '/english/ear', title: '耳の診断(任意・5分)', desc: '速度と雑音を10段まで上げて、文が保てなくなる段を出す。練習に必須ではありません。' },
    { href: '/english/harvest', title: 'Movie Harvest', desc: '映画の名セリフ10個を分解して覚える。' },
];

const LAB = [
    { href: '/english/5min', title: '5分トーク', desc: 'レベル別の短い会話練習' },
    { href: '/english/my-training', title: 'Daily Training', desc: '登録した表現の選択式ドリル' },
    { href: '/english/dictation', title: '聞き取りディクテーション', desc: '速い崩れた音を聞いて打つ' },
    { href: '/english/interpret', title: '同時通訳ジム', desc: '日本語を見て3秒で英語を口に' },
    { href: '/english/reflex', title: '3秒で返せ', desc: '相手の一言に3秒で返す' },
    { href: '/english/story', title: '物語没入チャット', desc: '短い物語をチャットで読み進める' },
    { href: '/english/survival', title: '修羅場英会話', desc: '欠航・激痛。崩れた英語でその場を切り抜ける' },
    { href: '/english/jp-yt', title: '罪悪感ゼロ英語', desc: '日本語YouTubeの言葉を英語に' },
    { href: '/english/story-vocab', title: '呪術廻戦で英検準1級', desc: '物語に単語を乗せる' },
    { href: '/english/everyday-words', title: '日常の単語', desc: '家・台所・育児など場面別' },
    { href: '/english/training', title: 'カードゲーム版トレーニング', desc: 'ガチャとカードで覚える版。ゲーム要素が多め' },
];

export default function MaterialsPage() {
    const router = useRouter();
    const [state, setState] = useState<PracticeState | null>(null);
    const [cards, setCards] = useState<Record<string, PracticeCard>>({});
    const [mineCount, setMineCount] = useState(0);
    const [showLab, setShowLab] = useState(false);

    useEffect(() => {
        setState(loadState());
        setCards(loadCards());
        setMineCount(readMyPhrases().length);
    }, []);

    const practiced = useMemo(() => {
        const m: Record<string, number> = {};
        for (const c of Object.values(cards)) m[c.deck] = (m[c.deck] ?? 0) + 1;
        return m;
    }, [cards]);

    const decks = DECKS.filter(d => !d.dynamic || mineCount > 0);

    const choose = (d: DeckDef) => {
        const s = state ?? loadState();
        const next = setDeck(s, d.id);
        setState(next);
        router.push('/english/today');
    };

    return (
        <PageShell>
            <Kicker>TONIO LAB ・ 教材</Kicker>
            <H1 sub="会話の教材はどれを選んでも、同じ「今日の練習」で出ます。まず1つ。あとで変えられます。">練習したい内容を選ぶ</H1>

            <H2 note="日本語を見て英語を思い出す練習">会話の表現</H2>
            {!state ? <Skeleton h={220} /> : (
                <div className="grid gap-3">
                    {decks.map(d => {
                        const active = state.deck === d.id;
                        const total = d.dynamic ? mineCount : d.count;
                        const done = practiced[d.id] ?? 0;
                        return (
                            <Card key={d.id} className="p-4 md:p-5" accent={active ? C.gold : d.recommended ? C.green : undefined}>
                                <div className="flex items-start justify-between gap-3 mb-1">
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            {active && <span className="rounded-md px-2 py-0.5 text-[10px] font-black tracking-wider" style={{ background: '#FFFBEB', color: C.deepGold }}>いまの教材</span>}
                                            {d.recommended && !active && <span className="rounded-md px-2 py-0.5 text-[10px] font-black tracking-wider" style={{ background: '#ECFDF5', color: C.deepGreen }}>まずはこれ</span>}
                                        </div>
                                        <div className="text-[17px] font-black leading-tight" style={{ color: C.ink }}>{d.name}</div>
                                        <div className="text-[12.5px] font-medium mt-0.5" style={{ color: C.sub }}>{d.tagline}</div>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <div className="text-[10px] font-bold tracking-widest" style={{ color: C.faint }}>表現</div>
                                        <div className="text-[15px] font-black" style={{ color: C.ink }}>{total.toLocaleString()}</div>
                                    </div>
                                </div>
                                <p className="text-[13px] leading-relaxed mt-2 mb-2" style={{ color: C.body }}>{d.desc}</p>
                                <div className="text-[11.5px] mb-3" style={{ color: C.sub }}>
                                    目安: {d.level}{done > 0 && ` ・ 練習した表現 ${done}`}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <Button onClick={() => choose(d)} variant={active ? 'gold' : 'outline'} size="md">
                                        {active ? 'この教材で練習する' : 'この教材に切り替えて練習'}
                                    </Button>
                                    {d.detailHref && (
                                        <Button href={d.detailHref} variant="ghost" size="md">{d.detailLabel ?? '詳しく見る'}</Button>
                                    )}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}

            <H2 note="会話練習とは別の目的">試験対策</H2>
            <div className="grid gap-2">
                {EXAM.map(x => <LinkRow key={x.href} {...x} />)}
            </div>

            <H2>読む・聞く</H2>
            <div className="grid gap-2">
                {READ_LISTEN.map(x => <LinkRow key={x.href} {...x} />)}
            </div>

            <div className="mt-8">
                <button
                    type="button"
                    onClick={() => setShowLab(v => !v)}
                    aria-expanded={showLab}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-left text-[13px] font-bold flex items-center justify-between ${FOCUS}`}
                    style={{ borderColor: C.line, color: C.ink }}
                >
                    ほかの練習ツール(実験版・{LAB.length}本)
                    <span style={{ color: C.faint }}>{showLab ? '閉じる' : '開く'}</span>
                </button>
                {showLab && (
                    <div className="grid gap-2 mt-2">
                        {LAB.map(x => <LinkRow key={x.href} {...x} />)}
                    </div>
                )}
            </div>

            <Footnote>
                どの教材も無料・登録不要。それぞれのページの進捗は、そのページの中に保存されています。
                作者の記録や読み物は <Link href="/english/info" style={{ color: C.deepGold }}>使い方・案内</Link> にまとめています。
            </Footnote>
        </PageShell>
    );
}
