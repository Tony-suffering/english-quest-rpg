/**
 * Silent Bartender -- memory integration helper.
 *
 * One-call helper for the page: given a Customer, look up the last
 * encounter, apply a beat to the subtitle if applicable, and hand back
 * the modulated line plus metadata. Keeps the call site in page.tsx to
 * a single swap later (no structural changes required).
 */

import type { Customer } from '@/data/english/bar/types';
import { getCustomerOutcome, modulateLine, type OutcomeType } from './memory';

export interface PreparedCustomer {
    /** The subtitle line to render this time (possibly decorated). */
    line: string;
    /** True if this customer has been encountered before. */
    isReturning: boolean;
    /** Their last outcome (or 'never-seen'). */
    outcome: OutcomeType;
}

/**
 * Look up a customer's last outcome and return the line to display
 * along with a flag indicating this is a returning regular. The
 * customer object itself is not mutated.
 */
export function prepareCustomerWithMemory(customer: Customer): PreparedCustomer {
    const outcome = getCustomerOutcome(customer.id);
    const isReturning = outcome !== 'never-seen';
    const line = isReturning ? modulateLine(customer, outcome) : customer.line;
    return { line, isReturning, outcome };
}
