// 英語の設計図 — サイドバー全体を外から見た一枚。
//
// 【何のページか】
// サイドバーには110近いページがある。一つ一つは道具だが、並べただけでは
// 「この人は何をしているのか」「英語はどうやって当たり前になるのか」が見えない。
// ここはその答えを、本人の意見ではなく、サイト全体を読んだ側の見立てとして書く。
//
// 【書き方の決まり】
// 数字は実測だけ(コーパス、カード枚数、ページ数)。推測の数字は書かない。
// 道具の宣伝はしない。何がどこに流れるか、だけを描く。
// 弱点も書く。褒めるだけのLPは読まれない。
//
// 【構成】
// 1 一文の答え
// 2 流れの図(材料 → 型 → 終着 → 撃つ → 検死 → 戻る)
// 3 実測の数字
// 4 当たり前になる理由 5つ
// 5 一日
// 6 まだ無いもの
// 7 全ページの地図(役割で束ねて、サイドバーの並びを翻訳する)

import Link from 'next/link';

const GOLD = '#D4AF37';
const DEEP = '#9A7B16';
const GREEN = '#10B981';
const INK = '#1C1917';
const SUB = '#57534E';
const MUTE = '#A8A29E';
const LINE = '#E7E5E4';

type Node = { key: string; title: string; sub: string; links: { href: string; label: string }[] };

const FLOW: Node[] = [
    {
        key: '材料', title: '数えた材料', sub: '推測ではなく、数えた在庫から始める',
        links: [
            { href: '/english/corpus', label: '英語 1.05億語の熟語ランキング' },
            { href: '/english/corpus-ja', label: '日本語 2.6億語の表現ランキング' },
            { href: '/english/deru', label: '出る順 日本語 (JMdict 21万見出し)' },
            { href: '/english/training/dmm', label: 'DMM英会話 118夜の実録' },
            { href: '/english/goroku-log', label: '本人の口から出た日本語' },
        ],
    },
    {
        key: '型', title: '毎月310の型', sub: '入口を変えて、同じ英語に四方向から近づく',
        links: [
            { href: '/english/grown', label: 'Grown-Up 1000 — 英語の表現から入る' },
            { href: '/english/nihongo', label: '日本語から学ぶ — 日本語の慣用句から入る' },
            { href: '/english/goroku', label: '英語筋トレ — 英語の骨格(構文)から入る' },
            { href: '/english/goroku-log', label: '俺語録 1日5個 — 本人の口から入る' },
            { href: '/english/casual', label: 'ドラマ / JRE / エンタメ — 実セリフから入る' },
        ],
    },
    {
        key: '終着', title: 'トレーニング', sub: '全部がここに落ちる。1万枚を超えるカード',
        links: [
            { href: '/english/training', label: 'TIME ATTACK / REVIEW / GOD GRID' },
            { href: '/english/listen', label: 'LISTEN — 音声だけの書き取り' },
            { href: '/english/pp', label: 'PP Studio — ネイティブの音声を貼る' },
        ],
    },
    {
        key: '撃つ', title: '夜、撃つ', sub: '覚えた英語を、生身の相手に25分',
        links: [
            { href: '/english/training/dmm', label: 'DMM英会話' },
            { href: '/life', label: 'Life — 昨日の英語' },
        ],
    },
    {
        key: '検死', title: '検死して、戻す', sub: '録音を全行読み、崩れた所だけをカードに戻す',
        links: [
            { href: '/english/tsukkomi', label: 'ツッコミ復習' },
            { href: '/english/tonight', label: '今夜も通じない (DMM劇場)' },
            { href: '/english/magazine', label: '月刊TOLERANCY' },
            { href: '/english/yochi', label: '文法災害予知 — 次に何が壊れるか' },
        ],
    },
];

const NUMBERS: { n: string; label: string; note: string }[] = [
    { n: '1.05億', label: '語', note: '英語の実測コーパス。熟語ランキングの元' },
    { n: '10.6万', label: '件', note: '課程に載せた熟語。絞る前は13.5万' },
    { n: '46%', label: '', note: '上位5,000熟語で日常英語の何割が埋まるか(実測)' },
    { n: '2.6億', label: '語', note: '日本語コーパス。訳せない語を掘る側' },
    { n: '1万+', label: '枚', note: 'トレーニングのカード。全ページの終着点' },
    { n: '4×310', label: '/月', note: '毎月足す型。grown / nihongo / goroku / 実セリフ' },
    { n: '118', label: '夜', note: 'DMM英会話の実録と検死' },
    { n: '110', label: 'ページ', note: 'サイドバーの道具の数' },
];

const REASONS: { head: string; body: string }[] = [
    {
        head: '終着点が一つしかない',
        body: '110のページがあって、どれを開いても最後は同じ場所に落ちる。トレーニングのカードだ。新聞を読んでも、映画のセリフを拾っても、DMMで崩れた一文も、全部が同じ箱に入って同じ復習に乗る。覚える場所が一つなら、忘れる場所も一つで済む。',
    },
    {
        head: '材料を数えている',
        body: '「よく使う表現」を誰かの勘で選んでいない。1億語を数えて、一生で何回会うかで並べている。look into は生涯2,700回、back off は1,482回。数字が付いた表現は、覚える理由を説明しなくていい。',
    },
    {
        head: '今日の分が決まっている',
        body: '毎朝、何をやるか考える必要が無い。カレンダーを開くと日付に10個ずつ置いてある。grown、nihongo、goroku、俺語録。四つのページで35表現。決めるのは「やるかやらないか」だけで、「何を」は前の月に決まっている。',
    },
    {
        head: '撃って、検死する',
        body: '覚えた英語は夜のDMMで撃つ。録音を全行読んで、崩れた所を探す。冠詞が落ちた、三単現が抜けた、would が出なかった。それをまたカードに戻す。学習が一方通行じゃなく、輪になっている。輪になっているものは止まらない。',
    },
    {
        head: '面白くしてある',
        body: '検死は失点表になりがちで、失点表は続かない。だから同じ夜を番組にし、雑誌にし、災害予報にし、町の住人の声にする。「今夜も通じない」は自分の失敗をネタにした深夜番組だ。続く仕組みは、正しさじゃなく笑いで作ってある。',
    },
];

const DAY: { time: string; what: string; where: string; href: string }[] = [
    { time: '朝', what: 'REVIEW。期限の来たカードを潰す', where: 'トレーニング', href: '/english/training' },
    { time: '朝', what: '今日の35表現。四つのページの今日の日付', where: 'grown / nihongo / goroku / 俺語録', href: '/english/grown' },
    { time: '昼', what: '歩きながら聞き流し。覚える方ではなく耳の方', where: 'LISTEN', href: '/english/listen' },
    { time: '夕', what: '今日の新聞。話題を英語で2本', where: 'The Tonio Times', href: '/english/newspaper' },
    { time: '夜', what: 'DMM 25分。今日覚えた物を撃つ', where: 'DMM英会話', href: '/english/training/dmm' },
    { time: '夜', what: '検死。崩れた所だけカードに戻す', where: 'ツッコミ復習', href: '/english/tsukkomi' },
];

const MISSING: { head: string; body: string }[] = [
    {
        head: '網羅率という一本の数字',
        body: '13.5万の熟語のうち、カードとページで踏んでいるのは今のところ3.7%。上位1万に絞れば46%。この数字はまだページに出ていない。毎月310を足すやり方は「表」としては正しいが、網羅の「エンジン」にはならない。次に作るのは、未踏の上位から種を引く仕組みで、その進み具合を一行で見せる場所だ。',
    },
    {
        head: '入口同士の重なり',
        body: '入口が多いぶん、同じ表現が別の顔で二度出る。Grown-Up の中に74件、日本語から学ぶの中に約200件、英語筋トレの中に約60件、二つのページで同じ日本語見出しが84件。10月からは役割を分けた(語彙 / 日本語 / 骨格 / 本人の口)。9月以前の重なりは別枠で潰す。',
    },
    {
        head: '耳の量',
        body: '本丸は「劣化した生音が聞こえる耳」で、試験は全部却下している。その割に、毎月の生音の量は文字の量より少ない。LISTEN と RAW PASS はあるが、文字が310なら音も310要る。',
    },
];

const MAP: { role: string; note: string; items: { href: string; label: string }[] }[] = [
    {
        role: '毎日', note: '開いた瞬間に今日の分が決まっているページ',
        items: [
            { href: '/english/training', label: 'トレーニング' },
            { href: '/english/grown', label: 'Grown-Up 1000' },
            { href: '/english/nihongo', label: '日本語から学ぶ' },
            { href: '/english/goroku', label: '英語筋トレ' },
            { href: '/english/goroku-log', label: '俺語録 (1日5個)' },
            { href: '/english/deru', label: '出る順 日本語' },
            { href: '/english/eiken1-daily', label: '英検1級英単語' },
            { href: '/english/newspaper', label: '今日の新聞' },
            { href: '/english/listen', label: 'LISTEN' },
        ],
    },
    {
        role: '実セリフ', note: '字幕と録音から拾った、誰かが実際に言った英語',
        items: [
            { href: '/english/casual', label: 'ドラマ' },
            { href: '/english/podcast', label: 'JRE' },
            { href: '/english/interview', label: 'エンタメ' },
            { href: '/english/pp', label: 'PP Studio' },
            { href: '/english/jp-yt', label: '罪悪感ゼロ英語' },
            { href: '/english/mlb', label: 'MLB専門紙' },
        ],
    },
    {
        role: '撃つ・検死', note: 'DMMの25分と、その後の全部',
        items: [
            { href: '/english/training/dmm', label: 'DMM英会話' },
            { href: '/english/tsukkomi', label: 'ツッコミ復習' },
            { href: '/english/tonight', label: '今夜も通じない' },
            { href: '/english/magazine', label: '月刊TOLERANCY' },
            { href: '/english/yochi', label: '文法災害予知' },
            { href: '/life', label: 'Life' },
        ],
    },
    {
        role: '数える', note: 'この教材が推測ではない、と示す側',
        items: [
            { href: '/english/corpus', label: '英語表現ランキング' },
            { href: '/english/corpus/level', label: '課程 レベル1-100' },
            { href: '/english/corpus/full', label: '網羅版' },
            { href: '/english/corpus-ja', label: '日本語表現ランキング' },
            { href: '/english/corpus-ja/align', label: '直訳不可度' },
            { href: '/english/namahanka', label: '生半可' },
            { href: '/english/wordbook', label: '話し言葉の単語帳' },
        ],
    },
    {
        role: '世界', note: '英語の一生を一つの町に置いた。読み物として続く側',
        items: [
            { href: '/english/tonio-world', label: 'とにおワールド' },
            { href: '/memoria', label: 'メモリア日記' },
            { href: '/english/requiem', label: 'レクイエム' },
            { href: '/english/world', label: '世界の内側' },
            { href: '/english/quest', label: 'Quest' },
        ],
    },
    {
        role: '外に出している', note: '値段が付いている、または付く予定のもの',
        items: [
            { href: '/english/rawpass', label: 'RAW PASS ¥4,980' },
            { href: '/english/toeic', label: 'SCOREPASS (TOEIC)' },
            { href: '/english/eiken1-mock', label: 'GRADEPASS (英検1級)' },
            { href: '/english/writepass', label: 'ライトパス' },
            { href: '/english/speak', label: 'スピークパス' },
            { href: '/english/cinepass', label: 'CINEPASS' },
            { href: '/english/access', label: 'ACCESS' },
            { href: '/english/hundred', label: 'THE HUNDRED' },
            { href: '/english/consult/inbox', label: '相談' },
        ],
    },
    {
        role: '記録', note: '過去の道具。消していないが、今は通らない',
        items: [
            { href: '/english/distinction', label: 'Native 1000' },
            { href: '/english/conversation', label: '日常会話マスター' },
            { href: '/english/self-master', label: '俺語録 (旧)' },
            { href: '/english/vocabulary', label: 'ボキャブラリー' },
            { href: '/english/anki', label: 'Anki' },
            { href: '/english/world-map', label: 'World Map' },
        ],
    },
];

export default function BlueprintPage() {
    return (
        <main style={{
            maxWidth: 860, margin: '0 auto', padding: '48px 20px 120px',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif', color: INK,
        }}>
            {/* 1 一文の答え */}
            <header style={{ marginBottom: 56 }}>
                <div style={{ fontSize: 11, letterSpacing: 4, color: MUTE, textTransform: 'uppercase' }}>Blueprint</div>
                <h1 style={{ fontSize: 34, fontWeight: 800, margin: '8px 0 20px', letterSpacing: -0.5, lineHeight: 1.3 }}>
                    英語は、当たり前になる。
                </h1>
                <p style={{ fontSize: 16, lineHeight: 2, color: SUB, margin: 0 }}>
                    このサイトには110のページがある。どれも道具で、並べただけでは何をしているのか分からない。
                    一文で言うとこうだ。<strong style={{ color: INK }}>数えた材料を、毎月310の型に流し、一つの箱に落として、夜に撃ち、崩れた所だけを箱に戻す。</strong>
                    それを毎日やっている。方法ではなく、設備の話だ。
                </p>
            </header>

            {/* 2 流れ */}
            <section style={{ marginBottom: 64 }}>
                <SectionHead n="01" title="流れ" sub="左から右へ。右端は左端に戻る" />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
                    {FLOW.map((node, i) => (
                        <div key={node.key} style={{
                            background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, padding: '16px 14px',
                            borderTop: `3px solid ${i === 2 ? GOLD : i === 4 ? GREEN : LINE}`,
                        }}>
                            <div style={{ fontSize: 10, letterSpacing: 3, color: i === 2 ? DEEP : MUTE, fontWeight: 700 }}>{String(i + 1).padStart(2, '0')} {node.key}</div>
                            <div style={{ fontSize: 15, fontWeight: 800, margin: '6px 0 4px' }}>{node.title}</div>
                            <div style={{ fontSize: 12, color: SUB, lineHeight: 1.7, marginBottom: 10 }}>{node.sub}</div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 4 }}>
                                {node.links.map(l => (
                                    <li key={l.href + l.label}>
                                        <Link href={l.href} style={{ fontSize: 12, color: DEEP, textDecoration: 'none', lineHeight: 1.6 }}>{l.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <p style={{ fontSize: 13, color: MUTE, marginTop: 14, lineHeight: 1.8 }}>
                    05 の出口は 03 の入口につながっている。検死で見つかった一文は、翌朝のカードになる。輪が閉じているのが、この設備の一番の特徴。
                </p>
            </section>

            {/* 3 数字 */}
            <section style={{ marginBottom: 64 }}>
                <SectionHead n="02" title="数字" sub="全部実測。推測の数字はここに無い" />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 10 }}>
                    {NUMBERS.map(x => (
                        <div key={x.note} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, padding: '18px 16px' }}>
                            <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1, color: INK, fontVariantNumeric: 'tabular-nums' }}>
                                {x.n}<span style={{ fontSize: 13, fontWeight: 600, color: MUTE, marginLeft: 4 }}>{x.label}</span>
                            </div>
                            <div style={{ fontSize: 12, color: SUB, lineHeight: 1.7, marginTop: 4 }}>{x.note}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4 当たり前になる理由 */}
            <section style={{ marginBottom: 64 }}>
                <SectionHead n="03" title="当たり前になる理由" sub="サイト全体を読んで見つけた、五つの仕組み" />
                <div style={{ display: 'grid', gap: 12 }}>
                    {REASONS.map((r, i) => (
                        <div key={r.head} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, padding: '20px 22px', display: 'grid', gridTemplateColumns: '44px 1fr', gap: 14 }}>
                            <div style={{ fontSize: 24, fontWeight: 800, color: GOLD, lineHeight: 1 }}>{i + 1}</div>
                            <div>
                                <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 6 }}>{r.head}</div>
                                <div style={{ fontSize: 14, color: SUB, lineHeight: 1.95 }}>{r.body}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5 一日 */}
            <section style={{ marginBottom: 64 }}>
                <SectionHead n="04" title="一日" sub="やることは決まっている。決めるのはやるかどうかだけ" />
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, overflow: 'hidden' }}>
                    {DAY.map((d, i) => (
                        <Link key={i} href={d.href} style={{
                            display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 14, alignItems: 'center',
                            padding: '14px 20px', textDecoration: 'none', color: INK,
                            borderTop: i === 0 ? 'none' : `1px solid ${LINE}`,
                        }}>
                            <div style={{ fontSize: 12, fontWeight: 800, color: DEEP, letterSpacing: 2 }}>{d.time}</div>
                            <div style={{ fontSize: 14, lineHeight: 1.6 }}>{d.what}</div>
                            <div style={{ fontSize: 11, color: MUTE, whiteSpace: 'nowrap' }}>{d.where}</div>
                        </Link>
                    ))}
                </div>
                <p style={{ fontSize: 13, color: MUTE, marginTop: 14, lineHeight: 1.8 }}>
                    全部やる日は少ない。朝のREVIEWと夜のDMMだけの日もある。それでも輪は回る。回り続けていることの方が、一日の量より効く。
                </p>
            </section>

            {/* 6 まだ無いもの */}
            <section style={{ marginBottom: 64 }}>
                <SectionHead n="05" title="まだ無いもの" sub="褒めるだけのページは読まれない。弱い所を三つ" />
                <div style={{ display: 'grid', gap: 12 }}>
                    {MISSING.map(m => (
                        <div key={m.head} style={{ background: '#FFFBEB', border: `1px solid #F5E6B8`, borderRadius: 14, padding: '20px 22px' }}>
                            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 6, color: DEEP }}>{m.head}</div>
                            <div style={{ fontSize: 14, color: SUB, lineHeight: 1.95 }}>{m.body}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7 地図 */}
            <section>
                <SectionHead n="06" title="全ページの地図" sub="サイドバーの並びを、役割で読み直す" />
                <div style={{ display: 'grid', gap: 12 }}>
                    {MAP.map(g => (
                        <div key={g.role} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, padding: '18px 22px' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
                                <div style={{ fontSize: 15, fontWeight: 800 }}>{g.role}</div>
                                <div style={{ fontSize: 12, color: MUTE }}>{g.note}</div>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {g.items.map(it => (
                                    <Link key={it.href} href={it.href} style={{
                                        fontSize: 12, fontWeight: 600, color: INK, textDecoration: 'none',
                                        padding: '6px 12px', borderRadius: 999, border: `1px solid ${LINE}`, background: '#FAFAF9',
                                    }}>{it.label}</Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <p style={{ fontSize: 13, color: MUTE, marginTop: 20, lineHeight: 1.8 }}>
                    このページは道具を足す場所ではない。道具を足したくなったら、まずどの束に入るかをここで決める。どの束にも入らないなら、たぶん要らない。
                </p>
            </section>
        </main>
    );
}

function SectionHead({ n, title, sub }: { n: string; title: string; sub: string }) {
    return (
        <div style={{ marginBottom: 18, display: 'flex', alignItems: 'baseline', gap: 14, borderBottom: `1px solid ${LINE}`, paddingBottom: 10 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: GOLD, fontWeight: 800 }}>{n}</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>{title}</h2>
            <div style={{ fontSize: 12, color: MUTE }}>{sub}</div>
        </div>
    );
}
