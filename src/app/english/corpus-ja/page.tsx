'use client';

// 日本語表現ランキング — 紹介。
//
// 英語版(/english/corpus)は「英語の表現を、出会う回数の多い順に並べた表」。
// こちらはその逆側で、「日本語の表現を、口から出てくる回数の多い順に並べた表」。
//
// 英会話で詰まる原因は、英語を知らないことではなく日本語が先に出ること。
// 出てきた日本語を英語に変換しようとして、1対1で移せないから固まる。
// だったら日本語の側に索引を作って、出てきた日本語から引けるようにすればいい。
// 世に在る教材は全部「英語が入口」で、日本語が入口の表は存在しない。

import Link from 'next/link';
import {
    JA_CHUNK_STATS,
    JA_COVERAGE_CURVE,
    JA_KIND_LABELS,
    JA_TIER_LABELS,
} from '@/data/english/ja-chunk-ranking';
import {
    INTERPRETER_SEEDS,
    INTERPRETER_SOURCE,
    INTERPRETER_STATS,
} from '@/data/english/ja-interpreter-seed';

const N = (v: number) => v.toLocaleString();

/** 英語版と並べるための実測値。出典は docs/ja-corpus-spec.md */
const VS = [
    { label: 'コーパス', en: '3億3,374万語', ja: `${N(JA_CHUNK_STATS.corpusWords)}語`, note: '3つの語域を配合' },
    { label: 'うち素の会話', en: '2,386万語', ja: '4,411万語', note: 'YouTube の長尺トーク 3,182本' },
    { label: '表現の総数', en: '379,475', ja: N(JA_CHUNK_STATS.total), note: '絞る前の全在庫' },
    { label: '生涯遭遇回数', en: 'あり', ja: 'あり', note: '20歳までに浴びる1.5億語で換算。定数は英語と同じ' },
    { label: '実測の英訳', en: 'なし', ja: N(JA_CHUNK_STATS.aligned), note: '対訳280万ペアから掘った' },
    { label: '直訳不可度', en: 'なし', ja: 'あり', note: '英語側に無い軸' },
];

/** 実測。align.tsv から抜いた代表例 */
const TRANSLATABLE = [
    { ja: '火曜日', en: 'tuesday', v: 0.183 },
    { ja: 'ごめんね', en: 'sorry', v: 0.19 },
    { ja: '年前', en: 'years ago', v: 0.335 },
    { ja: '気の毒', en: 'sorry / poor', v: 0.4 },
    { ja: '基本的に', en: 'basically', v: 0.405 },
];

const UNTRANSLATABLE = [
    { ja: '立派', en: 'admirable / splendid / impressive', v: 0.95 },
    { ja: 'やる気', en: 'motivation / motivated / ambition', v: 0.9 },
    { ja: '根に持つ', en: 'hold a grudge', v: 0.571 },
    { ja: '別に', en: 'nothing / matter / really', v: 0.915 },
];

const FIXES = [
    ['基本形が「為る」「無い」になって読めない', 'orthBase を使う'],
    ['腹が立った と 腹が立つ が別の行になる', '末尾の活用だけ畳む'],
    ['だから / でも が1件も取れない', '複合辞を発話冒頭で1語に戻す'],
    ['やっぱり / むしろ が原理的に取れない', '1語を数える処理を足す'],
    ['逆に / 別に / 意外と が消える', '逐語形の生成条件を撤廃'],
    ['ということ が いうこと になる', '引用の と/って の直後を開始禁止に'],
    ['お疲れ様 が 疲れ様 になる', '接頭辞を開始禁止から外す'],
    ['「だと思う」が丸ごと消える', '内容語の判定を数える段から書き出す段へ'],
];

export default function CorpusJaPage() {
    return (
        <div className="min-h-screen bg-stone-50">
            <div className="max-w-5xl mx-auto px-5 py-12 sm:py-16">
                <div className="text-[11px] tracking-[0.2em] text-stone-400 font-medium">JAPANESE CORPUS</div>
                <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                    日本語表現ランキング
                </h1>
                <p className="mt-5 text-stone-700 leading-relaxed max-w-3xl">
                    英会話で詰まる原因は、英語を知らないことではない。日本語が先に出てくることだ。
                    出てきた日本語を英語に変換しようとして、名詞以外は1対1で移せないから固まる。
                    だったら日本語の側に索引を作ればいい。
                    <strong className="font-semibold text-stone-900">
                        口から出てくる日本語を、出てくる回数の多い順に並べて、実際に当たっていた英語を付けた表
                    </strong>
                    がこれ。世に在る教材は全部「英語が入口」で、日本語が入口の表は存在しない。
                </p>

                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        ['コーパス', `${(JA_CHUNK_STATS.corpusWords / 10000).toFixed(0)}万語`, '全部が素の会話'],
                        ['表現', N(JA_CHUNK_STATS.total), '絞る前の全在庫'],
                        ['実測の英訳', N(JA_CHUNK_STATS.aligned), `裏取り十分 ${N(JA_CHUNK_STATS.alignedSolid)}`],
                        ['浴びる層', N(JA_CHUNK_STATS.byTier[0]), '生涯3000回以上'],
                    ].map(([k, v, d]) => (
                        <div key={k} className="rounded-xl border border-stone-200 bg-white px-4 py-4">
                            <div className="text-[11px] tracking-wider text-stone-500">{k}</div>
                            <div className="text-2xl font-bold text-stone-900 mt-1 tabular-nums">{v}</div>
                            <div className="text-[11px] text-stone-500 mt-1 leading-snug">{d}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                        href="/english/corpus-ja/full"
                        className="rounded-xl bg-stone-900 text-white px-5 py-3 text-sm font-medium hover:bg-stone-800 transition-all"
                    >
                        網羅版を見る
                    </Link>
                    <Link
                        href="/english/corpus-ja/align"
                        className="rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-800 hover:border-stone-400 transition-all"
                    >
                        直訳できない順に見る
                    </Link>
                    <Link
                        href="/english/corpus"
                        className="rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-800 hover:border-stone-400 transition-all"
                    >
                        英語側の表
                    </Link>
                </div>

                {/* --- 通訳者の一覧を物差しにする --- */}
                <section className="mt-14">
                    <h2 className="text-xl font-bold text-stone-900">プロの通訳者が詰まる語を、物差しにする</h2>
                    <p className="mt-3 text-sm text-stone-700 leading-relaxed max-w-3xl">
                        頻度で並べると、上から「こと」「よう」「そう」が延々と続く。全部そのまま英語になるので、
                        いくら下りてもキリがない。欲しいのは
                        <strong className="font-semibold text-stone-900">「きりがない」を英語にどう言うか</strong>のほう。
                        その層は既にプロが選別していて、同時通訳者が
                        「訳せそうで訳せない」として1語ずつ潰した連載がある。
                        使うのは<strong className="font-semibold">見出しの語だけ</strong>で、記事の中身は取らない。
                        英語側で Wiktionary を再現率の物差しにしたのと同じ扱いで、
                        <strong className="font-semibold">この一覧を再現できる並べ方かどうか</strong>を外から確かめるために置く。
                    </p>
                    <div className="mt-5 grid grid-cols-3 gap-3">
                        {[
                            ['一覧の語数', N(INTERPRETER_STATS.total), '2つの連載の見出し'],
                            ['コーパスに在る', N(INTERPRETER_STATS.inCorpus), `${Math.round((INTERPRETER_STATS.inCorpus / INTERPRETER_STATS.total) * 100)}%`],
                            ['英訳が掘れた', N(INTERPRETER_STATS.withEnglish), '対訳から実測'],
                        ].map(([k, v, d]) => (
                            <div key={k} className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-center">
                                <div className="text-[11px] tracking-wider text-stone-500">{k}</div>
                                <div className="text-2xl font-bold text-stone-900 mt-1 tabular-nums">{v}</div>
                                <div className="text-[11px] text-stone-500 mt-0.5">{d}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 rounded-xl border border-stone-200 bg-white overflow-hidden">
                        {INTERPRETER_SEEDS.filter((s) => s.en.length > 0)
                            .sort((a, b) => (b.spread ?? 0) - (a.spread ?? 0))
                            .slice(0, 14)
                            .map((s) => (
                                <div
                                    key={s.ja}
                                    className="flex items-baseline gap-3 px-4 py-2.5 border-b border-stone-100 last:border-0"
                                >
                                    <span className="font-medium text-stone-900 w-28 shrink-0">{s.ja}</span>
                                    <span className="text-sm text-stone-600 flex-1 min-w-0">{s.en.join(' / ')}</span>
                                    <span className="tabular-nums text-[11px] text-stone-400 hidden sm:block">
                                        生涯{N(s.hits)}回
                                    </span>
                                    <span className="tabular-nums text-[11px] text-amber-700 w-10 text-right">
                                        {s.spread?.toFixed(2)}
                                    </span>
                                </div>
                            ))}
                    </div>
                    <p className="mt-3 text-[12px] text-stone-500 leading-relaxed">
                        出典 {INTERPRETER_SOURCE.name}（{INTERPRETER_SOURCE.site}）。
                        英訳は連載から取ったものではなく、日英対訳279万ペアから掘った実測値。
                        英訳が空の語は対訳コーパスが映画字幕なので、会議とビジネスの語（大筋合意 / 粛々と / 説明責任）が母体に無い。
                        そこは語域を足せば埋まる。
                    </p>
                </section>

                {/* --- 語域 --- */}
                <section className="mt-14">
                    <h2 className="text-xl font-bold text-stone-900">3つの語域を配合する</h2>
                    <p className="mt-3 text-sm text-stone-700 leading-relaxed max-w-3xl">
                        生の回数を足すのではなく、語域ごとに100万語あたりに割ってから重みを掛ける。
                        そうしないと、いちばん大きい語域がひとりで順位を決めてしまう。
                    </p>
                    <div className="mt-5 grid sm:grid-cols-3 gap-3">
                        {[
                            ['素の会話', '4,411万語', '0.55', 'YouTube の長尺トーク 3,182本。自然な口語はここ。やる気 / 会社都合 が住んでいる'],
                            ['字幕の日本語', '2,041万語', '0.40', '日英対訳の日本語側。翻訳された日本語なので語尾は歪むが、語彙は大人のもの。しぶとい / 水を差す / 手際 はここから来た'],
                            ['本', '1億9,771万語', '0.05', '青空文庫 34,062作品。旧仮名と文語は落としてある。気の毒 / 立派 / 気立て が濃い。現代語の証拠にはならないので薄く'],
                        ].map(([name, size, w, desc]) => (
                            <div key={name} className="rounded-xl border border-stone-200 bg-white p-4">
                                <div className="flex items-baseline justify-between">
                                    <span className="font-semibold text-stone-900 text-sm">{name}</span>
                                    <span className="text-[11px] tabular-nums text-stone-500">重み {w}</span>
                                </div>
                                <div className="text-lg font-bold text-stone-900 mt-1 tabular-nums">{size}</div>
                                <div className="text-[11px] text-stone-600 mt-1.5 leading-snug">{desc}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- 直訳不可度 --- */}
                <section className="mt-14">
                    <h2 className="text-xl font-bold text-stone-900">直訳できるかどうかを、実測で分ける</h2>
                    <p className="mt-3 text-sm text-stone-700 leading-relaxed max-w-3xl">
                        訳をAIに書かせたら、それは推測でしかない。ここでやっているのは実測で、
                        日英の対訳280万ペアを1回流して、日本語の表現ごとに
                        <strong className="font-semibold">実際に当たっていた英語</strong>を集めている。
                        そのうえで「1位の英語が何割の対訳に入っていたか」を見る。
                        いつも同じ英語になるものは直訳でき、誰も過半を取れないものは直訳できない。
                        辞書を引かずに、機械が仕分ける。
                    </p>
                    <div className="mt-5 grid sm:grid-cols-2 gap-4">
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                            <div className="text-sm font-semibold text-emerald-900">直訳できる</div>
                            <div className="text-[11px] text-emerald-800 mt-0.5">英語がいつも同じに寄る</div>
                            <div className="mt-3 space-y-2">
                                {TRANSLATABLE.map((r) => (
                                    <div key={r.ja} className="flex items-baseline gap-2 text-sm">
                                        <span className="font-medium text-stone-900 w-24 shrink-0">{r.ja}</span>
                                        <span className="text-stone-600 flex-1">{r.en}</span>
                                        <span className="tabular-nums text-[11px] text-emerald-700">{r.v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-xl border border-amber-300 bg-amber-50 p-5">
                            <div className="text-sm font-semibold text-amber-900">直訳できない</div>
                            <div className="text-[11px] text-amber-800 mt-0.5">場面ごとに別の英語になる。ここが本体</div>
                            <div className="mt-3 space-y-2">
                                {UNTRANSLATABLE.map((r) => (
                                    <div key={r.ja} className="flex items-baseline gap-2 text-sm">
                                        <span className="font-medium text-stone-900 w-24 shrink-0">{r.ja}</span>
                                        <span className="text-stone-600 flex-1">{r.en}</span>
                                        <span className="tabular-nums text-[11px] text-amber-700">{r.v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 覆える割合 --- */}
                <section className="mt-14">
                    <h2 className="text-xl font-bold text-stone-900">どこまでやれば終わりか</h2>
                    <p className="mt-3 text-sm text-stone-700 leading-relaxed max-w-3xl">
                        全部やる必要はない。上位から順に潰していったとき、話し言葉のどれだけを覆えるかを実測で出してある。
                        残数で管理できるのが、コーパスを持っている側の強み。
                    </p>
                    <CoverageChart />
                </section>

                {/* --- 種類 --- */}
                <section className="mt-14">
                    <h2 className="text-xl font-bold text-stone-900">捨てずに、札を付ける</h2>
                    <p className="mt-3 text-sm text-stone-700 leading-relaxed max-w-3xl">
                        慣用句も説明表現もぼかしも相槌も、活用や てにをは まで全部残してある。
                        絞ると必ず本物が混じって死ぬ。実際この表を作る過程で、ふるいが
                        「だから」「やっぱり」「逆に」「だと思う」を殺していた。
                        だから捨てずに札を付けて、見る側で絞る形にした。
                    </p>
                    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {JA_KIND_LABELS.map((k, i) => (
                            <div key={k.name} className="rounded-xl border border-stone-200 bg-white p-4">
                                <div className="flex items-baseline justify-between">
                                    <span className="font-semibold text-stone-900 text-sm">{k.name}</span>
                                    <span className="tabular-nums text-[11px] text-stone-500">
                                        {N(JA_CHUNK_STATS.byKind[i])}
                                    </span>
                                </div>
                                <div className="text-[11px] text-stone-600 mt-1.5 leading-snug">{k.desc}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- 層 --- */}
                <section className="mt-14">
                    <h2 className="text-xl font-bold text-stone-900">層</h2>
                    <div className="mt-4 space-y-2">
                        {JA_TIER_LABELS.map((t, i) => {
                            const v = JA_CHUNK_STATS.byTier[i];
                            const pct = (v / JA_CHUNK_STATS.total) * 100;
                            return (
                                <div key={t.name} className="rounded-xl border border-stone-200 bg-white px-4 py-3">
                                    <div className="flex items-baseline justify-between text-sm">
                                        <span className="font-semibold text-stone-900">{t.name}</span>
                                        <span className="tabular-nums text-stone-600">{N(v)} 件</span>
                                    </div>
                                    <div className="mt-2 h-1.5 rounded-full bg-stone-100 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-emerald-500"
                                            style={{ width: `${Math.max(pct, 0.4)}%` }}
                                        />
                                    </div>
                                    <div className="text-[11px] text-stone-500 mt-1.5">{t.desc}</div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* --- 英語版との比較 --- */}
                <section className="mt-14">
                    <h2 className="text-xl font-bold text-stone-900">英語側の表との比較</h2>
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full min-w-[640px] text-sm">
                            <thead>
                                <tr className="text-left text-[11px] tracking-wider text-stone-500 border-b border-stone-200">
                                    <th className="py-2 pr-4 font-medium"></th>
                                    <th className="py-2 pr-4 font-medium">英語側</th>
                                    <th className="py-2 pr-4 font-medium">日本語側</th>
                                    <th className="py-2 font-medium">note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {VS.map((r) => (
                                    <tr key={r.label} className="border-b border-stone-100">
                                        <td className="py-2.5 pr-4 font-medium text-stone-900 whitespace-nowrap">{r.label}</td>
                                        <td className="py-2.5 pr-4 text-stone-600 tabular-nums whitespace-nowrap">{r.en}</td>
                                        <td className="py-2.5 pr-4 text-stone-900 tabular-nums whitespace-nowrap font-medium">{r.ja}</td>
                                        <td className="py-2.5 text-[12px] text-stone-500">{r.note}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-stone-800 leading-relaxed">
                        最初は YouTube の雑談だけで数えていた。3,627万語あって
                        <strong className="font-semibold">「つけが回る」「しぶとい」「水を差す」「気立て」が1件も無かった</strong>。
                        集めたのが若い配信者の雑談で、大人が大人の言葉で喋る場面が入っていなかったから。
                        カフェの隣の席で交わされている語彙が丸ごと欠けていた。
                        欲しいのは「日本人なら誰でも自然に口から出る言葉」で、頻度という軸は正しく、
                        間違っていたのは母集団のほうだった。だから語域を3つにした。
                    </div>
                </section>

                {/* --- ふるいが殺していたもの --- */}
                <section className="mt-14">
                    <h2 className="text-xl font-bold text-stone-900">ふるいが本物を殺していた</h2>
                    <p className="mt-3 text-sm text-stone-700 leading-relaxed max-w-3xl">
                        この表を作るときに一番怖いのは、絞り込みが本物を落とすこと。
                        消えたことに気づく手段を、ふるいの中に持つことはできない。だから
                        「無ければ教材として失格」の80表現を外に固定して置き、1つでも欠けたら止まるようにした。
                        下は全部、その監査が見つけたもの。
                    </p>
                    <div className="mt-4 grid sm:grid-cols-2 gap-2">
                        {FIXES.map(([bad, fix]) => (
                            <div key={bad} className="rounded-lg border border-stone-200 bg-white px-4 py-3">
                                <div className="text-sm text-rose-700">{bad}</div>
                                <div className="text-[12px] text-stone-600 mt-1">→ {fix}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-14 rounded-xl border border-stone-200 bg-white p-6">
                    <h2 className="text-lg font-bold text-stone-900">出典と限界</h2>
                    <ul className="mt-3 space-y-2 text-sm text-stone-700 leading-relaxed">
                        <li>
                            頻度の母体は YouTube の日本語の長尺トーク 2,168本
                            ({N(JA_CHUNK_STATS.corpusWords)}語)。自動字幕なので誤りがそのまま入る。
                        </li>
                        <li>
                            英訳の母体は JESC (Stanford / Google Brain / 楽天技術研究所, CC BY-SA 4.0) の日英対訳 279万ペア。
                        </li>
                        <li>
                            語域が1つしかない。英語側は3語域を配合しているが、こちらは雑談とトーク番組に偏っている。
                        </li>
                        <li>
                            作り方の詳細と、まだ直っていないところは <code className="text-[12px] bg-stone-100 px-1.5 py-0.5 rounded">docs/ja-corpus-spec.md</code>。
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}

/** 上位N件で何割を覆うか */
function CoverageChart() {
    const W = 900;
    const H = 240;
    const PAD = { l: 46, r: 20, t: 16, b: 34 };
    const pts = JA_COVERAGE_CURVE;
    if (!pts.length) return null;

    const maxN = pts[pts.length - 1][0];
    const x = (n: number) => PAD.l + (Math.log10(n) / Math.log10(maxN)) * (W - PAD.l - PAD.r);
    const y = (p: number) => H - PAD.b - (p / 100) * (H - PAD.t - PAD.b);
    const line = pts.map(([n, p], i) => `${i ? 'L' : 'M'}${x(n).toFixed(1)},${y(p).toFixed(1)}`).join(' ');
    const area = `${line} L${x(maxN).toFixed(1)},${y(0)} L${x(pts[0][0]).toFixed(1)},${y(0)} Z`;
    const marks = pts.filter(([n]) => n === 500 || n === 2000 || n === 5000);

    return (
        <>
            <div className="mt-5 overflow-x-auto">
                <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[520px]" role="img" aria-label="上位N件で覆える割合">
                    <defs>
                        <linearGradient id="jaCov" x1="0" y1="0" x2="0" y2="1">
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
                    <path d={area} fill="url(#jaCov)" />
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
                        <div className="text-[11px] tracking-wider text-stone-500">上位 {N(n)} 個</div>
                        <div className="text-3xl font-bold text-stone-900 mt-1 tabular-nums">{p}%</div>
                    </div>
                ))}
            </div>
        </>
    );
}
