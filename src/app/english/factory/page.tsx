'use client';

/**
 * カード工場 — Anki のいちばん面倒な所を消す道具
 *
 * Anki は強い。ただし利用者が全員つまずくのがカード作りで、だから共有デッキを漁ることになる。
 * ここが埋まれば Anki は完成するが、Anki 自身はそれをやらない(中身に関与しない設計だから)。
 *
 * この道具は中身のほうを担当する。日本語を打つと、
 *   AIが実際に使われる英語を3つ出す -> 選ぶ -> 発音と実シーンのリンクが自動で付く -> Anki用に書き出す
 *
 * **サーバを使わない。** カードは端末の中、AIは利用者自身の鍵でブラウザから直接。
 * だから売り手に継続費用が発生せず、買い切りで成立する。
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    loadCards, saveCards, loadKey, saveKey, newId, suggest,
    toAnkiTsv, download, youglishUrl, playphraseUrl,
    type Card, type Suggestion,
} from '@/lib/english/factory/store';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const CREAM = '#FFFDF8';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E5E4';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';

export default function FactoryPage() {
    const [cards, setCards] = useState<Card[]>([]);
    const [apiKey, setApiKey] = useState('');
    const [showKey, setShowKey] = useState(false);

    const [ja, setJa] = useState('');
    const [ctx, setCtx] = useState('');
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState('');
    const [sugg, setSugg] = useState<Suggestion[]>([]);

    useEffect(() => {
        setCards(loadCards());
        const k = loadKey();
        setApiKey(k);
        setShowKey(!k);
    }, []);

    const persist = (next: Card[]) => { setCards(next); saveCards(next); };

    const run = async () => {
        const text = ja.trim();
        if (!text) return;
        if (!apiKey.trim()) { setShowKey(true); setErr('先に Gemini のキーを入れてください'); return; }
        setBusy(true); setErr(''); setSugg([]);
        try {
            const s = await suggest(apiKey.trim(), text, ctx.trim());
            if (!s.length) setErr('候補が出ませんでした。言い方を変えてもう一度お試しください');
            setSugg(s);
        } catch (e) {
            setErr(e instanceof Error ? e.message : '失敗しました');
        } finally {
            setBusy(false);
        }
    };

    const add = (s: Suggestion) => {
        const c: Card = { id: newId(cards), ja: ja.trim(), en: s.en, note: s.note, at: Date.now() };
        persist([c, ...cards]);
        setSugg(sugg.filter(x => x.en !== s.en));
    };

    const remove = (id: string) => persist(cards.filter(c => c.id !== id));

    return (
        <div style={{
            background: CREAM, minHeight: '100vh', color: INK,
            fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif',
        }}>
            <div style={{ maxWidth: '860px', margin: '0 auto', padding: '42px 20px 90px' }}>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '18px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 900 }}>カード工場</span>
                    <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: INK, padding: '3px 8px', borderRadius: '5px', letterSpacing: '1px' }}>
                        サーバを使いません
                    </span>
                </div>

                <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(23px, 4.4vw, 34px)', fontWeight: 900, lineHeight: 1.42, margin: '0 0 16px' }}>
                    Anki のいちばん面倒な所を、<span style={{ color: DEEPGOLD }}>ここで消す。</span>
                </h1>
                <p style={{ fontSize: '14.5px', lineHeight: 2.05, color: '#44403C', margin: '0 0 24px' }}>
                    Anki が続かない理由はアプリではなく<b>カード作り</b>です。日本語を打ってください。
                    実際に使われる英語を3つ出して、<b>発音の実動画</b>と<b>映画の実シーン</b>へのリンクを付けて、
                    Anki が読める形で書き出します。カードは<b>この端末の中だけ</b>に残ります。
                </p>

                {/* ===== 鍵 ===== */}
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '18px 20px', marginBottom: '18px' }}>
                    <button
                        onClick={() => setShowKey(!showKey)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '12.5px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '1px' }}
                    >
                        Gemini のキー {apiKey ? '(設定済み)' : '(未設定)'} {showKey ? '▲' : '▼'}
                    </button>
                    {showKey && (
                        <div style={{ marginTop: '13px' }}>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                <input
                                    type="password"
                                    value={apiKey}
                                    onChange={e => setApiKey(e.target.value)}
                                    placeholder="AIza..."
                                    style={{
                                        flex: '1 1 220px', minWidth: 0, boxSizing: 'border-box', padding: '12px 13px',
                                        border: `1px solid #D6D3D1`, borderRadius: '9px', fontSize: '15px', fontFamily: 'inherit', color: INK,
                                    }}
                                />
                                <button
                                    onClick={() => { saveKey(apiKey); setShowKey(false); setErr(''); }}
                                    style={{ border: 'none', cursor: 'pointer', background: INK, color: '#fff', padding: '12px 22px', borderRadius: '9px', fontSize: '13.5px', fontWeight: 900 }}
                                >保存</button>
                            </div>
                            <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.95, marginTop: '11px' }}>
                                キーは<b>この端末にだけ</b>保存され、こちらのサーバには送られません。ブラウザから直接 Google に繋ぎます。
                                無料枠で足ります。取得は{' '}
                                <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" style={{ color: GREEN, fontWeight: 800 }}>Google AI Studio</a>
                                {' '}から。
                            </div>
                        </div>
                    )}
                </div>

                {/* ===== 入力 ===== */}
                <div style={{ background: '#fff', border: `2px solid ${GOLD}`, borderRadius: '18px', padding: '22px 20px', marginBottom: '18px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '2px', marginBottom: '12px' }}>言いたかった日本語</div>
                    <textarea
                        value={ja}
                        onChange={e => setJa(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) void run(); }}
                        rows={2}
                        placeholder="例: それ、なんか違う気がする"
                        style={{
                            width: '100%', boxSizing: 'border-box', padding: '14px',
                            border: `1px solid #D6D3D1`, borderRadius: '11px',
                            fontSize: '16px', lineHeight: 1.7, fontFamily: 'inherit', color: INK, resize: 'vertical',
                        }}
                    />
                    <input
                        value={ctx}
                        onChange={e => setCtx(e.target.value)}
                        placeholder="場面(任意)。例: 会議で上司の案に反対したい"
                        style={{
                            width: '100%', boxSizing: 'border-box', padding: '12px 13px', marginTop: '9px',
                            border: `1px solid ${LINE}`, borderRadius: '9px', fontSize: '14px', fontFamily: 'inherit', color: INK,
                        }}
                    />
                    <button
                        onClick={() => void run()}
                        disabled={busy || !ja.trim()}
                        style={{
                            marginTop: '12px', width: '100%', border: 'none',
                            cursor: busy || !ja.trim() ? 'default' : 'pointer',
                            background: busy || !ja.trim() ? '#E7E5E4' : `linear-gradient(135deg, ${GOLD}, #E6C75E)`,
                            color: busy || !ja.trim() ? SUB : '#fff',
                            padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 900,
                        }}
                    >{busy ? '考えています...' : '英語にする'}</button>
                    {err && <div style={{ fontSize: '12.5px', color: '#B45309', fontWeight: 700, marginTop: '11px', lineHeight: 1.85 }}>{err}</div>}
                </div>

                {/* ===== 候補 ===== */}
                {sugg.length > 0 && (
                    <div style={{ marginBottom: '26px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '2px', marginBottom: '11px' }}>
                            使うものを選ぶ(押すとカードになります)
                        </div>
                        {sugg.map(s => (
                            <div key={s.en} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '18px 20px', marginBottom: '10px' }}>
                                <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 800, lineHeight: 1.6 }}>{s.en}</div>
                                {s.note && <div style={{ fontSize: '13px', color: SUB, lineHeight: 1.95, marginTop: '8px' }}>{s.note}</div>}
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '13px' }}>
                                    <button onClick={() => add(s)} style={{
                                        border: 'none', cursor: 'pointer', background: GREEN, color: '#fff',
                                        padding: '11px 20px', borderRadius: '9px', fontSize: '13.5px', fontWeight: 900,
                                    }}>カードにする</button>
                                    <a href={youglishUrl(s.en)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                        <div style={{ border: `1px solid ${LINE}`, color: SUB, padding: '11px 16px', borderRadius: '9px', fontSize: '12.5px', fontWeight: 800 }}>発音を動画で</div>
                                    </a>
                                    <a href={playphraseUrl(s.en)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                        <div style={{ border: `1px solid ${LINE}`, color: SUB, padding: '11px 16px', borderRadius: '9px', fontSize: '12.5px', fontWeight: 800 }}>映画のシーンで</div>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ===== 在庫 ===== */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '12px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '2px' }}>作ったカード</span>
                    <span style={{ fontSize: '13px', fontWeight: 800 }}>{cards.length} 枚</span>
                    {cards.length > 0 && (
                        <button
                            onClick={() => download(`anki-cards-${cards.length}.txt`, toAnkiTsv(cards))}
                            style={{
                                marginLeft: 'auto', border: 'none', cursor: 'pointer', background: INK, color: '#fff',
                                padding: '11px 18px', borderRadius: '9px', fontSize: '13px', fontWeight: 900,
                            }}
                        >Anki に書き出す</button>
                    )}
                </div>

                {cards.length === 0 ? (
                    <div style={{ background: '#fff', border: `1px dashed ${LINE}`, borderRadius: '14px', padding: '30px 22px', textAlign: 'center', color: SUB, fontSize: '13.5px', lineHeight: 2 }}>
                        まだ1枚もありません。<br />言いたかった日本語を打つところから始まります。
                    </div>
                ) : (
                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', overflow: 'hidden' }}>
                        {cards.map(c => (
                            <div key={c.id} style={{ padding: '16px 18px', borderBottom: `1px solid ${LINE}` }}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: 0, flex: 1 }}>
                                        <div style={{ fontFamily: 'Georgia, serif', fontSize: '16.5px', fontWeight: 800, lineHeight: 1.6 }}>{c.en}</div>
                                        <div style={{ fontSize: '12.5px', color: SUB, marginTop: '5px' }}>{c.ja}</div>
                                        {c.note && <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.9, marginTop: '7px' }}>{c.note}</div>}
                                        <div style={{ display: 'flex', gap: '12px', marginTop: '9px', flexWrap: 'wrap' }}>
                                            <a href={youglishUrl(c.en)} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11.5px', color: GREEN, fontWeight: 800, textDecoration: 'none' }}>発音</a>
                                            <a href={playphraseUrl(c.en)} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11.5px', color: GREEN, fontWeight: 800, textDecoration: 'none' }}>映画</a>
                                        </div>
                                    </div>
                                    <button onClick={() => remove(c.id)} style={{
                                        flexShrink: 0, border: `1px solid ${LINE}`, background: '#fff', color: SUB,
                                        padding: '7px 11px', borderRadius: '8px', fontSize: '11.5px', fontWeight: 800, cursor: 'pointer',
                                    }}>削除</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ===== 正直に書くこと ===== */}
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', padding: '22px 22px', marginTop: '30px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '2px', marginBottom: '13px' }}>正直に書いておくこと</div>
                    {[
                        ['カードはこの端末にしか残りません', 'ブラウザのデータを消すと消えます。溜まったら Anki に書き出してください。そちらが本体です。'],
                        ['AIは間違えます', '出てくる英語は候補であって正解ではありません。発音と映画のリンクを付けているのは、実際に使われているかを自分の目で確認してもらうためです。'],
                        ['書き出しはTSVです', '.apkg ではなく、Anki の「ファイル > 読み込み」で読める形。壊れたファイルを掴ませる事故を避けるため、確実なほうを選んでいます。'],
                        ['キーは預かりません', 'こちらのサーバを経由しません。通信はあなたのブラウザと Google のあいだだけです。'],
                    ].map(([t, b]) => (
                        <div key={t} style={{ marginBottom: '14px' }}>
                            <div style={{ fontSize: '13.5px', fontWeight: 900, marginBottom: '5px' }}>{t}</div>
                            <div style={{ fontSize: '12.5px', lineHeight: 1.95, color: SUB }}>{b}</div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Link href="/english/wordbook" style={{ textDecoration: 'none' }}>
                        <div style={{ border: `1px solid ${LINE}`, background: '#fff', color: SUB, padding: '13px 20px', borderRadius: '11px', fontSize: '13px', fontWeight: 800 }}>
                            何を入れるか迷ったら(話し言葉の単語帳)
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
