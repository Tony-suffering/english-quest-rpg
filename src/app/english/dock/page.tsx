'use client';

import { useState, useMemo, useEffect } from 'react';

/* ================================================================
   英語ドック -- ENGLISH DOCK
   英語力の精密検査 → 診断書(レベル) → 処方箋(最適な教材へ振り分け)
   人間ドックのパロディ。全問オリジナル。絵文字不使用・ライトテーマ。
   ================================================================ */

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E2D5';
const PAPER = '#FFFFFF';
const RED = '#DC2626';
const BG = '#EDEBE3';

type Ability = {
    kind: 'ability';
    prompt: string;
    jp?: string;
    choices: string[];
    answer: number; // index
    band: '入門' | '初級' | '中級' | '上級';
};
type Profile = {
    kind: 'goal' | 'self';
    prompt: string;
    choices: { label: string; value: string }[];
};
type Q = Ability | Profile;

const QUESTIONS: Q[] = [
    { kind: 'ability', band: '入門', prompt: 'Someone says "How are you?" — the natural reply is:', choices: ["I'm fine, thanks.", 'Yes, I am fine.', 'How are you too.', 'I have fine.'], answer: 0 },
    { kind: 'ability', band: '入門', prompt: 'She ------- coffee every morning.', jp: '彼女は毎朝コーヒーを飲む', choices: ['drink', 'drinks', 'drinking', 'is drink'], answer: 1 },
    { kind: 'ability', band: '初級', prompt: 'I have lived in this town ------- 2019.', choices: ['for', 'since', 'from', 'during'], answer: 1 },
    { kind: 'ability', band: '初級', prompt: '「その映画、まだ見てないんだよね」を自然な英語で:', choices: ["I don't see the movie yet.", "I didn't seen the movie yet.", "I haven't seen the movie yet.", "I'm not see the movie yet."], answer: 2 },
    { kind: 'ability', band: '中級', prompt: 'The outdoor concert was ------- because of the storm.', jp: '嵐で中止になった', choices: ['called off', 'called on', 'called up', 'called for'], answer: 0 },
    { kind: 'ability', band: '中級', prompt: 'A colleague writes: "Let\'s touch base next week." — closest meaning:', choices: ['来週また連絡を取り合おう', '来週ベースキャンプに行こう', '来週から本気を出そう', '来週で一区切りにしよう'], answer: 0 },
    { kind: 'ability', band: '上級', prompt: 'Her argument was so compelling that the board eventually ------- to her proposal.', jp: '取締役会は最終的に彼女の案に同意した', choices: ['came around', 'came off', 'came over', 'came out'], answer: 0 },
    { kind: 'ability', band: '上級', prompt: '"Oh, brilliant idea," he said, being utterly facetious. — "facetious" の意味に最も近いのは:', choices: ['本気で感心して', 'ふざけて・皮肉って', '丁寧に遠慮して', '怒りをこらえて'], answer: 1 },
    {
        kind: 'goal', prompt: '英語で、一番かなえたいのは?', choices: [
            { label: '映画・海外ドラマを字幕なしで観たい', value: 'cinepass' },
            { label: 'TOEIC・仕事で結果を出したい', value: 'toeic' },
            { label: '英検1級に受かりたい', value: 'outputpass' },
            { label: '自分のことを英語で話せるようになりたい', value: 'service' },
            { label: '英語×何かを作りたい・副業にしたい', value: 'appbuild' },
        ],
    },
    {
        kind: 'self', prompt: '正直、今の英語はどんな感じ?', choices: [
            { label: '単語も文法も、だいぶ忘れた', value: 'sleep' },
            { label: '読めるけど、話せない・聞けない', value: 'silent' },
            { label: 'そこそこ通じる。でも伸び悩み', value: 'plateau' },
            { label: 'かなりできる。もっと上へ', value: 'high' },
        ],
    },
];

const ABILITY_TOTAL = QUESTIONS.filter(q => q.kind === 'ability').length;

type Band = '入門' | '初級' | '中級' | '上級';
const BANDS: Record<Band, { label: string; sub: string; gauge: number; shoken: string; color: string }> = {
    '入門': { label: '英語、冬眠中', sub: 'DORMANT', gauge: 14, color: '#8B8577', shoken: '単語も文法も、奥のほうでぐっすり眠っている状態。素質の問題じゃない、起こしてないだけ。まずは短く・毎日、脳をもう一度英語に慣らすところから。' },
    '初級': { label: '読めるが、口は貝', sub: 'SILENT READER', gauge: 40, color: '#B8912E', shoken: '目は動く、口は動かない。インプットはそこそこ入っているのに、出す訓練がゼロに近い。「わかる」を「言える・聞ける」に変える出口の練習が要る。' },
    '中級': { label: 'そこそこ、されど頭打ち', sub: 'PLATEAU', gauge: 68, color: DEEPGOLD, shoken: '通じる。でも毎回おなじ言い回しの無限ループに入っている。次のレベルは「量」じゃなく「精度と幅」。生きた表現を浴びて上書きするフェーズ。' },
    '上級': { label: 'デキる。伸び代は、上', sub: 'ADVANCED', gauge: 92, color: GREEN, shoken: '土台は堅い。あとは本番力と精度の勝負。試験でも実戦でも「あと一歩」を詰める、負荷の高いアウトプットが効く。' },
};

type ProdKey = 'cinepass' | 'toeic' | 'outputpass' | 'service' | 'appbuild';
const PRODUCTS: Record<ProdKey, {
    name: string; en: string; tag: string; price: string; route: string; accent: string;
    dosage: string; effect: string; pitch: string;
}> = {
    cinepass: {
        name: 'CINEPASS', en: '映画リスニング', tag: '頻出チャンク510個を30日で。字幕を外すための最短ルート。',
        price: '無料 / 30日プログラム', route: '/english/cinepass', accent: GOLD,
        dosage: '1日1ステージ × 30日', effect: '「音の塊」で聞けるようになり、字幕を消したくなる',
        pitch: '映画が全滅するのは語彙のせいじゃなく、速い音の塊を知らないから。第二言語習得研究の実用ラインだけを詰めた教材。',
    },
    toeic: {
        name: 'SCOREPASS 模試', en: 'TOEIC L&R 形式', tag: '本番形式のフル模試で、今の地力を数字で直視する。',
        price: '無料 / 3回分公開中', route: '/english/toeic', accent: INK,
        dosage: '本番形式で一気に解いて即採点', effect: '「なんとなく」が「あと何点・どこが穴」に変わる',
        pitch: '伸ばす前に、まず現在地。独立検品済みの自作模試で、弱点を部・問題タイプ単位まで可視化する。',
    },
    outputpass: {
        name: 'OUTPUT PASS', en: '英検1級 アウトプット', tag: '書く(WRITEPASS)と話す(SPEAKPASS)を、30日で型にする。',
        price: '無料 / 30日 × 2種', route: '/english/write', accent: GREEN,
        dosage: '模範を声に出して30日なぞる', effect: '本番で手と口が止まらなくなる「型」が入る',
        pitch: '1級のアウトプットは才能じゃなく型。意見論述と要約、2分スピーチの模範を、なぞって自分のものにする。',
    },
    service: {
        name: '自分語り英会話', en: '1on1 パーソナル', tag: '自分の人生を、英語で話せるようにする。教材じゃなく、あなたが素材。',
        price: '1回 5,000円 / 60分', route: '/english/service', accent: DEEPGOLD,
        dosage: '週1回、自分の話を英語で再演', effect: '「話せない」が「話した」に変わる',
        pitch: 'まず日本語で自分を語り、AIで英訳し、自分の言葉として覚えて翌週英語で話す。あなた専用の英語をつくる。',
    },
    appbuild: {
        name: 'アプリ作る部', en: '8週間 バイブコーディング', tag: 'コード未経験から、英語×AIの自作アプリを1個deployするまで。',
        price: '今だけ無料（将来 月2,980円）', route: '/english/app-build', accent: GOLD,
        dosage: '8週間で自作アプリを1個公開', effect: '英語も「作れる人」になり、副業の入口に立つ',
        pitch: '40〜60代・非IT・初心者向け。恥とあきらめのユーモア付きで、英語学習アプリを自分の手で世に出す。',
    },
};

const SECONDARY: Record<ProdKey, ProdKey> = {
    cinepass: 'service',
    toeic: 'cinepass',
    outputpass: 'toeic',
    service: 'cinepass',
    appbuild: 'service',
};

const GOAL_NOTE: Record<ProdKey, string> = {
    cinepass: '「映画を字幕なしで」は、聞く量の設計で決まる。まずは耳から。',
    toeic: '数字を上げたいなら、まず正確な現在地を測るのが最短。',
    outputpass: '合格の分かれ目はアウトプット。書く・話すを型から。',
    service: '目的が「自分を語る」なら、教材より人。あなたが素材になる。',
    appbuild: '英語を使って何かを作りたいなら、作りながら覚えるのが一番速い。',
};

export default function EnglishDockPage() {
    const [phase, setPhase] = useState<'intro' | 'quiz' | 'result'>('intro');
    const [idx, setIdx] = useState(0);
    const [picks, setPicks] = useState<(number | string)[]>([]);
    const [stamped, setStamped] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 720);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const pick = (val: number | string) => {
        const next = [...picks];
        next[idx] = val;
        setPicks(next);
        setTimeout(() => {
            if (idx < QUESTIONS.length - 1) setIdx(idx + 1);
            else { setPhase('result'); setStamped(false); window.scrollTo({ top: 0 }); setTimeout(() => setStamped(true), 350); }
        }, 180);
    };

    const result = useMemo(() => {
        let correct = 0;
        QUESTIONS.forEach((q, i) => { if (q.kind === 'ability' && picks[i] === q.answer) correct++; });
        const band: Band = correct <= 2 ? '入門' : correct <= 4 ? '初級' : correct <= 6 ? '中級' : '上級';
        const goalIdx = QUESTIONS.findIndex(q => q.kind === 'goal');
        const goal = (picks[goalIdx] as ProdKey) || 'cinepass';
        const primary = goal;
        let secondary = SECONDARY[goal];
        // 低レベル×難関目標のときは正直な調整: 二番手を土台づくりに
        const lowLevel = band === '入門' || band === '初級';
        let honesty = '';
        if (lowLevel && (goal === 'outputpass')) { secondary = 'service'; honesty = '目標は本物。ただ今の土台だと英検1級は背伸び。まず「話す」で足場を固めながら、型を並行で入れるのが現実的。'; }
        if (lowLevel && goal === 'toeic') { honesty = 'まず1回、本番形式を最後まで解ききること。点はそのあと勝手についてくる。'; }
        return { correct, band, goal, primary, secondary, honesty };
    }, [picks]);

    const reset = () => { setPhase('intro'); setIdx(0); setPicks([]); setStamped(false); window.scrollTo({ top: 0 }); };

    const progress = Math.round((idx / QUESTIONS.length) * 100);

    return (
        <div style={{ minHeight: '100vh', background: BG, fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif', color: INK }}>
            <style>{`
                @keyframes heartbeat { 0%{stroke-dashoffset:1200} 100%{stroke-dashoffset:0} }
                @keyframes pulse { 0%,100%{opacity:.5} 50%{opacity:1} }
                @keyframes stampIn { 0%{transform:scale(2.4) rotate(-18deg);opacity:0} 60%{transform:scale(.9) rotate(-11deg);opacity:1} 100%{transform:scale(1) rotate(-11deg);opacity:1} }
                @keyframes sweep { from{transform:rotate(-90deg)} }
                @keyframes rise { from{transform:translateY(14px);opacity:0} to{transform:translateY(0);opacity:1} }
                .rise { animation: rise .5s cubic-bezier(.2,.7,.3,1) both; }
                .opt:hover { border-color:${GOLD} !important; background:#FEFBF0 !important; transform: translateY(-1px); }
                .opt:active { transform: translateY(0); }
                a.cta:hover { filter: brightness(1.06); transform: translateY(-1px); }
            `}</style>

            {/* ==== top brand bar ==== */}
            <div style={{ position: 'sticky', top: 0, zIndex: 30, background: 'rgba(28,25,23,0.97)', color: '#fff', padding: isMobile ? '10px 14px' : '12px 22px' }}>
                <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '9px' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: isMobile ? '15px' : '17px', letterSpacing: '1.5px' }}>
                            <span style={{ color: GOLD }}>ENGLISH</span> DOCK
                        </span>
                        <span style={{ fontSize: '10px', color: '#C9C0AC', letterSpacing: '1px' }}>英語ドック</span>
                    </div>
                    <span style={{ fontSize: '10px', color: '#9b938a', letterSpacing: '1px' }}>精密検査 → 処方箋</span>
                </div>
            </div>

            <div style={{ maxWidth: '760px', margin: '0 auto', padding: isMobile ? '18px 14px 80px' : '30px 24px 90px' }}>

                {/* ==================== INTRO ==================== */}
                {phase === 'intro' && (
                    <div className="rise" style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: '18px', boxShadow: '0 10px 44px rgba(0,0,0,0.10)', padding: isMobile ? '30px 20px 34px' : '46px 46px 44px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 60% at 50% -10%, #FBF6E6 0%, transparent 60%)', pointerEvents: 'none' }} />
                        <div style={{ position: 'relative' }}>
                            <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '3px', color: DEEPGOLD }}>ENGLISH PRECISION CHECK</div>
                            <h1 style={{ fontFamily: 'Georgia, "Yu Mincho", serif', fontSize: isMobile ? '30px' : '40px', fontWeight: 900, margin: '12px 0 6px', letterSpacing: '1px' }}>
                                英語ドック
                            </h1>
                            <p style={{ fontSize: isMobile ? '13.5px' : '15px', color: SUB, lineHeight: 1.85, margin: '0 auto', maxWidth: '460px' }}>
                                10問で、あなたの英語を精密検査。<br />
                                レベルを診断し、<b style={{ color: INK }}>いま効く「処方箋」</b>を1枚お出しします。
                            </p>

                            {/* heartbeat line */}
                            <svg viewBox="0 0 600 90" width="100%" height={isMobile ? 60 : 74} style={{ margin: '20px 0 6px', maxWidth: '520px' }} aria-hidden>
                                <line x1="0" y1="45" x2="600" y2="45" stroke={LINE} strokeWidth="1" />
                                <path d="M0,45 L180,45 L205,45 L220,18 L245,72 L268,30 L288,45 L420,45 L440,45 L455,32 L470,58 L488,45 L600,45"
                                    fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                    strokeDasharray="1200" style={{ animation: 'heartbeat 2.4s ease-out forwards' }} />
                                <circle cx="245" cy="72" r="3.5" fill={DEEPGOLD} style={{ animation: 'pulse 1.6s ease-in-out infinite' }} />
                            </svg>

                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', margin: '10px 0 24px', fontSize: '11px', color: SUB }}>
                                {['所要 約3分', '全10問', '登録不要'].map(x => (
                                    <span key={x} style={{ border: `1px solid ${LINE}`, borderRadius: '99px', padding: '5px 13px', background: '#FCFBF7' }}>{x}</span>
                                ))}
                            </div>

                            <button onClick={() => { setPhase('quiz'); setIdx(0); }}
                                style={{ background: GOLD, color: INK, border: 'none', borderRadius: '12px', padding: isMobile ? '15px 34px' : '16px 46px', fontSize: '16px', fontWeight: 900, letterSpacing: '1px', cursor: 'pointer', boxShadow: '0 8px 22px rgba(212,175,55,0.4)' }}>
                                検査を始める
                            </button>
                            <div style={{ fontSize: '10.5px', color: SUB, marginTop: '14px', lineHeight: 1.7 }}>
                                結果に応じて、あなたに合う教材へご案内します。<br />合わないものは、正直に「合わない」と言います。
                            </div>
                        </div>
                    </div>
                )}

                {/* ==================== QUIZ ==================== */}
                {phase === 'quiz' && (() => {
                    const q = QUESTIONS[idx];
                    const chosen = picks[idx];
                    return (
                        <div>
                            {/* progress gauge */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                                <div style={{ flex: 1, height: '7px', background: '#DCD7C8', borderRadius: '99px', overflow: 'hidden' }}>
                                    <div style={{ width: `${progress}%`, height: '100%', background: `linear-gradient(90deg, ${GOLD}, ${DEEPGOLD})`, borderRadius: '99px', transition: 'width .35s ease' }} />
                                </div>
                                <span style={{ fontFamily: 'Georgia, serif', fontSize: '13px', fontWeight: 800, color: DEEPGOLD, minWidth: '52px', textAlign: 'right' }}>{idx + 1} / {QUESTIONS.length}</span>
                            </div>

                            <div key={idx} className="rise" style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', padding: isMobile ? '22px 18px 24px' : '30px 32px 30px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                                    <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1.5px', color: '#fff', background: q.kind === 'ability' ? INK : GREEN, borderRadius: '5px', padding: '3px 9px' }}>
                                        {q.kind === 'ability' ? `検査 ${idx + 1}` : q.kind === 'goal' ? '問診 ・ 目的' : '問診 ・ 自覚症状'}
                                    </span>
                                    {q.kind === 'ability' && <span style={{ fontSize: '10px', color: SUB, letterSpacing: '1px' }}>LEVEL {q.band}</span>}
                                </div>

                                <div style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 700, lineHeight: 1.6, color: INK }}>
                                    {q.prompt}
                                </div>
                                {q.kind === 'ability' && q.jp && <div style={{ fontSize: '12px', color: SUB, marginTop: '6px' }}>{q.jp}</div>}

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                                    {q.kind === 'ability'
                                        ? q.choices.map((c, i) => {
                                            const sel = chosen === i;
                                            return (
                                                <button key={i} className="opt" onClick={() => pick(i)}
                                                    style={optStyle(sel, isMobile)}>
                                                    <span style={optBadge(sel)}>{String.fromCharCode(65 + i)}</span>
                                                    <span style={{ fontSize: isMobile ? '14.5px' : '15px', lineHeight: 1.5 }}>{c}</span>
                                                </button>
                                            );
                                        })
                                        : q.choices.map((c, i) => {
                                            const sel = chosen === c.value;
                                            return (
                                                <button key={i} className="opt" onClick={() => pick(c.value)}
                                                    style={optStyle(sel, isMobile)}>
                                                    <span style={optBadge(sel)}>{String.fromCharCode(65 + i)}</span>
                                                    <span style={{ fontSize: isMobile ? '14.5px' : '15px', lineHeight: 1.5 }}>{c.label}</span>
                                                </button>
                                            );
                                        })}
                                </div>
                            </div>

                            {idx > 0 && (
                                <button onClick={() => setIdx(idx - 1)} style={{ marginTop: '16px', background: 'transparent', border: 'none', color: SUB, fontSize: '13px', cursor: 'pointer', fontWeight: 700 }}>
                                    ← 前の問題
                                </button>
                            )}
                        </div>
                    );
                })()}

                {/* ==================== RESULT ==================== */}
                {phase === 'result' && (() => {
                    const b = BANDS[result.band];
                    const primary = PRODUCTS[result.primary];
                    const secondary = PRODUCTS[result.secondary];
                    return (
                        <div>
                            {/* 診断書 card */}
                            <div className="rise" style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: '16px', boxShadow: '0 12px 44px rgba(0,0,0,0.12)', padding: isMobile ? '26px 18px' : '38px 40px', position: 'relative', overflow: 'hidden' }}>
                                {/* stamp */}
                                <div style={{ position: 'absolute', top: isMobile ? '14px' : '22px', right: isMobile ? '10px' : '26px', opacity: stamped ? 1 : 0, animation: stamped ? 'stampIn .5s cubic-bezier(.2,.8,.3,1.2) both' : 'none' }}>
                                    <div style={{ border: `2.5px solid ${b.color}`, color: b.color, borderRadius: '50%', width: isMobile ? '66px' : '82px', height: isMobile ? '66px' : '82px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-11deg)' }}>
                                        <span style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '1px' }}>診断</span>
                                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '20px' : '26px', fontWeight: 900, lineHeight: 1 }}>{result.band}</span>
                                        <span style={{ fontSize: '7px', fontWeight: 700, letterSpacing: '1px' }}>{b.sub}</span>
                                    </div>
                                </div>

                                <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '2.5px', color: DEEPGOLD }}>診断書 ・ DIAGNOSIS</div>
                                <h2 style={{ fontFamily: 'Georgia, "Yu Mincho", serif', fontSize: isMobile ? '25px' : '32px', fontWeight: 900, margin: '10px 0 2px', maxWidth: isMobile ? '70%' : 'none', lineHeight: 1.2 }}>
                                    {b.label}
                                </h2>
                                <div style={{ fontSize: '12px', color: SUB, marginBottom: '18px' }}>検査スコア {result.correct} / {ABILITY_TOTAL} ・ 推定レベル「{result.band}」</div>

                                {/* gauge */}
                                <div style={{ margin: '4px 0 18px' }}>
                                    <svg viewBox="0 0 300 165" width="100%" height={isMobile ? 130 : 150} style={{ maxWidth: '340px', display: 'block', margin: '0 auto' }} aria-hidden>
                                        {(() => {
                                            const cx = 150, cy = 150, r = 120;
                                            const zones = [['#C9C2B0', -180, -135], ['#E0C566', -135, -90], [GOLD, -90, -45], [GREEN, -45, 0]] as const;
                                            const arc = (col: string, a0: number, a1: number) => {
                                                const p = (a: number) => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
                                                const [x0, y0] = p(a0), [x1, y1] = p(a1);
                                                return <path key={a0} d={`M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`} fill="none" stroke={col} strokeWidth="15" strokeLinecap="butt" />;
                                            };
                                            const needleDeg = -180 + (b.gauge / 100) * 180;
                                            const nx = cx + (r - 26) * Math.cos(needleDeg * Math.PI / 180);
                                            const ny = cy + (r - 26) * Math.sin(needleDeg * Math.PI / 180);
                                            return (
                                                <g>
                                                    {zones.map(z => arc(z[0], z[1], z[2]))}
                                                    <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'sweep .9s cubic-bezier(.2,.8,.3,1.1) both' }}>
                                                        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
                                                    </g>
                                                    <circle cx={cx} cy={cy} r="8" fill={INK} />
                                                    <text x="34" y="150" fontSize="10" fill={SUB} textAnchor="middle">入門</text>
                                                    <text x="266" y="150" fontSize="10" fill={SUB} textAnchor="middle">上級</text>
                                                </g>
                                            );
                                        })()}
                                    </svg>
                                </div>

                                <div style={{ background: '#FAF8F2', border: `1px solid ${LINE}`, borderRadius: '11px', padding: '15px 17px' }}>
                                    <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1.5px', color: SUB, marginBottom: '7px' }}>所見</div>
                                    <p style={{ margin: 0, fontSize: isMobile ? '13.5px' : '14px', lineHeight: 1.9, color: '#3a3530' }}>{b.shoken}</p>
                                    {result.honesty && (
                                        <p style={{ margin: '10px 0 0', fontSize: '12.5px', lineHeight: 1.8, color: DEEPGOLD, fontWeight: 600 }}>
                                            {result.honesty}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* 処方箋 -- primary */}
                            <div className="rise" style={{ marginTop: '20px', background: PAPER, borderRadius: '16px', boxShadow: '0 12px 44px rgba(0,0,0,0.12)', overflow: 'hidden', border: `1px solid ${LINE}` }}>
                                <div style={{ background: `linear-gradient(100deg, ${INK}, #2c2723)`, color: '#fff', padding: isMobile ? '15px 18px' : '18px 26px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                                        <span style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 900, color: GOLD }}>Rx</span>
                                        <span style={{ fontSize: '11px', letterSpacing: '2px', color: '#C9C0AC' }}>処方箋 ・ PRESCRIPTION</span>
                                    </div>
                                    <span style={{ fontSize: '10px', color: '#9b938a' }}>あなた専用</span>
                                </div>

                                <div style={{ padding: isMobile ? '22px 18px' : '28px 30px' }}>
                                    <div style={{ fontSize: '11px', color: SUB, marginBottom: '4px', lineHeight: 1.7 }}>{GOAL_NOTE[result.goal]}</div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '26px' : '31px', fontWeight: 900, color: INK }}>{primary.name}</span>
                                        <span style={{ fontSize: '12px', fontWeight: 700, color: primary.accent }}>{primary.en}</span>
                                    </div>
                                    <p style={{ fontSize: isMobile ? '14px' : '15px', color: '#3a3530', lineHeight: 1.8, margin: '10px 0 16px' }}>{primary.pitch}</p>

                                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                                        <Field label="用法" value={primary.dosage} />
                                        <Field label="効能" value={primary.effect} />
                                        <Field label="料金" value={primary.price} />
                                        <Field label="タイプ" value={primary.tag} thin />
                                    </div>

                                    <a className="cta" href={primary.route}
                                        style={{ display: 'block', textAlign: 'center', background: GOLD, color: INK, textDecoration: 'none', borderRadius: '12px', padding: '15px', fontSize: '15px', fontWeight: 900, letterSpacing: '0.5px', boxShadow: '0 8px 22px rgba(212,175,55,0.36)' }}>
                                        {primary.name} を受け取る →
                                    </a>
                                </div>
                            </div>

                            {/* secondary -- 併用 */}
                            <div className="rise" style={{ marginTop: '14px', background: '#FCFBF7', border: `1px dashed ${LINE}`, borderRadius: '14px', padding: isMobile ? '16px 16px' : '18px 24px' }}>
                                <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1.5px', color: SUB, marginBottom: '8px' }}>併せて効く ・ もう一手</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                                    <div style={{ flex: 1, minWidth: '180px' }}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                            <span style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 900 }}>{secondary.name}</span>
                                            <span style={{ fontSize: '11px', color: secondary.accent, fontWeight: 700 }}>{secondary.en}</span>
                                        </div>
                                        <div style={{ fontSize: '12px', color: SUB, marginTop: '3px', lineHeight: 1.6 }}>{secondary.tag}</div>
                                    </div>
                                    <a className="cta" href={secondary.route}
                                        style={{ flexShrink: 0, background: '#fff', color: INK, border: `1px solid ${DEEPGOLD}`, textDecoration: 'none', borderRadius: '10px', padding: '10px 18px', fontSize: '13px', fontWeight: 800, whiteSpace: 'nowrap' }}>
                                        見てみる →
                                    </a>
                                </div>
                            </div>

                            {/* footer actions */}
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
                                <button onClick={reset} style={{ background: 'transparent', border: `1px solid ${SUB}`, color: SUB, borderRadius: '10px', padding: '11px 22px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}>
                                    もう一度検査する
                                </button>
                                <a href="/english/toeic" className="cta" style={{ background: INK, color: '#fff', textDecoration: 'none', borderRadius: '10px', padding: '11px 22px', fontSize: '13px', fontWeight: 800 }}>
                                    TOEIC模試で地力を測る →
                                </a>
                            </div>

                            <p style={{ fontSize: '10.5px', color: SUB, textAlign: 'center', marginTop: '22px', lineHeight: 1.8 }}>
                                本診断は簡易的なレベル目安です。公的な試験スコアを保証・換算するものではありません。<br />
                                問題・診断はすべてオリジナルで、実試験の転載ではありません。
                            </p>
                        </div>
                    );
                })()}
            </div>
        </div>
    );
}

function optStyle(sel: boolean, mobile: boolean): React.CSSProperties {
    return {
        display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left', width: '100%',
        padding: mobile ? '13px 14px' : '14px 16px', minHeight: '52px',
        borderRadius: '11px', cursor: 'pointer', transition: 'all .12s',
        border: `1.5px solid ${sel ? GOLD : LINE}`, background: sel ? '#FEF9E7' : '#fff',
        boxShadow: sel ? `0 0 0 1.5px ${GOLD}` : 'none',
    };
}
function optBadge(sel: boolean): React.CSSProperties {
    return {
        flexShrink: 0, width: '24px', height: '24px', borderRadius: '50%',
        border: `1.5px solid ${sel ? DEEPGOLD : '#C9C4B5'}`, color: sel ? DEEPGOLD : SUB,
        background: sel ? '#fff' : 'transparent',
        fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
    };
}

function Field({ label, value, thin }: { label: string; value: string; thin?: boolean }) {
    return (
        <div style={{ border: `1px solid ${LINE}`, borderRadius: '9px', padding: '9px 12px', background: '#FCFBF7' }}>
            <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '1px', color: DEEPGOLD, marginBottom: '3px' }}>{label}</div>
            <div style={{ fontSize: thin ? '11.5px' : '13px', fontWeight: thin ? 500 : 700, color: INK, lineHeight: 1.5 }}>{value}</div>
        </div>
    );
}
