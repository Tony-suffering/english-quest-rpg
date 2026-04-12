'use client';

import { useEffect, useState } from 'react';

// ─── Refined celebration overlay — DailyQuote aesthetic ─────
// Tiers: must (small), normal (medium), final (lavish — all mastered)

export type QuestTier = 'must' | 'normal' | 'final';

interface QuestCelebrationProps {
    tier: QuestTier;
    onDismiss: () => void;
}

const gold = '#D4AF37';
const green = '#10B981';
const easing = 'cubic-bezier(0.2, 0.65, 0.3, 0.9)';

// ─── Praise messages (always fresh, no streak tied) ────────

const MUST_PRAISE = [
    { big: 'NICE', sub: 'MUSTクリア。今日はもう勝ち確。お前えらい。' },
    { big: 'GOOD', sub: '3聴1登録、完了。これがゼロ日と全然違うんだよ。' },
    { big: 'YES', sub: 'MUST突破。あと何もしなくても、今日の勝ち。' },
    { big: 'WIN', sub: '最初の3歩完了。ここで帰ってもOK、マジで。' },
    { big: 'EASY', sub: 'MUSTクリア。歯磨きレベルで英語に触った、それでいい。' },
    { big: 'DONE', sub: '義務感ゼロでやれたな？それが一番強い。' },
    { big: 'GO', sub: '3聴1登録完了。次どうする？帰る？進む？自由だ。' },
    { big: 'YES', sub: 'MUSTクリア記録、静かに積み上がってくぞ。' },
    { big: 'CLEAR', sub: '今日のMUST、完了。0日坊主にならなかっただけで偉い。' },
    { big: 'HEY', sub: '3つ聴いた時点でお前、上位30%入り。知ってた？' },
    { big: 'NICE', sub: '今日やらない自分、倒した。これが一番えらい。' },
    { big: 'OK', sub: 'MUST達成。「今日めんどい」に勝った、その事実だけで十分。' },
    { big: 'LIT', sub: '3聴1登録完了！お前の「継続」ゲージ、今+1。' },
    { big: 'YES', sub: 'MUSTクリア！ベッドで寝ながらでもこの気分持ってけ。' },
    { big: 'GOOD', sub: '3聴1登録、達成。この積み重ね、3ヶ月後に爆発するから。' },
    { big: 'WIN', sub: 'MUST突破！今日のお前、週末の自分を助けた。' },
    { big: 'DONE', sub: 'MUSTクリア完了。明日また来い、同じだけでいい。' },
    { big: 'HA!', sub: '「今日だけはサボる」に打ち勝ったな。勝者の顔してる。' },
    { big: 'GG', sub: '3聴1登録！今日の英語ノルマ、完全クリア。' },
    { big: 'NICE', sub: 'MUST突破。これが「続く人」の動き、まさに。' },
    { big: 'YES', sub: '3聴1登録完了！お前の未来、今日ちょっと変わったぞ。' },
    { big: 'DONE', sub: 'MUSTクリア。英語に触った日数、人生の貯金だ。' },
    { big: 'AYE', sub: '3聴1登録！これを21日続けたら習慣になる。今日1日目？' },
    { big: 'YES', sub: 'MUST完了。やらない日の自分、今日は倒せた。偉い。' },
];

const NORMAL_PRAISE = [
    { big: 'NICE!!', sub: '5聴3登録！普通クエストクリア、やるじゃん。' },
    { big: 'GREAT', sub: '中級クリア！お前、エンジンかかってきたな。' },
    { big: 'SOLID', sub: '5聴3登録。この密度、完全に「やる人」側の動き。' },
    { big: 'NOICE', sub: '普通クエ突破！今日のお前、本気モード入った。' },
    { big: 'YES!!', sub: '5聴3登録達成。周りと差がつき始めてる、マジで。' },
    { big: 'BOOM', sub: '中級クリア！英語と真面目に向き合う日、それが今日。' },
    { big: 'CLEAN', sub: 'NORMAL完了。これ毎日やってる奴、ほぼいないぞ？' },
    { big: 'HOT', sub: '5聴3登録！最初の1週間これ続けたら、別人確定。' },
    { big: 'FIRE', sub: '中級突破！お前、今日何か覚醒してないか？' },
    { big: 'BEAST', sub: '5聴3登録達成。この動きを平日にやる奴、0.1%の人類。' },
    { big: 'NICE!!', sub: '普通クエ完了。調子乗っていい日、今日がその日。' },
    { big: 'WOW', sub: '5聴3登録！お前、気づいてる？英語が日常に侵食してる。' },
    { big: 'RAD', sub: 'NORMAL制覇！疲労感あるだろ？それ、成長の副産物だ。' },
    { big: 'HYPE', sub: '中級クリア！今日のお前、明日のお前を褒めてもいい。' },
    { big: 'PRO', sub: '5聴3登録。もうお前、アマチュア卒業してる。' },
    { big: 'SHIP', sub: 'NORMAL完了！目に見えないけど、脳内配線されてるぞ。' },
    { big: 'GG', sub: '5聴3登録達成。この時間をSNSに溶かさなかった、偉い。' },
    { big: 'LEVEL', sub: '中級クリア！お前のレベル、表示されないだけで上がってる。' },
    { big: 'CLEAR', sub: '5聴3登録！毎日これ続けたら、3ヶ月後に笑えるぞ。' },
    { big: 'SICK', sub: 'NORMAL突破！病的な継続力、いい意味でおかしい。' },
    { big: 'NICE!!', sub: '5聴3登録。ちなみに今の気分、飲み屋で1人ニヤつくやつ。' },
    { big: 'HYPE', sub: '中級クリア達成！お前、完全に英語学習の中級プレイヤー。' },
    { big: 'POWER', sub: '5聴3登録！パワー系学習者、認定。' },
    { big: 'YEAH', sub: 'NORMAL完了。今日の努力、来月のお前に届くぞ。確実に。' },
];

const FINAL_PRAISE = [
    { big: 'PERFECT', sub: '今日の10個、全部お前のもんだ。持ち帰れ。' },
    { big: 'LEGEND', sub: '10個マスター！もう今日のお前、天才枠で間違いない。' },
    { big: 'ALL WIN', sub: '全マスター達成！ビール5倍うまい夜、確定した。' },
    { big: 'GENIUS', sub: '10個コンプ！お前の脳、英語にハマってきてる。' },
    { big: 'MASTER', sub: '全制覇！この気分、週1ペースの奴は一生知らない。' },
    { big: 'SUPER', sub: '10個全部クリア！今日は自分を褒めに飲みに行け。' },
    { big: 'BEAST', sub: '全マスター！お前のペース、普通の人類が追いつけない。' },
    { big: 'KING', sub: '今日の10個、完全制覇。明日の自分も楽しみだろ？' },
    { big: 'CHAMP', sub: '10個マスター、音速の勢い。周り霞んで見える。' },
    { big: 'GOD', sub: '全部終わらせた…やばい。マジで尊敬する。' },
    { big: 'HERO', sub: '今日の全10制覇。記録更新、静かに、でも確実に。' },
    { big: 'NOVA', sub: '10個完クリ！お前、英語を食ってるレベル。' },
    { big: 'STAR', sub: '全マスター達成！今日のお前、完全に主人公。' },
    { big: 'ACE', sub: '10個コンプ！この勢い、来週には自分でも驚くぞ。' },
    { big: 'BOSS', sub: '全制覇！もうアプリがお前に追いつけない。' },
    { big: 'ICON', sub: '10個クリア。お前、英語学習界の希望。' },
    { big: 'WOW', sub: 'ぜんぶ…終わらせたのか…。これはやばい。' },
    { big: 'YEAHH', sub: '10個制覇！！この満足感、お前だけが知ってる。' },
    { big: 'GOAL', sub: '今日の全10、完全クリア。明日の朝、鏡見てみ？' },
    { big: 'GOAT', sub: '全マスター。greatest of all time、お前のことだ。' },
    { big: 'WINNER', sub: '今日の全部、お前のもの。明日も来るよな？待ってる。' },
    { big: 'BEAST', sub: '10個全滅させた！お前の継続力、人類の宝。' },
    { big: 'LEGEND', sub: '全マスター。この瞬間、保存しとけ、後で効く。' },
    { big: 'GOLD', sub: '10個コンプ！今日のお前に金メダル発行した。' },
    { big: 'TOPS', sub: '全クリア！今日の10個が、半年後の会話を支える。' },
    { big: 'WIN++', sub: '10個マスター。これ365日やったら…想像してみろ。' },
    { big: 'FLOW', sub: '全10制覇！完全にゾーン入ってた。いい顔してる。' },
    { big: 'PRIDE', sub: '全マスター。誇っていい。俺も誇る。最高だ。' },
    { big: 'IT', sub: '全10クリア！「それ」になった。「それ」だよ、わかるだろ。' },
    { big: 'MYTH', sub: '全マスター達成！お前、都市伝説化する勢い。' },
    { big: 'DIVINE', sub: '10個完クリ！神々しい。もう拝むレベル。' },
    { big: 'FINAL', sub: '全制覇！ラスボス倒した顔してる、鏡見ろ。' },
    { big: 'KAIZEN', sub: '全10マスター。継続は魔法、お前が証明。' },
    { big: 'ELITE', sub: '10個全部クリア！英語学習エリート、今日から名乗れ。' },
    { big: 'GIGA', sub: '全マスター！ギガ級の継続力、人類賞ものだ。' },
    { big: 'RAW', sub: '10個制覇！素の実力で殴り倒した、これぞ成長。' },
    { big: 'OVER', sub: '全10クリア！もう今日のノルマ、オーバーキルだ。' },
    { big: 'SAGE', sub: '全マスター達成。賢者ムードで1杯やれ、今夜。' },
    { big: 'HYPER', sub: '10個完クリ！お前、超人モードに入った？' },
    { big: 'PURE', sub: '全制覇。混じりけなしの努力、これ以上の美はない。' },
    { big: 'SOLO', sub: '10個マスター！1人でこれ、誰も見てなくてもやったな。' },
    { big: 'DRIP', sub: '全10クリア！今日のお前、努力がダダ漏れでかっこいい。' },
    { big: 'NOVA', sub: '全マスター達成。お前の脳、今日星になった。' },
    { big: 'BUFF', sub: '10個完クリ！脳筋ならぬ脳英、筋肉ついてる。' },
    { big: 'SENSEI', sub: '全制覇！もう誰かに教えていいレベル。師匠と呼ばせろ。' },
    { big: 'ALPHA', sub: '10個クリア！今日のお前、アルファ個体確定。' },
    { big: 'CLUTCH', sub: '全マスター達成！土壇場でも折れない、それお前の武器。' },
    { big: 'ZEN', sub: '全10制覇。無心でやれた、それが一番強い境地。' },
    { big: 'EPIC', sub: '10個コンプ！今日の物語、伝説級エピソード。' },
    { big: 'TRUE', sub: '全マスター。口だけじゃない、行動で示した、最高の証明。' },
];

function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Particles ─────────────────────────────────────────────

function makeDust(count: number) {
    return Array.from({ length: count }, (_, i) => ({
        left: (i * 37 + 13) % 100,
        delay: (i * 0.31) % 5,
        duration: 7 + ((i * 1.3) % 6),
        size: 2 + ((i * 0.7) % 3),
        drift: ((i * 17) % 40) - 20,
    }));
}

// ─── Component ─────────────────────────────────────────────

export default function QuestCelebration({ tier, onDismiss }: QuestCelebrationProps) {
    const [phase, setPhase] = useState(0);
    const [praise] = useState(() => {
        if (tier === 'must') return pick(MUST_PRAISE);
        if (tier === 'normal') return pick(NORMAL_PRAISE);
        return pick(FINAL_PRAISE);
    });
    const [dust] = useState(() => makeDust(tier === 'final' ? 40 : tier === 'normal' ? 24 : 14));

    const color = tier === 'final' ? gold : tier === 'normal' ? '#E8B923' : gold;
    const accent = tier === 'final' ? green : gold;

    const autoDismissMs = tier === 'final' ? 5500 : tier === 'normal' ? 4200 : 3400;
    const bigFontSize = tier === 'final' ? 88 : tier === 'normal' ? 64 : 52;
    const ringCount = tier === 'final' ? 3 : tier === 'normal' ? 2 : 1;

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), 120);
        const t2 = setTimeout(() => setPhase(2), 600);
        const t3 = setTimeout(() => setPhase(3), 1300);
        const t4 = setTimeout(() => setPhase(4), 2100);
        const td = setTimeout(() => onDismiss(), autoDismissMs);
        return () => { [t1, t2, t3, t4, td].forEach(clearTimeout); };
    }, [autoDismissMs, onDismiss]);

    return (
        <div
            onClick={onDismiss}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 10001,
                background: 'radial-gradient(ellipse at center, #1a1917 0%, #050403 75%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 24px',
                overflow: 'hidden',
                cursor: 'pointer',
                animation: 'qcFadeIn 0.5s ease-out',
            }}
        >
            <style>{`
                @keyframes qcFadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes qcRingExpand {
                    0%   { transform: scale(0.5); opacity: 0; }
                    30%  { opacity: 0.6; }
                    100% { transform: scale(1.2); opacity: 0; }
                }
                @keyframes qcOrbPulse {
                    0%, 100% { transform: scale(1);   opacity: 0.8; }
                    50%      { transform: scale(1.08); opacity: 1; }
                }
                @keyframes qcDust {
                    0%   { transform: translateY(0) translateX(0); opacity: 0; }
                    10%  { opacity: 0.8; }
                    90%  { opacity: 0.6; }
                    100% { transform: translateY(-120vh) translateX(var(--drift, 0px)); opacity: 0; }
                }
                @keyframes qcShimmer {
                    0%   { background-position: -200% 0; }
                    100% { background-position:  200% 0; }
                }
                @keyframes qcRayRotate {
                    0%   { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
                .qc-shimmer {
                    background: linear-gradient(
                        90deg,
                        #ffffff 0%,
                        #ffffff 30%,
                        ${color} 50%,
                        #ffffff 70%,
                        #ffffff 100%
                    );
                    background-size: 200% 100%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    color: transparent;
                    animation: qcShimmer 3.5s linear infinite;
                }
                .qc-dust {
                    position: absolute;
                    bottom: -10px;
                    width: var(--s);
                    height: var(--s);
                    border-radius: 50%;
                    background: ${color};
                    box-shadow: 0 0 8px ${color}cc, 0 0 16px ${color}66;
                    animation: qcDust var(--d) linear infinite;
                    animation-delay: var(--dl);
                    pointer-events: none;
                }
            `}</style>

            {/* Rotating light rays — FINAL only */}
            {tier === 'final' && phase >= 1 && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 1000,
                    height: 1000,
                    background: `conic-gradient(from 0deg, transparent 0deg, ${color}0d 20deg, transparent 40deg, transparent 90deg, ${color}08 110deg, transparent 130deg, transparent 180deg, ${color}0d 200deg, transparent 220deg, transparent 270deg, ${color}08 290deg, transparent 310deg, transparent 360deg)`,
                    filter: 'blur(40px)',
                    opacity: 0.9,
                    animation: 'qcRayRotate 40s linear infinite',
                    pointerEvents: 'none',
                }} />
            )}

            {/* Ambient orb */}
            <div style={{
                position: 'absolute',
                width: tier === 'final' ? 720 : tier === 'normal' ? 560 : 440,
                height: tier === 'final' ? 720 : tier === 'normal' ? 560 : 440,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${color}22 0%, ${color}08 40%, transparent 70%)`,
                filter: 'blur(70px)',
                opacity: phase >= 1 ? 1 : 0,
                transition: 'opacity 1.2s ease-out',
                animation: phase >= 2 ? 'qcOrbPulse 4s ease-in-out infinite' : 'none',
                pointerEvents: 'none',
            }} />

            {/* Dust particles */}
            {phase >= 1 && dust.map((p, i) => (
                <div
                    key={i}
                    className="qc-dust"
                    style={{
                        left: `${p.left}%`,
                        ['--s' as string]: `${p.size}px`,
                        ['--d' as string]: `${p.duration}s`,
                        ['--dl' as string]: `${p.delay}s`,
                        ['--drift' as string]: `${p.drift}px`,
                    } as React.CSSProperties}
                />
            ))}

            {/* Expanding rings */}
            {phase >= 1 && Array.from({ length: ringCount }).map((_, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: 340 + i * 80,
                        height: 340 + i * 80,
                        borderRadius: '50%',
                        border: `1px solid ${color}${i === 0 ? '60' : '35'}`,
                        animation: `qcRingExpand 2.4s ${easing} ${i * 0.4}s forwards`,
                        pointerEvents: 'none',
                    }}
                />
            ))}

            {/* Content */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                maxWidth: 560,
                width: '100%',
                textAlign: 'center',
            }}>
                {/* Tier label */}
                <div style={{
                    opacity: phase >= 1 ? 1 : 0,
                    transform: phase >= 1 ? 'translateY(0)' : 'translateY(-8px)',
                    transition: `all 1s ${easing}`,
                    marginBottom: 18,
                }}>
                    <div style={{
                        fontSize: 10,
                        letterSpacing: '0.5em',
                        color,
                        fontWeight: 700,
                        textShadow: `0 0 22px ${color}90`,
                    }}>
                        {tier === 'final' ? 'ALL MASTERED' : tier === 'normal' ? 'NORMAL CLEAR' : 'MUST CLEAR'}
                    </div>
                </div>

                {/* Big word (shimmering) */}
                <div style={{
                    opacity: phase >= 2 ? 1 : 0,
                    transform: phase >= 2 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                    transition: `all 1.2s ${easing}`,
                    marginBottom: 18,
                }}>
                    <div
                        className={phase >= 3 ? 'qc-shimmer' : ''}
                        style={{
                            fontSize: bigFontSize,
                            fontWeight: 200,
                            color: phase >= 3 ? undefined : '#fff',
                            lineHeight: 1,
                            fontFamily: 'Georgia, serif',
                            letterSpacing: '-0.02em',
                            textShadow: phase >= 3 ? 'none' : `0 0 40px ${color}80`,
                        }}
                    >
                        {praise.big}
                    </div>
                </div>

                {/* Divider */}
                <div style={{
                    width: phase >= 3 ? (tier === 'final' ? 100 : 70) : 0,
                    height: 1,
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    margin: '0 auto 20px',
                    transition: `width 1s ${easing}`,
                    boxShadow: phase >= 3 ? `0 0 14px ${color}90` : 'none',
                }} />

                {/* Sub message */}
                <div style={{
                    opacity: phase >= 3 ? 0.9 : 0,
                    transform: phase >= 3 ? 'translateY(0)' : 'translateY(10px)',
                    transition: `all 1s ${easing} 0.2s`,
                    fontSize: tier === 'final' ? 16 : 14,
                    color: '#f0dfa0',
                    lineHeight: 1.7,
                    fontWeight: 400,
                    maxWidth: 460,
                    margin: '0 auto 32px',
                    padding: '0 16px',
                }}>
                    {praise.sub}
                </div>

                {/* Hint to dismiss */}
                <div style={{
                    opacity: phase >= 4 ? 0.5 : 0,
                    transition: `opacity 0.8s ${easing}`,
                    fontSize: 10,
                    color: '#888',
                    letterSpacing: '0.25em',
                    fontWeight: 600,
                }}>
                    TAP TO CONTINUE
                </div>
            </div>

            {/* Corner accent line — just aesthetic */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: 1,
                background: `linear-gradient(90deg, transparent, ${accent}50, transparent)`,
                opacity: phase >= 1 ? 1 : 0,
                transition: 'opacity 1s ease-out',
            }} />
        </div>
    );
}
