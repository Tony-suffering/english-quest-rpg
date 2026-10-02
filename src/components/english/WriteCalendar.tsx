// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/components/english/WriteCalendar.tsx
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
'use client';

/**
 * ライトパス30日のカレンダー。
 *
 * 30日を5週 x 6日で並べる。1マスに その日のお題(日本語) と、
 * 4層の在庫を示す点を出す:
 *   表  write-eiken1.ts          論文体
 *   裏  write-eiken1-counter-*   論文体・逆の立場
 *   型  write-frames-*           型+穴に還元したもの
 *   話  write-spoken-*           口語版(2次スピーキング)
 *
 * 点が4つ揃った日 = その日は書く・逆から書く・型で埋める・喋る の全部が回せる。
 */

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const INK = '#1C1917';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#ECE7DA';

export interface DayLayers {
    front: boolean;
    counter: boolean;
    frames: boolean;
    spoken: boolean;
}

const LAYER_META: { key: keyof DayLayers; label: string; full: string; color: string }[] = [
    { key: 'front', label: '表', full: '模範解答(論文体)', color: GOLD },
    { key: 'counter', label: '裏', full: '逆の立場', color: DEEPGOLD },
    { key: 'frames', label: '型', full: '型+穴に還元', color: '#78716C' },
    { key: 'spoken', label: '話', full: '口語版(2次)', color: GREEN },
];

export function WriteCalendar({
    day, setDay, done, topics, layers, todayDay, isMobile,
}: {
    day: number;
    setDay: (d: number) => void;
    done: Set<number>;
    /** day -> お題の日本語 */
    topics: Record<number, string>;
    /** day -> 在庫 */
    layers: Record<number, DayLayers>;
    todayDay: number;
    isMobile: boolean;
}) {
    const cols = isMobile ? 2 : 6;
    const weeks: number[][] = [];
    for (let w = 0; w < 5; w++) weeks.push(Array.from({ length: 6 }, (_, i) => w * 6 + i + 1));

    const totalFilled = Object.values(layers).reduce(
        (n, l) => n + Number(l.front) + Number(l.counter) + Number(l.frames) + Number(l.spoken), 0,
    );

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: FAINT, letterSpacing: '1px' }}>30日カレンダー</span>
                <span style={{ fontSize: '10.5px', color: SUB }}>
                    在庫 {totalFilled} / 120 枚(30日 × 4層)
                </span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {LAYER_META.map((m) => (
                        <span key={m.key} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: SUB }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: m.color, display: 'inline-block' }} />
                            {m.label} {m.full}
                        </span>
                    ))}
                </div>
            </div>

            {weeks.map((week, wi) => (
                <div key={wi} style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '9.5px', fontWeight: 800, color: FAINT, letterSpacing: '1px', marginBottom: '4px' }}>
                        第{wi + 1}週
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: '6px' }}>
                        {week.map((d) => {
                            const L = layers[d] ?? { front: false, counter: false, frames: false, spoken: false };
                            const isSel = d === day;
                            const isToday = d === todayDay;
                            const dDone = done.has(d);
                            const complete = L.front && L.counter && L.frames && L.spoken;
                            return (
                                <button
                                    key={d}
                                    onClick={() => setDay(d)}
                                    title={topics[d] ?? `Day ${d}`}
                                    style={{
                                        textAlign: 'left', padding: '8px 9px', borderRadius: '9px', cursor: 'pointer',
                                        border: isSel ? `2px solid ${GOLD}` : `1px solid ${LINE}`,
                                        background: dDone ? '#FEF9E7' : '#fff',
                                        boxShadow: isToday ? `0 0 0 2px ${GOLD}44` : 'none',
                                        minHeight: '62px', display: 'flex', flexDirection: 'column', gap: '4px',
                                        transition: 'all 0.12s',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span style={{ fontFamily: 'Georgia, serif', fontSize: '13px', fontWeight: 900, color: complete ? INK : SUB }}>
                                            {d}
                                        </span>
                                        {isToday && (
                                            <span style={{ fontSize: '8.5px', fontWeight: 900, color: DEEPGOLD, background: '#FEF3C7', borderRadius: '999px', padding: '1px 5px' }}>
                                                今日
                                            </span>
                                        )}
                                        <span style={{ marginLeft: 'auto', display: 'flex', gap: '2px' }}>
                                            {LAYER_META.map((m) => (
                                                <span
                                                    key={m.key}
                                                    title={m.full}
                                                    style={{
                                                        width: '6px', height: '6px', borderRadius: '2px',
                                                        background: L[m.key] ? m.color : '#EFEDE6',
                                                        display: 'inline-block',
                                                    }}
                                                />
                                            ))}
                                        </span>
                                    </div>
                                    <div style={{
                                        fontSize: '9.5px', lineHeight: 1.45, color: SUB,
                                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                    }}>
                                        {topics[d] ?? ''}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
