/**
 * カードの中庭(/english/duel/world)の質感。素材ファイルは使わず、全部その場で canvas に描く。
 * カードの面だけは、対戦画面の Card(DuelGame.tsx)の値を写している(240×340、縁8px、角8px、下の幕52%、
 * Georgia の斜体、金の線、四隅の飾り、色ガラスの結晶)。向こうを直したら、ここも同じ値に直す。
 */

import * as THREE from 'three';
import { ABILITY_TEXT, ELEMENT_NAMES, type CardSpec } from '@/lib/duel';

export const PAL: Record<string, [string, string, string]> = {
    flame: ['#FFE4D6', '#FB923C', '#C2410C'],
    aqua: ['#DBEAFE', '#38BDF8', '#1D4ED8'],
    wind: ['#D1FAE5', '#34D399', '#047857'],
    earth: ['#FEF3C7', '#D99A3B', '#92400E'],
    thunder: ['#FEF9C3', '#FACC15', '#A16207'],
};

/** 枠の縁の色(対戦画面の RANK_STYLE.edge と同じ並び) */
const EDGE: string[][] = [
    ['#FAFAF9', '#A8A29E', '#F5F5F4', '#78716C'],
    ['#CD7F32', '#E8B87A', '#CD7F32', '#A0622E'],
    ['#e2e8f0', '#ffffff', '#cbd5e1', '#94a3b8'],
    ['#D4AF37', '#FFF2A8', '#F6C85F', '#B8941E'],
    ['#E879F9', '#A855F7', '#6366F1', '#06B6D4'],
    ['#18181B', '#A855F7', '#D4AF37', '#18181B'],
];
const RANK_NAMES = ['', 'BRONZE', 'SILVER', 'GOLD', 'HOLO', 'LEGENDARY'];

function rng(seed: number) {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6D2B79F5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function canvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    return [c, c.getContext('2d')!];
}

function tex(c: HTMLCanvasElement, repeat?: [number, number], color = true): THREE.CanvasTexture {
    const t = new THREE.CanvasTexture(c);
    if (color) t.colorSpace = THREE.SRGBColorSpace;
    if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat[0], repeat[1]); }
    t.anisotropy = 8;
    return t;
}

/** 石畳。色と、目地がへこんだ凹凸の2枚 */
export function stoneTiles(repeat: [number, number]): { map: THREE.Texture; bump: THREE.Texture } {
    const S = 1024, N = 4, T = S / N;
    const [c, g] = canvas(S, S);
    const [b, bg] = canvas(S, S);
    const r = rng(7);
    g.fillStyle = '#b9ab92'; g.fillRect(0, 0, S, S);
    bg.fillStyle = '#505050'; bg.fillRect(0, 0, S, S);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const v = 214 + Math.floor(r() * 26), warm = 8 + r() * 14;
        const px = x * T + 3, py = y * T + 3, s = T - 6;
        g.fillStyle = `rgb(${v + warm}, ${v + warm * 0.4 - 4}, ${v - 20})`;
        g.fillRect(px, py, s, s);
        const lv = 170 + Math.floor(r() * 50);
        bg.fillStyle = `rgb(${lv},${lv},${lv})`;
        bg.fillRect(px, py, s, s);
        // 石の中のむら
        for (let i = 0; i < 220; i++) {
            const a = r() * 0.07, d = r() < 0.5 ? 0 : 255;
            const w = 4 + r() * 46, h = 4 + r() * 30;
            g.fillStyle = `rgba(${d},${d},${d},${a})`;
            g.fillRect(px + r() * (s - w), py + r() * (s - h), w, h);
        }
        // 細かい粒
        for (let i = 0; i < 900; i++) {
            const d = r() < 0.5 ? 40 : 250;
            g.fillStyle = `rgba(${d},${d},${d},${0.05 + r() * 0.1})`;
            g.fillRect(px + r() * s, py + r() * s, 1.5, 1.5);
            bg.fillStyle = `rgba(${d},${d},${d},0.12)`;
            bg.fillRect(px + r() * s, py + r() * s, 2, 2);
        }
        // ひび
        if (r() < 0.55) {
            let cx = px + r() * s, cy = py + r() * s;
            g.strokeStyle = 'rgba(60,50,40,0.35)'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(cx, cy);
            bg.strokeStyle = 'rgba(0,0,0,0.6)'; bg.lineWidth = 2; bg.beginPath(); bg.moveTo(cx, cy);
            for (let i = 0; i < 7; i++) {
                cx = Math.min(px + s, Math.max(px, cx + (r() - 0.5) * 60));
                cy = Math.min(py + s, Math.max(py, cy + (r() - 0.5) * 60));
                g.lineTo(cx, cy); bg.lineTo(cx, cy);
            }
            g.stroke(); bg.stroke();
        }
        // 縁の陰
        const sh = g.createLinearGradient(px, py, px, py + s);
        sh.addColorStop(0, 'rgba(255,255,255,0.10)'); sh.addColorStop(0.08, 'rgba(255,255,255,0)');
        sh.addColorStop(0.92, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,0,0.14)');
        g.fillStyle = sh; g.fillRect(px, py, s, s);
    }
    return { map: tex(c, repeat), bump: tex(b, repeat, false) };
}

/** 床の濡れたところ(粗さの地図。緑の値が小さいほど、空を映す) */
export function puddles(): THREE.Texture {
    const W = 256, H = 768;
    const [c, g] = canvas(W, H);
    g.fillStyle = 'rgb(0,150,0)'; g.fillRect(0, 0, W, H);
    const r = rng(23);
    g.filter = 'blur(5px)';
    for (let i = 0; i < 46; i++) {
        const x = r() * W, y = r() * H, n = 3 + Math.floor(r() * 4);
        g.fillStyle = `rgb(0,${12 + Math.floor(r() * 20)},0)`;
        for (let k = 0; k < n; k++) { g.beginPath(); g.ellipse(x + (r() - 0.5) * 26, y + (r() - 0.5) * 34, 5 + r() * 15, 4 + r() * 12, r() * 3, 0, 7); g.fill(); }
    }
    g.filter = 'none';
    return tex(c, undefined, false);
}

/** 木の葉のでこぼこ */
export function leafBump(): THREE.Texture {
    const [c, g] = canvas(256, 256);
    g.fillStyle = '#808080'; g.fillRect(0, 0, 256, 256);
    const r = rng(41);
    for (let i = 0; i < 2600; i++) { const d = Math.floor(r() * 255); g.fillStyle = `rgba(${d},${d},${d},0.5)`; g.beginPath(); g.ellipse(r() * 256, r() * 256, 2 + r() * 5, 4 + r() * 10, 0, 0, 7); g.fill(); }
    return tex(c, [3, 4], false);
}

/** 大理石(柱・台座・縁) */
export function marble(repeat: [number, number], seed = 3): THREE.Texture {
    const S = 512;
    const [c, g] = canvas(S, S);
    const r = rng(seed);
    g.fillStyle = '#ece6d8'; g.fillRect(0, 0, S, S);
    for (let i = 0; i < 500; i++) {
        const d = r() < 0.5 ? 255 : 150;
        g.fillStyle = `rgba(${d},${d - 6},${d - 20},${r() * 0.06})`;
        g.beginPath(); g.ellipse(r() * S, r() * S, 10 + r() * 70, 6 + r() * 30, r() * 3, 0, 7); g.fill();
    }
    for (let i = 0; i < 16; i++) {
        let x = r() * S, y = r() * S;
        g.strokeStyle = `rgba(120,105,85,${0.08 + r() * 0.16})`; g.lineWidth = 0.6 + r() * 1.6;
        g.beginPath(); g.moveTo(x, y);
        for (let k = 0; k < 14; k++) { x += (r() - 0.3) * 60; y += (r() - 0.5) * 50; g.lineTo(x, y); }
        g.stroke();
    }
    return tex(c, repeat);
}

/** 柱の縦溝(凹凸だけ) */
export function fluting(): THREE.Texture {
    const [c, g] = canvas(512, 8);
    const n = 20, w = 512 / n;
    for (let i = 0; i < n; i++) {
        const gr = g.createLinearGradient(i * w, 0, (i + 1) * w, 0);
        gr.addColorStop(0, '#f0f0f0'); gr.addColorStop(0.18, '#909090'); gr.addColorStop(0.5, '#1a1a1a');
        gr.addColorStop(0.82, '#909090'); gr.addColorStop(1, '#f0f0f0');
        g.fillStyle = gr; g.fillRect(i * w, 0, w + 1, 8);
    }
    const t = tex(c, [1, 1], false);
    return t;
}

/** 水面の法線。整数の波数だけを足すので、つなぎ目が出ない */
export function waterNormals(): THREE.Texture {
    const S = 256;
    const [c, g] = canvas(S, S);
    const img = g.createImageData(S, S);
    const r = rng(11);
    const waves = Array.from({ length: 22 }).map(() => {
        const kx = Math.round((r() - 0.5) * 22), ky = Math.round((r() - 0.5) * 22);
        const k = Math.hypot(kx, ky) || 1;
        return { kx, ky, amp: 0.9 / k, ph: r() * 6.283 };
    });
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
        let dx = 0, dy = 0;
        const u = (x / S) * 6.283, v = (y / S) * 6.283;
        for (const w of waves) {
            const cs = Math.cos(w.kx * u + w.ky * v + w.ph) * w.amp;
            dx += cs * w.kx; dy += cs * w.ky;
        }
        const nx = -dx * 0.07, ny = -dy * 0.07, nz = 1;
        const l = Math.hypot(nx, ny, nz), i = (y * S + x) * 4;
        img.data[i] = (nx / l * 0.5 + 0.5) * 255;
        img.data[i + 1] = (ny / l * 0.5 + 0.5) * 255;
        img.data[i + 2] = (nz / l * 0.5 + 0.5) * 255;
        img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    const t = tex(c, [1, 1], false);
    return t;
}

/** 床の魔法陣。輪に英語を刻む */
export function magicCircle(): THREE.Texture {
    const S = 1024, m = S / 2;
    const [c, g] = canvas(S, S);
    g.translate(m, m);
    const gold = (a: number) => `rgba(255,226,140,${a})`;
    g.strokeStyle = gold(0.95); g.fillStyle = gold(0.95);
    [[490, 6], [468, 2], [392, 3], [300, 2], [170, 4], [150, 1.5]].forEach(([rad, w]) => { g.lineWidth = w; g.beginPath(); g.arc(0, 0, rad, 0, 7); g.stroke(); });
    const star = (rad: number, n: number, skip: number, w: number) => {
        g.lineWidth = w; g.beginPath();
        for (let i = 0; i <= n; i++) { const a = (i * skip / n) * 6.283 - 1.5708; g[i ? 'lineTo' : 'moveTo'](Math.cos(a) * rad, Math.sin(a) * rad); }
        g.stroke();
    };
    star(392, 5, 2, 3); star(300, 8, 3, 1.5);
    for (let i = 0; i < 40; i++) { const a = (i / 40) * 6.283; g.lineWidth = i % 5 ? 1.5 : 4; g.beginPath(); g.moveTo(Math.cos(a) * 150, Math.sin(a) * 150); g.lineTo(Math.cos(a) * 170, Math.sin(a) * 170); g.stroke(); }
    const ring = (text: string, rad: number, size: number) => {
        g.font = `700 ${size}px Georgia, serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
        const chars = text.split('');
        chars.forEach((ch, i) => { const a = (i / chars.length) * 6.283; g.save(); g.rotate(a); g.translate(0, -rad); g.fillText(ch, 0, 0); g.restore(); });
    };
    ring('FOLLOW THE VOICE · FIND THE CARD · CATCH IT · FOLLOW THE VOICE · FIND THE CARD · CATCH IT · ', 430, 40);
    ring('TWENTY CARDS · ONE DECK · ', 232, 40);
    const t = tex(c);
    return t;
}

/** 柔らかい丸(光の粒・足もとの光) */
export function softDot(): THREE.Texture {
    const [c, g] = canvas(128, 128);
    const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(255,255,255,0.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
    return tex(c);
}

/** 垂れ幕。属性の色に金の縁と紋 */
export function bannerTex(element: string): THREE.Texture {
    const [c0, c1, c2] = PAL[element] || PAL.flame;
    const W = 256, H = 560;
    const [c, g] = canvas(W, H);
    const gr = g.createLinearGradient(0, 0, 0, H);
    gr.addColorStop(0, c2); gr.addColorStop(0.55, c1); gr.addColorStop(1, c2);
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    const r = rng(element.length * 31);
    for (let i = 0; i < 160; i++) { g.fillStyle = `rgba(255,255,255,${r() * 0.04})`; g.fillRect(0, r() * H, W, 1 + r() * 2); }
    g.strokeStyle = '#F6DC8C'; g.lineWidth = 10; g.strokeRect(12, 12, W - 24, H - 24);
    g.lineWidth = 2; g.strokeRect(28, 28, W - 56, H - 56);
    g.translate(W / 2, H * 0.4);
    g.fillStyle = c0; g.strokeStyle = '#F6DC8C'; g.lineWidth = 5;
    g.beginPath(); g.arc(0, 0, 62, 0, 7); g.stroke();
    g.globalAlpha = 0.25; g.fill(); g.globalAlpha = 1;
    g.fillStyle = '#FFF7D6';
    g.font = '900 30px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText((ELEMENT_NAMES[element] || '').slice(0, 1), 0, 2);
    g.font = '700 20px Georgia, serif';
    g.fillText(ELEMENT_NAMES[element] || '', 0, 120);
    return tex(c);
}

/** 石に彫った文字の板 */
export function plaqueTex(text: string, sub?: string): THREE.Texture {
    const W = 1024, H = 256;
    const [c, g] = canvas(W, H);
    g.fillStyle = '#e9e2d2'; g.fillRect(0, 0, W, H);
    const r = rng(text.length);
    for (let i = 0; i < 300; i++) { const d = r() < 0.5 ? 255 : 120; g.fillStyle = `rgba(${d},${d},${d},${r() * 0.05})`; g.fillRect(r() * W, r() * H, 20 + r() * 80, 3 + r() * 12); }
    g.strokeStyle = '#B8941E'; g.lineWidth = 8; g.strokeRect(14, 14, W - 28, H - 28);
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = '700 104px Georgia, serif';
    g.fillStyle = 'rgba(255,255,255,0.9)'; g.fillText(text, W / 2 + 2, (sub ? 104 : 128) + 3);
    g.fillStyle = '#6b5a22'; g.fillText(text, W / 2, sub ? 104 : 128);
    if (sub) { g.font = '700 36px Georgia, serif'; g.fillStyle = '#8a7a45'; g.fillText(sub, W / 2, 196); }
    return tex(c);
}

function wrap(g: CanvasRenderingContext2D, text: string, maxW: number, maxLines: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let cur = '';
    for (const w of words) {
        const next = cur ? `${cur} ${w}` : w;
        if (g.measureText(next).width > maxW && cur) { lines.push(cur); cur = w; } else cur = next;
    }
    if (cur) lines.push(cur);
    if (lines.length > maxLines) { lines.length = maxLines; lines[maxLines - 1] = lines[maxLines - 1].replace(/.{2}$/, '…'); }
    return lines;
}

function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    g.beginPath();
    g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
}

const JEWEL: Record<'cost' | 'atk' | 'hp', { d: string; cy: number; color: string }> = {
    cost: { d: 'M24 2 L43.5 13 V35 L24 46 L4.5 35 V13 Z', cy: 24, color: '#047857' },
    atk: { d: 'M24 1.5 L46 24 L24 46.5 L2 24 Z', cy: 24, color: '#1D4ED8' },
    hp: { d: 'M24 2.5 L43.5 8.5 V23 C43.5 34.5 35 42 24 46 C13 42 4.5 34.5 4.5 23 V8.5 Z', cy: 22.5, color: '#B91C1C' },
};

function gem(g: CanvasRenderingContext2D, kind: 'cost' | 'atk' | 'hp', value: number, x: number, y: number, size: number) {
    const j = JEWEL[kind], k = size / 48;
    g.save(); g.translate(x, y); g.scale(k, k);
    const p = new Path2D(j.d);
    g.shadowColor = 'rgba(0,0,0,0.5)'; g.shadowBlur = 6; g.shadowOffsetY = 2;
    g.globalAlpha = 0.62; g.fillStyle = j.color; g.fill(p);
    g.shadowColor = 'transparent'; g.globalAlpha = 1;
    const hl = g.createLinearGradient(0, 0, 0, 48);
    hl.addColorStop(0, 'rgba(255,255,255,0.55)'); hl.addColorStop(0.45, 'rgba(255,255,255,0.05)'); hl.addColorStop(1, 'rgba(0,0,0,0.25)');
    g.fillStyle = hl; g.fill(p);
    g.save(); g.clip(p);
    g.strokeStyle = 'rgba(255,255,255,0.45)'; g.lineWidth = 0.8;
    g.beginPath(); g.moveTo(24, j.cy); g.lineTo(24, 0); g.moveTo(24, j.cy); g.lineTo(0, 40); g.moveTo(24, j.cy); g.lineTo(48, 40); g.stroke();
    g.restore();
    g.strokeStyle = 'rgba(255,255,255,0.9)'; g.lineWidth = 1.6; g.stroke(p);
    g.font = `900 ${String(value).length > 1 ? 19 : 24}px "Arial Black", "Segoe UI Black", Arial, sans-serif`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.lineJoin = 'round'; g.lineWidth = 2.6; g.strokeStyle = 'rgba(0,0,0,0.62)'; g.strokeText(String(value), 24, j.cy + 1);
    g.fillStyle = '#fff'; g.fillText(String(value), 24, j.cy + 1);
    g.restore();
}

/** id から毎回同じ模様(絵が無いカード用。対戦画面の CardArt と同じ考え方) */
function patternArt(g: CanvasRenderingContext2D, spec: CardSpec, W: number, H: number) {
    const [c0, c1, c2] = PAL[spec.element] || PAL.flame;
    const n = (i: number) => spec.id.charCodeAt(i % spec.id.length);
    const gr = g.createRadialGradient(W / 2, H * 0.4, 0, W / 2, H * 0.4, H * 0.75);
    gr.addColorStop(0, '#fff'); gr.addColorStop(0.28, c0); gr.addColorStop(0.68, c1); gr.addColorStop(1, c2);
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.save(); g.translate(W / 2, H * 0.4); g.rotate((n(2) % 360) / 57.3);
    const rays = 8 + (n(1) % 9);
    g.strokeStyle = 'rgba(255,255,255,0.5)';
    for (let i = 0; i < rays; i++) { const a = (i / rays) * 6.283; g.lineWidth = i % 2 ? 2 : 6; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(a) * H, Math.sin(a) * H); g.stroke(); }
    const sides = 3 + (n(0) % 6);
    g.strokeStyle = 'rgba(255,255,255,0.8)'; g.lineWidth = 4; g.beginPath();
    for (let i = 0; i <= sides; i++) { const a = (i / sides) * 6.283; g[i ? 'lineTo' : 'moveTo'](Math.cos(a) * 180, Math.sin(a) * 180); }
    g.stroke();
    g.fillStyle = c2; g.globalAlpha = 0.55; g.beginPath(); g.arc(0, 0, 76, 0, 7); g.fill(); g.globalAlpha = 1;
    g.strokeStyle = '#fff'; g.lineWidth = 5; g.beginPath(); g.arc(0, 0, 76, 0, 7); g.stroke();
    g.restore();
}

/**
 * カードの面を1枚描く。480×680(本物の 240×340 の2倍)。
 * 絵は後から届くので、まず模様で描いておき、絵が読めたら描き直す(needsUpdate)。
 */
export function cardFace(spec: CardSpec, artUrl: string | undefined, onReady?: () => void): THREE.CanvasTexture {
    const W = 480, H = 680, B = 16;
    const [c, g] = canvas(W, H);
    const t = tex(c);
    const paint = (img?: HTMLImageElement) => {
        g.setTransform(1, 0, 0, 1, 0, 0);
        g.clearRect(0, 0, W, H);
        // 縁
        const e = EDGE[spec.rank] || EDGE[0];
        const eg = g.createLinearGradient(0, 0, W, H);
        e.forEach((col, i) => eg.addColorStop(i / (e.length - 1), col));
        roundRect(g, 0, 0, W, H, 16); g.fillStyle = eg; g.fill();
        // 窓
        g.save();
        roundRect(g, B, B, W - B * 2, H - B * 2, 4); g.clip();
        g.fillStyle = '#14101F'; g.fillRect(0, 0, W, H);
        if (img) {
            // object-fit: cover; object-position: center 22%
            const iw = W - B * 2, ih = H - B * 2, s = Math.max(iw / img.width, ih / img.height);
            const dw = img.width * s, dh = img.height * s;
            g.drawImage(img, B + (iw - dw) / 2, B + (ih - dh) * 0.22, dw, dh);
        } else patternArt(g, spec, W, H);
        // 下の幕
        const veil = g.createLinearGradient(0, H * 0.48, 0, H);
        veil.addColorStop(0, 'rgba(10,8,30,0)'); veil.addColorStop(0.48, 'rgba(10,8,30,0.72)'); veil.addColorStop(1, 'rgba(10,8,30,0.94)');
        g.fillStyle = veil; g.fillRect(0, H * 0.48, W, H * 0.52);
        // 英語(下から積む)
        const len = spec.text.length;
        const size = (len > 80 ? 12 : len > 55 ? 13.5 : len > 30 ? 15.5 : 18) * 2;
        g.font = `italic ${size}px Georgia, "Times New Roman", serif`;
        g.textAlign = 'center'; g.textBaseline = 'alphabetic';
        const lines = wrap(g, spec.text, W - B * 2 - 56, 5);
        const lh = size * 1.32;
        const hasAb = spec.ability !== 'NONE';
        let y = H - B - 88 - (hasAb ? 34 : 0);
        const line = (yy: number) => {
            const lg = g.createLinearGradient(B + 28, 0, W - B - 28, 0);
            lg.addColorStop(0, 'rgba(255,242,168,0)'); lg.addColorStop(0.5, '#FFF2A8'); lg.addColorStop(1, 'rgba(255,242,168,0)');
            g.fillStyle = lg; g.fillRect(B + 28, yy, W - B * 2 - 56, 2);
        };
        line(y + 10);
        g.shadowColor = 'rgba(253,230,138,0.85)'; g.shadowBlur = 14;
        g.fillStyle = '#FFFDF2';
        for (let i = lines.length - 1; i >= 0; i--) { g.fillText(lines[i], W / 2, y - 4); y -= lh; }
        g.shadowColor = 'transparent'; g.shadowBlur = 0;
        line(y + lh - size - 6);
        if (hasAb) {
            const [, c1] = PAL[spec.element] || PAL.flame;
            g.font = '900 17px Arial, sans-serif'; g.fillStyle = c1;
            const ab = spec.ability, rest = ` ${ABILITY_TEXT[spec.ability]}`;
            g.font = '17px Arial, sans-serif';
            const restW = g.measureText(rest).width;
            g.font = '900 17px Arial, sans-serif';
            const abW = g.measureText(ab).width;
            const fit = Math.min(1, (W - B * 2 - 150) / (abW + restW));
            g.save(); g.translate(W / 2, H - B - 86); g.scale(fit, 1);
            g.textAlign = 'left';
            g.fillText(ab, -(abW + restW) / 2, 0);
            g.font = '17px Arial, sans-serif'; g.fillStyle = 'rgba(255,242,168,0.92)';
            g.fillText(rest, -(abW + restW) / 2 + abW, 0);
            g.restore();
        }
        // 上の札
        g.textAlign = 'right'; g.textBaseline = 'middle';
        g.font = '900 18px Arial, sans-serif';
        const [, ec] = PAL[spec.element] || PAL.flame;
        const name = ELEMENT_NAMES[spec.element] || '';
        const nw = g.measureText(name).width + 24;
        roundRect(g, W - B - 12 - nw, B + 14, nw, 28, 8); g.fillStyle = 'rgba(10,8,30,0.6)'; g.fill(); g.strokeStyle = ec; g.lineWidth = 2; g.stroke();
        g.fillStyle = '#fff'; g.fillText(name, W - B - 24, B + 29);
        if (RANK_NAMES[spec.rank]) {
            g.font = '900 16px Arial, sans-serif';
            const rw = g.measureText(RANK_NAMES[spec.rank]).width + 20;
            roundRect(g, W - B - 20 - nw - rw, B + 14, rw, 28, 8); g.fillStyle = 'rgba(10,8,30,0.6)'; g.fill();
            g.fillStyle = e[1]; g.fillText(RANK_NAMES[spec.rank], W - B - 30 - nw, B + 29);
        }
        // 四隅の飾り
        g.strokeStyle = '#FFF2A8'; g.fillStyle = '#FFF2A8';
        [[0, 0], [1, 0], [0, 1], [1, 1]].forEach(([fx, fy]) => {
            g.save();
            g.translate(fx ? W - B - 6 : B + 6, fy ? H - B - 6 : B + 6); g.scale(fx ? -2 : 2, fy ? -2 : 2);
            g.globalAlpha = 0.9; g.lineWidth = 1.4; g.stroke(new Path2D('M2 28 V9 C2 5 5 2 9 2 H28'));
            g.globalAlpha = 0.6; g.lineWidth = 0.7; g.stroke(new Path2D('M6 22 V11 C6 8 8 6 11 6 H22'));
            g.globalAlpha = 0.9; g.beginPath(); g.arc(8.5, 8.5, 2, 0, 7); g.fill();
            g.restore();
        });
        // 下の番号
        g.textAlign = 'center'; g.font = '700 15px monospace'; g.fillStyle = 'rgba(255,255,255,0.5)';
        g.fillText(`${spec.tier} · ${spec.no ? `No.${spec.no}` : spec.id.slice(0, 6)}`, W / 2, H - B - 22);
        g.restore();
        // 数字の結晶(枠の角をまたぐ)
        const gs = Math.round(W * 0.2);
        gem(g, 'cost', spec.cost, 2, 2, gs);
        gem(g, 'atk', spec.atk, 2, H - gs - 2, gs);
        gem(g, 'hp', spec.hp, W - gs - 2, H - gs - 2, gs);
        t.needsUpdate = true;
    };
    paint();
    if (artUrl) {
        const img = new Image();
        img.onload = () => { paint(img); onReady?.(); };
        img.src = artUrl;
    }
    return t;
}

/** 画像を読む(無ければ単色) */
export function imageTex(url: string | undefined, fallback: string): THREE.Texture {
    if (url) {
        const t = new THREE.TextureLoader().load(url);
        t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
        return t;
    }
    const [c, g] = canvas(8, 8);
    g.fillStyle = fallback; g.fillRect(0, 0, 8, 8);
    return tex(c);
}
