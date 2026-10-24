// The Ballpark Times — MLB専門紙。
// Sheet 1 (英語のみ): 前日の全試合を「誰が活躍したか」の2〜3文リキャップで読ませる。
//   順位/リーダーは "Around the League" で軽く（週次感覚）。
// Sheet 2 (日本語): リード試合の対訳 + リキャップ英語の読み方ガイド。
// データは MLB Stats API を Server Component で直接取得 (boxscore で活躍選手を抽出)。

import { RECAP_PHRASES } from '@/data/english/mlb-vocab';
import PrintButton from './PrintButton';

export const revalidate = 1800;

const PAPER = '#FBFAF7';
const INK = '#1A1A1A';
const MUTED = '#57534E';
const RULE = '#1A1A1A';
const KICKER = '#7A1F1F';
const NAVY = '#0F2A4A';
const GOLD = '#B8941E';
const SERIF = "Georgia, 'Times New Roman', 'Noto Serif JP', serif";
const JPF = "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', serif";

const DIVISIONS: Record<number, { name: string; order: number }> = {
    201: { name: 'AL East', order: 0 }, 202: { name: 'AL Central', order: 1 }, 200: { name: 'AL West', order: 2 },
    204: { name: 'NL East', order: 3 }, 205: { name: 'NL Central', order: 4 }, 203: { name: 'NL West', order: 5 },
};

/* ---------- date helpers (America/New_York) ---------- */
function etDate(offsetDays = 0): string {
    const etStr = new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
    const [y, m, d] = etStr.split('-').map(Number);
    const base = new Date(Date.UTC(y, m - 1, d));
    base.setUTCDate(base.getUTCDate() + offsetDays);
    return base.toISOString().slice(0, 10);
}
function longDate(iso: string): string {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}
async function getJSON(url: string): Promise<any | null> {
    try { const r = await fetch(url, { next: { revalidate: 1800 } }); return r.ok ? await r.json() : null; } catch { return null; }
}

/* ---------- recap building ---------- */
const nick = (t: any) => t?.teamName || t?.name || '—';
const ipTrim = (ip: string) => (ip?.endsWith('.0') ? ip.slice(0, -2) : ip);
const beatVerb = (m: number) => (m >= 7 ? 'routed' : m >= 4 ? 'downed' : m === 1 ? 'edged' : 'beat');
const beatVerbJa = (m: number) => (m >= 7 ? '圧勝' : m >= 4 ? '快勝' : m === 1 ? '競り勝ち' : '勝利');

function starHitter(boxTeam: any) {
    const players = Object.values(boxTeam?.players || {}) as any[];
    const bats = players
        .filter(p => p.stats?.batting && (p.stats.batting.atBats > 0 || p.stats.batting.rbi > 0))
        .map(p => ({ name: p.person.fullName, hr: p.stats.batting.homeRuns || 0, rbi: p.stats.batting.rbi || 0, h: p.stats.batting.hits || 0, ab: p.stats.batting.atBats || 0 }))
        .sort((a, b) => (b.hr - a.hr) || (b.rbi - a.rbi) || (b.h - a.h));
    return bats[0] || null;
}
function pitcherLine(boxTeam: any, personId?: number) {
    if (!personId) return null;
    const p = boxTeam?.players?.['ID' + personId];
    const s = p?.stats?.pitching;
    if (!s || !s.inningsPitched) return null;
    return { name: p.person.fullName, ip: String(s.inningsPitched), k: s.strikeOuts || 0, er: s.earnedRuns ?? 0 };
}
function hitterClause(h: any, wNick: string) {
    if (!h) return `The ${wNick} did just enough`;
    if (h.hr >= 2) return `${h.name} homered ${h.hr >= 3 ? `${h.hr} times` : 'twice'} and drove in ${h.rbi}`;
    if (h.hr === 1 && h.rbi >= 2) return `${h.name} homered and drove in ${h.rbi}`;
    if (h.hr === 1) return `${h.name} homered`;
    if (h.rbi >= 3) return `${h.name} drove in ${h.rbi}`;
    if (h.h >= 3) return `${h.name} went ${h.h}-for-${h.ab}`;
    if (h.rbi >= 1) return `${h.name} knocked in ${h.rbi}`;
    return `The ${wNick} scratched out the runs`;
}
function hitterClauseJa(h: any, wNick: string) {
    if (!h) return `${wNick}打線がしぶとく得点`;
    if (h.hr >= 2) return `${h.name}が${h.hr}本塁打${h.rbi}打点の大暴れ`;
    if (h.hr === 1 && h.rbi >= 2) return `${h.name}が本塁打を含む${h.rbi}打点`;
    if (h.hr === 1) return `${h.name}に一発が飛び出し`;
    if (h.rbi >= 3) return `${h.name}が${h.rbi}打点の活躍`;
    if (h.h >= 3) return `${h.name}が${h.ab}打数${h.h}安打`;
    if (h.rbi >= 1) return `${h.name}が${h.rbi}打点`;
    return `${wNick}打線が小刻みに加点`;
}

interface Recap { headline: string; en: string; ja: string; margin: number; hasStar: boolean; }

function makeRecap(game: any, box: any): Recap {
    const awayWin = game.teams.away.isWinner;
    const wSide = awayWin ? 'away' : 'home', lSide = awayWin ? 'home' : 'away';
    const wNick = nick(game.teams[wSide].team), lNick = nick(game.teams[lSide].team);
    const wScore = game.teams[wSide].score ?? 0, lScore = game.teams[lSide].score ?? 0;
    const margin = wScore - lScore;
    const boxW = box?.teams?.[wSide];
    const hit = boxW ? starHitter(boxW) : null;
    const wpRaw = boxW ? pitcherLine(boxW, game.decisions?.winner?.id) : null;
    // Only feature the winning pitcher when it's a meaningful line (a real start or a dominant relief outing).
    const wp = wpRaw && (parseFloat(wpRaw.ip) >= 4 || (wpRaw.er === 0 && wpRaw.k >= 5)) ? wpRaw : null;

    // English
    let en = `${hitterClause(hit, wNick)} as the ${wNick} ${beatVerb(margin)} the ${lNick}, ${wScore}–${lScore}.`;
    if (wp) {
        const ip = ipTrim(wp.ip), one = ip === '1';
        en += wp.er === 0
            ? ` ${wp.name} earned the win with ${ip} scoreless inning${one ? '' : 's'} and ${wp.k} strikeout${wp.k === 1 ? '' : 's'}.`
            : ` ${wp.name} earned the win, striking out ${wp.k} over ${ip} inning${one ? '' : 's'}.`;
    } else if (game.decisions?.winner) {
        en += ` ${game.decisions.winner.fullName} earned the win.`;
    }
    if (lScore === 0) en += ` The ${lNick} were shut out.`;

    // Japanese (built from the same data)
    let ja = `${wNick}が${lNick}を${wScore}-${lScore}で${beatVerbJa(margin)}。${hitterClauseJa(hit, wNick)}。`;
    if (wp) {
        const ip = ipTrim(wp.ip);
        ja += `勝ち投手の${wp.name}は${ip}回を${wp.er === 0 ? '無失点' : `${wp.er}失点`}、${wp.k}奪三振。`;
    }
    if (lScore === 0) ja += `${lNick}は完封負け。`;

    const headline = hit && hit.hr >= 1
        ? `${hit.name} Powers ${wNick} Past ${lNick}`
        : `${wNick} ${beatVerb(margin) === 'routed' ? 'Rout' : beatVerb(margin) === 'downed' ? 'Down' : beatVerb(margin) === 'edged' ? 'Edge' : 'Beat'} ${lNick}`;

    return { headline, en, ja, margin, hasStar: !!(hit && (hit.hr >= 1 || hit.rbi >= 3)) };
}

export default async function BallparkTimesPage() {
    const today = etDate(0), yesterday = etDate(-1);
    const season = Number(today.slice(0, 4));

    const sched = await getJSON(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${yesterday}&hydrate=team,linescore,decisions`);
    const finals: any[] = [];
    for (const dd of (sched?.dates || [])) for (const g of (dd.games || [])) if (g.status?.abstractGameState === 'Final') finals.push(g);

    // boxscores in parallel
    const boxes = await Promise.all(finals.map(g => getJSON(`https://statsapi.mlb.com/api/v1/game/${g.gamePk}/boxscore`)));
    const recaps = finals.map((g, i) => makeRecap(g, boxes[i]));
    // lead = the most eventful: prefer a star performance, then biggest margin
    const order = recaps.map((r, i) => ({ r, i })).sort((a, b) => (Number(b.r.hasStar) - Number(a.r.hasStar)) || (b.r.margin - a.r.margin));
    const leadIdx = order.length ? order[0].i : -1;
    const lead = leadIdx >= 0 ? recaps[leadIdx] : null;
    const others = recaps.filter((_, i) => i !== leadIdx);

    // Around the League (light / weekly-feel)
    const [standings, hrLead, eraLead] = await Promise.all([
        getJSON(`https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&season=${season}&standingsTypes=regularSeason`),
        getJSON(`https://statsapi.mlb.com/api/v1/stats/leaders?leaderCategories=homeRuns&sportId=1&season=${season}&limit=1&statGroup=hitting`),
        getJSON(`https://statsapi.mlb.com/api/v1/stats/leaders?leaderCategories=earnedRunAverage&sportId=1&season=${season}&limit=1&statGroup=pitching`),
    ]);
    const divLeaders = (standings?.records || [])
        .filter((r: any) => DIVISIONS[r.division?.id])
        .sort((a: any, b: any) => DIVISIONS[a.division.id].order - DIVISIONS[b.division.id].order)
        .map((r: any) => { const t = r.teamRecords?.[0]; return { div: DIVISIONS[r.division.id].name, team: nick(t?.team) || t?.team?.name, rec: `${t?.wins}-${t?.losses}` }; });
    const hrL = hrLead?.leagueLeaders?.[0]?.leaders?.[0];
    const eraL = eraLead?.leagueLeaders?.[0]?.leaders?.[0];

    const apiOk = finals.length > 0;

    const kicker: React.CSSProperties = { fontFamily: SERIF, fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', color: KICKER, textTransform: 'uppercase', marginBottom: '6px' };
    const sheet: React.CSSProperties = { width: '820px', maxWidth: 'calc(100% - 24px)', margin: '24px auto', backgroundColor: PAPER, boxShadow: '0 8px 30px rgba(0,0,0,0.18)', padding: '22px 30px 26px', boxSizing: 'border-box', color: INK };
    const recapP: React.CSSProperties = { fontFamily: SERIF, fontSize: '10.5px', lineHeight: 1.5, color: INK, margin: 0 };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#E7E5E4', padding: '0 0 60px' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    @page { size: A4 portrait; margin: 10mm; }
                    html, body { background: #fff !important; }
                    body * { visibility: hidden !important; }
                    .a4-print, .a4-print * { visibility: visible !important; }
                    .a4-print { box-shadow: none !important; margin: 0 auto !important; width: 100% !important; }
                    #mlb-notes { break-before: page; }
                    .no-print { display: none !important; }
                }
            `}} />

            {/* Toolbar */}
            <div className="no-print" style={{ position: 'sticky', top: 0, zIndex: 5, backgroundColor: '#0F2A4A', color: '#fff', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '13px', letterSpacing: '0.5px' }}>
                    The Ballpark Times — {longDate(today)}
                    <span style={{ opacity: 0.7, marginLeft: '8px', fontSize: '11px' }}>印刷すると 新聞 + 日本語解説 の2枚 · データ: MLB Stats API</span>
                </div>
                <PrintButton />
            </div>

            {/* ===================== SHEET 1 — RECAP PAPER (English) ===================== */}
            <div id="mlb-sheet" className="a4-print" style={sheet}>
                <div style={{ borderTop: `3px solid ${RULE}`, paddingTop: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: SERIF, fontSize: '8.5px', letterSpacing: '1px', color: MUTED, textTransform: 'uppercase' }}>
                        <span>Major League Baseball · Nightly</span>
                        <span>Who Did What, and How They Say It</span>
                    </div>
                </div>
                <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(30px, 6vw, 50px)', fontWeight: 700, textAlign: 'center', margin: '4px 0 2px', letterSpacing: '-1px', lineHeight: 1, whiteSpace: 'nowrap' }}>The Ballpark Times</h1>
                <div style={{ textAlign: 'center', fontFamily: SERIF, fontSize: '9px', color: MUTED, fontStyle: 'italic', marginBottom: '6px' }}>Last night, in the language of the game</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${RULE}`, borderBottom: `3px double ${RULE}`, padding: '4px 0', fontFamily: SERIF, fontSize: '9px', color: INK }}>
                    <span>Games of {longDate(yesterday)}</span>
                    <span style={{ fontStyle: 'italic', color: MUTED }}>NULLA DIES SINE PILA — no day without baseball</span>
                    <span>{finals.length} games</span>
                </div>

                {!apiOk ? (
                    <div style={{ fontFamily: JPF, fontSize: '12px', color: MUTED, textAlign: 'center', padding: '40px 0' }}>
                        現在ライブデータを取得できませんでした。時間をおいて再読み込みしてください。
                    </div>
                ) : (
                    <>
                        {/* Lead recap */}
                        {lead && (
                            <div style={{ marginTop: '10px' }}>
                                <div style={kicker}>Top Performance of the Night</div>
                                <h2 style={{ fontFamily: SERIF, fontSize: '26px', fontWeight: 700, lineHeight: 1.03, margin: '0 0 5px', letterSpacing: '-0.5px' }}>{lead.headline}</h2>
                                <p className="nt-just" style={{ ...recapP, fontSize: '11.5px', paddingBottom: '8px', borderBottom: `1px solid ${RULE}` }}>{lead.en}</p>
                            </div>
                        )}

                        {/* Other recaps */}
                        <div style={{ marginTop: '8px' }}>
                            <div style={kicker}>Around the Horn — every game, who starred</div>
                            <div style={{ columnCount: 2, columnGap: '22px', columnRule: `1px solid ${RULE}` }}>
                                {others.map((r, i) => (
                                    <p key={i} style={{ ...recapP, marginBottom: '7px', breakInside: 'avoid' }}>{r.en}</p>
                                ))}
                                {others.length === 0 && <p style={recapP}>No other games last night.</p>}
                            </div>
                        </div>

                        {/* Around the League — light */}
                        <div style={{ marginTop: '10px', border: `1.5px solid ${RULE}`, padding: '8px 12px' }}>
                            <div style={{ fontFamily: SERIF, fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', textAlign: 'center', color: INK, borderBottom: `1px solid ${RULE}`, paddingBottom: '3px', marginBottom: '5px' }}>
                                Around the League — where things stand
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px 18px' }}>
                                {divLeaders.map((d: any, i: number) => (
                                    <div key={i} style={{ fontFamily: SERIF, fontSize: '9px', display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: MUTED }}>{d.div}</span>
                                        <span><strong>{d.team}</strong> {d.rec}</span>
                                    </div>
                                ))}
                            </div>
                            {(hrL || eraL) && (
                                <div style={{ fontFamily: SERIF, fontSize: '9px', textAlign: 'center', color: INK, marginTop: '5px', paddingTop: '4px', borderTop: `1px dotted ${RULE}` }}>
                                    {hrL && <span>HR leader — <strong>{hrL.person.fullName}</strong> ({hrL.value})</span>}
                                    {hrL && eraL && <span style={{ color: MUTED }}> · </span>}
                                    {eraL && <span>ERA leader — <strong>{eraL.person.fullName}</strong> ({eraL.value})</span>}
                                </div>
                            )}
                        </div>
                    </>
                )}

                <div style={{ textAlign: 'center', fontFamily: SERIF, fontSize: '8px', color: MUTED, letterSpacing: '2px', marginTop: '10px', borderTop: `2px solid ${RULE}`, paddingTop: '5px', textTransform: 'uppercase' }}>
                    The Ballpark Times · Read the recap, not just the score
                </div>
            </div>

            {/* ===================== SHEET 2 — 解説 (Japanese) ===================== */}
            <div id="mlb-notes" className="a4-print" style={sheet}>
                <div style={{ borderTop: `3px solid ${RULE}`, paddingTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: SERIF, fontSize: '8.5px', letterSpacing: '1px', color: MUTED, textTransform: 'uppercase' }}>The Ballpark Times · Study Notes</span>
                    <span style={{ fontFamily: SERIF, fontSize: '8.5px', color: MUTED }}>{longDate(yesterday)}</span>
                </div>
                <h1 style={{ fontFamily: JPF, fontSize: '30px', fontWeight: 700, textAlign: 'center', margin: '6px 0 2px', letterSpacing: '2px' }}>今日の解説</h1>
                <div style={{ textAlign: 'center', fontFamily: JPF, fontSize: '10px', color: MUTED, marginBottom: '8px', paddingBottom: '8px', borderBottom: `3px double ${RULE}` }}>
                    英字面(1枚目)を読んでから、ここで答え合わせ。リキャップの型を覚えれば毎日読める。
                </div>

                {/* リード試合の対訳 */}
                <SectionTitle no="1" en="THE LEAD, TRANSLATED" ja="リード記事の対訳" />
                {lead ? (
                    <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontFamily: SERIF, fontSize: '10.5px', fontStyle: 'italic', color: INK, lineHeight: 1.5, marginBottom: '4px', paddingLeft: '10px', borderLeft: `3px solid ${GOLD}` }}>{lead.en}</div>
                        <div style={{ fontFamily: JPF, fontSize: '11px', color: INK, lineHeight: 1.6 }}>{lead.ja}</div>
                    </div>
                ) : <div style={{ fontFamily: JPF, fontSize: '10px', color: MUTED, marginBottom: '12px' }}>本日のリード試合はありません。</div>}

                {/* 読み方ガイド */}
                <SectionTitle no="2" en="HOW TO READ A RECAP" ja="リキャップ英語の読み方 — 毎回この型" />
                <div style={{ columnCount: 2, columnGap: '20px' }}>
                    {RECAP_PHRASES.map((p, i) => (
                        <div key={i} style={{ marginBottom: '6px', breakInside: 'avoid' }}>
                            <div style={{ fontFamily: SERIF, fontSize: '10.5px', fontWeight: 700, fontStyle: 'italic', color: INK }}>{p.phrase}</div>
                            <div style={{ fontFamily: JPF, fontSize: '9.5px', color: INK, lineHeight: 1.45 }}>{p.ja}</div>
                            <div style={{ fontFamily: SERIF, fontSize: '8.5px', fontStyle: 'italic', color: MUTED, lineHeight: 1.3 }}>“{p.example}”</div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', fontFamily: JPF, fontSize: '9px', color: MUTED, letterSpacing: '1px', marginTop: '10px', borderTop: `2px solid ${RULE}`, paddingTop: '5px' }}>
                    スコアを見るな、記事を読め。誰がどう活躍したかを英語で言えるように。
                </div>
            </div>
        </div>
    );
}

function SectionTitle({ no, en, ja }: { no: string; en: string; ja: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 6px', borderBottom: `2px solid ${INK}`, paddingBottom: '3px' }}>
            <span style={{ fontFamily: SERIF, fontSize: '12px', fontWeight: 700, color: '#fff', backgroundColor: INK, width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>{no}</span>
            <span style={{ fontFamily: SERIF, fontSize: '11px', fontWeight: 700, letterSpacing: '2px', color: KICKER }}>{en}</span>
            <span style={{ fontFamily: JPF, fontSize: '11px', fontWeight: 700, color: INK }}>{ja}</span>
        </div>
    );
}
