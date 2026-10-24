/**
 * Silent Bartender -- data sanity checker.
 *
 * Run in the browser console via `window.__barSanity()` (wire via
 * an exported global in page.tsx) to validate all content files
 * at once. Returns a summary of issues found.
 */

import { CUSTOMERS } from '@/data/english/bar/customers';
import { BOSS_CUSTOMERS } from '@/data/english/bar/boss-customers';
import { SEASONAL_CUSTOMERS } from '@/data/english/bar/seasonal-customers';
import { WEEKEND_CUSTOMERS } from '@/data/english/bar/weekend-customers';
import { validateRoster, type ValidationIssue } from './validate';

export interface SanitySummary {
    totalChecked: number;
    errorsByFile: Record<string, number>;
    warningsByFile: Record<string, number>;
    sampleIssues: ValidationIssue[];
    duplicates: string[];   // customer ids appearing in more than one pool
}

export function runSanityCheck(): SanitySummary {
    const pools: Array<[string, typeof CUSTOMERS]> = [
        ['customers', CUSTOMERS],
        ['boss-customers', BOSS_CUSTOMERS],
        ['seasonal-customers', SEASONAL_CUSTOMERS],
        ['weekend-customers', WEEKEND_CUSTOMERS],
    ];

    const errorsByFile: Record<string, number> = {};
    const warningsByFile: Record<string, number> = {};
    const sampleIssues: ValidationIssue[] = [];
    const idToFile = new Map<string, string>();
    const duplicates: string[] = [];

    let totalChecked = 0;
    for (const [name, pool] of pools) {
        totalChecked += pool.length;
        const issues = validateRoster(pool);
        errorsByFile[name] = issues.filter(i => i.severity === 'error').length;
        warningsByFile[name] = issues.filter(i => i.severity === 'warn').length;
        sampleIssues.push(...issues.slice(0, 3));

        for (const c of pool) {
            const existing = idToFile.get(c.id);
            if (existing && existing !== name) {
                duplicates.push(`${c.id} (in ${existing} and ${name})`);
            } else {
                idToFile.set(c.id, name);
            }
        }
    }

    return { totalChecked, errorsByFile, warningsByFile, sampleIssues: sampleIssues.slice(0, 10), duplicates };
}

/** Log a concise report to console. */
export function logSanityReport(): void {
    const s = runSanityCheck();
    // eslint-disable-next-line no-console
    console.log(`[bar sanity] checked ${s.totalChecked} customers`);
    // eslint-disable-next-line no-console
    console.log('[bar sanity] errors by file', s.errorsByFile);
    // eslint-disable-next-line no-console
    console.log('[bar sanity] warnings by file', s.warningsByFile);
    if (s.duplicates.length > 0) {
        // eslint-disable-next-line no-console
        console.warn('[bar sanity] duplicate ids:', s.duplicates);
    }
    if (s.sampleIssues.length > 0) {
        // eslint-disable-next-line no-console
        console.warn('[bar sanity] sample issues:', s.sampleIssues);
    }
}
