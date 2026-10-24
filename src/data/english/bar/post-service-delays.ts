/**
 * Silent Bartender -- post-service delays.
 *
 * A few extra milliseconds we add between the player's card pick
 * and the customer's reaction, based on the difficulty of the card.
 * More delicate situations get slightly more breathing room.
 */

export function postServiceDelay(difficulty: number = 2, correct: boolean = true): number {
    const base = 600;
    if (!correct) return base + 400;
    switch (difficulty) {
        case 1: return base;
        case 2: return base + 150;
        case 3: return base + 300;
        case 4: return base + 600;
        case 5: return base + 1000;
        default: return base + 300;
    }
}

/** For customer-enter stagger (slightly longer for delicate moods). */
export function customerEnterStagger(difficulty: number = 2): number {
    return 600 + (difficulty - 1) * 120;
}
