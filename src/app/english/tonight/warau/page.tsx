'use client';

// 「英語ゼロで読む」— 既存64夜から日本語だけの笑いを抜き出した追加ページ。
// 本体は日本語のコメディ、英語はおまけ、という主従をそのまま形にする。
// dmm-show / tonio-league のデータは変更していない(読み替えのみ)。
// このページには英単語を出さない。英語が見たい人だけ各夜へ飛ぶ。

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { getWaraiFeed, getWaraiStats, WARAI_META } from '@/data/english/tonio-warai';

const PAPER = '#F4F0E6';
const CARD = '#FFFFFF';
const INK = '#17130F';
const MUTED = '#6E6558';
const RED = '#C0392B';
const GOLD = '#B8941E';
const GOLD_HI = '#E7C14B';
const GREEN = '#2E9E6B';
const LINE = '#E5DECF';
const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";
const SANS = "'Helvetica Neue', Arial, 'Yu Gothic', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif";

const PAGE = 12;

export default function WarauPage() {
    const feed = useMemo(() => getWaraiFeed(), []);
    const stats = useMemo(() => getWaraiStats(), []);
    const [onlyPunch, setOnlyPunch] = useState(true);
    const [shown, setShown] = useState(PAGE);

    const list = useMemo(
        () => (onlyPunch ? feed.filter((w) => w.punch) : feed),
        [feed, onlyPunch],
    );
    const visible = list.slice(0, shown);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: PAPER, fontFamily: SANS, color: INK, padding: '0 0 90px' }}>
            {/* ツールバー */}
            <div style={{ backgroundColor: INK, color: '#fff', padding: '10px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Link href="/english/tonight" style={{ color: GOLD_HI, textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>← 番組へ</Link>
                    <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '2px' }}>英語ゼロで読む</span>
                </div>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>全{stats.nights}夜</span>
            </div>

            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 14px' }}>
                {/* ===== 主題 ===== */}
                <div style={{ backgroundColor: INK, color: '#fff', borderRadius: '0 0 16px 16px', padding: 'clamp(26px, 6vw, 42px) clamp(20px, 5vw, 38px)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: GOLD_HI }}>英単語ゼロ</div>
                    <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(30px, 8vw, 48px)', fontWeight: 900, lineHeight: 1.2, margin: '10px 0 0' }}>
                        {WARAI_META.title}
                    </h1>
                    <p style={{ fontFamily: SERIF, fontSize: 'clamp(15px, 3.2vw, 18px)', fontWeight: 700, color: GOLD_HI, margin: '12px 0 0', lineHeight: 1.75 }}>
                        {WARAI_META.hook}
                    </p>
                    <p style={{ fontSize: '13.5px', lineHeight: 2, color: 'rgba(255,255,255,0.86)', margin: '14px 0 0' }}>
                        {WARAI_META.pitch}
                    </p>
                    <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '12px', fontSize: '12.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
                        {WARAI_META.note}
                    </div>
                </div>

                {/* ===== 絞り込み ===== */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px', flexWrap: 'wrap', margin: '16px 0 4px' }}>
                    <button onClick={() => { setOnlyPunch(true); setShown(PAGE); }}
                        style={{
                            cursor: 'pointer', borderRadius: '999px', padding: '6px 14px', fontSize: '12px', fontWeight: 800,
                            backgroundColor: onlyPunch ? GREEN : '#fff', color: onlyPunch ? '#fff' : MUTED,
                            border: `1px solid ${onlyPunch ? 'transparent' : LINE}`,
                        }}>
                        ツッコミつき({stats.withPunch})
                    </button>
                    <button onClick={() => { setOnlyPunch(false); setShown(PAGE); }}
                        style={{
                            cursor: 'pointer', borderRadius: '999px', padding: '6px 14px', fontSize: '12px', fontWeight: 800,
                            backgroundColor: !onlyPunch ? INK : '#fff', color: !onlyPunch ? '#fff' : MUTED,
                            border: `1px solid ${!onlyPunch ? 'transparent' : LINE}`,
                        }}>
                        全{stats.nights}夜
                    </button>
                    <span style={{ fontSize: '11px', color: MUTED }}>新しい順</span>
                </div>

                {/* ===== 本文(英語ゼロ) ===== */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                    {visible.map((w) => (
                        <div key={w.night} style={{ backgroundColor: CARD, border: `1px solid ${LINE}`, borderRadius: '13px', padding: 'clamp(16px, 4vw, 24px)' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '1px', color: '#fff', backgroundColor: RED, borderRadius: '5px', padding: '3px 9px' }}>第{w.night}夜</span>
                                <span style={{ fontSize: '11px', color: MUTED }}>{w.date}</span>
                            </div>

                            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(19px, 4.2vw, 25px)', fontWeight: 900, color: INK, margin: '10px 0 0', lineHeight: 1.45 }}>
                                {w.headline}
                            </h2>
                            <p style={{ fontSize: '13px', color: MUTED, margin: '7px 0 0', lineHeight: 1.8 }}>{w.catchcopy}</p>

                            {w.punch && (
                                <div style={{ backgroundColor: '#FBF6E7', border: '1px solid #E8D9A8', borderLeft: `4px solid ${GOLD}`, borderRadius: '9px', padding: '13px 15px', marginTop: '13px' }}>
                                    {w.scene && (
                                        <div style={{ fontSize: '10.5px', fontWeight: 800, letterSpacing: '1.5px', color: GOLD, marginBottom: '5px' }}>{w.scene}</div>
                                    )}
                                    <p style={{ fontSize: '13.5px', color: INK, margin: 0, lineHeight: 2 }}>{w.punch}</p>
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '13px', borderTop: `1px solid ${LINE}`, paddingTop: '11px' }}>
                                <Link href={`/english/tonight/league?night=${w.night}`} style={{ fontSize: '12px', fontWeight: 800, color: GOLD, textDecoration: 'none' }}>
                                    この夜の中身を見る(英語あり) →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {shown < list.length && (
                    <button onClick={() => setShown(shown + PAGE)}
                        style={{
                            width: '100%', marginTop: '16px', cursor: 'pointer', backgroundColor: '#fff', color: INK,
                            border: `1px solid ${LINE}`, borderRadius: '11px', padding: '14px', fontSize: '13px', fontWeight: 800,
                        }}>
                        もっと読む(残り{list.length - shown}夜)
                    </button>
                )}

                {/* ===== 導線 ===== */}
                <div style={{ marginTop: '22px', backgroundColor: INK, color: '#fff', borderRadius: '14px', padding: 'clamp(20px, 4vw, 30px)' }}>
                    <p style={{ fontFamily: SERIF, fontSize: '15px', lineHeight: 1.95, margin: '0 0 16px', color: 'rgba(255,255,255,0.92)' }}>
                        ここまで英単語ゼロ。それでも64夜ぶんの事故が全部わかる。
                        英語が見たくなったら、どの夜からでも入ればいい。おまけは、欲しい人だけ持って帰る。
                    </p>
                    <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                        <Link href="/english/tonight/start" style={{ backgroundColor: GOLD, color: INK, fontWeight: 900, fontSize: '13px', padding: '10px 20px', borderRadius: '9px', textDecoration: 'none' }}>自分も喋ってみる</Link>
                        <Link href="/english/tonight" style={{ color: GOLD_HI, fontWeight: 800, fontSize: '13px', padding: '10px 0', textDecoration: 'none' }}>番組本編へ →</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
