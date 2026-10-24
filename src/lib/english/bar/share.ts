/**
 * Silent Bartender -- "share your night" export.
 *
 * Formats a NightResult + small context into plain text suitable
 * for copy-to-clipboard. No URLs, no API calls, just a quiet flex.
 */

import type { NightResult } from './storage';

export interface ShareContext {
    result: NightResult;
    modeLabel?: string; // e.g. "通常営業"
    totalNights?: number;
    perfectNight?: boolean;
}

export function formatShareText(ctx: ShareContext): string {
    const { result, modeLabel = '通常営業', totalNights, perfectNight } = ctx;
    const total = result.success + result.failed;
    const rate = total > 0 ? Math.round((result.success / total) * 100) : 0;

    const header = perfectNight
        ? '【完全営業】居酒屋の無言給仕'
        : '【Night ' + (totalNights ?? '?') + '】居酒屋の無言給仕';

    const lines = [
        header,
        `モード: ${modeLabel}`,
        result.busted
            ? `声を出した。${result.success}人 / ${total}人まで。`
            : `${result.success}人が「ありがとう」(${rate}%)`,
        ``,
        `#居酒屋の無言給仕 #SilentBartender`,
    ];

    return lines.join('\n');
}

/** Copy the share text to the clipboard. Returns true on success. */
export async function copyShareText(ctx: ShareContext): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(formatShareText(ctx));
        return true;
    } catch {
        return false;
    }
}
