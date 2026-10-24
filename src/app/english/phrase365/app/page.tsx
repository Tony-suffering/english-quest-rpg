'use client';

/**
 * フレーズ貯金 MVP -- 既存トレーニングシステムのシンプル化版。
 *
 * 本家 (/english/training) は XP/SPARK/FORGE/GP/レベル/TIME ATTACK まで積んだ
 * 個人用フル装備。これはそこから「貯金ループ」だけを抜き出した一般向けの皮:
 *
 *   1. きょう  -- 復習キュー(期限が来たカード) + 今日の3個(おまかせ便)
 *   2. ついか  -- 自分のフレーズを入れる
 *   3. しさん  -- 総資産 / 連続日数 / 節目 / 積み立てカレンダー / 正式版の案内
 *
 * コンセプト: 1日3フレーズを「しっかり」。量で圧倒しない。
 *  - 初回にレベル(5段階)を選ぶ。おまかせ便はそのレベルから届く
 *  - 節目 (7日/2週間/1ヶ月/3ヶ月/1年) を続ける動機として明示する。
 *    節目は連続日数ではなく積み立て日数で数える (休んでも残高は減らない、の思想)
 *
 * MVP の割り切り:
 *  - 保存は localStorage のみ (アカウント無し、この端末だけ)。
 *    多人数化するときは /craftsman で使っている Supabase auth に乗せる。
 *  - 課金は Stripe Payment Link 方式。PAYMENT_LINK にURLを貼るだけで
 *    「正式版」ボタンが生える。空の間は先行案内だけ出す。
 *    手順: claudedocs/phrase365-mvp.md
 */

import { useEffect, useMemo, useState } from 'react';
import { PHRASE365_FEED, PHRASE365_LEVELS, type FeedLevel } from '@/data/english/phrase365-feed';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const DEEPGREEN = '#047857';
const INK = '#1C1917';
const SUB = '#57534E';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';
const RED = '#DC2626';

/** Stripe Payment Link。作成したらここに貼る (それだけで課金ボタンが出る) */
const PAYMENT_LINK = '';

const STORE_KEY = 'p365_items_v1';
const LOG_KEY = 'p365_log_v1';
const LEVEL_KEY = 'p365_level_v1';

/** 復習間隔 (日)。「言えた」でひとつ先へ、「まだ」で最初に戻る */
const INTERVALS = [1, 3, 7, 14, 30, 90, 180, 365];

/**
 * 節目 = 続ける動機。連続日数ではなく「積み立てた日数」で数える。
 * (1日サボると全部消える方式は、貯金のコンセプトと矛盾するのでやらない)
 */
const MILESTONES: { d: number; t: string; msg: string }[] = [
    { d: 7, t: '7日', msg: '最初の一週間。初日に入れた3個が、今日「言えた」に変わる頃。' },
    { d: 14, t: '2週間', msg: '飽きが来る時期を越えた。忘れた頃のカードが戻ってくる、最初の山場。' },
    { d: 30, t: '1ヶ月', msg: '資産はおよそ90個。絵本1冊ぶんの言葉が、もう口の中にある。' },
    { d: 90, t: '3ヶ月', msg: 'およそ270個。日常の返事は、だいたい財産の中から出せる。' },
    { d: 365, t: '1年', msg: '1,095個。今日、いちばん最初の3個と再会する。' },
];

interface Item {
    id: string;
    en: string;
    jp: string;
    note?: string;
    source: 'feed' | 'mine';
    addedAt: string;      // yyyy-mm-dd
    due: string;          // yyyy-mm-dd
    step: number;         // INTERVALS の添字
}

type DayLog = { r: number; a: number }; // reviewed / added

function todayStr(offsetDays = 0): string {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function addDays(base: string, days: number): string {
    const d = new Date(base + 'T00:00:00');
    d.setDate(d.getDate() + days);
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** 今日の3個。選んだレベルの中から日替わりで決定的に選ぶ (同じ日・同じレベルなら誰でも同じ3個) */
function todaysFeed(level: FeedLevel): { en: string; jp: string; note: string; key: string }[] {
    const pool = PHRASE365_FEED
        .map((it, i) => ({ ...it, key: `feed:${i}` }))
        .filter(it => it.level === level);
    const day = Math.floor(Date.now() / 86400000);
    const out: typeof pool = [];
    for (let i = 0; out.length < 3 && i < pool.length; i++) {
        const item = pool[(day * 3 + i * 7) % pool.length];
        if (!out.some(o => o.key === item.key)) out.push(item);
    }
    return out;
}

/** 発音を読み上げる。音読派のターゲットに合わせて必須機能扱い */
function speak(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
}

function load<T>(key: string, fallback: T): T {
    try {
        const s = localStorage.getItem(key);
        return s ? JSON.parse(s) : fallback;
    } catch { return fallback; }
}
function save(key: string, v: unknown) {
    try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* noop */ }
}

/* ================================================================ */

export default function Phrase365App() {
    const [items, setItems] = useState<Item[]>([]);
    const [log, setLog] = useState<Record<string, DayLog>>({});
    const [tab, setTab] = useState<'today' | 'add' | 'asset'>('today');
    const [revealed, setRevealed] = useState(false);
    const [ready, setReady] = useState(false);
    /** おまかせ便のレベル。null = 未選択 (初回のレベル選び画面を出す) */
    const [level, setLevel] = useState<FeedLevel | null>(null);
    // 追加フォーム
    const [fEn, setFEn] = useState('');
    const [fJp, setFJp] = useState('');
    const [fNote, setFNote] = useState('');
    const [flash, setFlash] = useState('');

    useEffect(() => {
        setItems(load<Item[]>(STORE_KEY, []));
        setLog(load<Record<string, DayLog>>(LOG_KEY, {}));
        setLevel(load<FeedLevel | null>(LEVEL_KEY, null));
        setReady(true);
    }, []);

    const chooseLevel = (n: FeedLevel) => { setLevel(n); save(LEVEL_KEY, n); };

    const today = todayStr();

    const mutateItems = (next: Item[]) => { setItems(next); save(STORE_KEY, next); };
    const bumpLog = (field: 'r' | 'a') => {
        const next = { ...log, [today]: { r: 0, a: 0, ...log[today], [field]: ((log[today]?.[field]) || 0) + 1 } };
        setLog(next); save(LOG_KEY, next);
    };

    const queue = useMemo(
        () => items.filter(it => it.due <= today).sort((a, b) => a.due.localeCompare(b.due)),
        [items, today],
    );
    const card = queue[0];

    const feed = useMemo(() => (level ? todaysFeed(level) : []), [level]);
    const feedLeft = feed.filter(f => !items.some(it => it.source === 'feed' && it.en === f.en));

    const answer = (ok: boolean) => {
        if (!card) return;
        const step = ok ? Math.min(card.step + 1, INTERVALS.length - 1) : 0;
        mutateItems(items.map(it => it.id === card.id
            ? { ...it, step, due: addDays(today, INTERVALS[step]) }
            : it));
        bumpLog('r');
        setRevealed(false);
    };

    const addItem = (en: string, jp: string, note: string, source: Item['source']) => {
        const it: Item = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            en: en.trim(), jp: jp.trim(), note: note.trim() || undefined,
            source, addedAt: today, due: addDays(today, 1), step: 0,
        };
        mutateItems([...items, it]);
        bumpLog('a');
    };

    const submitForm = () => {
        if (!fEn.trim() || !fJp.trim()) { setFlash('英語と日本語の両方を入れてください'); return; }
        addItem(fEn, fJp, fNote, 'mine');
        setFEn(''); setFJp(''); setFNote('');
        setFlash('財産に入れました');
        setTimeout(() => setFlash(''), 1800);
    };

    // 連続日数: 今日または昨日から遡って、r+a>0 の日が続く限り数える
    const streak = useMemo(() => {
        let d = log[today] ? today : todayStr(-1);
        if (!log[d]) return 0;
        let n = 0;
        while (log[d] && ((log[d].r || 0) + (log[d].a || 0)) > 0) { n++; d = addDays(d, -1); }
        return n;
    }, [log, today]);

    const addedToday = log[today]?.a || 0;

    /** 積み立て日数 (何かした日の合計)。節目はこれで数える */
    const activeDays = useMemo(
        () => Object.values(log).filter(d => ((d.r || 0) + (d.a || 0)) > 0).length,
        [log],
    );
    const todayMilestone = MILESTONES.find(m => m.d === activeDays);
    const nextMilestone = MILESTONES.find(m => m.d > activeDays);

    if (!ready) return <div style={{ minHeight: '100vh', background: '#FAFAF9' }} />;

    /* ---------------- 初回: レベル選び ---------------- */
    if (level == null) {
        return (
            <div style={{ minHeight: '100vh', background: '#EFEDE8', fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif' }}>
                <div style={{ maxWidth: '480px', margin: '0 auto', minHeight: '100vh', background: '#FAFAF9', padding: '28px 18px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 900, letterSpacing: '1px', color: INK, marginBottom: '22px' }}>
                        フレーズ<span style={{ color: DEEPGOLD }}>貯金</span>
                    </div>
                    <h1 style={{ margin: '0 0 8px', fontSize: '21px', fontWeight: 900, color: INK, lineHeight: 1.5 }}>
                        いまの自分に、いちばん近いのは?
                    </h1>
                    <p style={{ margin: '0 0 20px', fontSize: '12.5px', lineHeight: 1.9, color: SUB }}>
                        毎日届く「今日の3個」がこのレベルから選ばれます。あとで「しさん」からいつでも変えられます。
                    </p>
                    {PHRASE365_LEVELS.map(lv => (
                        <button key={lv.level} onClick={() => chooseLevel(lv.level)} style={{
                            display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer',
                            background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px',
                            padding: '15px 17px', marginBottom: '10px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '9px' }}>
                                <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: GOLD, borderRadius: '5px', padding: '2px 7px' }}>Lv{lv.level}</span>
                                <span style={{ fontSize: '15px', fontWeight: 800, color: INK }}>{lv.name}</span>
                            </div>
                            <div style={{ fontSize: '12px', color: SUB, marginTop: '5px', lineHeight: 1.7 }}>{lv.desc}</div>
                            <div style={{ fontSize: '12px', marginTop: '6px' }}>
                                <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, color: DEEPGREEN }}>{lv.sampleEn}</span>
                                <span style={{ color: FAINT, marginLeft: '8px' }}>{lv.sampleJp}</span>
                            </div>
                        </button>
                    ))}
                    <p style={{ marginTop: '14px', fontSize: '11px', color: FAINT, textAlign: 'center' }}>
                        迷ったら Lv2。すぐ変えられるので、軽く選んで大丈夫です。
                    </p>
                </div>
            </div>
        );
    }

    /* ---------------- UI ---------------- */

    const TabBtn = ({ id, label, badge }: { id: typeof tab; label: string; badge?: number }) => (
        <button onClick={() => { setTab(id); setRevealed(false); }} style={{
            flex: 1, padding: '13px 0', border: 'none', cursor: 'pointer', position: 'relative',
            background: 'transparent', fontSize: '13px', fontWeight: 800, letterSpacing: '1px',
            color: tab === id ? INK : FAINT,
            borderBottom: tab === id ? `3px solid ${GOLD}` : '3px solid transparent',
        }}>
            {label}
            {badge != null && badge > 0 && (
                <span style={{ position: 'absolute', top: '6px', marginLeft: '4px', background: RED, color: '#fff', borderRadius: '99px', fontSize: '10px', fontWeight: 800, padding: '1px 6px' }}>{badge}</span>
            )}
        </button>
    );

    return (
        <div style={{ minHeight: '100vh', background: '#EFEDE8', fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif' }}>
            <div style={{ maxWidth: '480px', margin: '0 auto', minHeight: '100vh', background: '#FAFAF9', display: 'flex', flexDirection: 'column' }}>

                {/* ヘッダー */}
                <header style={{ padding: '16px 18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '16px', fontWeight: 900, letterSpacing: '1px', color: INK }}>
                        フレーズ<span style={{ color: DEEPGOLD }}>貯金</span>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: FAINT, marginLeft: '7px', letterSpacing: '2px' }}>MVP</span>
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: SUB }}>
                        総資産 <b style={{ color: DEEPGOLD, fontSize: '15px' }}>{items.length}</b>
                        <span style={{ marginLeft: '10px' }}>連続 <b style={{ color: DEEPGREEN, fontSize: '15px' }}>{streak}</b>日</span>
                    </span>
                </header>

                {/* タブ */}
                <nav style={{ display: 'flex', borderBottom: `1px solid ${LINE}`, marginTop: '10px' }}>
                    <TabBtn id="today" label="きょう" badge={queue.length} />
                    <TabBtn id="add" label="ついか" />
                    <TabBtn id="asset" label="しさん" />
                </nav>

                <main style={{ flex: 1, padding: '18px' }}>

                    {/* ========== きょう ========== */}
                    {tab === 'today' && (
                        <div>
                            {/* 節目の日はまずお祝い */}
                            {todayMilestone && (
                                <div style={{ background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)', border: `1.5px solid ${GOLD}`, borderRadius: '16px', padding: '16px 18px', marginBottom: '14px' }}>
                                    <div style={{ fontSize: '11px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '2px', marginBottom: '5px' }}>節目 ・ 積み立て{todayMilestone.t}</div>
                                    <div style={{ fontSize: '13px', lineHeight: 1.85, color: INK, fontWeight: 700 }}>{todayMilestone.msg}</div>
                                </div>
                            )}
                            {card ? (
                                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '18px', padding: '26px 22px', boxShadow: '0 8px 30px rgba(28,25,23,0.06)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px' }}>
                                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#fff', background: GREEN, borderRadius: '5px', padding: '3px 9px', letterSpacing: '1px' }}>ふくしゅう</span>
                                        <span style={{ fontSize: '11px', color: FAINT, fontWeight: 700 }}>のこり {queue.length}</span>
                                    </div>
                                    <div style={{ fontSize: '12px', color: FAINT, fontWeight: 700, marginBottom: '6px' }}>英語で言うと?</div>
                                    <div style={{ fontSize: '19px', fontWeight: 800, color: INK, lineHeight: 1.6, marginBottom: '18px' }}>{card.jp}</div>
                                    {revealed ? (
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', borderTop: `1px dashed ${LINE}`, paddingTop: '16px' }}>
                                                <div style={{ flex: 1, fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 700, color: DEEPGREEN, lineHeight: 1.5 }}>{card.en}</div>
                                                <button onClick={() => speak(card.en)} style={{ flexShrink: 0, border: `1px solid ${LINE}`, background: '#fff', color: SUB, borderRadius: '99px', padding: '6px 13px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>音声</button>
                                            </div>
                                            {card.note && <div style={{ fontSize: '12px', lineHeight: 1.85, color: SUB, marginTop: '10px' }}>{card.note}</div>}
                                            <div style={{ display: 'flex', gap: '9px', marginTop: '20px' }}>
                                                <button onClick={() => answer(true)} style={{ flex: 1, padding: '13px 0', borderRadius: '12px', border: 'none', background: GREEN, color: '#fff', fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}>言えた</button>
                                                <button onClick={() => answer(false)} style={{ flex: 1, padding: '13px 0', borderRadius: '12px', border: `1px solid ${LINE}`, background: '#fff', color: SUB, fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}>まだ</button>
                                            </div>
                                            <div style={{ marginTop: '10px', fontSize: '10.5px', color: FAINT, textAlign: 'center' }}>
                                                言えた → {INTERVALS[Math.min(card.step + 1, INTERVALS.length - 1)]}日後 / まだ → 明日もう一回
                                            </div>
                                        </div>
                                    ) : (
                                        <button onClick={() => setRevealed(true)} style={{ width: '100%', padding: '14px 0', borderRadius: '12px', border: 'none', background: INK, color: GOLD, fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}>
                                            答えを見る
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div style={{ background: '#ECFDF5', border: `1px solid ${GREEN}55`, borderRadius: '16px', padding: '18px 20px', fontSize: '13.5px', fontWeight: 700, color: DEEPGREEN, textAlign: 'center' }}>
                                    今日の復習はぜんぶ終わり。えらい。
                                </div>
                            )}

                            {/* 今日の3個 */}
                            <div style={{ marginTop: '26px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 900, color: INK, letterSpacing: '0.5px' }}>
                                        今日の3個 (おまかせ便)
                                        <span style={{ fontSize: '10px', fontWeight: 800, color: DEEPGOLD, marginLeft: '7px' }}>Lv{level} {PHRASE365_LEVELS.find(l => l.level === level)?.name}</span>
                                    </span>
                                    <span style={{ fontSize: '10.5px', color: FAINT }}>気に入ったものだけ財産へ</span>
                                </div>
                                {feedLeft.length === 0 ? (
                                    <div style={{ fontSize: '12px', color: FAINT, textAlign: 'center', padding: '14px 0' }}>今日のぶんは受け取り済み。また明日。</div>
                                ) : feedLeft.map(f => (
                                    <div key={f.key} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '14px 16px', marginBottom: '9px' }}>
                                        <div style={{ fontFamily: 'Georgia, serif', fontSize: '14.5px', fontWeight: 700, color: INK, lineHeight: 1.5 }}>{f.en}</div>
                                        <div style={{ fontSize: '12.5px', color: SUB, marginTop: '3px', fontWeight: 600 }}>{f.jp}</div>
                                        <div style={{ fontSize: '11.5px', color: FAINT, lineHeight: 1.7, marginTop: '6px' }}>{f.note}</div>
                                        <div style={{ display: 'flex', gap: '8px', marginTop: '10px', alignItems: 'center' }}>
                                            <button onClick={() => addItem(f.en, f.jp, f.note, 'feed')} style={{ border: 'none', background: '#FEF9E7', color: DEEPGOLD, borderRadius: '9px', padding: '7px 14px', fontSize: '12px', fontWeight: 800, cursor: 'pointer', outline: `1px solid ${GOLD}55` }}>
                                                財産に入れる
                                            </button>
                                            <button onClick={() => speak(f.en)} style={{ border: `1px solid ${LINE}`, background: '#fff', color: SUB, borderRadius: '99px', padding: '6px 13px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>音声</button>
                                            <span style={{ fontSize: '10.5px', color: FAINT }}>明日から復習に出ます</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ========== ついか ========== */}
                    {tab === 'add' && (
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '4px' }}>自分のフレーズを入れる</div>
                            <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.8, marginBottom: '16px' }}>
                                今日言えなかった一言、ドラマで拾った一言。1日3個をしっかり、が目安。
                                <b style={{ color: addedToday >= 3 ? DEEPGREEN : DEEPGOLD }}> 今日 {addedToday}/3</b>
                            </div>
                            {[
                                { v: fEn, set: setFEn, ph: '英語 (例: We don\'t have all day.)' },
                                { v: fJp, set: setFJp, ph: '日本語 (例: いつまでかかってんだ)' },
                                { v: fNote, set: setFNote, ph: 'メモ・使う場面 (任意)' },
                            ].map((f, i) => (
                                <input key={i} value={f.v} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                                    style={{ width: '100%', boxSizing: 'border-box', padding: '13px 14px', marginBottom: '10px', borderRadius: '12px', border: `1px solid ${LINE}`, background: '#fff', fontSize: '14px', color: INK, outline: 'none' }} />
                            ))}
                            <button onClick={submitForm} style={{ width: '100%', padding: '14px 0', borderRadius: '12px', border: 'none', background: INK, color: GOLD, fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}>
                                財産に入れる
                            </button>
                            {flash && <div style={{ marginTop: '10px', fontSize: '12.5px', fontWeight: 700, color: flash.includes('入れました') ? DEEPGREEN : RED, textAlign: 'center' }}>{flash}</div>}

                            {items.filter(i => i.source === 'mine').length > 0 && (
                                <div style={{ marginTop: '24px' }}>
                                    <div style={{ fontSize: '11px', fontWeight: 800, color: FAINT, letterSpacing: '1px', marginBottom: '8px' }}>じぶんの財産 (新しい順)</div>
                                    {items.filter(i => i.source === 'mine').slice(-8).reverse().map(i => (
                                        <div key={i.id} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px', padding: '10px 14px', marginBottom: '7px', fontSize: '13px' }}>
                                            <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, color: INK }}>{i.en}</span>
                                            <span style={{ color: FAINT, margin: '0 6px' }}>—</span>
                                            <span style={{ color: SUB }}>{i.jp}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ========== しさん ========== */}
                    {tab === 'asset' && (
                        <div>
                            <div className="p365-g" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '9px', marginBottom: '18px' }}>
                                {[
                                    ['総資産', String(items.length), 'フレーズ'],
                                    ['連続', String(streak), '日'],
                                    ['今日', String((log[today]?.r || 0) + (log[today]?.a || 0)), 'アクション'],
                                ].map(([a, b, c]) => (
                                    <div key={a} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '14px 6px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '10px', color: FAINT, fontWeight: 700 }}>{a}</div>
                                        <div style={{ fontSize: '24px', fontWeight: 900, color: DEEPGOLD }}>{b}</div>
                                        <div style={{ fontSize: '10px', color: FAINT }}>{c}</div>
                                    </div>
                                ))}
                            </div>

                            {/* 節目 = 続ける動機。積み立て日数で数える */}
                            <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', padding: '16px', marginBottom: '18px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                                    <span style={{ fontSize: '11px', fontWeight: 800, color: SUB, letterSpacing: '1px' }}>節目</span>
                                    <span style={{ fontSize: '10.5px', color: FAINT }}>積み立て {activeDays} 日目</span>
                                </div>
                                {MILESTONES.map(m => {
                                    const done = activeDays >= m.d;
                                    const isNext = nextMilestone?.d === m.d;
                                    return (
                                        <div key={m.d} style={{
                                            display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '8px 10px',
                                            borderRadius: '10px', marginBottom: '4px',
                                            background: isNext ? '#FFFBEB' : 'transparent',
                                            border: isNext ? `1px solid ${GOLD}55` : '1px solid transparent',
                                        }}>
                                            <span style={{
                                                flexShrink: 0, width: '44px', textAlign: 'center', fontSize: '11px', fontWeight: 900,
                                                borderRadius: '6px', padding: '3px 0',
                                                background: done ? GOLD : '#F5F5F4',
                                                color: done ? '#fff' : FAINT,
                                            }}>{m.t}</span>
                                            <span style={{ fontSize: '11.5px', lineHeight: 1.7, color: done ? INK : isNext ? SUB : FAINT }}>
                                                {m.msg}
                                                {isNext && <b style={{ color: DEEPGOLD, marginLeft: '6px' }}>あと{m.d - activeDays}日</b>}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* おまかせ便のレベル変更 */}
                            <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', padding: '16px', marginBottom: '18px' }}>
                                <div style={{ fontSize: '11px', fontWeight: 800, color: SUB, letterSpacing: '1px', marginBottom: '10px' }}>おまかせ便のレベル</div>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    {PHRASE365_LEVELS.map(lv => (
                                        <button key={lv.level} onClick={() => chooseLevel(lv.level)} title={lv.name} style={{
                                            flex: 1, padding: '9px 0', borderRadius: '10px', cursor: 'pointer',
                                            border: `1.5px solid ${level === lv.level ? GOLD : LINE}`,
                                            background: level === lv.level ? '#FEF9E7' : '#fff',
                                            color: level === lv.level ? DEEPGOLD : SUB,
                                            fontSize: '12px', fontWeight: 800,
                                        }}>Lv{lv.level}</button>
                                    ))}
                                </div>
                                <div style={{ marginTop: '8px', fontSize: '11px', color: FAINT }}>
                                    Lv{level} {PHRASE365_LEVELS.find(l => l.level === level)?.name} ・ {PHRASE365_LEVELS.find(l => l.level === level)?.desc}
                                </div>
                            </div>

                            {/* 積み立てカレンダー (直近28日) */}
                            <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', padding: '16px' }}>
                                <div style={{ fontSize: '11px', fontWeight: 800, color: SUB, letterSpacing: '1px', marginBottom: '10px' }}>直近28日の積み立て</div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
                                    {Array.from({ length: 28 }, (_, i) => {
                                        const d = todayStr(i - 27);
                                        const n = (log[d]?.r || 0) + (log[d]?.a || 0);
                                        return (
                                            <div key={d} title={`${d}: ${n}`} style={{
                                                aspectRatio: '1', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '10px', fontWeight: 800,
                                                background: n > 0 ? `rgba(212,175,55,${Math.min(0.15 + n * 0.06, 0.55)})` : '#FAFAF9',
                                                border: `1px solid ${n > 0 ? 'rgba(212,175,55,0.4)' : LINE}`,
                                                color: n > 0 ? DEEPGOLD : '#D6D3D1',
                                            }}>{n > 0 ? n : ''}</div>
                                        );
                                    })}
                                </div>
                                <div style={{ marginTop: '10px', fontSize: '10.5px', color: FAINT }}>休んでも残高は減りません。翌日戻れば続きから。</div>
                            </div>

                            {/* 正式版 / 課金 */}
                            <div style={{ marginTop: '18px', background: 'linear-gradient(135deg, #FFFBEB 0%, #ECFDF5 100%)', border: `1px solid ${LINE}`, borderRadius: '16px', padding: '18px 18px' }}>
                                <div style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '6px' }}>正式版について</div>
                                <div style={{ fontSize: '12px', lineHeight: 1.9, color: SUB }}>
                                    いまは試作版で、全部無料で使えます。データはこの端末の中だけに保存されます。
                                    正式版 (月980円予定) で、アカウント同期と「今日の3個」の毎日配信が付きます。
                                </div>
                                {PAYMENT_LINK ? (
                                    <a href={PAYMENT_LINK} style={{ display: 'block', marginTop: '12px', textAlign: 'center', padding: '12px 0', borderRadius: '11px', background: INK, color: GOLD, fontSize: '13px', fontWeight: 800, textDecoration: 'none' }}>
                                        正式版にする (月980円)
                                    </a>
                                ) : (
                                    <a href="mailto:sinnurawase@gmail.com?subject=%E3%83%95%E3%83%AC%E3%83%BC%E3%82%BA%E8%B2%AF%E9%87%91%20%E5%85%88%E8%A1%8C%E7%99%BB%E9%8C%B2" style={{ display: 'block', marginTop: '12px', textAlign: 'center', padding: '12px 0', borderRadius: '11px', background: '#fff', border: `1px solid ${LINE}`, color: INK, fontSize: '13px', fontWeight: 800, textDecoration: 'none' }}>
                                        正式版の先行案内を受け取る (無料)
                                    </a>
                                )}
                            </div>

                            <a href="/english/phrase365" style={{ display: 'block', marginTop: '16px', textAlign: 'center', fontSize: '11.5px', color: FAINT, textDecoration: 'none' }}>
                                このアプリの考え方を見る (LP)
                            </a>
                        </div>
                    )}
                </main>

                <footer style={{ padding: '12px 18px 20px', fontSize: '10px', color: FAINT, textAlign: 'center' }}>
                    フレーズ貯金 MVP ・ 1日3フレーズ、3分。英語をあなたの財産に。
                </footer>
            </div>
        </div>
    );
}
