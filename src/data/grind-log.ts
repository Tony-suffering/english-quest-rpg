// GRIND 365 -- daily study video log
// Add entries here. Date format: YYYY-MM-DD.
// Latest entry goes at the TOP of the array.

export interface GrindEntry {
    id: string;
    date: string;          // YYYY-MM-DD
    youtube_id: string;    // 11-char YouTube ID
    title: string;
    title_ja: string;
    note: string;
    tags: string;          // comma-separated
    duration: number;      // seconds (optional, 0 if unknown)
}

export const grindEntries: GrindEntry[] = [
    {
        id: 'log-2026-04-14-01',
        date: '2026-04-14',
        youtube_id: 'hDXXN9VclVo',
        title: 'Day 1',
        title_ja: '1日目',
        note: '',
        tags: '',
        duration: 180,
    },
];
