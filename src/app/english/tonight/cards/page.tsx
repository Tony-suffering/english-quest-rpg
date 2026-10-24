'use client';

// 「今夜も、通じない。」note貼り付け用カード書き出しページ。
// dmm-show.ts の各夜を、noteに貼るセクション別カード(1200×675 PNG)に変換する。
// 扉 / コールドオープン / ボケ(1枚ずつ) / ベストプレー / 持ち帰り3つ / 次回予告。
// カードHTMLは「インラインstyleのみの文字列」で組み、画面プレビューと
// SVG foreignObject 経由の PNG 書き出し(2400×1350)で同じ文字列を使う。
// 外部CSS/画像に依存しないこと(foreignObject内では効かない)。
// note記事の地の文はカードの中身を繰り返さない(仕組みは claudedocs/note-tonight-*.md 参照)。

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { showEpisodes, SHOW_META, type ShowEpisode, mergeEpisodes, latestNight } from '@/data/english/dmm-show';
import { getSagaStateAfter, getQuestByNight, SAGA_META } from '@/data/english/tonio-saga';

const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";
const SANS = "'Helvetica Neue', Arial, 'Yu Gothic', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif";

const W = 1200;
const H = 675;

// 画面/カード共通の色 (note貼り付けで馴染む上品系)
const CREAM = '#FBF7EC';
const INK = '#1C1710';
const MUTED = '#6E6558';
const GOLD = '#A8891C';
const LINE = '#E3DAC4';
const DARK = '#141210';
const RED = '#B03A2E';

function esc(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// =====================================================================
// カードHTML (すべて 1200×675, インラインstyleのみ)
// =====================================================================

function creamShell(inner: string): string {
    return `<div style="width:${W}px;height:${H}px;background-color:${CREAM};box-sizing:border-box;position:relative;font-family:${SANS};overflow:hidden;border:1px solid ${LINE}">`
        + `<div style="position:absolute;inset:22px;border:1px solid ${LINE}"></div>`
        + `<div style="position:absolute;left:0;right:0;top:0;height:6px;background-color:${GOLD};opacity:0.85"></div>`
        + inner
        + `</div>`;
}

function recChip(clip?: string): string {
    if (!clip) return '';
    return `<span style="display:inline-flex;align-items:center;gap:8px;font-size:19px;font-weight:bold;letter-spacing:1px;color:#fff;background-color:#B91C1C;padding:4px 16px;border-radius:999px;margin-left:18px;vertical-align:middle"><span style="width:9px;height:9px;border-radius:999px;background-color:#fff"></span>REC ${esc(clip)}</span>`;
}

function label(text: string): string {
    return `<div style="font-size:22px;letter-spacing:6px;color:${GOLD};font-weight:bold">${esc(text)}</div>`;
}

// 扉 (タイトルカード)
function titleCard(ep: ShowEpisode): string {
    return creamShell(
        `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:70px">`
        + `<div style="font-size:24px;letter-spacing:10px;color:${MUTED}">${esc(SHOW_META.title)}</div>`
        + `<div style="font-size:20px;letter-spacing:4px;color:${GOLD};margin-top:10px">${esc(SHOW_META.subtitle)}</div>`
        + `<div style="width:64px;height:2px;background-color:${GOLD};margin:36px auto"></div>`
        + `<div style="font-size:30px;color:${MUTED};font-family:${SERIF}">第${ep.night}夜</div>`
        + `<div style="font-size:86px;font-weight:bold;color:${INK};font-family:${SERIF};margin-top:8px;line-height:1.2">${esc(ep.title)}</div>`
        + `<div style="font-size:30px;color:${MUTED};margin-top:34px;font-family:${SERIF}">— ${esc(ep.catchcopy)}</div>`
        + `</div>`
    );
}

// コールドオープン
function coldOpenCard(ep: ShowEpisode): string {
    return creamShell(
        `<div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:80px 100px">`
        + `<div>` + label('コールドオープン — 今夜の第一声').replace('</div>', recChip(ep.coldOpen.clip) + '</div>') + `</div>`
        + `<div style="font-size:54px;font-weight:bold;color:${INK};font-family:${SERIF};line-height:1.35;margin-top:36px">“${esc(ep.coldOpen.en)}”</div>`
        + `<div style="font-size:28px;color:${MUTED};margin-top:28px">${esc(ep.coldOpen.ja)}</div>`
        + `<div style="font-size:26px;color:${INK};margin-top:26px;line-height:1.7;border-top:1px solid ${LINE};padding-top:24px">${esc(ep.coldOpen.note)}</div>`
        + `</div>`
    );
}

// ボケ1本 (ボケ → 直訳 → ツッコミ → 正解)
function gagCard(ep: ShowEpisode, gi: number): string {
    const g = ep.gags[gi];
    return creamShell(
        `<div style="position:absolute;inset:0;display:flex;flex-direction:column;padding:60px 90px">`
        + `<div style="display:flex;justify-content:space-between;align-items:baseline">`
        + label(`本日のボケ その${gi + 1}`)
        + `<div style="font-size:22px;color:${MUTED}">${esc(g.scene)}${recChip(g.clip)}</div>`
        + `</div>`
        + `<div style="font-size:50px;font-weight:bold;color:${INK};font-family:${SERIF};line-height:1.3;margin-top:26px">“${esc(g.boke)}”</div>`
        + `<div style="font-size:24px;color:${RED};margin-top:12px">${esc(g.bokeJa)}</div>`
        + `<div style="font-size:26px;color:${INK};line-height:1.65;margin-top:22px">${esc(g.tsukkomi)}</div>`
        + `<div style="margin-top:auto;background-color:#FFFFFF;border:1px solid ${LINE};border-left:6px solid ${GOLD};padding:22px 28px">`
        + `<div style="font-size:19px;letter-spacing:4px;color:${GOLD};font-weight:bold">で、正解は</div>`
        + `<div style="font-size:30px;font-weight:bold;color:${INK};font-family:${SERIF};margin-top:8px">${esc(g.correct)}</div>`
        + `<div style="font-size:21px;color:${MUTED};margin-top:6px">${esc(g.correctJa)} — ${esc(g.point)}</div>`
        + `</div>`
        + `</div>`
    );
}

// ベストプレー
function bestPlayCard(ep: ShowEpisode): string {
    return creamShell(
        `<div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:80px 110px">`
        + label('今夜のベストプレー — たまには決める').replace('</div>', recChip(ep.bestPlay.clip) + '</div>')
        + `<div style="font-size:64px;font-weight:bold;color:${INK};font-family:${SERIF};line-height:1.3;margin-top:38px">“${esc(ep.bestPlay.en)}”</div>`
        + `<div style="font-size:30px;color:${MUTED};margin-top:30px">${esc(ep.bestPlay.ja)}</div>`
        + `<div style="font-size:26px;color:${INK};margin-top:24px;line-height:1.7;border-top:1px solid ${LINE};padding-top:24px">${esc(ep.bestPlay.note)}</div>`
        + `</div>`
    );
}

// 持ち帰り英語3つ (3カラム)
function takeawaysCard(ep: ShowEpisode): string {
    const cols = ep.takeaways.map(t =>
        `<div style="flex:1;border-top:3px solid ${INK};padding:26px 26px 0 26px;background-color:#FFFFFF;border-bottom:1px solid ${LINE};border-left:1px solid ${LINE};border-right:1px solid ${LINE}">`
        + `<div style="font-size:31px;font-weight:bold;color:${INK};font-family:${SERIF};line-height:1.35">${esc(t.en)}</div>`
        + `<div style="font-size:23px;color:${MUTED};margin-top:14px">${esc(t.ja)}</div>`
        + `<div style="font-size:21px;color:${INK};margin-top:14px;line-height:1.6;padding-bottom:${t.clip ? '12px' : '24px'}">${esc(t.note)}</div>`
        + (t.clip ? `<div style="padding-bottom:20px">${recChip(t.clip).replace('margin-left:18px;', '')}</div>` : '')
        + `</div>`
    ).join('<div style="width:24px"></div>');
    return creamShell(
        `<div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:70px 80px">`
        + label('持ち帰り英語 — 今夜の3つだけ')
        + `<div style="display:flex;margin-top:34px">${cols}</div>`
        + `</div>`
    );
}

// ステータス画面 (RPG風ダーク。キャラ画像は dataURI で埋め込み)
function statusCard(ep: ShowEpisode, art: string | null): string {
    const st = getSagaStateAfter(ep.night);
    const expPct = Math.min(100, Math.round((st.totalExp / st.nextLevelExp) * 100));
    const artBlock = art
        ? `<div style="width:340px;flex-shrink:0;display:flex;align-items:center;justify-content:center"><img src="${art}" style="max-width:320px;max-height:480px;border:2px solid ${GOLD};border-radius:12px" /></div>`
        : `<div style="width:340px;flex-shrink:0"></div>`;
    const rows = [
        ['LEVEL', `Lv. ${st.level}`],
        ['EXP', `${st.totalExp} / 次のレベルまで ${Math.max(0, st.nextLevelExp - st.totalExp)}`],
        ['習得スキル', `${st.skills.length} (最新: ${st.skills[st.skills.length - 1]?.name ?? '—'})`],
        ['モンスター図鑑', `${st.monsters.length}体 (捏造語)`],
        ['踏破ダンジョン', `${st.quest.night}夜`],
    ].map(([k, v]) =>
        `<div style="display:flex;justify-content:space-between;border-bottom:1px solid #3A342B;padding:13px 0">`
        + `<div style="font-size:22px;letter-spacing:4px;color:${GOLD}">${esc(k)}</div>`
        + `<div style="font-size:24px;color:#F2EDE2;font-weight:bold">${esc(v)}</div>`
        + `</div>`
    ).join('');
    return `<div style="width:${W}px;height:${H}px;background-color:${DARK};box-sizing:border-box;position:relative;font-family:${SANS};overflow:hidden">`
        + `<div style="position:absolute;inset:22px;border:1px solid #3A342B"></div>`
        + `<div style="position:absolute;inset:0;display:flex;gap:40px;padding:60px 70px">`
        + artBlock
        + `<div style="flex:1;display:flex;flex-direction:column;justify-content:center">`
        + `<div style="font-size:22px;letter-spacing:8px;color:${GOLD};font-weight:bold">ステータス — ${esc(SAGA_META.title)}</div>`
        + `<div style="font-size:44px;color:#F2EDE2;font-family:${SERIF};font-weight:bold;margin-top:14px">とにお <span style="font-size:26px;color:#8A8171">/ ${esc(SAGA_META.hero.cls)}</span></div>`
        + `<div style="margin-top:20px">${rows}</div>`
        + `<div style="margin-top:22px;height:16px;background-color:#2A2620;border-radius:8px;overflow:hidden"><div style="width:${expPct}%;height:16px;background-color:${GOLD}"></div></div>`
        + `<div style="font-size:19px;color:#8A8171;margin-top:16px;line-height:1.6">パーティ勤怠: ${esc(st.party[0].name)} — ${esc(st.quest.partyLog)}</div>`
        + `</div>`
        + `</div>`
        + `</div>`;
}

// クエスト結果 (リザルト画面)
function questResultCard(ep: ShowEpisode, art: string | null): string {
    const q = getQuestByNight(ep.night);
    if (!q) return creamShell(`<div style="padding:100px;font-size:30px">この夜のクエストデータが未登録 (tonio-saga.ts に追加)</div>`);
    const resultLabel = q.result === 'CLEAR' ? 'QUEST CLEAR' : q.result === 'CLEAR_COND' ? 'QUEST CLEAR (条件付き)' : 'QUEST FAILED';
    const resultColor = q.result === 'FAILED' ? RED : GOLD;
    const drops = q.drops.map(d => `<div style="font-size:23px;color:#F2EDE2;padding:6px 0;border-bottom:1px solid #3A342B">・${esc(d)}</div>`).join('');
    const artBlock = art
        ? `<img src="${art}" style="position:absolute;right:52px;bottom:46px;width:190px;border:2px solid #3A342B;border-radius:10px;opacity:0.95" />`
        : '';
    return `<div style="width:${W}px;height:${H}px;background-color:${DARK};box-sizing:border-box;position:relative;font-family:${SANS};overflow:hidden">`
        + `<div style="position:absolute;inset:22px;border:1px solid #3A342B"></div>`
        + `<div style="position:absolute;inset:0;display:flex;flex-direction:column;padding:56px 90px">`
        + `<div style="font-size:44px;letter-spacing:6px;color:${resultColor};font-weight:bold;font-family:${SERIF}">${esc(resultLabel)}</div>`
        + `<div style="font-size:30px;color:#F2EDE2;margin-top:8px">${esc(q.questName)}</div>`
        + `<div style="display:flex;gap:26px;align-items:baseline;margin-top:26px">`
        + `<div style="font-size:38px;color:${GOLD};font-weight:bold">EXP +${q.expGained}</div>`
        + (q.levelUp ? `<div style="font-size:30px;color:#F2EDE2;font-weight:bold;border:2px solid ${GOLD};padding:4px 18px;border-radius:8px">LEVEL UP! → Lv.${q.level}</div>` : `<div style="font-size:22px;color:#8A8171">Lv.${q.level} 維持</div>`)
        + `</div>`
        + `<div style="font-size:19px;color:#8A8171;margin-top:8px">${esc(q.expBreakdown)}</div>`
        + `<div style="font-size:21px;letter-spacing:5px;color:${GOLD};font-weight:bold;margin-top:24px">ドロップ品</div>`
        + `<div style="margin-top:6px;max-width:760px">${drops}</div>`
        + `<div style="margin-top:auto;max-width:820px">`
        + `<div style="font-size:19px;letter-spacing:5px;color:${GOLD};font-weight:bold">NEXT QUEST</div>`
        + `<div style="font-size:24px;color:#F2EDE2;font-family:${SERIF};line-height:1.7;margin-top:8px">${esc(q.nextQuest)}</div>`
        + `</div>`
        + `</div>`
        + artBlock
        + `</div>`;
}

// 次回予告 (ダーク)
function jikaiCard(ep: ShowEpisode): string {
    return `<div style="width:${W}px;height:${H}px;background-color:${DARK};box-sizing:border-box;position:relative;font-family:${SANS};overflow:hidden">`
        + `<div style="position:absolute;inset:22px;border:1px solid #3A342B"></div>`
        + `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:90px 130px">`
        + `<div style="font-size:23px;letter-spacing:8px;color:${GOLD};font-weight:bold">次回予告</div>`
        + `<div style="font-size:38px;color:#F2EDE2;font-family:${SERIF};line-height:2;margin-top:40px">${esc(ep.jikai)}</div>`
        + `<div style="font-size:20px;letter-spacing:6px;color:#8A8171;margin-top:44px">${esc(SHOW_META.title)}</div>`
        + `</div>`
        + `</div>`;
}

interface CardDef {
    key: string;
    name: string;
    html: string;
    filename: string;
}

function buildCards(ep: ShowEpisode, art: string | null): CardDef[] {
    const n = String(ep.night).padStart(2, '0');
    const cards: CardDef[] = [
        { key: 'title', name: '扉', html: titleCard(ep), filename: `tonight-${n}-0-title.png` },
        { key: 'status', name: 'ステータス画面 (記事冒頭に)', html: statusCard(ep, art), filename: `tonight-${n}-0b-status.png` },
        { key: 'coldopen', name: 'コールドオープン', html: coldOpenCard(ep), filename: `tonight-${n}-1-coldopen.png` },
    ];
    ep.gags.forEach((_, i) => {
        cards.push({ key: `gag${i}`, name: `ボケ その${i + 1}`, html: gagCard(ep, i), filename: `tonight-${n}-2-gag${i + 1}.png` });
    });
    cards.push(
        { key: 'best', name: 'ベストプレー', html: bestPlayCard(ep), filename: `tonight-${n}-3-bestplay.png` },
        { key: 'takeaways', name: '持ち帰り英語', html: takeawaysCard(ep), filename: `tonight-${n}-4-takeaways.png` },
        { key: 'result', name: 'クエスト結果 (記事末尾に)', html: questResultCard(ep, art), filename: `tonight-${n}-5-result.png` },
        { key: 'jikai', name: '次回予告', html: jikaiCard(ep), filename: `tonight-${n}-6-jikai.png` },
    );
    return cards;
}

// キャラ画像を縮小して dataURI 化 (foreignObject 内で確実に描画するため)
function useTonioArt(src: string): string | null {
    const [art, setArt] = useState<string | null>(null);
    useEffect(() => {
        let cancelled = false;
        const img = new Image();
        img.onload = () => {
            if (cancelled) return;
            const targetW = 640;
            const scale = Math.min(1, targetW / img.width);
            const canvas = document.createElement('canvas');
            canvas.width = Math.round(img.width * scale);
            canvas.height = Math.round(img.height * scale);
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            setArt(canvas.toDataURL('image/png'));
        };
        img.src = src;
        return () => { cancelled = true; };
    }, [src]);
    return art;
}

// =====================================================================
// PNG書き出し (SVG foreignObject → canvas 2x) — magazine/cards と同方式
// =====================================================================

async function downloadPng(html: string, filename: string) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W * 2}" height="${H * 2}" viewBox="0 0 ${W} ${H}">`
        + `<foreignObject x="0" y="0" width="${W}" height="${H}">`
        + `<div xmlns="http://www.w3.org/1999/xhtml">${html}</div>`
        + `</foreignObject></svg>`;
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('SVG image failed to load'));
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    });
    const canvas = document.createElement('canvas');
    canvas.width = W * 2;
    canvas.height = H * 2;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('canvas 2d context unavailable');
    ctx.drawImage(img, 0, 0, W * 2, H * 2);
    const a = document.createElement('a');
    a.download = filename;
    a.href = canvas.toDataURL('image/png');
    a.click();
}

// =====================================================================
// 画面
// =====================================================================

function ScaledCard({ html }: { html: string }) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0);
    useEffect(() => {
        const update = () => {
            if (wrapRef.current) setScale(wrapRef.current.clientWidth / W);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);
    return (
        <div ref={wrapRef} style={{ width: '100%', height: scale ? H * scale : undefined, overflow: 'hidden' }}>
            {scale > 0 && (
                <div
                    style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: 'top left' }}
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            )}
        </div>
    );
}

export default function TonightCardsPage() {
    // 編集ページ(/tonight)で保存した内容を反映するため API から読む(空なら静的 seed)。
    const [episodes, setEpisodes] = useState<ShowEpisode[]>(showEpisodes);
    useEffect(() => {
        let alive = true;
        fetch('/api/tonight', { cache: 'no-store' })
            .then(r => r.json())
            .then(json => { if (alive && json?.episodes?.length) setEpisodes(mergeEpisodes(json.episodes)); })
            .catch(() => { /* seed で成立 */ });
        return () => { alive = false; };
    }, []);

    const nights = [...episodes].sort((a, b) => b.night - a.night);
    const [nightNum, setNightNum] = useState(latestNight());
    const ep = episodes.find(e => e.night === nightNum) ?? episodes[0];
    const art = useTonioArt('/tonio/tonio-hero.png');
    const cards = buildCards(ep, art);
    const [busy, setBusy] = useState<string | null>(null);

    const saveOne = async (card: CardDef) => {
        setBusy(card.key);
        try { await downloadPng(card.html, card.filename); } finally { setBusy(null); }
    };
    const saveAll = async () => {
        setBusy('all');
        try {
            for (const card of cards) {
                await downloadPng(card.html, card.filename);
                await new Promise(r => setTimeout(r, 400));
            }
        } finally { setBusy(null); }
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#F4F0E6' }}>
            <div className="max-w-5xl mx-auto px-4 py-10">
                <div className="flex items-baseline justify-between flex-wrap gap-3">
                    <div>
                        <h1 className="text-2xl font-bold tracking-wider" style={{ color: INK }}>note貼り付け用カード</h1>
                        <p className="text-sm mt-1" style={{ color: MUTED }}>
                            「{SHOW_META.title}」の各セクションを 1200×675 PNG で保存。noteの地の文は別書き(カードの中身を繰り返さない)。
                        </p>
                    </div>
                    <Link href="/english/tonight" className="text-sm underline" style={{ color: GOLD }}>
                        番組ページへ戻る
                    </Link>
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                    {nights.map(e => (
                        <button
                            key={e.night}
                            onClick={() => setNightNum(e.night)}
                            className="px-4 py-2 text-sm rounded-full border transition-all"
                            style={e.night === nightNum
                                ? { backgroundColor: INK, color: '#fff', borderColor: INK }
                                : { backgroundColor: '#fff', color: INK, borderColor: LINE }}
                        >
                            第{e.night}夜 {e.title}
                        </button>
                    ))}
                </div>

                <div className="mt-6">
                    <button
                        onClick={saveAll}
                        disabled={busy !== null}
                        className="px-6 py-3 text-sm font-bold rounded-xl border transition-all disabled:opacity-50"
                        style={{ backgroundColor: GOLD, color: '#fff', borderColor: GOLD }}
                    >
                        {busy === 'all' ? '書き出し中...' : `この夜の全カードをPNG保存 (${cards.length}枚)`}
                    </button>
                </div>

                <div className="space-y-10 mt-8">
                    {cards.map(card => (
                        <div key={card.key}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-bold tracking-widest" style={{ color: MUTED }}>{card.name}</div>
                                <button
                                    onClick={() => saveOne(card)}
                                    disabled={busy !== null}
                                    className="px-4 py-1.5 text-xs font-bold rounded-lg border transition-all disabled:opacity-50"
                                    style={{ backgroundColor: '#fff', color: INK, borderColor: LINE }}
                                >
                                    {busy === card.key ? '保存中...' : 'PNG保存'}
                                </button>
                            </div>
                            <div className="rounded-xl overflow-hidden shadow-lg border" style={{ borderColor: LINE }}>
                                <ScaledCard html={card.html} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
