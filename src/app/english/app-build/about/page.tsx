import Link from 'next/link';

export const metadata = {
    title: 'About | とにおと英語アプリ作る部',
    description: '「とにおと英語アプリ作る部」の対象者・価格・FAQ・開講予定。',
};

const faq = [
    {
        q: 'プログラミング完全に初心者でも大丈夫?',
        a: 'むしろこの教材の対象。 「ChatGPT は触ったことある」レベルから始める想定。 環境構築 (Mac/Win 設定など) はゼロ、ブラウザだけで完結する。',
    },
    {
        q: '年齢制限ある?',
        a: 'ない。 40代・50代・60代を主ターゲットに作ってる。 むしろ若手より「自分用のツールが欲しい」動機が強くて続く層。',
    },
    {
        q: '英語ペラペラじゃないけど大丈夫?',
        a: 'OK。 とにお自身も英語ペラペラじゃない。 むしろ「英語を学習中の人が英語学習アプリを作る」のが一番リアリティある教材になる。',
    },
    {
        q: '毎週どのくらい時間が要る?',
        a: '各週 2〜5時間。 通勤 (30分×平日5) + 週末 (1時間) で完結する設計。 まとめてやりたい人は週末 4時間でも OK。',
    },
    {
        q: 'Lovable / Supabase / OpenAI API の費用は?',
        a: 'Week 1 は完全 0円。 Week 2 から Lovable Pro ($25 ≒ 約3800円/月) 推奨。 Week 4 から Supabase (無料枠で OK)。 Week 6 で OpenAI API (月数百円)。 合計でも月 4000円台。',
    },
    {
        q: '8週間で本当に何か作れる?',
        a: '作れる。 ただし「市販アプリと同等」は無理。 「自分用 + 家族用 + 数人の友達用」レベルの本気アプリは可。 そこから先は卒業後に育てる。',
    },
    {
        q: '転職に使える?',
        a: '直接は無理。 でも「副業」「自分の作品」「親戚や友人へのアピール」「上位サロン (まさおさん等) への準備」には充分。 転職は「目的」じゃなく「結果」として考える設計。',
    },
    {
        q: '挫折しそうな時どうする?',
        a: '各週に「troubles」セクションがある。 詰まりやすい場所と対処を先回りで書いてある。 それでも詰まったら X で晒すか LINE で報告。 1人で消えない仕組みが目標。',
    },
    {
        q: 'コミュニティ (Discord) はある?',
        a: '近日開設予定。 まずは note と X が場。 質問は X で「@toniolab #アプリ作る部」つけると拾われる。',
    },
    {
        q: '価格は?',
        a: '現在無料公開中 (準備期間)。 正式リリース時に月額 2,980円帯のメンバーシップを予定。 早期登録者は永久 1,980円などの優遇を検討中。',
    },
];

export default function AboutPage() {
    return (
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px 96px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1a1a1a' }}>
            {/* Header */}
            <div style={{ marginBottom: '48px' }}>
                <Link
                    href="/english/app-build"
                    style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}
                >
                    &larr; アプリ作る部 トップへ
                </Link>
            </div>

            <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.01em' }}>
                この教材について
            </h1>

            {/* Mission */}
            <section style={{ marginBottom: '56px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.01em' }}>
                    狙い
                </h2>
                <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#333' }}>
                    日本のバイブコーディング界隈は、上は「まさおさん (月9800円・中上級向け)」、下は「Progate / ドットインストール (月1080円・コード文法学習)」しかない。
                    その真ん中、「コード触ったことゼロ・でも自分用のツールが欲しい中年・非IT」の層が完全に空白だった。
                    この教材はその空白を埋める。 8週間後に「自分のアプリを持ってる人」になる、それだけが目的。
                </p>
            </section>

            {/* Teaching philosophy */}
            <section style={{ marginBottom: '56px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.01em' }}>
                    教材の作りで大事にしてること
                </h2>
                <p style={{ fontSize: '14.5px', lineHeight: 1.85, color: '#333', marginBottom: '20px' }}>
                    プログラミング教材の 9割は「ある程度わかってる人」向けに書かれてる。 専門用語が説明なしで出てきて、ボタンの場所も「画面の上にある」で済まされる。 ここは違う。 中年・非IT・PC ボタンの場所も自信ない人を floor にして、徹底的にレベルを下げる。
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {[
                        {
                            title: '各ステップに「なぜ・やり方・こうなれば成功・詰まったら」',
                            body: 'やり方だけ書いて終わりにしない。 「なぜそれをやるか」を先に説明、「こうなったら成功」で確認できる、「詰まったら」で先回りで助ける。 1ステップが 4ブロック。',
                        },
                        {
                            title: '用語は毎週「用語集」で説明',
                            body: '「ブラウザ」「URL」「プロンプト」「API キー」「RLS」「OAuth」など、出てきた専門用語は全部その週の用語集に書いてある。 戻ってきていい、覚えてなくていい、使ってるうちに自然に分かる。',
                        },
                        {
                            title: '1週間で終わらなくていい',
                            body: '「Week 1 を 3日かけて終わらせる人が一番多い」と最初に言う。 「45分」「30分」と書いてあるのは最速で進める人の目安、自分のペースで OK。 8週間が 6ヶ月になってもいい。',
                        },
                        {
                            title: '「分からない」を恥じない',
                            body: '「Gmail なくて先に進めない: 今日はここで終わっていい。 別の日に Gmail を作ってから戻る。 これは恥じゃない、初日のハードルはそういうもの」と書いてある。 全ての「詰まったら」がこのトーン。',
                        },
                        {
                            title: '環境構築ゼロ',
                            body: 'プログラミング学習で 9割が脱落するのが「環境構築 (PC の設定)」。 この教材はブラウザだけで完結する Lovable + Supabase 主軸で、脱落点を回避してる。',
                        },
                    ].map((item, i) => (
                        <div key={i} style={{ padding: '18px 20px', backgroundColor: '#fff', border: '1px solid #E7E5E4', borderRadius: '10px' }}>
                            <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>
                                {item.title}
                            </div>
                            <div style={{ fontSize: '13.5px', lineHeight: 1.85, color: '#555' }}>
                                {item.body}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tools */}
            <section style={{ marginBottom: '56px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.01em' }}>
                    使うツール
                </h2>
                <ul style={{ paddingLeft: '20px', lineHeight: 1.9, fontSize: '14px', color: '#333' }}>
                    <li><strong>Lovable</strong> (主軸): プロンプトで Web アプリ生成、ブラウザ完結。 無料枠 5メッセージ/日、Pro $25/月。</li>
                    <li><strong>Supabase</strong>: DB と認証。 無料枠で 8週間は完走可。</li>
                    <li><strong>OpenAI または Anthropic API</strong>: AI 機能。 月数百円で済む。</li>
                    <li><strong>X / note</strong>: 公開と振り返り。 既存アカウントで OK。</li>
                </ul>
                <p style={{ fontSize: '13px', color: '#666', marginTop: '12px', lineHeight: 1.7 }}>
                    意図的に「環境構築が要らない」「ブラウザだけで完結」「合計月 4000円台」に収めてある。 ここがハードルになるとほぼ全員脱落するため。
                </p>
            </section>

            {/* Price */}
            <section style={{ marginBottom: '56px', padding: '32px', backgroundColor: '#FAFAF9', borderRadius: '12px', border: '1px solid #E7E5E4' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.01em' }}>
                    価格
                </h2>
                <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#333', marginBottom: '12px' }}>
                    現在 <strong>無料公開中</strong> (準備期間)。 全 8週間の教材本文 + troubles + 卒業条件まで読める。
                </p>
                <p style={{ fontSize: '15px', lineHeight: 1.85, color: '#333', marginBottom: '12px' }}>
                    正式リリース時に <strong>月額 2,980円</strong> のメンバーシップ予定。 内訳:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: 1.85, fontSize: '14px', color: '#333' }}>
                    <li>Discord コミュニティ参加 (質問・進捗共有・卒業生 OB 会)</li>
                    <li>週次 build-along ライブ (金曜21時想定)</li>
                    <li>追加コンテンツ (V2 制作・別ジャンルへの応用編)</li>
                    <li>1on1 相談枠 (月1回・希望者のみ)</li>
                </ul>
                <p style={{ fontSize: '13px', color: '#666', marginTop: '16px', lineHeight: 1.7 }}>
                    早期に X / note でフィードバックくれた人には永久 1,980円などの優遇を検討中。 興味あれば X @toniolab に DM。
                </p>
            </section>

            {/* FAQ */}
            <section style={{ marginBottom: '56px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', letterSpacing: '-0.01em' }}>
                    FAQ
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {faq.map((item, i) => (
                        <div key={i} style={{ paddingBottom: '20px', borderBottom: '1px solid #E7E5E4' }}>
                            <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px', color: '#1a1a1a' }}>
                                Q. {item.q}
                            </div>
                            <div style={{ fontSize: '14px', lineHeight: 1.8, color: '#444' }}>
                                A. {item.a}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ textAlign: 'center', padding: '32px 0' }}>
                <Link
                    href="/english/app-build/week-1"
                    style={{
                        display: 'inline-block',
                        padding: '14px 32px',
                        backgroundColor: '#1a1a1a',
                        color: '#fff',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        letterSpacing: '0.02em',
                    }}
                >
                    Week 1 から始める
                </Link>
            </section>
        </div>
    );
}
