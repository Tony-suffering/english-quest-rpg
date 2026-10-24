/**
 * Silent Bartender -- the bar's music.
 *
 * The (fictional) background music Gondo plays. Never specified in
 * the UI — exists only in descriptions. Customers sometimes react
 * to it. A cohesive auditory backbone for the universe.
 */

export interface BarTrack {
    id: string;
    title: string;      // JP + EN
    genre: string;
    description: string; // what it sounds like, JP
    phase: 'early' | 'peak' | 'late' | 'closing' | 'any';
}

export const BAR_MUSIC: BarTrack[] = [
    { id: 'early-jazz', title: '冬のBill Evans', genre: 'piano jazz', description: '静かで、寒さを少しだけ温めるピアノ。', phase: 'early' },
    { id: 'early-standards', title: 'Chet Baker ballads', genre: 'vocal jazz', description: '低めのトランペット、時々声。', phase: 'early' },
    { id: 'peak-swing', title: 'Art Blakey', genre: 'hard bop', description: '人が増える時間帯のドラム。', phase: 'peak' },
    { id: 'peak-sarah', title: 'Sarah Vaughan live', genre: 'vocal jazz', description: '声に掠れがあって、満席の店と相性がいい。', phase: 'peak' },
    { id: 'late-miles', title: 'Miles Davis Kind of Blue', genre: 'modal jazz', description: '深夜の定番。誰も話さなくなる時間。', phase: 'late' },
    { id: 'late-coltrane', title: 'John Coltrane Ballads', genre: 'jazz ballads', description: '優しいサックス。泣きそうな客に合う。', phase: 'late' },
    { id: 'closing-keith', title: 'Keith Jarrett Köln', genre: 'solo piano', description: '閉店前の長い即興。客は黙ってしまう。', phase: 'closing' },
    { id: 'closing-silence', title: '(noise of the room)', genre: 'ambient', description: '音楽なし。冷蔵庫のモーターと時計だけ。', phase: 'closing' },
    { id: 'special-rainy', title: '雨のためのEric Dolphy', genre: 'free jazz', description: '雨の日にだけかかる。権藤の選択。', phase: 'any' },
    { id: 'special-early-morning', title: 'Bill Evans solo', genre: 'solo piano', description: '5時前にだけ聞こえる、静かな一曲。', phase: 'closing' },
];

export function getMusicFor(phase: 'early' | 'peak' | 'late' | 'closing'): BarTrack[] {
    return BAR_MUSIC.filter(m => m.phase === phase || m.phase === 'any');
}
