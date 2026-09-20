// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/app/english/newspaper/page.tsx
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
'use client';

// The Tonio Times — A4英字新聞。
// カレンダーから号を選ぶ → その日の新聞(Sheet 1: 英語のみ)+ 解説(Sheet 2: 日本語)を表示。
// No.55〜 紙面は話題そのものを掘る記事2本 + それに反応する町の声と小説。
// 語彙解説はやめた (Sheet 2 は原則編集後記だけ)。出典の帯も刷らない。
// ただし難所のある号は vocab/sayIt/syntax を足してよい (No.57 が例)。空なら従来通り編集後記のみ。
// 執筆方針は src/data/english/newspaper.ts の冒頭を見ること。

import { useEffect, useMemo, useRef, useState } from 'react';
import { getAllEditions, getEdition, getPublishedExtras, getTodaysEdition, collectEditionPicks, type NewspaperEdition, type SentenceGloss, type GlossPick } from '@/data/english/newspaper';
import TimesPlayer, { splitSentences } from '@/components/english/TimesPlayer';

const PAPER = '#FBFAF7';
const INK = '#1A1A1A';
const MUTED = '#57534E';
const RULE = '#1A1A1A';
const KICKER = '#7A1F1F';
const GOLD = '#B8941E';
const SERIF = "Georgia, 'Times New Roman', 'Noto Serif JP', serif";
const JP = "'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', serif";

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];
const pad2 = (n: number) => String(n).padStart(2, '0');

export default function NewspaperPage() {
    const editions = useMemo(() => getAllEditions(), []);
    const extras = useMemo(() => getPublishedExtras(), []);
    const latest = editions[0];

    // 選択キー: 日次号は 'YYYY-MM-DD'、号外は 'extra:<id>'。
    // 初期表示は最新の日次号 (No.27〜は前日の復習紙面なので、開いた瞬間これが出るのが正しい)。
    // 号外は上のチップ行から選ぶ。
    const [selectedKey, setSelectedKey] = useState<string>(
        latest?.date ?? (extras[0] ? `extra:${extras[0].id}` : '')
    );
    const setSelectedDate = (d: string) => setSelectedKey(d);
    // カレンダー表示月 (最新号の月から開始)
    const initBase = latest ?? extras[0];
    const initY = initBase ? parseInt(initBase.date.slice(0, 4), 10) : 2026;
    const initM = initBase ? parseInt(initBase.date.slice(5, 7), 10) : 7;
    const [view, setView] = useState<{ y: number; m: number }>({ y: initY, m: initM });

    // 号は先の日付まで書き溜めてあるので、最新号 = 月末の号になる。開いた瞬間に欲しいのは
    // 「今日の号」なので、マウント後に today へ寄せる (SSR と時差でずれるため useEffect でやる)。
    useEffect(() => {
        const today = getTodaysEdition();
        if (!today) return;
        setSelectedKey(today.date);
        setView({ y: parseInt(today.date.slice(0, 4), 10), m: parseInt(today.date.slice(5, 7), 10) });
    }, []);

    const selectedDate = selectedKey.startsWith('extra:') ? '' : selectedKey;
    const ed = useMemo(() => {
        if (selectedKey.startsWith('extra:')) {
            const id = selectedKey.slice(6);
            return extras.find((e) => e.id === id) ?? latest ?? extras[0];
        }
        return getEdition(selectedKey) ?? latest ?? extras[0];
    }, [selectedKey, latest, extras]);

    // 印刷時、各シートを A4 一枚いっぱいに収める。
    //
    // 旧実装は画面と同じ 794px 幅のまま高さだけで縮小していたため、紙面が A4 より縦長になり
    // (794 × 約1980px = 1:2.5、A4は 1:1.41)、高さ基準で 0.53倍まで潰れて左右に巨大な余白が出た。
    // 文字が小さいのは「縮みすぎ」ではなく「幅が余っている」のが原因である。
    //
    // 対策: 印刷用の版面幅を可変にする。幅を広げると段組が組み直されて高さが減るので、
    // 幅を振って実測し、A4に収まる中で最大の倍率になる幅を選ぶ。同時に、幅に応じて段数を
    // 増やして1段の行長を約250pxに保つ (広い版面で1段が長すぎると読めなくなるため)。
    //
    // ただし「必ず1枚」を守ると、内容量とA4の面積の関係で本文は 5.5〜6pt 相当までしか
    // 大きくならない。刷る目的は読むことなので、既定は文字サイズを優先する:
    //   'readable' … 本文 7pt を下限とし、届かないならページを足す。足すと決めたら
    //                そのページ数を埋める大きさまで上げる (紙面は2枚・約8.3pt)
    //   'compact'  … 従来どおり必ず1枚に収める (保存・ファイリング用)
    // 画面で読む形 (read) と、印刷の体裁そのまま (paper) の切り替え。既定は read。
    // 狭い画面では紙面を出さない。印刷はPCからしかしないので、スマホに紙面を置く意味がない。
    // 幅の判定は matchMedia で CSS 側のブレークポイントと必ず一致させる
    // (window.innerWidth は環境によって実際の描画幅とずれる)。
    const [mode, setMode] = useState<'read' | 'paper'>('read');
    const [narrow, setNarrow] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const sync = () => setNarrow(mq.matches);
        sync();
        mq.addEventListener('change', sync);
        return () => mq.removeEventListener('change', sync);
    }, []);
    useEffect(() => {
        try {
            const v = localStorage.getItem('nt_view_mode');
            if (v === 'paper') setMode('paper');
        } catch { /* private mode */ }
    }, []);
    useEffect(() => { try { localStorage.setItem('nt_view_mode', mode); } catch { } }, [mode]);
    const [printMode, setPrintMode] = useState<'readable' | 'compact'>('readable');
    const printModeRef = useRef(printMode);
    printModeRef.current = printMode;

    // 用紙。A3 は A4 のちょうど倍の面積なので、この紙面量なら1枚のまま本文9pt級で刷れる。
    // 新聞という体裁にも合う。既定はA3 (A4しか無いときだけ切り替える)。
    const [paper, setPaper] = useState<'A3' | 'A4'>('A3');
    const paperRef = useRef(paper);
    paperRef.current = paper;

    useEffect(() => {
        const PX = 96 / 25.4; // CSS px per mm
        const PAPER_MM = { A4: [210, 297], A3: [297, 420] } as const;
        const COL_TARGET = 250;          // 1段あたりの目標幅(px)。これ以上広げない
        // 拡大の上限。A3では版面より紙のほうが大きくなる号があり、青天井にすると
        // 見出しだけ巨大な間延びした紙面になるため頭を押さえる。
        const MAX_SCALE = 1.45;
        // 印刷後の本文がこのポイント数を下回るならページを増やす、という下限。
        // 倍率ではなく実寸(pt)で判定する。紙面(本文11px)と解説シート(12px)で基準文字が
        // 違うため、同じ倍率でも刷り上がりの大きさが違うからである。
        const MIN_PT = 7;
        const ptOf = (px: number, scale: number) => px * scale * 0.75; // CSS px(96dpi) → pt
        // maxPages = その紙が使ってよい枚数の上限。解説シートは単語一覧 (号によって
        // 200語を超える) を抱えるので、2枚に押し込めると 7pt を割る。3枚まで許す。
        const sheets = [
            { id: 'news-sheet', bodyPx: 11, maxPages: 2 },
            { id: 'notes-sheet', bodyPx: 12, maxPages: 3 },
        ];

        // data-cols を持つ段組ブロックの段数を、現在の版面幅に合わせて決め直す
        const applyCols = (root: HTMLElement) => {
            root.querySelectorAll<HTMLElement>('[data-cols]').forEach((el) => {
                const base = parseInt(el.dataset.cols || '1', 10);
                const n = Math.max(base, Math.round(el.offsetWidth / COL_TARGET));
                el.style.columnCount = String(n);
            });
        };
        // 画面表示に戻す。単純な removeProperty は使えない — React が style 属性に入れた元の値
        // (段数・幅) まで消えてしまい、再レンダリングされるまで1段/全幅に崩れる。
        // そこで印刷前の inline 値を退避しておき、それを書き戻す。
        const clearCols = (root: HTMLElement) => {
            root.querySelectorAll<HTMLElement>('[data-cols]').forEach((el) => {
                const prev = el.dataset.prevCols;
                if (prev) el.style.setProperty('column-count', prev);
                else el.style.removeProperty('column-count');
                delete el.dataset.prevCols;
            });
        };
        const stash = (el: HTMLElement) => {
            el.dataset.prevWidth = el.style.width;
            el.dataset.prevMaxWidth = el.style.maxWidth;
            el.querySelectorAll<HTMLElement>('[data-cols]').forEach((c) => {
                if (c.style.columnCount) c.dataset.prevCols = c.style.columnCount;
            });
        };
        // 指定幅で組んだときの高さを実測する
        const measure = (el: HTMLElement, w: number) => {
            el.style.setProperty('width', `${w}px`, 'important');
            el.style.setProperty('max-width', 'none', 'important');
            applyCols(el);
            return { w, h: el.scrollHeight };
        };

        const before = () => sheets.forEach(({ id, bodyPx, maxPages: sheetMax }) => {
            const el = document.getElementById(id);
            if (!el) return;
            stash(el);
            el.style.setProperty('zoom', '1');

            const [pw, ph] = PAPER_MM[paperRef.current];
            const usableW = (pw - 16) * PX; // 紙幅 - @page余白 8mm×2
            const usableH = (ph - 16) * PX; // 紙高 - @page余白 8mm×2

            // 版面幅ごとの組み上がり高さを実測する (幅を変えると段組が組み直されて高さが変わる)
            const rows: { w: number; h: number }[] = [];
            for (let w = 720; w <= 1900; w += 60) rows.push({ w, h: measure(el, w).h });

            // N ページに収めるときに取れる最大倍率
            const scaleIn = (r: { w: number; h: number }, n: number) =>
                Math.min(usableW / r.w, (n * usableH) / r.h, MAX_SCALE);
            const bestIn = (n: number, list: { w: number; h: number }[]) =>
                list.reduce((a, r) => (scaleIn(r, n) > a.scale ? { w: r.w, scale: scaleIn(r, n) } : a),
                    { w: list[0].w, scale: scaleIn(list[0], n) });

            // ページ数は少ないほどよいが、読めない大きさになるくらいならページを足す。
            // 逆に、2枚使うと決めたなら「2枚を埋める大きさ」まで文字を上げる — これで
            // 1.3枚のスカスカな2枚目ではなく、8pt級で刷れるようになる。
            const maxPages = printModeRef.current === 'compact' ? 1 : sheetMax;
            let chosen = bestIn(1, rows);
            for (let n = 1; n <= maxPages; n++) {
                chosen = bestIn(n, rows);
                if (ptOf(bodyPx, chosen.scale) >= MIN_PT || n === maxPages) {
                    // 選んだページ数のまま、幅を細かく振り直して詰める
                    const fine: { w: number; h: number }[] = [];
                    for (let w = chosen.w - 50; w <= chosen.w + 50; w += 10) {
                        if (w < 700) continue;
                        fine.push({ w, h: measure(el, w).h });
                    }
                    const f = bestIn(n, fine);
                    if (f.scale > chosen.scale) chosen = f;
                    break;
                }
            }
            measure(el, chosen.w);
            el.style.setProperty('zoom', String(chosen.scale));
        });
        const after = () => sheets.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.style.setProperty('zoom', '1');
            const w = el.dataset.prevWidth;
            const mw = el.dataset.prevMaxWidth;
            if (w) el.style.setProperty('width', w); else el.style.removeProperty('width');
            if (mw) el.style.setProperty('max-width', mw); else el.style.removeProperty('max-width');
            delete el.dataset.prevWidth;
            delete el.dataset.prevMaxWidth;
            clearCols(el);
        });
        window.addEventListener('beforeprint', before);
        window.addEventListener('afterprint', after);
        return () => {
            window.removeEventListener('beforeprint', before);
            window.removeEventListener('afterprint', after);
        };
    }, []);

    // ------- カレンダー計算 -------
    const daysInMonth = new Date(view.y, view.m, 0).getDate();
    const firstWeekday = new Date(view.y, view.m - 1, 1).getDay(); // 0=日
    const cells: (number | null)[] = [
        ...Array(firstWeekday).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    while (cells.length % 7 !== 0) cells.push(null);

    const monthLabel = `${view.y}.${pad2(view.m)}`;
    const shiftMonth = (delta: number) => {
        setView((v) => {
            let m = v.m + delta;
            let y = v.y;
            if (m < 1) { m = 12; y -= 1; }
            if (m > 12) { m = 1; y += 1; }
            return { y, m };
        });
    };

    return (
        // 下端の余白 150px は読み上げプレーヤー(fixed)の居場所
        <div style={{ minHeight: '100vh', backgroundColor: '#E7E5E4', padding: '0 0 150px' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    @page { size: ${paper} portrait; margin: 8mm; }
                    html, body { background: #fff !important; }
                    body * { visibility: hidden !important; }
                    .a4-print, .a4-print * { visibility: visible !important; }
                    /* 版面の幅と zoom は beforeprint で実測して inline に入れる (下の useEffect)。
                       ここで width を !important 固定すると上書きできなくなるので指定しない。 */
                    .a4-print { box-shadow: none !important; margin: 0 auto !important; }
                    #news-sheet { break-after: page; page-break-after: always; }
                    .no-print { display: none !important; }
                    /* 印刷は必ず紙面。読むビューは画面だけの形なので出さない */
                    .nt-read { display: none !important; }
                    .nt-paper-wrap { display: block !important; }
                    /* 注釈の点線は画面だけ。印刷はいつも通りの紙面にする */
                    .nt-gloss { border-bottom: none !important; cursor: auto !important; }
                    /* 読み上げ中に印刷してもハイライトは刷らない */
                    [data-tts].nt-tts-on { background: none !important; box-shadow: none !important; }
                }
                .nt-just { text-align: justify; -webkit-hyphens: auto; hyphens: auto; }
                .nt-dropcap::first-letter { float: left; font-family: ${SERIF}; font-weight: 700;
                    font-size: 3.4em; line-height: 0.78; padding: 4px 8px 0 0; color: ${INK}; }
                /* 読み上げ中のブロック。紙面を汚さないよう、下線を引く程度に留める
                   (印刷には出ない。@media print で紙面だけを可視にしているため) */
                [data-tts].nt-tts-on {
                    background: linear-gradient(transparent 58%, rgba(184,148,30,0.30) 58%);
                    box-shadow: -6px 0 0 0 rgba(184,148,30,0.55);
                }
                /* 注釈のある文。紙面を汚さないよう、細い点線だけにする */
                .nt-gloss {
                    border-bottom: 1px dotted rgba(184,148,30,0.75);
                    cursor: pointer;
                }
                .nt-gloss:hover { background: rgba(184,148,30,0.10); }

                .cal-cell { transition: all 0.15s ease; }
                .cal-cell.has:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.14); }

                /* ===== 画面が狭いとき (画面のみ。印刷の版面計算には触らない) =====
                   紙面は 794px の版面を前提に組んである。3段グリッドの中でさらに columnCount で
                   段を割っているので、幅が足りないと1段が 80〜100px になり、本文が2〜3語で
                   折り返して読めなくなる。段組は幅に応じて2段階で畳む:
                     〜768px … 3段グリッドを縦積みにし、本文の段は最大2段まで
                     〜520px … 段組を全部やめて1段にし、そのぶん本文を大きくする
                   印刷の zoom/幅は beforeprint の useEffect が実測して決めるので、
                   screen に限定して干渉させない。 */
                @media screen and (max-width: 768px) {
                    .a4-print { padding: 18px 16px !important; max-width: calc(100% - 12px) !important; }

                    /* 3段グリッド → 縦積み。右レールは罫線で区切る。
                       並びは LEAD → RAIL → VOICES にする。VOICES は記事2本への反応なので、
                       読み物(RAIL)より先に来ると宙に浮く。デスクトップは左右に並ぶので順序の問題は起きない。
                       VOICES は左カラムの中にあるため、order だけでは持ち上げられない。
                       左カラムを display:contents にして中身を直接 flex の子にしてから並べ替える。 */
                    .nt-tier { display: flex !important; flex-direction: column !important; }
                    .nt-lead-col { display: contents !important; }
                    .nt-rail-col { grid-column: auto !important; order: 2 !important; margin-top: 14px !important; padding-top: 10px !important; border-top: 3px double currentColor !important; }
                    .nt-voices-block { order: 3 !important; margin-top: 14px !important; padding-top: 10px !important; border-top: 3px double currentColor !important; }

                    /* 縦積みで版面が広がるぶん、本文の段は2段までにして行長を保つ */
                    .a4-print [data-cols="3"] { column-count: 2 !important; }

                    /* 題字は折り返してよい (nowrap のままだと確実にはみ出す) */
                    .nt-masthead { white-space: normal !important; letter-spacing: 0 !important; }
                    .nt-emblem { gap: 10px !important; }

                    /* 日付バーは3つ横並びをやめて中央寄せで折り返す */
                    .nt-dateline { flex-wrap: wrap !important; justify-content: center !important; gap: 2px 12px !important; text-align: center !important; }

                    /* 見出しは版面幅に合わせて落とす */
                    #news-sheet h2 { font-size: 26px !important; line-height: 1.12 !important; letter-spacing: 0 !important; }
                    #news-sheet h3 { font-size: 20px !important; line-height: 1.15 !important; }

                    /* 号外の二重フレームは内側の余白を削り、シールを小さくする */
                    .nt-frame { padding: 14px 14px 16px !important; }
                    .nt-seal { top: 8px !important; right: 8px !important; width: 48px !important; height: 48px !important; }

                    /* カレンダー: 1マスが50px前後になるので、見出しは畳む */
                    .nt-cal { padding: 16px 14px 18px !important; }
                    .nt-cal .cal-grid { gap: 5px !important; }
                    .nt-cal .cal-day { min-height: 54px !important; padding: 5px !important; }
                    .nt-cal-title { display: none !important; }
                    .nt-cal-head { flex-wrap: wrap !important; gap: 8px !important; }
                    .nt-cal-note { display: none !important; }

                    /* ツールバーの用紙説明は狭いと2〜3行を食うので落とす */
                    .nt-toolbar-note { display: none !important; }
                    /* 用紙サイズは印刷専用の道具。スマホでは意味がないので畳む */
                    .nt-paper-size { display: none !important; }

                    /* 読み上げバー: 章ジャンプは幅を食うので畳む (設定パネル側から章に飛べる) */
                    .nt-tts-jump { display: none !important; }
                    .nt-tts-row { padding: 8px 12px 10px !important; gap: 10px !important; }

                    /* 画面で読むときの文字。紙(A4/A3)を基準にした 9〜11px は、手に持つ画面では小さすぎる。
                       印刷の版面計算には触らないよう screen 限定で上げる */
                    #news-sheet p { font-size: 13px !important; line-height: 1.62 !important; }
                    #news-sheet .nt-kicker { font-size: 11.5px !important; }
                    #news-sheet .nt-byline { font-size: 10.5px !important; }
                    #news-sheet .nt-stat { font-size: 12px !important; }
                    #news-sheet span[data-tts="voices-headline"] { font-size: 13px !important; }
                    #notes-sheet .nt-note-body { font-size: 13.5px !important; line-height: 1.8 !important; }
                    #notes-sheet .nt-note-quote { font-size: 12.5px !important; }
                }

                @media screen and (max-width: 520px) {
                    .a4-print { padding: 16px 14px !important; }

                    /* ここからは段組を全部やめる。1段 = 版面いっぱい */
                    .a4-print [data-cols] { column-count: 1 !important; column-rule: none !important; }

                    .nt-masthead { font-size: clamp(26px, 8.6vw, 42px) !important; }
                    .nt-emblem { gap: 8px !important; }
                    .nt-emblem svg { width: 34px !important; height: 34px !important; }

                    #news-sheet h2 { font-size: 27px !important; line-height: 1.1 !important; }
                    #news-sheet h3 { font-size: 22px !important; line-height: 1.12 !important; }
                    #notes-sheet h1 { font-size: 26px !important; letter-spacing: 2px !important; }

                    /* 1段になったぶん、本文は手に持って読める大きさにする (紙の11px基準を捨てる)。
                       両端揃え + ハイフネーションは狭い幅だと語間が割れるので左揃えにする */
                    #news-sheet p { font-size: 15px !important; line-height: 1.72 !important; }
                    #news-sheet .nt-kicker { font-size: 12px !important; }
                    #news-sheet .nt-byline { font-size: 11px !important; }
                    #news-sheet .nt-stat { font-size: 13px !important; }
                    #news-sheet [data-tts="lead-standfirst"] { font-size: 14.5px !important; line-height: 1.5 !important; }
                    #news-sheet span[data-tts="voices-headline"] { font-size: 14px !important; }
                    .nt-dateline { font-size: 12px !important; }

                    /* 解説シート (日本語) も同じだけ上げる */
                    #notes-sheet .nt-note-body { font-size: 14.5px !important; line-height: 1.85 !important; }
                    #notes-sheet .nt-note-quote { font-size: 13px !important; }
                    #notes-sheet .nt-section-title span { font-size: 14px !important; }

                    /* 読み上げバーの現在行 */
                    .nt-tts-row > div:nth-child(2) > div:last-child { font-size: 15.5px !important; }

                    #news-sheet .nt-just { text-align: left !important; }
                    .nt-dropcap::first-letter { font-size: 2.6em !important; padding-right: 6px !important; }

                    .nt-frame { padding: 12px 12px 14px !important; }
                    .nt-seal { top: 6px !important; right: 6px !important; width: 42px !important; height: 42px !important; }
                    .nt-seal span:first-child { font-size: 13px !important; }

                    /* 1マスが40px強。号数バッジは文字を消して金の点にする */
                    .nt-cal { padding: 14px 12px 16px !important; }
                    .nt-cal .cal-grid { gap: 4px !important; }
                    .nt-cal .cal-day { min-height: 40px !important; padding: 4px !important; }
                    .nt-cal-badge { font-size: 0 !important; padding: 4px !important; border-radius: 50% !important; }
                }
            `}} />

            {/* Toolbar (screen only) */}
            <div className="no-print" style={{
                position: 'sticky', top: 0, zIndex: 5, backgroundColor: '#164038', color: '#fff',
                padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap',
            }}>
                <div style={{ fontSize: '13px', letterSpacing: '0.5px' }}>
                    The Tonio Times — {ed.weekdayLong}
                    <span className="nt-toolbar-note" style={{ opacity: 0.75, marginLeft: '8px', fontSize: '11px' }}>
                        {paper === 'A3'
                            ? '新聞1枚 + 解説1枚。本文9pt級で刷れます (プリンタの用紙もA3にしてください)'
                            : printMode === 'readable'
                                ? '本文8pt強。新聞2枚 + 解説1枚 (両面なら2枚)'
                                : '新聞1枚 + 解説1枚。ただし本文は6pt前後まで小さくなります'}
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    {/* 画面で読む形 / 印刷の体裁。印刷は mode に関係なく必ず紙面で出る */}
                    {!ed?.theme && !narrow && (
                        <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.35)', borderRadius: '8px', overflow: 'hidden' }}>
                            {([{ key: 'read', label: '読む' }, { key: 'paper', label: '紙面' }] as const).map((m) => (
                                <button
                                    key={m.key}
                                    onClick={() => setMode(m.key)}
                                    style={{
                                        backgroundColor: mode === m.key ? '#D4AF37' : 'transparent',
                                        color: mode === m.key ? '#1A1A1A' : '#fff',
                                        border: 'none', padding: '7px 14px', fontSize: '12px',
                                        fontWeight: mode === m.key ? 700 : 500, cursor: 'pointer', letterSpacing: '0.5px',
                                    }}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                    )}
                    <div className="nt-paper-size" style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.35)', borderRadius: '8px', overflow: 'hidden' }}>
                        {(['A3', 'A4'] as const).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPaper(p)}
                                style={{
                                    backgroundColor: paper === p ? '#D4AF37' : 'transparent',
                                    color: paper === p ? '#1A1A1A' : '#fff',
                                    border: 'none', padding: '7px 14px', fontSize: '12px',
                                    fontWeight: paper === p ? 700 : 500, cursor: 'pointer', letterSpacing: '0.5px',
                                }}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                    {/* A3 は1枚で読める大きさになるので、詰める/大きくの選択は出さない */}
                    {paper === 'A4' && (
                        <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.35)', borderRadius: '8px', overflow: 'hidden' }}>
                            {([
                                { key: 'readable', label: '読める大きさ優先' },
                                { key: 'compact', label: '1枚に詰める' },
                            ] as const).map((m) => (
                                <button
                                    key={m.key}
                                    onClick={() => setPrintMode(m.key)}
                                    style={{
                                        backgroundColor: printMode === m.key ? '#fff' : 'transparent',
                                        color: printMode === m.key ? '#164038' : '#fff',
                                        border: 'none', padding: '7px 14px', fontSize: '12px',
                                        fontWeight: printMode === m.key ? 700 : 500, cursor: 'pointer',
                                    }}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                    )}
                    <button
                        onClick={() => window.print()}
                        style={{
                            backgroundColor: '#D4AF37', color: '#1A1A1A', border: 'none', borderRadius: '8px',
                            padding: '8px 18px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.5px',
                        }}
                    >
                        印刷 / PDF保存
                    </button>
                </div>
            </div>

            {/* ===================== 号外 EXTRA チップ行 (screen only) ===================== */}
            {extras.length > 0 && (
                <div className="no-print" style={{
                    width: '794px', maxWidth: 'calc(100% - 24px)', margin: '20px auto 0',
                    display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap',
                }}>
                    <span style={{ fontFamily: SERIF, fontSize: '11px', fontWeight: 800, letterSpacing: '2px', color: '#7C2020', textTransform: 'uppercase' }}>号外 · EXTRA</span>
                    {extras.map((ex) => {
                        const key = `extra:${ex.id}`;
                        const on = selectedKey === key;
                        return (
                            <button
                                key={ex.id}
                                onClick={() => setSelectedKey(key)}
                                style={{
                                    cursor: 'pointer', textAlign: 'left', borderRadius: '10px',
                                    border: on ? '2px solid #7C2020' : '1px solid #C9BEA3',
                                    background: on ? 'linear-gradient(160deg,#EFE7D3,#E6DCC2)' : 'linear-gradient(160deg,#F3ECDB,#ECE3CE)',
                                    padding: '7px 12px', display: 'flex', alignItems: 'center', gap: '9px',
                                    boxShadow: on ? '0 4px 14px rgba(124,32,32,0.20)' : 'none',
                                }}
                            >
                                <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.5px', color: '#fff', backgroundColor: '#7C2020', borderRadius: '4px', padding: '2px 6px', whiteSpace: 'nowrap' }}>号外</span>
                                <span style={{ fontFamily: SERIF, fontSize: '11.5px', fontWeight: 700, lineHeight: 1.15, color: INK, maxWidth: '360px' }}>{ex.lead.headline}</span>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* ===================== CALENDAR (screen only) ===================== */}
            <div className="no-print nt-cal" style={{
                width: '794px', maxWidth: 'calc(100% - 24px)', margin: '24px auto 8px',
                backgroundColor: '#fff', borderRadius: '14px', boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
                padding: '18px 20px 22px', boxSizing: 'border-box',
            }}>
                {/* Calendar header */}
                <div className="nt-cal-head" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <button onClick={() => shiftMonth(-1)} style={navBtn}>‹</button>
                        <div style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '1px', color: INK }}>{monthLabel}</div>
                        <button onClick={() => shiftMonth(1)} style={navBtn}>›</button>
                    </div>
                    <div className="nt-cal-note" style={{ fontSize: '11px', color: MUTED, letterSpacing: '1px' }}>
                        THE TONIO TIMES · 号を選んで読む
                    </div>
                </div>

                {/* Weekday header */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', marginBottom: '6px' }}>
                    {WEEKDAYS.map((w, i) => (
                        <div key={w} style={{
                            textAlign: 'center', fontSize: '11px', fontWeight: 700, letterSpacing: '1px',
                            color: i === 0 ? '#B91C1C' : i === 6 ? '#2563EB' : MUTED, paddingBottom: '2px',
                        }}>{w}</div>
                    ))}
                </div>

                {/* Day grid */}
                <div className="cal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                    {cells.map((day, i) => {
                        if (day === null) return <div key={i} />;
                        const dateStr = `${view.y}-${pad2(view.m)}-${pad2(day)}`;
                        const dayEd = getEdition(dateStr);
                        const isSelected = dateStr === selectedDate;
                        const dow = i % 7;
                        const dayColor = dow === 0 ? '#B91C1C' : dow === 6 ? '#2563EB' : '#78716C';
                        if (!dayEd) {
                            return (
                                <div key={i} className="cal-day" style={{
                                    minHeight: '78px', borderRadius: '9px', border: '1px solid #F0EEEA',
                                    padding: '6px 8px', color: dayColor, fontSize: '12px', fontWeight: 600,
                                    backgroundColor: '#FAFAF9',
                                }}>{day}</div>
                            );
                        }
                        return (
                            <button
                                key={i}
                                className="cal-cell cal-day has"
                                onClick={() => setSelectedDate(dateStr)}
                                style={{
                                    minHeight: '78px', borderRadius: '9px', textAlign: 'left', cursor: 'pointer',
                                    border: isSelected ? `2px solid ${GOLD}` : '1px solid #E7D9A8',
                                    background: isSelected
                                        ? 'linear-gradient(160deg, #FFF9E8, #FBF1CE)'
                                        : 'linear-gradient(160deg, #FFFDF6, #FCF7E6)',
                                    padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: '3px',
                                    boxShadow: isSelected ? '0 4px 14px rgba(184,148,30,0.25)' : 'none',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 800, color: dayColor }}>{day}</span>
                                    <span className="nt-cal-badge" style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.5px', color: '#fff', backgroundColor: GOLD, borderRadius: '4px', padding: '1px 5px' }}>
                                        No.{dayEd.editionNo}
                                    </span>
                                </div>
                                <div className="nt-cal-title" style={{ fontFamily: SERIF, fontSize: '10px', fontWeight: 700, lineHeight: 1.15, color: INK, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                    {dayEd.lead.headline}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {ed ? <>
                {/* 読む前の単語。紙面より上に置く (読み始めてから拾うのでは遅いので) */}
                <PreReadWords ed={ed} />
                {/* 画面は「読む」が既定。A4の3段組は印刷の体裁なので、印刷のときだけ必ず出す。
                    紙面は DOM から外さない (印刷が mode に左右されないようにするため)。 */}
                {(narrow || mode === 'read') && !ed.theme && <ReadSheet ed={ed} />}
                <div className="nt-paper-wrap" style={(narrow || mode === 'read') && !ed.theme ? { display: 'none' } : undefined}>
                    {ed.theme === 'aot' ? <AotSheet ed={ed} /> : ed.theme === 'ghost' ? <GhostSheet ed={ed} /> : <NewspaperSheet ed={ed} />}
                </div>
                <NotesSheet ed={ed} />
                {/* 紙面を1文ずつ読み上げるプレーヤー (画面のみ)。紙面側の data-tts に効く */}
                <TimesPlayer ed={ed} />
            </> : (
                <div style={{ textAlign: 'center', color: MUTED, padding: '60px 20px', fontFamily: JP }}>
                    この日の号はまだありません。
                </div>
            )}
        </div>
    );
}

const navBtn: React.CSSProperties = {
    width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #E7E5E4',
    background: '#fff', color: INK, fontSize: '18px', lineHeight: 1, cursor: 'pointer', fontWeight: 700,
};

const sheetStyle: React.CSSProperties = {
    width: '794px', maxWidth: 'calc(100% - 24px)', margin: '16px auto', backgroundColor: PAPER,
    boxShadow: '0 8px 30px rgba(0,0,0,0.18)', padding: '22px 30px', boxSizing: 'border-box', color: INK,
};

const kickerStyle: React.CSSProperties = {
    fontFamily: SERIF, fontSize: '10.5px', fontWeight: 700, letterSpacing: '1.5px',
    color: KICKER, textTransform: 'uppercase', marginBottom: '6px',
};
const bodyP: React.CSSProperties = {
    fontFamily: SERIF, fontSize: '11px', lineHeight: 1.5, color: INK, margin: '0 0 6px',
};

// ── 文タップの注釈 ───────────────────────────────────────────────
// 難しいのは単語ではなく構造なので、文ごとに「訳」と「なぜ日本人がここで転ぶか」を出す。
// 照合キーは英数字だけに潰す。引用符の種類・ダッシュ・空白の揺れで一致が外れるのを防ぐため。
const glossKey = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '');

// 段落を文に割り、注釈のある文だけ点線付きの span にする。
// 段落の <p> に付いている data-tts はそのまま (読み上げのハイライトは親に効くので壊れない)。
function Tappable({ text, map, onPick }: {
    text: string;
    map: Map<string, SentenceGloss>;
    onPick: (g: SentenceGloss) => void;
}) {
    if (!map.size) return <>{text}</>;
    const out: React.ReactNode[] = [];
    let cursor = 0;
    splitSentences(text).forEach((sent, i) => {
        const at = text.indexOf(sent, cursor);
        if (at < 0) return;
        if (at > cursor) out.push(text.slice(cursor, at));
        const g = map.get(glossKey(sent));
        out.push(g
            ? <span key={i} className="nt-gloss" onClick={() => onPick(g)}>{sent}</span>
            : sent);
        cursor = at + sent.length;
    });
    if (cursor < text.length) out.push(text.slice(cursor));
    return <>{out}</>;
}

// 登録先は Words (/api/user-words) に一本化。語も表現も同じ棚に入れる。
async function postPick(pick: GlossPick): Promise<boolean> {
    try {
        const res = await fetch('/api/user-words', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ english: pick.en, pronunciation: '', japanese: pick.ja, note: '', category: 'newspaper' }),
        });
        return res.ok || res.status === 409;
    } catch { return false; }
}

// 画面下に出る解説。印刷には出さない。
// 前へ/次へ で、閉じずに次の難所へ飛べる。紙面を目で探し直さなくていい。
function GlossPanel({ g, onClose, index, total, onMove }: {
    g: SentenceGloss; onClose: () => void;
    index: number; total: number; onMove: (delta: number) => void;
}) {
    const [done, setDone] = useState<Set<string>>(new Set());
    const [busy, setBusy] = useState<string | null>(null);

    // 文が長いとカードにならないので、core があればそちらを登録する
    const sentencePick: GlossPick = { en: g.core || g.en, ja: g.ja };
    const all: GlossPick[] = [...(g.picks ?? []), sentencePick];

    const add = async (pick: GlossPick) => {
        if (done.has(pick.en) || busy) return;
        setBusy(pick.en);
        const ok = await postPick(pick);
        if (ok) setDone((prev) => new Set(prev).add(pick.en));
        setBusy(null);
    };
    const addAll = async () => {
        if (busy) return;
        setBusy('*');
        for (const pick of all) {
            if (done.has(pick.en)) continue;
            if (await postPick(pick)) setDone((prev) => new Set(prev).add(pick.en));
        }
        setBusy(null);
    };

    const chip = (on: boolean, loading: boolean): React.CSSProperties => ({
        flexShrink: 0, padding: '3px 10px', borderRadius: '5px', fontSize: '10px', fontWeight: 700,
        border: `1px solid ${on ? '#10B981' : '#ddd'}`, background: on ? '#ECFDF5' : '#fff',
        color: on ? '#047857' : MUTED, cursor: on || loading ? 'default' : 'pointer',
        fontFamily: JP, whiteSpace: 'nowrap',
    });

    return (
        <div className="no-print" style={{
            position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 60,
            background: '#fff', borderTop: `2px solid ${GOLD}`, boxShadow: '0 -6px 24px rgba(0,0,0,0.12)',
            maxHeight: '62vh', overflowY: 'auto',
        }}>
            <div style={{ maxWidth: '780px', margin: '0 auto', padding: '14px 18px 22px' }}>
                {/* 文とボタンを同じ行に並べると、スマホで文が細い柱に潰れる。行を分ける */}
                <div style={{ fontFamily: SERIF, fontSize: '15px', lineHeight: 1.65, color: INK, marginBottom: '12px' }}>{g.en}</div>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button onClick={() => onMove(-1)} disabled={index <= 0} title="前の難所へ"
                            style={{
                                border: '1px solid #ddd', background: '#fff', borderRadius: '6px',
                                padding: '6px 13px', cursor: index <= 0 ? 'default' : 'pointer',
                                fontSize: '11px', fontWeight: 700, color: index <= 0 ? '#ccc' : MUTED,
                            }}>← 前</button>
                        <span style={{ fontFamily: JP, fontSize: '10px', color: '#aaa', minWidth: '44px', textAlign: 'center' }}>
                            {index + 1} / {total}
                        </span>
                        <button onClick={() => onMove(1)} disabled={index >= total - 1} title="次の難所へ"
                            style={{
                                border: '1px solid #ddd', background: '#fff', borderRadius: '6px',
                                padding: '6px 13px', cursor: index >= total - 1 ? 'default' : 'pointer',
                                fontSize: '11px', fontWeight: 700, color: index >= total - 1 ? '#ccc' : MUTED,
                            }}>次 →</button>
                        <button onClick={onClose} style={{
                            marginLeft: 'auto',
                            border: '1px solid #ddd', background: '#fff', borderRadius: '6px',
                            padding: '6px 14px', cursor: 'pointer', fontSize: '11px', fontWeight: 700, color: MUTED,
                        }}>閉じる</button>
                    </div>
                </div>

                <div style={{ marginTop: '14px', fontFamily: JP, fontSize: '13.5px', lineHeight: 1.85, color: INK }}>{g.ja}</div>

                {/* 一言一句。訳を1本置くだけだと「どの語がどこに効いているか」が残らないので、
                    英語の語順のまま前から切って日本語を当てた表を出す。 */}
                {g.chunks && g.chunks.length > 0 && (
                    <div style={{ marginTop: '12px', background: '#FFFDF5', border: `1px solid ${GOLD}44`, borderRadius: '10px', padding: '9px 11px' }}>
                        <div style={{ fontFamily: JP, fontSize: '9px', fontWeight: 800, color: GOLD, letterSpacing: '1.5px', marginBottom: '6px' }}>一言一句（前から順に）</div>
                        {g.chunks.map((c, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: '10px', alignItems: 'baseline', padding: '4px 0',
                                borderTop: i === 0 ? 'none' : `1px dotted ${RULE}22`,
                            }}>
                                <span style={{ flex: '1 1 46%', fontFamily: SERIF, fontSize: '13px', color: INK, lineHeight: 1.5 }}>{c.en}</span>
                                <span style={{ flex: '1 1 54%', fontFamily: JP, fontSize: '12px', color: '#5A5248', lineHeight: 1.6 }}>{c.ja}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ marginTop: '12px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '10px', padding: '11px 13px' }}>
                    <div style={{ fontFamily: JP, fontSize: '9px', fontWeight: 800, color: '#15803D', letterSpacing: '1.5px', marginBottom: '5px' }}>なぜ難しいか</div>
                    <div style={{ fontFamily: JP, fontSize: '12.5px', lineHeight: 1.9, color: '#3F3A33' }}>{g.why}</div>
                </div>

                {g.skeleton && (
                    <div style={{ marginTop: '10px', background: '#FAF8F2', borderRadius: '10px', padding: '11px 13px' }}>
                        <div style={{ fontFamily: JP, fontSize: '9px', fontWeight: 800, color: GOLD, letterSpacing: '1.5px', marginBottom: '5px' }}>文の骨格</div>
                        <div style={{ fontFamily: SERIF, fontSize: '12.5px', lineHeight: 1.75, color: '#3F3A33' }}>{g.skeleton}</div>
                    </div>
                )}

                {/* 重要表現 → その場でトレーニングに登録。
                    粒度を2段にしてある: 語や連語 (at source) と、意味のまとまり (all deducted at source)。
                    文そのものは長いと復習できないので core があればそちらを登録する。 */}
                <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: `1px dashed ${RULE}33` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
                        <span style={{ fontFamily: JP, fontSize: '9px', fontWeight: 800, color: GOLD, letterSpacing: '1.5px' }}>トレーニングに登録（WORDS）</span>
                        <button onClick={addAll} disabled={busy !== null}
                            style={{ ...chip(all.every((x) => done.has(x.en)), busy === '*'), marginLeft: 'auto' }}>
                            {all.every((x) => done.has(x.en)) ? 'すべて登録済み' : busy === '*' ? '登録中…' : 'まとめて登録'}
                        </button>
                    </div>

                    {(g.picks ?? []).map((pick, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '8px', padding: '5px 0', borderTop: i === 0 ? 'none' : `1px dotted ${RULE}22` }}>
                            <div style={{ flex: 1 }}>
                                <span style={{ fontFamily: SERIF, fontSize: '13px', fontWeight: 700, color: INK }}>{pick.en}</span>
                                <span style={{ fontFamily: JP, fontSize: '11.5px', color: MUTED }}> — {pick.ja}</span>
                            </div>
                            <button onClick={() => add(pick)} disabled={done.has(pick.en) || busy !== null}
                                style={chip(done.has(pick.en), busy === pick.en)}>
                                {done.has(pick.en) ? '登録済' : busy === pick.en ? '…' : '+ 登録'}
                            </button>
                        </div>
                    ))}

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', padding: '5px 0', borderTop: `1px dotted ${RULE}22` }}>
                        <div style={{ flex: 1 }}>
                            <span style={{ fontFamily: JP, fontSize: '10px', color: MUTED }}>{g.core ? '文（核だけ）' : '文まるごと'}</span>
                            <div style={{ fontFamily: SERIF, fontSize: '12.5px', color: INK, lineHeight: 1.5 }}>{sentencePick.en}</div>
                        </div>
                        <button onClick={() => add(sentencePick)} disabled={done.has(sentencePick.en) || busy !== null}
                            style={chip(done.has(sentencePick.en), busy === sentencePick.en)}>
                            {done.has(sentencePick.en) ? '登録済' : busy === sentencePick.en ? '…' : '+ 登録'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ===================== 読む前の一括登録バー (画面のみ) =====================
// 難所の語は文をタップすれば出るが、それは「読んでいる途中で止まる」やり方になる。
// 先に語だけ通してから読めば、同じ紙面でも負担が下がる。ここは紙面の頭に置く入口で、
// 一覧そのものは紙の2枚目 (NotesSheet の WORD LIST) にある。登録先は GlossPanel と
// 同じ /api/user-words (語も連語も同じ棚)。
function PreReadWords({ ed }: { ed: NewspaperEdition }) {
    const groups = useMemo(() => collectEditionPicks(ed), [ed]);
    const all = useMemo(() => groups.flatMap((g) => g.picks), [groups]);
    const [done, setDone] = useState<Set<string>>(new Set());
    const [busy, setBusy] = useState<string | null>(null);

    // 既に Words にあるものは押さなくていい。取得できなければ黙って諦める (登録自体は通る)。
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const r = await fetch('/api/user-words').then((x) => x.json());
                if (!alive) return;
                const have = new Set<string>();
                r?.words?.forEach((w: { english: string }) => have.add(w.english.trim().toLowerCase()));
                setDone(new Set(all.filter((p) => have.has(p.en.trim().toLowerCase())).map((p) => p.en)));
            } catch { /* noop */ }
        })();
        return () => { alive = false; };
    }, [all]);

    if (!all.length) return null;

    const isDone = (p: GlossPick) => done.has(p.en);
    const addMany = async (list: GlossPick[], tag: string) => {
        if (busy) return;
        setBusy(tag);
        for (const p of list) {
            if (done.has(p.en)) continue;
            if (await postPick(p)) setDone((prev) => new Set(prev).add(p.en));
        }
        setBusy(null);
    };
    const doneCount = all.filter(isDone).length;

    const btn = (active: boolean): React.CSSProperties => ({
        border: 'none', borderRadius: '8px', padding: '7px 15px', fontFamily: JP,
        fontSize: '12px', fontWeight: 700, cursor: active ? 'pointer' : 'default',
        background: active ? '#0F9D6E' : '#E7E5E4', color: active ? '#fff' : MUTED,
    });

    return (
        <div className="no-print" style={{
            maxWidth: '720px', margin: '18px auto 0', background: '#F7FBF9',
            border: '1px solid #0F9D6E33', borderRadius: '12px', padding: '12px 14px',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ fontFamily: JP, fontSize: '12.5px', color: INK, flex: 1, minWidth: '190px' }}>
                    読む前に — この号の語 <b>{all.length}件</b>
                    <span style={{ color: MUTED, marginLeft: '8px', fontSize: '11px' }}>登録済み {doneCount}/{all.length}</span>
                </div>
                <button onClick={() => {
                    document.getElementById('notes-sheet')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }} style={{
                    border: '1px solid #ddd', background: '#fff', borderRadius: '8px', padding: '7px 13px',
                    fontFamily: JP, fontSize: '11.5px', fontWeight: 700, color: MUTED, cursor: 'pointer',
                }}>一覧を見る（2枚目）</button>
                <button onClick={() => addMany(all, '*')} disabled={busy !== null || doneCount === all.length}
                    style={btn(busy === null && doneCount < all.length)}>
                    {doneCount === all.length ? '登録済み' : busy === '*' ? `登録中… ${doneCount}/${all.length}` : 'この号ぜんぶ登録'}
                </button>
            </div>
        </div>
    );
}

// ===================== 読むビュー (画面用) =====================
// A4の3段組は印刷の体裁であって、手元で読むための形ではない。
// 画面ではこちらを既定にする: 1段・大きめの字・上から下に読むだけ。
// 順番は LEAD → RAIL(読み物) → VOICES → STORY。VOICES は記事2本への反応なので後ろに置く。
function ReadSheet({ ed }: { ed: NewspaperEdition }) {
    const glosses = useMemo(() => ed.glosses ?? [], [ed]);
    const glossMap = useMemo(() => {
        const m = new Map<string, SentenceGloss>();
        for (const g of glosses) m.set(glossKey(g.en), g);
        return m;
    }, [glosses]);
    const [picked, setPicked] = useState<SentenceGloss | null>(null);
    const T = (text: string) => <Tappable text={text} map={glossMap} onPick={setPicked} />;
    const idx = picked ? glosses.findIndex((x) => x.en === picked.en) : -1;
    const move = (d: number) => {
        const n = idx + d;
        if (n >= 0 && n < glosses.length) setPicked(glosses[n]);
    };

    const H = ({ children }: { children: React.ReactNode }) => (
        <h2 style={{ fontFamily: SERIF, fontSize: '26px', fontWeight: 700, lineHeight: 1.22, margin: '0 0 10px', letterSpacing: '-0.3px' }}>{children}</h2>
    );
    const Kick = ({ children }: { children: React.ReactNode }) => (
        <div style={{ fontFamily: SERIF, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: KICKER, marginBottom: '8px' }}>{children}</div>
    );
    const P: React.CSSProperties = { fontFamily: SERIF, fontSize: '17px', lineHeight: 1.85, color: INK, margin: '0 0 16px' };
    const sec: React.CSSProperties = { marginTop: '30px', paddingTop: '22px', borderTop: `2px solid ${RULE}` };

    return (
        <div className="nt-read" style={{
            maxWidth: '720px', margin: '18px auto 0', background: PAPER,
            border: `1px solid ${RULE}22`, borderRadius: '14px', padding: '26px 22px 40px',
        }}>
            <div style={{ textAlign: 'center', fontFamily: SERIF, fontSize: '11px', letterSpacing: '2px', color: MUTED, textTransform: 'uppercase', paddingBottom: '14px', borderBottom: `2px solid ${RULE}` }}>
                The Tonio Times · No. {ed.editionNo} · {ed.weekdayLong}
            </div>

            {/* LEAD */}
            <div style={{ marginTop: '22px' }}>
                <Kick>{ed.lead.kicker}</Kick>
                <H>{T(ed.lead.headline)}</H>
                {ed.lead.standfirst && (
                    <p style={{ ...P, fontSize: '15px', fontStyle: 'italic', color: MUTED }}>{T(ed.lead.standfirst)}</p>
                )}
                {ed.lead.body.map((x, i) => <p key={i} style={P}>{T(x)}</p>)}
            </div>

            {/* RAIL — 読み物。スマホでは VOICES より先に読みたい */}
            <div style={sec}>
                <Kick>{ed.rail.kicker}</Kick>
                <H>{T(ed.rail.headline)}</H>
                {ed.rail.body.map((x, i) => <p key={i} style={P}>{T(x)}</p>)}
                <div style={{ border: `1.5px solid ${RULE}`, padding: '12px 14px', marginTop: '6px' }}>
                    <div style={{ fontFamily: SERIF, fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: KICKER, borderBottom: `1px solid ${RULE}`, paddingBottom: '6px', marginBottom: '8px' }}>By the Numbers</div>
                    {ed.railStats.map((x, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '14px', fontFamily: SERIF, fontSize: '13px', padding: '3px 0' }}>
                            <span style={{ color: MUTED }}>{x.label}</span>
                            <span style={{ fontWeight: 700, textAlign: 'right' }}>{x.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* VOICES */}
            <div style={sec}>
                <Kick>{ed.voices.kicker}</Kick>
                <H>{T(ed.voices.headline)}</H>
                <p style={{ ...P, fontSize: '15px', fontStyle: 'italic', color: MUTED }}>{T(ed.voices.standfirst)}</p>
                {ed.voices.turns.map((t, i) => (
                    <div key={i} style={{ marginBottom: '18px' }}>
                        <p style={{ ...P, margin: '0 0 6px' }}><span style={{ fontWeight: 700, color: KICKER }}>Q. </span>{T(t.q)}</p>
                        <p style={{ ...P, margin: 0 }}><span style={{ fontWeight: 700 }}>A. </span>“{T(t.a)}”</p>
                    </div>
                ))}
            </div>

            {/* STORY */}
            <div style={sec}>
                <Kick>{ed.story.kicker}</Kick>
                <H>{T(ed.story.headline)}</H>
                <div style={{ fontFamily: SERIF, fontSize: '13px', fontStyle: 'italic', color: KICKER, marginBottom: '14px' }}>{ed.story.cast}</div>
                {ed.story.body.map((x, i) => (
                    <p key={i} style={{ ...P, ...(i === ed.story.body.length - 1 ? { fontStyle: 'italic', color: MUTED } : {}) }}>{T(x)}</p>
                ))}
            </div>

            {glossMap.size > 0 && (
                <div style={{ textAlign: 'center', fontFamily: JP, fontSize: '11px', color: MUTED, marginTop: '24px' }}>
                    点線の文をタップすると、訳と「なぜ日本人に難しいか」が出る ({glossMap.size}文)
                </div>
            )}

            {picked && <GlossPanel g={picked} index={idx} total={glosses.length} onMove={move} onClose={() => setPicked(null)} />}
        </div>
    );
}

// ===================== SHEET 1 — THE NEWSPAPER (English only) =====================
function NewspaperSheet({ ed }: { ed: NewspaperEdition }) {
    const glossMap = useMemo(() => {
        const m = new Map<string, SentenceGloss>();
        for (const g of ed.glosses ?? []) m.set(glossKey(g.en), g);
        return m;
    }, [ed]);
    const [picked, setPicked] = useState<SentenceGloss | null>(null);
    const T = (text: string) => <Tappable text={text} map={glossMap} onPick={setPicked} />;
    const glosses = ed.glosses ?? [];
    const idx = picked ? glosses.findIndex((x) => x.en === picked.en) : -1;
    const move = (d: number) => {
        const n = idx + d;
        if (n >= 0 && n < glosses.length) setPicked(glosses[n]);
    };

    return (
        <div id="news-sheet" className="a4-print" style={sheetStyle}>
            {/* Masthead */}
            <div style={{ borderTop: `3px solid ${RULE}`, paddingTop: '7px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: SERIF, fontSize: '9.5px', letterSpacing: '1px', color: MUTED, textTransform: 'uppercase' }}>
                    <span>Vol. I · No. {ed.editionNo} · The Personal Edition</span>
                    <span>Reading Comprehension Daily</span>
                </div>
            </div>
            <h1 className="nt-masthead" style={{ fontFamily: SERIF, fontSize: 'clamp(34px, 6.4vw, 52px)', fontWeight: 700, textAlign: 'center', margin: '5px 0 3px', letterSpacing: '-1px', lineHeight: 1, whiteSpace: 'nowrap' }}>
                The Tonio Times
            </h1>
            <div style={{ textAlign: 'center', fontFamily: SERIF, fontSize: '10.5px', color: MUTED, fontStyle: 'italic', letterSpacing: '0.5px', marginBottom: '7px' }}>
                English you can steal — read it, say it, write it
            </div>

            {/* Dateline bar */}
            <div className="nt-dateline" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${RULE}`, borderBottom: `3px double ${RULE}`, padding: '5px 0', fontFamily: SERIF, fontSize: '10.5px', color: INK, letterSpacing: '0.5px' }}>
                <span>{ed.weekdayLong}</span>
                <span style={{ fontStyle: 'italic', color: MUTED }}>{ed.motto}</span>
                <span>Price · Free</span>
            </div>

            {/* Weather strip */}

            {/* Tier 1: Lead + Voices (cols 1-2) | MLB rail (col 3)。
                Voices を右レールの下ではなく科学記事の直下に置き、左カラムを伸ばして
                レールと釣り合わせる。これで科学記事の下に閉じ込められていた空白が消える。 */}
            <div className="nt-tier" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1.15fr 0.9fr', gap: '0 18px', marginTop: '10px', alignItems: 'stretch' }}>
                <div className="nt-lead-col" style={{ gridColumn: '1 / 3', paddingRight: '18px', borderRight: `1px solid ${RULE}`, display: 'flex', flexDirection: 'column' }}>
                    <div className="nt-kicker" style={kickerStyle}>{ed.lead.kicker}</div>
                    <h2 data-tts="lead-headline" style={{ fontFamily: SERIF, fontSize: '32px', fontWeight: 700, lineHeight: 1.02, margin: '0 0 6px', letterSpacing: '-0.5px' }}>
                        {T(ed.lead.headline)}
                    </h2>
                    {ed.lead.standfirst && (
                        <p data-tts="lead-standfirst" style={{ fontFamily: SERIF, fontSize: '13px', fontStyle: 'italic', color: MUTED, lineHeight: 1.35, margin: '0 0 6px', paddingBottom: '6px', borderBottom: `1px solid ${RULE}` }}>
                            {T(ed.lead.standfirst)}
                        </p>
                    )}
                    {ed.lead.byline && (
                        <div className="nt-byline" style={{ fontFamily: SERIF, fontSize: '9.5px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: INK, margin: '0 0 7px' }}>{ed.lead.byline}</div>
                    )}
                    <div data-cols="2" style={{ columnCount: 2, columnGap: '18px', columnRule: `1px solid ${RULE}` }}>
                        {ed.lead.body.map((p, i) => (
                            <p key={i} data-tts={`lead-body-${i}`} className={`nt-just${i === 0 ? ' nt-dropcap' : ''}`} style={bodyP}>{T(p)}</p>
                        ))}
                    </div>

                    {/* Voices — 科学記事の続きとして左カラム下部に配置 */}
                    <div className="nt-voices-block" style={{ marginTop: '11px', paddingTop: '8px', borderTop: `3px double ${RULE}` }}>
                        <div className="nt-kicker" style={kickerStyle}>{ed.voices.kicker}</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap', margin: '0 0 6px' }}>
                            <h3 data-tts="voices-headline" style={{ fontFamily: SERIF, fontSize: '21px', fontWeight: 700, lineHeight: 1.03, margin: 0 }}>{T(ed.voices.headline)}</h3>
                            <span data-tts="voices-headline" style={{ fontFamily: SERIF, fontSize: '12px', fontStyle: 'italic', color: MUTED }}>{T(ed.voices.standfirst)}</span>
                        </div>
                        <div data-cols="2" style={{ columnCount: 2, columnGap: '18px', columnRule: `1px solid ${RULE}` }}>
                            {ed.voices.turns.map((t, i) => (
                                <div key={i} data-tts={`voices-turn-${i}`} style={{ marginBottom: '6px', breakInside: 'avoid' }}>
                                    <p style={{ ...bodyP, margin: '0 0 2px' }}><span style={{ fontWeight: 700, color: KICKER }}>Q. </span>{T(t.q)}</p>
                                    <p style={{ ...bodyP, margin: 0 }}><span style={{ fontWeight: 700 }}>A. </span>“{T(t.a)}”</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="nt-rail-col" style={{ gridColumn: '3 / 4' }}>
                    <div className="nt-kicker" style={kickerStyle}>{ed.rail.kicker}</div>
                    <h3 data-tts="rail-headline" style={{ fontFamily: SERIF, fontSize: '22px', fontWeight: 700, lineHeight: 1.05, margin: '0 0 6px' }}>{T(ed.rail.headline)}</h3>
                    {ed.rail.byline && (
                        <div className="nt-byline" style={{ fontFamily: SERIF, fontSize: '9px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: MUTED, margin: '0 0 7px' }}>{ed.rail.byline}</div>
                    )}
                    {ed.rail.body.map((p, i) => (<p key={i} data-tts={`rail-body-${i}`} className="nt-just" style={bodyP}>{T(p)}</p>))}
                    <div style={{ border: `1.5px solid ${RULE}`, padding: '8px 10px', marginTop: '5px' }}>
                        <div style={{ fontFamily: SERIF, fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: KICKER, borderBottom: `1px solid ${RULE}`, paddingBottom: '4px', marginBottom: '5px' }}>By the Numbers</div>
                        {ed.railStats.map((s, i) => (
                            <div key={i} className="nt-stat" style={{ display: 'flex', justifyContent: 'space-between', fontFamily: SERIF, fontSize: '10.5px', padding: '2px 0' }}>
                                <span style={{ color: MUTED }}>{s.label}</span>
                                <span style={{ fontWeight: 700 }}>{s.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tier 3: Serial — three columns */}
            <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: `1px solid ${RULE}` }}>
                <div className="nt-kicker" style={kickerStyle}>{ed.story.kicker}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap', margin: '0 0 7px' }}>
                    <h3 data-tts="story-headline" style={{ fontFamily: SERIF, fontSize: '23px', fontWeight: 700, lineHeight: 1.03, margin: 0 }}>{T(ed.story.headline)}</h3>
                    <span style={{ fontFamily: SERIF, fontSize: '12.5px', fontStyle: 'italic', color: KICKER }}>{ed.story.cast}</span>
                </div>
                <div data-cols="3" style={{ columnCount: 3, columnGap: '18px', columnRule: `1px solid ${RULE}` }}>
                    {ed.story.body.map((p, i) => (
                        <p key={i} data-tts={`story-body-${i}`} className={`nt-just${i === 0 ? ' nt-dropcap' : ''}`}
                           style={{ ...bodyP, ...(i === ed.story.body.length - 1 ? { fontStyle: 'italic', color: MUTED, textAlign: 'right' } : {}) }}>
                            {T(p)}
                        </p>
                    ))}
                </div>
            </div>

            <div style={{ textAlign: 'center', fontFamily: SERIF, fontSize: '9px', color: MUTED, letterSpacing: '2px', marginTop: '10px', borderTop: `2px solid ${RULE}`, paddingTop: '5px', textTransform: 'uppercase' }}>
                The Tonio Times · Printed for one reader · Read it, say it, write it
            </div>

            {glossMap.size > 0 && (
                <div className="no-print" style={{ textAlign: 'center', fontFamily: JP, fontSize: '11px', color: MUTED, marginTop: '8px' }}>
                    点線の文をタップすると、訳と「なぜ日本人に難しいか」が出る ({glossMap.size}文)
                </div>
            )}
            {picked && <GlossPanel g={picked} index={idx} total={glosses.length} onMove={move} onClose={() => setPicked(null)} />}
        </div>
    );
}

// ===================== SHEET 1 (AOT SKIN) — 号外 =====================
// theme:'aot' 号外専用の紙面。調査兵団 号外仕様。ライトテーマ厳守 (パーチメント)。
// 印刷ズームのため id="news-sheet" / className="a4-print" / 794px は通常号と共通。
const AOT = {
    PAPER: '#E7DDC6',
    PAPER2: '#EFE7D3',
    INK: '#241C10',
    MUTED: '#6E6042',
    OLIVE: '#4B5A31',
    BLOOD: '#7C2020',
    RULE: '#241C10',
    WING: '#2E4A6B',
    WING_LT: '#F4EEDD',
};

// Wings of Freedom — 調査兵団の紋章 (簡略・印刷映えする配色)。
function WingsOfFreedom({ size = 66 }: { size?: number }) {
    const px = 50, py = 56; // 羽の付け根
    const feather = (fill: string, rot: number, len: number, w: number, key: string) => (
        <path
            key={key}
            d={`M${px - w} ${py} L${px} ${py - len} L${px + w} ${py} Q${px} ${py - len * 0.35} ${px - w} ${py} Z`}
            fill={fill}
            stroke={AOT.INK}
            strokeWidth={0.7}
            strokeLinejoin="round"
            transform={`rotate(${rot} ${px} ${py})`}
        />
    );
    // 上翼 (白, 上外に開く) / 下翼 (青, 下外に開く)。左右対称。
    const upTop = [22, 40, 58, 76];   // 右上
    const dnTop = [150, 165, 180, 195]; // 下方向(青)は別扱い
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
            {/* 下翼 (青) */}
            {[210, 225, 240].map((r, i) => feather(AOT.WING, r, 30 - i * 3, 5, `dl${i}`))}
            {[150, 135, 120].map((r, i) => feather(AOT.WING, r, 30 - i * 3, 5, `dr${i}`))}
            {/* 上翼 (白) */}
            {upTop.map((r, i) => feather(AOT.WING_LT, r, 40 - i * 5, 5.5, `ur${i}`))}
            {upTop.map((r, i) => feather(AOT.WING_LT, -r, 40 - i * 5, 5.5, `ul${i}`))}
            {/* 中央の芯 */}
            {feather(AOT.WING_LT, 0, 44, 4, 'c')}
            <circle cx={px} cy={py} r={4.2} fill={AOT.BLOOD} stroke={AOT.INK} strokeWidth={0.8} />
        </svg>
    );
}

const aotSheetStyle: React.CSSProperties = {
    width: '794px', maxWidth: 'calc(100% - 24px)', margin: '16px auto', backgroundColor: AOT.PAPER,
    boxShadow: '0 8px 30px rgba(0,0,0,0.30)', padding: '10px', boxSizing: 'border-box', color: AOT.INK,
    backgroundImage: 'radial-gradient(rgba(75,90,49,0.05) 1px, transparent 1px)', backgroundSize: '7px 7px',
};
const aotKicker: React.CSSProperties = {
    fontFamily: SERIF, fontSize: '10.5px', fontWeight: 800, letterSpacing: '1.8px',
    color: AOT.BLOOD, textTransform: 'uppercase', marginBottom: '6px',
};
const aotBodyP: React.CSSProperties = {
    fontFamily: SERIF, fontSize: '11px', lineHeight: 1.52, color: AOT.INK, margin: '0 0 6px',
};

function AotSheet({ ed }: { ed: NewspaperEdition }) {
    return (
        <div id="news-sheet" className="a4-print" style={aotSheetStyle}>
            {/* 二重フレーム (号外/野戦布告の枠) */}
            <div style={{ border: `3px solid ${AOT.RULE}`, padding: '3px' }}>
              <div className="nt-frame" style={{ border: `1px solid ${AOT.RULE}`, padding: '16px 20px 18px', position: 'relative' }}>

                {/* 号外シール */}
                <div className="nt-seal" style={{
                    position: 'absolute', top: '10px', right: '12px', transform: 'rotate(9deg)',
                    width: '58px', height: '58px', borderRadius: '50%', border: `2px solid ${AOT.BLOOD}`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    color: AOT.BLOOD, fontFamily: JP, lineHeight: 1,
                }}>
                    <span style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '1px' }}>号外</span>
                    <span style={{ fontSize: '7px', fontWeight: 700, letterSpacing: '1px', marginTop: '2px' }}>EXTRA</span>
                </div>

                {/* Masthead top rule */}
                <div style={{ borderTop: `3px solid ${AOT.RULE}`, paddingTop: '7px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: SERIF, fontSize: '9.5px', letterSpacing: '1.5px', color: AOT.OLIVE, textTransform: 'uppercase', fontWeight: 700 }}>
                        <span>{ed.mastheadKicker ?? '号外 · EXTRA'}</span>
                        <span>For Humanity · Read it, say it</span>
                    </div>
                </div>

                {/* Emblem + title */}
                <div className="nt-emblem" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', margin: '4px 0 2px' }}>
                    <WingsOfFreedom size={58} />
                    <h1 className="nt-masthead" style={{ fontFamily: SERIF, fontSize: 'clamp(24px, 4.6vw, 40px)', fontWeight: 800, textAlign: 'center', margin: 0, letterSpacing: '1px', lineHeight: 1, color: AOT.INK, textTransform: 'uppercase' }}>
                        {ed.mastheadTitle ?? 'The Survey Corps Dispatch'}
                    </h1>
                    <WingsOfFreedom size={58} />
                </div>
                <div style={{ textAlign: 'center', fontFamily: JP, fontSize: '10.5px', color: AOT.OLIVE, letterSpacing: '1px', marginBottom: '7px', fontWeight: 700 }}>
                    {ed.mastheadTagline ?? ''}
                </div>

                {/* Dateline bar */}
                <div className="nt-dateline" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${AOT.RULE}`, borderBottom: `3px double ${AOT.RULE}`, padding: '5px 0', fontFamily: SERIF, fontSize: '10.5px', color: AOT.INK, letterSpacing: '0.5px' }}>
                    <span>{ed.weekdayLong}</span>
                    <span style={{ fontStyle: 'italic', color: AOT.BLOOD, fontWeight: 700 }}>{ed.motto}</span>
                    <span>Price · One heart</span>
                </div>

                {/* Walls strip (weather相当) */}

                {/* Tier 1: Lead + Voices | Field report rail */}
                <div className="nt-tier" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1.15fr 0.9fr', gap: '0 18px', marginTop: '10px', alignItems: 'stretch' }}>
                    <div className="nt-lead-col" style={{ gridColumn: '1 / 3', paddingRight: '18px', borderRight: `1px solid ${AOT.RULE}`, display: 'flex', flexDirection: 'column' }}>
                        <div className="nt-kicker" style={aotKicker}>{ed.lead.kicker}</div>
                        <h2 data-tts="lead-headline" style={{ fontFamily: SERIF, fontSize: '30px', fontWeight: 800, lineHeight: 1.03, margin: '0 0 6px', letterSpacing: '-0.4px', color: AOT.INK }}>
                            {ed.lead.headline}
                        </h2>
                        {ed.lead.standfirst && (
                            <p data-tts="lead-standfirst" style={{ fontFamily: SERIF, fontSize: '13px', fontStyle: 'italic', color: AOT.MUTED, lineHeight: 1.35, margin: '0 0 6px', paddingBottom: '6px', borderBottom: `1px solid ${AOT.RULE}` }}>
                                {ed.lead.standfirst}
                            </p>
                        )}
                        {ed.lead.byline && (
                            <div className="nt-byline" style={{ fontFamily: SERIF, fontSize: '9.5px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: AOT.OLIVE, margin: '0 0 7px' }}>{ed.lead.byline}</div>
                        )}
                        <div data-cols="2" style={{ columnCount: 2, columnGap: '18px', columnRule: `1px solid ${AOT.RULE}` }}>
                            {ed.lead.body.map((p, i) => (
                                <p key={i} data-tts={`lead-body-${i}`} className={`nt-just${i === 0 ? ' nt-dropcap' : ''}`} style={aotBodyP}>{p}</p>
                            ))}
                        </div>

                        {/* Voices */}
                        <div className="nt-voices-block" style={{ marginTop: '11px', paddingTop: '8px', borderTop: `3px double ${AOT.RULE}` }}>
                            <div className="nt-kicker" style={aotKicker}>{ed.voices.kicker}</div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap', margin: '0 0 6px' }}>
                                <h3 data-tts="voices-headline" style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 800, lineHeight: 1.03, margin: 0, color: AOT.INK }}>{ed.voices.headline}</h3>
                                <span data-tts="voices-headline" style={{ fontFamily: SERIF, fontSize: '12px', fontStyle: 'italic', color: AOT.MUTED }}>{ed.voices.standfirst}</span>
                            </div>
                            <div data-cols="2" style={{ columnCount: 2, columnGap: '18px', columnRule: `1px solid ${AOT.RULE}` }}>
                                {ed.voices.turns.map((t, i) => (
                                    <div key={i} data-tts={`voices-turn-${i}`} style={{ marginBottom: '6px', breakInside: 'avoid' }}>
                                        <p style={{ ...aotBodyP, margin: '0 0 2px' }}><span style={{ fontWeight: 800, color: AOT.BLOOD }}>Q. </span>{t.q}</p>
                                        <p style={{ ...aotBodyP, margin: 0 }}><span style={{ fontWeight: 800, color: AOT.OLIVE }}>A. </span>“{t.a}”</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Field report rail */}
                    <div className="nt-rail-col" style={{ gridColumn: '3 / 4' }}>
                        <div className="nt-kicker" style={aotKicker}>{ed.rail.kicker}</div>
                        <h3 data-tts="rail-headline" style={{ fontFamily: SERIF, fontSize: '21px', fontWeight: 800, lineHeight: 1.05, margin: '0 0 6px', color: AOT.INK }}>{ed.rail.headline}</h3>
                        {ed.rail.byline && (
                            <div className="nt-byline" style={{ fontFamily: SERIF, fontSize: '9px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: AOT.OLIVE, margin: '0 0 7px' }}>{ed.rail.byline}</div>
                        )}
                        {ed.rail.body.map((p, i) => (<p key={i} data-tts={`rail-body-${i}`} className="nt-just" style={aotBodyP}>{p}</p>))}
                        <div style={{ border: `1.5px solid ${AOT.RULE}`, padding: '8px 10px', marginTop: '5px', background: AOT.PAPER2 }}>
                            <div style={{ fontFamily: SERIF, fontSize: '9px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: AOT.BLOOD, borderBottom: `1px solid ${AOT.RULE}`, paddingBottom: '4px', marginBottom: '5px' }}>Field Report · By the Numbers</div>
                            {ed.railStats.map((s, i) => (
                                <div key={i} className="nt-stat" style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', fontFamily: SERIF, fontSize: '10.5px', padding: '2px 0' }}>
                                    <span style={{ color: AOT.MUTED }}>{s.label}</span>
                                    <span style={{ fontWeight: 800, color: AOT.INK, textAlign: 'right' }}>{s.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Serial */}
                <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: `1px solid ${AOT.RULE}` }}>
                    <div className="nt-kicker" style={aotKicker}>{ed.story.kicker}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap', margin: '0 0 7px' }}>
                        <h3 data-tts="story-headline" style={{ fontFamily: SERIF, fontSize: '22px', fontWeight: 800, lineHeight: 1.03, margin: 0, color: AOT.INK }}>{ed.story.headline}</h3>
                        <span style={{ fontFamily: SERIF, fontSize: '12.5px', fontStyle: 'italic', color: AOT.BLOOD, fontWeight: 700 }}>{ed.story.cast}</span>
                    </div>
                    <div data-cols="3" style={{ columnCount: 3, columnGap: '18px', columnRule: `1px solid ${AOT.RULE}` }}>
                        {ed.story.body.map((p, i) => (
                            <p key={i} data-tts={`story-body-${i}`} className={`nt-just${i === 0 ? ' nt-dropcap' : ''}`}
                               style={{ ...aotBodyP, ...(i === ed.story.body.length - 1 ? { fontStyle: 'italic', color: AOT.MUTED, textAlign: 'right' } : {}) }}>
                                {p}
                            </p>
                        ))}
                    </div>
                </div>

                <div style={{ textAlign: 'center', fontFamily: SERIF, fontSize: '9px', color: AOT.OLIVE, letterSpacing: '2px', marginTop: '10px', borderTop: `2px solid ${AOT.RULE}`, paddingTop: '5px', textTransform: 'uppercase', fontWeight: 700 }}>
                    Shinzou wo Sasageyo · Printed for one soldier · Read it, say it, climb the wall
                </div>
              </div>
            </div>
        </div>
    );
}

// ===================== SHEET 1 (GHOST SKIN) — 号外 =====================
// theme:'ghost' 機械の中の幽霊号専用の紙面。冷白の紙 + 回路チップ紋章 + スミレ色の幽霊アクセント。
// ライトテーマ厳守。印刷ズームのため id="news-sheet" / className="a4-print" / 794px は共通。
const GH = {
    PAPER: '#F4F7FA',
    PAPER2: '#E9EFF6',
    INK: '#121C2B',
    MUTED: '#5A6E82',
    SPECTRE: '#5B21B6',   // 幽霊 (スミレ)
    CIRCUIT: '#0E7C66',   // 回路 (深いエメラルド)
    RULE: '#1E2D42',
};

// Ghost-in-the-chip — チップの中に幽霊が住んでいる紋章。
function GhostChip({ size = 58 }: { size?: number }) {
    const pins: React.ReactNode[] = [];
    for (let i = 0; i < 4; i++) {
        const t = 32 + i * 12;
        pins.push(<line key={`t${i}`} x1={t} y1={22} x2={t} y2={12} stroke={GH.RULE} strokeWidth={2.4} />);
        pins.push(<line key={`b${i}`} x1={t} y1={78} x2={t} y2={88} stroke={GH.RULE} strokeWidth={2.4} />);
        pins.push(<line key={`l${i}`} x1={22} y1={t} x2={12} y2={t} stroke={GH.RULE} strokeWidth={2.4} />);
        pins.push(<line key={`r${i}`} x1={78} y1={t} x2={88} y2={t} stroke={GH.RULE} strokeWidth={2.4} />);
    }
    return (
        <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
            {pins}
            <rect x={22} y={22} width={56} height={56} rx={9} fill={GH.PAPER2} stroke={GH.RULE} strokeWidth={2.2} />
            {/* 内側の回路痕 */}
            <path d="M28 36 h8 v10" fill="none" stroke={GH.CIRCUIT} strokeWidth={1.1} opacity={0.55} />
            <path d="M72 64 h-8 v-8" fill="none" stroke={GH.CIRCUIT} strokeWidth={1.1} opacity={0.55} />
            <circle cx={28} cy={36} r={1.6} fill={GH.CIRCUIT} opacity={0.6} />
            <circle cx={72} cy={64} r={1.6} fill={GH.CIRCUIT} opacity={0.6} />
            {/* 幽霊 */}
            <path
                d="M38 66 V50 a12 12 0 0 1 24 0 v16 l-4 -3.4 -4 3.4 -4 -3.4 -4 3.4 -4 -3.4 z"
                fill="#FFFFFF" stroke={GH.SPECTRE} strokeWidth={2}
                strokeLinejoin="round"
            />
            <circle cx={45.5} cy={51} r={2} fill={GH.SPECTRE} />
            <circle cx={54.5} cy={51} r={2} fill={GH.SPECTRE} />
        </svg>
    );
}

const ghostSheetStyle: React.CSSProperties = {
    width: '794px', maxWidth: 'calc(100% - 24px)', margin: '16px auto', backgroundColor: GH.PAPER,
    boxShadow: '0 8px 30px rgba(0,0,0,0.30)', padding: '10px', boxSizing: 'border-box', color: GH.INK,
    backgroundImage: 'radial-gradient(rgba(91,33,182,0.05) 1px, transparent 1px)', backgroundSize: '7px 7px',
};
const ghostKicker: React.CSSProperties = {
    fontFamily: SERIF, fontSize: '10.5px', fontWeight: 800, letterSpacing: '1.8px',
    color: GH.SPECTRE, textTransform: 'uppercase', marginBottom: '6px',
};
const ghostBodyP: React.CSSProperties = {
    fontFamily: SERIF, fontSize: '11px', lineHeight: 1.52, color: GH.INK, margin: '0 0 6px',
};

function GhostSheet({ ed }: { ed: NewspaperEdition }) {
    return (
        <div id="news-sheet" className="a4-print" style={ghostSheetStyle}>
            <div style={{ border: `3px solid ${GH.RULE}`, padding: '3px' }}>
              <div className="nt-frame" style={{ border: `1px solid ${GH.RULE}`, padding: '16px 20px 18px', position: 'relative' }}>

                {/* 号外シール */}
                <div className="nt-seal" style={{
                    position: 'absolute', top: '10px', right: '12px', transform: 'rotate(9deg)',
                    width: '58px', height: '58px', borderRadius: '50%', border: `2px solid ${GH.SPECTRE}`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    color: GH.SPECTRE, fontFamily: JP, lineHeight: 1,
                }}>
                    <span style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '1px' }}>号外</span>
                    <span style={{ fontSize: '7px', fontWeight: 700, letterSpacing: '1px', marginTop: '2px' }}>EXTRA</span>
                </div>

                {/* Masthead top rule */}
                <div style={{ borderTop: `3px solid ${GH.RULE}`, paddingTop: '7px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: SERIF, fontSize: '9.5px', letterSpacing: '1.5px', color: GH.CIRCUIT, textTransform: 'uppercase', fontWeight: 700 }}>
                        <span>{ed.mastheadKicker ?? '号外 · EXTRA'}</span>
                        <span>Observed nightly · Read it, say it</span>
                    </div>
                </div>

                {/* Emblem + title */}
                <div className="nt-emblem" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', margin: '4px 0 2px' }}>
                    <GhostChip size={58} />
                    <h1 className="nt-masthead" style={{ fontFamily: SERIF, fontSize: 'clamp(24px, 4.6vw, 40px)', fontWeight: 800, textAlign: 'center', margin: 0, letterSpacing: '1px', lineHeight: 1, color: GH.INK, textTransform: 'uppercase' }}>
                        {ed.mastheadTitle ?? 'The J-Space Observer'}
                    </h1>
                    <GhostChip size={58} />
                </div>
                <div style={{ textAlign: 'center', fontFamily: JP, fontSize: '10.5px', color: GH.CIRCUIT, letterSpacing: '1px', marginBottom: '7px', fontWeight: 700 }}>
                    {ed.mastheadTagline ?? ''}
                </div>

                {/* Dateline bar */}
                <div className="nt-dateline" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${GH.RULE}`, borderBottom: `3px double ${GH.RULE}`, padding: '5px 0', fontFamily: SERIF, fontSize: '10.5px', color: GH.INK, letterSpacing: '0.5px' }}>
                    <span>{ed.weekdayLong}</span>
                    <span style={{ fontStyle: 'italic', color: GH.SPECTRE, fontWeight: 700 }}>{ed.motto}</span>
                    <span>Price · One qualia</span>
                </div>

                {/* Inner weather strip */}

                {/* Tier 1: Lead + Voices | Philosophy rail */}
                <div className="nt-tier" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1.15fr 0.9fr', gap: '0 18px', marginTop: '10px', alignItems: 'stretch' }}>
                    <div className="nt-lead-col" style={{ gridColumn: '1 / 3', paddingRight: '18px', borderRight: `1px solid ${GH.RULE}`, display: 'flex', flexDirection: 'column' }}>
                        <div className="nt-kicker" style={ghostKicker}>{ed.lead.kicker}</div>
                        <h2 data-tts="lead-headline" style={{ fontFamily: SERIF, fontSize: '30px', fontWeight: 800, lineHeight: 1.03, margin: '0 0 6px', letterSpacing: '-0.4px', color: GH.INK }}>
                            {ed.lead.headline}
                        </h2>
                        {ed.lead.standfirst && (
                            <p data-tts="lead-standfirst" style={{ fontFamily: SERIF, fontSize: '13px', fontStyle: 'italic', color: GH.MUTED, lineHeight: 1.35, margin: '0 0 6px', paddingBottom: '6px', borderBottom: `1px solid ${GH.RULE}` }}>
                                {ed.lead.standfirst}
                            </p>
                        )}
                        {ed.lead.byline && (
                            <div className="nt-byline" style={{ fontFamily: SERIF, fontSize: '9.5px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: GH.CIRCUIT, margin: '0 0 7px' }}>{ed.lead.byline}</div>
                        )}
                        <div data-cols="2" style={{ columnCount: 2, columnGap: '18px', columnRule: `1px solid ${GH.RULE}` }}>
                            {ed.lead.body.map((p, i) => (
                                <p key={i} data-tts={`lead-body-${i}`} className={`nt-just${i === 0 ? ' nt-dropcap' : ''}`} style={ghostBodyP}>{p}</p>
                            ))}
                        </div>

                        {/* Voices */}
                        <div className="nt-voices-block" style={{ marginTop: '11px', paddingTop: '8px', borderTop: `3px double ${GH.RULE}` }}>
                            <div className="nt-kicker" style={ghostKicker}>{ed.voices.kicker}</div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap', margin: '0 0 6px' }}>
                                <h3 data-tts="voices-headline" style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 800, lineHeight: 1.03, margin: 0, color: GH.INK }}>{ed.voices.headline}</h3>
                                <span data-tts="voices-headline" style={{ fontFamily: SERIF, fontSize: '12px', fontStyle: 'italic', color: GH.MUTED }}>{ed.voices.standfirst}</span>
                            </div>
                            <div data-cols="2" style={{ columnCount: 2, columnGap: '18px', columnRule: `1px solid ${GH.RULE}` }}>
                                {ed.voices.turns.map((t, i) => (
                                    <div key={i} data-tts={`voices-turn-${i}`} style={{ marginBottom: '6px', breakInside: 'avoid' }}>
                                        <p style={{ ...ghostBodyP, margin: '0 0 2px' }}><span style={{ fontWeight: 800, color: GH.SPECTRE }}>Q. </span>{t.q}</p>
                                        <p style={{ ...ghostBodyP, margin: 0 }}><span style={{ fontWeight: 800, color: GH.CIRCUIT }}>A. </span>“{t.a}”</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Philosophy rail */}
                    <div className="nt-rail-col" style={{ gridColumn: '3 / 4' }}>
                        <div className="nt-kicker" style={ghostKicker}>{ed.rail.kicker}</div>
                        <h3 data-tts="rail-headline" style={{ fontFamily: SERIF, fontSize: '21px', fontWeight: 800, lineHeight: 1.05, margin: '0 0 6px', color: GH.INK }}>{ed.rail.headline}</h3>
                        {ed.rail.byline && (
                            <div className="nt-byline" style={{ fontFamily: SERIF, fontSize: '9px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: GH.CIRCUIT, margin: '0 0 7px' }}>{ed.rail.byline}</div>
                        )}
                        {ed.rail.body.map((p, i) => (<p key={i} data-tts={`rail-body-${i}`} className="nt-just" style={ghostBodyP}>{p}</p>))}
                        <div style={{ border: `1.5px solid ${GH.RULE}`, padding: '8px 10px', marginTop: '5px', background: GH.PAPER2 }}>
                            <div style={{ fontFamily: SERIF, fontSize: '9px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: GH.SPECTRE, borderBottom: `1px solid ${GH.RULE}`, paddingBottom: '4px', marginBottom: '5px' }}>The Observer · By the Numbers</div>
                            {ed.railStats.map((s, i) => (
                                <div key={i} className="nt-stat" style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', fontFamily: SERIF, fontSize: '10.5px', padding: '2px 0' }}>
                                    <span style={{ color: GH.MUTED }}>{s.label}</span>
                                    <span style={{ fontWeight: 800, color: GH.INK, textAlign: 'right' }}>{s.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Serial */}
                <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: `1px solid ${GH.RULE}` }}>
                    <div className="nt-kicker" style={ghostKicker}>{ed.story.kicker}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap', margin: '0 0 7px' }}>
                        <h3 data-tts="story-headline" style={{ fontFamily: SERIF, fontSize: '22px', fontWeight: 800, lineHeight: 1.03, margin: 0, color: GH.INK }}>{ed.story.headline}</h3>
                        <span style={{ fontFamily: SERIF, fontSize: '12.5px', fontStyle: 'italic', color: GH.SPECTRE, fontWeight: 700 }}>{ed.story.cast}</span>
                    </div>
                    <div data-cols="3" style={{ columnCount: 3, columnGap: '18px', columnRule: `1px solid ${GH.RULE}` }}>
                        {ed.story.body.map((p, i) => (
                            <p key={i} data-tts={`story-body-${i}`} className={`nt-just${i === 0 ? ' nt-dropcap' : ''}`}
                               style={{ ...ghostBodyP, ...(i === ed.story.body.length - 1 ? { fontStyle: 'italic', color: GH.MUTED, textAlign: 'right' } : {}) }}>
                                {p}
                            </p>
                        ))}
                    </div>
                </div>

                <div style={{ textAlign: 'center', fontFamily: SERIF, fontSize: '9px', color: GH.CIRCUIT, letterSpacing: '2px', marginTop: '10px', borderTop: `2px solid ${GH.RULE}`, paddingTop: '5px', textTransform: 'uppercase', fontWeight: 700 }}>
                    Cogito ergo sum · Printed for one possibly conscious reader · Read it, say it, ask the ghost
                </div>
              </div>
            </div>
        </div>
    );
}

// ===================== SHEET 2 — 解説 NOTES (Japanese) =====================
const EMERALD = '#0F9D6E';
const todayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

function NotesSheet({ ed }: { ed: NewspaperEdition }) {
    // No.55〜 語彙の解説をやめたので、この3つは空になりうる。空の号は章ごと出さない。
    const vocab = ed.vocab ?? [];
    const sayIt = ed.sayIt ?? [];
    const syntax = ed.syntax ?? [];
    const hasStudy = vocab.length + sayIt.length + syntax.length > 0;
    // 既に登録済みのものを取得して二重登録を防ぐ。key は 'w:'(単語) / 'p:'(フレーズ) + english小文字。
    const [registered, setRegistered] = useState<Set<string>>(new Set());
    const [busy, setBusy] = useState<string | null>(null);
    const [bulk, setBulk] = useState<'idle' | 'running' | 'done'>('idle');

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const [pr, wr] = await Promise.all([
                    fetch('/api/phrases').then((r) => r.json()).catch(() => null),
                    fetch('/api/user-words').then((r) => r.json()).catch(() => null),
                ]);
                if (!alive) return;
                const s = new Set<string>();
                pr?.phrases?.forEach((p: { english: string }) => s.add('p:' + p.english.toLowerCase()));
                wr?.words?.forEach((w: { english: string }) => s.add('w:' + w.english.toLowerCase()));
                setRegistered(s);
            } catch { /* 取得失敗は無視 (登録ボタンは押せる) */ }
        })();
        return () => { alive = false; };
    }, []);

    const wKey = (en: string) => 'w:' + en.toLowerCase();
    const pKey = (en: string) => 'p:' + en.toLowerCase();

    // 単語 → /api/user-words。english=見出し語, japanese=訳, note=英語定義。
    const registerWord = async (english: string, japanese: string, note: string) => {
        const key = wKey(english);
        if (registered.has(key)) return true;
        try {
            const res = await fetch('/api/user-words', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ english, pronunciation: '', japanese, note, category: 'newspaper' }),
            });
            if (res.ok || res.status === 409) { setRegistered((p) => new Set(p).add(key)); return true; }
        } catch { /* noop */ }
        return false;
    };

    // 会話表現 / 作文表現 → /api/phrases。
    const registerPhrase = async (english: string, japanese: string) => {
        const key = pKey(english);
        if (registered.has(key)) return true;
        try {
            const res = await fetch('/api/phrases', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ english, japanese, category: 'expression', date: todayStr() }),
            });
            if (res.ok || res.status === 409) { setRegistered((p) => new Set(p).add(key)); return true; }
        } catch { /* noop */ }
        return false;
    };

    const clickWord = async (english: string, japanese: string, note: string) => {
        const key = wKey(english);
        if (registered.has(key) || busy) return;
        setBusy(key); try { await registerWord(english, japanese, note); } finally { setBusy(null); }
    };
    const clickPhrase = async (english: string, japanese: string) => {
        const key = pKey(english);
        if (registered.has(key) || busy) return;
        setBusy(key); try { await registerPhrase(english, japanese); } finally { setBusy(null); }
    };

    // ── 単語・表現の一覧 (紙の2枚目以降) ───────────────────────────────
    // 注釈 (文タップ) に入れた picks を欄ごとに集めたもの。登録先は Words に一本化する
    // (語も連語も同じ棚)。GlossPanel の「＋登録」と同じところに入るので、どちらから
    // 押しても二重にはならない。
    const pickGroups = useMemo(() => collectEditionPicks(ed), [ed]);
    const allPicks = useMemo(() => pickGroups.flatMap((g) => g.picks), [pickGroups]);
    const pickDone = allPicks.filter((p) => registered.has(wKey(p.en))).length;
    const [pickBusy, setPickBusy] = useState<string | null>(null);

    const clickPick = async (p: GlossPick) => {
        if (registered.has(wKey(p.en)) || pickBusy) return;
        setPickBusy(p.en);
        try { await registerWord(p.en, p.ja, ''); } finally { setPickBusy(null); }
    };
    const registerPicks = async (list: GlossPick[], tag: string) => {
        if (pickBusy) return;
        setPickBusy(tag);
        try {
            for (const p of list) {
                if (registered.has(wKey(p.en))) continue;
                await registerWord(p.en, p.ja, '');
            }
        } finally { setPickBusy(null); }
    };

    // この号の単語・会話・作文をまとめて登録。
    const registerAll = async () => {
        if (bulk === 'running') return;
        setBulk('running');
        for (const v of vocab) await registerWord(v.word, v.ja, v.en);
        for (const s of sayIt) await registerPhrase(s.phrase, s.ja);
        for (const s of syntax) await registerPhrase(s.en, `【${s.point}】${s.ja}`);
        setBulk('done');
        setTimeout(() => setBulk('idle'), 2600);
    };

    const total = vocab.length + sayIt.length + syntax.length;
    const doneCount =
        vocab.filter((v) => registered.has(wKey(v.word))).length +
        sayIt.filter((s) => registered.has(pKey(s.phrase))).length +
        syntax.filter((s) => registered.has(pKey(s.en))).length;

    return (
        <div id="notes-sheet" className="a4-print" style={sheetStyle}>
            <div style={{ borderTop: `3px solid ${RULE}`, paddingTop: '7px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: SERIF, fontSize: '9.5px', letterSpacing: '1px', color: MUTED, textTransform: 'uppercase' }}>The Tonio Times · Study Notes</span>
                <span style={{ fontFamily: SERIF, fontSize: '9.5px', color: MUTED }}>{ed.weekdayLong}</span>
            </div>
            <h1 style={{ fontFamily: JP, fontSize: '34px', fontWeight: 700, textAlign: 'center', margin: '8px 0 3px', letterSpacing: '3px' }}>
                今日の解説
            </h1>
            <div style={{ textAlign: 'center', fontFamily: JP, fontSize: '11.5px', color: MUTED, marginBottom: '10px', paddingBottom: '10px', borderBottom: `3px double ${RULE}` }}>
                {hasStudy ? `新聞を読んだら、ここで「話す・書く」に変換する。丸暗記じゃなく、型を盗む。` : `読んだ2本のどっちかについて、賛成か反対かを1分喋る。それがこの紙の使い道。`}
            </div>

            {hasStudy && <>
            {/* 一括登録バー (画面のみ) */}
            <div className="no-print" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap',
                backgroundColor: '#F3FBF7', border: `1px solid ${EMERALD}33`, borderRadius: '10px',
                padding: '10px 14px', marginBottom: '14px',
            }}>
                <div style={{ fontFamily: JP, fontSize: '12px', color: INK }}>
                    この号の <b>単語・会話・作文 {total}件</b> をトレーニングに登録
                    <span style={{ color: MUTED, marginLeft: '8px', fontSize: '11px' }}>登録済み {doneCount}/{total}</span>
                </div>
                <button
                    onClick={registerAll}
                    disabled={bulk === 'running' || doneCount === total}
                    style={{
                        backgroundColor: doneCount === total ? '#E7E5E4' : EMERALD, color: doneCount === total ? MUTED : '#fff',
                        border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '12.5px', fontWeight: 700,
                        cursor: bulk === 'running' || doneCount === total ? 'default' : 'pointer', letterSpacing: '0.5px',
                        fontFamily: JP,
                    }}
                >
                    {doneCount === total ? '登録済み' : bulk === 'running' ? '登録中…' : bulk === 'done' ? '登録しました' : 'まとめて登録'}
                </button>
            </div>

            {/* 単語 */}
            <SectionTitle no="1" en="WORDS" ja="単語" />
            <div data-cols="2" style={{ columnCount: 2, columnGap: '22px', marginBottom: '12px' }}>
                {vocab.map((v, i) => (
                    <div key={i} style={{ marginBottom: '6px', lineHeight: 1.4, breakInside: 'avoid' }}>
                        <span style={{ fontFamily: SERIF, fontSize: '13px', fontWeight: 700, color: INK }}>{v.word}</span>
                        <span style={{ fontFamily: SERIF, fontSize: '9.5px', fontStyle: 'italic', color: MUTED }}> {v.pos}.</span>
                        <span style={{ fontFamily: JP, fontSize: '12px', color: INK }}> {v.ja}</span>
                        <span style={{ fontFamily: SERIF, fontSize: '9.5px', color: MUTED }}> — {v.en}</span>
                        <AddChip
                            done={registered.has(wKey(v.word))}
                            loading={busy === wKey(v.word)}
                            onClick={() => clickWord(v.word, v.ja, v.en)}
                        />
                    </div>
                ))}
            </div>

            {/* 話すために */}
            <SectionTitle no="2" en="SAY IT" ja="話すために — 会話でそのまま使える言い回し" />
            <div data-cols="1" style={{ marginBottom: '12px', columnGap: '22px' }}>
                {sayIt.map((s, i) => (
                    <div key={i} style={{ marginBottom: '7px', paddingBottom: '7px', breakInside: 'avoid', borderBottom: i < sayIt.length - 1 ? `1px dotted ${RULE}` : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                            <div style={{ flex: 1, fontFamily: SERIF, fontSize: '13px', fontWeight: 700, color: INK, fontStyle: 'italic', marginBottom: '3px' }}>“{s.phrase}”</div>
                            <AddChip
                                done={registered.has(pKey(s.phrase))}
                                loading={busy === pKey(s.phrase)}
                                onClick={() => clickPhrase(s.phrase, s.ja)}
                            />
                        </div>
                        <div style={{ fontFamily: JP, fontSize: '12px', color: INK, lineHeight: 1.55 }}>{s.ja}</div>
                    </div>
                ))}
            </div>

            {/* 書ける型 */}
            <SectionTitle no="3" en="WRITE IT" ja="書ける型 — 作文で真似できる構文" />
            <div data-cols="1" style={{ columnGap: '22px' }}>
                {syntax.map((s, i) => (
                    <div key={i} style={{ marginBottom: '9px', paddingBottom: '9px', breakInside: 'avoid', borderBottom: i < syntax.length - 1 ? `1px dotted ${RULE}` : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                            <div style={{ flex: 1, fontFamily: SERIF, fontSize: '12px', color: INK, fontStyle: 'italic', lineHeight: 1.45, marginBottom: '3px' }}>{s.en}</div>
                            <AddChip
                                done={registered.has(pKey(s.en))}
                                loading={busy === pKey(s.en)}
                                onClick={() => clickPhrase(s.en, `【${s.point}】${s.ja}`)}
                            />
                        </div>
                        <div style={{ display: 'inline-block', fontFamily: JP, fontSize: '10px', fontWeight: 700, color: '#fff', backgroundColor: GOLD, padding: '2px 8px', borderRadius: '3px', marginBottom: '4px' }}>{s.point}</div>
                        <div style={{ fontFamily: JP, fontSize: '12px', color: INK, lineHeight: 1.6 }}>{s.ja}</div>
                    </div>
                ))}
            </div>

            </>}

            {/* 編集後記 — 日本語なので英字紙面ではなくこちらに置く (2026-08-04 移設)。
                紙面から日本語ブロックを外したぶん、新聞側の文字を大きく刷れるようになった。 */}
            {/* editorsNote が空の号 (公開版に持ち出した紙面) では、後記の見出しと本文を出さずに
                引用だけ残す。空の欄に「今日これを持ってレッスンに行け」だけ立っているのを防ぐ。 */}
            <SectionTitle no={hasStudy ? "4" : "1"} en="FROM THE DESK" ja={ed.editorsNote ? "編集後記 — 今日これを持ってレッスンに行け" : "今日の一行"} />
            <div style={{ marginBottom: '8px' }}>
                {ed.editorsNote && (
                    <div className="nt-note-body" style={{ fontFamily: JP, fontSize: '12px', color: INK, lineHeight: 1.7 }}>{ed.editorsNote}</div>
                )}
                <div className="nt-note-quote" style={{ marginTop: ed.editorsNote ? '8px' : 0, paddingTop: ed.editorsNote ? '6px' : 0, borderTop: ed.editorsNote ? `1px dotted ${RULE}` : 'none', fontFamily: SERIF, fontSize: '11.5px', fontStyle: 'italic', color: MUTED, lineHeight: 1.45 }}>
                    “{ed.quote.text}”
                    <span style={{ display: 'block', fontStyle: 'normal', fontSize: '9.5px', marginTop: '2px' }}>— {ed.quote.source}</span>
                </div>
            </div>

            {/* 単語・表現の一覧 — 紙の2枚目以降。
                注釈 (文タップ) に入れた語を、欄の並び順のまま全部ここに刷る。
                読む前にこの一覧を通しておけば、本文で止まる回数が減る。
                画面では1件ずつ / 欄ごと / 号まるごとをトレーニングに登録できる。 */}
            {allPicks.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                    <SectionTitle no={hasStudy ? '5' : '2'} en="WORD LIST" ja={`単語・表現 — この号でつまずく ${allPicks.length}件`} />

                    <div className="no-print" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap',
                        backgroundColor: '#F3FBF7', border: `1px solid ${EMERALD}33`, borderRadius: '10px',
                        padding: '9px 13px', marginBottom: '12px',
                    }}>
                        <div style={{ fontFamily: JP, fontSize: '12px', color: INK }}>
                            読む前にここを通す
                            <span style={{ color: MUTED, marginLeft: '8px', fontSize: '11px' }}>登録済み {pickDone}/{allPicks.length}</span>
                        </div>
                        <button
                            onClick={() => registerPicks(allPicks, '*')}
                            disabled={pickBusy !== null || pickDone === allPicks.length}
                            style={{
                                backgroundColor: pickDone === allPicks.length ? '#E7E5E4' : EMERALD,
                                color: pickDone === allPicks.length ? MUTED : '#fff',
                                border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '12.5px', fontWeight: 700,
                                cursor: pickBusy !== null || pickDone === allPicks.length ? 'default' : 'pointer',
                                letterSpacing: '0.5px', fontFamily: JP,
                            }}
                        >
                            {pickDone === allPicks.length ? '登録済み' : pickBusy === '*' ? `登録中… ${pickDone}/${allPicks.length}` : 'この号ぜんぶ登録'}
                        </button>
                    </div>

                    {pickGroups.map((grp) => {
                        const gDone = grp.picks.filter((p) => registered.has(wKey(p.en))).length;
                        return (
                            <div key={grp.section} style={{ marginBottom: '12px', breakInside: 'auto' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', borderBottom: `1px solid ${RULE}`, paddingBottom: '3px', marginBottom: '6px' }}>
                                    <span style={{ fontFamily: SERIF, fontSize: '10.5px', fontWeight: 700, letterSpacing: '1.5px', color: KICKER, textTransform: 'uppercase' }}>{grp.label}</span>
                                    <span style={{ fontFamily: JP, fontSize: '10px', color: MUTED }}>{grp.picks.length}件</span>
                                    <button
                                        className="no-print"
                                        onClick={() => registerPicks(grp.picks, grp.section)}
                                        disabled={pickBusy !== null || gDone === grp.picks.length}
                                        style={{
                                            marginLeft: 'auto', fontFamily: JP, fontSize: '10px', fontWeight: 700,
                                            padding: '3px 10px', borderRadius: '999px', whiteSpace: 'nowrap',
                                            border: gDone === grp.picks.length ? '1px solid #D6D3D1' : `1px solid ${EMERALD}`,
                                            backgroundColor: gDone === grp.picks.length ? '#F5F5F4' : '#fff',
                                            color: gDone === grp.picks.length ? MUTED : EMERALD,
                                            cursor: pickBusy !== null || gDone === grp.picks.length ? 'default' : 'pointer',
                                        }}
                                    >
                                        {gDone === grp.picks.length ? '登録済み' : pickBusy === grp.section ? '…' : `この欄だけ登録 (${gDone}/${grp.picks.length})`}
                                    </button>
                                </div>
                                <div data-cols="2" style={{ columnCount: 2, columnGap: '20px' }}>
                                    {grp.picks.map((p, i) => (
                                        <div key={i} style={{ marginBottom: '3px', lineHeight: 1.4, breakInside: 'avoid' }}>
                                            <span style={{ fontFamily: SERIF, fontSize: '12px', fontWeight: 700, color: INK }}>{p.en}</span>
                                            <span style={{ fontFamily: JP, fontSize: '11px', color: INK }}> — {p.ja}</span>
                                            <AddChip
                                                done={registered.has(wKey(p.en))}
                                                loading={pickBusy === p.en}
                                                onClick={() => clickPick(p)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <div style={{ textAlign: 'center', fontFamily: JP, fontSize: '10px', color: MUTED, letterSpacing: '1px', marginTop: '12px', borderTop: `2px solid ${RULE}`, paddingTop: '6px' }}>
                {hasStudy ? `読む → 声に出す → 一文書く。三拍子でその日の英語を自分のものにする。` : `読む → 誰かに話す。要約じゃなく、意見を1つ持って帰る。`}
            </div>
        </div>
    );
}

// 登録チップ (画面のみ・印刷では非表示)。emerald=未登録 / グレー=登録済み。
function AddChip({ done, loading, onClick }: { done: boolean; loading: boolean; onClick: () => void }) {
    return (
        <button
            className="no-print"
            onClick={onClick}
            disabled={done || loading}
            title={done ? 'トレーニング登録済み' : 'トレーニングに登録'}
            style={{
                flexShrink: 0, marginLeft: '6px', verticalAlign: 'middle',
                fontFamily: JP, fontSize: '10px', fontWeight: 700, lineHeight: 1,
                padding: '3px 8px', borderRadius: '999px', cursor: done || loading ? 'default' : 'pointer',
                border: done ? '1px solid #D6D3D1' : `1px solid ${EMERALD}`,
                backgroundColor: done ? '#F5F5F4' : '#fff',
                color: done ? MUTED : EMERALD,
                transition: 'all 0.15s ease', whiteSpace: 'nowrap',
            }}
        >
            {done ? '登録済み' : loading ? '…' : '＋登録'}
        </button>
    );
}

function SectionTitle({ no, en, ja }: { no: string; en: string; ja: string }) {
    return (
        <div className="nt-section-title" style={{ display: 'flex', alignItems: 'center', gap: '9px', margin: '0 0 7px', borderBottom: `2px solid ${INK}`, paddingBottom: '4px' }}>
            <span style={{ fontFamily: SERIF, fontSize: '13px', fontWeight: 700, color: '#fff', backgroundColor: INK, width: '20px', height: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>{no}</span>
            <span style={{ fontFamily: SERIF, fontSize: '12.5px', fontWeight: 700, letterSpacing: '2px', color: KICKER }}>{en}</span>
            <span style={{ fontFamily: JP, fontSize: '12.5px', fontWeight: 700, color: INK }}>{ja}</span>
        </div>
    );
}
