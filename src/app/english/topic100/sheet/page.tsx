/**
 * TOPIC 100 -- 1日1枚の紙。
 *
 * 毎日書く習慣は紙でしか作れないので、印刷して机に置ける形を用意する。
 * 3段構成: なぞる / 戻す / 撃つ。周によって使う段が変わる(1周目は上段だけ、
 * 3周目は下段まで)。段の並びは固定で、紙の形が100日間ずっと同じになるようにしてある。
 *
 * サーバーコンポーネントにしてある。useSearchParams + Suspense にすると
 * クライアント側で解決を待つ形になり、紙が出るまで空白になる場面がある。
 * 印刷用の紙は「開いた瞬間に全部そこにある」ほうが正しいので、日付は
 * サーバーで読み、クライアントに渡すのは印刷ボタンだけにした。
 */

import { LAPS, planFor, BEATS } from '@/data/english/eiken-spine100';
import { TOPIC_BY_NO, ENGINE_COVERAGE } from '@/data/english/eiken-topic100';
import { PrintButton } from '@/components/english/PrintButton';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const INK = '#1C1917';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#ECE7DA';
const RULE = '#E7E5E4';

export default async function SheetPage({
    searchParams,
}: {
    searchParams: Promise<{ day?: string }>;
}) {
    const sp = await searchParams;
    const raw = Number(sp?.day ?? '1');
    const day = Number.isFinite(raw) ? Math.min(100, Math.max(1, Math.round(raw))) : 1;
    const plan = planFor(day)!;
    const { lap, verse } = plan;

    const cover = ENGINE_COVERAGE[verse.engineId] ?? [];
    // 的は Day から決める。乱数を使わないので、同じ日を開けば毎回同じ的が出る
    const target = cover.length ? TOPIC_BY_NO[cover[(day - 1) % cover.length]] : null;

    const traceLines = lap.lap <= 1 ? 3 : lap.lap === 2 ? 2 : 1;
    const showRestore = lap.lap >= 2;
    const showFire = lap.lap >= 3;

    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            <style>{`@media print { .no-print { display: none !important; } @page { margin: 12mm; } }`}</style>

            <div className="no-print" style={{ background: '#FAF8F2', borderBottom: `1px solid ${LINE}`, padding: '12px 16px' }}>
                <div style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <a href="/english/topic100" style={{ fontSize: '11px', color: SUB, textDecoration: 'none', fontWeight: 800 }}>
                        ← トピック100へ戻る
                    </a>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px', alignItems: 'center' }}>
                        {day > 1 && (
                            <a href={`?day=${day - 1}`} style={{ fontSize: '11px', color: SUB, textDecoration: 'none', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '5px 10px', fontWeight: 800 }}>前日</a>
                        )}
                        {day < 100 && (
                            <a href={`?day=${day + 1}`} style={{ fontSize: '11px', color: SUB, textDecoration: 'none', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '5px 10px', fontWeight: 800 }}>翌日</a>
                        )}
                        <PrintButton />
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '780px', margin: '0 auto', padding: '24px 16px 60px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap', borderBottom: `2px solid ${INK}`, paddingBottom: '8px' }}>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 900, color: INK, letterSpacing: '1px' }}>
                        {`DAY ${String(day).padStart(3, '0')}`}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 900, color: DEEPGOLD }}>
                        {`第${lap.lap}周「${lap.title}」`}
                    </span>
                    <span style={{ fontSize: '12px', color: SUB }}>
                        {`ヴァース ${String(verse.no).padStart(2, '0')} ${verse.label}`}
                    </span>
                    <span style={{ marginLeft: 'auto', fontSize: '11px', color: FAINT }}>
                        日付 ________ / 所要 ______分
                    </span>
                </div>

                <Section n="1" title="なぞる" hint={`英文を見ながら書き写す。${traceLines}回`}>
                    {verse.lines.map((l, i) => {
                        const beat = BEATS.find((b) => b.key === l.beat)!;
                        return (
                            <div key={i} style={{ marginBottom: '14px' }}>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                                    <span style={{ fontSize: '9.5px', fontWeight: 900, color: FAINT, minWidth: '30px' }}>{beat.label}</span>
                                    <span style={{ fontSize: '13px', color: INK, lineHeight: 1.6, fontWeight: l.beat === 'sting' ? 800 : 400 }}>{l.en}</span>
                                </div>
                                <div style={{ fontSize: '10.5px', color: SUB, marginLeft: '38px', marginTop: '2px' }}>{l.ja}</div>
                                {Array.from({ length: traceLines }).map((_, r) => (
                                    <div key={r} style={{ borderBottom: `1px solid ${RULE}`, height: '26px', marginLeft: '38px' }} />
                                ))}
                            </div>
                        );
                    })}
                </Section>

                {showRestore && (
                    <Section n="2" title="戻す" hint="日本語だけを見て5行を英語で書く。詰まった行に印を付ける">
                        {verse.lines.map((l, i) => (
                            <div key={i} style={{ marginBottom: '12px' }}>
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

                {showFire && target && (
                    <Section n="3" title="撃つ" hint="今日の的。5行を差し替えて1段落。書いたらそのまま2分話す">
                        <div style={{ border: `1px solid ${GOLD}`, background: '#FEF9E7', borderRadius: '8px', padding: '10px 12px', marginBottom: '12px' }}>
                            <div style={{ fontSize: '10px', color: DEEPGOLD, fontWeight: 900, marginBottom: '3px' }}>{`No.${target.no}`}</div>
                            <div style={{ fontSize: '13.5px', color: INK, fontWeight: 800, lineHeight: 1.5, fontFamily: 'Georgia, serif' }}>{target.en}</div>
                            <div style={{ fontSize: '11px', color: SUB, marginTop: '3px' }}>{target.ja}</div>
                        </div>
                        {Array.from({ length: lap.lap >= 4 ? 12 : 9 }).map((_, r) => (
                            <div key={r} style={{ borderBottom: `1px solid ${RULE}`, height: '27px' }} />
                        ))}
                    </Section>
                )}

                <div style={{ marginTop: '22px', borderTop: `1px solid ${LINE}`, paddingTop: '10px', display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '10.5px', color: SUB }}>口に出した回数 ______</span>
                    <span style={{ fontSize: '10.5px', color: SUB }}>見ずに言えた行 ___ / 5</span>
                    <span style={{ fontSize: '10.5px', color: SUB }}>勝手に出た行 ___ / 5</span>
                </div>
                <div style={{ fontSize: '10px', color: FAINT, marginTop: '8px', lineHeight: 1.8 }}>{lap.why}</div>

                <div className="no-print" style={{ marginTop: '26px', borderTop: `1px solid ${LINE}`, paddingTop: '12px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 900, color: FAINT, letterSpacing: '1px', marginBottom: '7px' }}>5周の使い分け</div>
                    <div style={{ display: 'grid', gap: '4px' }}>
                        {LAPS.map((l) => (
                            <div key={l.lap} style={{ display: 'flex', gap: '8px', fontSize: '10.5px', color: l.lap === lap.lap ? INK : FAINT }}>
                                <span style={{ minWidth: '58px', fontFamily: 'Georgia, serif', fontWeight: 800 }}>{l.days}</span>
                                <span style={{ minWidth: '40px', fontWeight: 900 }}>{l.title}</span>
                                <span>{l.paper}</span>
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
