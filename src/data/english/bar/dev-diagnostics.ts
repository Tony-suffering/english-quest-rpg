/**
 * Silent Bartender -- dev diagnostics.
 *
 * Combined summary module for anyone inspecting the project. Wires
 * together content-index, sanity-check, and validator into a single
 * text dump. Not wired into production UI.
 */

import { countContent, contentSummary } from '@/lib/english/bar/content-index';
import { runSanityCheck } from '@/lib/english/bar/sanity-check';
import { validateRoster } from '@/lib/english/bar/validate';
import { CUSTOMERS } from '@/data/english/bar/customers';
import { BOSS_CUSTOMERS } from './boss-customers';
import { SEASONAL_CUSTOMERS } from './seasonal-customers';
import { WEEKEND_CUSTOMERS } from './weekend-customers';

export function fullDiagnostics(): string {
    const counts = countContent();
    const sanity = runSanityCheck();
    const customerIssues = validateRoster(CUSTOMERS);
    const bossIssues = validateRoster(BOSS_CUSTOMERS);
    const seasonalIssues = validateRoster(SEASONAL_CUSTOMERS);
    const weekendIssues = validateRoster(WEEKEND_CUSTOMERS);

    const lines = [
        '=== Silent Bartender Diagnostics ===',
        '',
        contentSummary(),
        '',
        '--- Sanity ---',
        `Duplicates across pools: ${sanity.duplicates.length}`,
        ...(sanity.duplicates.length > 0 ? sanity.duplicates.map(d => `  - ${d}`) : []),
        '',
        '--- Issues per pool ---',
        `customers:          ${customerIssues.length} issues`,
        `boss-customers:     ${bossIssues.length} issues`,
        `seasonal-customers: ${seasonalIssues.length} issues`,
        `weekend-customers:  ${weekendIssues.length} issues`,
        '',
        '--- Totals ---',
        `Unique characters reachable: ${counts.totalUniquePossibleCharacters}`,
        `Roast lines:                 ${counts.gondoRoasts}`,
        `Content modules registered:  ${Object.keys(counts).length}`,
    ];

    return lines.join('\n');
}
