'use client';

// CHUNK CORPUS — 報告書と改善案。
// ここを見れば「何をしたか / 何がわかったか / 次に何をするか」が third party に説明できる。
// 仕様の詳細は docs/chunk-corpus-spec.md

import Link from 'next/link';

const CORPORA = [
    { name: '素の会話', src: 'YouTube 字幕 (43ch / 1,155本)', words: 14711455, role: '演出で盛られていない話し言葉。本命', done: false },
    { name: '映像字幕', src: 'OpenSubtitles (OPUS)', words: 64673306, role: '量。会話の網羅性', done: true },
    { name: '映画脚本', src: 'Cornell Movie-Dialogs 617本', words: 3206942, role: '脚本の会話。やや劇的に盛られる', done: true },
    { name: '論説・講演', src: 'News-Commentary / TED2020 / QED', words: 41359348, role: '現代の書き言葉。ことわざと成句はここに住んでいる', done: true },
    { name: '古典書籍', src: 'Project Gutenberg 40冊', words: 4755285, role: '1890年代。現代語の証拠にはならない', done: true },
];

// 語域を1つ増やしただけで結論が変わった実測。ことわざは会話ではなく論説に住んでいる
const IDIOM_EVIDENCE = {
    cols: ['論説・講演', 'YouTube', '映像字幕', '古典40冊'],
    rows: [
        ['easier said than done', 89, 36, 50, 0],
        ['the tip of the iceberg', 77, 17, 49, 0],
        ['a double-edged sword', 32, 32, 3, 0],
        ['the elephant in the room', 26, 28, 0, 0],
        ['actions speak louder', 14, 4, 3, 0],
        ['necessity is the mother of invention', 4, 2, 0, 0],
    ] as Array<[string, number, number, number, number]>,
};

const FINDINGS = [
    {
        title: '本だけで数えると1890年のロンドンができる',
        body: '名作40冊452万語で snap out of it は0件、you guys も0件。代わりに a quarter of an hour が48件、my lord が1,828件。著作権が切れている=古い、かつ本は書き言葉。二重に外れる。',
        data: [['snap out of it', '0件 (本) → 15件 (映画脚本)'], ['you guys', '0件 (本) → 525件 (映画脚本)'], ['a quarter of an hour', '48件 (本) → 1件 (映画脚本)']],
    },
    {
        title: '頻度順のままだと英文法が上位を占める',
        body: 'i don\'t / want to / going to / out of / to see。これは覚える対象ではなく、ネイティブとの差もここにはない。内容語の有無・端の欠け・結束度の3関門で絞る。ただし結束度は「よく出るもの」には効かせない。生涯74,441回の look at まで落としていたため。',
        data: [['落とした: 端が欠け', '79,113件'], ['落とした: 結束が弱い', '73,783件'], ['落とした: 番組固有の定型', '24,206件']],
    },
    {
        title: '頻度と「知っているか」は別の軸だった',
        body: 'necessity is the mother of invention を完全一致で引いたら8,734万語で1件。そこで死語と結論したが誤り。実際は is the mother of という型で41件生きており、かつ大人のネイティブの99%が知っている。ことわざは決まり文句という札つきで提示されるので1〜3回で定着する。頻度だけで順位をつけると、この層が最下位に沈む。',
        data: [['necessity is the mother of invention', '1件'], ['is the mother of (型)', '41件'], ['keep an eye on (比較用)', '1,121件']],
    },
];

const ROADMAP = [
    {
        phase: '最優先',
        color: 'border-amber-300 bg-amber-50',
        items: [
            { t: 'YouTube を1万本まで取得', d: '列挙済み12,444本に対し取得は1,358本。残りを入れると素の会話だけで1億語を超え、いまの全コーパス合計を上回る', impact: '母集団が10倍' },
            { t: '現代の書き言葉を足す', d: '報道・論説・講演 (News-Commentary / TED / QED)。ことわざと成句が実際に生きている語域が現状ゼロ。書き言葉が1890年代しかないのが最大の穴', impact: 'ことわざ層が復活' },
            { t: '日本語訳をつける', d: '1万件に訳がない。商品として成立しない。訳はLLM側の仕事', impact: '商品化の必須条件' },
        ],
    },
    {
        phase: '品質',
        color: 'border-emerald-300 bg-emerald-50',
        items: [
            { t: '可変スロットに対応する', d: 'X is the mother of Y のような型を完全一致が落とす。necessity の誤判定はこれが原因。スロット付きパターンで数える', impact: '取りこぼしを潰す' },
            { t: '顕著性の軸を実装', d: 'ことわざ・成句・引用は低頻度でも全員知っている。頻度と別列で持ち、並べ替えられるようにする', impact: '順位の妥当性' },
            { t: '6語以上の取りこぼしを戻す', d: '番組固有の決め台詞を消すため2語域以上を必須にした結果、6語が4,426件から325件に激減した。語域ごとの閾値差を補正して recall を戻す', impact: '長い表現の充実' },
            { t: '2020年代の語域を足す', d: 'OpenSubtitles v2018 は新しい語を含まない。SNS・掲示板・最近の配信', impact: '現在形の英語' },
        ],
    },
    {
        phase: '商品化',
        color: 'border-sky-300 bg-sky-50',
        items: [
            { t: '実例を各表現に焼き込む', d: 'いまは corpus-search を叩かないと場面が見えない。1表現あたり実場面を3〜5本、データに持たせる', impact: '場面つきで覚えられる' },
            { t: 'なぜ日本人が言えないかを書く', d: '日本語との対照。これはLLMにしかできない。数値の隣に置く', impact: '教材としての価値' },
            { t: 'トレーニングに連携', d: '/api/phrases にカード化して既存の復習系に流す', impact: '実際に定着する' },
            { t: '終わりの提示', d: '上位N件で会話の何割を覆うかを出す。500件で22%、2000件で38%まで算出済み。残数で管理する画面にする', impact: '他社が絶対にやらない' },
        ],
    },
];

export default function CorpusReportPage() {
    const totalWords = CORPORA.reduce((a, c) => a + c.words, 0);

    return (
        <div className="min-h-screen bg-stone-50">
            <div className="bg-white border-b border-stone-200">
                <div className="max-w-4xl mx-auto px-5 py-10">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                            <div className="text-xs tracking-[0.25em] text-stone-400 font-medium mb-3">REPORT</div>
                            <h1 className="text-3xl font-bold text-stone-900 tracking-tight">
                                チャンクコーパス 報告書と改善案
                            </h1>
                            <p className="mt-3 text-stone-600 leading-relaxed max-w-2xl">
                                何をしたか、何がわかったか、どこを間違えたか、次に何をするか。
                                ブラックボックスにしないための記録です。
                            </p>
                        </div>
                        <Link
                            href="/english/corpus"
                            className="shrink-0 px-5 py-3 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-all"
                        >
                            ランキングを見る
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-5 py-10 space-y-12">
                {/* 何をしたか */}
                <section>
                    <SectionTitle n="01" title="何をしたか" />
                    <p className="text-stone-700 leading-relaxed mb-5">
                        英語の実テキストを{Math.round(totalWords / 10000).toLocaleString()}万語ぶん手元に集め、
                        任意のフレーズについて「何回出るか / どの語域で出るか / どんな場面で出るか」を
                        その場で数えられる状態にしました。そこから覚える価値のある表現だけを抜いて順位表にしています。
                    </p>

                    <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-stone-50 border-b border-stone-200">
                                <tr className="text-left text-xs tracking-wider text-stone-500">
                                    <th className="px-4 py-3 font-medium">語域</th>
                                    <th className="px-4 py-3 font-medium">出典</th>
                                    <th className="px-4 py-3 font-medium text-right">語数</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {CORPORA.map((c) => (
                                    <tr key={c.name}>
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-stone-900">{c.name}</div>
                                            <div className="text-xs text-stone-500 mt-0.5">{c.role}</div>
                                        </td>
                                        <td className="px-4 py-3 text-stone-600 text-xs">{c.src}</td>
                                        <td className="px-4 py-3 text-right tabular-nums font-medium text-stone-900">
                                            {c.words.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                <tr className="bg-stone-50 font-bold">
                                    <td className="px-4 py-3 text-stone-900" colSpan={2}>合計</td>
                                    <td className="px-4 py-3 text-right tabular-nums text-stone-900">{totalWords.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* わかったこと */}
                <section>
                    <SectionTitle n="02" title="わかったこと" />
                    <div className="space-y-4">
                        {FINDINGS.map((f) => (
                            <div key={f.title} className="rounded-2xl border border-stone-200 bg-white p-5">
                                <h3 className="font-bold text-stone-900 text-lg">{f.title}</h3>
                                <p className="mt-2 text-sm text-stone-600 leading-relaxed">{f.body}</p>
                                <div className="mt-4 space-y-1.5">
                                    {f.data.map(([k, v]) => (
                                        <div key={k} className="flex items-center justify-between gap-4 text-sm bg-stone-50 rounded-lg px-3 py-2">
                                            <span className="text-stone-600 font-mono text-xs">{k}</span>
                                            <span className="font-medium text-stone-900 tabular-nums shrink-0">{v}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ことわざの居場所 */}
                <section>
                    <SectionTitle n="03" title="ことわざは会話ではなく論説に住んでいた" />
                    <p className="text-stone-700 leading-relaxed mb-5">
                        語域を1つ足しただけで結論がひっくり返った実測です。
                        古典40冊には、現代の成句が<span className="font-bold">1件も入っていません</span>。
                        必要は発明の母を死語と誤判定したのは、成句が住んでいる語域を持っていなかったからでした。
                    </p>
                    <div className="rounded-2xl border border-stone-200 bg-white overflow-x-auto">
                        <table className="w-full text-sm min-w-[560px]">
                            <thead className="bg-stone-50 border-b border-stone-200">
                                <tr className="text-xs tracking-wider text-stone-500">
                                    <th className="px-4 py-3 font-medium text-left">表現</th>
                                    {IDIOM_EVIDENCE.cols.map((c) => (
                                        <th key={c} className="px-4 py-3 font-medium text-right">{c}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {IDIOM_EVIDENCE.rows.map((r) => (
                                    <tr key={r[0]}>
                                        <td className="px-4 py-2.5 font-mono text-xs text-stone-800">{r[0]}</td>
                                        {r.slice(1).map((v, i) => (
                                            <td
                                                key={i}
                                                className={`px-4 py-2.5 text-right tabular-nums ${
                                                    v === 0 ? 'text-red-500 font-bold' : 'text-stone-700'
                                                }`}
                                            >
                                                {v}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-3 text-xs text-stone-500 leading-relaxed">
                        論説・講演コーパスの成句密度は映像字幕の2倍から3倍。
                        1つの語域だけで数えると必ず事故る、というのがこの仕組みで唯一の必須ルールです。
                    </p>
                </section>

                {/* 分業の原則 */}
                <section>
                    <SectionTitle n="04" title="分業の原則" />
                    <p className="text-stone-700 leading-relaxed mb-5">
                        AIとコーパスDBは、できることが正反対です。両方を使わないと必ず失敗します。
                        この原則が、この仕組みの中心です。
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-stone-200 bg-white p-5">
                            <div className="text-xs tracking-widest text-stone-400 font-medium mb-3">DBがやること</div>
                            <ul className="space-y-2 text-sm text-stone-700">
                                {['列挙と網羅', '頻度と順位', '存在しないことの証明', '出典つきの実例', '誰でも再現できる検証'].map((x) => (
                                    <li key={x} className="flex gap-2">
                                        <span className="text-stone-400">—</span>{x}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-4 text-xs text-stone-500 leading-relaxed">
                                AIは重みの塊で索引を持たないため、数え上げる対象のリストがそもそも存在しません。
                                列挙させると300〜600個で尽き、その先は捏造が始まります。しかも本人に見分けがつきません。
                            </p>
                        </div>
                        <div className="rounded-2xl border border-stone-200 bg-white p-5">
                            <div className="text-xs tracking-widest text-stone-400 font-medium mb-3">AIがやること</div>
                            <ul className="space-y-2 text-sm text-stone-700">
                                {['意味の説明', 'なぜ日本人が言えないか', '実例40件から場面を要約', '顕著性の判定', '教材としての組み立て'].map((x) => (
                                    <li key={x} className="flex gap-2">
                                        <span className="text-stone-400">—</span>{x}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-4 text-xs text-stone-500 leading-relaxed">
                                頻度表は意味を持ちません。日本語との対照も数値には出ません。
                                数えるのは機械、意味をつけるのがAI。AIに電話帳を書かせず、電話帳を引かせる。
                            </p>
                        </div>
                    </div>
                </section>

                {/* 改善案 */}
                <section>
                    <SectionTitle n="05" title="改善案" />
                    <p className="text-stone-700 leading-relaxed mb-5">
                        ここを上から潰していきます。効果の大きい順に並べてあります。
                    </p>
                    <div className="space-y-6">
                        {ROADMAP.map((g) => (
                            <div key={g.phase}>
                                <div className={`inline-block px-3 py-1 rounded-lg border text-xs font-bold text-stone-800 mb-3 ${g.color}`}>
                                    {g.phase}
                                </div>
                                <div className="space-y-2">
                                    {g.items.map((it) => (
                                        <div key={it.t} className="rounded-xl border border-stone-200 bg-white p-4">
                                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                                <div className="font-bold text-stone-900">{it.t}</div>
                                                <div className="text-xs px-2 py-1 rounded-md bg-stone-100 text-stone-600 border border-stone-200 shrink-0">
                                                    {it.impact}
                                                </div>
                                            </div>
                                            <p className="mt-1.5 text-sm text-stone-600 leading-relaxed">{it.d}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 限界 */}
                {/* 外から採点する */}
                <section>
                    <SectionTitle n="06" title="外から採点しました" />
                    <div className="rounded-2xl border border-stone-200 bg-white p-5 space-y-4">
                        <p className="text-sm text-stone-600 leading-relaxed">
                            ここまでの数字はすべて「何回出たか」で、これは頻度の証拠にはなりますが
                            <span className="font-medium text-stone-900">取りこぼしの証拠にはなりません</span>。
                            自分の網を自分で評価しても、網の外は原理的に見えないためです。
                            そこで外部の熟語一覧（英語版ウィクショナリー、見出し語のみ）と突き合わせました。
                        </p>

                        <div className="rounded-xl border border-stone-200 overflow-hidden">
                            {[
                                ['句動詞', '5,149件', '9.0%'],
                                ['熟語', '10,217件', '7.5%'],
                                ['ことわざ', '920件', '6.6%'],
                            ].map(([k, n, pct]) => (
                                <div key={k} className="flex items-center justify-between gap-4 border-b border-stone-100 px-4 py-2.5 text-sm last:border-0">
                                    <span className="text-stone-700">{k}</span>
                                    <span className="text-xs text-stone-400 tabular-nums">{n}</span>
                                    <span className="font-medium text-stone-900 tabular-nums">{pct}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-sm text-stone-600 leading-relaxed">
                            一見すると93%の落第です。ただしこの一覧には ab off や a cold day in july のような、
                            現代ではまず使われないものも大量に含まれます。
                            そこで落とした14,150件をすべてコーパスに投げ直し、実際の出現回数で仕分けました。
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                ['4,580件', '一度も出てこない', '相手側の死語。落として正しい'],
                                ['5,853件', '文法の骨組み', 'have to / kind of。意図的に落としている'],
                                ['3,717件', '本当の取りこぼし', 'こちらの基準でも残すべきなのに落ちていた'],
                            ].map(([n, t, d], i) => (
                                <div key={t} className={`rounded-xl border p-3 ${i === 2 ? 'border-amber-200 bg-amber-50' : 'border-stone-200 bg-stone-50'}`}>
                                    <p className="text-lg font-medium tabular-nums text-stone-900">{n}</p>
                                    <p className="mt-0.5 text-xs font-medium text-stone-700">{t}</p>
                                    <p className="mt-1 text-[11px] leading-relaxed text-stone-500">{d}</p>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                            <p className="text-xs font-medium tracking-wider text-stone-500">見つかった穴の中身</p>
                            <p className="mt-2 text-sm leading-relaxed text-stone-700">
                                原因は1つでした。結束度（PMI）という指標で足切りしていたこと。
                                これは部品が珍しいほど大きく出る指標なので、
                                <span className="font-medium text-stone-900">構成語が普通すぎる組み合わせは、いくら共起しても数字が伸びません</span>。
                            </p>
                            <div className="mt-3 space-y-1">
                                {[
                                    ['look at', '74,441回'],
                                    ["don't worry", '24,159回'],
                                    ['back off', '1,482回'],
                                    ["what's up", '10,840回'],
                                ].map(([t, n]) => (
                                    <div key={t} className="flex items-center justify-between rounded-lg bg-white px-3 py-1.5 text-sm">
                                        <span className="font-mono text-xs text-stone-600">{t}</span>
                                        <span className="tabular-nums text-stone-900">生涯 {n} / 圏外だった</span>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-3 text-xs leading-relaxed text-stone-500">
                                この表の基準は遭遇率であって結束度ではないので、
                                よく出るものについては足切りを免除するよう直しました。
                                同じことが二度起きないよう、基本表現91個の在否を毎回機械で確認しています
                                （scripts/audit-must-have.mjs。1つでも欠けたら失格）。
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <SectionTitle n="07" title="いまの限界" />
                    <div className="rounded-2xl border border-stone-200 bg-white p-5">
                        <ul className="space-y-3 text-sm text-stone-700">
                            {[
                                ['完全一致検索は型の変形を落とす', 'is the mother of のような可変部を持つ表現は部分でも引く必要がある'],
                                ['生涯遭遇は推定値', '1億5千万語という前提そのものが推定。順位は信用できるが絶対回数は目安'],
                                ['映画脚本は劇的表現が濃い', 'snap out of it は映画4.68/M に対し素の会話0.27/M'],
                                ['YouTube字幕に自動生成が混じる', '人力字幕を優先しているが、自動のものはASR誤りを含む'],
                                ['古典40冊は現代語の証拠にならない', '語彙が1890年代'],
                            ].map(([t, d]) => (
                                <li key={t} className="flex gap-3">
                                    <span className="text-stone-300 shrink-0">—</span>
                                    <div>
                                        <span className="font-medium text-stone-900">{t}</span>
                                        <span className="text-stone-500"> / {d}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}

function SectionTitle({ n, title }: { n: string; title: string }) {
    return (
        <div className="flex items-baseline gap-3 mb-4">
            <span className="text-xs tracking-widest text-stone-300 font-bold tabular-nums">{n}</span>
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">{title}</h2>
        </div>
    );
}
