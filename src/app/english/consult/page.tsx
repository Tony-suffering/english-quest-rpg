'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';

/* ============================================================
 * TONIO ANSWER -- 英語の悩みに答える窓口
 * 意匠は「問診票」。紙、ヘアラインの罫、明朝の柱番号、目次のリーダー点。
 * 装飾のための絵は置かない。番号と罫と余白だけで組む
 * ============================================================ */

const PAPER = '#FDFCF8';
const PAPER2 = '#FFFFFF';
const INK = '#1A1714';
const SUB = '#6B635A';
const FAINT = '#A9A196';
const RULE = '#E4DFD4';
const GOLD = '#C9A227';
const DEEPGOLD = '#8C6D0F';
const GREEN = '#0F8A5F';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", "YuMincho", Georgia, serif';

type Q = { id: string; label: string; hint: string; rows: number };
type Section = { key: string; no: string; title: string; en: string; lead: string; questions: Q[] };

// 15問。全部フリーテキスト。選択肢にすると、その人固有の事情が消える
const SECTIONS: Section[] = [
    {
        key: 'goal', no: 'I', title: 'どうなりたいか', en: 'destination',
        lead: 'ここが曖昧だと、あとの全部がぼやける。恥ずかしいくらい具体的に。',
        questions: [
            { id: 'goal', label: '英語で、いま一番できるようになりたいことは何か', hint: '誰と、どこで、何を、どうしたいか。会議で反論したい。義理の家族と雑談したい。英検準1級に受かりたい。何でもいい', rows: 5 },
            { id: 'deadline', label: 'いつまでに', hint: '試験日、赴任日、結婚式。日付があるなら日付で。ないなら、ない、と書いてくれ', rows: 2 },
            { id: 'why', label: 'それができたら、何が変わるか', hint: '仕事、金、家族、自分の気分。しょうもない理由ほど強い。見栄でもいい', rows: 4 },
        ],
    },
    {
        key: 'now', no: 'II', title: 'いま何が起きているか', en: 'the scene',
        lead: '一般論では答えられない。実際にあった一件を書いてもらうのが、ここで一番効く。',
        questions: [
            { id: 'scene', label: 'つまずいた場面を、実際にあった一件だけ、そのまま書いてくれ', hint: '相手に何と言われて、自分は何と言えなかったか。覚えている範囲の日本語でいい。ここが具体的なほど、返せる答えが変わる', rows: 6 },
            { id: 'level', label: 'いまの英語力', hint: 'スコアがあればスコア。なければ、洋画を字幕なしでどのくらいわかるか、で書いてくれ', rows: 3 },
            { id: 'doing', label: 'すでにやっていること', hint: '教材、アプリ、スクール、頻度、続いている期間。やっていないなら、やっていない、で構わない', rows: 4 },
            { id: 'quit', label: '過去にやめたもの。何を、何週目で、なぜやめたか', hint: '実は一番重要な質問。同じ罠をもう一度踏ませないために聞いている', rows: 5 },
        ],
    },
    {
        key: 'resource', no: 'III', title: 'あなたの1日', en: 'your day',
        lead: '理想の時間割は聞かない。ノルマも決めない。すでにある隙間を知りたいだけ。',
        questions: [
            { id: 'trigger', label: '毎日かならずやってる行動を、思いつくだけ挙げてくれ', hint: '歯を磨く。車のエンジンをかける。皿を洗う。子どもを寝かせる。電車に乗る。ここに英語をねじ込む。時刻では決めない', rows: 4 },
            { id: 'minutes', label: 'そのうち、英語を入れられそうな隙間はどれか', hint: '1時間やれとも5分やれとも言わない。トイレ、風呂、通勤、寝る前。入りそうなところに見当がついているなら、それを書いてくれ', rows: 3 },
            { id: 'handsfree', label: '手は空いているが目は塞がっている時間はあるか', hint: '運転、皿洗い、歩き、掃除、風呂。ここが多い人は、組み方がまるごと変わる', rows: 3 },
            { id: 'partner', label: '英語を使う相手、直してくれる相手はいるか', hint: 'いない、AI、オンライン英会話、職場、家族。いないなら、いない、でいい', rows: 3 },
            { id: 'budget', label: '英語に使える金の上限は月いくらか', hint: '0円でいい。0円だと分かれば、0円で組む', rows: 2 },
        ],
    },
    {
        key: 'self', no: 'IV', title: 'あなたの性質', en: 'how you are built',
        lead: '続く形は人によって違う。根性の量ではなく、どの形なら続くかを決めるために聞く。',
        questions: [
            { id: 'temperament', label: '飽きるのが早いほうか、積み上げるのが好きなほうか', hint: '三日坊主でも構わない。それ前提で組むだけ。英語以外の何かを例にしてくれると、はっきりする。筋トレ、ゲーム、貯金、何でも', rows: 3 },
            { id: 'watched', label: '人に見られているほうが続くか、一人のほうが続くか', hint: '見られると縮む人に、公開記録や連続日数は毒になる', rows: 3 },
            { id: 'killer', label: '何を言われるとやる気が消えるか', hint: '正直に書いてほしい。返す答えの中で、それを言わないようにする', rows: 3 },
        ],
    },
];

const ALL_Q = SECTIONS.flatMap(s => s.questions);
const STORAGE_KEY = 'consult_draft_v1';

// 情報量の目盛り。等間隔ではなく、段ごとに区切る。数字より段のほうが直感に合う
const STOPS = [
    { at: 0, pct: 0, label: '下書き', note: 'このままだと、AIに聞いて出てくる無難な回答と同じになる', color: '#D8D3C8' },
    { at: 200, pct: 20, label: '薄い', note: '方向は出せる。中身は薄くなる', color: '#E0BF52' },
    { at: 600, pct: 40, label: '標準', note: 'ここから、あなた向けの答えになる', color: GOLD },
    { at: 1200, pct: 62, label: '濃い', note: '1日のどこにねじ込むかまで組める', color: '#B4881A' },
    { at: 2400, pct: 100, label: '全開', note: '持っているもの全部で返す', color: GREEN },
];

function gauge(chars: number) {
    let i = 0;
    for (let k = 0; k < STOPS.length; k++) if (chars >= STOPS[k].at) i = k;
    const cur = STOPS[i];
    const next = STOPS[i + 1];
    if (!next) return { level: cur, pct: 100 };
    const span = next.at - cur.at;
    const t = span > 0 ? (chars - cur.at) / span : 0;
    return { level: cur, pct: cur.pct + t * (next.pct - cur.pct) };
}

// 悩み -> 4工程 -> 毎日。装飾ではなく、返すものの順番そのもの
const STAGES = [
    { n: '01', t: '何がしたいか', d: 'ここが違えば全部違う' },
    { n: '02', t: 'やること / 捨てること', d: '捨てる理由まで説明する' },
    { n: '03', t: 'どこにねじ込むか', d: '歯磨きのあと、車の中' },
    { n: '04', t: '4日目', d: '三日坊主でいい。また始める' },
];

function FlowH() {
    const xs = [168, 366, 564, 762];
    return (
        <svg viewBox="0 0 900 200" style={{ width: '100%', height: 'auto', display: 'block' }} role="img" aria-label="悩みから毎日回る形までの4工程">
            <line x1="40" y1="70" x2="860" y2="70" stroke={RULE} strokeWidth="1" />
            <text x="40" y="42" fontFamily={SERIF} fontSize="15" fill={SUB}>あなたの15の答え</text>
            <text x="860" y="42" fontFamily={SERIF} fontSize="15" fill={GREEN} textAnchor="end">明日から回る形</text>
            <line x1="40" y1="52" x2="40" y2="70" stroke={RULE} strokeWidth="1" />
            <line x1="860" y1="52" x2="860" y2="70" stroke={RULE} strokeWidth="1" />
            {xs.map((x, i) => (
                <g key={STAGES[i].n}>
                    <line x1={x} y1="70" x2={x} y2="88" stroke={GOLD} strokeWidth="1" />
                    <circle cx={x} cy="70" r="4.5" fill={PAPER} stroke={GOLD} strokeWidth="1.5" />
                    <text x={x} y="112" fontFamily="Georgia, serif" fontSize="13" fill={GOLD} textAnchor="middle" letterSpacing="1.5">{STAGES[i].n}</text>
                    <text x={x} y="141" fontFamily={SERIF} fontSize="17" fontWeight="700" fill={INK} textAnchor="middle">{STAGES[i].t}</text>
                    <text x={x} y="166" fontSize="12" fill={FAINT} textAnchor="middle">{STAGES[i].d}</text>
                </g>
            ))}
        </svg>
    );
}

function FlowV() {
    const ys = [70, 160, 250, 340];
    return (
        <svg viewBox="0 0 320 430" style={{ width: '100%', height: 'auto', display: 'block' }} role="img" aria-label="悩みから毎日回る形までの4工程">
            <line x1="34" y1="34" x2="34" y2="400" stroke={RULE} strokeWidth="1" />
            <text x="52" y="24" fontFamily={SERIF} fontSize="13" fill={SUB}>あなたの15の答え</text>
            <circle cx="34" cy="34" r="3" fill={RULE} />
            {ys.map((y, i) => (
                <g key={STAGES[i].n}>
                    <line x1="34" y1={y} x2="52" y2={y} stroke={GOLD} strokeWidth="1" />
                    <circle cx="34" cy={y} r="4.5" fill={PAPER} stroke={GOLD} strokeWidth="1.5" />
                    <text x="62" y={y - 12} fontFamily="Georgia, serif" fontSize="12" fill={GOLD} letterSpacing="1.5">{STAGES[i].n}</text>
                    <text x="62" y={y + 7} fontFamily={SERIF} fontSize="16" fontWeight="700" fill={INK}>{STAGES[i].t}</text>
                    <text x="62" y={y + 27} fontSize="11.5" fill={FAINT}>{STAGES[i].d}</text>
                </g>
            ))}
            <circle cx="34" cy="400" r="3" fill={GREEN} />
            <text x="52" y="405" fontFamily={SERIF} fontSize="13" fill={GREEN}>明日から回る形</text>
        </svg>
    );
}

export default function ConsultPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const [restored, setRestored] = useState(false);
    const [savedAt, setSavedAt] = useState('');
    const loaded = useRef(false);

    useEffect(() => {
        const c = () => setIsMobile(window.innerWidth < 860);
        c(); window.addEventListener('resize', c);
        return () => window.removeEventListener('resize', c);
    }, []);

    // 15問ある。書いたものが消えるのが一番きつい失敗なので、下書きは常に残す
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const d = JSON.parse(raw);
                if (d.answers && Object.keys(d.answers).length) { setAnswers(d.answers); setRestored(true); }
                if (d.name) setName(d.name);
                if (d.contact) setContact(d.contact);
            }
        } catch { /* 使えない環境では何もしない */ }
        loaded.current = true;
    }, []);

    // note からは #form 付きで来る。client component なので、
    // ブラウザ任せのハッシュ移動だと描画が終わる前に空振りすることがある。着地したら自分で送る
    useEffect(() => {
        if (window.location.hash !== '#form') return;
        const jump = () => document.getElementById('form')?.scrollIntoView({ block: 'start' });
        jump();
        const t = setTimeout(jump, 300);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (!loaded.current) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, name, contact }));
            const d = new Date();
            setSavedAt(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
        } catch { /* 保存できなくても入力は続けられる */ }
    }, [answers, name, contact]);

    // 情報量。空白は数えない
    const chars = useMemo(() => Object.values(answers).join('').replace(/\s/g, '').length, [answers]);
    const filled = useMemo(() => ALL_Q.filter(q => (answers[q.id] || '').trim().length > 0).length, [answers]);
    const g = useMemo(() => gauge(chars), [chars]);

    const plainText = useMemo(() => {
        const lines: string[] = [`呼び名: ${name || '(未記入)'}`, `連絡先: ${contact || '(未記入)'}`, ''];
        SECTIONS.forEach(s => {
            lines.push(`--- ${s.no}. ${s.title} ---`);
            s.questions.forEach(q => {
                lines.push(`Q. ${q.label}`);
                lines.push((answers[q.id] || '').trim() || '(未記入)');
                lines.push('');
            });
        });
        return lines.join('\n');
    }, [answers, name, contact]);

    const submit = useCallback(async () => {
        setError('');
        if (!name.trim() || !contact.trim()) { setError('呼び名と連絡先を入れてくれ。返せなくなる'); return; }
        if (filled < 3) { setError('3問以上答えてくれ。それ未満だと答えようがない'); return; }
        setSending(true);
        try {
            const res = await fetch('/api/consult', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, contact, answers }),
            });
            const json = await res.json();
            if (!res.ok || !json.success) throw new Error(json.error || '送信に失敗した');
            try { localStorage.removeItem(STORAGE_KEY); } catch { /* noop */ }
            setSent(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (e) {
            setError(`送信に失敗した: ${String(e)} 下の 答えをコピー を押して、note か X で直接送ってくれても届く`);
        } finally {
            setSending(false);
        }
    }, [name, contact, answers, filled]);

    const copy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(plainText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { setError('コピーできなかった。手動で選択してくれ'); }
    }, [plainText]);

    const pad = isMobile ? '0 20px' : '0 40px';
    const wrap: React.CSSProperties = { maxWidth: '1000px', margin: '0 auto', padding: pad };
    const narrow: React.CSSProperties = { maxWidth: '760px', margin: '0 auto', padding: pad };

    const css = `
        /* 既定は「見えている」。JS が観測できたときだけ rv-armed を付けて演出に入る。
           演出のために本文が消えたままになる事故を、構造として起こらなくする */
        .rv-armed .rv { opacity: 0; transform: translateY(14px); transition: opacity .7s cubic-bezier(.2,.7,.3,1), transform .7s cubic-bezier(.2,.7,.3,1); }
        .rv-armed .rv.on { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) { .rv-armed .rv { opacity: 1; transform: none; transition: none; } }
        .ca-field { width: 100%; box-sizing: border-box; background: ${PAPER2}; color: ${INK};
            border: 1px solid ${RULE}; border-radius: 2px; padding: 13px 15px;
            font-size: 15.5px; line-height: 1.95; font-family: inherit; outline: none;
            transition: border-color .18s ease, box-shadow .18s ease; resize: vertical; }
        .ca-field:focus { border-color: ${GOLD}; box-shadow: 0 0 0 3px rgba(201,162,39,.12); }
        .ca-field.done { border-left: 2px solid ${GOLD}; }
        .ca-lead { display: flex; align-items: baseline; gap: 10px; }
        .ca-lead .dots { flex: 1; border-bottom: 1px dotted ${RULE}; transform: translateY(-4px); }
        .ca-btn { border: none; cursor: pointer; font-family: inherit; border-radius: 2px;
            transition: transform .12s ease, box-shadow .18s ease, background .18s ease; }
        .ca-btn:hover:not(:disabled) { transform: translateY(-1px); }
        .ca-btn:disabled { cursor: default; }
        .ca-idx a { color: ${SUB}; text-decoration: none; }
        .ca-idx a:hover { color: ${DEEPGOLD}; }
        html { scroll-behavior: smooth; }
    `;

    if (sent) {
        return (
            <div style={{ background: PAPER, minHeight: '100vh', color: INK, fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif' }}>
                <style>{css}</style>
                <div style={{ ...narrow, paddingTop: isMobile ? '70px' : '120px', paddingBottom: '110px' }}>
                    <div style={{ fontSize: '10.5px', letterSpacing: '4px', color: DEEPGOLD, fontWeight: 700, marginBottom: '22px' }}>RECEIVED</div>
                    <h1 style={{ fontFamily: SERIF, fontSize: isMobile ? '30px' : '44px', fontWeight: 700, margin: '0 0 28px', lineHeight: 1.5, letterSpacing: '0.02em' }}>
                        受け取った。<br />読んで、答えを組む。
                    </h1>
                    <div style={{ borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}`, padding: '20px 0', margin: '0 0 28px', display: 'flex', gap: isMobile ? '26px' : '48px', flexWrap: 'wrap' }}>
                        {[['情報量', g.level.label], ['文字数', `${chars}`], ['回答', `${filled} / ${ALL_Q.length}`]].map(([k, v]) => (
                            <div key={k}>
                                <div style={{ fontSize: '10.5px', letterSpacing: '2px', color: FAINT, marginBottom: '6px' }}>{k}</div>
                                <div style={{ fontFamily: SERIF, fontSize: '26px', fontWeight: 700 }}>{v}</div>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: '15px', color: SUB, lineHeight: 2.15, margin: '0 0 34px' }}>
                        書き足したくなったら、同じ質問票をもう一度送ってくれていい。後から来たほうを本命として読む。
                    </p>
                    <button className="ca-btn" onClick={copy}
                        style={{ background: PAPER2, border: `1px solid ${RULE}`, color: INK, padding: '14px 26px', fontSize: '13.5px', fontWeight: 700 }}>
                        {copied ? '控えをコピーした' : '自分用に控えをコピー'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: PAPER, minHeight: '100vh', color: INK, fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif', overflowX: 'hidden' }}>
            <style>{css}</style>
            <Reveal />

            {/* ========== 題字 ========== */}
            <header style={{ borderBottom: `1px solid ${RULE}`, background: PAPER }}>
                <div style={{ ...wrap, paddingTop: isMobile ? '22px' : '30px', paddingBottom: isMobile ? '18px' : '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '9px' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '17px' : '20px', fontWeight: 700, color: GOLD, letterSpacing: '2px' }}>TONIO</span>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '17px' : '20px', fontWeight: 700, letterSpacing: '2px' }}>ANSWER</span>
                    </div>
                    <div style={{ fontSize: '10.5px', letterSpacing: '2px', color: FAINT }}>英語相談 問診票</div>
                </div>
            </header>

            {/* ========== 見出し ========== */}
            <section style={{ borderBottom: `1px solid ${RULE}` }}>
                <div style={{ ...wrap, paddingTop: isMobile ? '54px' : '96px', paddingBottom: isMobile ? '44px' : '76px' }}>
                    <h1 className="rv" style={{ fontFamily: SERIF, fontSize: isMobile ? '34px' : '62px', fontWeight: 700, lineHeight: 1.42, letterSpacing: '0.02em', margin: '0 0 30px' }}>
                        英語の悩み、<br />投げてくれ。<br />
                        <span style={{ color: DEEPGOLD }}>ぜんぶ答える。</span>
                    </h1>
                    <div className="rv" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '22px' : '52px', maxWidth: '820px' }}>
                        <p style={{ fontSize: isMobile ? '15px' : '16px', color: SUB, lineHeight: 2.2, margin: 0 }}>
                            英語に関する<strong style={{ color: INK, fontWeight: 700 }}>悩み、相談、自慢、比較、今後</strong>。全部受ける。
                            試験でも、仕事でも、旅行でも、子どもの英語でも、なんとなく悔しいでもいい。
                        </p>
                        <p style={{ fontSize: isMobile ? '15px' : '16px', color: SUB, lineHeight: 2.2, margin: 0 }}>
                            質問が15個ある。<strong style={{ color: INK, fontWeight: 700 }}>詳しく書くほど、返ってくる答えが濃くなる。</strong>
                            それだけの話だ。3個でもいい。
                        </p>
                    </div>
                    <div className="rv" style={{ marginTop: isMobile ? '34px' : '48px', display: 'flex', gap: '18px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <a href="#form" style={{ textDecoration: 'none' }}>
                            <span style={{ display: 'inline-block', background: INK, color: PAPER, padding: isMobile ? '16px 32px' : '18px 46px', fontSize: '14.5px', fontWeight: 700, letterSpacing: '2px' }}>
                                質問票へ
                            </span>
                        </a>
                        <span style={{ fontSize: '12.5px', color: FAINT, letterSpacing: '1px' }}>所要 10分ほど ・ 書きかけは自動で残る</span>
                    </div>
                </div>
            </section>

            {/* ========== 目次 / どんな相談でもいい ========== */}
            <section style={{ borderBottom: `1px solid ${RULE}` }}>
                <div style={{ ...wrap, paddingTop: isMobile ? '46px' : '76px', paddingBottom: isMobile ? '46px' : '76px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '210px 1fr', gap: isMobile ? '24px' : '48px' }}>
                        <div>
                            <div style={{ fontSize: '10.5px', letterSpacing: '3px', color: DEEPGOLD, fontWeight: 700, marginBottom: '10px' }}>ANYTHING</div>
                            <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? '23px' : '28px', fontWeight: 700, margin: 0, lineHeight: 1.55 }}>どんな相談<br style={{ display: isMobile ? 'none' : 'block' }} />でもいい</h2>
                        </div>
                        <div className="ca-idx rv">
                            {[
                                ['単語がぜんぜん頭に残らない', '悩み'],
                                ['何を言われているのか聞き取れない', '悩み'],
                                ['会議で振られると黙ってしまう', '悩み'],
                                ['英検に受かりたい', '相談'],
                                ['TOEICが同じ点で止まっている', '相談'],
                                ['教材を買っても3週間でやめる', '相談'],
                                ['子どもにどう教えるか迷っている', '相談'],
                                ['この教材とあの教材、どっちがいいのか', '比較'],
                                ['この勉強法、意味あるのか判定してほしい', '比較'],
                                ['できるようになった話を、誰かに聞いてほしい', '自慢'],
                                ['この先どこまで行けるのか知りたい', '今後'],
                                ['なんとなく悔しい', '---'],
                            ].map(([t, tag]) => (
                                <div key={t} className="ca-lead" style={{ padding: '13px 0', borderBottom: `1px solid ${RULE}` }}>
                                    <span style={{ fontSize: isMobile ? '14.5px' : '15.5px', color: INK, lineHeight: 1.7 }}>{t}</span>
                                    <span className="dots" />
                                    <span style={{ fontSize: '11px', color: FAINT, letterSpacing: '1.5px', whiteSpace: 'nowrap' }}>{tag}</span>
                                </div>
                            ))}
                            <p style={{ fontSize: '13.5px', color: SUB, lineHeight: 2, marginTop: '22px' }}>
                                ここに無いものでも受ける。テンプレを貼って終わりにはしない。それなら検索したほうが早いので。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== 返ってくるもの (工程図) ========== */}
            <section style={{ borderBottom: `1px solid ${RULE}`, background: PAPER2 }}>
                <div style={{ ...wrap, paddingTop: isMobile ? '46px' : '80px', paddingBottom: isMobile ? '46px' : '80px' }}>
                    <div style={{ fontSize: '10.5px', letterSpacing: '3px', color: DEEPGOLD, fontWeight: 700, marginBottom: '12px' }}>WHAT COMES BACK</div>
                    <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? '25px' : '34px', fontWeight: 700, margin: '0 0 8px', lineHeight: 1.5 }}>返ってくるのは、4つ</h2>
                    <p style={{ fontSize: '14.5px', color: SUB, lineHeight: 2.1, margin: '0 0 34px', maxWidth: '620px' }}>
                        あなたが書いた15の答えを、この順番で1本に通す。順番には理由がある。何がしたいかが違えば、やることが全部違うからだ。
                    </p>

                    <div className="rv" style={{ margin: isMobile ? '0 0 34px' : '0 0 44px' }}>
                        {isMobile ? <FlowV /> : <FlowH />}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0 48px' }}>
                        {[
                            { n: '01', t: '英語で何がしたいか。英語に何を望むのか', d: 'ここが違えば、やることは全部違う。全部違うのに、世の中の英語学習法は全員に同じことを言う。まず単語帳。次に過去問。シャドーイング。あれは相手を見ていない。' },
                            { n: '02', t: '何をやって、何を捨てるか', d: '時間が足りない人に全部やれというのは、答えじゃなくて責任逃れだと思う。取捨選択を合理的に全部説明して提案する。なぜ捨てていいのかまで書く。' },
                            { n: '03', t: '日々なにをするのか', d: '時間をノルマに設定しない。1時間やればどうのとか、5分でどうのとか言わない。あなたが必ずやってる行動の直後、直前、途中に英語をねじ込む。歯を磨いたあと。車に乗った直後。トイレ、風呂、寝る前、電車の中。' },
                            { n: '04', t: '続かなくなったとき、どうするか', d: '先に決めておく。三日坊主でいい。4日目にまた始めればいい。連続日数が途切れたら終わり、みたいな話とはまったく関係ない。' },
                        ].map(c => (
                            <div key={c.n} style={{ borderTop: `1px solid ${RULE}`, padding: isMobile ? '22px 0' : '26px 0' }}>
                                <div style={{ display: 'flex', gap: '14px', alignItems: 'baseline', marginBottom: '10px' }}>
                                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '13px', color: GOLD, letterSpacing: '2px' }}>{c.n}</span>
                                    <span style={{ fontFamily: SERIF, fontSize: '19px', fontWeight: 700 }}>{c.t}</span>
                                </div>
                                <p style={{ fontSize: '14px', color: SUB, lineHeight: 2.1, margin: 0 }}>{c.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== 根拠 ========== */}
            <section style={{ borderBottom: `1px solid ${RULE}` }}>
                <div style={{ ...wrap, paddingTop: isMobile ? '46px' : '80px', paddingBottom: isMobile ? '46px' : '80px' }}>
                    <div style={{ fontSize: '10.5px', letterSpacing: '3px', color: DEEPGOLD, fontWeight: 700, marginBottom: '12px' }}>WHY ME</div>
                    <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? '25px' : '34px', fontWeight: 700, margin: '0 0 22px', lineHeight: 1.5 }}>
                        俺は英語がペラペラではない
                    </h2>
                    <p style={{ fontSize: '15px', color: SUB, lineHeight: 2.2, margin: '0 0 20px', maxWidth: '660px' }}>
                        先に言っておく。TOEIC900はある。15年やってる。毎日オンライン英会話もやってる。それでも、
                        <strong style={{ color: INK, fontWeight: 700 }}>ネイティブの100分の1だ。</strong>
                    </p>
                    <p style={{ fontSize: '15px', color: SUB, lineHeight: 2.2, margin: '0 0 36px', maxWidth: '660px' }}>
                        だからこそ、英語を学びたい人の役に立てると思う。
                        <strong style={{ color: INK, fontWeight: 700 }}>俺は英語が既に上手で、完成された商品を売るひとではない。ひとりの英語仲間として答える。</strong>
                    </p>

                    <div className="rv" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '1px', background: RULE, border: `1px solid ${RULE}`, marginBottom: '34px' }}>
                        {[
                            { v: '8,734', u: '万語', k: '数えた英語' },
                            { v: '94', u: '夜', k: '録音した英会話' },
                            { v: '7', u: '回分', k: '作ったTOEIC模試' },
                            { v: '240', u: '本超', k: '書いた記事' },
                        ].map(s => (
                            <div key={s.k} style={{ background: PAPER, padding: isMobile ? '20px 16px' : '26px 22px' }}>
                                <div style={{ fontFamily: SERIF, fontSize: isMobile ? '30px' : '38px', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
                                    {s.v}<span style={{ fontSize: isMobile ? '13px' : '15px', color: SUB, marginLeft: '4px', fontWeight: 400 }}>{s.u}</span>
                                </div>
                                <div style={{ fontSize: '11.5px', color: FAINT, letterSpacing: '1px', marginTop: '9px' }}>{s.k}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ fontSize: '11px', letterSpacing: '2px', color: FAINT, marginBottom: '14px' }}>これまでにやったこと全部</div>
                    <p style={{ fontSize: '13.5px', color: SUB, lineHeight: 2.05, margin: '0 0 20px' }}>
                        自宅のパソコンで英語を8734万語ぶん数えた。単語が一生のうち何回耳に入るかでランキングを作った。
                        オンライン英会話を94夜ぶん録音して、自分の間違いを全部書き出して分類した。TOEICの模試を7回分作った。
                        全部この site に置いてある。中身は先に見てくれていい。
                    </p>
                    <div className="ca-idx" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0 40px' }}>
                        {[
                            { href: '/english/corpus', t: '英語表現ランキング', d: '実際の会話から数えた。覚える順番を感覚で決めなくて済む' },
                            { href: '/english/corpus/words', t: '単語の生涯遭遇回数', d: 'その単語を一生で何回聞くのか。覚える価値を回数で出す' },
                            { href: '/english/training/dmm', t: 'オンライン英会話の記録', d: '自分の間違いを全部書き出して分類した。詰まり方には型がある' },
                            { href: '/english/toeic', t: 'TOEIC フル模試', d: '作る側から見た出題の癖。解説は全訳と、つながらない語の二階建て' },
                            { href: '/english/writepass', t: '英検1級 ライティング30日', d: '型で受かる部分と、型では届かない部分の切り分け' },
                            { href: '/english/note', t: '書いてきた記事', d: '考えてきたことは全部公開してある。合うかは読んで判断してくれ' },
                        ].map(c => (
                            <Link key={c.href} href={c.href} style={{ textDecoration: 'none' }}>
                                <div className="ca-lead" style={{ padding: '15px 0', borderBottom: `1px solid ${RULE}`, alignItems: 'flex-start' }}>
                                    <div>
                                        <div style={{ fontSize: '14.5px', fontWeight: 700, color: INK, marginBottom: '5px' }}>{c.t}</div>
                                        <div style={{ fontSize: '12.5px', color: FAINT, lineHeight: 1.85 }}>{c.d}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== 向き不向き ========== */}
            <section style={{ borderBottom: `1px solid ${RULE}`, background: PAPER2 }}>
                <div style={{ ...wrap, paddingTop: isMobile ? '46px' : '76px', paddingBottom: isMobile ? '46px' : '76px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '34px' : '56px' }}>
                        {[
                            { k: '向いている', c: GREEN, items: ['何をやればいいか分からないまま数年たっている', '教材は買うが、いつも3週間でやめる', '期限が決まっていて、時間が足りない', '自分の生活に合う形が欲しい'] },
                            { k: '向いていない', c: FAINT, items: ['すでに自分の型があって、順調に伸びている', '質問票を埋める気がない', '今すぐ喋れるようになる裏技を探している', '連続日数で追い込んでほしい。ここはその逆をやる'] },
                        ].map(col => (
                            <div key={col.k}>
                                <div style={{ fontSize: '11px', letterSpacing: '3px', color: col.c, fontWeight: 700, marginBottom: '16px', paddingBottom: '12px', borderBottom: `1px solid ${col.c}33` }}>
                                    {col.k}
                                </div>
                                {col.items.map(t => (
                                    <div key={t} style={{ display: 'flex', gap: '12px', padding: '11px 0', borderBottom: `1px solid ${RULE}` }}>
                                        <span style={{ color: col.c, fontSize: '13px', lineHeight: 1.9 }}>—</span>
                                        <span style={{ fontSize: '14px', color: col.k === '向いている' ? INK : SUB, lineHeight: 1.9 }}>{t}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== 質問票 ========== */}
            <section id="form" style={{ borderBottom: `1px solid ${RULE}` }}>
                <div style={{ ...wrap, paddingTop: isMobile ? '50px' : '86px', paddingBottom: isMobile ? '60px' : '96px' }}>
                    <div style={{ fontSize: '10.5px', letterSpacing: '3px', color: DEEPGOLD, fontWeight: 700, marginBottom: '12px' }}>QUESTIONNAIRE</div>
                    <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? '27px' : '38px', fontWeight: 700, margin: '0 0 18px', lineHeight: 1.5 }}>質問票</h2>
                    <p style={{ fontSize: '14.5px', color: SUB, lineHeight: 2.15, margin: '0 0 8px', maxWidth: '640px' }}>
                        全部埋めなくていい。ただし、埋めたぶんだけ答えが濃くなる。それが見えるように目盛りを付けた。
                        空欄はこちらの推測で埋める。推測で埋めた箇所は、答えの中にそう書く。
                    </p>
                    {restored && (
                        <div style={{ fontSize: '12.5px', color: DEEPGOLD, background: '#FBF6E6', border: `1px solid ${GOLD}44`, padding: '11px 14px', margin: '18px 0 0', lineHeight: 1.8 }}>
                            前回の書きかけを復元した。続きからどうぞ。
                        </div>
                    )}

                    {/* 情報量の目盛り */}
                    <div style={{
                        position: 'sticky', top: 0, zIndex: 6, background: PAPER,
                        borderBottom: `1px solid ${RULE}`, padding: '16px 0 14px', margin: '26px 0 40px',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                                <span style={{ fontSize: '10.5px', letterSpacing: '2px', color: FAINT }}>情報量</span>
                                <span style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 700, color: g.level.color === '#D8D3C8' ? SUB : g.level.color }}>{g.level.label}</span>
                            </div>
                            <span style={{ fontSize: '11.5px', color: FAINT, letterSpacing: '0.5px' }}>
                                {filled} / {ALL_Q.length} 問 ・ {chars} 字{savedAt && ` ・ ${savedAt} 保存`}
                            </span>
                        </div>
                        <div style={{ position: 'relative', height: '3px', background: '#EFEBE1' }}>
                            <div style={{ width: `${g.pct}%`, height: '100%', background: g.level.color, transition: 'width .45s cubic-bezier(.2,.7,.3,1), background .3s ease' }} />
                            {STOPS.slice(1).map(s => (
                                <span key={s.label} style={{ position: 'absolute', left: `${s.pct}%`, top: '-3px', width: '1px', height: '9px', background: RULE }} />
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                            {STOPS.map(s => (
                                <span key={s.label} style={{ fontSize: '10px', letterSpacing: '1px', color: s.label === g.level.label ? INK : '#C6BFB2' }}>{s.label}</span>
                            ))}
                        </div>
                        {!isMobile && <div style={{ fontSize: '11.5px', color: FAINT, marginTop: '9px' }}>{g.level.note}</div>}
                    </div>

                    {SECTIONS.map(s => (
                        <div key={s.key} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '150px 1fr', gap: isMobile ? '18px' : '44px', paddingTop: isMobile ? '30px' : '44px', paddingBottom: isMobile ? '6px' : '16px', borderTop: `1px solid ${RULE}` }}>
                            <div style={{ position: isMobile ? 'static' : 'sticky', top: '110px', alignSelf: 'start' }}>
                                <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '20px' : '30px', fontWeight: 400, color: GOLD, letterSpacing: '2px', lineHeight: 1 }}>{s.no}</div>
                                <div style={{ fontFamily: SERIF, fontSize: isMobile ? '19px' : '20px', fontWeight: 700, marginTop: '10px', lineHeight: 1.5 }}>{s.title}</div>
                                <div style={{ fontSize: '10px', letterSpacing: '2px', color: FAINT, marginTop: '7px', textTransform: 'uppercase' }}>{s.en}</div>
                                <div style={{ fontSize: '12.5px', color: SUB, lineHeight: 1.95, marginTop: '12px' }}>{s.lead}</div>
                            </div>

                            <div>
                                {s.questions.map(q => {
                                    const val = answers[q.id] || '';
                                    const done = val.trim().length > 0;
                                    const num = ALL_Q.findIndex(a => a.id === q.id) + 1;
                                    return (
                                        <div key={q.id} style={{ marginBottom: '30px' }}>
                                            <label htmlFor={q.id} style={{ display: 'flex', gap: '11px', alignItems: 'baseline', fontSize: '15px', fontWeight: 700, color: INK, marginBottom: '7px', lineHeight: 1.75 }}>
                                                <span style={{ fontFamily: 'Georgia, serif', fontSize: '12px', color: done ? GOLD : FAINT, letterSpacing: '1px', minWidth: '22px' }}>
                                                    {String(num).padStart(2, '0')}
                                                </span>
                                                <span>{q.label}</span>
                                            </label>
                                            <div style={{ fontSize: '12.5px', color: FAINT, lineHeight: 1.9, marginBottom: '10px', paddingLeft: isMobile ? '0' : '33px' }}>{q.hint}</div>
                                            <div style={{ paddingLeft: isMobile ? '0' : '33px' }}>
                                                <textarea
                                                    id={q.id}
                                                    rows={q.rows}
                                                    value={val}
                                                    onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                                                    className={`ca-field${done ? ' done' : ''}`}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* 返し先 */}
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '150px 1fr', gap: isMobile ? '18px' : '44px', paddingTop: isMobile ? '30px' : '44px', borderTop: `1px solid ${RULE}` }}>
                        <div>
                            <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '20px' : '30px', fontWeight: 400, color: GOLD, letterSpacing: '2px', lineHeight: 1 }}>V</div>
                            <div style={{ fontFamily: SERIF, fontSize: isMobile ? '19px' : '20px', fontWeight: 700, marginTop: '10px' }}>返し先</div>
                            <div style={{ fontSize: '10px', letterSpacing: '2px', color: FAINT, marginTop: '7px' }}>WHERE TO SEND</div>
                        </div>
                        <div>
                            <p style={{ fontSize: '13px', color: SUB, lineHeight: 1.95, margin: '0 0 20px' }}>
                                答えを返すためだけに使う。他には使わないし、他所には出さない。本名でなくていい。
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '18px' }}>
                                <div>
                                    <label htmlFor="c-name" style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '8px', letterSpacing: '1px' }}>呼び名</label>
                                    <input id="c-name" className={`ca-field${name.trim() ? ' done' : ''}`} value={name} onChange={e => setName(e.target.value)} placeholder="ハンドルネームでいい" />
                                </div>
                                <div>
                                    <label htmlFor="c-contact" style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, marginBottom: '8px', letterSpacing: '1px' }}>連絡先</label>
                                    <input id="c-contact" className={`ca-field${contact.trim() ? ' done' : ''}`} value={contact} onChange={e => setContact(e.target.value)} placeholder="メール、X、note のどれか" />
                                </div>
                            </div>

                            {error && (
                                <div style={{ background: '#FDF2F0', border: '1px solid #E7C4BD', color: '#8C3A2B', padding: '14px 16px', fontSize: '13.5px', lineHeight: 1.85, marginTop: '22px' }}>{error}</div>
                            )}

                            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', marginTop: '28px' }}>
                                <button className="ca-btn" onClick={submit} disabled={sending}
                                    style={{ background: sending ? FAINT : INK, color: PAPER, padding: isMobile ? '16px 34px' : '17px 52px', fontSize: '14.5px', fontWeight: 700, letterSpacing: '2px' }}>
                                    {sending ? '送信中' : '送る'}
                                </button>
                                <button className="ca-btn" onClick={copy}
                                    style={{ background: PAPER2, border: `1px solid ${RULE}`, color: INK, padding: '15px 24px', fontSize: '13.5px', fontWeight: 700 }}>
                                    {copied ? 'コピーした' : '答えをコピー'}
                                </button>
                            </div>
                            <p style={{ fontSize: '12px', color: FAINT, lineHeight: 1.9, marginTop: '16px' }}>
                                送信がうまくいかないときは、コピーして note か X で直接送ってくれても届く。
                                書きかけはこの端末に自動で残るので、閉じても消えない。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== FAQ ========== */}
            <section>
                <div style={{ ...wrap, paddingTop: isMobile ? '46px' : '80px', paddingBottom: isMobile ? '56px' : '90px' }}>
                    <div style={{ fontSize: '10.5px', letterSpacing: '3px', color: DEEPGOLD, fontWeight: 700, marginBottom: '12px' }}>FAQ</div>
                    <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? '25px' : '34px', fontWeight: 700, margin: '0 0 30px', lineHeight: 1.5 }}>よくある疑問</h2>
                    {[
                        { q: 'お金はかかるの', a: '取らない。どこまで本気で返せるのか、自分を本気で試そうと思う。取ることにしたら、このページに先に書く。黙って取ることはしない。' },
                        { q: '結局、教材を買わされるのでは', a: '自分の作ったものが合うなら、そう書く。合わないなら書かない。市販の本のほうがいいなら、その本の名前を書く。何も買わなくていい人には、買うな、と書く。' },
                        { q: '質問15個は多い', a: '多い。自分でも思う。ただ、情報が少ないと、返せる答えもAIに質問して出てくる、よくある無難な回答と同じになる。それならやる意味がない。詳しく濃く書いてくれると嬉しい。' },
                        { q: 'どのくらいで返ってくるの', a: '内容による。長いやつは数日かかる。急ぎの期限があるなら 02 に日付を書いてくれ。そこから逆算する。' },
                        { q: '三日坊主なんだけど', a: '三日坊主でいい。4日目にまた始めればいい。連続日数が途切れたら終わり、みたいな設計にはしない。むしろ折れる前提で組む。' },
                        { q: '試験じゃなくて仕事の英語なんだけど', a: 'いい。会議、メール、雑談、赴任、面接、子どもの英語。分野が違うだけで、やることは同じ。何がしたいかを決めて、順番をつけて、1日にねじ込む。' },
                        { q: '書いた内容は公開される', a: 'しない。事例として書きたくなったら、その都度こっちから聞く。断っていい。断っても返す答えは変わらない。' },
                    ].map((f, i) => (
                        <div key={f.q} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '40px 1fr', gap: isMobile ? '8px' : '20px', padding: '22px 0', borderTop: `1px solid ${RULE}` }}>
                            <div style={{ fontFamily: 'Georgia, serif', fontSize: '12px', color: FAINT, letterSpacing: '1px', paddingTop: '3px' }}>{String(i + 1).padStart(2, '0')}</div>
                            <div>
                                <div style={{ fontFamily: SERIF, fontSize: '17px', fontWeight: 700, color: INK, marginBottom: '11px', lineHeight: 1.6 }}>{f.q}</div>
                                <div style={{ fontSize: '14px', color: SUB, lineHeight: 2.1 }}>{f.a}</div>
                            </div>
                        </div>
                    ))}

                    <div style={{ borderTop: `1px solid ${RULE}`, marginTop: '20px', paddingTop: isMobile ? '44px' : '64px' }}>
                        <div style={{ fontSize: '10.5px', letterSpacing: '3px', color: DEEPGOLD, fontWeight: 700, marginBottom: '12px' }}>ONE AT A TIME</div>
                        <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? '25px' : '32px', fontWeight: 700, margin: '0 0 18px', lineHeight: 1.5 }}>一人ずつ</h2>
                        <p style={{ fontSize: '15px', color: SUB, lineHeight: 2.2, margin: '0 0 46px', maxWidth: '620px' }}>
                            いきなり何人にも対応できない。<strong style={{ color: INK, fontWeight: 700 }}>まず一人に、めちゃくちゃちゃんと返す。</strong>
                            それができないなら、回答はどこかで見たことのある文章になる。それは誰の役にも立たない。
                            答えてくれる人が5人なら、その5人と全力で向き合う。
                        </p>

                        <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? '30px' : '44px', fontWeight: 700, margin: '0 0 20px', lineHeight: 1.45 }}>待ってます</h2>
                        <p style={{ fontSize: '15px', color: SUB, lineHeight: 2.2, margin: '0 0 30px', maxWidth: '600px' }}>
                            試験でも、仕事でも、旅行でも、子どもの英語でも、なんとなく、なにか悔しい、変えたいでも、なんでもいい。
                        </p>
                        <a href="#form" style={{ textDecoration: 'none' }}>
                            <span style={{ display: 'inline-block', background: INK, color: PAPER, padding: isMobile ? '17px 34px' : '20px 52px', fontSize: '15px', fontWeight: 700, letterSpacing: '2px' }}>
                                全身全霊で回答します
                            </span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

/** スクロールで現れる。観測できないときは演出ごと降ろして、本文をそのまま出す */
function Reveal() {
    useEffect(() => {
        const root = document.documentElement;
        const els = Array.from(document.querySelectorAll('.rv'));
        if (!els.length) return;
        const showAll = () => els.forEach(e => e.classList.add('on'));
        if (!('IntersectionObserver' in window)) return;

        root.classList.add('rv-armed');
        const io = new IntersectionObserver(entries => {
            entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('on'); io.unobserve(en.target); } });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
        els.forEach(e => io.observe(e));

        // 画面が非表示のタブなどでは交差が一度も報告されないことがある。
        // その場合に本文が消えたままになるので、少し待って何も出ていなければ全部出す
        const t = setTimeout(() => { if (!document.querySelector('.rv.on')) showAll(); }, 900);
        return () => { clearTimeout(t); io.disconnect(); root.classList.remove('rv-armed'); };
    }, []);
    return null;
}
