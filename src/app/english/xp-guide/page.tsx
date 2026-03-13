'use client';

import EnglishSidebar from '@/components/EnglishSidebar';

// ── Data tables ──

const EVOLUTION_STAGES = [
    { stage: 1, name: 'EGG', ja: 'タマゴ', cardXP: 1, action: 'フレーズ登録', how: '新しいフレーズを追加', color: '#B91C1C', border: '#F87171' },
    { stage: 2, name: 'HATCH', ja: '孵化', cardXP: 5, action: '初回タップ', how: 'レビューでタップ', color: '#C2410C', border: '#FB923C' },
    { stage: 3, name: 'ROOKIE', ja: 'ルーキー', cardXP: 15, action: '2回目タップ', how: '翌日にもう一度タップ', color: '#A16207', border: '#FACC15' },
    { stage: 4, name: 'FIGHTER', ja: 'ファイター', cardXP: 30, action: '3回目タップ + 録音', how: 'さらに翌日タップ + 声を録音', color: '#166534', border: '#4ADE80' },
    { stage: 5, name: 'CHAMPION', ja: 'チャンピオン', cardXP: 60, action: 'リンク追加 + 継続', how: '解説リンクを追加して継続レビュー', color: '#1E40AF', border: '#60A5FA' },
    { stage: 6, name: 'MASTER', ja: 'マスター', cardXP: 100, action: '宣言', how: '極めた!と宣言', color: '#6B21A8', border: '#A855F7' },
];

const CARD_RANKS = [
    { rank: 'NORMAL', cardXP: 1, evolution: 'EGG', visual: '無地カード', color: '#78716C', bg: '#F5F5F4' },
    { rank: 'BRONZE', cardXP: 5, evolution: 'HATCH', visual: '銅メタリック枠', color: '#CD7F32', bg: '#FDF4EC' },
    { rank: 'SILVER', cardXP: 15, evolution: 'ROOKIE', visual: '銀枠 + 微光', color: '#94A3B8', bg: '#F1F5F9' },
    { rank: 'GOLD', cardXP: 30, evolution: 'FIGHTER', visual: '金枠 + 光沢グラデーション', color: '#F6C85F', bg: '#FFFBEB' },
    { rank: 'HOLOGRAPHIC', cardXP: 60, evolution: 'CHAMPION', visual: 'ポケカ風ホロ + プリズム反射', color: '#A855F7', bg: '#FAF5FF' },
    { rank: 'LEGENDARY', cardXP: 100, evolution: 'MASTER', visual: '宇宙枠 + 伝説パーティクル', color: '#D4AF37', bg: '#FFFDE0' },
];

const PLAYER_LEVELS = [
    { range: 'Lv. 1-5', title: '新人トレーナー', en: 'Rookie', poke: 'マサラタウン出発', color: '#78716C' },
    { range: 'Lv. 6-15', title: 'コレクター', en: 'Collector', poke: '最初のバッジ', color: '#2563EB' },
    { range: 'Lv. 16-30', title: 'バトラー', en: 'Battler', poke: '中盤のジム巡り', color: '#16A34A' },
    { range: 'Lv. 31-50', title: 'エキスパート', en: 'Expert', poke: '後半のジム攻略', color: '#CA8A04' },
    { range: 'Lv. 51-70', title: 'エリート', en: 'Elite', poke: '四天王挑戦', color: '#EA580C' },
    { range: 'Lv. 71-89', title: 'チャンピオン', en: 'Champion', poke: 'リーグ優勝', color: '#DC2626' },
    { range: 'Lv. 90-99', title: 'レジェンド', en: 'Legend', poke: '裏ダンジョン', color: '#7C3AED' },
    { range: 'Lv. 100', title: '英会話マスター', en: 'Master', poke: '殿堂入り', color: '#D4AF37' },
];

const STARTERS = [
    { name: 'YOU KNOW', type: 'つなぎ型', desc: '相手の共感を引き出す。会話の潤滑油。', poke: 'フシギダネ(バランス型)', color: '#16A34A', bg: '#F0FDF4' },
    { name: 'I MEAN', type: '修正型', desc: '言い直し、補足、精度を上げる。知的な印象。', poke: 'ヒトカゲ(攻撃型)', color: '#DC2626', bg: '#FEF2F2' },
    { name: 'SO', type: '接続型', desc: '話を展開する。結論に向かう推進力。', poke: 'ゼニガメ(防御型)', color: '#2563EB', bg: '#EFF6FF' },
];

const GACHA_TIERS = [
    { tier: 'PHANTOM', ja: '幻', prob: '0.012%', odds: '1/8192', gp: 2000, color: '#FFFFFF', bg: '#1C1917', textColor: '#fff', desc: 'ポケモン第5世代の色違いと同じ確率。画面がホワイトアウトして逆転する。' },
    { tier: 'SHINY', ja: '色違い', prob: '0.024%', odds: '1/4096', gp: 500, color: '#06B6D4', bg: '#164E63', textColor: '#fff', desc: 'ポケモン第6世代の色違い確率。全回転リールで虹色に輝く。' },
    { tier: 'MYTHIC', ja: '神話', prob: '0.25%', odds: '1/400', gp: 100, color: '#EC4899', bg: '#831843', textColor: '#fff', desc: 'パチンコの大当たり確率。画面がピンクに染まり、ハートが降ってくる。' },
    { tier: 'LEGENDARY', ja: '伝説', prob: '0.5%', odds: '1/200', gp: 30, color: '#D4AF37', bg: '#FEF9C3', textColor: '#92400E', desc: '金7揃い。レジェンド演出はフルスクリーン占拠。' },
    { tier: 'MEGA', ja: '極', prob: '2%', odds: '1/50', gp: 10, color: '#8B5CF6', bg: '#EDE9FE', textColor: '#5B21B6', desc: '赤7揃い。虹色演出 + スローモーション。' },
    { tier: 'SUPER', ja: '煌', prob: '5%', odds: '1/20', gp: 5, color: '#EF4444', bg: '#FEF2F2', textColor: '#991B1B', desc: 'BAR揃い。フルスクリーン爆発。' },
    { tier: 'GREAT', ja: '輝', prob: '10%', odds: '1/10', gp: 3, color: '#F59E0B', bg: '#FFFBEB', textColor: '#92400E', desc: 'ベル揃い。画面揺れ + パーティクル。' },
    { tier: 'BONUS', ja: '光', prob: '22%', odds: '1/4.5', gp: 2, color: '#D4AF37', bg: '#FFFBEB', textColor: '#92400E', desc: 'グレープ揃い。金キラ。' },
    { tier: '凡', ja: '', prob: '~60.7%', odds: '-', gp: 1, color: '#78716C', bg: '#F5F5F4', textColor: '#57534E', desc: 'バラバラ。でも1GPはもらえる。0は存在しない。' },
];

const CHAIN_MODES = [
    { chain: '0-2', mode: '通常', en: 'Normal', miss: '60.7%', boost: 'x1', gpMult: 'x1', color: '#78716C', bg: '#F5F5F4' },
    { chain: '3-4', mode: '確変', en: 'Kakuhen', miss: '40%', boost: 'x2', gpMult: 'x1.5', color: '#D4AF37', bg: '#FFFBEB' },
    { chain: '5-9', mode: '激熱', en: 'Gekiatsu', miss: '25%', boost: 'x5', gpMult: 'x2', color: '#DC2626', bg: '#FEF2F2' },
    { chain: '10+', mode: '神', en: 'God', miss: '15%', boost: 'x10', gpMult: 'x3', color: '#7C3AED', bg: '#FAF5FF' },
];

const LUCK_TIERS = [
    { level: '普通', cardXP: '0', multiplier: 'x1.00', desc: '基本確率', color: '#78716C' },
    { level: 'ツイてる', cardXP: '500', multiplier: 'x1.20', desc: '激レア +20%', color: '#16A34A' },
    { level: '絶好調', cardXP: '2,000', multiplier: 'x1.50', desc: '激レア +50%', color: '#D4AF37' },
    { level: '神ってる', cardXP: '10,000', multiplier: 'x2.00', desc: '激レア 2倍', color: '#DC2626' },
    { level: '持ってる', cardXP: '50,000', multiplier: 'x3.00', desc: '激レア 3倍', color: '#7C3AED' },
];

const GP_MILESTONES = [
    { gp: 50, badge: 'ビギナーズラック', effect: '金色スパークル' },
    { gp: 100, badge: 'ギャンブラー', effect: 'バースト + サウンド' },
    { gp: 500, badge: 'ハイローラー', effect: '画面フラッシュ' },
    { gp: 1000, badge: 'カジノ王', effect: '紙吹雪 + 特別サウンド' },
    { gp: 5000, badge: '伝説のギャンブラー', effect: 'エピック演出 + バッジ' },
];

const BST_STATS = [
    { abbr: 'HP', ja: '汎用度', desc: 'どれだけ多くの場面で使えるか' },
    { abbr: 'ATK', ja: '衝撃度', desc: '聞いた人がハッとする度合い' },
    { abbr: 'DEF', ja: '安定度', desc: '間違えにくさ、使いやすさ' },
    { abbr: 'SPA', ja: '表現力', desc: 'ニュアンスの豊かさ' },
    { abbr: 'SPD', ja: '理解度', desc: '相手に伝わりやすさ' },
    { abbr: 'SPE', ja: '反射度', desc: 'とっさに口から出る速さ' },
];

const BST_TIERS = [
    { tier: 'S', min: 600, label: '600族', poke: 'ガブリアス、カイリュー級', prob: '0.5%', color: '#D4AF37', bg: '#FFFDE0' },
    { tier: 'A', min: 530, label: 'エース', poke: 'ギャラドス、ゲンガー級', prob: '10%', color: '#A855F7', bg: '#FAF5FF' },
    { tier: 'B', min: 470, label: '主力', poke: 'ヘラクロス、ドンファン級', prob: '30%', color: '#3B82F6', bg: '#EFF6FF' },
    { tier: 'C', min: 400, label: '標準', poke: 'ピカチュウ級', prob: '41%', color: '#10B981', bg: '#ECFDF5' },
    { tier: 'D', min: 330, label: 'ルーキー', poke: '序盤ポケ級', prob: '17%', color: '#78716C', bg: '#F5F5F4' },
    { tier: 'F', min: 0, label: 'コイキング', poke: 'コイキング。逆にレア', prob: '2%', color: '#EF4444', bg: '#FEF2F2' },
];

const REGIONS = [
    { name: 'ヒヨコ地方', theme: '日常会話', lv: '1-15', content: 'フィラーワード、挨拶、基本表現', color: '#16A34A', bg: '#F0FDF4' },
    { name: 'カジュアル地方', theme: '友達との会話', lv: '16-30', content: 'スラング、ジョーク、感情表現', color: '#D4AF37', bg: '#FFFBEB' },
    { name: 'ストリート地方', theme: 'リアルな英語', lv: '31-50', content: '省略、速い英語、ネイティブリズム', color: '#EA580C', bg: '#FFF7ED' },
    { name: 'アカデミア地方', theme: '知的な会話', lv: '51-70', content: '議論、意見、ニュアンス', color: '#2563EB', bg: '#EFF6FF' },
    { name: 'マスター地方', theme: '自由自在', lv: '71-100', content: '即興、比喩、文化的表現', color: '#7C3AED', bg: '#FAF5FF' },
];

const DAILY_TITLES = [
    { lv: 1, title: '寝起き', xp: 0, effect: 'なし', color: '#78716C' },
    { lv: 2, title: '起動', xp: 4, effect: 'ガチャ演出ON', color: '#78716C' },
    { lv: 3, title: '準備OK', xp: 28, effect: 'Card XP +10%', color: '#2563EB' },
    { lv: 4, title: 'エンジン全開', xp: 72, effect: 'Card XP +20%', color: '#16A34A' },
    { lv: 5, title: 'ゾーン', xp: 167, effect: 'Card XP +30% + 進化演出豪華化', color: '#CA8A04' },
    { lv: 6, title: '無双', xp: 351, effect: 'Card XP +50% + LUCK一時ブースト', color: '#EA580C' },
    { lv: 7, title: '覚醒', xp: 588, effect: 'GP x1.5倍', color: '#DC2626' },
    { lv: 8, title: '鬼神', xp: 873, effect: 'GP x2倍 + 全演出MAX', color: '#7C3AED' },
    { lv: 9, title: '本日の神', xp: 1310, effect: '全ボーナスMAX + 特別エフェクト', color: '#D4AF37' },
];

// Section component
function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) {
    return (
        <section id={id} style={{ marginBottom: '56px' }}>
            <h2 style={{
                fontSize: '22px', fontWeight: '800', color: '#1C1917',
                letterSpacing: '1px', marginBottom: subtitle ? '4px' : '20px',
                borderBottom: '2px solid #D4AF37', paddingBottom: '8px',
                display: 'inline-block',
            }}>
                {title}
            </h2>
            {subtitle && <p style={{ fontSize: '13px', color: '#78716C', marginBottom: '20px' }}>{subtitle}</p>}
            {children}
        </section>
    );
}

function Callout({ children, color = '#D4AF37' }: { children: React.ReactNode; color?: string }) {
    return (
        <div style={{
            background: `${color}10`, borderLeft: `3px solid ${color}`,
            padding: '12px 16px', borderRadius: '0 8px 8px 0', marginBottom: '16px',
            fontSize: '13px', color: '#44403C', lineHeight: '1.7',
        }}>
            {children}
        </div>
    );
}

export default function XpGuidePage() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FAFAF9' }}>
            <EnglishSidebar />
            <main style={{
                flex: 1,
                marginLeft: '240px',
                padding: '48px 40px 80px',
                maxWidth: '880px',
            }}>
                {/* Header */}
                <div style={{ marginBottom: '48px' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        backgroundColor: '#FFFBEB',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '700',
                        color: '#D4AF37',
                        letterSpacing: '2px',
                        marginBottom: '12px',
                    }}>
                        GAME MANUAL v4.0
                    </div>
                    <h1 style={{
                        fontSize: '32px',
                        fontWeight: '900',
                        color: '#1C1917',
                        letterSpacing: '2px',
                        marginBottom: '12px',
                    }}>
                        ようこそ、英会話マスターの世界へ
                    </h1>
                    <p style={{ fontSize: '15px', color: '#57534E', lineHeight: '1.8' }}>
                        レベル100を目指す旅に出よう。
                        カード(フレーズ)を集めて、育てて、進化させる。
                        スロットを回してGPを稼ぎ、英語中毒になる。
                        このページは、その仕組みの全部を解説する「冒険ガイド」だ。
                    </p>
                </div>

                {/* World view */}
                <div style={{
                    background: '#1C1917', borderRadius: '14px', padding: '24px 28px',
                    marginBottom: '48px', color: '#fff', lineHeight: '1.8', fontSize: '14px',
                }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#D4AF37', letterSpacing: '2px', marginBottom: '12px' }}>WORLD VIEW</div>
                    <p style={{ marginBottom: '8px' }}>TOEIC 900点。読める。聞ける。書ける。喋れない。</p>
                    <p style={{ marginBottom: '8px', color: '#A8A29E' }}>4技能のうち3つクリアして最後の1つで永遠に死んでる男が作った。</p>
                    <p style={{ marginBottom: '8px' }}>原因を調べて、だれも考えたことないことだけやったら、アプリ1個できてた。</p>
                    <p style={{ color: '#D4AF37', fontWeight: '700' }}>これはそのアプリの冒険ガイドだ。レベル100を目指す旅に出よう。</p>
                </div>

                {/* Table of Contents */}
                <div style={{
                    background: '#fff', border: '1px solid #E7E5E4', borderRadius: '12px',
                    padding: '20px 24px', marginBottom: '48px',
                }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#D4AF37', letterSpacing: '2px', marginBottom: '12px' }}>CONTENTS</div>
                    {[
                        ['currency', '2つの通貨 -- GP / Card XP'],
                        ['evolution', '進化システム -- 6段階の成長'],
                        ['cards', 'カードランク -- 進化と完全同期'],
                        ['starters', '御三家 -- 冒険の始まり'],
                        ['level', 'プレイヤーレベル -- Lv.100 英会話マスター'],
                        ['map', '冒険マップ -- 5つの地方'],
                        ['slot', 'スロットマシン -- 3リール9ティア'],
                        ['chain', '連荘システム -- 通常 / 確変 / 激熱 / 神'],
                        ['ultrarare', '激レアティア -- 神話 / 色違い / 幻'],
                        ['luck', '運気(LUCK) -- 英語を頑張ると運が上がる'],
                        ['gp-milestone', 'GPマイルストーン -- ギャンブル実績'],
                        ['bst', '種族値(BST) -- カードの運命'],
                        ['daily', '日レベル -- 冒険を加速する補助エンジン'],
                    ].map(([id, label], i) => (
                        <a key={id} href={`#${id}`} style={{
                            display: 'block', padding: '6px 0', fontSize: '13px', fontWeight: '500',
                            color: '#57534E', textDecoration: 'none', borderBottom: i < 12 ? '1px solid #F5F5F4' : 'none',
                        }}>
                            <span style={{ color: '#D4AF37', fontWeight: '700', marginRight: '8px' }}>{i + 1}.</span>
                            {label}
                        </a>
                    ))}
                </div>

                {/* 1. Currency */}
                <Section id="currency" title="2つの通貨" subtitle="役割は完全に別。壁がある。">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
                        {[
                            { name: 'Card XP', ja: 'カード経験値', desc: '各フレーズに個別に貯まる英語経験値。カードの進化・ランクの燃料。全カードの合計がプレイヤーレベルになる。', color: '#16A34A', bg: '#F0FDF4' },
                            { name: 'GP', ja: 'ギャンブルポイント', desc: 'スロット専用通貨。英語力とは一切関係ない。パチンコと同じ。ドーパミンが出るだけ。でもやめられない。', color: '#D4AF37', bg: '#FFFBEB' },
                        ].map(c => (
                            <div key={c.name} style={{
                                background: c.bg, borderRadius: '12px', padding: '20px',
                                border: `1px solid ${c.color}30`,
                            }}>
                                <div style={{ fontSize: '24px', fontWeight: '900', color: c.color, marginBottom: '4px' }}>{c.name}</div>
                                <div style={{ fontSize: '11px', fontWeight: '600', color: c.color, marginBottom: '8px', opacity: 0.7 }}>{c.ja}</div>
                                <div style={{ fontSize: '12px', color: '#57534E', lineHeight: '1.6' }}>{c.desc}</div>
                            </div>
                        ))}
                    </div>
                    <Callout>
                        Card XP = 英語力。GP = ギャンブル。この2つは壁で隔てられている。<br/>
                        ただし英語を頑張れば頑張るほど、スロットの運(LUCK)が良くなる。最高のインセンティブ設計。
                    </Callout>
                </Section>

                {/* 2. Evolution */}
                <Section id="evolution" title="進化システム" subtitle="1つのカードが成長する6つの段階。ポケモンの進化と同じ。">
                    <div style={{
                        background: '#fff', borderRadius: '12px', border: '1px solid #E7E5E4',
                        overflow: 'hidden',
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead>
                                <tr style={{ background: '#FAFAF9' }}>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px', letterSpacing: '1px' }}>STAGE</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px', letterSpacing: '1px' }}>NAME</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: '700', color: '#78716C', fontSize: '11px', letterSpacing: '1px' }}>Card XP</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px', letterSpacing: '1px' }}>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {EVOLUTION_STAGES.map((s, i) => (
                                    <tr key={i} style={{ borderTop: '1px solid #F5F5F4' }}>
                                        <td style={{ padding: '10px 16px' }}>
                                            <span style={{
                                                display: 'inline-block', width: '28px', height: '28px',
                                                borderRadius: '50%', backgroundColor: s.color,
                                                color: '#fff', fontWeight: '800', fontSize: '11px',
                                                lineHeight: '28px', textAlign: 'center',
                                            }}>{s.stage}</span>
                                        </td>
                                        <td style={{ padding: '10px 16px' }}>
                                            <span style={{ fontWeight: '700' }}>{s.name}</span>
                                            <span style={{ color: '#A8A29E', marginLeft: '6px', fontSize: '11px' }}>{s.ja}</span>
                                        </td>
                                        <td style={{ padding: '10px 16px', textAlign: 'center', color: '#78716C', fontVariantNumeric: 'tabular-nums', fontWeight: '600' }}>{s.cardXP}</td>
                                        <td style={{ padding: '10px 16px', color: '#57534E' }}>{s.how}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Callout>
                        1カード完全進化(MASTER) = 100 Card XP。進化するたびにカードの見た目も変わる。<br/>
                        HATCH: ヒビが入って光が漏れる。FIGHTER: 炎エフェクト。MASTER: 虹色オーラ + パーティクル爆発。
                    </Callout>
                </Section>

                {/* 3. Card Ranks */}
                <Section id="cards" title="カードランク" subtitle="進化とランクが完全同期。FIGHTERに進化 = 自動的にGOLDランク。">
                    <div style={{
                        background: '#fff', borderRadius: '12px', border: '1px solid #E7E5E4',
                        overflow: 'hidden', marginBottom: '16px',
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead>
                                <tr style={{ background: '#FAFAF9' }}>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>RANK</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>Card XP</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>EVOLUTION</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>VISUAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CARD_RANKS.map((r, i) => (
                                    <tr key={i} style={{ borderTop: '1px solid #F5F5F4', backgroundColor: r.bg }}>
                                        <td style={{ padding: '10px 16px', fontWeight: '700', color: r.color }}>{r.rank}</td>
                                        <td style={{ padding: '10px 16px', textAlign: 'center', fontVariantNumeric: 'tabular-nums', color: '#78716C' }}>{r.cardXP}</td>
                                        <td style={{ padding: '10px 16px', fontWeight: '600', color: '#44403C' }}>{r.evolution}</td>
                                        <td style={{ padding: '10px 16px', color: '#57534E' }}>{r.visual}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Callout color="#8B5CF6">
                        進化とランクが一致しているから二重管理がない。
                        Card XPが進化閾値を超えた瞬間に、進化 + ランクアップが同時に起きる。
                    </Callout>
                </Section>

                {/* 4. Starters */}
                <Section id="starters" title="御三家" subtitle="冒険の最初に選ぶ3体。英会話の土台となるフィラーワード。">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
                        {STARTERS.map(s => (
                            <div key={s.name} style={{
                                background: s.bg, borderRadius: '12px', padding: '20px',
                                border: `2px solid ${s.color}30`,
                            }}>
                                <div style={{ fontSize: '20px', fontWeight: '900', color: s.color, marginBottom: '4px' }}>{s.name}</div>
                                <div style={{ fontSize: '11px', fontWeight: '600', color: s.color, marginBottom: '8px', opacity: 0.7 }}>{s.type}</div>
                                <div style={{ fontSize: '12px', color: '#57534E', lineHeight: '1.6', marginBottom: '8px' }}>{s.desc}</div>
                                <div style={{ fontSize: '11px', color: '#A8A29E' }}>{s.poke}</div>
                            </div>
                        ))}
                    </div>
                    <Callout>
                        最初に1つ選ぶ。選ばなかった2つも後で手に入る。
                        選んだスターターは特別な演出(金枠、専用エフェクト)。
                    </Callout>
                </Section>

                {/* 5. Player Level */}
                <Section id="level" title="プレイヤーレベル" subtitle="全カードのCard XP合計で算出。Lv.100 = 英会話マスター。">
                    <div style={{
                        background: '#fff', borderRadius: '12px', border: '1px solid #E7E5E4',
                        overflow: 'hidden', marginBottom: '16px',
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead>
                                <tr style={{ background: '#FAFAF9' }}>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>RANGE</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>TITLE</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>POKEMON</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PLAYER_LEVELS.map((t, i) => (
                                    <tr key={i} style={{ borderTop: '1px solid #F5F5F4' }}>
                                        <td style={{ padding: '10px 16px', fontWeight: '600', color: '#44403C' }}>{t.range}</td>
                                        <td style={{ padding: '10px 16px' }}>
                                            <span style={{ color: t.color, fontWeight: '700' }}>{t.title}</span>
                                            <span style={{ color: '#A8A29E', marginLeft: '8px', fontSize: '11px' }}>{t.en}</span>
                                        </td>
                                        <td style={{ padding: '10px 16px', color: '#78716C', fontSize: '12px' }}>{t.poke}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Callout>
                        Lv.100に必要な総XPは、全カード完全進化(MASTER)の約60-70%。
                        つまり全カードをMASTERにしなくても100に到達できる。でもMASTERが多いほど早い。
                    </Callout>
                </Section>

                {/* 6. Adventure Map */}
                <Section id="map" title="冒険マップ" subtitle="ポケモンのカントー、ジョウトのように。英会話マスターにも地方がある。">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '16px' }}>
                        {REGIONS.map(r => (
                            <div key={r.name} style={{
                                background: r.bg, borderRadius: '10px', padding: '16px 20px',
                                border: `1px solid ${r.color}30`,
                                display: 'flex', alignItems: 'center', gap: '16px',
                            }}>
                                <div style={{ minWidth: '100px' }}>
                                    <div style={{ fontSize: '15px', fontWeight: '800', color: r.color }}>{r.name}</div>
                                    <div style={{ fontSize: '11px', color: '#A8A29E' }}>Lv.{r.lv}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#44403C', marginBottom: '2px' }}>{r.theme}</div>
                                    <div style={{ fontSize: '12px', color: '#78716C' }}>{r.content}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Callout>
                        各地方にジムリーダー(マイルストーンチャレンジ)がいる。バッジを集めると次の地方に進める。
                    </Callout>
                </Section>

                {/* 7. Slot Machine */}
                <Section id="slot" title="スロットマシン" subtitle="レビューするたびに回る3リール。9つのティアで運試し。">
                    <div style={{
                        background: '#1C1917', borderRadius: '12px', padding: '16px 20px',
                        marginBottom: '16px', fontSize: '13px', color: '#A8A29E', lineHeight: '1.7',
                    }}>
                        <span style={{ color: '#D4AF37', fontWeight: '700' }}>GPは英語力と一切関係ありません。</span><br/>
                        パチンコと同じです。ドーパミンが出るだけです。<br/>
                        でもこのドーパミンが英語中毒を作ります。やめられない。止まらない。それがGP。
                    </div>
                    <div style={{
                        background: '#fff', borderRadius: '12px', border: '1px solid #E7E5E4',
                        overflow: 'hidden', marginBottom: '16px',
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                            <thead>
                                <tr style={{ background: '#FAFAF9' }}>
                                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '10px', letterSpacing: '1px' }}>TIER</th>
                                    <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: '700', color: '#78716C', fontSize: '10px', letterSpacing: '1px' }}>PROB</th>
                                    <th style={{ padding: '10px 12px', textAlign: 'center', fontWeight: '700', color: '#78716C', fontSize: '10px', letterSpacing: '1px' }}>ODDS</th>
                                    <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '700', color: '#78716C', fontSize: '10px', letterSpacing: '1px' }}>GP</th>
                                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '10px', letterSpacing: '1px' }}>VISUAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {GACHA_TIERS.map((t, i) => (
                                    <tr key={i} style={{
                                        borderTop: '1px solid #F5F5F4',
                                        backgroundColor: t.bg,
                                    }}>
                                        <td style={{ padding: '10px 12px', color: t.textColor }}>
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                                <span style={{
                                                    fontSize: t.ja ? '18px' : '16px',
                                                    fontWeight: '900',
                                                    letterSpacing: '2px',
                                                }}>{t.ja || '凡'}</span>
                                                <span style={{
                                                    fontSize: '10px',
                                                    fontWeight: '600',
                                                    letterSpacing: '1.5px',
                                                    opacity: 0.6,
                                                    fontFamily: 'system-ui, -apple-system, sans-serif',
                                                }}>{t.tier === '凡' ? 'MISS' : t.tier}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '10px 12px', textAlign: 'center', color: t.textColor, fontVariantNumeric: 'tabular-nums' }}>{t.prob}</td>
                                        <td style={{ padding: '10px 12px', textAlign: 'center', color: t.textColor, fontVariantNumeric: 'tabular-nums', fontSize: '11px' }}>{t.odds}</td>
                                        <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: '700', color: t.textColor }}>+{t.gp}</td>
                                        <td style={{ padding: '10px 12px', color: t.textColor, fontSize: '11px', maxWidth: '200px' }}>{t.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Callout>
                        ハズレでも+1GP。0は存在しない。回せば回すほどGPは増える。
                    </Callout>
                </Section>

                {/* 8. Chain System */}
                <Section id="chain" title="連荘(れんちゃん)システム" subtitle="パチンコの確変・激熱がそのまま入ってる。">
                    <p style={{ fontSize: '13px', color: '#57534E', lineHeight: '1.7', marginBottom: '16px' }}>
                        ハズレ以外が出るたびにチェーンカウンターが+1。3連でパチンコの確変に突入し、
                        ハズレ確率が激減。5連で激熱、10連で神モード。ハズレを引いた瞬間、チェーンは0にリセット。
                    </p>
                    <div style={{
                        background: '#fff', borderRadius: '12px', border: '1px solid #E7E5E4',
                        overflow: 'hidden', marginBottom: '16px',
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead>
                                <tr style={{ background: '#FAFAF9' }}>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>CHAIN</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>MODE</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>MISS RATE</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>ULTRA BOOST</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>GP MULT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CHAIN_MODES.map((m, i) => (
                                    <tr key={i} style={{ borderTop: '1px solid #F5F5F4', backgroundColor: m.bg }}>
                                        <td style={{ padding: '10px 16px', fontWeight: '600', color: '#44403C', fontVariantNumeric: 'tabular-nums' }}>{m.chain}</td>
                                        <td style={{ padding: '10px 16px' }}>
                                            <span style={{ color: m.color, fontWeight: '800' }}>{m.mode}</span>
                                            <span style={{ color: '#A8A29E', marginLeft: '6px', fontSize: '11px' }}>{m.en}</span>
                                        </td>
                                        <td style={{ padding: '10px 16px', textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{m.miss}</td>
                                        <td style={{ padding: '10px 16px', textAlign: 'center', fontWeight: '700', color: m.color }}>{m.boost}</td>
                                        <td style={{ padding: '10px 16px', textAlign: 'center', fontWeight: '700', color: m.color }}>{m.gpMult}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ background: '#FFFBEB', borderRadius: '10px', padding: '16px', border: '1px solid #D4AF3730' }}>
                            <div style={{ fontSize: '12px', fontWeight: '800', color: '#D4AF37', marginBottom: '6px' }}>確変突入!</div>
                            <div style={{ fontSize: '12px', color: '#57534E', lineHeight: '1.6' }}>
                                3連目で突入。ハズレ確率が60%&rarr;40%に。金色のオーラが画面を包む。
                            </div>
                        </div>
                        <div style={{ background: '#FEF2F2', borderRadius: '10px', padding: '16px', border: '1px solid #DC262630' }}>
                            <div style={{ fontSize: '12px', fontWeight: '800', color: '#DC2626', marginBottom: '6px' }}>激熱突入!</div>
                            <div style={{ fontSize: '12px', color: '#57534E', lineHeight: '1.6' }}>
                                5連目で突入。ハズレ25%。赤い炎が画面を覆い、揺れる。GPも2倍。
                            </div>
                        </div>
                    </div>
                    <div style={{ background: '#FAF5FF', borderRadius: '10px', padding: '16px', border: '1px solid #7C3AED30', marginBottom: '16px' }}>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#7C3AED', marginBottom: '6px' }}>神 降 臨 !</div>
                        <div style={{ fontSize: '12px', color: '#57534E', lineHeight: '1.6' }}>
                            10連以上。ハズレ15%。激レアティアの確率がなんと10倍。GP3倍。
                            虹色のオーラに包まれ、全てが光り輝く。
                        </div>
                    </div>
                    <Callout color="#DC2626">
                        チェーンはセッション限り(ページ再読み込みでリセット)。
                        集中してレビューし続ければ、確変&rarr;激熱&rarr;神と一気に駆け上がれる。
                    </Callout>
                </Section>

                {/* 9. Ultra-Rare Tiers */}
                <Section id="ultrarare" title="激レアティア" subtitle="LEGENDARY超えの3つの異次元。引いたら自慢していい。">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '16px' }}>
                        {[
                            {
                                tier: 'MYTHIC', ja: '神話', gp: 100, odds: '1/400', color: '#EC4899', bg: '#FDF2F8',
                                desc: 'パチンコの大当たりと同じ確率。画面がピンクに染まり、ハートが雨のように降ってくる。',
                                compare: 'パチンコの海物語シリーズの大当たり確率(1/399.6)とほぼ同じ。打ったことあるなら分かるあの感覚。',
                            },
                            {
                                tier: 'SHINY', ja: '色違い', gp: 500, odds: '1/4096', color: '#06B6D4', bg: '#ECFEFF',
                                desc: 'ポケモン第6世代の色違い確率。全リールが虹色にシンクロ回転(全回転)。プリズマティック演出。',
                                compare: 'ポケモンXYの色違い遭遇率と完全一致。ひかるおまもり無しで草むらを歩き回るあの確率。',
                            },
                            {
                                tier: 'PHANTOM', ja: '幻', gp: 2000, odds: '1/8192', color: '#1C1917', bg: '#FAFAF9',
                                desc: 'ポケモン第5世代の色違い確率。画面がホワイトアウトし、全ての色が反転する。ゴースト7が浮かび上がる。',
                                compare: 'ポケモンBWの色違い確率。引いたら宝くじ当たったようなもん。2000GPは激レアカード一枚分。',
                            },
                        ].map(t => (
                            <div key={t.tier} style={{
                                background: t.bg, borderRadius: '14px', padding: '24px',
                                border: `2px solid ${t.color}40`,
                            }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '24px', fontWeight: '900', color: t.color }}>{t.tier}</span>
                                    <span style={{ fontSize: '16px', fontWeight: '700', color: t.color, opacity: 0.7 }}>{t.ja}</span>
                                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#78716C', marginLeft: 'auto' }}>{t.odds}</span>
                                </div>
                                <div style={{ fontSize: '22px', fontWeight: '900', color: t.color, marginBottom: '8px' }}>+{t.gp} GP</div>
                                <div style={{ fontSize: '13px', color: '#44403C', lineHeight: '1.7', marginBottom: '12px' }}>{t.desc}</div>
                                <div style={{
                                    fontSize: '12px', color: '#78716C', lineHeight: '1.6',
                                    background: `${t.color}08`, padding: '10px 14px', borderRadius: '8px',
                                    borderLeft: `3px solid ${t.color}40`,
                                }}>
                                    {t.compare}
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* 10. Luck System */}
                <Section id="luck" title="運気(LUCK)システム" subtitle="Card XPが貯まると激レアの出やすさが上がる。英語やれば運が良くなる。">
                    <div style={{
                        background: '#fff', borderRadius: '12px', border: '1px solid #E7E5E4',
                        overflow: 'hidden', marginBottom: '16px',
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead>
                                <tr style={{ background: '#FAFAF9' }}>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>LEVEL</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>Card XP累計</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>LUCK</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>EFFECT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {LUCK_TIERS.map((l, i) => (
                                    <tr key={i} style={{ borderTop: '1px solid #F5F5F4' }}>
                                        <td style={{ padding: '10px 16px', fontWeight: '700', color: l.color }}>{l.level}</td>
                                        <td style={{ padding: '10px 16px', textAlign: 'center', fontVariantNumeric: 'tabular-nums', color: '#78716C' }}>{l.cardXP}</td>
                                        <td style={{ padding: '10px 16px', textAlign: 'center', fontWeight: '900', color: l.color, fontSize: '16px' }}>{l.multiplier}</td>
                                        <td style={{ padding: '10px 16px', color: '#57534E' }}>{l.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Callout color="#D4AF37">
                        GPじゃなくてCard XPに連動。つまり英語を頑張れば頑張るほど、スロットの運が良くなる。<br/>
                        効果はMYTHIC/SHINY/PHANTOMの3ティアのみに適用。最高のインセンティブ設計。
                    </Callout>
                </Section>

                {/* 11. GP Milestones */}
                <Section id="gp-milestone" title="GPマイルストーン" subtitle="GP累計で解除される実績バッジ。英語力とは無関係。でも集めたくなる。">
                    <div style={{
                        background: '#fff', borderRadius: '12px', border: '1px solid #E7E5E4',
                        overflow: 'hidden', marginBottom: '16px',
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead>
                                <tr style={{ background: '#FAFAF9' }}>
                                    <th style={{ padding: '10px 16px', textAlign: 'right', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>GP</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>BADGE</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>EFFECT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {GP_MILESTONES.map((m, i) => (
                                    <tr key={i} style={{ borderTop: '1px solid #F5F5F4' }}>
                                        <td style={{ padding: '10px 16px', textAlign: 'right', fontWeight: '700', color: '#D4AF37', fontVariantNumeric: 'tabular-nums' }}>{m.gp.toLocaleString()}</td>
                                        <td style={{ padding: '10px 16px', fontWeight: '600', color: '#44403C' }}>{m.badge}</td>
                                        <td style={{ padding: '10px 16px', color: '#57534E' }}>{m.effect}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Section>

                {/* 12. BST */}
                <Section id="bst" title="種族値(BST)" subtitle="フレーズ登録 = 個体値ガチャ。IDで運命が決まる。">
                    <p style={{ fontSize: '13px', color: '#57534E', lineHeight: '1.7', marginBottom: '16px' }}>
                        フレーズを登録した瞬間、ランダムなID(8文字)が割り振られる。
                        このIDが、ポケモンの個体値のようにカードの6つのステータスを決定する。
                        合計値(種族値)でカードのティアが決まる。
                    </p>

                    <div style={{
                        background: '#fff', borderRadius: '12px', border: '1px solid #E7E5E4',
                        padding: '20px', marginBottom: '16px',
                    }}>
                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#1C1917', marginBottom: '12px' }}>6つのステータス</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                            {BST_STATS.map(stat => (
                                <div key={stat.abbr} style={{
                                    padding: '10px 12px', borderRadius: '8px',
                                    backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '2px' }}>
                                        <span style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '13px', color: '#3B82F6' }}>{stat.abbr}</span>
                                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#1E40AF' }}>{stat.ja}</span>
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#57534E' }}>{stat.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{
                        background: '#fff', borderRadius: '12px', border: '1px solid #E7E5E4',
                        overflow: 'hidden', marginBottom: '16px',
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead>
                                <tr style={{ background: '#FAFAF9' }}>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>TIER</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>BST</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>PROB</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>COMPARE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {BST_TIERS.map((t, i) => (
                                    <tr key={i} style={{ borderTop: '1px solid #F5F5F4', backgroundColor: t.bg }}>
                                        <td style={{ padding: '10px 16px' }}>
                                            <span style={{ fontWeight: '900', color: t.color, fontSize: '16px' }}>{t.tier}</span>
                                            <span style={{ fontWeight: '600', color: t.color, fontSize: '11px', marginLeft: '6px' }}>{t.label}</span>
                                        </td>
                                        <td style={{ padding: '10px 16px', textAlign: 'center', fontWeight: '600', fontVariantNumeric: 'tabular-nums' }}>{t.min}+</td>
                                        <td style={{ padding: '10px 16px', textAlign: 'center', fontWeight: '600', color: t.color }}>{t.prob}</td>
                                        <td style={{ padding: '10px 16px', color: '#57534E', fontSize: '12px' }}>{t.poke}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ background: '#FFFDE0', borderRadius: '10px', padding: '16px', border: '1px solid #D4AF3730' }}>
                            <div style={{ fontSize: '14px', fontWeight: '800', color: '#D4AF37', marginBottom: '6px' }}>600族 (S Tier)</div>
                            <div style={{ fontSize: '12px', color: '#57534E', lineHeight: '1.6' }}>
                                超ラッキー。そのフレーズは万能。見つけたらスクショ案件。
                            </div>
                        </div>
                        <div style={{ background: '#FEF2F2', borderRadius: '10px', padding: '16px', border: '1px solid #EF444430' }}>
                            <div style={{ fontSize: '14px', fontWeight: '800', color: '#EF4444', marginBottom: '6px' }}>コイキング (F Tier)</div>
                            <div style={{ fontSize: '12px', color: '#57534E', lineHeight: '1.6' }}>
                                弱い。でも2%しか出ないから逆にレア。MASTERまで育てたら逆に最高。
                            </div>
                        </div>
                    </div>

                    <Callout color="#D4AF37">
                        種族値はIDが生成された瞬間に確定する。後から変えられない。
                        フレーズを登録すること自体がガチャ。
                    </Callout>
                </Section>

                {/* 13. Daily Level */}
                <Section id="daily" title="日レベル" subtitle="冒険を加速する補助エンジン。毎日リセット。">
                    <p style={{ fontSize: '13px', color: '#57534E', lineHeight: '1.7', marginBottom: '16px' }}>
                        プレイヤーレベルとは別。毎日リセットされる補助システム。
                        今日どれだけ頑張ったかの指標。日レベルが上がるとCard XPやGPにボーナスがつく。
                    </p>
                    <div style={{
                        background: '#fff', borderRadius: '12px', border: '1px solid #E7E5E4',
                        overflow: 'hidden', marginBottom: '16px',
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead>
                                <tr style={{ background: '#FAFAF9' }}>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>LV</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>TITLE</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>XP</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>EFFECT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DAILY_TITLES.map((d, i) => (
                                    <tr key={i} style={{ borderTop: '1px solid #F5F5F4' }}>
                                        <td style={{ padding: '10px 16px', fontWeight: '700', color: d.color }}>Lv.{d.lv}</td>
                                        <td style={{ padding: '10px 16px', fontWeight: '700', color: d.color }}>{d.title}</td>
                                        <td style={{ padding: '10px 16px', textAlign: 'center', color: '#78716C', fontVariantNumeric: 'tabular-nums' }}>{d.xp}</td>
                                        <td style={{ padding: '10px 16px', color: '#57534E', fontSize: '12px' }}>{d.effect}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Callout>
                        日レベルは冒険を加速する補助エンジン。本体はプレイヤーLv.100への旅。<br/>
                        大事なのは毎日やること。10回でも0回より100倍いい。毎日触れば勝手にレベルが上がる。
                    </Callout>
                </Section>

                {/* System Map */}
                <Section id="system" title="全体マップ" subtitle="英会話マスターのシステム関係図。">
                    <div style={{
                        background: '#1C1917', borderRadius: '12px', padding: '24px',
                        fontFamily: 'monospace', fontSize: '12px', color: '#D4D4D4',
                        lineHeight: '1.5', overflowX: 'auto', whiteSpace: 'pre', marginBottom: '16px',
                    }}>
{`  英会話マスター Lv.100
  ━━━━━━━━━━━━━━━━━━━━━━

    プレイヤーレベル
    (全Card XPの合計)
          |
    ┌─────┼─────┐
    |     |     |
  カード  冒険  日レベル
  進化   マップ (補助)
  6段階  5地方  XPブースト
    |     |
    └──┬──┘
       |
  Card XP (英語経験値)
  カードを育てる = 英語力
  LUCK運気もここに連動
       |
  ─ ─ ┼ ─ ─ 壁 ─ ─ ─
       |
  GP (ギャンブルPts)
  英語力と無関係
  スロット専用通貨
  中毒を作るドーパミン燃料

  スロットマシン
  9ティア + 3激レア
  PHANTOM / SHINY / MYTHIC
  連荘: 確変 → 激熱 → 神`}
                    </div>
                </Section>

                {/* Rename Summary */}
                <Section id="rename" title="命名変更まとめ" subtitle="v3.0 → v4.0 での名前変更一覧。">
                    <div style={{
                        background: '#fff', borderRadius: '12px', border: '1px solid #E7E5E4',
                        overflow: 'hidden', marginBottom: '16px',
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead>
                                <tr style={{ background: '#FAFAF9' }}>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>OLD</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>NEW</th>
                                    <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: '700', color: '#78716C', fontSize: '11px' }}>WHY</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['英語魂', '英会話マスター', 'わかりやすい。RPGっぽい'],
                                    ['XP (経験値)', 'Card XP (カード経験値)', 'カード単位で貯まることを明確化'],
                                    ['SP (スパーク)', 'GP (ギャンブルポイント)', '正直。英語力と無関係を強調'],
                                    ['Card Pts', 'Card XPに統合', '二重管理をなくす'],
                                    ['チャクラ 7段階', '進化 6段階', 'ポケモン。チャクラはキモい'],
                                    ['SEED/SPARK/FORGE...', 'EGG/HATCH/ROOKIE...', 'ポケモンの進化メタファー'],
                                    ['運気 → SP連動', '運気 → Card XP連動', '英語やれば運が良くなる設計'],
                                ].map(([old_, new_, why], i) => (
                                    <tr key={i} style={{ borderTop: '1px solid #F5F5F4' }}>
                                        <td style={{ padding: '10px 16px', color: '#A8A29E', textDecoration: 'line-through' }}>{old_}</td>
                                        <td style={{ padding: '10px 16px', fontWeight: '700', color: '#D4AF37' }}>{new_}</td>
                                        <td style={{ padding: '10px 16px', color: '#57534E', fontSize: '12px' }}>{why}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Section>

                {/* Design Philosophy */}
                <div style={{
                    background: '#FFFBEB', borderRadius: '14px', padding: '24px 28px',
                    marginBottom: '48px', border: '2px solid #D4AF3740',
                }}>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#D4AF37', marginBottom: '12px', letterSpacing: '1px' }}>DESIGN PHILOSOPHY</div>
                    <ol style={{ fontSize: '13px', color: '#44403C', lineHeight: '2', paddingLeft: '20px', margin: 0 }}>
                        <li><strong>レベル100 = 話せる</strong>。これがゴール。全ての設計はここに収束する</li>
                        <li><strong>カードを育てる = 英語力が上がる</strong>。GPとの壁を明確にする</li>
                        <li><strong>GPは正直にギャンブル</strong>。誤魔化さない。でもやめられない</li>
                        <li><strong>ポケモンの文法で語る</strong>。進化、御三家、地方、ジム、色違い。30年分の共通言語</li>
                        <li><strong>0は存在しない</strong>。登録した瞬間に1。ハズレでも1GP。全てに最低保証</li>
                    </ol>
                </div>

                {/* Footer */}
                <div style={{
                    borderTop: '2px solid #E7E5E4', paddingTop: '24px', marginTop: '32px',
                    textAlign: 'center',
                }}>
                    <div style={{ fontSize: '12px', color: '#A8A29E', lineHeight: '1.6' }}>
                        このマニュアルは英会話マスタートレーニングシステムの仕組みを全て公開するものです。
                    </div>
                    <div style={{ fontSize: '11px', color: '#D4D4D4', marginTop: '4px' }}>
                        v4.0 -- 進化6段階 / GP+CardXP / 御三家 / 5地方 / 運気Card XP連動 / Lv.100
                    </div>
                </div>
            </main>
        </div>
    );
}
