'use client';

// CHUNK RANKING の入口。データ表ではなく、なぜこれが要るのかを見せる場所。
// 表そのものは /english/corpus/list、作り方は /english/corpus/report。
//
// 数字は全部実測。誇張するのは言い方だけで、値はいじらない。
// この商品の売りが「推測が入っていないこと」なので、そこを盛ったら商品が消える。

import Link from 'next/link';
import { CHUNK_STATS, COVERAGE_CURVE, TIER_LABELS } from '@/data/english/chunk-ranking';
import { GLOSS_COUNT } from '@/data/english/chunk-gloss';

/** 実測値。出典は docs/chunk-corpus-spec.md と corpus-search の実行結果 */
const FACTS = {
    nativeWords: 150_000_000, // 20歳までに浴びる語数の推定
    learnerWords: 5_000_000, // 教材中心の学習者の生涯累計(推定)
    corpusWords: CHUNK_STATS.corpusWords,
    total: CHUNK_STATS.total,
};

/** レベル判定が壊れている証拠。すべて corpus-search の実測 */
const LEVEL_LIE = [
    { w: 'stick around', hits: 993, label: '上級 (B2)', real: true },
    { w: 'prudent', hits: 483, label: '英検1級', real: false },
    { w: 'ubiquitous', hits: 315, label: '英検1級', real: false },
    { w: 'meticulous', hits: 291, label: '英検1級', real: false },
    { w: 'albeit', hits: 260, label: '英検1級', real: false },
];

const LAYERS = [
    { n: '01', t: '会う順に並べる', d: '難しさではなく、一生で何回会うかの順。20歳のネイティブが何回聞いているかを実データから推定してあります。', c: 'bg-amber-500' },
    { n: '02', t: '日本語をあてる', d: '直訳しません。その場面で日本人が実際に言う言い方をあてます。good luck は「がんばって」。', c: 'bg-emerald-500' },
    { n: '03', t: '言えない理由を書く', d: '知っているのに出てこないのは、別の語で代用できるから。figure out の代わりに understand と言ってしまう癖を名指します。', c: 'bg-sky-500' },
    { n: '04', t: '主な意味だけ教える', d: 'take off には3つ意味がありますが、実データでは出発が主で「脱ぐ」は4番目。全部教えると全部忘れます。', c: 'bg-violet-500' },
    { n: '05', t: '本物の音を聞かせる', d: '実際にその表現を言っている動画の、その秒数へ飛べます。読んで分かることと聞いて分かることは別なので。', c: 'bg-rose-500' },
];

export default function CorpusLandingPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* ヒーロー */}
            <section className="relative overflow-hidden border-b border-stone-200">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-emerald-50" />
                <div className="relative max-w-5xl mx-auto px-5 py-20 sm:py-28">
                    <div className="text-xs tracking-[0.3em] text-stone-400 font-medium mb-6">CHUNK RANKING</div>
                    <h1 className="text-4xl sm:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15]">
                        英語が使えないのは
                        <br />
                        才能でも
                        <span className="relative inline-block mx-2">
                            <span className="relative z-10">努力不足</span>
                            <span className="absolute left-0 right-0 top-1/2 h-1 bg-red-500 -rotate-2" />
                        </span>
                        でもない。
                    </h1>
                    <p className="mt-8 text-xl sm:text-2xl text-stone-700 font-medium leading-relaxed">
                        単に、<span className="text-emerald-700 font-bold">会っていない</span>だけです。
                    </p>
                    <p className="mt-6 text-stone-600 leading-loose max-w-2xl">
                        ネイティブが20歳までに浴びる英語は約1億5千万語。
                        教材中心の日本人は、生涯かけても500万語ほど。
                        <strong className="text-stone-900">30倍の差</strong>があります。
                        20年ぶん浴びた人と、半年ぶんしか浴びていない人が、同じ土俵に立たされている。
                        才能ではなく、これが理由です。
                    </p>

                    <div className="mt-12">
                        <KnownWordsDemo />
                    </div>

                    <div className="mt-10">
                        <GapChart />
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <Link
                            href="/english/corpus/level"
                            className="px-7 py-4 rounded-xl bg-stone-900 text-white font-bold hover:bg-stone-800 transition-all shadow-lg"
                        >
                            レベル1から始める
                        </Link>
                        <Link
                            href="/english/corpus/full"
                            className="px-7 py-4 rounded-xl border border-stone-300 bg-white text-stone-700 font-medium hover:bg-stone-50 transition-all"
                        >
                            絞る前の在庫を全部見る
                        </Link>
                        <Link
                            href="/english/corpus/report"
                            className="px-7 py-4 rounded-xl border border-stone-300 bg-white text-stone-700 font-medium hover:bg-stone-50 transition-all"
                        >
                            作り方と、まだ足りないところ
                        </Link>
                    </div>
                </div>
            </section>

            {/* 目的から入る */}
            <section className="border-b border-stone-200 bg-white">
                <div className="max-w-5xl mx-auto px-5 py-20">
                    <div className="text-xs tracking-[0.25em] text-stone-400 font-medium mb-4">あなたは英語で何がしたいですか</div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                        目的は違っても、
                        <br />
                        必要な中身はほぼ同じです。
                    </h2>

                    <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {PURPOSES.map((p) => (
                            <div key={p.t} className="rounded-xl border border-stone-200 bg-white p-4 hover:border-stone-400 transition-all">
                                <div className={`w-8 h-1.5 rounded-full ${p.c} mb-3`} />
                                <div className="font-bold text-stone-900 text-sm leading-snug">{p.t}</div>
                                <div className="mt-1.5 text-xs text-stone-500 leading-relaxed">{p.d}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex items-center justify-center">
                        <div className="text-stone-300 text-3xl">↓</div>
                    </div>
                    <p className="text-center text-xl sm:text-2xl font-bold text-stone-900 leading-relaxed">
                        全部の入口に、同じ問題があります。
                        <br />
                        <span className="text-emerald-700">「で、何を覚えればいいの？」</span>
                    </p>

                    <div className="mt-10">
                        <OneChunkAllPurposes />
                    </div>
                </div>
            </section>

            {/* 規模 */}
            <section className="border-b border-stone-200 bg-stone-900 text-white">
                <div className="max-w-5xl mx-auto px-5 py-16">
                    <div className="text-[11px] tracking-[0.25em] text-stone-400 font-medium mb-3">数えた量</div>
                    <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="text-5xl sm:text-7xl font-bold tabular-nums leading-none">
                            {Math.round(FACTS.corpusWords / 10000).toLocaleString()}
                        </span>
                        <span className="text-2xl sm:text-3xl font-bold text-stone-300">万語</span>
                    </div>

                    <p className="mt-6 text-lg sm:text-xl text-stone-200 leading-relaxed max-w-2xl">
                        これは、<strong className="text-amber-300">ネイティブが20歳になるまでに浴びる英語の86%</strong>にあたります。
                        20年ぶんを、ほぼまるごと数え終えたということです。
                    </p>

                    <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-stone-700 rounded-2xl overflow-hidden">
                        {[
                            { v: '1,427', u: '冊', k: '英語の小説に換算すると' },
                            { v: '8,559', u: '本', k: '映画の脚本に換算すると' },
                            { v: '35', u: '年', k: '毎日1万語ずつ読んでも' },
                            { v: FACTS.total.toLocaleString(), u: '個', k: '会う順に並べた表現' },
                        ].map((x) => (
                            <div key={x.k} className="bg-stone-900 px-5 py-6">
                                <div className="text-[11px] text-stone-400 leading-snug mb-2">{x.k}</div>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-3xl font-bold tabular-nums">{x.v}</span>
                                    <span className="text-sm text-stone-400">{x.u}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 rounded-xl border border-stone-700 bg-stone-800 px-6 py-5">
                        <p className="text-stone-100 leading-relaxed">
                            中身の6割は、<strong className="text-amber-300">みんなが実際に観ている映画とドラマの台詞</strong>です。
                            残りは素の会話と講演。例文はひとつも作っていません。
                            机の上の英語ではなく、画面から実際に飛んでくる英語を数えました。
                        </p>
                    </div>
                </div>
            </section>

            {/* レベルの嘘 */}
            <section className="border-b border-stone-200">
                <div className="max-w-5xl mx-auto px-5 py-20">
                    <div className="text-xs tracking-[0.25em] text-stone-400 font-medium mb-4">なぜ今まで上達しなかったのか</div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                        あなたが覚えた「上級単語」は
                        <br />
                        ネイティブがほとんど使いません。
                    </h2>
                    <p className="mt-6 text-stone-600 leading-loose max-w-2xl">
                        世の中のレベル判定は「単語の珍しさ」で決まっています。
                        <strong className="text-stone-900">実際に何回耳に入るかは、誰も測っていません。</strong>
                        だから本当によく出る言い回しが「上級」に飛ばされ、めったに聞かない単語が必修になります。
                    </p>

                    <div className="mt-10">
                        <LevelChart />
                    </div>

                    <p className="mt-6 text-sm text-stone-500 leading-relaxed">
                        すべて1億2,839万語の実データを数えた結果です。
                        stick around は英検1級単語の2〜4倍出てきます。
                        それでも「上級」に置かれています。
                    </p>
                </div>
            </section>

            {/* 終わりがある */}
            <section className="border-b border-stone-200 bg-stone-50">
                <div className="max-w-5xl mx-auto px-5 py-20">
                    <div className="text-xs tracking-[0.25em] text-stone-400 font-medium mb-4">この教材だけが言えること</div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                        「どこまでやれば終わりか」を
                        <br />
                        数字で言い切ります。
                    </h2>
                    <p className="mt-6 text-stone-600 leading-loose max-w-2xl">
                        英語の本もアプリもスクールも、終わりを教えてくれません。
                        いつも「まだ足りない」と言う。当たり前で、終わりを見せたら次が売れないからです。
                        でも学習者を一番殺すのは難しさではなく、<strong className="text-stone-900">ゴールが見えないこと</strong>です。
                    </p>

                    <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-6">
                        <CoverageChart />
                    </div>
                </div>
            </section>

            {/* 5層 */}
            <section className="border-b border-stone-200">
                <div className="max-w-5xl mx-auto px-5 py-20">
                    <div className="text-xs tracking-[0.25em] text-stone-400 font-medium mb-4">1つの表現に、5つの情報</div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                        辞書でも単語帳でもありません。
                    </h2>

                    <div className="mt-10 space-y-3">
                        {LAYERS.map((l) => (
                            <div key={l.n} className="flex gap-5 rounded-2xl border border-stone-200 bg-white p-5 hover:border-stone-300 transition-all">
                                <div className={`shrink-0 w-1.5 rounded-full ${l.c}`} />
                                <div className="shrink-0 w-10 text-xl font-bold text-stone-300 tabular-nums">{l.n}</div>
                                <div>
                                    <div className="font-bold text-stone-900 text-lg">{l.t}</div>
                                    <div className="mt-1.5 text-sm text-stone-600 leading-relaxed">{l.d}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                        <div className="text-sm font-bold text-emerald-900 mb-2">実例つき</div>
                        <p className="text-sm text-stone-700 leading-relaxed">
                            いま {GLOSS_COUNT} 個の表現に日本語訳と「言えない理由」が付いています。
                            上位4,000表現には、実際にその言葉を言っている動画の秒数へのリンクが付いています。
                            音声も動画も保存していません。秒数だけ持っているので、押せばその瞬間から再生されます。
                        </p>
                    </div>
                </div>
            </section>

            {/* 層 */}
            <section className="border-b border-stone-200 bg-stone-50">
                <div className="max-w-5xl mx-auto px-5 py-20">
                    <div className="text-xs tracking-[0.25em] text-stone-400 font-medium mb-4">どこから始めるか</div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                        上から順にやるだけです。
                    </h2>
                    <p className="mt-6 text-stone-600 leading-loose max-w-2xl">
                        並び順が、そのまま学ぶ順です。難易度で悩む必要はありません。
                        一番上は一生で10万回会う表現、下に行くほど会う回数が減ります。
                    </p>

                    <div className="mt-10 grid sm:grid-cols-3 gap-4">
                        {TIER_LABELS.slice(0, 3).map((t, i) => (
                            <div key={t.name} className="rounded-2xl border border-stone-200 bg-white p-5">
                                <div className="text-[11px] tracking-wider text-stone-400 mb-1">第{i + 1}層</div>
                                <div className="text-2xl font-bold text-stone-900">{t.name}</div>
                                <div className="mt-1 text-3xl font-bold text-emerald-600 tabular-nums">
                                    {CHUNK_STATS.byTier[i].toLocaleString()}
                                </div>
                                <div className="text-xs text-stone-500 mt-2 leading-relaxed">{t.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 最後 */}
            <section>
                <div className="max-w-5xl mx-auto px-5 py-24 text-center">
                    <h2 className="text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                        あと何個やればいいのか、
                        <br />
                        答えられる教材は
                        <br className="sm:hidden" />
                        これだけです。
                    </h2>
                    <p className="mt-8 text-stone-600 leading-loose max-w-xl mx-auto">
                        全100レベル、1レベル50個。上から順にやるだけです。
                        レベル10で日常英語の2割、レベル40で3割、レベル100で半分近くが
                        すでに知っている塊で埋まります。
                        いきなり5万個を見る必要はありません。今日の50個だけ見てください。
                    </p>
                    <Link
                        href="/english/corpus/level"
                        className="mt-10 inline-block px-10 py-5 rounded-xl bg-stone-900 text-white text-lg font-bold hover:bg-stone-800 transition-all shadow-xl"
                    >
                        レベル1から始める
                    </Link>
                    <div className="mt-4">
                        <Link href="/english/corpus/level" className="text-sm text-stone-500 underline underline-offset-4 hover:text-stone-800">
                            自分のレベルを診断する
                        </Link>
                    </div>
                    <div className="mt-6 text-sm text-stone-500">
                        1億2,839万語を数えた実測値。作った例文はひとつもありません
                    </div>
                </div>
            </section>
        </div>
    );
}


/**
 * 初級者に一番効く実演。
 * よく出る表現ほど、使われている単語は全部やさしい。
 * 「難しい単語を知らないから話せない」という思い込みを、目で壊す。
 */
const DEMO = [
    { p: ['what', 'are', 'you', 'talking', 'about'], ja: '何の話してんの', hits: 4568 },
    { p: ['figure', 'out'], ja: '考えてわかる', hits: 10680 },
    { p: ['stick', 'around'], ja: 'ここにいて', hits: 993 },
    { p: ['at', 'the', 'end', 'of', 'the', 'day'], ja: '結局のところ', hits: 2136 },
];

function KnownWordsDemo() {
    return (
        <div className="rounded-2xl border-2 border-stone-900 bg-white p-6 sm:p-8 shadow-xl">
            <div className="text-[11px] tracking-[0.2em] text-stone-400 font-medium mb-1">ここが問題の核心</div>
            <div className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                使われている単語は、
                <span className="text-emerald-600">全部知っています。</span>
            </div>
            <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                よく出る表現ほど、中身は中学英語です。それでも口からは出ません。
            </p>

            <div className="mt-7 space-y-5">
                {DEMO.map((d) => (
                    <div key={d.ja} className="border-t border-stone-100 pt-5 first:border-0 first:pt-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                            {d.p.map((w, i) => (
                                <span
                                    key={i}
                                    className="px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono text-base sm:text-lg font-medium"
                                >
                                    {w}
                                </span>
                            ))}
                        </div>
                        <div className="mt-2.5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                            <span className="text-stone-900 font-bold text-lg">{d.ja}</span>
                            <span className="text-xs text-stone-500">
                                一生で <strong className="text-stone-800 tabular-nums">{d.hits.toLocaleString()}</strong> 回耳に入ります
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-7 rounded-xl bg-stone-900 px-5 py-4">
                <p className="text-white text-sm sm:text-base leading-relaxed">
                    知らないのは<strong className="text-amber-300">単語</strong>ではなく、
                    <strong className="text-amber-300">組み合わせ</strong>です。
                    そして組み合わせは、数えれば有限です。
                </p>
            </div>
        </div>
    );
}


/**
 * 目的別の入口。
 *
 * 商品を「英会話教材」にすると、市場を自分で狭めることになる。
 * 話したい人も、ドラマを字幕なしで見たい人も、洋書を読みたい人も、
 * TOEICを楽にしたい人も、入口は違うが下にある在庫はほぼ同じ。
 * だから入口だけ分けて、行き先は同じ課程にする。
 */
const PURPOSES = [
    { t: '話せるようになりたい', d: '自分の口から自然に出る', c: 'bg-emerald-500' },
    { t: 'ドラマを字幕なしで見たい', d: 'セリフがそのまま入ってくる', c: 'bg-rose-500' },
    { t: '聞き取れるようになりたい', d: '実際の速さの英語が分かる', c: 'bg-sky-500' },
    { t: '洋書や記事を読みたい', d: '自然な英語が引っかからない', c: 'bg-amber-500' },
    { t: '海外で困りたくない', d: '現地で飛んでくる英語が分かる', c: 'bg-violet-500' },
    { t: '仕事で使いたい', d: '会議とメールが通じる', c: 'bg-teal-500' },
    { t: '洋楽の歌詞が分かるように', d: '歌詞が意味として入る', c: 'bg-pink-500' },
    { t: 'TOEICや英検を楽にしたい', d: '読む速さそのものが上がる', c: 'bg-stone-500' },
];

/** 1つの塊が、目的の全部に同時に効くことを見せる */
function OneChunkAllPurposes() {
    return (
        <div className="rounded-2xl border-2 border-stone-900 bg-white p-6 sm:p-8">
            <div className="text-[11px] tracking-[0.2em] text-stone-400 font-medium mb-2">たとえば、この1つを覚えると</div>
            <div className="font-mono text-3xl sm:text-4xl font-bold text-stone-900">snap out of it</div>
            <div className="mt-2 text-lg text-stone-700 font-bold">しっかりしろ / 立ち直れ</div>

            <div className="mt-7 grid sm:grid-cols-2 gap-3">
                {[
                    ['話す', '落ち込んでる友達に、そのまま言える', 'bg-emerald-500'],
                    ['聞く', 'ドラマで飛んできても止まらない', 'bg-rose-500'],
                    ['読む', '小説や記事で引っかからない', 'bg-amber-500'],
                    ['観る', '字幕を見ずに意味が入る', 'bg-sky-500'],
                ].map(([k, v, c]) => (
                    <div key={k} className="flex items-center gap-3 rounded-xl bg-stone-50 border border-stone-200 px-4 py-3">
                        <span className={`shrink-0 w-11 h-11 rounded-lg ${c} text-white font-bold flex items-center justify-center`}>
                            {k}
                        </span>
                        <span className="text-sm text-stone-700 leading-snug">{v}</span>
                    </div>
                ))}
            </div>

            <div className="mt-6 rounded-xl bg-stone-900 px-5 py-4">
                <p className="text-white text-sm sm:text-base leading-relaxed">
                    塊はひとつ覚えると<strong className="text-amber-300">4つ全部に効きます</strong>。
                    話す用の英語と読む用の英語が別にあるわけではないからです。
                </p>
            </div>
        </div>
    );
}

/** 入力量の差。棒2本だけで30倍を見せる */
function GapChart() {
    const nat = FACTS.nativeWords;
    const lea = FACTS.learnerWords;
    return (
        <div className="rounded-2xl border border-stone-200 bg-white/80 backdrop-blur p-6">
            <div className="text-[11px] tracking-wider text-stone-400 mb-4">20歳までに浴びる英語の量</div>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between items-baseline mb-1.5">
                        <span className="text-sm font-bold text-stone-900">ネイティブ</span>
                        <span className="text-sm font-bold text-stone-900 tabular-nums">1億5,000万語</span>
                    </div>
                    <div className="h-8 rounded-lg bg-emerald-500" style={{ width: '100%' }} />
                </div>
                <div>
                    <div className="flex justify-between items-baseline mb-1.5">
                        <span className="text-sm font-bold text-stone-900">あなた（教材中心）</span>
                        <span className="text-sm font-bold text-stone-900 tabular-nums">500万語</span>
                    </div>
                    <div className="h-8 rounded-lg bg-stone-300" style={{ width: `${Math.max(1.2, (lea / nat) * 100)}%` }} />
                </div>
            </div>
            <div className="mt-4 text-sm text-stone-600">
                差は <strong className="text-stone-900 text-lg">30倍</strong>。埋めるべきは才能ではなく、この面積です。
            </div>
        </div>
    );
}

/** レベル判定が壊れている証拠 */
function LevelChart() {
    const max = Math.max(...LEVEL_LIE.map((d) => d.hits));
    return (
        <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <div className="flex items-baseline justify-between mb-5 flex-wrap gap-2">
                <div className="text-[11px] tracking-wider text-stone-400">一生で耳に入る回数（実測）</div>
                <div className="text-[11px] text-stone-400">1億2,839万語を数えた結果</div>
            </div>
            <div className="space-y-4">
                {LEVEL_LIE.map((d) => (
                    <div key={d.w}>
                        <div className="flex justify-between items-baseline mb-1.5 gap-3">
                            <span className={`font-mono text-sm ${d.real ? 'font-bold text-stone-900' : 'text-stone-600'}`}>{d.w}</span>
                            <span className="flex items-center gap-2 shrink-0">
                                <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                                        d.real ? 'bg-red-50 text-red-700 border-red-200' : 'bg-stone-100 text-stone-500 border-stone-200'
                                    }`}
                                >
                                    {d.label}
                                </span>
                                <span className="text-sm font-bold text-stone-900 tabular-nums w-14 text-right">{d.hits}回</span>
                            </span>
                        </div>
                        <div className="h-6 rounded-md bg-stone-100 overflow-hidden">
                            <div
                                className={`h-full rounded-md ${d.real ? 'bg-emerald-500' : 'bg-stone-300'}`}
                                style={{ width: `${(d.hits / max) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-5 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-stone-800 leading-relaxed">
                一番よく出てくる <strong>stick around</strong> が、一番「難しい」ことになっています。
                測っているものが違うからです。
            </div>
        </div>
    );
}

/** 上位N件で何割を覆うか */
function CoverageChart() {
    const W = 900;
    const H = 240;
    const PAD = { l: 46, r: 20, t: 16, b: 34 };
    const pts = COVERAGE_CURVE;
    if (!pts.length) return null;

    const maxN = pts[pts.length - 1][0];
    const x = (n: number) => PAD.l + (Math.log10(n) / Math.log10(maxN)) * (W - PAD.l - PAD.r);
    const y = (p: number) => H - PAD.b - (p / 100) * (H - PAD.t - PAD.b);
    const line = pts.map(([n, p], i) => `${i ? 'L' : 'M'}${x(n).toFixed(1)},${y(p).toFixed(1)}`).join(' ');
    const area = `${line} L${x(maxN).toFixed(1)},${y(0)} L${x(pts[0][0]).toFixed(1)},${y(0)} Z`;
    const marks = pts.filter(([n]) => n === 500 || n === 2000 || n === 5000);

    return (
        <>
            <div className="overflow-x-auto">
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[520px]" role="img" aria-label="上位N件で覆える割合">
                    <defs>
                        <linearGradient id="lpCov" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
                        </linearGradient>
                    </defs>
                    {[0, 25, 50, 75, 100].map((p) => (
                        <g key={p}>
                            <line x1={PAD.l} y1={y(p)} x2={W - PAD.r} y2={y(p)} stroke="#e7e5e4" strokeWidth="1" />
                            <text x={PAD.l - 8} y={y(p) + 4} textAnchor="end" fontSize="11" fill="#a8a29e">{p}%</text>
                        </g>
                    ))}
                    <path d={area} fill="url(#lpCov)" />
                    <path d={line} fill="none" stroke="#10B981" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                    {marks.map(([n, p]) => (
                        <g key={n}>
                            <line x1={x(n)} y1={y(p)} x2={x(n)} y2={H - PAD.b} stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 3" />
                            <circle cx={x(n)} cy={y(p)} r="5" fill="#D4AF37" />
                            <text x={x(n)} y={y(p) - 13} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1c1917">{p}%</text>
                        </g>
                    ))}
                    {[100, 500, 2000, 5000, 20000, 50000].map((n) => (
                        <text key={n} x={x(n)} y={H - PAD.b + 18} textAnchor="middle" fontSize="11" fill="#a8a29e">
                            {n >= 1000 ? `${n / 1000}k` : n}
                        </text>
                    ))}
                </svg>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
                {marks.map(([n, p]) => (
                    <div key={n} className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-center">
                        <div className="text-[11px] tracking-wider text-stone-500">上位 {n.toLocaleString()} 個</div>
                        <div className="text-3xl font-bold text-stone-900 mt-1 tabular-nums">{p}%</div>
                    </div>
                ))}
            </div>
        </>
    );
}
