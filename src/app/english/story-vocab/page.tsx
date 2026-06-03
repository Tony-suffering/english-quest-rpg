'use client';

import { useEffect, useState } from 'react';

/* ================= DATA ================= */
type Word = { disp: string; pos: string; jp: string; en: string; ep: number };
const WORDS: Record<string, Word> = {
    evade: { disp: 'evade', pos: 'verb', jp: '巧みに逃れる・回避する', en: 'to escape or avoid someone/something, especially in a clever way', ep: 0 },
    wreck: { disp: 'wreck', pos: 'verb', jp: '大破させる・めちゃめちゃにする', en: 'to destroy or badly damage something', ep: 0 },
    cowardly: { disp: 'cowardly', pos: 'adj', jp: '臆病な・卑怯な', en: 'lacking courage in a shameful way', ep: 0 },
    haunt: { disp: 'haunt', pos: 'verb', jp: 'つきまとう・取り憑く', en: '(of a memory or ghost) to keep coming back and trouble someone', ep: 0 },
    obstruct: { disp: 'obstruct', pos: 'verb', jp: '塞ぐ・妨げる', en: 'to block or get in the way of something', ep: 0 },
    tentative: { disp: 'tentative', pos: 'adj', jp: '仮の・ためらいがちな', en: 'not certain or fixed yet; provisional', ep: 0 },

    radiate: { disp: 'radiate', pos: 'verb', jp: '発する・放つ', en: 'to send out light, heat, or a strong feeling', ep: 1 },
    supernatural: { disp: 'supernatural', pos: 'adj', jp: '超自然的な', en: 'beyond the laws of nature; ghostly, mysterious', ep: 1 },
    universal: { disp: 'universal', pos: 'adj', jp: '普遍的な・万人共通の', en: 'true for or shared by everyone, everywhere', ep: 1 },
    compress: { disp: 'compress', pos: 'verb', jp: '圧縮する・まとめる', en: 'to press or squeeze something into a smaller space', ep: 1 },
    solidify: { disp: 'solidify', pos: 'verb', jp: '固める・確かなものにする', en: 'to make something firm, solid, or certain', ep: 1 },
    reduction: { disp: 'reduction', pos: 'noun', jp: '削減・減少', en: 'the act of making something smaller or less', ep: 1 },

    compliant: { disp: 'compliant', pos: 'adj', jp: '従順な・素直に従う', en: 'willing to obey rules or do what others ask', ep: 2 },
    rebel: { disp: 'rebel', pos: 'verb', jp: '反抗する', en: 'to resist or fight against authority or control', ep: 2 },
    righteous: { disp: 'righteous', pos: 'adj', jp: '正義感の強い・道義にかなった', en: 'morally right and justified', ep: 2 },
    perspective: { disp: 'perspective', pos: 'noun', jp: '視点・物の見方', en: 'a particular way of seeing or thinking about something', ep: 2 },
    inhale: { disp: 'inhale', pos: 'verb', jp: '息を吸い込む', en: 'to breathe in', ep: 2 },
    leniency: { disp: 'leniency', pos: 'noun', jp: '寛大さ・手加減', en: 'the quality of being merciful, not strict in punishing', ep: 2 },

    enroll: { disp: 'enroll', pos: 'verb', jp: '入学する・登録する', en: 'to officially join a school, course, or group', ep: 3 },
    spacious: { disp: 'spacious', pos: 'adj', jp: '広々とした', en: 'having plenty of space; roomy', ep: 3 },
    nutritious: { disp: 'nutritious', pos: 'adj', jp: '栄養価の高い', en: 'full of the nutrients needed for good health', ep: 3 },
    rivalry: { disp: 'rivalry', pos: 'noun', jp: '対抗意識・競争', en: 'strong competition between people or groups', ep: 3 },
    candidacy: { disp: 'candidacy', pos: 'noun', jp: '立場・資格・候補であること', en: 'the state of being a candidate or qualified for something', ep: 3 },
    forgery: { disp: 'forgery', pos: 'noun', jp: '偽造・偽物', en: 'the crime of making a fake copy to deceive; the fake itself', ep: 3 },
};

type Episode = { no: string; title: string; jp: string; cast: string; html: string; trans: string };
const EPISODES: Episode[] = [
    {
        no: 'EPISODE 1', title: "Sukuna's Declaration", jp: '宿儺の宣告', cast: '両面宿儺 / 虎杖 / 伏黒',
        html: 'When Sukuna seized control of Yuji\'s body, the cursed spirits did not even try to fight him &mdash; they only tried to <b class="v" data-w="evade">evade</b> him, fleeing into the dark. With a single motion he could <b class="v" data-w="wreck">wreck</b> an entire building, turning concrete into dust. He looked down at the trembling sorcerers and sneered that running away was <b class="v" data-w="cowardly">cowardly</b>. The memory of his cleaving slashes would <b class="v" data-w="haunt">haunt</b> them for the rest of their lives. Broken pillars <b class="v" data-w="obstruct">obstructed</b> every exit, so no one could escape. Megumi could offer only a <b class="v" data-w="tentative">tentative</b> truce, unsure whether the King of Curses would keep his word for even a second.',
        trans: '宿儺が虎杖の体を乗っ取ったとき、呪霊たちは戦おうともしなかった――ただ闇へ逃げ込み、彼を避けようとするだけだった。宿儺は一振りでビルごと吹き飛ばし、コンクリートを塵に変える。震える術師たちを見下ろし、「逃げるとは臆病だな」とせせら笑った。その斬撃の記憶は、彼らの一生につきまとうだろう。折れた柱があらゆる出口を塞ぎ、誰も逃げられない。伏黒は、呪いの王が一秒でも約束を守るか分からぬまま、仮の停戦を申し出るしかなかった。',
    },
    {
        no: 'EPISODE 2', title: 'Gojo the Strongest', jp: '最強の五条', cast: '五条悟',
        html: 'Gojo Satoru never hid what he was. Even standing perfectly still, he seemed to <b class="v" data-w="radiate">radiate</b> cursed energy, as if the air itself bent around him. To ordinary people his power looked <b class="v" data-w="supernatural">supernatural</b>, almost godlike. He believed strength should be <b class="v" data-w="universal">universal</b> among sorcerers, not held by one man alone. With his technique he could <b class="v" data-w="compress">compress</b> empty space into a single violet point, then <b class="v" data-w="solidify">solidify</b> it into a blast that erased whatever it touched. Wherever he walked, there was a sharp <b class="v" data-w="reduction">reduction</b> in the number of curses, because few dared to appear before him.',
        trans: '五条悟は、自分が何者かを隠さなかった。ただ静かに立っているだけで呪力を放ち、空気そのものが彼の周りで歪むかのようだった。一般人の目には、その力は超自然的で、神に近いものに映った。彼は、強さは一人が独占するものではなく、術師すべてに普遍的であるべきだと考えていた。術式によって、彼は虚空を一つの紫の点に圧縮し、それを固めて、触れたものを消し去る一撃に変えられた。彼が歩く場所では呪霊の数が激減した――彼の前に現れる勇気を持つ者が、ほとんどいなかったからだ。',
    },
    {
        no: 'EPISODE 3', title: 'Nanami & Mahito', jp: '七海と真人', cast: '七海建人 / 真人',
        html: 'Nanami Kento had once been a <b class="v" data-w="compliant">compliant</b> office worker, doing exactly what he was told. But in the end he chose to <b class="v" data-w="rebel">rebel</b> against that empty life and return to the world of sorcery. He was a <b class="v" data-w="righteous">righteous</b> man who believed every life had weight. Mahito saw the world from the opposite <b class="v" data-w="perspective">perspective</b>: to him, human souls were merely toys to be reshaped. Before unleashing a Black Flash, Nanami would <b class="v" data-w="inhale">inhale</b> slowly, steadying his heart. He showed his enemies no <b class="v" data-w="leniency">leniency</b>, yet he was endlessly patient with the students he trained.',
        trans: '七海建人はかつて、言われたことを忠実にこなす従順な会社員だった。しかし最後には、その空虚な人生に反抗し、呪術の世界へ戻る道を選んだ。彼は、どんな命にも重みがあると信じる正義の人だった。真人は正反対の視点から世界を見ていた――彼にとって人間の魂は、作り変えるための玩具にすぎない。黒閃を放つ前、七海はゆっくりと息を吸い込み、心を整えた。敵には一切の手加減を見せなかったが、育てる生徒たちには限りなく辛抱強かった。',
    },
    {
        no: 'EPISODE 4', title: 'To Jujutsu High', jp: '呪術高専へ', cast: '虎杖 / 東堂 / 五条',
        html: 'After swallowing Sukuna\'s finger, Yuji found himself <b class="v" data-w="enroll">enrolling</b> at Tokyo Jujutsu High. The training hall was bright and <b class="v" data-w="spacious">spacious</b>, far larger than any gym at his old school. Gojo told him to eat <b class="v" data-w="nutritious">nutritious</b> meals so his body could hold all that cursed energy. At the Goodwill Event he met Todo, and a strange <b class="v" data-w="rivalry">rivalry</b> &mdash; half battle, half friendship &mdash; was born between them. Some weaker sorcerers tried to fake their results with <b class="v" data-w="forgery">forgery</b>, writing reports of curses they had never exorcised. But Yuji\'s <b class="v" data-w="candidacy">candidacy</b> as a special-grade vessel was something no fake paper could ever match.',
        trans: '宿儺の指を飲み込んだあと、虎杖は東京呪術高専に入学することになった。修練場は明るく広々としていて、前の学校のどの体育館よりもずっと大きかった。五条は、膨大な呪力を体に宿せるよう、栄養価の高い食事を摂れと言った。交流会で東堂と出会い、二人の間に――半分は戦い、半分は友情の――奇妙な対抗意識が生まれた。力の弱い術師の中には、祓ってもいない呪霊の報告書を書き、偽造で実績をごまかそうとする者もいた。だが、特級呪物の器という虎杖の立場（資格）は、どんな偽の書類でも決して並ぶものではなかった。',
    },
];

const QUIZ: { w: string; s: string }[] = [
    { w: 'evade', s: 'For days the fugitive tried to ___ the patrols searching the forest.' },
    { w: 'wreck', s: 'One careless driver can ___ a brand-new car in seconds.' },
    { w: 'cowardly', s: 'It was ___ of him to blame his little sister for his own mistake.' },
    { w: 'haunt', s: 'Memories of the accident still ___ her every single night.' },
    { w: 'obstruct', s: 'A broken-down truck began to ___ the whole road.' },
    { w: 'tentative', s: 'We made only ___ plans because the weather was uncertain.' },
    { w: 'radiate', s: 'Long after sunset, the desert sand kept ___ heat.' },
    { w: 'supernatural', s: 'The old mansion is famous for strange, ___ happenings.' },
    { w: 'universal', s: 'Music is often called a ___ language understood by all.' },
    { w: 'compress', s: 'You can ___ the large file to send it more easily by email.' },
    { w: 'solidify', s: "A few key victories helped ___ the team's place at the top." },
    { w: 'reduction', s: 'The store announced a sharp ___ in prices to attract buyers.' },
    { w: 'compliant', s: 'A ___ worker follows every instruction without complaint.' },
    { w: 'rebel', s: "Teenagers often ___ against their parents' strict rules." },
    { w: 'righteous', s: 'She felt ___ anger when she saw the bully hurting a child.' },
    { w: 'perspective', s: 'Living abroad gave him a fresh ___ on his own country.' },
    { w: 'inhale', s: 'Be very careful not to ___ the smoke from the fire.' },
    { w: 'leniency', s: 'The judge showed ___ and gave the young man a lighter sentence.' },
    { w: 'enroll', s: 'Hundreds of students hope to ___ in the new science program.' },
    { w: 'spacious', s: 'Their new apartment is bright and ___, with huge windows.' },
    { w: 'nutritious', s: 'Beans and vegetables make a cheap but very ___ meal.' },
    { w: 'rivalry', s: 'The ___ between the two teams makes every match exciting.' },
    { w: 'candidacy', s: 'He officially announced his ___ for the position of mayor.' },
    { w: 'forgery', s: 'Experts proved that the famous painting was actually a ___.' },
];

/* ================= HELPERS ================= */
const KEYS = Object.keys(WORDS);
const LS_KNOWN = 'sv_jjk_known';
const LS_STATS = 'sv_jjk_stats';
const GOLD = '#D4AF37', GREEN = '#10B981', GREEN_D = '#0d9466', CRIMSON = '#B91C1C', INK = '#1C1917', SUB = '#78716C', LINE = '#E7E5E4';

function readKnown(): Record<string, number> { try { return JSON.parse(localStorage.getItem(LS_KNOWN) || '{}'); } catch { return {}; } }
function readStats(): { right: number; total: number } { try { return JSON.parse(localStorage.getItem(LS_STATS) || '{"right":0,"total":0}'); } catch { return { right: 0, total: 0 }; } }
function shuffle<T>(a: T[]): T[] { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }
function speak(t: string) { try { const u = new SpeechSynthesisUtterance(t); u.lang = 'en-US'; u.rate = 0.92; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch { } }
function epWords(i: number) { return KEYS.filter(k => WORDS[k].ep === i); }
function storySentence(html: string, k: string): string {
    const plain = html.replace(/<b class="v" data-w="([a-z]+)">(.*?)<\/b>/g, (_m, w, inner) => (w === k ? '<<<' + inner + '>>>' : inner));
    const parts = plain.split(/(?<=[.!])\s+/);
    for (const p of parts) if (p.indexOf('<<<') >= 0) return p.replace('<<<', '<b>').replace('>>>', '</b>');
    return plain.replace('<<<', '<b>').replace('>>>', '</b>');
}

/* ================= COMPONENT ================= */
export default function StoryVocabJJK() {
    const [tab, setTab] = useState<'story' | 'quiz' | 'prog'>('story');
    const [openIdx, setOpenIdx] = useState<number | null>(null);
    const [showTrans, setShowTrans] = useState(false);
    const [modalWord, setModalWord] = useState<string | null>(null);
    const [known, setKnownState] = useState<Record<string, number>>({});
    const [stats, setStatsState] = useState<{ right: number; total: number }>({ right: 0, total: 0 });
    // quiz
    const [qOrder, setQOrder] = useState<{ w: string; s: string }[]>([]);
    const [qIdx, setQIdx] = useState(0);
    const [qOpts, setQOpts] = useState<string[]>([]);
    const [qPick, setQPick] = useState<string | null>(null);

    useEffect(() => { setKnownState(readKnown()); setStatsState(readStats()); }, []);

    function persistKnown(k: Record<string, number>) { setKnownState({ ...k }); localStorage.setItem(LS_KNOWN, JSON.stringify(k)); }
    function persistStats(s: { right: number; total: number }) { setStatsState({ ...s }); localStorage.setItem(LS_STATS, JSON.stringify(s)); }

    function toggleKnown(k: string) { const n = { ...known }; if (n[k]) delete n[k]; else n[k] = 1; persistKnown(n); }

    function buildQ(order: { w: string; s: string }[], idx: number) {
        if (idx >= order.length) { setQOpts([]); return; }
        const w = WORDS[order[idx].w];
        const pool = KEYS.filter(k => k !== order[idx].w && WORDS[k].pos === w.pos);
        const distract = shuffle(pool).slice(0, 3);
        setQOpts(shuffle([order[idx].w, ...distract]));
        setQPick(null);
    }
    function startQuiz() { const o = shuffle(QUIZ); setQOrder(o); setQIdx(0); buildQ(o, 0); }
    function answer(pick: string) {
        if (qPick) return;
        setQPick(pick);
        const ok = pick === qOrder[qIdx].w;
        const s = { right: stats.right + (ok ? 1 : 0), total: stats.total + 1 };
        persistStats(s);
        if (ok) speak(WORDS[qOrder[qIdx].w].disp);
    }
    function nextQ() { const ni = qIdx + 1; setQIdx(ni); buildQ(qOrder, ni); window.scrollTo(0, 0); }

    function changeTab(t: 'story' | 'quiz' | 'prog') {
        setTab(t); setOpenIdx(null); setModalWord(null);
        if (t === 'quiz') startQuiz();
        window.scrollTo(0, 0);
    }

    const doneCount = KEYS.filter(k => known[k]).length;

    /* ---------- shared styles ---------- */
    const card: React.CSSProperties = { background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14 };

    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9', padding: '24px 16px 96px' }}>
            <style>{`
        .sv-scene .v{color:${GREEN_D};border-bottom:2px solid rgba(16,185,129,.4);cursor:pointer;font-weight:700;white-space:nowrap}
        .sv-scene .v:hover{background:rgba(16,185,129,.10)}
        .sv-scene .v.known{color:${GOLD};border-bottom-color:rgba(212,175,55,.6)}
        .sv-fade{animation:svfade .3s ease}
        @keyframes svfade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        @keyframes svup{from{transform:translateY(40px);opacity:.5}to{transform:none;opacity:1}}
      `}</style>

            <div style={{ maxWidth: 720, margin: '0 auto' }}>
                {/* header */}
                <div style={{ textAlign: 'center', marginBottom: 18 }}>
                    <div style={{ fontSize: 10, letterSpacing: '0.28em', color: CRIMSON, fontWeight: 800 }}>JUJUTSU VOCAB &middot; GRADE PRE-1</div>
                    <h1 style={{ fontSize: 25, fontWeight: 900, color: INK, margin: '8px 0 4px', letterSpacing: '-0.02em' }}>呪術廻戦で覚える、英検準1級</h1>
                    <p style={{ fontSize: 13, color: SUB, margin: 0 }}>単語は、好きな物語とキャラに乗せると忘れない。</p>
                    <div style={{ height: 3, width: 56, margin: '12px auto 0', borderRadius: 3, background: `linear-gradient(90deg,${CRIMSON},${GOLD})` }} />
                </div>

                {/* tabs */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                    {([['story', '物語'], ['quiz', '復習テスト'], ['prog', '進捗']] as const).map(([k, label]) => (
                        <button key={k} onClick={() => changeTab(k)} style={{
                            flex: 1, fontSize: 14, padding: '10px 4px', borderRadius: 11, cursor: 'pointer',
                            border: tab === k ? '1px solid transparent' : `1px solid ${LINE}`,
                            background: tab === k ? `linear-gradient(135deg,${GOLD},#A6842F)` : '#fff',
                            color: tab === k ? '#fff' : SUB, fontWeight: tab === k ? 800 : 500,
                        }}>{label}</button>
                    ))}
                </div>

                {/* ---------- STORY ---------- */}
                {tab === 'story' && openIdx === null && (
                    <div className="sv-fade">
                        {EPISODES.map((ep, i) => {
                            const ws = epWords(i); const d = ws.filter(k => known[k]).length; const pct = Math.round((d / ws.length) * 100);
                            return (
                                <div key={i} onClick={() => { setOpenIdx(i); setShowTrans(false); window.scrollTo(0, 0); }}
                                    style={{ ...card, padding: '16px 18px', margin: '12px 0', cursor: 'pointer', position: 'relative' }}>
                                    {pct === 100 && <span style={{ position: 'absolute', top: 14, right: 16, fontSize: 11, color: GREEN_D, fontWeight: 700, letterSpacing: '0.06em' }}>COMPLETE</span>}
                                    <div style={{ fontSize: 11, letterSpacing: '0.2em', color: CRIMSON, fontWeight: 700 }}>{ep.no}</div>
                                    <div style={{ fontSize: 18, fontWeight: 900, color: INK, margin: '4px 0 2px' }}>{ep.title} <span style={{ fontSize: 13, color: SUB, fontWeight: 500 }}>/ {ep.jp}</span></div>
                                    <div style={{ fontSize: 12, color: SUB, marginBottom: 4 }}>{ep.cast}</div>
                                    <div style={{ fontSize: 12, color: SUB }}>{ws.length}語 &middot; {d}語マスター</div>
                                    <div style={{ height: 5, background: LINE, borderRadius: 5, marginTop: 10, overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg,${GREEN},${GREEN_D})`, borderRadius: 5, transition: 'width .5s' }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {tab === 'story' && openIdx !== null && (
                    <div className="sv-fade">
                        <button onClick={() => setOpenIdx(null)} style={{ background: 'none', border: 'none', color: SUB, fontSize: 13, cursor: 'pointer', padding: '4px 0' }}>&larr; 一覧へ</button>
                        <div style={{ margin: '6px 0 14px' }}>
                            <div style={{ fontSize: 11, letterSpacing: '0.2em', color: CRIMSON, fontWeight: 700 }}>{EPISODES[openIdx].no}</div>
                            <h2 style={{ fontSize: 21, fontWeight: 900, color: INK, margin: '4px 0 2px' }}>{EPISODES[openIdx].title}</h2>
                            <div style={{ fontSize: 13, color: SUB }}>{EPISODES[openIdx].jp} &middot; {EPISODES[openIdx].cast}</div>
                        </div>
                        <div style={{ textAlign: 'center', fontSize: 12, color: SUB, marginBottom: 10 }}>緑の単語をタップ &middot; 意味と「場面」が出ます</div>
                        <div className="sv-scene" style={{ ...card, padding: '20px 20px', fontSize: 17, lineHeight: 2.1 }}
                            onClick={(e) => { const t = e.target as HTMLElement; if (t.dataset && t.dataset.w) { setModalWord(t.dataset.w); speak(WORDS[t.dataset.w].disp); } }}
                            dangerouslySetInnerHTML={{ __html: EPISODES[openIdx].html }} />
                        <button onClick={() => setShowTrans(s => !s)} style={{ marginTop: 12, width: '100%', fontSize: 13, padding: '11px', borderRadius: 11, border: `1px solid ${LINE}`, background: '#fff', color: INK, cursor: 'pointer' }}>
                            {showTrans ? '和訳を隠す' : '和訳を見る'}
                        </button>
                        {showTrans && (
                            <div style={{ ...card, padding: '16px 18px', marginTop: 10, fontSize: 14.5, lineHeight: 2, color: INK, background: '#FBF8F2' }}>{EPISODES[openIdx].trans}</div>
                        )}
                        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                            <button disabled={openIdx === 0} onClick={() => { setOpenIdx(openIdx - 1); setShowTrans(false); window.scrollTo(0, 0); }}
                                style={{ flex: 1, fontSize: 13, padding: 11, borderRadius: 11, border: `1px solid ${LINE}`, background: '#fff', color: INK, cursor: openIdx === 0 ? 'default' : 'pointer', opacity: openIdx === 0 ? 0.4 : 1 }}>&larr; 前の話</button>
                            <button disabled={openIdx === EPISODES.length - 1} onClick={() => { setOpenIdx(openIdx + 1); setShowTrans(false); window.scrollTo(0, 0); }}
                                style={{ flex: 1, fontSize: 13, padding: 11, borderRadius: 11, border: `1px solid ${LINE}`, background: '#fff', color: INK, cursor: openIdx === EPISODES.length - 1 ? 'default' : 'pointer', opacity: openIdx === EPISODES.length - 1 ? 0.4 : 1 }}>次の話 &rarr;</button>
                        </div>
                    </div>
                )}

                {/* ---------- QUIZ ---------- */}
                {tab === 'quiz' && (
                    <div className="sv-fade">
                        <div style={{ ...card, padding: '14px 16px', marginBottom: 12, fontSize: 13, color: SUB, lineHeight: 1.8, background: 'linear-gradient(135deg,#fffdf7,#fdf2f2)' }}>
                            英検準1級と同じ4択形式。間違えても大丈夫、その単語が「物語のどの場面だったか」を一緒に思い出します。
                        </div>
                        {qIdx >= qOrder.length ? (
                            <div style={{ ...card, padding: '26px 20px', textAlign: 'center' }}>
                                <div style={{ fontSize: 11, letterSpacing: '0.18em', color: CRIMSON, fontWeight: 700 }}>FINISHED</div>
                                <h3 style={{ fontSize: 21, fontWeight: 900, margin: '10px 0', color: INK }}>1周おつかれさま</h3>
                                <p style={{ color: SUB, fontSize: 14 }}>通算 {stats.right} / {stats.total} 正解</p>
                                <button onClick={startQuiz} style={{ marginTop: 16, fontSize: 15, padding: '12px 28px', border: 'none', borderRadius: 12, background: `linear-gradient(135deg,${GOLD},#A6842F)`, color: '#fff', cursor: 'pointer' }}>もう1周</button>
                            </div>
                        ) : (() => {
                            const q = qOrder[qIdx]; const w = WORDS[q.w]; const ep = EPISODES[w.ep];
                            return (
                                <div style={{ ...card, padding: '22px 20px' }}>
                                    <div style={{ fontSize: 12, letterSpacing: '0.18em', color: CRIMSON, fontWeight: 700 }}>Q {qIdx + 1} / {qOrder.length}</div>
                                    <div style={{ fontSize: 18, lineHeight: 2, margin: '10px 0 18px', color: INK }}
                                        dangerouslySetInnerHTML={{ __html: q.s.replace('___', '<span style="display:inline-block;min-width:92px;border-bottom:2px solid ' + GOLD + '">&nbsp;</span>') }} />
                                    <div style={{ display: 'grid', gap: 10 }}>
                                        {qOpts.map((k, i) => {
                                            let bg = '#fff', bc = LINE, col = INK, fw = 400;
                                            if (qPick) {
                                                if (k === q.w) { bg = 'rgba(16,185,129,.12)'; bc = GREEN; col = GREEN_D; fw = 700; }
                                                else if (k === qPick) { bg = 'rgba(220,80,60,.08)'; bc = '#d96a55'; col = '#b1492f'; }
                                            }
                                            return (
                                                <button key={k} onClick={() => answer(k)} disabled={!!qPick} style={{ textAlign: 'left', fontSize: 16, padding: '13px 16px', border: `1px solid ${bc}`, background: bg, color: col, fontWeight: fw, borderRadius: 12, cursor: qPick ? 'default' : 'pointer' }}>
                                                    <span style={{ color: GOLD, marginRight: 10, fontWeight: 700 }}>{i + 1}</span>{WORDS[k].disp}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {qPick && (
                                        <div style={{ marginTop: 16, padding: '14px 16px', borderRadius: 12, background: '#FBF8F2', fontSize: 14 }}>
                                            <div style={{ fontSize: 16, fontWeight: 700, color: INK }}>{qPick === q.w ? '正解 — ' : ''}{w.disp}：{w.jp}</div>
                                            <div style={{ marginTop: 8, fontSize: 13, color: SUB }}>
                                                <b style={{ color: GREEN_D }}>{ep.jp}</b>の場面で出てきた語：<br />
                                                <span dangerouslySetInnerHTML={{ __html: storySentence(ep.html, q.w) }} />
                                            </div>
                                        </div>
                                    )}
                                    {qPick && (
                                        <button onClick={nextQ} style={{ marginTop: 14, width: '100%', fontSize: 15, padding: 13, border: 'none', borderRadius: 12, background: `linear-gradient(135deg,${GOLD},#A6842F)`, color: '#fff', cursor: 'pointer' }}>次へ &rarr;</button>
                                    )}
                                    <div style={{ marginTop: 8, textAlign: 'right', fontSize: 12, color: SUB }}>通算 {stats.right}/{stats.total}</div>
                                </div>
                            );
                        })()}
                    </div>
                )}

                {/* ---------- PROGRESS ---------- */}
                {tab === 'prog' && (() => {
                    const total = KEYS.length; const pct = Math.round((doneCount / total) * 100);
                    const acc = stats.total ? Math.round((stats.right / stats.total) * 100) : 0;
                    const C = 2 * Math.PI * 60; const off = C * (1 - doneCount / total);
                    return (
                        <div className="sv-fade">
                            <div style={{ ...card, padding: 22, textAlign: 'center', marginBottom: 12 }}>
                                <svg width="140" height="140" viewBox="0 0 140 140" style={{ margin: '0 auto 8px', display: 'block' }}>
                                    <circle cx="70" cy="70" r="60" fill="none" stroke={LINE} strokeWidth="12" />
                                    <circle cx="70" cy="70" r="60" fill="none" stroke="url(#svg)" strokeWidth="12" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={off} transform="rotate(-90 70 70)" />
                                    <defs><linearGradient id="svg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={GOLD} /><stop offset="1" stopColor={GREEN} /></linearGradient></defs>
                                    <text x="70" y="64" textAnchor="middle" fontSize="30" fill="#A6842F" fontWeight="700">{pct}%</text>
                                    <text x="70" y="86" textAnchor="middle" fontSize="11" fill={SUB}>マスター</text>
                                </svg>
                                <div style={{ fontSize: 13, color: SUB }}>{doneCount} / {total} 語</div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                                <div style={{ ...card, padding: 18, textAlign: 'center' }}><div style={{ fontSize: 32, color: '#A6842F', fontWeight: 700, lineHeight: 1 }}>{stats.total}</div><div style={{ fontSize: 12, color: SUB, marginTop: 6 }}>解いた問題数</div></div>
                                <div style={{ ...card, padding: 18, textAlign: 'center' }}><div style={{ fontSize: 32, color: '#A6842F', fontWeight: 700, lineHeight: 1 }}>{acc}%</div><div style={{ fontSize: 12, color: SUB, marginTop: 6 }}>通算 正答率</div></div>
                            </div>
                            <div style={{ ...card, padding: '6px 18px' }}>
                                {EPISODES.map((ep, i) => {
                                    const ws = epWords(i); const d = ws.filter(k => known[k]).length; const p = Math.round((d / ws.length) * 100);
                                    return (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < EPISODES.length - 1 ? `1px solid ${LINE}` : 'none', fontSize: 14 }}>
                                            <span style={{ width: 78, fontSize: 12, color: SUB }}>{ep.jp}</span>
                                            <div style={{ flex: 1, height: 6, background: LINE, borderRadius: 6, overflow: 'hidden' }}><div style={{ height: '100%', width: `${p}%`, background: `linear-gradient(90deg,${GREEN},${GREEN_D})` }} /></div>
                                            <span style={{ width: 42, textAlign: 'right', fontSize: 12, color: SUB }}>{p}%</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <button onClick={() => { if (confirm('覚えた単語とスコアを全部消します。よろしいですか？')) { localStorage.removeItem(LS_KNOWN); localStorage.removeItem(LS_STATS); persistKnown({}); persistStats({ right: 0, total: 0 }); } }}
                                style={{ display: 'block', margin: '22px auto 0', fontSize: 12, color: SUB, background: '#fff', border: `1px solid ${LINE}`, borderRadius: 10, padding: '9px 18px', cursor: 'pointer' }}>進捗をリセット</button>
                        </div>
                    );
                })()}
            </div>

            {/* ---------- WORD MODAL ---------- */}
            {modalWord && (() => {
                const w = WORDS[modalWord]; const ep = EPISODES[w.ep]; const is = !!known[modalWord];
                return (
                    <div onClick={(e) => { if (e.target === e.currentTarget) setModalWord(null); }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(28,25,23,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 80, padding: 16 }}>
                        <div style={{ background: '#fff', width: '100%', maxWidth: 520, maxHeight: '85vh', overflowY: 'auto', borderRadius: 20, padding: '24px 22px 28px', animation: 'svup .26s ease' }}>
                            <div style={{ fontSize: 11, letterSpacing: '0.14em', color: '#A6842F', fontWeight: 700, textTransform: 'uppercase' }}>{w.pos}</div>
                            <h3 style={{ fontSize: 30, fontWeight: 900, color: INK, margin: '2px 0' }}>{w.disp}</h3>
                            <button onClick={() => speak(w.disp)} style={{ background: 'none', border: `1px solid ${LINE}`, borderRadius: 10, padding: '4px 12px', fontSize: 12, color: SUB, cursor: 'pointer', marginTop: 4 }}>&#9658; 発音</button>
                            <div style={{ fontSize: 18, color: INK, margin: '10px 0 2px', fontWeight: 600 }}>{w.jp}</div>
                            <div style={{ fontSize: 13, color: SUB, fontStyle: 'italic', borderLeft: `3px solid ${LINE}`, paddingLeft: 10, margin: '6px 0 14px' }}>{w.en}</div>
                            <div style={{ fontSize: 14, background: '#FBF8F2', borderRadius: 12, padding: '12px 14px', color: INK, lineHeight: 1.9 }}>
                                <span style={{ display: 'block', fontSize: 10, letterSpacing: '0.16em', color: CRIMSON, fontWeight: 700, marginBottom: 4 }}>{ep.no} &middot; {ep.jp}</span>
                                <span dangerouslySetInnerHTML={{ __html: storySentence(ep.html, modalWord).replace(/<b>/g, `<b style="color:${GREEN_D}">`) }} />
                            </div>
                            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                                <button onClick={() => setModalWord(null)} style={{ flex: 1, fontSize: 14, padding: 13, borderRadius: 12, border: `1px solid ${LINE}`, background: '#fff', color: INK, cursor: 'pointer' }}>閉じる</button>
                                <button onClick={() => { toggleKnown(modalWord); setModalWord(null); }} style={{ flex: 1, fontSize: 14, padding: 13, borderRadius: 12, cursor: 'pointer', border: is ? `1px solid ${GREEN}` : '1px solid transparent', background: is ? '#FBF8F2' : `linear-gradient(135deg,${GREEN},${GREEN_D})`, color: is ? GREEN_D : '#fff' }}>{is ? 'マスター済み（解除）' : '覚えた！'}</button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
