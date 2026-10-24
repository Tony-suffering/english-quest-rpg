'use client';

/**
 * SCOREPASS ドクター -- 模試の結果を「診断書」に変えるページ。
 *
 * 商品の核。点数を見せて終わりではなく、
 *   問診 (持ち時間・目標・試験日) x 検査 (模試の解答ログ) -> 診断 (主因) -> 処方箋 -> 再診
 * の医者の流れをそのままやる。データは全部ブラウザ (localStorage) にあり、
 * 送信は一切しない。
 */

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import TOEIC_TEST_01 from '@/data/english/toeic-test-01';
import TOEIC_TEST_02 from '@/data/english/toeic-test-02';
import TOEIC_TEST_03 from '@/data/english/toeic-test-03';
import TOEIC_TEST_04 from '@/data/english/toeic-test-04';
import TOEIC_TEST_05 from '@/data/english/toeic-test-05';
import TOEIC_TEST_06 from '@/data/english/toeic-test-06';
import TOEIC_TEST_07 from '@/data/english/toeic-test-07';
import TOEIC_TEST_08 from '@/data/english/toeic-test-08';
import { TOEIC_TESTS } from '@/data/english/toeic-tests';
import {
    analyzeTest, estimateScaled, findCauses, loadAnswerEvents, loadGuesses, loadIntake,
    loadSelfReport, prescribe, project, saveIntake, saveSelfReport, toeicAnswersKey,
    type AnswerEvent, type Cause, type DoctorIntake, type SelfReport,
} from '@/lib/toeic-doctor';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const DEEPGREEN = '#047857';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E2D5';
const RED = '#DC2626';
const AMBER = '#B45309';

const ALL_TESTS = [TOEIC_TEST_01, TOEIC_TEST_02, TOEIC_TEST_03, TOEIC_TEST_04, TOEIC_TEST_05, TOEIC_TEST_06, TOEIC_TEST_07, TOEIC_TEST_08];

function fmtMin(sec: number): string {
    const m = Math.floor(sec / 60);
    const s = Math.round(sec % 60);
    return `${m}分${String(s).padStart(2, '0')}秒`;
}

function fmtDate(ms: number): string {
    const d = new Date(ms);
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
}

/* ---- 見出し ---- */
function SectionHead({ no, title, sub }: { no: string; title: string; sub?: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', borderBottom: `2px solid ${INK}`, paddingBottom: '7px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '13px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '1px' }}>{no}</span>
            <span style={{ fontSize: '16px', fontWeight: 900, color: INK }}>{title}</span>
            {sub && <span style={{ fontSize: '11px', color: SUB }}>{sub}</span>}
        </div>
    );
}

const inputStyle: React.CSSProperties = {
    border: `1px solid ${LINE}`, borderRadius: '8px', padding: '8px 10px', fontSize: '13px',
    color: INK, background: '#fff', width: '100%', boxSizing: 'border-box',
};
const labelStyle: React.CSSProperties = { fontSize: '10.5px', fontWeight: 800, color: SUB, letterSpacing: '0.5px', display: 'block', marginBottom: '4px' };

export default function ToeicDoctorPage() {
    const [mounted, setMounted] = useState(false);
    const [intake, setIntake] = useState<DoctorIntake>({
        currentScore: null, targetScore: 730, examDate: '', weekdayMin: 30, weekendMin: 60, audioOk: true,
    });
    const [sessions, setSessions] = useState<{ testId: string; answers: Record<number, string>; guesses: Set<number>; events: AnswerEvent[] }[]>([]);
    const [selfReports, setSelfReports] = useState<Record<string, SelfReport>>({});

    useEffect(() => {
        setIntake(loadIntake());
        const ss: typeof sessions = [];
        const srs: Record<string, SelfReport> = {};
        for (const t of ALL_TESTS) {
            try {
                const raw = localStorage.getItem(toeicAnswersKey(t.id));
                const answers: Record<number, string> = raw ? JSON.parse(raw) : {};
                if (Object.keys(answers).length === 0) continue;
                ss.push({ testId: t.id, answers, guesses: loadGuesses(t.id), events: loadAnswerEvents(t.id) });
                srs[t.id] = loadSelfReport(t.id);
            } catch { /* noop */ }
        }
        setSessions(ss);
        setSelfReports(srs);
        setMounted(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const reports = useMemo(() => sessions.map(s => analyzeTest(
        ALL_TESTS.find(t => t.id === s.testId)!,
        s.answers, s.guesses, s.events,
        selfReports[s.testId] ?? { totalMin: null, at75No: null },
    )), [sessions, selfReports]);

    const update = (patch: Partial<DoctorIntake>) => {
        setIntake(prev => {
            const next = { ...prev, ...patch };
            saveIntake(next);
            return next;
        });
    };

    const updateSelf = (testId: string, patch: Partial<SelfReport>) => {
        setSelfReports(prev => {
            const next = { ...prev, [testId]: { totalMin: null, at75No: null, ...prev[testId], ...patch } };
            saveSelfReport(testId, next[testId]);
            return next;
        });
    };

    /** 主検体 = 一番解答数が多く、同数なら新しい回 */
    const primary = useMemo(() => {
        if (reports.length === 0) return null;
        return [...reports].sort((a, b) => b.answered - a.answered || (b.lastAt || 0) - (a.lastAt || 0))[0];
    }, [reports]);

    const causes: Cause[] = useMemo(() => primary ? findCauses(primary) : [], [primary]);
    const prescriptions = useMemo(() => primary ? prescribe(causes, intake) : [], [primary, causes, intake]);

    /** 実力 (時間無制限) と本番想定 (75分) の2本立て推定 */
    const est = useMemo(() => {
        if (!primary) return null;
        const answeredL = primary.partAcc.filter(p => p.part <= 4).reduce((a, p) => a + p.total, 0);
        const rawL = primary.hasListening && answeredL >= 60 ? primary.correctL : null;
        const real = estimateScaled(rawL, primary.correctR);
        const sim = primary.examSim ? estimateScaled(rawL, primary.examSim.simCorrectR) : null;
        return { real, sim };
    }, [primary]);

    // 予測の現在地は本番想定を優先する (公式スコアに一番近いのはそれ)
    const proj = useMemo(() => project(intake, est?.sim?.total ?? est?.real?.total ?? null), [intake, est]);

    /** 院長所感 -- 診断の結論を一段落の人間の言葉にする */
    const shokan = useMemo(() => {
        if (!primary) return '';
        const top = causes[0];
        const parts: string[] = [];
        if (!top) {
            parts.push('現時点で目立った主因が出ていない。この状態で伸び悩むなら、原因は弱点ではなく総量の不足で、それは診断ではなく時間が解決する。');
        } else if (top.key === 'time') {
            parts.push('知識より先に時間で失点している。つまり、勉強量を増やす前に解き方を変えるほうが早く点が動く。これは朗報の部類で、時間配分は語彙より短期間で直る。');
        } else if (top.key === 'vocab') {
            parts.push('主因は語彙。ここは近道が無い代わりに裏切りも無い。落とした語をその場で回収し続ければ、必ず数字に出る。焦る必要はないが、サボった分もそのまま数字に出る。');
        } else if (top.key === 'grammar') {
            parts.push('主因は文法。ただし文法書を頭からやり直す話ではなく、ミスが集中している型は既に特定されている。潰す対象が見えている失点は、失点の中では一番安い。');
        } else if (top.key === 'listening') {
            parts.push('リーディングに比べてリスニングで落としている。読めば分かる英文を聞き取れていないだけなら、耳が音に追いつくまでの物量の問題で、才能の話ではない。');
        } else if (top.key === 'inference') {
            parts.push('直接書かれていないことを問う問題で落としている。単語と文法が足りていてこれが残るのは順調な証拠でもある。言い換えの対応を一組ずつ拾えば、ここは崩せる。');
        } else {
            parts.push('素点にまぐれ正解が混ざっている。数字が下がって見えるのは不快だが、実力を正確に測れたということで、診断としては前進になる。');
        }
        if (proj.verdict === 'unreachable') {
            parts.push('一つだけ耳の痛いことを言う。いまの持ち時間では、試験日までに目標に届く見込みが立たない。目標を下げるか、試験日をずらすか、時間を作るか。三つのどれかで、気合いは選択肢に入っていない。');
        } else if (proj.verdict === 'tight') {
            parts.push('持ち時間と目標の関係はぎりぎりで、サボる余白は無い。ただし届く計算ではある。');
        }
        return parts.join(' ');
    }, [primary, causes, proj]);

    if (!mounted) {
        return <div style={{ minHeight: '100vh', background: '#EDEBE3' }} />;
    }

    return (
        <div style={{ minHeight: '100vh', background: '#EDEBE3', fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif', paddingBottom: '60px' }}>
            {/* ===== header ===== */}
            <div style={{ background: 'rgba(28,25,23,0.97)', color: '#fff', padding: '14px 20px' }}>
                <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                    <div>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: '17px', fontWeight: 900, color: GOLD, letterSpacing: '1px' }}>SCORE<span style={{ color: '#fff' }}>PASS</span></span>
                        <span style={{ fontSize: '12px', fontWeight: 800, color: '#C9C0AC', marginLeft: '10px', letterSpacing: '2px' }}>DOCTOR ・ 診断書</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        {TOEIC_TESTS.map(x => (
                            <Link key={x.n} href={x.href} style={{ fontSize: '10px', fontWeight: 800, textDecoration: 'none', borderRadius: '5px', padding: '3px 8px', color: '#C9C0AC', border: '1px solid #4b4641' }}>
                                {x.n}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '860px', margin: '18px auto 0', background: '#fff', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', borderRadius: '4px', padding: '32px 28px' }}>
                {/* ===== カルテ表紙 ===== */}
                <div style={{ textAlign: 'center', borderBottom: `2px solid ${INK}`, paddingBottom: '16px' }}>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 900, color: INK, letterSpacing: '1px' }}>診 断 書</div>
                    <div style={{ fontSize: '11.5px', color: SUB, marginTop: '6px', lineHeight: 1.8 }}>
                        素点は結果でしかない。この紙は「時間が足りないのか、知識が足りないのか」に答えるためにある。<br />
                        データはこの端末のブラウザにだけ保存され、どこにも送信されない。
                    </div>
                </div>

                {/* ===== 1. 問診票 ===== */}
                <section style={{ marginTop: '28px' }}>
                    <SectionHead no="I" title="問診票" sub="処方箋は持ち時間から逆算する。正直に書くほど診断は当たる" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                        <div>
                            <label style={labelStyle}>直近の公式スコア (未受験は空欄)</label>
                            <input type="number" inputMode="numeric" min={10} max={990} step={5} value={intake.currentScore ?? ''} placeholder="未受験"
                                onChange={e => update({ currentScore: e.target.value === '' ? null : Number(e.target.value) })} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>目標スコア</label>
                            <select value={intake.targetScore} onChange={e => update({ targetScore: Number(e.target.value) })} style={inputStyle}>
                                {[600, 650, 700, 730, 800, 860, 900].map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>次の受験日 (未定は空欄)</label>
                            <input type="date" value={intake.examDate} onChange={e => update({ examDate: e.target.value })} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>平日に使える時間 (分/日)</label>
                            <input type="number" inputMode="numeric" min={0} max={480} step={10} value={intake.weekdayMin}
                                onChange={e => update({ weekdayMin: Math.max(0, Number(e.target.value) || 0) })} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>休日に使える時間 (分/日)</label>
                            <input type="number" inputMode="numeric" min={0} max={720} step={10} value={intake.weekendMin}
                                onChange={e => update({ weekendMin: Math.max(0, Number(e.target.value) || 0) })} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>移動中などに音声を聞ける</label>
                            <select value={intake.audioOk ? '1' : '0'} onChange={e => update({ audioOk: e.target.value === '1' })} style={inputStyle}>
                                <option value="1">聞ける</option>
                                <option value="0">聞けない</option>
                            </select>
                        </div>
                    </div>
                    <p style={{ margin: '10px 0 0', fontSize: '11px', color: SUB }}>
                        週あたり {proj.weeklyHours} 時間で計算する。
                    </p>
                </section>

                {/* ===== 2. 検査結果 ===== */}
                <section style={{ marginTop: '30px' }}>
                    <SectionHead no="II" title="検査結果" sub="解答データのある模試" />
                    {/* 受け方 -- 塗り絵をさせない。知識と時間を1回で分離するプロトコル */}
                    <div style={{ border: `1px solid ${GOLD}66`, background: '#FFFDF4', borderRadius: '10px', padding: '12px 15px', marginBottom: '14px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '1.5px', marginBottom: '5px' }}>受け方 (これだけ守る)</div>
                        <p style={{ margin: 0, fontSize: '12px', color: '#44403C', lineHeight: 1.9 }}>
                            時間は計るが、止まらない。<b>75分が来たら、いま解いている設問番号をメモして、そのまま最後まで全問ちゃんと解く。</b>
                            塗り絵はしない -- 適当マークの正誤が混ざると、どの型が弱いかの測定が濁る。
                            終わったら下のカードに「75分時点のNo.」と「解き切るまでの時間」を申告する。
                            これで1回の模試から「時間無制限の実力」と「75分の本番想定」が両方出る。リスニングは後回しでいい。
                        </p>
                    </div>
                    {reports.length === 0 ? (
                        <div style={{ border: `1px dashed ${LINE}`, borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                            <div style={{ fontSize: '13px', fontWeight: 800, color: INK }}>検体がまだ無い</div>
                            <p style={{ margin: '8px auto 14px', fontSize: '12px', color: SUB, lineHeight: 1.9, maxWidth: '32em', textAlign: 'left' }}>
                                診断には模試1回分の解答が要る。上の受け方どおりに解いて、採点したらここに戻る。
                                根拠なくマークした問題に「勘で答えた」を付けておくと、まぐれ正解も実力から外せる。
                            </p>
                            <Link href="/english/toeic" style={{ display: 'inline-block', fontSize: '13px', fontWeight: 900, color: INK, background: GOLD, textDecoration: 'none', borderRadius: '8px', padding: '11px 22px' }}>
                                Test 01 を受ける (リーディングだけでもいい)
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {reports.map(r => {
                                const isPrimary = r.testId === primary?.testId;
                                const answeredL = r.partAcc.filter(p => p.part <= 4).reduce((a, p) => a + p.total, 0);
                                const readingOnly = r.hasListening && answeredL === 0;
                                const blankR = r.hasListening ? Math.max(0, r.blank - (100 - answeredL)) : r.blank;
                                const sr = selfReports[r.testId] ?? { totalMin: null, at75No: null };
                                return (
                                    <div key={r.testId} style={{ border: `1.5px solid ${isPrimary ? GOLD : LINE}`, borderRadius: '10px', padding: '12px 14px', background: isPrimary ? '#FFFDF4' : '#fff' }}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>{r.title.replace(/.*(\d\d)$/, 'Test $1')}</span>
                                            <span style={{ fontSize: '11px', color: SUB }}>{r.hasListening ? 'フル 200問' : 'リーディング 100問'}</span>
                                            {r.lastAt && <span style={{ fontSize: '11px', color: SUB }}>{fmtDate(r.lastAt)}</span>}
                                            {isPrimary && <span style={{ fontSize: '9px', fontWeight: 800, color: DEEPGOLD, border: `1px solid ${GOLD}`, borderRadius: '4px', padding: '1px 6px', letterSpacing: '1px' }}>診断に使用</span>}
                                        </div>
                                        <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexWrap: 'wrap', fontSize: '12px', color: '#44403C' }}>
                                            {r.hasListening && (readingOnly
                                                ? <span style={{ color: SUB }}>L 未受験 (リーディングのみ)</span>
                                                : <span>L 正答 <b style={{ fontSize: '15px', color: INK }}>{r.correctL}</b>/100</span>)}
                                            <span>R 正答 <b style={{ fontSize: '15px', color: INK }}>{r.correctR}</b>/100</span>
                                            {blankR > 0 && <span style={{ color: AMBER }}>R 未回答 {blankR}</span>}
                                            {r.guessedCount > 0
                                                ? <span>勘フラグ {r.guessedCount} 問 (うちまぐれ正解 {r.luckyL + r.luckyR})</span>
                                                : <span style={{ color: SUB }}>勘フラグなし</span>}
                                            {r.time.readingSec != null && <span>R 解答時間 (自動計測) {fmtMin(r.time.readingSec)}{r.time.hadBreaks ? ' (中断あり)' : ''}</span>}
                                        </div>
                                        {/* 時間の自己申告 */}
                                        <div style={{ display: 'flex', gap: '12px', marginTop: '10px', flexWrap: 'wrap', alignItems: 'flex-end', borderTop: `1px dashed ${LINE}`, paddingTop: '10px' }}>
                                            <div style={{ width: '170px' }}>
                                                <label style={labelStyle}>75分時点にいた設問 No.</label>
                                                <input type="number" inputMode="numeric" min={101} max={200} placeholder="時間内に完走"
                                                    value={sr.at75No ?? ''}
                                                    onChange={e => updateSelf(r.testId, { at75No: e.target.value === '' ? null : Math.min(200, Math.max(101, Number(e.target.value))) })}
                                                    style={inputStyle} />
                                            </div>
                                            <div style={{ width: '170px' }}>
                                                <label style={labelStyle}>解き切るまでの時間 (分)</label>
                                                <input type="number" inputMode="numeric" min={1} max={600} placeholder="未計測"
                                                    value={sr.totalMin ?? ''}
                                                    onChange={e => updateSelf(r.testId, { totalMin: e.target.value === '' ? null : Math.max(1, Number(e.target.value)) })}
                                                    style={inputStyle} />
                                            </div>
                                            <span style={{ fontSize: '10.5px', color: SUB, lineHeight: 1.6, flex: 1, minWidth: '160px' }}>
                                                自己申告。75分以内に全問解けたなら No. は空欄のまま、時間だけ入れる。
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>

                {primary && (
                    <>
                        {/* ===== 3. 診断 ===== */}
                        <section style={{ marginTop: '30px' }}>
                            <SectionHead no="III" title="診断" sub={`主検体: ${primary.title.replace(/.*(\d\d)$/, 'Test $1')}`} />
                            {causes.length === 0 ? (
                                <div style={{ border: `1px solid ${GREEN}55`, background: '#F0FDF9', borderRadius: '10px', padding: '14px 16px', fontSize: '12.5px', color: '#065F46', lineHeight: 1.8 }}>
                                    現時点のデータからは、突出した主因が検出されなかった。失点が型に偏らず薄く散っている状態で、これは「弱点を潰す」より「総量を積む」フェーズにいることを意味する。
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {causes.map((c, i) => (
                                        <div key={c.key} style={{ border: `1px solid ${i === 0 ? RED : LINE}`, borderLeft: `4px solid ${i === 0 ? RED : GOLD}`, borderRadius: '10px', padding: '12px 14px', background: '#fff' }}>
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                                                <span style={{ fontSize: '11px', fontWeight: 900, color: i === 0 ? RED : DEEPGOLD, letterSpacing: '1px' }}>{i === 0 ? '主因' : `第${i + 1}因`}</span>
                                                <span style={{ fontSize: '14px', fontWeight: 900, color: INK }}>{c.title}</span>
                                            </div>
                                            <ul style={{ margin: '7px 0 0', paddingLeft: '18px' }}>
                                                {c.evidence.map((e, j) => (
                                                    <li key={j} style={{ fontSize: '12px', color: '#44403C', lineHeight: 1.8 }}>{e}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {primary.time.readingSec == null && primary.self.at75No == null && primary.self.totalMin == null && (
                                <p style={{ margin: '10px 0 0', fontSize: '11px', color: AMBER, lineHeight: 1.8 }}>
                                    注意: この回には時間の情報が無いため、上の診断は知識面に限られる。上の検査結果カードで「75分時点のNo.」と「解き切るまでの時間」を申告すると、時間の診断と本番想定スコアが出る。
                                </p>
                            )}
                        </section>

                        {/* ===== 4. スコア推定と到達予測 ===== */}
                        <section style={{ marginTop: '30px' }}>
                            <SectionHead no="IV" title="スコア推定と到達予測" sub="換算は当サービスの推定。公式の換算ではない" />
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {est && (
                                    <div style={{ flex: 1, minWidth: '220px', border: `1px solid ${LINE}`, borderRadius: '10px', padding: '14px 16px' }}>
                                        <div style={{ fontSize: '10px', fontWeight: 800, color: SUB, letterSpacing: '1px', textAlign: 'center' }}>推定スコア (この模試の素点から)</div>
                                        {/* 実力 = 時間無制限で全問解いた正答。本番想定 = 75分時点以降を塗り絵扱いで再計算 */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px' }}>
                                                <span style={{ fontSize: '11px', fontWeight: 800, color: DEEPGREEN }}>実力 (時間無制限)</span>
                                                <span style={{ fontSize: '20px', fontWeight: 900, color: INK }}>
                                                    {est.real.total != null
                                                        ? <>{Math.max(10, est.real.total - est.real.band)}<span style={{ fontSize: '12px', color: SUB }}>〜</span>{Math.min(990, est.real.total + est.real.band)}</>
                                                        : <>R 約{est.real.r}</>}
                                                </span>
                                            </div>
                                            {est.sim && primary.examSim && (
                                                <>
                                                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px' }}>
                                                        <span style={{ fontSize: '11px', fontWeight: 800, color: AMBER }}>本番想定 (75分制限)</span>
                                                        <span style={{ fontSize: '20px', fontWeight: 900, color: INK }}>
                                                            {est.sim.total != null
                                                                ? <>{Math.max(10, est.sim.total - est.sim.band)}<span style={{ fontSize: '12px', color: SUB }}>〜</span>{Math.min(990, est.sim.total + est.sim.band)}</>
                                                                : <>R 約{est.sim.r}</>}
                                                        </span>
                                                    </div>
                                                    <div style={{ fontSize: '11.5px', color: RED, fontWeight: 700, textAlign: 'right' }}>
                                                        時間だけで約 {Math.max(0, est.real.r - est.sim.r)} 点失っている (R)
                                                    </div>
                                                </>
                                            )}
                                            {!primary.examSim && (
                                                <div style={{ fontSize: '10.5px', color: SUB, lineHeight: 1.6 }}>
                                                    「75分時点のNo.」を申告すると、本番想定スコアと「時間で失っている点」がここに出る。
                                                </div>
                                            )}
                                            {est.real.total == null && (
                                                <div style={{ fontSize: '10.5px', color: SUB }}>リーディングのみ。総合はリスニングを解くと出る</div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div style={{ flex: 1.4, minWidth: '240px', border: `1px solid ${LINE}`, borderRadius: '10px', padding: '14px 16px' }}>
                                    <div style={{ fontSize: '10px', fontWeight: 800, color: SUB, letterSpacing: '1px' }}>目標 {intake.targetScore} までの見立て</div>
                                    {proj.verdict === 'no-base' ? (
                                        <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#44403C', lineHeight: 1.8 }}>
                                            現在地が分からないので予測できない。問診票に公式スコアを入れるか、フル模試を1回解く。
                                        </p>
                                    ) : proj.verdict === 'no-date' ? (
                                        <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#44403C', lineHeight: 1.8 }}>
                                            目標まで概算 <b>{proj.hoursNeeded} 時間</b>の学習が必要 (帯が上がるほど1点が重くなる係数で計算)。
                                            週 {proj.weeklyHours} 時間ペースなら約 <b>{proj.hoursNeeded != null && proj.weeklyHours > 0 ? Math.ceil(proj.hoursNeeded / proj.weeklyHours) : '--'} 週間</b>。
                                            受験日を入れると判定まで出す。
                                        </p>
                                    ) : (
                                        <div style={{ marginTop: '6px' }}>
                                            <div style={{
                                                display: 'inline-block', fontSize: '13px', fontWeight: 900, borderRadius: '6px', padding: '4px 12px',
                                                color: proj.verdict === 'reachable' ? DEEPGREEN : proj.verdict === 'tight' ? AMBER : '#fff',
                                                background: proj.verdict === 'reachable' ? '#ECFDF5' : proj.verdict === 'tight' ? '#FFFBEB' : RED,
                                                border: `1px solid ${proj.verdict === 'reachable' ? GREEN : proj.verdict === 'tight' ? '#F59E0B' : RED}`,
                                            }}>
                                                {proj.verdict === 'reachable' ? '届く見込み' : proj.verdict === 'tight' ? 'ぎりぎり' : 'このままでは届かない'}
                                            </div>
                                            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#44403C', lineHeight: 1.8 }}>
                                                残り {proj.weeksLeft} 週 x 週 {proj.weeklyHours} 時間 = <b>{proj.totalHours} 時間</b>。
                                                必要量の概算は <b>{proj.hoursNeeded} 時間</b>。
                                                このペースの期待上げ幅は約 <b>{proj.expectedGain} 点</b>。
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <p style={{ margin: '10px 0 0', fontSize: '10.5px', color: SUB, lineHeight: 1.7 }}>
                                時間の係数: 100点上げるのに 250〜500 時間 (現在地の帯で変わる) を使った概算。個人差で前後する。数字を盛る理由が無いので、控えめ側に倒してある。
                            </p>
                        </section>

                        {/* ===== 5. 処方箋 ===== */}
                        <section style={{ marginTop: '30px' }}>
                            <SectionHead no="V" title="処方箋" sub="上の主因に対応する順で並ぶ。全部やろうとしないこと" />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {prescriptions.map((p, i) => (
                                    <div key={i} style={{ border: `1px solid ${GREEN}55`, borderRadius: '10px', padding: '13px 15px', background: '#FAFDFB' }}>
                                        <div style={{ fontSize: '13px', fontWeight: 900, color: DEEPGREEN }}>Rx {i + 1} ・ {p.title}</div>
                                        <p style={{ margin: '6px 0 0', fontSize: '12.5px', color: '#37332F', lineHeight: 1.9 }}>{p.body}</p>
                                        {p.link && (
                                            <Link href={p.link.href} style={{ display: 'inline-block', marginTop: '8px', fontSize: '11.5px', fontWeight: 800, color: DEEPGREEN, textDecoration: 'none', borderBottom: `1px solid ${GREEN}` }}>
                                                {p.link.label}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* ===== 6. 院長所感 ===== */}
                        <section style={{ marginTop: '30px' }}>
                            <SectionHead no="VI" title="所感" />
                            <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', padding: '16px 18px', background: '#FCFBF7' }}>
                                <p style={{ margin: 0, fontSize: '13px', color: '#37332F', lineHeight: 2.0 }}>{shokan}</p>
                                <p style={{ margin: '10px 0 0', fontSize: '11px', color: SUB, lineHeight: 1.8 }}>
                                    再診: 処方を2〜3週間回したら、まだ解いていない回を本番と同じ時間で通す。
                                    診断が変わったかどうかが、勉強が効いたかどうかの答えになる。
                                    {reports.length < TOEIC_TESTS.length && (
                                        <> 未受験: {TOEIC_TESTS.filter(x => !reports.some(r => r.testId === x.id)).map(x => (
                                            <Link key={x.n} href={x.href} style={{ color: DEEPGOLD, fontWeight: 800, textDecoration: 'none', marginRight: '6px' }}>Test {x.n}</Link>
                                        ))}</>
                                    )}
                                </p>
                            </div>
                        </section>
                    </>
                )}

                {/* ===== 免責 ===== */}
                <div style={{ marginTop: '34px', background: '#FAF8F2', border: `1px solid ${LINE}`, borderRadius: '10px', padding: '13px 15px' }}>
                    <p style={{ margin: 0, fontSize: '10px', lineHeight: 1.8, color: SUB }}>
                        本診断は非公式・自主制作のオリジナル模試 (SCOREPASS) の解答データに基づく学習支援であり、TOEIC&reg; の実施団体 ETS / IIBC とは一切関係ありません。スコア換算・到達予測はすべて当サービスの推定であり、公式スコアを保証するものではありません。TOEIC は ETS の登録商標です。
                    </p>
                </div>
            </div>
        </div>
    );
}
