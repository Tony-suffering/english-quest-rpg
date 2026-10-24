import Link from 'next/link';

export const metadata = {
    title: '始める前に読む | とにおと英語アプリ作る部',
    description:
        '本当にゼロから始める人へ。 バイブコーディングって何か、なぜあなたができるのか、必要なもの、心の準備、用語の早見表まで。 Week 1 に入る前にここを読む。',
};

const corePromises = [
    {
        n: '01',
        title: 'バイブコーディングって何?',
        body: '自分でコードを書かずに、AI に「こんな感じで作って」とお願いしてアプリを作る方法。 元テスラ AI 責任者の Karpathy が言い出した。 ChatGPT に「メール下書きして」と頼むのと同じ感覚で、Lovable に「Web アプリ作って」と頼む。 これだけ。',
    },
    {
        n: '02',
        title: 'なぜ俺 (40代・非IT) ができるのか',
        body: 'バイブコーディングはコードを「書く力」じゃなく「お願いする力」を使う。 ChatGPT に「子供の宿題分かりやすく教えて」と頼んだことがある人なら全員いける。 むしろ「自分の生活で何が欲しいか」を具体的に言える中年層の方が、ピカピカの 20代より続く。',
    },
    {
        n: '03',
        title: '8週間後の俺の状態',
        body: '自分専用の「AI 連携 英語学習アプリ」が手元にある。 URL があって、スマホからも PC からもアクセスできる。 自分が入れた英単語を AI が例文付きで覚えやすく出してくれる、自分の英作文を AI が添削してくれる。 そういうアプリが「俺のもの」として動いてる状態。',
    },
];

const needs = [
    { what: 'PC かタブレット', detail: 'スマホでもギリギリ可能だけど、画面狭くて辛い。 PC 推奨 (Win でも Mac でも、なんでも)。' },
    { what: 'Google アカウント (Gmail)', detail: '持ってる人ならそれで OK。 ない人は accounts.google.com で 5分で作れる、それで初日終わっていい。' },
    { what: 'ブラウザ', detail: 'Chrome か Safari か Edge。 普段ネット見るときに使ってるアプリ、あれ。' },
    { what: 'ChatGPT を 1回でも使った経験', detail: 'なくても進める、あった方が早い。 「AI に頼む感覚」がある人は Week 1 が楽。' },
    { what: '月 4,000円台の覚悟', detail: 'Week 2 から Lovable Pro ($25 ≒ 3,800円)、Week 6 から OpenAI API (月数百円)。 Week 1 は完全 0円。' },
    { what: '毎日 30分〜1時間の時間', detail: '通勤の片道、夜の風呂上がり、土日のどこか。 まとまった時間より「毎日少し」が効く。' },
    { what: 'ChatGPT・Cursor・凄い起業家アカウントをフォローしてる心', detail: '不要。 むしろ「俺は技術音痴」と思ってる人の方が伸びる。' },
];

const mindset = [
    {
        title: '詰まっていい',
        body: '各ステップに「詰まったら」が書いてある。 それでもダメなら X / Discord で晒す。 1人で消えない仕組み。 「詰まる」=「学んでる」。',
    },
    {
        title: '1週間で終わらなくていい',
        body: 'Week 1 を 3日かけて終わらせる人が一番多い。 8週間が 6ヶ月になっても、それは「続いてる」ことの方が大事。 「45分」「30分」は最速の人の目安、自分のペースで。',
    },
    {
        title: '恥かいていい',
        body: 'Week 7 は「公開週・恥かく週」と名付けてある。 反応が薄くてもいい、薄かったらそれを記事化する。 「恥」は差別化の本体。 ピカピカの SNS じゃないから人が集まる。',
    },
    {
        title: '完璧じゃなくていい',
        body: 'Week 1 で作るホームページはダサい。 Week 5 で作るアプリも市販と比べたら粗い。 でもそれが「俺のもの」。 「完璧じゃないけど俺が作った」がブランド。',
    },
    {
        title: '転職じゃない',
        body: 'これは「エンジニア転職」教材じゃない。 「自分用のツールを持つ」「副業の足がかり」「親戚に話せる話を増やす」教材。 転職は目的じゃなく結果として考える。',
    },
];

const glossary = [
    { term: 'バイブコーディング', plain: 'AI に「こんなアプリ作って」と日本語で頼んでアプリを作ること。 自分でコード書かない。' },
    { term: 'Lovable', plain: 'バイブコーディングの主力ツール。 lovable.dev でアクセス、ブラウザだけで動く。 無料枠あり、Pro $25。' },
    { term: 'プロンプト', plain: 'AI への指示文。 「こういうの作って」と日本語で書く、それだけ。' },
    { term: 'URL', plain: 'インターネット上のページの住所。 「https://〜」のやつ。' },
    { term: 'ブラウザ', plain: 'ネット見る道具。 Chrome、Safari、Edge とか。 普段使ってるあれ。' },
    { term: 'プロジェクト', plain: 'Lovable で「1個のアプリ」を入れる箱。 ホームページ用、TODO 用と分けて作る。' },
    { term: '公開 (Publish)', plain: 'インターネットに出して、世界中の人がアクセスできるようにすること。 ボタン 1個。' },
    { term: 'プレビュー (Preview)', plain: '公開する前に「こうなります」を見る画面。 自分しか見えない。' },
    { term: 'データベース (DB)', plain: 'データを保存する大きな倉庫。 Week 4 で扱う。' },
    { term: 'Supabase', plain: 'DB とログイン機能をくれる無料サービス。 Lovable と相性が良い、Week 4 で出てくる。' },
    { term: 'API', plain: '別のサービスを自分のアプリから呼ぶ仕組み。 Week 6 で OpenAI API を使う。' },
    { term: 'API キー', plain: 'API を呼ぶときの通行証。 長い文字列、漏らさない。' },
    { term: 'MVP', plain: '「Minimum Viable Product」の略。 最小限で動くアプリ。 完璧じゃないけど動く版、これでいい。' },
    { term: 'デプロイ', plain: 'アプリを世に出すこと。 Publish と同じ意味。' },
];

const beforeStartChecklist = [
    'PC かタブレットを目の前に置いた',
    'Gmail にログインできる、または作る覚悟がある',
    '今日 30分の時間を確保した',
    '「Week 1 が 1日で終わらなくても OK」を心に決めた',
    '「詰まったら X か Discord で晒す」と決めた',
];

export default function StartPage() {
    return (
        <div style={{ maxWidth: '820px', margin: '0 auto', padding: '48px 24px 96px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1a1a1a' }}>
            {/* Breadcrumb */}
            <div style={{ marginBottom: '32px', fontSize: '13px', color: '#666' }}>
                <Link href="/english/app-build" style={{ color: '#666', textDecoration: 'none' }}>
                    アプリ作る部
                </Link>
                <span style={{ margin: '0 8px', color: '#bbb' }}>/</span>
                <span style={{ color: '#1a1a1a' }}>始める前に</span>
            </div>

            {/* Hero */}
            <header style={{ marginBottom: '48px' }}>
                <div style={{ fontSize: '12px', letterSpacing: '0.2em', color: '#D4AF37', fontWeight: 700, marginBottom: '12px' }}>
                    BEFORE WEEK 1 / 始める前に読む
                </div>
                <h1 style={{ fontSize: '36px', fontWeight: 800, lineHeight: 1.3, marginBottom: '20px', letterSpacing: '-0.01em' }}>
                    「俺、本当にできるんかな」<br />
                    と思ってる人へ
                </h1>
                <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#444' }}>
                    Week 1 に入る前に、ここを 10分だけ読む。 バイブコーディングって何か、なぜあなた (コード書いたことない人) ができるのか、何が必要か、心の準備、そして用語の早見表まで。
                    読み終わったら Week 1 へ。 読まないで Week 1 に行ってもいい、その場合いつでもここに戻ってきていい。
                </p>
            </header>

            {/* 3 promises */}
            <section style={{ marginBottom: '56px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', letterSpacing: '-0.01em' }}>
                    まず 3つだけ知ってほしい
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {corePromises.map((p) => (
                        <div key={p.n} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '20px', backgroundColor: '#fff', border: '1px solid #E7E5E4', borderRadius: '12px' }}>
                            <div style={{ fontSize: '32px', fontWeight: 800, color: '#D4AF37', minWidth: '52px', lineHeight: 1 }}>
                                {p.n}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 10px 0', color: '#1a1a1a' }}>
                                    {p.title}
                                </h3>
                                <p style={{ fontSize: '14px', lineHeight: 1.85, color: '#444', margin: 0 }}>
                                    {p.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* What you need */}
            <section style={{ marginBottom: '56px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.01em' }}>
                    始める前に必要なもの
                </h2>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px', lineHeight: 1.7 }}>
                    全部揃ってなくていい、上から順に「ある」「ない」だけ確認する。 「ない」が多ければ、まずそれを揃える日にしていい。
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {needs.map((n, i) => (
                        <div key={i} style={{ padding: '16px 20px', backgroundColor: '#FAFAF9', borderRadius: '10px', border: '1px solid #F0EFED' }}>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>
                                {n.what}
                            </div>
                            <div style={{ fontSize: '13px', lineHeight: 1.75, color: '#555' }}>
                                {n.detail}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mindset */}
            <section style={{ marginBottom: '56px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.01em' }}>
                    心の準備 (これだけは決めてから始める)
                </h2>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px', lineHeight: 1.7 }}>
                    技術より大事。 5つだけ。
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {mindset.map((m, i) => (
                        <div key={i} style={{ padding: '20px 24px', backgroundColor: '#fff', border: '1px solid #E7E5E4', borderRadius: '12px', borderLeft: '3px solid #D4AF37' }}>
                            <h3 style={{ fontSize: '15.5px', fontWeight: 700, margin: '0 0 8px 0', color: '#1a1a1a' }}>
                                {m.title}
                            </h3>
                            <p style={{ fontSize: '14px', lineHeight: 1.85, color: '#444', margin: 0 }}>
                                {m.body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Glossary */}
            <section style={{ marginBottom: '56px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.01em' }}>
                    用語の早見表 (この14語だけ知ってれば 8週間 進める)
                </h2>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px', lineHeight: 1.7 }}>
                    全部覚えなくていい。 出てきたらここに戻る、何回戻ってきてもいい。 各 Week にも個別の用語集がある。
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                    {glossary.map((g, i) => (
                        <div key={i} style={{ padding: '14px 18px', backgroundColor: '#fff', border: '1px solid #E7E5E4', borderRadius: '10px' }}>
                            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1a1a1a', marginBottom: '4px' }}>
                                {g.term}
                            </div>
                            <div style={{ fontSize: '12.5px', lineHeight: 1.7, color: '#555' }}>
                                {g.plain}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Checklist */}
            <section style={{ marginBottom: '56px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.01em' }}>
                    始める前の自己チェック (5項目)
                </h2>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px', lineHeight: 1.7 }}>
                    全部「OK」になったら Week 1 へ。 1つでも「ない」「迷う」があれば、今日はここで止めて準備する日にしていい。
                </p>
                <ul style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', margin: 0 }}>
                    {beforeStartChecklist.map((c, i) => (
                        <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '14px 18px', backgroundColor: '#FAFAF9', borderRadius: '8px' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: '2px solid #10B981', flexShrink: 0, marginTop: '2px' }} />
                            <span style={{ fontSize: '14px', lineHeight: 1.65, color: '#333' }}>{c}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Final words from Tonio */}
            <section style={{ marginBottom: '48px', padding: '28px 32px', backgroundColor: '#1a1a1a', color: '#fff', borderRadius: '16px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#D4AF37', fontWeight: 600, marginBottom: '14px' }}>
                    最後にとにおから
                </div>
                <p style={{ fontSize: '15px', lineHeight: 1.95, margin: 0 }}>
                    俺も最初は「コードってなんか怖い」「俺なんかが作れるはずない」って思ってた。 でもやってみたら、「あ、これお願いする作業だ」って分かった。
                    お前 (= 読んでるあなた) は ChatGPT に「これ訳して」と頼める。 つまり、もう「お願いする力」は持ってる。 あとは Lovable に同じことを頼むだけ。
                    完璧な人だけ進める教材じゃない、Gmail なくて初日終わる人もいる、Week 4 で 1週間止まる人もいる。 みんなそう。 だから安心して、Week 1 を開いてくれ。
                </p>
            </section>

            {/* CTA */}
            <section style={{ textAlign: 'center', padding: '24px 0' }}>
                <Link
                    href="/english/app-build/week-1"
                    style={{
                        display: 'inline-block',
                        padding: '18px 40px',
                        backgroundColor: '#D4AF37',
                        color: '#1a1a1a',
                        borderRadius: '10px',
                        fontSize: '15px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        letterSpacing: '0.02em',
                        boxShadow: '0 4px 12px rgba(212, 175, 55, 0.25)',
                    }}
                >
                    Week 1 を開く →
                </Link>
                <div style={{ marginTop: '20px', fontSize: '13px', color: '#888' }}>
                    迷ったら <Link href="/english/app-build/about" style={{ color: '#666', textDecoration: 'underline' }}>About ページ</Link> で FAQ も読める。
                </div>
            </section>
        </div>
    );
}
