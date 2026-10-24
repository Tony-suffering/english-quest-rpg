/**
 * THEME 30 -- 1日1枚の紙。30テーマ x 3周 = 90日。
 *
 *   第1周 (Day 1-30)  なぞる: 元エッセイの口語版5行+一撃を、見ながら書き写す
 *   第2周 (Day 31-60) 戻す:   賛成側6行を、日本語だけ見て英語で書く
 *   第3周 (Day 61-90) 撃つ:   その日のカード(そのテーマが吸収する試験の言い回し)に
 *                              1段落書いて、そのまま2分話す
 *
 * 段は3段固定で、周が進むと使う段が増える。紙の形は90日間ずっと同じ。
 * サーバーコンポーネント(印刷用の紙は開いた瞬間に全部出ているべきなので、
 * useSearchParams+Suspense は使わない)。
 */

import { THEMES } from '@/data/english/eiken-theme30';
import { MOVE_BY_ID } from '@/data/english/eiken-moves';
import { PrintButton } from '@/components/english/PrintButton';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const INK = '#1C1917';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#ECE7DA';
const RULE = '#E7E5E4';

const LAPS = [
    { lap: 1, days: 'Day 1-30', title: 'なぞる', note: '元エッセイの口語版と一撃を、見ながら書き写す。書きながら小声で読む' },
    { lap: 2, days: 'Day 31-60', title: '戻す', note: '賛成側を日本語だけ見て英語で書く。詰まった行に印を付け、その行だけ10回音読' },
    { lap: 3, days: 'Day 61-90', title: '撃つ', note: 'その日のカードに1段落。書いたらそのまま2分話す。刺しの一行を必ず入れる' },
];

export default async function Theme30SheetPage({
    searchParams,
}: {
    searchParams: Promise<{ day?: string }>;
}) {
    const sp = await searchParams;
    const raw = Number(sp?.day ?? '1');
    const day = Number.isFinite(raw) ? Math.min(90, Math.max(1, Math.round(raw))) : 1;
    const lap = LAPS[Math.floor((day - 1) / 30)];
    const theme = THEMES[(day - 1) % 30];

    // 撃つ的: そのテーマが吸収するカードから日替わりで1枚(乱数なし=同じ日は同じ的)
    const card = theme.cards[(day - 1) % theme.cards.length];

    const traceCount = lap.lap === 1 ? 2 : 1;
    const showRestore = lap.lap >= 2;
    const showFire = lap.lap >= 3;

    const traceLines = [...theme.origin.lines, { en: theme.joke.en, ja: theme.joke.ja, m: theme.joke.m }];

    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            <style>{`@media print { .no-print { display: none !important; } @page { margin: 12mm; } }`}</style>

            <div className="no-print" style={{ background: '#FAF8F2', borderBottom: `1px solid ${LINE}`, padding: '12px 16px' }}>
                <div style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <a href="/english/theme30" style={{ fontSize: '11px', color: SUB, textDecoration: 'none', fontWeight: 800 }}>
                        ← テーマ30へ戻る
                    </a>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px', alignItems: 'center' }}>
                        {day > 1 && (
                            <a href={`?day=${day - 1}`} style={{ fontSize: '11px', color: SUB, textDecoration: 'none', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '5px 10px', fontWeight: 800 }}>前日</a>
                        )}
                        {day < 90 && (
                            <a href={`?day=${day + 1}`} style={{ fontSize: '11px', color: SUB, textDecoration: 'none', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '5px 10px', fontWeight: 800 }}>翌日</a>
                        )}
                        <PrintButton />
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '780px', margin: '0 auto', padding: '24px 16px 60px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap', borderBottom: `2px solid ${INK}`, paddingBottom: '8px' }}>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 900, color: INK, letterSpacing: '1px' }}>
                        {`DAY ${String(day).padStart(2, '0')}`}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 900, color: DEEPGOLD }}>
                        {`第${lap.lap}周「${lap.title}」`}
                    </span>
                    <span style={{ fontSize: '12px', color: SUB }}>
                        {`テーマ ${String(theme.no).padStart(2, '0')} ${theme.label}`}
                    </span>
                    <span style={{ marginLeft: 'auto', fontSize: '11px', color: FAINT }}>
                        日付 ________ / 所要 ______分
                    </span>
                </div>

                <div style={{ fontSize: '10.5px', color: SUB, lineHeight: 1.8, marginTop: '8px' }}>
                    <span style={{ fontWeight: 900, color: FAINT }}>担当: </span>{theme.owns}
                </div>
                <div style={{ fontSize: '11.5px', color: INK, fontStyle: 'italic', lineHeight: 1.8, marginTop: '4px' }}>
                    {theme.hook}
                </div>

                <Section n="1" title="なぞる" hint={`見ながら書き写す。${traceCount}回。最後の行が一撃`}>
                    {traceLines.map((l, i) => (
                        <div key={i} style={{ marginBottom: '13px' }}>
                            <div style={{ fontSize: '13px', color: INK, lineHeight: 1.65, fontWeight: i === traceLines.length - 1 ? 800 : 400 }}>
                                {l.en}
                                <span style={{ fontSize: '9px', color: FAINT, marginLeft: '7px' }}>
                                    [{l.m.map((id) => MOVE_BY_ID[id]?.label ?? id).join(' / ')}]
                                </span>
                            </div>
                            <div style={{ fontSize: '10.5px', color: SUB, marginTop: '2px' }}>{l.ja}</div>
                            {Array.from({ length: traceCount }).map((_, r) => (
                                <div key={r} style={{ borderBottom: `1px solid ${RULE}`, height: '26px' }} />
                            ))}
                        </div>
                    ))}
                </Section>

                {showRestore && (
                    <Section n="2" title="戻す" hint={`賛成側「${theme.yes.stanceJa}」を日本語だけ見て英語で。詰まった行に印`}>
                        {theme.yes.lines.map((l, i) => (
                            <div key={i} style={{ marginBottom: '11px' }}>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                                    <span style={{ fontSize: '11px', color: FAINT, minWidth: '14px' }}>{i + 1}</span>
                                    <span style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.6 }}>{l.ja}</span>
                                </div>
                                <div style={{ borderBottom: `1px solid ${RULE}`, height: '26px', marginLeft: '22px' }} />
                                <div style={{ borderBottom: `1px solid ${RULE}`, height: '26px', marginLeft: '22px' }} />
                            </div>
                        ))}
                    </Section>
                )}

                {showFire && (
                    <Section n="3" title="撃つ" hint="今日の的。反対側で書いてもいい。書いたらそのまま2分話す">
                        <div style={{ border: `1px solid ${GOLD}`, background: '#FEF9E7', borderRadius: '8px', padding: '10px 12px', marginBottom: '12px' }}>
                            <div style={{ fontSize: '13.5px', color: INK, fontWeight: 800, lineHeight: 1.5, fontFamily: 'Georgia, serif' }}>{card}</div>
                            <div style={{ fontSize: '10px', color: DEEPGOLD, marginTop: '4px', fontWeight: 800 }}>
                                抜く弾: {theme.no !== 0 && theme.angles[0] ? theme.angles.map((a) => a.label).join(' / ') : ''} の角度から2つ
                            </div>
                        </div>
                        {Array.from({ length: 12 }).map((_, r) => (
                            <div key={r} style={{ borderBottom: `1px solid ${RULE}`, height: '27px' }} />
                        ))}
                    </Section>
                )}

                <div style={{ marginTop: '22px', borderTop: `1px solid ${LINE}`, paddingTop: '10px', display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '10.5px', color: SUB }}>口に出した回数 ______</span>
                    <span style={{ fontSize: '10.5px', color: SUB }}>見ずに言えた行 ___ / {traceLines.length}</span>
                    <span style={{ fontSize: '10.5px', color: SUB }}>勝手に出た行 ___ / {traceLines.length}</span>
                </div>
                <div style={{ fontSize: '10px', color: FAINT, marginTop: '8px', lineHeight: 1.8 }}>{lap.note}</div>

                <div className="no-print" style={{ marginTop: '26px', borderTop: `1px solid ${LINE}`, paddingTop: '12px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 900, color: FAINT, letterSpacing: '1px', marginBottom: '7px' }}>3周の使い分け</div>
                    <div style={{ display: 'grid', gap: '4px' }}>
                        {LAPS.map((l) => (
                            <div key={l.lap} style={{ display: 'flex', gap: '8px', fontSize: '10.5px', color: l.lap === lap.lap ? INK : FAINT }}>
                                <span style={{ minWidth: '66px', fontFamily: 'Georgia, serif', fontWeight: 800 }}>{l.days}</span>
                                <span style={{ minWidth: '40px', fontWeight: 900 }}>{l.title}</span>
                                <span>{l.note}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Section({ n, title, hint, children }: { n: string; title: string; hint: string; children: React.ReactNode }) {
    return (
        <div style={{ marginTop: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '10px' }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '13px', fontWeight: 900, color: GOLD }}>{n}</span>
                <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>{title}</span>
                <span style={{ fontSize: '10.5px', color: FAINT }}>{hint}</span>
            </div>
            {children}
        </div>
    );
}
