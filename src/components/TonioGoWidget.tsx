'use client';

// とにおGO — サイドバー常駐の実験ウィジェット。
// ポケモンGOの文法(デイリー捕獲/連続ログイン/図鑑/トレーナーLv/タマゴ孵化)に
// DMM英会話の実データを流し込む。サボりは許さない: 今日のレッスンが
// D1(dmm_conversations)に無ければ琥珀→翌日から赤で「サボり検出」。
// 日付=D1の実レッスン日(JST)。Lv/EXP/図鑑は tonio-saga(動的import・遅延)。
// 絵文字禁止・ライトテーマ(プロジェクト規約)。

import { useEffect, useState } from 'react';
import Link from 'next/link';

const GOLD = '#D4AF37';
const INK = '#1a1a1a';
const MUTED = '#8a8a8a';
const GREEN = '#10B981';
const AMBER = '#D97706';
const RED = '#DC2626';

const CACHE_KEY = 'tonio-go-dates-v2';
const CACHE_TTL = 15 * 60 * 1000;

function jstToday(offsetDays = 0): string {
    const d = new Date(Date.now() + offsetDays * 86400000);
    return d.toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' });
}

interface GoState {
    dates: string[];        // 実レッスン日 (YYYY-MM-DD, dedup済み)
    lessons: number;        // レッスン総数 (捕獲数。同日2回もカウント)
    level: number;
    totalExp: number;
    nextLevelExp: number;
    dexCount: number;
}

// 連続捕獲: 今日(未捕獲なら昨日)から遡って連続している日数。
function calcStreak(dateSet: Set<string>): { streak: number; caughtToday: boolean; gapDays: number } {
    const today = jstToday();
    const caughtToday = dateSet.has(today);
    let gapDays = 0;
    if (!caughtToday) {
        // 最後の捕獲から何日空いたか
        for (let i = 1; i <= 60; i++) {
            if (dateSet.has(jstToday(-i))) { gapDays = i; break; }
            gapDays = i;
        }
    }
    let streak = 0;
    const start = caughtToday ? 0 : -1; // 今日未捕獲なら昨日起点(まだ猶予)
    if (caughtToday || dateSet.has(jstToday(-1))) {
        for (let i = start === 0 ? 0 : 1; i <= 365; i++) {
            if (dateSet.has(jstToday(-i))) streak++;
            else if (i > 0) break;
        }
    }
    return { streak, caughtToday, gapDays };
}

export default function TonioGoWidget() {
    const [st, setSt] = useState<GoState | null>(null);

    useEffect(() => {
        let alive = true;
        const load = async () => {
            // 1. レッスン日付 (sessionStorageに15分キャッシュ)
            let dates: string[] | null = null;
            let lessons = 0;
            try {
                const raw = sessionStorage.getItem(CACHE_KEY);
                if (raw) {
                    const c = JSON.parse(raw);
                    if (Date.now() - c.ts < CACHE_TTL && Array.isArray(c.dates)) { dates = c.dates; lessons = c.lessons ?? c.dates.length; }
                }
            } catch { /* キャッシュ無視 */ }
            if (!dates) {
                try {
                    const j = await fetch('/api/dmm-conversations').then((r) => r.json());
                    const list = j.conversations || j;
                    if (Array.isArray(list)) {
                        const all = list.map((c: { date?: string }) => String(c.date || '').slice(0, 10)).filter(Boolean);
                        lessons = all.length;
                        dates = [...new Set(all)] as string[];
                        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), dates, lessons }));
                    }
                } catch { /* オフラインでも死なない */ }
            }
            if (!dates || !alive) return;
            // 2. Lv/EXP/図鑑 (tonio-saga を遅延ロード)
            try {
                const saga = await import('@/data/english/tonio-saga');
                const state = saga.getSagaStateAfter(saga.getLatestQuest().night);
                if (!alive) return;
                setSt({ dates, lessons, level: state.level, totalExp: state.totalExp, nextLevelExp: state.nextLevelExp, dexCount: saga.SAGA_BESTIARY.length });
            } catch {
                if (alive) setSt({ dates, lessons, level: 0, totalExp: 0, nextLevelExp: 1, dexCount: 0 });
            }
        };
        void load();
        return () => { alive = false; };
    }, []);

    if (!st) return null; // 読込中は何も出さない(サイドバーを揺らさない)

    const dateSet = new Set(st.dates);
    const { streak, caughtToday, gapDays } = calcStreak(dateSet);
    const total = st.lessons;
    const expPct = Math.min(100, Math.round((st.totalExp / st.nextLevelExp) * 100));
    const toNext = Math.max(0, st.nextLevelExp - st.totalExp);

    // サボり3段階
    const mode: 'ok' | 'warn' | 'angry' = caughtToday ? 'ok' : gapDays <= 1 ? 'warn' : 'angry';
    const tone = mode === 'ok' ? GREEN : mode === 'warn' ? AMBER : RED;
    const statusLabel = mode === 'ok' ? '本日ゲット済み' : mode === 'warn' ? '今夜まだ捕獲してない' : `サボり検出 — ${gapDays}日経過`;
    const statusSub = mode === 'ok'
        ? `連続捕獲 ${streak}日目。明日も逃すな。`
        : mode === 'warn'
            ? `逃すと連続${streak}日が消える。25分だけだ。`
            : '言い訳は図鑑に載らない。今夜取り返せ。';

    return (
        <div style={{ margin: '0 16px 18px', border: `1px solid ${mode === 'angry' ? '#FCA5A5' : '#e5e5e5'}`, borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff' }}>
            {/* ヘッダー */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #eee' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '1.5px', color: INK }}>とにおGO</span>
                <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1px', color: MUTED, border: '1px solid #ddd', borderRadius: '999px', padding: '1px 7px' }}>実験</span>
            </div>

            {/* トレーナー行: Lvリング + 捕獲/図鑑 */}
            <Link href="/english/training/dmm" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px 6px' }}>
                    {/* Lvリング (GOのトレーナーレベル風) */}
                    <div style={{ position: 'relative', width: '44px', height: '44px', flexShrink: 0 }}>
                        <svg viewBox="0 0 44 44" width="44" height="44">
                            <circle cx="22" cy="22" r="19" fill="none" stroke="#eee" strokeWidth="4" />
                            <circle cx="22" cy="22" r="19" fill="none" stroke={GOLD} strokeWidth="4"
                                strokeDasharray={`${(expPct / 100) * 119.4} 119.4`}
                                strokeLinecap="round" transform="rotate(-90 22 22)" />
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
                            <span style={{ fontSize: '7px', fontWeight: 700, color: MUTED, letterSpacing: '0.5px' }}>Lv</span>
                            <span style={{ fontSize: '15px', fontWeight: 900, color: INK }}>{st.level}</span>
                        </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', gap: '10px', fontSize: '10.5px', color: MUTED }}>
                            <span>捕獲 <b style={{ color: INK }}>{total}</b></span>
                            <span>連続 <b style={{ color: streak > 0 ? INK : RED }}>{streak}日</b></span>
                            <span>図鑑 <b style={{ color: INK }}>{st.dexCount}体</b></span>
                        </div>
                        {/* タマゴ(次Lvまで) */}
                        <div style={{ marginTop: '5px', height: '5px', backgroundColor: '#f0f0f0', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{ width: `${expPct}%`, height: '100%', backgroundColor: GOLD, borderRadius: '999px' }} />
                        </div>
                        <div style={{ fontSize: '9px', color: MUTED, marginTop: '3px' }}>タマゴ孵化(次Lv)まで {toNext.toLocaleString()} EXP</div>
                    </div>
                </div>
            </Link>

            {/* サボり判定バー */}
            <Link href="/english/training/dmm" style={{ textDecoration: 'none' }}>
                <div style={{ margin: '6px 10px 10px', borderRadius: '8px', padding: '7px 10px', backgroundColor: mode === 'ok' ? '#ECFDF5' : mode === 'warn' ? '#FFFBEB' : '#FEF2F2', border: `1px solid ${mode === 'ok' ? '#A7F3D0' : mode === 'warn' ? '#FDE68A' : '#FECACA'}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '7px', height: '7px', borderRadius: '999px', backgroundColor: tone, flexShrink: 0 }} />
                        <span style={{ fontSize: '11px', fontWeight: 800, color: tone }}>{statusLabel}</span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#555', marginTop: '3px', lineHeight: 1.5 }}>{statusSub}</div>
                </div>
            </Link>
        </div>
    );
}
