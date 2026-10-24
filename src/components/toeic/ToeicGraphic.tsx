/**
 * Part 3/4 の図表問題 (Look at the graphic.) の図を描く。
 * 画面版 (ToeicBooklet) と印刷版 (toeic/print) の両方から使う。
 *
 * 印刷で消えないこと: SVG に明示サイズを与え、色は print-color-adjust: exact で焼く。
 * (globals.css の会社ページ用ルールが印刷時に svg を全部消すため、呼び出し側で
 *  .sheet svg { display:block !important } を当てている)
 */
import type { Graphic } from '@/data/english/toeic-types';

const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#B8B2A5';

/** 円グラフの区分色。金→緑→グレーの順で、白黒印刷でも濃淡で判別できる並びにする */
const PIE_COLORS = ['#D4AF37', '#10B981', '#78716C', '#E7DCBE', '#1C1917', '#A8A29E'];

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
    const rad = ((deg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function PieChart({ g }: { g: Extract<Graphic, { kind: 'pie' }> }) {
    const cx = 100, cy = 100, r = 78;
    let acc = 0;
    const total = g.slices.reduce((a, s) => a + s.pct, 0) || 100;
    const arcs = g.slices.map((s, i) => {
        const start = (acc / total) * 360;
        acc += s.pct;
        const end = (acc / total) * 360;
        const [x1, y1] = polar(cx, cy, r, start);
        const [x2, y2] = polar(cx, cy, r, end);
        const large = end - start > 180 ? 1 : 0;
        const d = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
        // ラベルの引き出し位置 (区分の中央)
        const [lx, ly] = polar(cx, cy, r * 0.62, (start + end) / 2);
        return { d, fill: PIE_COLORS[i % PIE_COLORS.length], lx, ly, pct: s.pct, label: s.label, dark: i === 4 };
    });
    return (
        <div style={{ display: 'flex', gap: '6mm', alignItems: 'center', flexWrap: 'wrap' }}>
            <svg viewBox="0 0 200 200" width="200" height="200" style={{ flexShrink: 0, maxWidth: '46mm', height: 'auto' }}>
                {arcs.map((a, i) => (
                    <g key={i}>
                        <path d={a.d} fill={a.fill} stroke="#fff" strokeWidth="1.5" />
                        <text x={a.lx} y={a.ly} textAnchor="middle" dominantBaseline="middle"
                            fontSize="12" fontWeight="700" fill={a.dark ? '#fff' : INK}>{a.pct}%</text>
                    </g>
                ))}
                <circle cx={cx} cy={cy} r={r} fill="none" stroke={INK} strokeWidth="1" />
            </svg>
            <div style={{ display: 'grid', gap: '1.5mm' }}>
                {arcs.map((a, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '2mm', fontSize: '8.5pt' }}>
                        <span style={{ width: '3.5mm', height: '3.5mm', background: a.fill, border: `1px solid ${INK}`, flexShrink: 0 }} />
                        <span style={{ color: INK }}>{a.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TableChart({ g }: { g: Extract<Graphic, { kind: 'table' }> }) {
    return (
        <table style={{ borderCollapse: 'collapse', fontSize: '9pt', fontFamily: 'Georgia, serif', minWidth: '60mm' }}>
            {g.headers && g.headers.length > 0 && (
                <thead>
                    <tr>
                        {g.headers.map((h, i) => (
                            <th key={i} style={{ border: `1px solid ${INK}`, background: '#F0EDE4', padding: '1.5mm 3mm', fontWeight: 700, textAlign: 'left' }}>{h}</th>
                        ))}
                    </tr>
                </thead>
            )}
            <tbody>
                {g.rows.map((r, i) => (
                    <tr key={i}>
                        {r.map((c, j) => (
                            <td key={j} style={{ border: `1px solid ${LINE}`, padding: '1.5mm 3mm', textAlign: j === 0 ? 'left' : 'right', whiteSpace: 'nowrap' }}>{c}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

/**
 * 図表ボックス。本番の問題冊子と同じく、罫線で囲んで本文から独立させる。
 * compact=true で印刷用の詰めた見た目にする。
 */
export default function ToeicGraphic({ graphic, compact }: { graphic: Graphic; compact?: boolean }) {
    const pad = compact ? '3mm 4mm' : '10px 14px';
    return (
        <div style={{
            border: `1px solid ${INK}`, padding: pad, display: 'inline-block',
            background: '#fff', borderRadius: compact ? 0 : '6px',
            WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact',
        }}>
            {graphic.title && (
                <div style={{ fontSize: compact ? '8pt' : '11px', fontWeight: 700, color: INK, marginBottom: '2mm', textAlign: 'center', letterSpacing: '0.3px' }}>
                    {graphic.title}
                </div>
            )}
            {graphic.kind === 'table' && <TableChart g={graphic} />}
            {graphic.kind === 'pie' && <PieChart g={graphic} />}
            {graphic.kind === 'map' && (
                <div className="p1pic" style={{ width: compact ? '70mm' : '260px', aspectRatio: '4/3' }}
                    dangerouslySetInnerHTML={{ __html: graphic.svg.replace('<svg ', "<svg width='100%' height='100%' preserveAspectRatio='xMidYMid meet' ") }} />
            )}
            {!compact && (
                <div style={{ fontSize: '10px', color: SUB, marginTop: '6px', textAlign: 'center' }}>
                    Look at the graphic.
                </div>
            )}
        </div>
    );
}
