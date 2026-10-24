'use client';

// 月刊TOLERANCY シェア用カード — note/X 投稿用の1200×675(16:9)カード。
// 3つのデザインパターンをタブで比較できる:
//   A: 少年漫画誌風(黄×赤、袋文字、密度MAX) / B: スクープ週刊誌風(縦書き、事件報道) /
//   C: カルチャー誌風(特集主義、大タイポ)
// カードHTMLは「インラインstyleのみの文字列」で組み、画面プレビューと
// SVG foreignObject 経由の PNG 書き出し(2400×1350)で同じ文字列を使う。
// 外部CSS/画像に依存しないこと(foreignObject内では効かない)。データは magazine.ts。

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getLatestIssue, type FakeWordEntry, type MagazineIssue } from '@/data/english/magazine';

const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";
const SANS = "'Helvetica Neue', Arial, 'Yu Gothic', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif";

const W = 1200;
const H = 675;

// 袋文字(アウトライン)を text-shadow 8方向で作る。foreignObject でも描画される。
function outline(px: number, color: string): string {
    return `text-shadow:${[
        `-${px}px -${px}px 0 ${color}`, `${px}px -${px}px 0 ${color}`,
        `-${px}px ${px}px 0 ${color}`, `${px}px ${px}px 0 ${color}`,
        `-${px}px 0 0 ${color}`, `${px}px 0 0 ${color}`,
        `0 -${px}px 0 ${color}`, `0 ${px}px 0 ${color}`,
    ].join(',')}`;
}

const BARCODE = 'background:repeating-linear-gradient(90deg,#111 0px,#111 3px,#fff 3px,#fff 6px)';

// =====================================================================
// パターンA: 少年漫画誌風 — 黄地、赤題字、袋文字、バクダン、帯コピー乱れ打ち
// =====================================================================

function aShell(inner: string): string {
    return `<div style="width:${W}px;height:${H}px;background-color:#FFD900;box-sizing:border-box;position:relative;font-family:${SANS};overflow:hidden">`
        + `<div style="position:absolute;top:-40px;right:-160px;width:520px;height:520px;border-radius:9999px;background-color:#FFF3B0;opacity:0.6"></div>`
        + `<div style="position:absolute;bottom:-120px;left:-100px;width:420px;height:420px;border-radius:9999px;background-color:#FFC400;opacity:0.7"></div>`
        + inner
        + `</div>`;
}

function aCover(vol3: string): string {
    return aShell(
        // 題字(赤帯・傾き)
        `<div style="position:absolute;top:26px;left:-14px;background-color:#E60012;padding:16px 60px 16px 40px;transform:rotate(-2deg);box-shadow:6px 6px 0 rgba(0,0,0,0.85)">`
        + `<div style="font-size:88px;font-weight:900;color:#FFFFFF;letter-spacing:-2px;line-height:1;${outline(4, '#000000')}">月刊TOLERANCY</div>`
        + `<div style="font-size:20px;font-weight:900;color:#FFD900;margin-top:6px;letter-spacing:4px">ソンザイシナイ英単語マガジン</div>`
        + `</div>`
        // 創刊号バクダン
        + `<div style="position:absolute;top:150px;right:40px;width:230px;height:230px;border-radius:9999px;background-color:#E60012;border:8px solid #FFFFFF;box-shadow:6px 6px 0 rgba(0,0,0,0.85);transform:rotate(8deg);display:flex;flex-direction:column;justify-content:center;align-items:center">`
        + `<div style="font-size:64px;font-weight:900;color:#FFFFFF;line-height:1.05;${outline(3, '#000000')}">創刊<br/>号!!</div>`
        + `<div style="font-size:17px;font-weight:900;color:#FFD900;margin-top:4px">Vol.${vol3}</div>`
        + `</div>`
        // メイン煽り
        + `<div style="position:absolute;top:220px;left:46px;transform:rotate(-1deg)">`
        + `<div style="font-size:30px;font-weight:900;color:#000000;background-color:#FFFFFF;display:inline-block;padding:6px 18px;border:4px solid #000000">この単語、英語に存在しません</div>`
        + `<div style="font-size:92px;font-weight:900;color:#0068B7;line-height:1.1;margin-top:12px;${outline(6, '#FFFFFF')}">存在しない英単語が<br/>月刊誌になった!!</div>`
        + `</div>`
        // 帯コピー(下部・色違い斜めストリップ)
        + `<div style="position:absolute;bottom:118px;left:24px;background-color:#E6007E;color:#FFFFFF;font-size:26px;font-weight:900;padding:8px 22px;transform:rotate(-1.5deg);box-shadow:4px 4px 0 rgba(0,0,0,0.85)">大特集 捏造語大全 — 発明された英単語、全4語収録!!</div>`
        + `<div style="position:absolute;bottom:64px;left:60px;background-color:#0068B7;color:#FFFFFF;font-size:24px;font-weight:900;padding:7px 20px;transform:rotate(1deg);box-shadow:4px 4px 0 rgba(0,0,0,0.85)">冠詞「a」4日連続欠席!! 観測史上最長を更新中</div>`
        + `<div style="position:absolute;bottom:14px;left:30px;background-color:#009944;color:#FFFFFF;font-size:22px;font-weight:900;padding:6px 18px;transform:rotate(-1deg);box-shadow:4px 4px 0 rgba(0,0,0,0.85)">豚は汗をかかない — 今月のベストラリー収録</div>`
        // 右下 定価+バーコード
        + `<div style="position:absolute;bottom:16px;right:20px;background-color:#FFFFFF;border:3px solid #000000;padding:8px 14px;transform:rotate(1deg)">`
        + `<div style="font-size:18px;font-weight:900;color:#000000">定価0円(税込)</div>`
        + `<div style="font-size:13px;font-weight:700;color:#E60012">※恥は別売り</div>`
        + `<div style="width:120px;height:26px;margin-top:6px;${BARCODE}"></div>`
        + `</div>`
        // 題字下の煽り帯
        + `<div style="position:absolute;top:176px;left:46px;background-color:#000000;color:#FFD900;font-size:18px;font-weight:900;padding:5px 16px;letter-spacing:2px;transform:rotate(-1deg)">英検1級勉強中、冠詞は初級の男、堂々創刊</div>`
    );
}

function aWord(w: FakeWordEntry, fileNo: number): string {
    const no = String(fileNo).padStart(2, '0');
    return aShell(
        // 上部赤帯
        `<div style="position:absolute;top:0;left:0;right:0;background-color:#E60012;padding:12px 30px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 5px 0 rgba(0,0,0,0.85)">`
        + `<span style="font-size:30px;font-weight:900;color:#FFFFFF;${outline(2, '#000000')}">月刊TOLERANCY 今月の捏造語</span>`
        + `<span style="font-size:24px;font-weight:900;color:#E60012;background-color:#FFFFFF;padding:4px 16px;border:3px solid #000000">File No.${no}</span>`
        + `</div>`
        // 単語ドーン
        + `<div style="position:absolute;top:96px;left:40px;transform:rotate(-1.5deg)">`
        + `<div style="font-size:110px;font-weight:900;color:#E60012;line-height:1;letter-spacing:-3px;${outline(6, '#FFFFFF')}">${w.word}</div>`
        + `<div style="display:flex;align-items:center;margin-top:10px">`
        + `<span style="font-family:${SERIF};font-size:26px;color:#000000">${w.pronunciation}</span>`
        + `<span style="font-size:22px;font-weight:900;color:#FFFFFF;background-color:#000000;padding:4px 14px;margin-left:16px;transform:rotate(-1deg)">${w.pos}</span>`
        + `</div>`
        + `</div>`
        // 架空の語義(白フキダシ風)
        + `<div style="position:absolute;top:300px;left:40px;right:330px;background-color:#FFFFFF;border:4px solid #000000;padding:18px 24px;transform:rotate(0.5deg);box-shadow:5px 5px 0 rgba(0,0,0,0.85)">`
        + `<div style="font-size:27px;font-weight:900;color:#000000;line-height:1.6">${w.fakeDefinition}</div>`
        + `</div>`
        // 実際の発言(黒帯)
        + `<div style="position:absolute;top:462px;left:40px;background-color:#000000;color:#FFD900;font-size:21px;font-weight:700;padding:8px 18px;transform:rotate(-0.5deg)">実録 ${w.firstSeen} — <span style="font-family:${SERIF};font-style:italic;color:#FFFFFF">${w.spoke}</span></div>`
        // 正解バクダン
        + `<div style="position:absolute;top:290px;right:26px;width:270px;background-color:#009944;border:6px solid #FFFFFF;box-shadow:5px 5px 0 rgba(0,0,0,0.85);transform:rotate(2deg);padding:16px 18px">`
        + `<div style="font-size:24px;font-weight:900;color:#FFD900;${outline(2, '#000000')}">正解はこっち!!</div>`
        + `<div style="font-family:${SERIF};font-size:34px;font-weight:700;color:#FFFFFF;margin-top:6px">${w.correct.word}</div>`
        + `<div style="font-size:16px;font-weight:700;color:#FFFFFF;margin-top:6px;line-height:1.5">${w.correct.example}</div>`
        + `</div>`
        // 下部帯
        + `<div style="position:absolute;bottom:0;left:0;right:0;background-color:#000000;padding:10px 30px;display:flex;justify-content:space-between;align-items:center">`
        + `<span style="font-size:18px;font-weight:900;color:#FFD900">${w.correct.ja}</span>`
        + `<span style="font-size:14px;font-weight:700;color:#FFFFFF">発行:恥とあきらめの英会話編集部</span>`
        + `</div>`
    );
}

// =====================================================================
// パターンB: スクープ週刊誌風 — 白地、赤題字、縦書き見出し、事件として報道
// =====================================================================

function bShell(inner: string): string {
    return `<div style="width:${W}px;height:${H}px;background-color:#FFFFFF;box-sizing:border-box;position:relative;font-family:${SERIF};overflow:hidden">`
        + inner
        + `</div>`;
}

function bMasthead(sub: string): string {
    return `<div style="position:absolute;top:0;left:0;bottom:0;width:150px;background-color:#C8000F;display:flex;flex-direction:column;justify-content:space-between;align-items:center;padding:28px 0">`
        + `<div style="writing-mode:vertical-rl;font-size:64px;font-weight:900;color:#FFFFFF;letter-spacing:6px;font-family:${SERIF}">週刊トレランシー</div>`
        + `<div style="writing-mode:vertical-rl;font-size:16px;font-weight:700;color:#FFD900;letter-spacing:3px">${sub}</div>`
        + `</div>`;
}

function bCover(issue: MagazineIssue): string {
    return bShell(
        bMasthead(`創刊号 ${issue.coverDate}・定価0円`)
        // メインスクープ(縦書き特大)
        + `<div style="position:absolute;top:34px;right:40px;height:560px">`
        + `<div style="writing-mode:vertical-rl;font-size:76px;font-weight:900;color:#111111;line-height:1.18;letter-spacing:2px;height:560px">冠詞<span style="color:#C8000F">「a」</span><br/>四日連続欠席</div>`
        + `</div>`
        + `<div style="position:absolute;top:36px;right:390px;background-color:#C8000F;color:#FFFFFF;font-size:26px;font-weight:900;padding:10px 8px;writing-mode:vertical-rl;letter-spacing:4px">独占スクープ</div>`
        // サブ見出し縦組み(右から流す)
        + `<div style="position:absolute;top:40px;right:470px;writing-mode:vertical-rl;font-size:38px;font-weight:900;color:#111111;line-height:1.3;height:400px">英単語を捏造し続けた男<span style="color:#C8000F">、ついに誌名になる</span></div>`
        + `<div style="position:absolute;top:40px;right:590px;writing-mode:vertical-rl;font-size:30px;font-weight:700;color:#00479D;line-height:1.4;height:420px">「酒に強い」は tolerancy ではない — 本誌が正解を入手</div>`
        + `<div style="position:absolute;top:40px;right:700px;writing-mode:vertical-rl;font-size:26px;font-weight:700;color:#111111;background-color:#FFE100;padding:8px 6px;height:340px;line-height:1.4">英国人講師が激白「ミスは問題ではない。伝わるかが全てだ」</div>`
        + `<div style="position:absolute;top:40px;right:840px;writing-mode:vertical-rl;font-size:24px;font-weight:700;color:#111111;line-height:1.5;height:420px">be動詞過剰投与「are tend」二四日ぶり再発の衝撃</div>`
        // 下部横帯(目次風)
        + `<div style="position:absolute;bottom:0;left:150px;right:0;background-color:#111111;color:#FFFFFF;padding:14px 30px;display:flex;justify-content:space-between;align-items:center">`
        + `<span style="font-size:22px;font-weight:700">大特集 捏造語大全 全4語 — 発音記号・初出・正解つき完全収録</span>`
        + `<span style="font-size:14px;color:#FFD900">恥は別売り</span>`
        + `</div>`
    );
}

function bWord(w: FakeWordEntry, fileNo: number): string {
    const no = String(fileNo).padStart(2, '0');
    return bShell(
        bMasthead(`捏造語事件簿 その${no}`)
        // 事件見出し
        + `<div style="position:absolute;top:36px;left:190px;right:40px">`
        + `<span style="background-color:#C8000F;color:#FFFFFF;font-size:24px;font-weight:900;padding:6px 18px;letter-spacing:2px">また出た</span>`
        + `<div style="font-size:100px;font-weight:900;color:#111111;letter-spacing:-2px;line-height:1.05;margin-top:14px;font-family:${SERIF}">${w.word}<span style="font-size:44px;color:#C8000F">という単語は存在しない</span></div>`
        + `<div style="font-size:24px;color:#555555;margin-top:10px">${w.pronunciation} <span style="color:#C8000F;font-weight:700;margin-left:14px">${w.pos}</span></div>`
        + `</div>`
        // 本文2段組風
        + `<div style="position:absolute;top:372px;left:190px;width:560px">`
        + `<div style="font-size:24px;color:#111111;line-height:1.8;border-top:2px solid #111111;padding-top:14px">${w.fakeDefinition}</div>`
        + `<div style="font-size:19px;color:#555555;line-height:1.7;margin-top:14px">現場となったのはDMM英会話(${w.firstSeen})。容疑者の発言は <span style="font-style:italic;color:#111111">${w.spoke}</span> — 本人は${w.meant}のつもりだった。</div>`
        + `</div>`
        // 正解(号外風白抜き)
        + `<div style="position:absolute;top:364px;right:36px;width:330px;background-color:#111111;padding:16px 24px">`
        + `<div style="font-size:19px;font-weight:900;color:#FFE100;letter-spacing:2px">本誌が突き止めた正解</div>`
        + `<div style="font-size:36px;font-weight:700;color:#FFFFFF;margin-top:6px;font-family:${SERIF}">${w.correct.word}</div>`
        + `<div style="font-size:15px;color:#FFFFFF;line-height:1.5;margin-top:6px;font-family:${SERIF}">${w.correct.example}</div>`
        + `<div style="font-size:13px;color:#BBBBBB;margin-top:4px">${w.correct.ja}</div>`
        + `</div>`
        // 下部帯
        + `<div style="position:absolute;bottom:0;left:150px;right:0;background-color:#C8000F;color:#FFFFFF;padding:10px 30px;font-size:17px;font-weight:700">週刊トレランシー — 存在しない英語を追い続けて、今月で1ヶ月。</div>`
    );
}

// =====================================================================
// パターンC: カルチャー誌風 — 特集主義、大タイポ、余白は計算して使う
// =====================================================================

function cShell(inner: string): string {
    return `<div style="width:${W}px;height:${H}px;background-color:#F4F1EA;box-sizing:border-box;position:relative;font-family:${SANS};overflow:hidden">`
        + inner
        + `</div>`;
}

function cCover(issue: MagazineIssue): string {
    return cShell(
        // マストヘッド
        `<div style="position:absolute;top:30px;left:44px;display:flex;align-items:baseline">`
        + `<span style="font-size:64px;font-weight:900;color:#111111;letter-spacing:-3px">TOLERANCY</span>`
        + `<span style="font-size:15px;font-weight:700;color:#111111;margin-left:18px;letter-spacing:1px">月刊トレランシー ${issue.coverDate} 創刊号</span>`
        + `</div>`
        + `<div style="position:absolute;top:44px;right:44px;text-align:right">`
        + `<div style="font-size:13px;color:#666666">0円(税込) 恥は別売り</div>`
        + `<div style="width:90px;height:22px;margin-top:5px;${BARCODE}"></div>`
        + `</div>`
        // 斜め帯
        + `<div style="position:absolute;top:150px;left:-60px;background-color:#E6007E;color:#FFFFFF;font-size:22px;font-weight:900;padding:8px 90px;transform:rotate(-4deg);letter-spacing:6px">特集</div>`
        // 特集タイトル(ドーン+句点)
        + `<div style="position:absolute;top:210px;left:44px">`
        + `<div style="font-size:136px;font-weight:900;color:#111111;letter-spacing:-4px;line-height:1;white-space:nowrap">存在しない英語。</div>`
        + `<div style="font-size:26px;font-weight:700;color:#111111;margin-top:22px;line-height:1.7">DMM英会話で毎晩生産される捏造語のすべて。<br/>consentment から tolerancy まで、発明の現場を追った。</div>`
        + `</div>`
        // 目次風インデックス
        + `<div style="position:absolute;bottom:34px;left:44px;right:44px;border-top:3px solid #111111;padding-top:16px;display:flex;justify-content:space-between">`
        + issue.fakeWords.map((w, i) =>
            `<div style="width:24%">`
            + `<div style="font-size:13px;font-weight:900;color:#E6007E">No.${String(i + 1).padStart(2, '0')}</div>`
            + `<div style="font-size:24px;font-weight:900;color:#111111;letter-spacing:-1px">${w.word}</div>`
            + `<div style="font-size:12px;color:#666666;margin-top:2px">正しくは ${w.correct.word}</div>`
            + `</div>`
        ).join('')
        + `</div>`
    );
}

function cWord(w: FakeWordEntry, fileNo: number): string {
    const no = String(fileNo).padStart(2, '0');
    return cShell(
        // ヘッダ
        `<div style="position:absolute;top:26px;left:44px;right:44px;display:flex;justify-content:space-between;align-items:baseline;border-bottom:3px solid #111111;padding-bottom:12px">`
        + `<span style="font-size:28px;font-weight:900;color:#111111;letter-spacing:-1px">TOLERANCY<span style="font-size:14px;font-weight:700;margin-left:12px;letter-spacing:1px">特集 存在しない英語。</span></span>`
        + `<span style="font-size:16px;font-weight:900;color:#E6007E">No.${no} / 04</span>`
        + `</div>`
        // ヒーロータイポ
        + `<div style="position:absolute;top:120px;left:44px">`
        + `<div style="font-size:128px;font-weight:900;color:#111111;letter-spacing:-5px;line-height:1">${w.word}<span style="color:#E6007E">.</span></div>`
        + `<div style="font-size:20px;color:#666666;margin-top:10px">${w.pronunciation} — ${w.pos}。編集長の発明。英語には、ない。</div>`
        + `</div>`
        // キャプション(語義)
        + `<div style="position:absolute;top:330px;left:44px;width:640px;font-size:26px;font-weight:700;color:#111111;line-height:1.8">${w.fakeDefinition}</div>`
        + `<div style="position:absolute;top:330px;right:44px;width:380px;border-left:3px solid #E6007E;padding-left:20px">`
        + `<div style="font-size:14px;font-weight:900;color:#E6007E;letter-spacing:2px">発明の現場</div>`
        + `<div style="font-size:17px;color:#111111;line-height:1.7;margin-top:8px">${w.firstSeen}、DMM英会話。<br/><span style="font-family:${SERIF};font-style:italic">${w.spoke}</span></div>`
        + `</div>`
        // 正解帯
        + `<div style="position:absolute;bottom:0;left:0;right:0;background-color:#111111;padding:20px 44px;display:flex;align-items:baseline;justify-content:space-between">`
        + `<div style="display:flex;align-items:baseline">`
        + `<span style="font-size:15px;font-weight:900;color:#E6007E;letter-spacing:2px;margin-right:18px">で、正解は</span>`
        + `<span style="font-size:38px;font-weight:900;color:#FFFFFF;letter-spacing:-1px">${w.correct.word}</span>`
        + `<span style="font-size:17px;color:#CCCCCC;margin-left:20px;font-family:${SERIF}">${w.correct.example}</span>`
        + `</div>`
        + `</div>`
    );
}

// =====================================================================
// PNG書き出し(SVG foreignObject → canvas 2x)
// 注意: Blob URL だと Chrome が canvas を汚染扱いにして toDataURL が
// SecurityError になる。data: URI なら通る(dom-to-image と同じ方式)。
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
// 画面用
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

type PatternKey = 'a' | 'b' | 'c';

interface CardDef {
    id: string;
    label: string;
    filename: string;
    html: string;
}

const PATTERNS: { key: PatternKey; name: string; desc: string }[] = [
    { key: 'a', name: 'A 少年漫画誌', desc: '黄×赤、袋文字、バクダン円、帯コピー乱れ打ち。うるさいほど雑誌。' },
    { key: 'b', name: 'B スクープ週刊誌', desc: '白地に赤題字、縦書き見出し。ミスを「事件」として報道する。' },
    { key: 'c', name: 'C カルチャー誌', desc: '特集主義の大タイポ「存在しない英語。」余白も計算して使う。' },
];

function buildCards(pattern: PatternKey, issue: MagazineIssue): CardDef[] {
    const vol3 = String(issue.vol).padStart(3, '0');
    const cover = pattern === 'a' ? aCover(vol3) : pattern === 'b' ? bCover(issue) : cCover(issue);
    const wordFn = pattern === 'a' ? aWord : pattern === 'b' ? bWord : cWord;
    return [
        {
            id: `${pattern}-cover`,
            label: '表紙 — 創刊告知用',
            filename: `tolerancy-${pattern}-cover.png`,
            html: cover,
        },
        ...issue.fakeWords.map((w, i) => ({
            id: `${pattern}-word-${i}`,
            label: `File No.${String(i + 1).padStart(2, '0')} — ${w.word}`,
            filename: `tolerancy-${pattern}-file${String(i + 1).padStart(2, '0')}-${w.word.replace(/\s+/g, '-')}.png`,
            html: wordFn(w, i + 1),
        })),
    ];
}

export default function MagazineCardsPage() {
    const issue = getLatestIssue();
    const [pattern, setPattern] = useState<PatternKey>('a');
    const [saving, setSaving] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const cards = buildCards(pattern, issue);
    const current = PATTERNS.find((p) => p.key === pattern);

    const save = async (card: CardDef) => {
        setSaving(card.id);
        setError(null);
        try {
            await downloadPng(card.html, card.filename);
        } catch {
            setError('PNG書き出しに失敗しました。カードを普通にスクリーンショットしてください。');
        } finally {
            setSaving(null);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#E7E4DC', padding: '0 0 80px', fontFamily: SANS }}>
            {/* Toolbar */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 5, backgroundColor: '#171412', color: '#fff',
                padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap',
            }}>
                <div style={{ fontSize: '13px', letterSpacing: '1px' }}>
                    月刊 TOLERANCY — シェア用カード
                    <span style={{ opacity: 0.7, marginLeft: '10px', fontSize: '11px' }}>1200×675 (X推奨16:9) / PNGは2倍解像度で保存</span>
                </div>
                <Link href="/english/magazine" style={{
                    color: '#171412', backgroundColor: '#D4AF37', textDecoration: 'none', borderRadius: '8px',
                    padding: '7px 16px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px',
                }}>
                    誌面に戻る
                </Link>
            </div>

            {/* パターン切り替えタブ */}
            <div style={{ maxWidth: '900px', margin: '24px auto 0', padding: '0 16px' }}>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {PATTERNS.map((p) => (
                        <button
                            key={p.key}
                            onClick={() => setPattern(p.key)}
                            style={{
                                cursor: 'pointer', borderRadius: '10px', padding: '12px 20px', textAlign: 'left',
                                border: pattern === p.key ? '2px solid #171412' : '1px solid #C9C4B8',
                                backgroundColor: pattern === p.key ? '#171412' : '#fff',
                                color: pattern === p.key ? '#fff' : '#171412',
                                flex: '1 1 240px', transition: 'all 0.15s ease',
                            }}
                        >
                            <div style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '0.5px' }}>{p.name}</div>
                            <div style={{ fontSize: '11.5px', marginTop: '4px', opacity: pattern === p.key ? 0.8 : 0.65, lineHeight: 1.6 }}>{p.desc}</div>
                        </button>
                    ))}
                </div>
            </div>

            {error && (
                <div style={{
                    maxWidth: '900px', margin: '20px auto 0', padding: '12px 18px',
                    backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', fontSize: '13px', borderRadius: '8px',
                }}>
                    {error}
                </div>
            )}

            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '28px 16px 0' }}>
                {cards.map((card) => (
                    <div key={card.id} style={{ marginBottom: '44px' }}>
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                            flexWrap: 'wrap', gap: '10px', marginBottom: '10px',
                        }}>
                            <div style={{ fontSize: '15px', fontWeight: 700, color: '#171412' }}>
                                {current?.name} — {card.label}
                            </div>
                            <button
                                onClick={() => save(card)}
                                disabled={saving !== null}
                                style={{
                                    cursor: saving === null ? 'pointer' : 'wait',
                                    backgroundColor: saving === card.id ? '#888' : '#171412', color: '#fff',
                                    border: 'none', borderRadius: '8px', padding: '9px 20px',
                                    fontSize: '12px', fontWeight: 700, letterSpacing: '1px', whiteSpace: 'nowrap',
                                }}
                            >
                                {saving === card.id ? '書き出し中…' : 'PNGで保存'}
                            </button>
                        </div>
                        <div style={{ boxShadow: '0 8px 28px rgba(0,0,0,0.16)' }}>
                            <ScaledCard html={card.html} />
                        </div>
                    </div>
                ))}

                <div style={{
                    backgroundColor: '#fff', border: '1px solid #C9C4B8', borderRadius: '10px',
                    padding: '18px 22px', fontSize: '13px', color: '#6B6257', lineHeight: 2,
                }}>
                    <div style={{ fontWeight: 700, color: '#171412', letterSpacing: '1px', marginBottom: '6px' }}>使い方</div>
                    A/B/C を切り替えて比較 → 気に入ったパターンのカードを「PNGで保存」→ Xに投稿。
                    本文は「また存在しない英単語を発明してしまった」系の一言だけにして、リプ or note で全文へ誘導。
                    新しい捏造語が生まれたら magazine.ts に足すだけで、3パターンぶんのカードが自動で増える。
                </div>
            </div>
        </div>
    );
}
