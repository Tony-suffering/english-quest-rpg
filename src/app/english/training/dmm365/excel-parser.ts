// Excel / Sheets paste parser
// 想定入力:
//  - tab 区切り 1行 (横並び expression を1セッション分): "13\tin plain English\tone thing leads to another..."
//  - 改行区切り (縦並び expression): "move the needle\nget it out of your system\n..."
//  - 複数行 × 多列 (各行の最初が日付/数値ならスキップ)
//
// 出力: 各セッションに add すべき expression 配列。 dateRowGroups モードでは複数 session に分割。

export interface ParsedExpression {
    english: string;
    suggestedDate?: string;       // 行頭が日付っぽければ
    suggestedSessionNumber?: number; // 行頭2列目が数字なら
}

// 「これは英語表現か」 判定
function looksLikeEnglish(cell: string): boolean {
    const trimmed = cell.trim();
    if (!trimmed) return false;
    if (trimmed.length < 3) return false;
    // 数字だけ
    if (/^\d+$/.test(trimmed)) return false;
    // 日付っぽい (YYYY/MM/DD or YYYY-MM-DD or M/D)
    if (/^\d{1,4}[/\-]\d{1,2}([/\-]\d{1,4})?$/.test(trimmed)) return false;
    // 「DMM」 だけ
    if (/^DMM$/i.test(trimmed)) return false;
    // alphabetic な文字を1つでも含む
    if (!/[a-zA-Z]/.test(trimmed)) return false;
    return true;
}

function parseDateCell(cell: string): string | undefined {
    const t = cell.trim();
    // YYYY/MM/DD or YYYY-MM-DD
    const m1 = t.match(/^(\d{4})[/\-](\d{1,2})[/\-](\d{1,2})$/);
    if (m1) {
        const y = m1[1], mo = m1[2].padStart(2, '0'), d = m1[3].padStart(2, '0');
        return `${y}-${mo}-${d}`;
    }
    // M/D (assume current year)
    const m2 = t.match(/^(\d{1,2})\/(\d{1,2})$/);
    if (m2) {
        const y = new Date().getFullYear();
        const mo = m2[1].padStart(2, '0'), d = m2[2].padStart(2, '0');
        return `${y}-${mo}-${d}`;
    }
    return undefined;
}

function parseNumberCell(cell: string): number | undefined {
    const t = cell.trim();
    if (/^\d+$/.test(t)) {
        const n = parseInt(t, 10);
        if (n > 0 && n < 1000) return n; // 妥当な session #
    }
    return undefined;
}

export interface ParseResult {
    // simple モード: 各 row.expressions が flat に
    flatExpressions: ParsedExpression[];
    // grouped モード: date 行ごとに group
    groupedByDate: {
        date?: string;
        sessionNumber?: number;
        expressions: ParsedExpression[];
    }[];
    // raw row 数
    rowCount: number;
}

export function parseExcelPaste(raw: string): ParseResult {
    if (!raw?.trim()) {
        return { flatExpressions: [], groupedByDate: [], rowCount: 0 };
    }

    const rows = raw.split(/\r?\n/).filter(r => r.trim().length > 0);
    const flatExpressions: ParsedExpression[] = [];
    const groupedByDate: ParseResult['groupedByDate'] = [];

    for (const rowText of rows) {
        const cells = rowText.split('\t');
        let suggestedDate: string | undefined;
        let suggestedSessionNumber: number | undefined;
        const expressions: ParsedExpression[] = [];

        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            // 最初の2セルから date / session_number を拾う
            if (i < 2) {
                if (!suggestedDate) {
                    const d = parseDateCell(cell);
                    if (d) { suggestedDate = d; continue; }
                }
                if (!suggestedSessionNumber) {
                    const n = parseNumberCell(cell);
                    if (n) { suggestedSessionNumber = n; continue; }
                }
            }
            if (looksLikeEnglish(cell)) {
                expressions.push({
                    english: cell.trim(),
                    suggestedDate,
                    suggestedSessionNumber,
                });
            }
        }

        // tab がない (改行のみ) 行は cells.length === 1
        // その場合は単一表現として扱う
        if (cells.length === 1 && looksLikeEnglish(cells[0])) {
            // already covered above
        }

        for (const e of expressions) flatExpressions.push(e);
        if (expressions.length > 0) {
            groupedByDate.push({
                date: suggestedDate,
                sessionNumber: suggestedSessionNumber,
                expressions,
            });
        }
    }

    return { flatExpressions, groupedByDate, rowCount: rows.length };
}

// ammoに変換しやすい形に
export interface NewAmmoPayload {
    english: string;
    japanese?: string;
    source?: string;
}

export function expressionsToAmmoPayloads(exprs: ParsedExpression[]): NewAmmoPayload[] {
    return exprs.map(e => ({ english: e.english }));
}
