/**
 * Silent Bartender -- final registry.
 *
 * One-stop summary of every content module. Use this to sanity-check
 * what the game contains, or to drive a developer dashboard.
 */

export const MODULE_REGISTRY = [
    { file: 'customers', purpose: 'Main customer roster (450+)' },
    { file: 'boss-customers', purpose: 'Closing-phase bosses (25)' },
    { file: 'weekend-customers', purpose: 'Fri/Sat-only regulars (5)' },
    { file: 'seasonal-customers', purpose: 'Month-gated seasonal regulars (30)' },
    { file: 'seasonal-bosses', purpose: 'Season-limited bosses (6)' },
    { file: 'easter-eggs', purpose: 'Condition-gated special customers (19)' },
    { file: 'boss-aftermath', purpose: 'Follow-up customers after boss outcomes (10)' },
    { file: 'day-of-week-regulars', purpose: 'Weekday-specific regulars (8 total)' },
    { file: 'rare-dialog-choices', purpose: 'Veteran-unlock extra cards (6)' },
    { file: 'roasts', purpose: 'Gondo bust lines, context-tagged (24)' },
    { file: 'gondo-fragments', purpose: 'Backstory fragments, unlock by night count (24)' },
    { file: 'gondo-letters', purpose: 'Advice letters in Gondo voice (17)' },
    { file: 'gondo-postcards', purpose: 'Postcards from Gondo on his travels (7)' },
    { file: 'gondo-awakenings', purpose: 'Brief visible stirs from the sleeping master (10)' },
    { file: 'gondo-sleep-talk', purpose: 'Sleep-talking fragments (12)' },
    { file: 'gondo-timeline', purpose: 'Canonical Gondo biography (11 events)' },
    { file: 'bar-fragments', purpose: 'About the bar itself, unlocked over time (9)' },
    { file: 'counter-objects', purpose: 'Physical props catalog (18)' },
    { file: 'neighborhoods', purpose: 'Tokyo neighborhoods registry (20)' },
    { file: 'rival-shops', purpose: 'Imagined other izakayas in the neighborhood (8)' },
    { file: 'menu', purpose: 'House menu (24 items)' },
    { file: 'seasonal-dishes', purpose: 'Season-gated chalkboard dishes (18)' },
    { file: 'signature-drinks', purpose: 'Gondo-invented drinks with origin stories (7)' },
    { file: 'achievements', purpose: 'Trophy system, bronze/silver/gold/hidden (42)' },
    { file: 'milestones', purpose: 'Night-count big moments (9)' },
    { file: 'moral-ledger', purpose: 'Quiet observations on long-term play (12)' },
    { file: 'persona-titles', purpose: 'Player identity labels (12 tiers)' },
    { file: 'night-moments', purpose: 'Post-night callouts for narrative combos (24)' },
    { file: 'narrative', purpose: 'Intro beats, phase transitions, endings' },
    { file: 'exit-beats', purpose: 'Customer exit flavor by outcome × mood' },
    { file: 'mood-hints', purpose: 'Physical tells per mood' },
    { file: 'customer-response-phrases', purpose: 'Reactive post-service phrases by mood' },
    { file: 'closing-time-sequence', purpose: '5 AM closing ritual beats (6)' },
    { file: 'night-999-eve', purpose: 'Eve-of-1000 atmospheric beats' },
    { file: 'night-1000-finale', purpose: 'Finale cutscene (14 scenes)' },
    { file: 'inner-monologue', purpose: 'Apprentice thoughts by outcome' },
    { file: 'silent-gestures', purpose: 'Non-verbal bartender actions (13)' },
    { file: 'atmospheric-wind', purpose: 'Phase-transition sensory cues (12)' },
    { file: 'clock-beats', purpose: 'Hourly time-of-night context' },
    { file: 'weather', purpose: 'Tonight weather system (12 variants)' },
    { file: 'rare-events', purpose: 'Low-probability room events (15)' },
    { file: 'dream-sequences', purpose: 'Closing-phase dream flickers (12)' },
    { file: 'themed-nights', purpose: 'Random night themes biasing mood pool (8)' },
    { file: 'tutorial', purpose: 'First-run tutorial steps' },
    { file: 'first-customer-per-night', purpose: 'First-customer hint helpers' },
    { file: 'memory-beats', purpose: 'Returnee opener variants' },
    { file: 'lisa-swap', purpose: 'Alternate character: Lisa content' },
    { file: 'service-tips', purpose: 'Rotating hint on intro (20)' },
    { file: 'sound-effects-registry', purpose: 'SFX docs index (9 synthesized sounds)' },
];

export function moduleCount(): number {
    return MODULE_REGISTRY.length;
}
