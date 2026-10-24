/**
 * Silent Bartender -- data integrity validator.
 *
 * Static checks for the customer roster. Not part of the runtime;
 * import and call `validateRoster()` in a dev console or a test
 * script when editing content.
 */

import type { Customer } from '@/data/english/bar/types';

export interface ValidationIssue {
    id: string;
    severity: 'error' | 'warn';
    message: string;
}

/**
 * Validates:
 *   - unique ids
 *   - at least 2 cards
 *   - first card (the correct one) is non-empty
 *   - reaction has both success and failure
 *   - English line within 180 chars
 *   - no obvious emoji-like unicode (dubbing clarity)
 */
export function validateRoster(roster: Customer[]): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const seen = new Set<string>();

    for (const c of roster) {
        if (!c.id) {
            issues.push({ id: 'no-id', severity: 'error', message: 'customer missing id' });
            continue;
        }
        if (seen.has(c.id)) {
            issues.push({ id: c.id, severity: 'error', message: `duplicate id: ${c.id}` });
        }
        seen.add(c.id);

        if (!Array.isArray(c.cards) || c.cards.length < 2) {
            issues.push({ id: c.id, severity: 'error', message: 'needs at least 2 cards' });
        }
        if (c.cards && !c.cards[0]?.trim()) {
            issues.push({ id: c.id, severity: 'error', message: 'cards[0] (correct answer) is empty' });
        }
        if (!c.reaction?.success?.trim() || !c.reaction?.failure?.trim()) {
            issues.push({ id: c.id, severity: 'error', message: 'reaction missing success or failure' });
        }
        if ((c.line ?? '').length > 180) {
            issues.push({ id: c.id, severity: 'warn', message: 'line longer than 180 chars' });
        }
        // Emoji-ish check (quick heuristic: presence of surrogate pairs usually means emoji)
        if (/[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(c.line + (c.reaction?.success ?? '') + (c.reaction?.failure ?? ''))) {
            issues.push({ id: c.id, severity: 'warn', message: 'possible emoji / pictograph in text' });
        }
        if (typeof c.difficulty === 'number' && (c.difficulty < 1 || c.difficulty > 5)) {
            issues.push({ id: c.id, severity: 'warn', message: `difficulty out of range: ${c.difficulty}` });
        }
    }

    return issues;
}

/** Runs the validator and returns a short summary line. */
export function validateRosterSummary(roster: Customer[]): string {
    const issues = validateRoster(roster);
    const errors = issues.filter(i => i.severity === 'error').length;
    const warns = issues.filter(i => i.severity === 'warn').length;
    return `roster: ${roster.length} customers -- errors: ${errors}, warnings: ${warns}`;
}
