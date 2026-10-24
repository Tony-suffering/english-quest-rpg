'use client';

// 相談の受信箱 (自分用)
// /english/consult/inbox?key=XXX  -- CONSULT_ADMIN_KEY と一致したときだけ中身が出る
// 回答の骨組み (原因 / 最適解 / 仕組み / 継続) を相手の言葉ごと組み立ててコピーできる。
// 2人目からはこの骨組みを埋めるだけになる。ここが展開できる形の中身

import { useState, useEffect, useCallback } from 'react';

const GOLD = '#D4AF37';
const CREAM = '#FFFDF8';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E5E4';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';

// 質問票と同じ順番・同じ文言。ここがずれると回答の骨組みがずれる
const Q_LABELS: [string, string][] = [
    ['goal', '英語で何がしたいか'],
    ['deadline', '期限'],
    ['why', 'できたら何が変わるか'],
    ['scene', 'つまずいた一件'],
    ['level', 'いまの英語力'],
    ['doing', 'すでにやっていること'],
    ['quit', '過去にやめたもの'],
    ['trigger', '毎日かならずやってる行動'],
    ['minutes', '英語を入れられそうな隙間'],
    ['handsfree', '手が空いて目が塞がっている時間'],
    ['partner', '相手・直してくれる人'],
    ['budget', '月に使える金'],
    ['temperament', '飽き性か積み上げ型か'],
    ['watched', '見られると続くか'],
    ['killer', 'やる気が消える言葉'],
];

interface ConsultRow {
    id: string;
    created_at: string;
    name: string;
    contact: string;
    answers: Record<string, string>;
    char_count: number;
    status: string;
}

const KEY_STORAGE = 'consult_admin_key';

export default function ConsultInbox() {
    const [key, setKey] = useState('');
    const [rows, setRows] = useState<ConsultRow[] | null>(null);
    const [selected, setSelected] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState('');

    // 鍵は一度入れたら覚える。サイドバーから ?key= 無しで開いても、そのまま中身が出る
    useEffect(() => {
        const k = new URLSearchParams(window.location.search).get('key') || localStorage.getItem(KEY_STORAGE) || '';
        if (k) setKey(k);
    }, []);

    const load = useCallback(async (k: string) => {
        if (!k) return;
        setLoading(true); setError('');
        try {
            const res = await fetch(`/api/consult?key=${encodeURIComponent(k)}`);
            const json = await res.json();
            if (!res.ok || !json.success) throw new Error(json.error || '読み込めなかった');
            try { localStorage.setItem(KEY_STORAGE, k); } catch { /* 覚えられなくても読める */ }
            setRows(json.requests || []);
            if (json.requests?.length) setSelected(json.requests[0].id);
        } catch (e) {
            setError(String(e));
            setRows(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { if (key) load(key); }, [key, load]);

    const current = rows?.find(r => r.id === selected) || null;

    // 相手の言葉をそのまま引いた回答の骨組み。ここを埋めて返す
    const skeleton = (r: ConsultRow) => {
        const a = (id: string) => (r.answers[id] || '').trim() || '(未記入 -- 推測で埋める)';
        return [
            `${r.name} さんへ`,
            '',
            '## 0. 受け取った話の要約',
            `やりたいこと: ${a('goal')}`,
            `期限: ${a('deadline')}`,
            `つまずいた一件: ${a('scene')}`,
            '',
            '## 1. 英語で何がしたいか。英語に何を望むのか',
            `本人の言葉: ${a('goal')} / ${a('why')}`,
            '-> ここを言い直して確定させる。ここが違えばやることが全部変わる',
            '-> いまの位置: ' + a('level'),
            '',
            '## 2. 何をやって、何を捨てるか',
            `いまやっていること: ${a('doing')}`,
            `金: ${a('budget')} / 相手: ${a('partner')}`,
            '-> やること(順番つき)',
            '-> 捨てること。なぜ捨てていいのかまで書く。理由が納得できないと人は結局抱えたままにする',
            '',
            '## 3. 日々なにをするのか',
            `毎日かならずやってる行動: ${a('trigger')}`,
            `入れられそうな隙間: ${a('minutes')}`,
            `手が空いて目が塞がっている時間: ${a('handsfree')}`,
            '-> 時間をノルマにしない。1時間やれとも5分やれとも書かない',
            '-> 「(必ずやってる行動)の直後・直前・途中に(やること)」の形で書く',
            '',
            '## 4. 続かなくなったとき、どうするか',
            `過去にやめた理由: ${a('quit')}`,
            `性質: ${a('temperament')} / 見られると: ${a('watched')}`,
            `言ってはいけないこと: ${a('killer')}`,
            '-> 三日坊主でいい。4日目にどこから戻るかを先に書く',
            '-> 連続日数は使わない',
            '',
            '## 5. 最初の1週間',
            '-> Day1 から Day7 まで、日付入りで具体的に',
        ].join('\n');
    };

    const raw = (r: ConsultRow) =>
        [`呼び名: ${r.name}`, `連絡先: ${r.contact}`, `送信: ${r.created_at}`, '']
            .concat(Q_LABELS.flatMap(([id, label]) => [`Q. ${label}`, (r.answers[id] || '').trim() || '(未記入)', '']))
            .join('\n');

    const doCopy = async (text: string, tag: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(tag);
            setTimeout(() => setCopied(''), 2000);
        } catch { setError('コピーできなかった'); }
    };

    const wrap: React.CSSProperties = { maxWidth: '1100px', margin: '0 auto', padding: '0 24px' };

    return (
        <div style={{ background: CREAM, minHeight: '100vh', color: INK, fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif' }}>
            <div style={{ ...wrap, paddingTop: '46px', paddingBottom: '80px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#9A7B16', letterSpacing: '3px', marginBottom: '10px' }}>INBOX</div>
                <h1 style={{ fontFamily: SERIF, fontSize: '30px', fontWeight: 900, margin: '0 0 8px' }}>相談の受信箱</h1>
                <p style={{ fontSize: '13.5px', color: SUB, lineHeight: 1.9, margin: '0 0 24px' }}>
                    質問票に来たものを読んで、回答の骨組みを組む。骨組みは全員同じ5節。埋めるだけで返せる状態にしてある。
                </p>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '26px', flexWrap: 'wrap' }}>
                    <input value={key} onChange={e => setKey(e.target.value)} placeholder="CONSULT_ADMIN_KEY"
                        style={{ border: `1px solid ${LINE}`, borderRadius: '10px', padding: '11px 14px', fontSize: '14px', background: '#fff', color: INK, outline: 'none', minWidth: '260px', fontFamily: 'inherit' }} />
                    <button onClick={() => load(key)} disabled={loading}
                        style={{ background: GOLD, color: '#fff', border: 'none', borderRadius: '10px', padding: '12px 24px', fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}>
                        {loading ? '読み込み中' : '読み込む'}
                    </button>
                    {rows && <span style={{ fontSize: '13px', color: SUB }}>{rows.length} 件</span>}
                </div>

                {error && (
                    <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', borderRadius: '11px', padding: '13px 16px', fontSize: '13.5px', lineHeight: 1.8, marginBottom: '20px' }}>
                        {error}
                    </div>
                )}

                {rows && rows.length === 0 && (
                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '30px', fontSize: '14px', color: SUB, lineHeight: 1.9 }}>
                        まだ0件。質問票は <a href="/english/consult" style={{ color: '#9A7B16' }}>/english/consult</a>。
                    </div>
                )}

                {rows && rows.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px', alignItems: 'start' }}>
                        <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', overflow: 'hidden' }}>
                            {rows.map(r => (
                                <button key={r.id} onClick={() => setSelected(r.id)}
                                    style={{
                                        display: 'block', width: '100%', textAlign: 'left', border: 'none',
                                        borderBottom: `1px solid ${LINE}`, cursor: 'pointer', padding: '14px 16px',
                                        background: r.id === selected ? '#FEF9E7' : '#fff', fontFamily: 'inherit',
                                    }}>
                                    <div style={{ fontSize: '14px', fontWeight: 800, color: INK, marginBottom: '3px' }}>{r.name}</div>
                                    <div style={{ fontSize: '11.5px', color: SUB }}>{r.created_at.slice(0, 10)} ・ {r.char_count} 字</div>
                                </button>
                            ))}
                        </div>

                        {current && (
                            <div>
                                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '22px', marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
                                        <div>
                                            <div style={{ fontFamily: SERIF, fontSize: '21px', fontWeight: 900 }}>{current.name}</div>
                                            <div style={{ fontSize: '12.5px', color: SUB, marginTop: '4px' }}>{current.contact} ・ {current.char_count} 字</div>
                                        </div>
                                        <button onClick={() => doCopy(raw(current), 'raw')}
                                            style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '9px', padding: '9px 16px', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', color: INK }}>
                                            {copied === 'raw' ? 'コピーした' : '回答全文をコピー'}
                                        </button>
                                    </div>
                                    {Q_LABELS.map(([id, label]) => (
                                        <div key={id} style={{ borderTop: `1px solid ${LINE}`, padding: '12px 0' }}>
                                            <div style={{ fontSize: '12px', fontWeight: 800, color: '#9A7B16', marginBottom: '5px' }}>{label}</div>
                                            <div style={{ fontSize: '14px', lineHeight: 1.9, color: (current.answers[id] || '').trim() ? INK : '#C4C0BB', whiteSpace: 'pre-wrap' }}>
                                                {(current.answers[id] || '').trim() || '(未記入)'}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ background: '#fff', border: `1px solid ${GOLD}55`, borderRadius: '14px', padding: '22px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', gap: '12px', flexWrap: 'wrap' }}>
                                        <div style={{ fontFamily: SERIF, fontSize: '19px', fontWeight: 900 }}>回答の骨組み</div>
                                        <button onClick={() => doCopy(skeleton(current), 'skel')}
                                            style={{ background: GOLD, color: '#fff', border: 'none', borderRadius: '9px', padding: '10px 18px', fontSize: '12.5px', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                                            {copied === 'skel' ? 'コピーした' : '骨組みをコピー'}
                                        </button>
                                    </div>
                                    <pre style={{ fontSize: '13px', lineHeight: 1.95, color: INK, background: CREAM, border: `1px solid ${LINE}`, borderRadius: '11px', padding: '16px', margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                                        {skeleton(current)}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
