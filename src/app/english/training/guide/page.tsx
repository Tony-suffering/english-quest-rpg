'use client';

import Link from 'next/link';

const G = '#D4AF37';
const GR = '#10B981';
const S50 = '#FAFAF9';
const S100 = '#F5F5F4';
const S200 = '#E7E5E4';
const S500 = '#78716C';
const S600 = '#57534E';
const S700 = '#44403C';
const S800 = '#292524';
const S900 = '#1C1917';

const LEVELS = [
    { level: 1, name: 'SEED', ja: '種', meaning: '登録しただけ。まだ覚えてない。', howTo: 'フレーズを追加した時点で自動。', gradFrom: '#F87171', gradTo: '#FECACA', color: '#B91C1C' },
    { level: 2, name: 'SPARK', ja: '芽', meaning: '1回見た。なんとなく覚えた。', howTo: 'カードをタップしてレベルアップ。', gradFrom: '#FB923C', gradTo: '#FED7AA', color: '#C2410C' },
    { level: 3, name: 'FORGE', ja: '鍛', meaning: '繰り返し練習中。定着してきた。', howTo: 'タップでLv.3へ。復習を繰り返す。', gradFrom: '#FACC15', gradTo: '#FEF08A', color: '#A16207' },
    { level: 4, name: 'OWN', ja: '得', meaning: '自分のものにした。考えなくても出る。', howTo: 'タップでLv.4へ。ここが「使える」ライン。', gradFrom: '#4ADE80', gradTo: '#BBF7D0', color: '#166534' },
    { level: 5, name: 'VOICE', ja: '声', meaning: '口が覚えてる。自然に出てくる。', howTo: '条件を満たすと自動昇格。', gradFrom: '#60A5FA', gradTo: '#BFDBFE', color: '#1E40AF' },
    { level: 6, name: 'VISION', ja: '研', meaning: '使い方を理解してる。応用できる。', howTo: '条件を満たすと自動昇格。', gradFrom: '#818CF8', gradTo: '#C7D2FE', color: '#3730A3' },
    { level: 7, name: 'CROWN', ja: '極', meaning: '完全にマスター。もう自分の言葉。', howTo: '自分で「マスターした」と宣言。', gradFrom: '#A855F7', gradTo: '#DDD6FE', color: '#6B21A8' },
];

const cardStyle: React.CSSProperties = {
    background: '#fff',
    borderRadius: 16,
    padding: '24px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    border: `1px solid ${S200}`,
    marginBottom: 16,
};

const headingStyle: React.CSSProperties = {
    fontSize: 16, fontWeight: 700, color: S800, margin: '0 0 16px',
};

const bodyStyle: React.CSSProperties = {
    fontSize: 13, color: S600, lineHeight: 2, margin: 0,
};

const stepNumStyle = (color: string): React.CSSProperties => ({
    width: 32, height: 32, borderRadius: '50%', backgroundColor: color,
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 14, fontWeight: 700, flexShrink: 0,
});

export default function TrainingGuidePage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: S50 }}>
            {/* Hero */}
            <div style={{
                background: `linear-gradient(135deg, ${S50} 0%, #FFFBEB 50%, ${S50} 100%)`,
                padding: '48px 24px 40px',
                textAlign: 'center',
                borderBottom: `1px solid ${S200}`,
            }}>
                <div style={{ fontSize: 11, letterSpacing: '0.3em', color: G, fontWeight: 700, marginBottom: 8 }}>
                    TRAINING GUIDE
                </div>
                <h1 style={{ fontSize: 28, fontWeight: 300, color: S900, margin: '0 0 12px' }}>
                    トレーニングの使い方
                </h1>
                <p style={{ fontSize: 14, color: S500, lineHeight: 1.8, maxWidth: 480, margin: '0 auto 24px' }}>
                    英語フレーズを登録して、繰り返しレビューして、<br />
                    自分のものにしていく。それがトレーニングです。
                </p>
                <Link
                    href="/english/training"
                    style={{
                        display: 'inline-block', padding: '10px 24px',
                        background: G, color: S900, borderRadius: 8,
                        textDecoration: 'none', fontSize: 13, fontWeight: 600,
                    }}
                >
                    トレーニングを開く
                </Link>
            </div>

            <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 24px 80px' }}>

                {/* ── SECTION 1: 始め方 ── */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                        <div style={{ width: 4, height: 24, backgroundColor: G, borderRadius: 2 }} />
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: S800, margin: 0 }}>始め方</h2>
                    </div>

                    {/* Step 1 */}
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                            <div style={stepNumStyle(GR)}>1</div>
                            <div>
                                <h3 style={{ fontSize: 15, fontWeight: 700, color: S800, margin: '0 0 8px' }}>
                                    フレーズを追加する
                                </h3>
                                <p style={bodyStyle}>
                                    トレーニングに追加する方法は3つあります。<br /><br />
                                    <strong style={{ color: G }}>A. 5min英会話から</strong><br />
                                    5min英会話のレッスン完了後に「+登録」ボタンを押すと、そのフレーズがトレーニングに追加されます。初心者にはこの方法がおすすめ。<br /><br />
                                    <strong style={{ color: G }}>B. Questから</strong><br />
                                    Quest（冒険）で新しいフレーズに出会い、「捕まえる」を押すとトレーニングデッキに追加されます。10カテゴリ、各25フレーズ。<br /><br />
                                    <strong style={{ color: G }}>C. 手動で追加</strong><br />
                                    トレーニング画面右上の「+」ボタンから、自分で英語と日本語を入力して追加できます。
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                            <div style={stepNumStyle(G)}>2</div>
                            <div>
                                <h3 style={{ fontSize: 15, fontWeight: 700, color: S800, margin: '0 0 8px' }}>
                                    レビューする
                                </h3>
                                <p style={bodyStyle}>
                                    トレーニング画面を開くと、登録したフレーズがカードとして表示されます。<br /><br />
                                    <strong>カレンダー表示</strong>：日付ごとにフレーズが割り振られています。今日の日付をタップすると、その日のフレーズ一覧が出ます。<br /><br />
                                    <strong>リスト表示</strong>：全フレーズを一覧で見られます。上部の「List」ボタンで切り替え。<br /><br />
                                    カードをタップすると英語が表示されます。日本語を見て英語を思い出す、という練習を繰り返してください。
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                            <div style={stepNumStyle('#8B5CF6')}>3</div>
                            <div>
                                <h3 style={{ fontSize: 15, fontWeight: 700, color: S800, margin: '0 0 8px' }}>
                                    レベルを上げる
                                </h3>
                                <p style={bodyStyle}>
                                    カードをタップするとチャクラレベルが1つ上がります。<br />
                                    Lv.1（種）から始まり、繰り返すほどレベルが上がっていきます。<br />
                                    Lv.4（得）まで来たら「自分のもの」。考えなくても英語が出てくる状態です。<br /><br />
                                    目標は全カードをLv.4以上にすること。焦らず、毎日少しずつ。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SECTION 2: 画面の見方 ── */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                        <div style={{ width: 4, height: 24, backgroundColor: '#3B82F6', borderRadius: 2 }} />
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: S800, margin: 0 }}>画面の見方</h2>
                    </div>

                    <div style={cardStyle}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {[
                                {
                                    title: 'カレンダー',
                                    desc: '月表示のカレンダーです。各日付に割り振られたフレーズの進捗が色付きバーで表示されます。日付をタップするとその日のフレーズ一覧が開きます。',
                                    color: G,
                                },
                                {
                                    title: 'カード',
                                    desc: '1枚のカードが1つのフレーズです。表に日本語、タップすると英語が見えます。左上のレベル表示（種/芽/鍛/得...）が今の習熟度です。',
                                    color: '#EF4444',
                                },
                                {
                                    title: 'スロットマシン',
                                    desc: 'レビュー成功時にスロットが回ります。MISS / BONUS / GREAT / SUPER / MEGA / LEGENDARY の6段階。連続正解でボーナスが増えます。楽しみながら続けるための仕組みです。',
                                    color: '#F59E0B',
                                },
                                {
                                    title: 'チャクラバー（カレンダー内）',
                                    desc: 'カレンダーの各日に表示される7本の色付きバー。下（赤）がSEED、上（紫）がCROWN。バーが上に伸びるほど、その日のフレーズの習熟度が高いことを示します。',
                                    color: '#8B5CF6',
                                },
                                {
                                    title: 'マリオランナー',
                                    desc: '画面下部に表示されるミニゲーム。レビューするとキャラが走ります。ONにしたい場合は「SHOW RUNNER」ボタンをタップ。',
                                    color: '#3B82F6',
                                },
                            ].map(item => (
                                <div key={item.title}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: item.color }} />
                                        <span style={{ fontSize: 14, fontWeight: 700, color: S800 }}>{item.title}</span>
                                    </div>
                                    <p style={{ fontSize: 13, color: S600, margin: 0, lineHeight: 1.8, paddingLeft: 16 }}>
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── SECTION 3: チャクラレベル ── */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                        <div style={{ width: 4, height: 24, backgroundColor: '#8B5CF6', borderRadius: 2 }} />
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: S800, margin: 0 }}>チャクラレベル（習熟度）</h2>
                    </div>
                    <p style={{ fontSize: 13, color: S500, marginBottom: 16, lineHeight: 1.8 }}>
                        フレーズの「どのくらい覚えたか」を7段階で表します。<br />
                        Lv.1〜4はタップで手動。Lv.5〜6は条件達成で自動。Lv.7は自分で宣言。
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {LEVELS.map(lv => (
                            <div key={lv.level} style={{
                                ...cardStyle,
                                marginBottom: 0,
                                borderLeft: `4px solid ${lv.color}`,
                                padding: '16px 20px',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                                    <div style={{
                                        width: 28, height: 28, borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${lv.gradFrom}, ${lv.gradTo})`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 12, fontWeight: 800, color: '#fff',
                                    }}>
                                        {lv.ja}
                                    </div>
                                    <div>
                                        <span style={{ fontSize: 14, fontWeight: 700, color: lv.color }}>
                                            Lv.{lv.level} {lv.name}
                                        </span>
                                    </div>
                                    {lv.level >= 5 && lv.level <= 6 && (
                                        <span style={{ fontSize: 9, fontWeight: 700, color: lv.color, background: `${lv.gradTo}`, padding: '2px 6px', borderRadius: 4, marginLeft: 'auto' }}>AUTO</span>
                                    )}
                                    {lv.level === 7 && (
                                        <span style={{ fontSize: 9, fontWeight: 700, color: '#6B21A8', background: '#EDE9FE', padding: '2px 6px', borderRadius: 4, marginLeft: 'auto' }}>MANUAL</span>
                                    )}
                                </div>
                                <p style={{ fontSize: 13, color: S600, margin: '0 0 4px', paddingLeft: 38 }}>
                                    {lv.meaning}
                                </p>
                                <p style={{ fontSize: 11, color: S500, margin: 0, paddingLeft: 38 }}>
                                    {lv.howTo}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── SECTION 4: よくある質問 ── */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                        <div style={{ width: 4, height: 24, backgroundColor: GR, borderRadius: 2 }} />
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: S800, margin: 0 }}>よくある質問</h2>
                    </div>

                    {[
                        {
                            q: 'フレーズがまだ1個もないけど？',
                            a: 'まず「5min英会話」でレッスンをやってみてください。完了画面で「+登録」を押すとトレーニングにフレーズが追加されます。または「Quest」でフレーズを捕まえることもできます。',
                        },
                        {
                            q: '毎日やらないとダメ？',
                            a: 'ダメではないです。でも毎日5分でも触ると定着率が全然違います。カレンダーに記録が残るので、モチベーション維持にもなります。',
                        },
                        {
                            q: 'レベルを間違えて上げてしまった',
                            a: 'Lv.7（CROWN）以外はいつでも戻せます。カードの詳細画面からレベルを変更できます。CROWNだけはリセットするとLv.1に戻るので注意。',
                        },
                        {
                            q: 'スロットは何のためにあるの？',
                            a: '楽しんで続けるための仕組みです。レビュー成功のたびに回って、XPやカードポイントがもらえます。スロットが苦手ならOFFにもできます。',
                        },
                        {
                            q: '5min英会話から追加したフレーズはどこにある？',
                            a: 'トレーニングのリスト表示で確認できます。カテゴリが「5min」と表示されているものが5min英会話から追加されたフレーズです。',
                        },
                    ].map((faq, i) => (
                        <div key={i} style={{ ...cardStyle, padding: '16px 20px' }}>
                            <p style={{ fontSize: 14, fontWeight: 600, color: S800, margin: '0 0 8px' }}>
                                Q. {faq.q}
                            </p>
                            <p style={{ fontSize: 13, color: S600, margin: 0, lineHeight: 1.8 }}>
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>

                {/* ── SECTION 5: おすすめの流れ ── */}
                <div style={cardStyle}>
                    <h2 style={headingStyle}>おすすめの毎日の流れ</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                            { time: '5分', action: '5min英会話で今日のレッスン', detail: 'フレーズ5個と会話シーン1つ。気に入ったら登録。' },
                            { time: '3分', action: 'トレーニングで今日のカードを確認', detail: 'カレンダーで今日の日付をタップ。カードを見てレビュー。' },
                            { time: '2分', action: 'レベルが上がったらタップ', detail: '「これは覚えた」と思ったらタップしてレベルアップ。' },
                        ].map((step, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: 12, alignItems: 'flex-start',
                                padding: '12px 16px', backgroundColor: S50, borderRadius: 12,
                            }}>
                                <div style={{
                                    fontSize: 11, fontWeight: 700, color: G,
                                    backgroundColor: `${G}12`, padding: '4px 10px',
                                    borderRadius: 6, flexShrink: 0, minWidth: 40, textAlign: 'center',
                                }}>
                                    {step.time}
                                </div>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: S800, marginBottom: 2 }}>
                                        {step.action}
                                    </div>
                                    <div style={{ fontSize: 12, color: S500 }}>
                                        {step.detail}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        marginTop: 16, padding: '12px 16px', backgroundColor: `${G}08`,
                        borderRadius: 12, border: `1px solid ${G}20`,
                    }}>
                        <p style={{ fontSize: 12, color: S600, margin: 0, lineHeight: 1.8 }}>
                            合計10分。これを30日続けるだけで、日常英会話の基礎フレーズが150個以上身につきます。
                            完璧にやろうとしなくて大丈夫。触れた回数が多いほど、勝手に覚えます。
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                    <Link href="/english/training" style={{
                        flex: 1, padding: '14px 0', borderRadius: 14,
                        backgroundColor: G, color: S900, fontSize: 14, fontWeight: 700,
                        textDecoration: 'none', textAlign: 'center',
                        boxShadow: '0 4px 16px rgba(212,175,55,0.25)',
                    }}>
                        トレーニングを開く
                    </Link>
                    <Link href="/english/5min" style={{
                        flex: 1, padding: '14px 0', borderRadius: 14,
                        backgroundColor: 'transparent', border: `1px solid ${S200}`,
                        color: S600, fontSize: 14, fontWeight: 600,
                        textDecoration: 'none', textAlign: 'center',
                    }}>
                        5min英会話へ
                    </Link>
                </div>
            </div>
        </div>
    );
}
