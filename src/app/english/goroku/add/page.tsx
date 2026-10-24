'use client';

/**
 * 俺語録 登録 — チャットで作った語録を、会話語録(goroku_log)に積む窓口。
 *
 * 積む先は **新しい会話語録** であって、サイドバーの「英語筋トレ」が読んでいる
 * 既存の goroku テーブル(7本柱カリキュラム631件)ではない。混ぜない理由:
 * あちらは教材として設計された固定カリキュラムで、そこに毎日3-5件を足していくと、
 * 厳選したはずの新しい語録が古い631件に埋もれて二度と目に入らない。
 * (実際そうなっていて、本人が「俺全くみてない」と言った状態がそれ)
 *
 * これが無い間、毎回の会話の終わりに作った語録はチャットの中で死んでいた。
 * 「登録できる場所がサイドバーに無い」= ループが閉じていない、が唯一の原因なので、
 * ここは「貼る → 選ぶ → 押す」の3手だけに絞る。
 *
 * 厳選の担保 (本人指示「いみないの多いから」):
 *  - 直訳(literal)と英語が実質同じ・1語・14語超・登録済みは自動で選択を外す。
 *    語録の価値はギャップにしかない。ギャップの無い行はカードにする意味がない。
 *  - 仕様が名指しで禁じた 1:1 の相づち(うーん→hmm / ありがとう→thanks)は必ず弾く。
 * 判定はあくまで補助で、最終判断は人がチェックボックスで行う。
 *
 * 入力は chat が出す markdown テーブルをそのまま貼れる形にした。
 * 列は | 日本語 | パターン | English | カテゴリ | を基本とし、
 * 直訳・文脈の列があれば拾う。列が足りなければ後から各行で直せる。
 */

import { useEffect, useMemo, useState } from 'react';
import { CATEGORY_META, type GorokuCategory } from '@/data/english/ore-goroku';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const DEEPGREEN = '#047857';
const INK = '#1C1917';
const SUB = '#57534E';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';
const RED = '#DC2626';

/** カテゴリ判定のための手がかり。日本語のカテゴリ名でも英語キーでも拾う */
const CATEGORY_ALIASES: Record<string, GorokuCategory> = {
    リアクション: 'reaction', 反応: 'reaction', 感想: 'reaction', 驚き: 'reaction', 評価: 'reaction',
    お願い: 'request', 指示: 'request', 依頼: 'request', 要求: 'request',
    意見: 'opinion', 判断: 'opinion', 論破: 'opinion', 皮肉: 'opinion',
    ビジネス: 'opinion', 学習: 'opinion', 違和感: 'opinion', 勝利宣言: 'opinion',
    提案: 'suggestion', 質問: 'suggestion', 確認: 'suggestion', 作戦: 'suggestion',
    つなぎ: 'filler', 口癖: 'filler', 前置き: 'filler',
    終了: 'shutdown', 切り捨て: 'shutdown', 締め: 'shutdown',
    reaction: 'reaction', request: 'request', opinion: 'opinion',
    suggestion: 'suggestion', filler: 'filler', shutdown: 'shutdown',
};

interface Candidate {
    ja: string;
    english: string;
    literal: string;
    note: string;
    category: GorokuCategory;
    pattern: string;
    picked: boolean;
    warn: string | null;   // 厳選の判定結果。null なら合格
}

/** 会話語録の1件 (D1) */
interface LogRow {
    id: string;
    date: string;
    source: string;
    ja: string;
    pattern: string;
    english: string;
    note: string;
    seed?: boolean;        // TS種データ。DELETE できない
}

/** 語録テーブル(markdown)を行に割る。ヘッダ行と区切り行は落とす */
function parseTable(text: string): Omit<Candidate, 'picked' | 'warn'>[] {
    const out: Omit<Candidate, 'picked' | 'warn'>[] = [];
    for (const raw of text.split('\n')) {
        const line = raw.trim();
        if (!line.includes('|')) continue;
        if (/^\|?[\s:|-]+\|?$/.test(line)) continue;          // ---|---|--- の区切り
        const cells = line.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
        if (cells.length < 3) continue;
        if (/^(日本語|japanese)$/i.test(cells[0])) continue;   // ヘッダ

        // 英語らしい列 = ASCII 比率が高いセル。日本語列との取り違えを防ぐ
        const asciiRatio = (s: string) => s ? [...s].filter(c => c.charCodeAt(0) < 128).length / s.length : 0;
        const ja = cells[0];
        let english = '', pattern = '', category = '', literal = '', note = '';
        for (const c of cells.slice(1)) {
            if (!english && asciiRatio(c) > 0.6 && c.length > 2) { english = c; continue; }
            if (!pattern && /^\d+\s|パターン|積み|軌道|サンドイッチ|梯子|トラップ|マルチ|メタ|川|招待|爆弾/.test(c)) { pattern = c; continue; }
            if (!category && CATEGORY_ALIASES[c]) { category = c; continue; }
            if (!literal && asciiRatio(c) > 0.6) { literal = c; continue; }
            if (!note) note = c;
        }
        if (!english) continue;
        out.push({ ja, english, literal, note, category: CATEGORY_ALIASES[category] || 'opinion', pattern });
    }
    return out;
}

/**
 * 厳選判定。
 * 仕様が名指しした 1:1 (うーん→hmm / ありがとう→thanks) を最優先で弾く。
 */
const ONE_TO_ONE: Record<string, RegExp> = {
    'えっと': /^well/i, 'うんうん': /^uh-?huh/i, 'うーん': /^(hmm|umm?)/i,
    'ありがとう': /^thanks?/i, 'なるほど': /^i see/i, 'そうだね': /^(yeah|right)/i,
    'はい': /^yes/i, 'いいえ': /^no/i,
};

function judge(c: Omit<Candidate, 'picked' | 'warn'>, existingJa: Set<string>): string | null {
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const ja = c.ja.trim();
    if (!ja) return '日本語が空';
    if (existingJa.has(ja)) return '登録済み';
    for (const [k, re] of Object.entries(ONE_TO_ONE)) {
        if (ja === k && re.test(c.english.trim())) return '1:1の相づち (仕様が禁止)';
    }
    if (c.literal && norm(c.literal) === norm(c.english)) return '直訳=英語 (ギャップ無し)';
    const words = c.english.trim().split(/\s+/).filter(Boolean).length;
    if (words < 2) return '短すぎ (1語)';
    if (words > 14) return '長すぎ (14語超)';
    return null;
}

function todayStr(): string {
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export default function GorokuAddPage() {
    const [raw, setRaw] = useState('');
    const [cands, setCands] = useState<Candidate[]>([]);
    const [date, setDate] = useState(todayStr());
    const [source, setSource] = useState('');
    const [log, setLog] = useState<LogRow[]>([]);
    const [msg, setMsg] = useState('');
    const [busy, setBusy] = useState(false);

    const existingJa = useMemo(() => new Set(log.map(e => (e.ja || '').trim())), [log]);

    useEffect(() => {
        (async () => {
            try {
                const j = await (await fetch('/api/goroku-log')).json();
                setLog(j.entries || []);
            } catch { /* 読めなくても登録は通る */ }
        })();
    }, []);

    const parse = () => {
        const rows = parseTable(raw);
        if (rows.length === 0) {
            setMsg('表が読めなかった。| 日本語 | パターン | English | カテゴリ | の形で貼ってください');
            return;
        }
        const next = rows.map(r => {
            const warn = judge(r, existingJa);
            return { ...r, warn, picked: warn === null };
        });
        setCands(next);
        setMsg(`${rows.length}件を読み込み。厳選で ${next.filter(c => !c.warn).length}件を選択、${next.filter(c => c.warn).length}件を除外`);
    };

    const picked = cands.filter(c => c.picked);
    const setAt = (i: number, patch: Partial<Candidate>) =>
        setCands(cs => cs.map((c, j) => (j === i ? { ...c, ...patch } : c)));

    const register = async () => {
        if (picked.length === 0) return;
        setBusy(true);
        let ok = 0; const fails: string[] = [];
        for (const c of picked) {
            try {
                const r = await fetch('/api/goroku-log', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        date, source: source || 'チャット', ja: c.ja, pattern: c.pattern,
                        english: c.english, note: c.note || c.literal, category: c.category,
                    }),
                });
                const j = await r.json();
                if (j.success) { ok++; setLog(p => [j.entry as LogRow, ...p]); }
                else fails.push(`${c.ja}: ${j.error}`);
            } catch (e) { fails.push(`${c.ja}: ${String(e)}`); }
        }
        setBusy(false);
        setMsg(`${ok}件を登録${fails.length ? ` / 失敗 ${fails.length}件: ${fails[0]}` : ''}`);
        if (ok > 0) setCands(cs => cs.filter(c => !c.picked));
    };

    const removeLog = async (id: string) => {
        try {
            const r = await fetch('/api/goroku-log', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            if ((await r.json()).success) setLog(p => p.filter(e => e.id !== id));
        } catch { /* noop */ }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9', fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif', color: INK }}>
            <div style={{ maxWidth: '860px', margin: '0 auto', padding: '26px 20px 70px' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '10px' }}>
                    <h1 style={{ margin: 0, fontSize: '21px', fontWeight: 900, letterSpacing: '0.5px' }}>
                        俺語録 <span style={{ color: DEEPGOLD }}>登録</span>
                    </h1>
                    <a href="/english/goroku-log" style={{ fontSize: '12px', fontWeight: 700, color: SUB, textDecoration: 'none', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '7px 13px', background: '#fff' }}>
                        会話語録を見る ({log.length})
                    </a>
                </div>
                <p style={{ margin: '8px 0 18px', fontSize: '12.5px', lineHeight: 1.9, color: SUB }}>
                    会話の終わりに出てくる語録の表を、そのまま貼って登録する。積む先は
                    <b style={{ color: INK }}>会話語録</b>で、既存の「英語筋トレ」(7本柱カリキュラム631件)とは別の器です。
                    混ぜると新しい語録が古い631件に埋もれるので分けてあります。<br />
                    <b style={{ color: DEEPGOLD }}>1:1の相づち・ギャップ無し・1語・14語超・登録済みは自動で選択から外れます。</b>
                </p>

                {/* いつ・どの会話か */}
                <div style={{ display: 'flex', gap: '9px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)}
                        style={{ padding: '10px 12px', borderRadius: '10px', border: `1px solid ${LINE}`, fontSize: '13px', color: INK, background: '#fff' }} />
                    <input value={source} onChange={e => setSource(e.target.value)} placeholder="どの会話か (例: 猫被り実験・フレーズ貯金MVPの回)"
                        style={{ flex: 1, minWidth: '220px', padding: '10px 12px', borderRadius: '10px', border: `1px solid ${LINE}`, fontSize: '13px', color: INK, background: '#fff', outline: 'none' }} />
                </div>

                {/* 貼り付け */}
                <textarea
                    value={raw} onChange={e => setRaw(e.target.value)} rows={8}
                    placeholder={'| 日本語 | パターン | English | カテゴリ |\n|---|---|---|---|\n| どうでもいいよ | 1 レンガ積み | Whatever, man. | 切り捨て |'}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '13px 14px', borderRadius: '12px', border: `1px solid ${LINE}`, fontSize: '13px', lineHeight: 1.7, fontFamily: 'ui-monospace, Consolas, monospace', color: INK, background: '#fff', outline: 'none' }}
                />
                <div style={{ display: 'flex', gap: '9px', marginTop: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <button onClick={parse} style={{ padding: '11px 22px', borderRadius: '10px', border: 'none', background: INK, color: GOLD, fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}>
                        読み込む
                    </button>
                    {msg && <span style={{ fontSize: '12px', color: SUB }}>{msg}</span>}
                </div>

                {/* 候補 */}
                {cands.length > 0 && (
                    <div style={{ marginTop: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 900 }}>候補 {cands.length}件</span>
                            <span style={{ fontSize: '11px', color: FAINT }}>選択中 {picked.length}</span>
                        </div>

                        {cands.map((c, i) => (
                            <div key={i} style={{
                                background: '#fff', border: `1px solid ${c.picked ? GOLD : LINE}`, borderRadius: '13px',
                                padding: '13px 15px', marginBottom: '9px',
                                boxShadow: c.picked ? `0 0 0 1px ${GOLD}33` : 'none',
                            }}>
                                <div style={{ display: 'flex', gap: '11px', alignItems: 'flex-start' }}>
                                    <input type="checkbox" checked={c.picked} onChange={e => setAt(i, { picked: e.target.checked })}
                                        style={{ marginTop: '4px', width: '17px', height: '17px', accentColor: DEEPGOLD, flexShrink: 0, cursor: 'pointer' }} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '3px' }}>{c.ja}</div>
                                        <div style={{ fontFamily: 'Georgia, serif', fontSize: '14px', color: DEEPGREEN, fontWeight: 700 }}>{c.english}</div>
                                        <div style={{ display: 'flex', gap: '7px', marginTop: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                                            <select value={c.category} onChange={e => setAt(i, { category: e.target.value as GorokuCategory })}
                                                style={{ fontSize: '11px', fontWeight: 700, padding: '4px 7px', borderRadius: '7px', border: `1px solid ${LINE}`, background: '#FAFAF9', color: INK }}>
                                                {Object.entries(CATEGORY_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                                            </select>
                                            <input value={c.note} onChange={e => setAt(i, { note: e.target.value })} placeholder="なぜ効くか / 日本語との差"
                                                style={{ flex: 1, minWidth: '150px', fontSize: '11.5px', padding: '5px 9px', borderRadius: '7px', border: `1px solid ${LINE}`, background: '#FAFAF9', color: INK, outline: 'none' }} />
                                            {c.pattern && <span style={{ fontSize: '10px', fontWeight: 700, color: DEEPGOLD, background: '#FEF9E7', borderRadius: '5px', padding: '3px 7px', whiteSpace: 'nowrap' }}>{c.pattern}</span>}
                                        </div>
                                        {c.warn && (
                                            <div style={{ marginTop: '7px', fontSize: '11px', fontWeight: 700, color: RED, background: '#FEF2F2', border: `1px solid ${RED}33`, borderRadius: '7px', padding: '5px 9px' }}>
                                                厳選で除外: {c.warn}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button onClick={register} disabled={busy || picked.length === 0}
                            style={{
                                width: '100%', marginTop: '6px', padding: '14px 0', borderRadius: '11px', border: 'none',
                                background: busy || picked.length === 0 ? '#D6D3D1' : GREEN,
                                color: '#fff', fontSize: '14px', fontWeight: 800,
                                cursor: busy || picked.length === 0 ? 'not-allowed' : 'pointer',
                            }}>
                            {busy ? '登録中...' : `${picked.length}件を会話語録に登録`}
                        </button>
                    </div>
                )}

                {/* 積み上がっているもの */}
                {log.length > 0 && (
                    <div style={{ marginTop: '30px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: SUB, letterSpacing: '1px', marginBottom: '9px' }}>
                            会話語録 {log.length}件 (新しい順)
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            {log.slice(0, 30).map(e => (
                                <div key={e.id} style={{ display: 'flex', gap: '9px', alignItems: 'flex-start', background: '#fff', border: `1px solid ${LINE}`, borderRadius: '10px', padding: '9px 12px' }}>
                                    <span style={{ flex: 1, minWidth: 0 }}>
                                        <span style={{ fontSize: '12.5px', fontWeight: 700 }}>{e.ja}</span>
                                        <span style={{ fontSize: '11.5px', color: DEEPGREEN, marginLeft: '9px', fontFamily: 'Georgia, serif' }}>{e.english}</span>
                                        <span style={{ display: 'block', fontSize: '10.5px', color: FAINT, marginTop: '2px' }}>{e.date} ・ {e.source || '—'}{e.pattern ? ` ・ ${e.pattern}` : ''}</span>
                                    </span>
                                    {!e.seed && (
                                        <button onClick={() => removeLog(e.id)} title="削除"
                                            style={{ flexShrink: 0, border: `1px solid ${LINE}`, background: '#FAFAF9', color: FAINT, borderRadius: '7px', padding: '4px 9px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}>
                                            削除
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
