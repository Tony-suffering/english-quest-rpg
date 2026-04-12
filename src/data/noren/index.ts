/**
 * のれん — 向上心の維持費
 *
 * のれんはGOAL。同じ目的地を目指す人間が歩く道。
 * 先生も生徒もない。全員が歩く人であり、足跡を残す人。
 * 押さない。引かない。置く。
 * 去る者追わず、来る者拒まず。
 * メアド不要。ニックネームだけ。
 */

// ============================================================
// TYPES
// ============================================================

export type BadgeLevel = 'aruki' | 'tabi' | 'michibiki' | 'mimamori';

/** What drives this goal */
export type NorenDrive = 'necessity' | 'freedom' | 'teaching';

/** Steps on the path to the goal */
export interface Milestone {
    step: number;
    title: string;
    description: string;
    daysTypical: number;
}

/** A person walking toward the goal */
export interface Walker {
    id: string;
    nickname: string;
    badge: BadgeLevel;
    startedAt: string;
    lastActiveAt: string;
    currentMilestone: number;
    daysWalking: number;
    sharedCount: number;
    learnedCount: number;
    note?: string;
}

/** Footprints left on the path - breakthroughs, struggles, tips */
export interface Footprint {
    id: string;
    walkerId: string;
    nickname: string;
    badge: BadgeLevel;
    milestoneStep: number;
    text: string;
    date: string;
    thanksCount: number;
    type: 'breakthrough' | 'struggle' | 'tip';
    noteUrl?: string;
}

/** A week grouping for the story view */
export interface StoryWeek {
    weekLabel: string;
    startDate: string;
    footprints: Footprint[];
}

/** A noren is a GOAL, not a group */
export interface Noren {
    id: string;
    goal: string;
    subtitle: string;
    drive: NorenDrive;
    color: string;
    walkerCount: number;
    activeToday: number;
    milestones: { step: number; label: string }[];  // List page preview
    goalMilestones: Milestone[];                     // Detail page full view
    walkers: Walker[];
    footprints: Footprint[];
    linkedContent?: string;
    // ── Legacy compat (used by list/detail pages) ──
    name: string;
    description: string;
    category: 'toeic' | 'speaking' | 'listening' | 'movie' | 'pronunciation' | 'business' | 'beginner' | 'custom';
    memberCount: number;
    createdAt: string;
    latestFootprint?: {
        nickname: string;
        badge: BadgeLevel;
        text: string;
        type: 'breakthrough' | 'struggle';
        date: string;
    };
    members: NorenMember[];
    posts: NorenPost[];
}

/** Legacy: member type used by detail page */
export interface NorenMember {
    id: string;
    nickname: string;
    joinedAt: string;
    lastActiveAt: string;
    badge: BadgeLevel;
    daysActive: number;
    taughtCount: number;
    learnedCount: number;
    strengths: string[];
    weaknesses: string[];
    currentDay?: number;
    message?: string;
}

/** Legacy: post type used by detail page */
export interface NorenPost {
    id: string;
    memberId: string;
    memberNickname: string;
    memberBadge: BadgeLevel;
    content: string;
    createdAt: string;
    helpfulCount: number;
    isQuestion: boolean;
}

// ============================================================
// BADGE CONFIG
// ============================================================

export const BADGE_CONFIG: Record<BadgeLevel, {
    label: string;
    labelEn: string;
    description: string;
    color: string;
    bg: string;
    requirement: string;
}> = {
    aruki: {
        label: '歩き始め',
        labelEn: 'FIRST STEPS',
        description: '道を歩き始めた人',
        color: '#78716C',
        bg: '#F5F5F4',
        requirement: 'のれんをくぐる',
    },
    tabi: {
        label: '旅人',
        labelEn: 'TRAVELER',
        description: '7日以上歩き続けてる人',
        color: '#D97706',
        bg: '#FFFBEB',
        requirement: '7日以上継続',
    },
    michibiki: {
        label: '道しるべ',
        labelEn: 'GUIDE',
        description: '他の歩く人を何度も助けた人',
        color: '#7C3AED',
        bg: '#F5F3FF',
        requirement: '10回以上助けた',
    },
    mimamori: {
        label: '見守り人',
        labelEn: 'GUARDIAN',
        description: '道の空気を作る人',
        color: '#D4AF37',
        bg: '#FFFBEB',
        requirement: '道しるべ + 30日以上',
    },
};

// ============================================================
// DRIVE CONFIG
// ============================================================

export const DRIVE_CONFIG: Record<NorenDrive, {
    label: string;
    labelEn: string;
    tagline: string;
    color: string;
    bg: string;
}> = {
    necessity: {
        label: '迫られてる',
        labelEn: 'DEADLINE',
        tagline: '逃げ場がない。だからここにいる。',
        color: '#DC2626',
        bg: '#FEF2F2',
    },
    freedom: {
        label: '自分で選んだ',
        labelEn: 'BY CHOICE',
        tagline: '誰にも頼まれてない。でもやりたい。',
        color: '#2563EB',
        bg: '#EFF6FF',
    },
    teaching: {
        label: '届けたい',
        labelEn: 'TO GIVE',
        tagline: '教えることが、自分の道を進むこと。',
        color: '#7C3AED',
        bg: '#F5F3FF',
    },
};

// ============================================================
// CATEGORY CONFIG (legacy, used by detail page)
// ============================================================

export const CATEGORY_CONFIG: Record<Noren['category'], {
    label: string;
    color: string;
    bg: string;
}> = {
    toeic:         { label: 'TOEIC',    color: '#10B981', bg: '#ECFDF5' },
    speaking:      { label: 'SPEAKING', color: '#3B82F6', bg: '#EFF6FF' },
    listening:     { label: 'LISTENING', color: '#8B5CF6', bg: '#F5F3FF' },
    movie:         { label: 'MOVIE',    color: '#EF4444', bg: '#FEF2F2' },
    pronunciation: { label: 'PRONUNCIATION', color: '#EC4899', bg: '#FDF2F8' },
    business:      { label: 'BUSINESS', color: '#0891B2', bg: '#ECFEFF' },
    beginner:      { label: 'BEGINNER', color: '#F59E0B', bg: '#FFFBEB' },
    custom:        { label: 'CUSTOM',   color: '#78716C', bg: '#F5F5F4' },
};

// ============================================================
// SAMPLE DATA
// ============================================================

const TODAY = '2026-04-11';

export const SAMPLE_NORENS: Noren[] = [
    // ────────────────────────────────────────────
    // 1. TOEIC 800を超える
    // ────────────────────────────────────────────
    {
        id: 'toeic-800',
        goal: 'TOEIC 800を超える',
        name: 'TOEIC 800を超える',
        description: '600-750で停滞してる人。あと一歩が遠い戦友たち。',
        subtitle: '600-750で停滞してる人。あと一歩が遠い戦友たち。',
        drive: 'necessity',
        category: 'toeic',
        color: '#10B981',
        walkerCount: 23,
        memberCount: 23,
        activeToday: 8,
        createdAt: '2026-03-15',
        linkedContent: '/english/toeic',
        milestones: [
            { step: 1, label: '基礎文法を固める' },
            { step: 2, label: 'Part 5を攻略する' },
            { step: 3, label: 'リスニング基礎訓練' },
            { step: 4, label: '音声変化を理解する' },
            { step: 5, label: '模試で実力を確認する' },
            { step: 6, label: '本番に挑む' },
        ],
        goalMilestones: [
            { step: 1, title: '基礎文法を固める', description: '時制・関係詞・分詞構文の3本柱。ここが穴だとPart 5で死ぬ。', daysTypical: 14 },
            { step: 2, title: 'Part 5を攻略する', description: '1問20秒で解けるようになる。パターン認識が全て。', daysTypical: 10 },
            { step: 3, title: 'リスニング基礎訓練', description: 'Part 1-2を確実に取る。短い文を100%聞き取る。', daysTypical: 14 },
            { step: 4, title: '音声変化を理解する', description: 'リンキング、リダクション、フラッピング。聞こえない理由を知る。', daysTypical: 21 },
            { step: 5, title: '模試で実力を確認する', description: '本番形式で時間を測って解く。弱点を数値で把握。', daysTypical: 7 },
            { step: 6, title: '本番に挑む', description: '準備は終わった。あとはやるだけ。', daysTypical: 1 },
        ],
        walkers: [
            { id: 'w-t01', nickname: 'ケンジ', badge: 'tabi', startedAt: '2026-03-15', lastActiveAt: TODAY, currentMilestone: 4, daysWalking: 27, sharedCount: 12, learnedCount: 8, note: '先週Part 5で9割取れた。音声変化に入る。' },
            { id: 'w-t02', nickname: 'サトミ', badge: 'michibiki', startedAt: '2026-03-16', lastActiveAt: TODAY, currentMilestone: 5, daysWalking: 26, sharedCount: 31, learnedCount: 15, note: '模試で780。あと20点が果てしなく遠い。' },
            { id: 'w-t03', nickname: 'タロウ', badge: 'aruki', startedAt: '2026-03-20', lastActiveAt: TODAY, currentMilestone: 2, daysWalking: 22, sharedCount: 3, learnedCount: 9, note: 'Part 5の時制問題で毎回死ぬ' },
            { id: 'w-t04', nickname: 'ユミ', badge: 'tabi', startedAt: '2026-03-18', lastActiveAt: '2026-04-10', currentMilestone: 3, daysWalking: 20, sharedCount: 8, learnedCount: 12 },
            { id: 'w-t05', nickname: 'ダイスケ', badge: 'aruki', startedAt: '2026-04-01', lastActiveAt: TODAY, currentMilestone: 1, daysWalking: 10, sharedCount: 1, learnedCount: 6, note: '会社の昇進にTOEIC必要...ゼロから始める' },
            { id: 'w-t06', nickname: 'マスター風間', badge: 'mimamori', startedAt: '2026-03-15', lastActiveAt: TODAY, currentMilestone: 6, daysWalking: 27, sharedCount: 45, learnedCount: 5, note: 'TOEIC 920。道の空気を見守ってる。' },
        ],
        footprints: [
            { id: 'fp-t01', walkerId: 'w-t02', nickname: 'サトミ', badge: 'michibiki', milestoneStep: 2, text: 'Part 5の時制問題、コツ見つけた。主語の後ろにby next weekとか未来の時間表現があったら、未来完了を疑え。will have + 過去分詞。これだけで3問拾える。', date: '2026-04-11', thanksCount: 7, type: 'breakthrough', noteUrl: 'https://note.com/satomi_english/n/n4b7c2e1f8a93' },
            { id: 'fp-t02', walkerId: 'w-t03', nickname: 'タロウ', badge: 'aruki', milestoneStep: 4, text: 'canとcan\'tの聞き分け、マジでわからん。どっちも同じに聞こえる。誰か助けて...', date: '2026-04-11', thanksCount: 2, type: 'struggle' },
            { id: 'fp-t03', walkerId: 'w-t06', nickname: 'マスター風間', badge: 'mimamori', milestoneStep: 4, text: 'can\'tは母音/ae/が強くなる。canは弱形で/k\u0259n/。「ント」が聞こえるか聞こえないかじゃない。母音の強さだけ聞け。それで9割わかる。', date: '2026-04-11', thanksCount: 11, type: 'tip', noteUrl: 'https://note.com/master_kazama/n/n1d5e8b3c0f62' },
            { id: 'fp-t04', walkerId: 'w-t01', nickname: 'ケンジ', badge: 'tabi', milestoneStep: 2, text: '今日のPart 5、全問正解。先週サトミに教えてもらった時制の見分け方が効いてる。パターンが見えると速い。', date: '2026-04-11', thanksCount: 4, type: 'breakthrough' },
            { id: 'fp-t05', walkerId: 'w-t05', nickname: 'ダイスケ', badge: 'aruki', milestoneStep: 1, text: '音声変化ってどこから手をつければいい？lisqueってやつ見たけど種類多すぎてパニック。', date: '2026-04-11', thanksCount: 1, type: 'struggle' },
            { id: 'fp-t06', walkerId: 'w-t02', nickname: 'サトミ', badge: 'michibiki', milestoneStep: 5, text: '模試2回目。Part 7の最後5問が時間切れ。読むスピードじゃなくて、先に設問読む順番の問題だと気づいた。設問→本文→該当箇所。この順番で次やってみる。', date: '2026-04-10', thanksCount: 9, type: 'tip', noteUrl: 'https://note.com/satomi_english/n/n9a2f7d4e1b85' },
            { id: 'fp-t07', walkerId: 'w-t04', nickname: 'ユミ', badge: 'tabi', milestoneStep: 3, text: 'Part 3、男女の会話で女性の声だけ全然聞き取れない。男性はわかるのに。高い周波数帯に耳が慣れてないのかも。女性ナレーターだけ集中して聞く練習始めた。', date: '2026-04-09', thanksCount: 6, type: 'tip' },
        ],
        latestFootprint: {
            nickname: 'ケンジ',
            badge: 'tabi',
            text: '今日Part 5全問正解。先週教わった時制の見分け方が効いてる。',
            type: 'breakthrough',
            date: '2026-04-11',
        },
        members: [
            { id: 'w-t01', nickname: 'ケンジ', joinedAt: '2026-03-15', lastActiveAt: TODAY, badge: 'tabi', daysActive: 27, taughtCount: 12, learnedCount: 8, strengths: ['文法', 'Part 5'], weaknesses: ['リスニング', '音声変化'], currentDay: 18, message: '先週Part 5で9割取れた' },
            { id: 'w-t02', nickname: 'サトミ', joinedAt: '2026-03-16', lastActiveAt: TODAY, badge: 'michibiki', daysActive: 26, taughtCount: 31, learnedCount: 15, strengths: ['洋画リスニング', 'イディオム'], weaknesses: ['Part 7 長文'], currentDay: 22, message: '模試で780。あと20点。' },
            { id: 'w-t03', nickname: 'タロウ', joinedAt: '2026-03-20', lastActiveAt: TODAY, badge: 'aruki', daysActive: 22, taughtCount: 3, learnedCount: 9, strengths: ['単語力'], weaknesses: ['スピーキング', '文法'], currentDay: 8 },
            { id: 'w-t04', nickname: 'ユミ', joinedAt: '2026-03-18', lastActiveAt: '2026-04-10', badge: 'tabi', daysActive: 20, taughtCount: 8, learnedCount: 12, strengths: ['Part 3/4'], weaknesses: ['Part 5 文法'], currentDay: 15 },
            { id: 'w-t05', nickname: 'ダイスケ', joinedAt: '2026-04-01', lastActiveAt: TODAY, badge: 'aruki', daysActive: 10, taughtCount: 1, learnedCount: 6, strengths: ['ビジネス英語'], weaknesses: ['発音', 'リスニング'], currentDay: 5, message: '会社の昇進にTOEIC必要...' },
            { id: 'w-t06', nickname: 'マスター風間', joinedAt: '2026-03-15', lastActiveAt: TODAY, badge: 'mimamori', daysActive: 27, taughtCount: 45, learnedCount: 5, strengths: ['全般', 'TOEIC 920'], weaknesses: ['スラング'], currentDay: 30, message: '道の空気を見守ってる' },
        ],
        posts: [
            { id: 'p001', memberId: 'w-t02', memberNickname: 'サトミ', memberBadge: 'michibiki', content: 'Part 5の時制問題、コツ見つけた。主語の後ろにby next weekとか未来の時間表現があったら、未来完了を疑え。will have + 過去分詞。これだけで3問拾える。', createdAt: '2026-04-11T09:30:00', helpfulCount: 7, isQuestion: false },
            { id: 'p002', memberId: 'w-t03', memberNickname: 'タロウ', memberBadge: 'aruki', content: 'canとcan\'tの聞き分け、マジでわからん。どっちも同じに聞こえる。誰かコツ教えて...', createdAt: '2026-04-11T10:15:00', helpfulCount: 2, isQuestion: true },
            { id: 'p003', memberId: 'w-t06', memberNickname: 'マスター風間', memberBadge: 'mimamori', content: 'can\'tは母音/ae/が強くなる。canは弱形で/k\u0259n/。母音の強さだけ聞け。それで9割わかる。', createdAt: '2026-04-11T10:22:00', helpfulCount: 11, isQuestion: false },
            { id: 'p004', memberId: 'w-t01', memberNickname: 'ケンジ', memberBadge: 'tabi', content: '今日のPart 5、全問正解。先週サトミに教えてもらった時制の見分け方が効いてる。パターンが見えると速い。', createdAt: '2026-04-11T12:00:00', helpfulCount: 4, isQuestion: false },
            { id: 'p005', memberId: 'w-t05', memberNickname: 'ダイスケ', memberBadge: 'aruki', content: '音声変化ってどこから手をつければいい？lisqueってやつ見たけど種類多すぎてパニック。', createdAt: '2026-04-11T13:45:00', helpfulCount: 1, isQuestion: true },
            { id: 'p006', memberId: 'w-t02', memberNickname: 'サトミ', memberBadge: 'michibiki', content: '模試2回目。Part 7の最後5問が時間切れ。設問→本文→該当箇所の順番で次やってみる。', createdAt: '2026-04-10T22:10:00', helpfulCount: 9, isQuestion: false },
        ],
    },

    // ────────────────────────────────────────────
    // 2. ネイティブと3分話せるようになる
    // ────────────────────────────────────────────
    {
        id: 'native-talk',
        goal: 'ネイティブと3分話せるようになる',
        name: 'ネイティブと3分話せるようになる',
        description: 'TOEICは高い。でも口が開かない。その痛みを知ってる仲間。',
        subtitle: 'TOEICは高い。でも口が開かない。その痛みを知ってる仲間。',
        drive: 'freedom',
        category: 'speaking',
        color: '#3B82F6',
        walkerCount: 31,
        memberCount: 31,
        activeToday: 12,
        createdAt: '2026-03-10',
        linkedContent: '/english/izakaya-toeic/kaiwa',
        milestones: [
            { step: 1, label: '挨拶だけで終わる' },
            { step: 2, label: '足場ことばを覚える' },
            { step: 3, label: '30秒つなげる' },
            { step: 5, label: '1分間ひとりで話せる' },
            { step: 6, label: '3分間途切れない' },
        ],
        goalMilestones: [
            { step: 1, title: '挨拶だけで終わる', description: 'Hi, how are you? / Good, thanks. ここで会話が死ぬ段階。', daysTypical: 3 },
            { step: 2, title: '足場ことばを覚える', description: 'I mean, You know, Well, Actually... 沈黙を埋める武器を持つ。', daysTypical: 7 },
            { step: 3, title: '30秒つなげる', description: '一つのトピックで30秒。文法は壊れてもいい。止まらないことが目標。', daysTypical: 14 },
            { step: 5, title: '1分間ひとりで話せる', description: '自分の意見を1分間。構成は「結論→理由→例→まとめ」。', daysTypical: 21 },
            { step: 6, title: '3分間途切れない', description: '相手とラリーが続く。沈黙が怖くなくなる。ゴール。', daysTypical: 30 },
        ],
        walkers: [
            { id: 'w-n01', nickname: 'リョウ', badge: 'mimamori', startedAt: '2026-03-10', lastActiveAt: TODAY, currentMilestone: 5, daysWalking: 32, sharedCount: 38, learnedCount: 20, note: 'TOEIC 890。文法完璧なのに口から出ない矛盾と戦ってる。' },
            { id: 'w-n02', nickname: 'アヤ', badge: 'michibiki', startedAt: '2026-03-12', lastActiveAt: TODAY, currentMilestone: 6, daysWalking: 30, sharedCount: 22, learnedCount: 18, note: 'オンライン英会話3ヶ月目。最初のレッスンで泣いた。今は笑える。' },
            { id: 'w-n03', nickname: 'シンジ', badge: 'tabi', startedAt: '2026-03-25', lastActiveAt: TODAY, currentMilestone: 2, daysWalking: 17, sharedCount: 5, learnedCount: 14, note: 'TOEIC 920あるのに外国人の前で固まる。知識と実践の壁。' },
            { id: 'w-n04', nickname: 'マリコ', badge: 'aruki', startedAt: '2026-04-02', lastActiveAt: TODAY, currentMilestone: 1, daysWalking: 9, sharedCount: 2, learnedCount: 7, note: '海外旅行でYes/Noしか言えなかった悔しさでここに来た' },
            { id: 'w-n05', nickname: 'トモヤ', badge: 'tabi', startedAt: '2026-03-18', lastActiveAt: TODAY, currentMilestone: 3, daysWalking: 24, sharedCount: 11, learnedCount: 16, note: 'シャドーイングを毎朝15分。口の筋肉が変わってきた気がする。' },
        ],
        footprints: [
            { id: 'fp-n01', walkerId: 'w-n03', nickname: 'シンジ', badge: 'tabi', milestoneStep: 1, text: 'スタバで外国人に話しかけられて "Sorry..." しか出なかった。TOEIC 920点が何の役にも立たない瞬間。俺は何を勉強してきたんだ。', date: '2026-04-11', thanksCount: 18, type: 'struggle' },
            { id: 'fp-n02', walkerId: 'w-n02', nickname: 'アヤ', badge: 'michibiki', milestoneStep: 2, text: '私もそうだった。変わったきっかけは「完璧な文を作るのをやめた」こと。I mean... とか Well... で時間を稼いでる間に次の言葉が出てくる。最初の一言が出れば、あとは勝手に続く。', date: '2026-04-11', thanksCount: 14, type: 'breakthrough' },
            { id: 'fp-n03', walkerId: 'w-n01', nickname: 'リョウ', badge: 'mimamori', milestoneStep: 2, text: '完璧な文を作ろうとするな。ネイティブの会話の70%は足場ことばだ。I mean, you know, like, well, actually... これは「えーと」と同じ。使っていい。むしろ使え。', date: '2026-04-11', thanksCount: 22, type: 'tip', noteUrl: 'https://note.com/ryo_eigo/n/n6c3a9e2d7f14' },
            { id: 'fp-n04', walkerId: 'w-n05', nickname: 'トモヤ', badge: 'tabi', milestoneStep: 3, text: '今日オンライン英会話で初めて30秒止まらなかった。文法めちゃくちゃだったけど、先生が "I understood everything!" って言ってくれた。通じるって快感。', date: '2026-04-10', thanksCount: 9, type: 'breakthrough' },
            { id: 'fp-n05', walkerId: 'w-n04', nickname: 'マリコ', badge: 'aruki', milestoneStep: 1, text: 'How are you?の後が続かない問題、"I\'m good, how about you?"って返すだけで会話が2往復になることに気づいた。小さいけどこれがデカい。', date: '2026-04-11', thanksCount: 7, type: 'tip' },
            { id: 'fp-n06', walkerId: 'w-n01', nickname: 'リョウ', badge: 'mimamori', milestoneStep: 5, text: '1分スピーチ、構成テンプレート見つけた。「I think... because... for example... so...」この4つで1分埋まる。中身スカスカでも構造があると聞こえ方が全然違う。', date: '2026-04-09', thanksCount: 16, type: 'tip', noteUrl: 'https://note.com/ryo_eigo/n/n2b8f5c1a4e30' },
        ],
        latestFootprint: {
            nickname: 'シンジ',
            badge: 'tabi',
            text: 'TOEIC 920あるのに、スタバで "Sorry..." しか出なかった。',
            type: 'struggle',
            date: '2026-04-11',
        },
        members: [
            { id: 'w-n01', nickname: 'リョウ', joinedAt: '2026-03-10', lastActiveAt: TODAY, badge: 'mimamori', daysActive: 32, taughtCount: 38, learnedCount: 20, strengths: ['TOEIC 890', '文法'], weaknesses: ['スピーキング', '瞬発力'], currentDay: 25 },
            { id: 'w-n02', nickname: 'アヤ', joinedAt: '2026-03-12', lastActiveAt: TODAY, badge: 'michibiki', daysActive: 30, taughtCount: 22, learnedCount: 18, strengths: ['発音', '映画表現'], weaknesses: ['ビジネス英語'], currentDay: 28, message: 'オンライン英会話3ヶ月目。最初泣いた。今は笑える。' },
            { id: 'w-n03', nickname: 'シンジ', joinedAt: '2026-03-25', lastActiveAt: TODAY, badge: 'tabi', daysActive: 17, taughtCount: 5, learnedCount: 14, strengths: ['リーディング', 'TOEIC 920'], weaknesses: ['全然喋れない'], currentDay: 10, message: 'TOEIC 920あるのに外国人の前で固まる' },
            { id: 'w-n04', nickname: 'マリコ', joinedAt: '2026-04-02', lastActiveAt: TODAY, badge: 'aruki', daysActive: 9, taughtCount: 2, learnedCount: 7, strengths: ['やる気'], weaknesses: ['会話全般'], currentDay: 4, message: '海外旅行の悔しさがエネルギー' },
            { id: 'w-n05', nickname: 'トモヤ', joinedAt: '2026-03-18', lastActiveAt: TODAY, badge: 'tabi', daysActive: 24, taughtCount: 11, learnedCount: 16, strengths: ['シャドーイング'], weaknesses: ['即興で話す'], currentDay: 18, message: '毎朝15分シャドーイング。口の筋肉変わってきた。' },
        ],
        posts: [
            { id: 'p101', memberId: 'w-n03', memberNickname: 'シンジ', memberBadge: 'tabi', content: 'TOEIC 920あるのに、スタバで外国人に話しかけられて "Sorry..." しか出なかった。俺は何を勉強してきたんだ。', createdAt: '2026-04-11T08:00:00', helpfulCount: 18, isQuestion: false },
            { id: 'p102', memberId: 'w-n02', memberNickname: 'アヤ', memberBadge: 'michibiki', content: 'わかる。私もそうだった。「完璧な文を作るのをやめた」のがきっかけ。I mean... とか Well... で時間を稼いでる間に次の言葉が出てくる。最初の一言が出れば、あとは勝手に続く。', createdAt: '2026-04-11T08:15:00', helpfulCount: 14, isQuestion: false },
            { id: 'p103', memberId: 'w-n01', memberNickname: 'リョウ', memberBadge: 'mimamori', content: '完璧な文を作ろうとするな。I mean... とか You know... を挟んでいい。ネイティブの70%は足場ことば。使っていい。むしろ使え。', createdAt: '2026-04-11T08:30:00', helpfulCount: 22, isQuestion: false },
            { id: 'p104', memberId: 'w-n05', memberNickname: 'トモヤ', memberBadge: 'tabi', content: '今日初めて30秒止まらなかった。文法めちゃくちゃだったけど先生が "I understood everything!" って。通じるって快感。', createdAt: '2026-04-10T21:45:00', helpfulCount: 9, isQuestion: false },
            { id: 'p105', memberId: 'w-n04', memberNickname: 'マリコ', memberBadge: 'aruki', content: 'How are you?の後何言えばいいですか？Good, thanksで毎回終わる...', createdAt: '2026-04-11T11:30:00', helpfulCount: 3, isQuestion: true },
        ],
    },

    // ────────────────────────────────────────────
    // 3. オンライン英会話を始める
    // ────────────────────────────────────────────
    {
        id: 'eikaiwa-debut',
        goal: 'オンライン英会話を始める',
        name: 'オンライン英会話を始める',
        drive: 'freedom',
        description: '怖くてまだ予約ボタンが押せない人。一緒なら行ける。',
        subtitle: '怖くてまだ予約ボタンが押せない人。一緒なら行ける。',
        category: 'beginner',
        color: '#F59E0B',
        walkerCount: 15,
        memberCount: 15,
        activeToday: 6,
        createdAt: '2026-04-01',
        milestones: [
            { step: 1, label: 'アプリをインストールする' },
            { step: 2, label: '無料体験を予約する' },
            { step: 3, label: '1回目のレッスンを受ける' },
            { step: 4, label: '2回目を予約する' },
            { step: 5, label: '3回目のレッスンを完了する' },
        ],
        goalMilestones: [
            { step: 1, title: 'アプリをインストールする', description: 'DMM英会話、Cambly、NativeCamp... どれでもいい。まずは入れる。', daysTypical: 1 },
            { step: 2, title: '無料体験を予約する', description: 'ここが一番の壁。予約ボタンを押すだけ。それだけ。', daysTypical: 7 },
            { step: 3, title: '1回目のレッスンを受ける', description: '死ぬほど緊張する。でも25分は終わる。絶対に終わる。', daysTypical: 3 },
            { step: 4, title: '2回目を予約する', description: '1回目の恥ずかしさを超えて、もう1回やる。ここが本当の分岐点。', daysTypical: 5 },
            { step: 5, title: '3回目のレッスンを完了する', description: '3回やったら「始めた人」。もう初心者じゃない。', daysTypical: 7 },
        ],
        walkers: [
            { id: 'w-e01', nickname: 'ミキ', badge: 'tabi', startedAt: '2026-04-01', lastActiveAt: TODAY, currentMilestone: 2, daysWalking: 10, sharedCount: 2, learnedCount: 8, note: '予約ボタンの前で30分固まってる。明日こそ押す。' },
            { id: 'w-e02', nickname: 'コウタ', badge: 'aruki', startedAt: '2026-04-05', lastActiveAt: TODAY, currentMilestone: 2, daysWalking: 6, sharedCount: 1, learnedCount: 4, note: 'ミキと同じ日に予約する約束した。逃げられない。' },
            { id: 'w-e03', nickname: 'ハルカ', badge: 'aruki', startedAt: '2026-04-03', lastActiveAt: TODAY, currentMilestone: 4, daysWalking: 8, sharedCount: 5, learnedCount: 3, note: '1回目終わった。先生めっちゃ優しかった。泣きそうだった。' },
            { id: 'w-e04', nickname: 'ユウスケ', badge: 'aruki', startedAt: '2026-04-08', lastActiveAt: TODAY, currentMilestone: 1, daysWalking: 3, sharedCount: 0, learnedCount: 2, note: 'アプリ3つ入れた。どれにするか決められない。' },
        ],
        footprints: [
            { id: 'fp-e01', walkerId: 'w-e01', nickname: 'ミキ', badge: 'tabi', milestoneStep: 2, text: '予約ボタンの前で30分固まってる。「先生に英語通じなかったらどうしよう」って考えすぎて指が動かない。誰か背中押して。', date: '2026-04-11', thanksCount: 6, type: 'struggle' },
            { id: 'fp-e02', walkerId: 'w-e02', nickname: 'コウタ', badge: 'aruki', milestoneStep: 2, text: '俺も一緒にやる。来週の火曜日、同じ日に予約しよう。逃げたら報告しろ。俺も報告する。', date: '2026-04-11', thanksCount: 8, type: 'tip' },
            { id: 'fp-e03', walkerId: 'w-e03', nickname: 'ハルカ', badge: 'aruki', milestoneStep: 3, text: '1回目終わった!!! 手が震えてたけど先生が "Don\'t worry, take your time" って言ってくれて泣きそうになった。25分あっという間。自己紹介しかできなかったけど、先生が笑顔だった。それだけで十分。', date: '2026-04-10', thanksCount: 15, type: 'breakthrough', noteUrl: 'https://note.com/haruka_eikaiwa/n/n7e4c2b9d0f58' },
            { id: 'fp-e04', walkerId: 'w-e03', nickname: 'ハルカ', badge: 'aruki', milestoneStep: 3, text: '事前に自己紹介だけ紙に書いておくといい。名前、仕事、趣味、英語を勉強してる理由。これだけで最初の5分は乗り切れる。', date: '2026-04-10', thanksCount: 11, type: 'tip' },
            { id: 'fp-e05', walkerId: 'w-e04', nickname: 'ユウスケ', badge: 'aruki', milestoneStep: 1, text: 'DMM、Cambly、NativeCamp全部インストールした。比較記事20本読んだ。でも結局どれがいいかわからん。選べない自分に腹が立つ。', date: '2026-04-11', thanksCount: 3, type: 'struggle' },
        ],
        latestFootprint: {
            nickname: 'ハルカ',
            badge: 'aruki',
            text: '1回目終わった!!! 手が震えてたけど25分あっという間だった。',
            type: 'breakthrough',
            date: '2026-04-10',
        },
        members: [
            { id: 'w-e01', nickname: 'ミキ', joinedAt: '2026-04-01', lastActiveAt: TODAY, badge: 'tabi', daysActive: 10, taughtCount: 2, learnedCount: 8, strengths: ['やる気'], weaknesses: ['全部'], currentDay: 3, message: '明日こそ予約ボタン押す...' },
            { id: 'w-e02', nickname: 'コウタ', joinedAt: '2026-04-05', lastActiveAt: TODAY, badge: 'aruki', daysActive: 6, taughtCount: 1, learnedCount: 4, strengths: ['読み書き'], weaknesses: ['話す', '聞く'], currentDay: 2 },
            { id: 'w-e03', nickname: 'ハルカ', joinedAt: '2026-04-03', lastActiveAt: TODAY, badge: 'aruki', daysActive: 8, taughtCount: 5, learnedCount: 3, strengths: ['度胸'], weaknesses: ['語彙', '文法'], currentDay: 6, message: '1回目クリア。2回目の予約完了。' },
            { id: 'w-e04', nickname: 'ユウスケ', joinedAt: '2026-04-08', lastActiveAt: TODAY, badge: 'aruki', daysActive: 3, taughtCount: 0, learnedCount: 2, strengths: ['リサーチ力'], weaknesses: ['決断力'], currentDay: 1 },
        ],
        posts: [
            { id: 'p201', memberId: 'w-e01', memberNickname: 'ミキ', memberBadge: 'tabi', content: '予約ボタンの前で30分固まってる。「先生に英語通じなかったらどうしよう」って考えすぎて指が動かない。誰か背中押して。', createdAt: '2026-04-11T11:00:00', helpfulCount: 6, isQuestion: false },
            { id: 'p202', memberId: 'w-e02', memberNickname: 'コウタ', memberBadge: 'aruki', content: '俺も一緒にやる。来週の火曜日、同じ日に予約しよう。逃げたら報告しろ。', createdAt: '2026-04-11T11:20:00', helpfulCount: 8, isQuestion: false },
            { id: 'p203', memberId: 'w-e03', memberNickname: 'ハルカ', memberBadge: 'aruki', content: '1回目終わった!!! 手が震えてたけど先生が "Don\'t worry, take your time" って。25分あっという間。自己紹介しかできなかったけど、先生が笑顔だった。それだけで十分。', createdAt: '2026-04-10T20:00:00', helpfulCount: 15, isQuestion: false },
            { id: 'p204', memberId: 'w-e04', memberNickname: 'ユウスケ', memberBadge: 'aruki', content: 'DMM、Cambly、NativeCampどれがいい？比較記事読みすぎてわからなくなった', createdAt: '2026-04-11T15:00:00', helpfulCount: 3, isQuestion: true },
        ],
    },

    // ────────────────────────────────────────────
    // 4. 映画を字幕なしで楽しむ
    // ────────────────────────────────────────────
    {
        id: 'movie-english',
        goal: '映画を字幕なしで楽しむ',
        name: '映画を字幕なしで楽しむ',
        description: '洋画が好き。でも英語で聞くと別の映画になる。',
        subtitle: '洋画が好き。でも英語で聞くと別の映画になる。',
        drive: 'freedom',
        category: 'movie',
        color: '#EF4444',
        walkerCount: 19,
        memberCount: 19,
        activeToday: 7,
        createdAt: '2026-04-01',
        linkedContent: '/english/harvest',
        milestones: [
            { step: 1, label: '字幕ありで1本通して見る' },
            { step: 2, label: 'セリフを10個拾う' },
            { step: 3, label: '1シーンを字幕なしで理解する' },
            { step: 4, label: '字幕なしで30分耐える' },
            { step: 5, label: '字幕なしで笑える' },
        ],
        goalMilestones: [
            { step: 1, title: '字幕ありで1本通して見る', description: '英語字幕をON。知ってる映画がいい。話を追わなくていい。', daysTypical: 3 },
            { step: 2, title: 'セリフを10個拾う', description: '好きなシーンのセリフを書き出す。意味より音を覚える。', daysTypical: 7 },
            { step: 3, title: '1シーンを字幕なしで理解する', description: '3分のシーンを繰り返し見る。字幕なしで7割わかったらOK。', daysTypical: 14 },
            { step: 4, title: '字幕なしで30分耐える', description: '全部わからなくていい。話の流れが追えればOK。', daysTypical: 21 },
            { step: 5, title: '字幕なしで笑える', description: 'ジョークが英語のまま入ってくる。字幕を読んで笑うのとは別物。ゴール。', daysTypical: 60 },
        ],
        walkers: [
            { id: 'w-m01', nickname: 'テツ', badge: 'tabi', startedAt: '2026-04-01', lastActiveAt: TODAY, currentMilestone: 3, daysWalking: 10, sharedCount: 8, learnedCount: 6, note: 'Tarantino映画でリスニング鍛えてる。汚い言葉から覚えるスタイル。' },
            { id: 'w-m02', nickname: 'サキ', badge: 'michibiki', startedAt: '2026-03-20', lastActiveAt: TODAY, currentMilestone: 4, daysWalking: 22, sharedCount: 14, learnedCount: 9, note: 'Friends全シーズン英語字幕で完走。字幕なしに挑戦中。' },
            { id: 'w-m03', nickname: 'カズマ', badge: 'aruki', startedAt: '2026-04-05', lastActiveAt: TODAY, currentMilestone: 1, daysWalking: 6, sharedCount: 1, learnedCount: 5, note: 'ハリーポッターを英語で見直してる。知ってる話だから楽。' },
            { id: 'w-m04', nickname: 'ノゾミ', badge: 'tabi', startedAt: '2026-03-28', lastActiveAt: '2026-04-10', currentMilestone: 2, daysWalking: 14, sharedCount: 6, learnedCount: 8, note: 'ディズニー映画のセリフ集めてる。Let it goの歌詞全部覚えた。' },
        ],
        footprints: [
            { id: 'fp-m01', walkerId: 'w-m01', nickname: 'テツ', badge: 'tabi', milestoneStep: 2, text: 'Pulp Fictionの "I\'m gonna" が全部 "アムガナ" に聞こえるようになった。going toを待ってたら一生聞こえない。カジュアル発音の世界が開けた。', date: '2026-04-11', thanksCount: 8, type: 'breakthrough' },
            { id: 'fp-m02', walkerId: 'w-m02', nickname: 'サキ', badge: 'michibiki', milestoneStep: 4, text: 'Friendsのジョークが字幕なしで笑えた瞬間が忘れられない。Chandlerの皮肉が英語のまま面白い。日本語字幕だと全然違うニュアンスだったんだ。', date: '2026-04-10', thanksCount: 12, type: 'breakthrough', noteUrl: 'https://note.com/saki_movies/n/n3d1b7f9c5e26' },
            { id: 'fp-m03', walkerId: 'w-m02', nickname: 'サキ', badge: 'michibiki', milestoneStep: 3, text: '字幕なし練習のコツ: 最初は知ってる映画でやれ。話の展開知ってるから「今このシーン」ってわかる。そうすると英語が文脈にハマって聞こえてくる。知らない映画でやると挫折する。', date: '2026-04-09', thanksCount: 10, type: 'tip' },
            { id: 'fp-m04', walkerId: 'w-m03', nickname: 'カズマ', badge: 'aruki', milestoneStep: 1, text: 'ハリーポッターの英語字幕、知ってるシーンなのに全然読めない。字幕のスピード速すぎ。でも音だけ聞くと意外とわかるシーンもある。読むより聞くほうが楽な時がある。不思議。', date: '2026-04-11', thanksCount: 4, type: 'struggle' },
        ],
        latestFootprint: {
            nickname: 'テツ',
            badge: 'tabi',
            text: '"I\'m gonna" が "アムガナ" に聞こえた。カジュアル発音の世界が開けた。',
            type: 'breakthrough',
            date: '2026-04-11',
        },
        members: [
            { id: 'w-m01', nickname: 'テツ', joinedAt: '2026-04-01', lastActiveAt: TODAY, badge: 'tabi', daysActive: 10, taughtCount: 8, learnedCount: 6, strengths: ['Tarantino全作品', 'スラング'], weaknesses: ['フォーマル英語'], currentDay: 8, message: 'Pulp Fictionでリスニング修行中' },
            { id: 'w-m02', nickname: 'サキ', joinedAt: '2026-03-20', lastActiveAt: TODAY, badge: 'michibiki', daysActive: 22, taughtCount: 14, learnedCount: 9, strengths: ['Friends全シーズン', 'ドラマ英語'], weaknesses: ['映画の速い英語'], currentDay: 20, message: 'Chandlerの皮肉が字幕なしで笑えた' },
            { id: 'w-m03', nickname: 'カズマ', joinedAt: '2026-04-05', lastActiveAt: TODAY, badge: 'aruki', daysActive: 6, taughtCount: 1, learnedCount: 5, strengths: ['ファンタジー作品'], weaknesses: ['リスニング全般'], currentDay: 3 },
            { id: 'w-m04', nickname: 'ノゾミ', joinedAt: '2026-03-28', lastActiveAt: '2026-04-10', badge: 'tabi', daysActive: 14, taughtCount: 6, learnedCount: 8, strengths: ['ディズニー', '歌詞'], weaknesses: ['速い会話'], currentDay: 10, message: 'Let it goの歌詞全部覚えた' },
        ],
        posts: [
            { id: 'p301', memberId: 'w-m01', memberNickname: 'テツ', memberBadge: 'tabi', content: 'Pulp Fictionの "I\'m gonna" が全部 "アムガナ" に聞こえるようになった。going toを待ってたら一生聞こえない。', createdAt: '2026-04-11T09:00:00', helpfulCount: 8, isQuestion: false },
            { id: 'p302', memberId: 'w-m02', memberNickname: 'サキ', memberBadge: 'michibiki', content: 'Friendsのジョークが字幕なしで笑えた。Chandlerの皮肉が英語のまま面白い。日本語字幕だと全然違うニュアンスだったんだ。', createdAt: '2026-04-10T23:00:00', helpfulCount: 12, isQuestion: false },
            { id: 'p303', memberId: 'w-m03', memberNickname: 'カズマ', memberBadge: 'aruki', content: 'ハリーポッター英語字幕で見直してるけど字幕のスピード速すぎない？みんなどうやって追いついてる？', createdAt: '2026-04-11T14:00:00', helpfulCount: 4, isQuestion: true },
        ],
    },

    // ────────────────────────────────────────────
    // 5. 英語の発音を根本から直す
    // ────────────────────────────────────────────
    {
        id: 'hatsuon-gachi',
        goal: '英語の発音を根本から直す',
        name: '英語の発音を根本から直す',
        description: '通じればいい、じゃなくて、ちゃんと直したい人。',
        subtitle: '通じればいい、じゃなくて、ちゃんと直したい人。',
        drive: 'freedom',
        category: 'pronunciation',
        color: '#EC4899',
        walkerCount: 11,
        memberCount: 11,
        activeToday: 4,
        createdAt: '2026-03-20',
        linkedContent: '/english/lisque',
        milestones: [
            { step: 1, label: '/l/と/r/を区別する' },
            { step: 2, label: '母音を整理する' },
            { step: 3, label: '音声変化のルールを知る' },
            { step: 4, label: 'リズムとイントネーション' },
            { step: 5, label: 'ネイティブに聞き返されない' },
        ],
        goalMilestones: [
            { step: 1, title: '/l/と/r/を区別する', description: '日本人最大の壁。舌の位置を意識するところから。', daysTypical: 14 },
            { step: 2, title: '母音を整理する', description: '/\u026A/と/i\u02D0/、/\u00E6/と/\u028C/。日本語にない母音を体で覚える。', daysTypical: 21 },
            { step: 3, title: '音声変化のルールを知る', description: 'リンキング、フラッピング、リダクション。なぜ消えるのか理解する。', daysTypical: 21 },
            { step: 4, title: 'リズムとイントネーション', description: '英語は強弱のリズム。日本語の平坦さを壊す練習。', daysTypical: 30 },
            { step: 5, title: 'ネイティブに聞き返されない', description: '初見のネイティブに一発で通じる。ゴール。', daysTypical: 60 },
        ],
        walkers: [
            { id: 'w-h01', nickname: 'ナオキ', badge: 'michibiki', startedAt: '2026-03-20', lastActiveAt: TODAY, currentMilestone: 3, daysWalking: 22, sharedCount: 15, learnedCount: 10, note: 'IPA記号オタク。音声学の本3冊読んだ。でも口が追いつかない。' },
            { id: 'w-h02', nickname: 'ヒロミ', badge: 'tabi', startedAt: '2026-03-25', lastActiveAt: TODAY, currentMilestone: 2, daysWalking: 17, sharedCount: 7, learnedCount: 12, note: 'rightとlightが自分で聞いても同じに聞こえる段階。' },
            { id: 'w-h03', nickname: 'ショウ', badge: 'aruki', startedAt: '2026-04-03', lastActiveAt: TODAY, currentMilestone: 1, daysWalking: 8, sharedCount: 3, learnedCount: 6, note: '発音記号すら読めないところからスタート。' },
            { id: 'w-h04', nickname: 'エミ', badge: 'tabi', startedAt: '2026-03-28', lastActiveAt: '2026-04-10', currentMilestone: 4, daysWalking: 14, sharedCount: 9, learnedCount: 4, note: '帰国子女の同僚に「日本語アクセント強いね」と言われたのがきっかけ。' },
        ],
        footprints: [
            { id: 'fp-h01', walkerId: 'w-h01', nickname: 'ナオキ', badge: 'michibiki', milestoneStep: 1, text: '/r/のコツ: 舌をどこにもつけない。口の中で舌を丸めて浮かせる。/l/は舌の先を上の歯の裏にべったりつける。真逆の動き。これを交互に練習すると体が覚える。', date: '2026-04-11', thanksCount: 13, type: 'tip' },
            { id: 'fp-h02', walkerId: 'w-h02', nickname: 'ヒロミ', badge: 'tabi', milestoneStep: 1, text: 'rightとlightを100回交互に録音して聞いた。50回目くらいで「あ、違う音だ」って初めて自分の耳で聞こえた。脳が新しい音のカテゴリを作った感覚。鳥肌立った。', date: '2026-04-10', thanksCount: 16, type: 'breakthrough', noteUrl: 'https://note.com/hiromi_hatsuon/n/n5f0d8a3c2b71' },
            { id: 'fp-h03', walkerId: 'w-h04', nickname: 'エミ', badge: 'tabi', milestoneStep: 4, text: '英語のリズム、日本語と根本的に違う。日本語は「タタタタタ」で等間隔。英語は「タン・タ・タン・タタ・タン」で強弱がある。強い音節の間隔が等しい。弱い音節は潰されて消える。これがわかってから発音が別人になった。', date: '2026-04-09', thanksCount: 11, type: 'breakthrough' },
            { id: 'fp-h04', walkerId: 'w-h03', nickname: 'ショウ', badge: 'aruki', milestoneStep: 1, text: '発音記号、最初は暗号に見えた。でもlisqueのDay 1から順番にやったら3日で基本の記号は読めるようになった。全部覚えなくていい。よく出る10個だけでいい。', date: '2026-04-11', thanksCount: 5, type: 'tip' },
            { id: 'fp-h05', walkerId: 'w-h01', nickname: 'ナオキ', badge: 'michibiki', milestoneStep: 2, text: '/\u00E6/（catの母音）が全然できない。口を横に引っ張りながら下あごを落とす。「エ」と「ア」の中間。録音して聞くと自分のは完全に「ア」。日本語の「ア」と英語の/\u00E6/は別の音だって頭ではわかってるのに口が日本語に戻る。', date: '2026-04-08', thanksCount: 8, type: 'struggle' },
        ],
        latestFootprint: {
            nickname: 'ヒロミ',
            badge: 'tabi',
            text: 'rightとlightを100回録音。50回目で「違う音だ」と聞こえた。鳥肌。',
            type: 'breakthrough',
            date: '2026-04-10',
        },
        members: [
            { id: 'w-h01', nickname: 'ナオキ', joinedAt: '2026-03-20', lastActiveAt: TODAY, badge: 'michibiki', daysActive: 22, taughtCount: 15, learnedCount: 10, strengths: ['IPA記号', '母音理論'], weaknesses: ['/r/ の発音', '実践'], currentDay: 20, message: '知識は十分。口が追いつかない。' },
            { id: 'w-h02', nickname: 'ヒロミ', joinedAt: '2026-03-25', lastActiveAt: TODAY, badge: 'tabi', daysActive: 17, taughtCount: 7, learnedCount: 12, strengths: ['根気', '録音練習'], weaknesses: ['/l/と/r/', '母音'], currentDay: 12, message: '100回録音して聞く修行中' },
            { id: 'w-h03', nickname: 'ショウ', joinedAt: '2026-04-03', lastActiveAt: TODAY, badge: 'aruki', daysActive: 8, taughtCount: 3, learnedCount: 6, strengths: ['素直さ'], weaknesses: ['発音記号', '全般'], currentDay: 5 },
            { id: 'w-h04', nickname: 'エミ', joinedAt: '2026-03-28', lastActiveAt: '2026-04-10', badge: 'tabi', daysActive: 14, taughtCount: 9, learnedCount: 4, strengths: ['リズム感', '音楽経験'], weaknesses: ['個別の子音'], currentDay: 14, message: '日本語アクセント、絶対直す。' },
        ],
        posts: [
            { id: 'p401', memberId: 'w-h01', memberNickname: 'ナオキ', memberBadge: 'michibiki', content: '/r/のコツ: 舌をどこにもつけない。口の中で舌を丸めて浮かせる。/l/は舌の先を上の歯の裏にべったりつける。真逆の動き。交互に練習すると体が覚える。', createdAt: '2026-04-11T07:30:00', helpfulCount: 13, isQuestion: false },
            { id: 'p402', memberId: 'w-h02', memberNickname: 'ヒロミ', memberBadge: 'tabi', content: 'rightとlightを100回交互に録音して聞いた。50回目くらいで「あ、違う音だ」って初めて聞こえた。脳が新しいカテゴリを作った感覚。鳥肌。', createdAt: '2026-04-10T22:00:00', helpfulCount: 16, isQuestion: false },
            { id: 'p403', memberId: 'w-h03', memberNickname: 'ショウ', memberBadge: 'aruki', content: '発音記号って最初から全部覚えないとダメ？多すぎてパニック', createdAt: '2026-04-11T09:30:00', helpfulCount: 2, isQuestion: true },
            { id: 'p404', memberId: 'w-h04', memberNickname: 'エミ', memberBadge: 'tabi', content: '英語のリズム、日本語と根本的に違う。「タタタタタ」じゃなくて「タン・タ・タン・タタ・タン」。強弱がある。これがわかってから発音が別人になった。', createdAt: '2026-04-09T18:00:00', helpfulCount: 11, isQuestion: false },
        ],
    },

    // ────────────────────────────────────────────
    // 6. 英語で会議を乗り切る
    // ────────────────────────────────────────────
    {
        id: 'eigode-kaigi',
        goal: '英語で会議を乗り切る',
        name: '英語で会議を乗り切る',
        description: '来月から英語会議。切実。逃げ場なし。',
        subtitle: '来月から英語会議。切実。逃げ場なし。',
        drive: 'necessity',
        category: 'business',
        color: '#0891B2',
        walkerCount: 14,
        memberCount: 14,
        activeToday: 5,
        createdAt: '2026-03-25',
        milestones: [
            { step: 1, label: '資料を英語で読める' },
            { step: 2, label: '定型フレーズを覚える' },
            { step: 3, label: '議論を聞いて要点がわかる' },
            { step: 4, label: '質問ができる' },
            { step: 5, label: '会議で発言できる' },
        ],
        goalMilestones: [
            { step: 1, title: '資料を英語で読める', description: 'アジェンダ、議事録、スライド。まず読めないと話にならない。', daysTypical: 7 },
            { step: 2, title: '定型フレーズを覚える', description: '"I agree with...", "Could you clarify...?", "Let me summarize..." 会議の武器。', daysTypical: 14 },
            { step: 3, title: '議論を聞いて要点がわかる', description: '全部聞き取れなくていい。「誰が何を主張してるか」だけ追う。', daysTypical: 21 },
            { step: 4, title: '質問ができる', description: '"Could you say that again?" すら言えない状態を超える。聞き返すのは恥じゃない。', daysTypical: 14 },
            { step: 5, title: '会議で発言できる', description: '自分の意見を英語で言う。短くていい。"I think we should..." の一言でいい。ゴール。', daysTypical: 30 },
        ],
        walkers: [
            { id: 'w-k01', nickname: 'マサヒロ', badge: 'tabi', startedAt: '2026-03-25', lastActiveAt: TODAY, currentMilestone: 3, daysWalking: 17, sharedCount: 6, learnedCount: 11, note: '来月からチームに外国人が入る。メール英語はなんとかなるけど会議が怖い。' },
            { id: 'w-k02', nickname: 'アキコ', badge: 'tabi', startedAt: '2026-03-28', lastActiveAt: TODAY, currentMilestone: 2, daysWalking: 14, sharedCount: 4, learnedCount: 9, note: '外資に転職した。英語面接は通ったのに会議で一言も喋れなかった初日。' },
            { id: 'w-k03', nickname: 'タケシ', badge: 'tabi', startedAt: '2026-04-01', lastActiveAt: TODAY, currentMilestone: 4, daysWalking: 10, sharedCount: 9, learnedCount: 5, note: '海外駐在3年目。会議はまだ苦手。でもコツが見えてきた。' },
            { id: 'w-k04', nickname: 'ユカリ', badge: 'aruki', startedAt: '2026-04-05', lastActiveAt: TODAY, currentMilestone: 1, daysWalking: 6, sharedCount: 0, learnedCount: 3, note: '上司に「次の会議、英語でよろしく」って言われた。来週。' },
        ],
        footprints: [
            { id: 'fp-k01', walkerId: 'w-k03', nickname: 'タケシ', badge: 'tabi', milestoneStep: 4, text: '会議で使える最強フレーズ: "Sorry, could you go over that one more time?" 聞き返しのハードルが一番高い。でもネイティブ同士でも普通に言ってる。聞き返すのは恥じゃない。わかったフリが一番やばい。', date: '2026-04-11', thanksCount: 14, type: 'tip' },
            { id: 'fp-k02', walkerId: 'w-k02', nickname: 'アキコ', badge: 'tabi', milestoneStep: 2, text: '初日の会議、1時間ずっと黙ってた。何を言ってるかわかるのに、口を開くタイミングがわからない。英語力じゃなくて、割り込む勇気の問題。', date: '2026-04-10', thanksCount: 11, type: 'struggle' },
            { id: 'fp-k03', walkerId: 'w-k03', nickname: 'タケシ', badge: 'tabi', milestoneStep: 5, text: '会議で発言するコツ: 最初の5分で1回だけ何か言え。"I agree" でいい。最初の1回が出れば2回目からは楽。5分過ぎると永遠に喋れなくなる。', date: '2026-04-09', thanksCount: 19, type: 'tip', noteUrl: 'https://note.com/takeshi_kaigi/n/n8a6e3f1d9c04' },
            { id: 'fp-k04', walkerId: 'w-k01', nickname: 'マサヒロ', badge: 'tabi', milestoneStep: 3, text: '会議の英語、全部聞こうとすると死ぬ。キーワードだけ拾う練習してる。「誰が」「何を」「いつまでに」。この3つだけ追えば議事録は書ける。完璧に聞く必要はない。', date: '2026-04-11', thanksCount: 8, type: 'tip' },
            { id: 'fp-k05', walkerId: 'w-k04', nickname: 'ユカリ', badge: 'aruki', milestoneStep: 1, text: '来週の会議の資料、英語で30ページ。Google翻訳で全部訳したくなるけど、それだと会議中にリアルタイムで読めない。重要そうな段落だけ自力で読む練習。辞書引きまくってる。', date: '2026-04-11', thanksCount: 3, type: 'struggle' },
        ],
        latestFootprint: {
            nickname: 'タケシ',
            badge: 'tabi',
            text: '最初の5分で1回だけ何か言え。"I agree" でいい。それが出れば2回目は楽。',
            type: 'breakthrough',
            date: '2026-04-09',
        },
        members: [
            { id: 'w-k01', nickname: 'マサヒロ', joinedAt: '2026-03-25', lastActiveAt: TODAY, badge: 'tabi', daysActive: 17, taughtCount: 6, learnedCount: 11, strengths: ['メール英語', '読解'], weaknesses: ['会議での発言', '電話'], currentDay: 12, message: '来月から外国人がチームに入る。やばい。' },
            { id: 'w-k02', nickname: 'アキコ', joinedAt: '2026-03-28', lastActiveAt: TODAY, badge: 'tabi', daysActive: 14, taughtCount: 4, learnedCount: 9, strengths: ['英語面接', '読解'], weaknesses: ['リアルタイム会話', '割り込み'], currentDay: 8, message: '外資転職。面接は通ったのに会議で沈黙。' },
            { id: 'w-k03', nickname: 'タケシ', joinedAt: '2026-04-01', lastActiveAt: TODAY, badge: 'tabi', daysActive: 10, taughtCount: 9, learnedCount: 5, strengths: ['海外駐在経験', '度胸'], weaknesses: ['ネイティブの雑談'], currentDay: 9, message: '駐在3年目。コツが見えてきた。' },
            { id: 'w-k04', nickname: 'ユカリ', joinedAt: '2026-04-05', lastActiveAt: TODAY, badge: 'aruki', daysActive: 6, taughtCount: 0, learnedCount: 3, strengths: ['真面目さ'], weaknesses: ['英語全般'], currentDay: 3, message: '来週英語会議。上司の無茶振り。' },
        ],
        posts: [
            { id: 'p501', memberId: 'w-k03', memberNickname: 'タケシ', memberBadge: 'tabi', content: '会議で使える最強フレーズ: "Sorry, could you go over that one more time?" 聞き返すのは恥じゃない。わかったフリが一番やばい。', createdAt: '2026-04-11T10:00:00', helpfulCount: 14, isQuestion: false },
            { id: 'p502', memberId: 'w-k02', memberNickname: 'アキコ', memberBadge: 'tabi', content: '初日の会議、1時間黙ってた。内容はわかるのに口を開くタイミングがわからない。英語力じゃなくて割り込む勇気の問題。', createdAt: '2026-04-10T23:30:00', helpfulCount: 11, isQuestion: false },
            { id: 'p503', memberId: 'w-k03', memberNickname: 'タケシ', memberBadge: 'tabi', content: '会議のコツ: 最初の5分で1回だけ何か言え。"I agree" でいい。5分過ぎると永遠に喋れなくなる。', createdAt: '2026-04-09T19:00:00', helpfulCount: 19, isQuestion: false },
            { id: 'p504', memberId: 'w-k01', memberNickname: 'マサヒロ', memberBadge: 'tabi', content: '会議のリスニング、全部聞こうとすると死ぬ。「誰が」「何を」「いつまでに」だけ追えば議事録書ける。', createdAt: '2026-04-11T12:30:00', helpfulCount: 8, isQuestion: false },
            { id: 'p505', memberId: 'w-k04', memberNickname: 'ユカリ', memberBadge: 'aruki', content: '来週英語会議。資料30ページ。Google翻訳に頼りたいけどそれだと本番で読めない。自力で読む練習してるけど辞書引く回数がやばい。', createdAt: '2026-04-11T16:00:00', helpfulCount: 3, isQuestion: false },
        ],
    },

    // ────────────────────────────────────────────
    // 7. noteで英語発信を始める
    // ────────────────────────────────────────────
    {
        id: 'note-eigo-start',
        goal: 'noteで英語発信を始める',
        name: 'noteで英語発信を始める',
        description: '教えたいことがある。でも最初の一歩が怖い。',
        subtitle: '教えたいことがある。でも最初の一歩が怖い。',
        drive: 'teaching',
        category: 'custom',
        color: '#7C3AED',
        walkerCount: 15,
        memberCount: 15,
        activeToday: 4,
        createdAt: '2026-03-28',
        milestones: [
            { step: 1, label: '自分の強みを見つける' },
            { step: 2, label: '最初の記事を書く' },
            { step: 3, label: '10記事到達' },
            { step: 4, label: '読者の反応を分析' },
            { step: 5, label: '定期発信のリズムを作る' },
            { step: 6, label: '自分のスタイルを確立する' },
        ],
        goalMilestones: [
            { step: 1, title: '自分の強みを見つける', description: '何を教えられるか、何を経験してきたか。発信の軸は「自分の体験」だけでいい。', daysTypical: 7 },
            { step: 2, title: '最初の記事を書く', description: '完璧じゃなくていい。とにかく公開する。1記事目は誰も読まない。それでいい。', daysTypical: 7 },
            { step: 3, title: '10記事到達', description: '10記事書くと自分の文体が見えてくる。テーマも絞れてくる。10が最初の壁。', daysTypical: 30 },
            { step: 4, title: '読者の反応を分析', description: 'スキ数、コメント、PV。どの記事が刺さったか。次に書くものが決まる。', daysTypical: 14 },
            { step: 5, title: '定期発信のリズムを作る', description: '週1でもいい。リズムさえ作れば止まらない。不定期発信が一番続かない。', daysTypical: 30 },
            { step: 6, title: '自分のスタイルを確立する', description: 'テーマ、文体、読者層。「これは自分の記事だ」と言えるようになる。ゴール。', daysTypical: 60 },
        ],
        walkers: [
            { id: 'w-no01', nickname: 'ミホ', badge: 'michibiki', startedAt: '2026-03-28', lastActiveAt: TODAY, currentMilestone: 5, daysWalking: 14, sharedCount: 18, learnedCount: 11, note: '英検1級持ち。でも発信ゼロだった。noteを始めて3ヶ月。今は読者が500人超えた。' },
            { id: 'w-no02', nickname: 'ヒデ', badge: 'tabi', startedAt: '2026-04-01', lastActiveAt: TODAY, currentMilestone: 3, daysWalking: 10, sharedCount: 6, learnedCount: 9, note: '英語学習歴10年。書けるネタは山ほどある。でも「誰が読むんだ」って思って止まってた。' },
            { id: 'w-no03', nickname: 'カナコ', badge: 'aruki', startedAt: '2026-04-07', lastActiveAt: TODAY, currentMilestone: 1, daysWalking: 4, sharedCount: 1, learnedCount: 5, note: '英語教師10年目。授業で使ってるコツをnoteに書きたい。でも文章を書くのが怖い。' },
            { id: 'w-no04', nickname: 'タツヤ', badge: 'tabi', startedAt: '2026-03-30', lastActiveAt: '2026-04-10', currentMilestone: 4, daysWalking: 12, sharedCount: 9, learnedCount: 7, note: 'TOEIC満点。その道のりをまとめたら4000スキ。一番ウケた記事を今でも信じられない。' },
        ],
        footprints: [
            { id: 'fp-no01', walkerId: 'w-no01', nickname: 'ミホ', badge: 'michibiki', milestoneStep: 2, text: '最初の記事、公開ボタンを押すまで3時間迷った。押した瞬間、心臓が止まるかと思った。でも何も起きなかった。誰も来なかった。それが逆に楽になった。誰も見てないなら怖くない。', date: '2026-04-11', thanksCount: 12, type: 'breakthrough', noteUrl: 'https://note.com/miho_eigo/n/n3c7a1e9f2d84' },
            { id: 'fp-no02', walkerId: 'w-no02', nickname: 'ヒデ', badge: 'tabi', milestoneStep: 1, text: '「強みを見つけろ」って言われても、自分が普通だと思ってること全部が強みになる。TOEIC 800への道のり、音声変化の覚え方、シャドーイングの挫折と復活。学習者目線で書いたほうが読まれる。', date: '2026-04-10', thanksCount: 8, type: 'tip' },
            { id: 'fp-no03', walkerId: 'w-no03', nickname: 'カナコ', badge: 'aruki', milestoneStep: 1, text: '10年教えてきたのに、いざ文章にしようとすると何も書けない。頭の中にあるものを言語化するって、授業とは全然違う技術だと気づいた。授業は話せばいい。noteは残る。', date: '2026-04-11', thanksCount: 5, type: 'struggle' },
            { id: 'fp-no04', walkerId: 'w-no04', nickname: 'タツヤ', badge: 'tabi', milestoneStep: 4, text: '一番読まれた記事はTOEIC満点の勉強法じゃなかった。「TOEIC 600点で会社に詰められた話」だった。失敗の話のほうがずっと読まれる。完璧な体験談より、泥臭い過程が刺さる。', date: '2026-04-09', thanksCount: 21, type: 'breakthrough', noteUrl: 'https://note.com/tatsuya_toeic/n/n7b4d2f6e0a51' },
            { id: 'fp-no05', walkerId: 'w-no01', nickname: 'ミホ', badge: 'michibiki', milestoneStep: 5, text: '週1公開のリズム、最初の1ヶ月が死ぬほどキツい。ネタが尽きる気がして。でも3ヶ月続けると逆にネタが増える。日常で「これnoteに書けるな」って見えてくる。習慣は続けないと見えない景色がある。', date: '2026-04-11', thanksCount: 16, type: 'tip' },
        ],
        latestFootprint: {
            nickname: 'タツヤ',
            badge: 'tabi',
            text: '一番読まれたのは満点体験談じゃなく「600点で詰められた話」だった。',
            type: 'breakthrough',
            date: '2026-04-09',
        },
        members: [
            { id: 'w-no01', nickname: 'ミホ', joinedAt: '2026-03-28', lastActiveAt: TODAY, badge: 'michibiki', daysActive: 14, taughtCount: 18, learnedCount: 11, strengths: ['英検1級', '継続力'], weaknesses: ['SEO', '拡散'], currentDay: 14, message: '読者500人。次は1000人。' },
            { id: 'w-no02', nickname: 'ヒデ', joinedAt: '2026-04-01', lastActiveAt: TODAY, badge: 'tabi', daysActive: 10, taughtCount: 6, learnedCount: 9, strengths: ['ネタの量', '経験値'], weaknesses: ['公開する勇気', 'タイトル'], currentDay: 10, message: '書けるネタは山ほどある。あとは出すだけ。' },
            { id: 'w-no03', nickname: 'カナコ', joinedAt: '2026-04-07', lastActiveAt: TODAY, badge: 'aruki', daysActive: 4, taughtCount: 1, learnedCount: 5, strengths: ['教える経験10年'], weaknesses: ['文章を書くこと', '言語化'], currentDay: 3 },
            { id: 'w-no04', nickname: 'タツヤ', joinedAt: '2026-03-30', lastActiveAt: '2026-04-10', badge: 'tabi', daysActive: 12, taughtCount: 9, learnedCount: 7, strengths: ['TOEIC満点', '体験の深さ'], weaknesses: ['継続', '定期更新'], currentDay: 12, message: '4000スキ記事があるとは思ってなかった。' },
        ],
        posts: [
            { id: 'p601', memberId: 'w-no01', memberNickname: 'ミホ', memberBadge: 'michibiki', content: '最初の記事、公開ボタン押すまで3時間迷った。押したら誰も来なかった。それが逆に楽になった。誰も見てないなら怖くない。', createdAt: '2026-04-11T09:00:00', helpfulCount: 12, isQuestion: false },
            { id: 'p602', memberId: 'w-no02', memberNickname: 'ヒデ', memberBadge: 'tabi', content: '自分が普通だと思ってること全部が強みになる。学習者目線で書いたほうが読まれる。専門家の目線より失敗した人の目線。', createdAt: '2026-04-10T21:00:00', helpfulCount: 8, isQuestion: false },
            { id: 'p603', memberId: 'w-no03', memberNickname: 'カナコ', memberBadge: 'aruki', content: '10年教えてきたのに文章にしようとすると何も書けない。授業と文章は全然違う技術なんだと気づいた。', createdAt: '2026-04-11T10:30:00', helpfulCount: 5, isQuestion: false },
            { id: 'p604', memberId: 'w-no04', memberNickname: 'タツヤ', memberBadge: 'tabi', content: '一番読まれた記事はTOEIC満点体験談じゃなかった。「600点で会社に詰められた話」だった。失敗談のほうがずっと読まれる。', createdAt: '2026-04-09T18:30:00', helpfulCount: 21, isQuestion: false },
            { id: 'p605', memberId: 'w-no01', memberNickname: 'ミホ', memberBadge: 'michibiki', content: '週1公開、最初の1ヶ月が一番キツい。3ヶ月続けると日常で「これnoteに書けるな」が見えてくる。習慣は続けないと見えない景色がある。', createdAt: '2026-04-11T14:00:00', helpfulCount: 16, isQuestion: false },
        ],
    },

    // ────────────────────────────────────────────
    // 8. 英語コーチとして月収30万
    // ────────────────────────────────────────────
    {
        id: 'coach-30man',
        goal: '英語コーチとして月収30万',
        name: '英語コーチとして月収30万',
        description: '会社員の給料を超えたい。でも集客が地獄。',
        subtitle: '会社員の給料を超えたい。でも集客が地獄。',
        drive: 'teaching',
        category: 'business',
        color: '#7C3AED',
        walkerCount: 9,
        memberCount: 9,
        activeToday: 3,
        createdAt: '2026-03-22',
        milestones: [
            { step: 1, label: '最初の1人に無料で教える' },
            { step: 2, label: '有料化して3人集める' },
            { step: 3, label: '口コミで10人にする' },
            { step: 4, label: '月10万を安定させる' },
            { step: 5, label: '仕組み化して30万に乗せる' },
            { step: 6, label: 'リピーターで安定収入' },
        ],
        goalMilestones: [
            { step: 1, title: '最初の1人に無料で教える', description: '友達でも知り合いでも誰でもいい。教える経験と自信を作るのが最初のミッション。', daysTypical: 14 },
            { step: 2, title: '有料化して3人集める', description: '月3万でいい。最初の有料生徒が一番価値の証明になる。SNSかnoteで存在を示す。', daysTypical: 30 },
            { step: 3, title: '口コミで10人にする', description: '紹介が最強の集客。生徒が満足すれば次の生徒を連れてくる。広告より口コミ。', daysTypical: 60 },
            { step: 4, title: '月10万を安定させる', description: '10人×月1万か5人×月2万か。パッケージを設計して安定させる。', daysTypical: 60 },
            { step: 5, title: '仕組み化して30万に乗せる', description: 'グループレッスン、動画教材、サブスク。時間を売る構造から抜け出す。', daysTypical: 90 },
            { step: 6, title: 'リピーターで安定収入', description: '3ヶ月以上続くリピーターが収入の柱になる。解約率を下げる仕組みを作る。ゴール。', daysTypical: 90 },
        ],
        walkers: [
            { id: 'w-c01', nickname: 'ユウコ', badge: 'michibiki', startedAt: '2026-03-22', lastActiveAt: TODAY, currentMilestone: 5, daysWalking: 20, sharedCount: 22, learnedCount: 14, note: '英語コーチ2年目。今月28万。あと2万が遠い。でも去年の今頃は月3万だった。' },
            { id: 'w-c02', nickname: 'コウスケ', badge: 'tabi', startedAt: '2026-03-28', lastActiveAt: TODAY, currentMilestone: 3, daysWalking: 14, sharedCount: 7, learnedCount: 10, note: '会社員しながら副業コーチ。月8万まで来た。でも本業との両立で死にそう。' },
            { id: 'w-c03', nickname: 'アスカ', badge: 'aruki', startedAt: '2026-04-04', lastActiveAt: TODAY, currentMilestone: 1, daysWalking: 7, sharedCount: 2, learnedCount: 8, note: 'TOEIC 985、英検1級。でも「教えられる」と「実力がある」は違うと初回レッスンで悟った。' },
        ],
        footprints: [
            { id: 'fp-c01', walkerId: 'w-c02', nickname: 'コウスケ', badge: 'tabi', milestoneStep: 2, text: '最初の有料化、3000円にしたら誰も来なかった。5000円にしたら1人来た。1万円にしたら2人来た。安すぎると「怪しい」って思われる。価格は自信の表明だと気づいた。', date: '2026-04-11', thanksCount: 17, type: 'breakthrough', noteUrl: 'https://note.com/kosuke_coach/n/n2a8f4c7e1b96' },
            { id: 'fp-c02', walkerId: 'w-c03', nickname: 'アスカ', badge: 'aruki', milestoneStep: 1, text: '初レッスン、実力はあるはずなのに説明できない。自分がどうやって英語を習得したか言語化できてない。「感覚でできる」と「人に教える」は全然別のスキル。私はまだ「教えるスキル」を持っていない。', date: '2026-04-11', thanksCount: 9, type: 'struggle' },
            { id: 'fp-c03', walkerId: 'w-c01', nickname: 'ユウコ', badge: 'michibiki', milestoneStep: 4, text: '月10万の壁を超えたのは「体験レッスン→3ヶ月パッケージ」の導線を作ったとき。単発レッスンを売るな。最初から3ヶ月セットで売れ。月1万×10人より月3万×4人のほうが管理が楽で収入も安定する。', date: '2026-04-10', thanksCount: 24, type: 'tip', noteUrl: 'https://note.com/yuko_coach/n/n5e1d9b3a7c08' },
            { id: 'fp-c04', walkerId: 'w-c02', nickname: 'コウスケ', badge: 'tabi', milestoneStep: 3, text: 'SNSで集客しようとして3ヶ月消えた。一番効いたのは既存生徒に紹介を頼んだこと。「あなたの友達が英語で困ってたら教えてあげたい、紹介してほしい」と直接言う。人間関係に勝る集客はない。', date: '2026-04-09', thanksCount: 13, type: 'tip' },
            { id: 'fp-c05', walkerId: 'w-c01', nickname: 'ユウコ', badge: 'michibiki', milestoneStep: 2, text: '「私なんかが教えていいのか」インポスター症候群、コーチ全員が通る道だと思う。私より英語ができる人は山ほどいる。でも「その人に合わせて教える」のが仕事。英語力じゃなくて伴走力を売ってる。', date: '2026-04-08', thanksCount: 19, type: 'breakthrough' },
        ],
        latestFootprint: {
            nickname: 'ユウコ',
            badge: 'michibiki',
            text: '月10万超えたのは体験→3ヶ月パッケージの導線を作ったとき。',
            type: 'breakthrough',
            date: '2026-04-10',
        },
        members: [
            { id: 'w-c01', nickname: 'ユウコ', joinedAt: '2026-03-22', lastActiveAt: TODAY, badge: 'michibiki', daysActive: 20, taughtCount: 22, learnedCount: 14, strengths: ['パッケージ設計', '継続率'], weaknesses: ['新規集客', '値上げ交渉'], currentDay: 20, message: '今月28万。あと2万。' },
            { id: 'w-c02', nickname: 'コウスケ', joinedAt: '2026-03-28', lastActiveAt: TODAY, badge: 'tabi', daysActive: 14, taughtCount: 7, learnedCount: 10, strengths: ['SNS', '行動力'], weaknesses: ['時間管理', '本業との両立'], currentDay: 12, message: '副業月8万。でも疲れ果ててる。' },
            { id: 'w-c03', nickname: 'アスカ', joinedAt: '2026-04-04', lastActiveAt: TODAY, badge: 'aruki', daysActive: 7, taughtCount: 2, learnedCount: 8, strengths: ['TOEIC 985', '英検1級'], weaknesses: ['教え方の言語化', '価格設定'], currentDay: 5, message: '実力と教える力は別だと知った。' },
        ],
        posts: [
            { id: 'p701', memberId: 'w-c02', memberNickname: 'コウスケ', memberBadge: 'tabi', content: '最初の有料化、3000円は誰も来なかった。5000円で1人、1万円で2人。安すぎると怪しい。価格は自信の表明。', createdAt: '2026-04-11T10:00:00', helpfulCount: 17, isQuestion: false },
            { id: 'p702', memberId: 'w-c03', memberNickname: 'アスカ', memberBadge: 'aruki', content: '初レッスンで気づいた。自分がどうやって英語を習得したか言語化できてない。感覚でできると教えるは全然別のスキル。', createdAt: '2026-04-11T11:00:00', helpfulCount: 9, isQuestion: false },
            { id: 'p703', memberId: 'w-c01', memberNickname: 'ユウコ', memberBadge: 'michibiki', content: '月10万超えたのは体験→3ヶ月パッケージの導線を作ったとき。単発を売るな。最初から3ヶ月セットで売れ。', createdAt: '2026-04-10T20:00:00', helpfulCount: 24, isQuestion: false },
            { id: 'p704', memberId: 'w-c02', memberNickname: 'コウスケ', memberBadge: 'tabi', content: 'SNS集客3ヶ月やって効果なし。最強は生徒に直接「友達で英語困ってる人いたら教えてあげたい」と頼むこと。人間関係に勝る集客はない。', createdAt: '2026-04-09T19:00:00', helpfulCount: 13, isQuestion: false },
            { id: 'p705', memberId: 'w-c01', memberNickname: 'ユウコ', memberBadge: 'michibiki', content: '「私なんかが教えていいのか」は全員が通る。英語力じゃなくて伴走力を売ってる。それに気づいてからインポスター症候群が消えた。', createdAt: '2026-04-08T22:00:00', helpfulCount: 19, isQuestion: false },
        ],
    },

    // ────────────────────────────────────────────
    // 9. オンラインレッスンで初の生徒を取る
    // ────────────────────────────────────────────
    {
        id: 'first-student',
        goal: 'オンラインレッスンで初の生徒を取る',
        name: 'オンラインレッスンで初の生徒を取る',
        description: '英語はできる。教えたい。でも生徒がいない。',
        subtitle: '英語はできる。教えたい。でも生徒がいない。',
        drive: 'teaching',
        category: 'custom',
        color: '#7C3AED',
        walkerCount: 18,
        memberCount: 18,
        activeToday: 5,
        createdAt: '2026-03-18',
        milestones: [
            { step: 1, label: '教えるスキルを棚卸し' },
            { step: 2, label: '体験レッスンを設計する' },
            { step: 3, label: 'SNSで存在を知らせる' },
            { step: 4, label: '最初の体験レッスン' },
            { step: 5, label: '初の有料生徒' },
        ],
        goalMilestones: [
            { step: 1, title: '教えるスキルを棚卸し', description: '何が教えられるか、誰に向いてるか、どんな実績があるか。ここを曖昧にすると全部が曖昧になる。', daysTypical: 7 },
            { step: 2, title: '体験レッスンを設計する', description: '45分の無料体験を構成する。何を見せて、何を感じてもらって、最後にどう終わるか。台本を作れ。', daysTypical: 14 },
            { step: 3, title: 'SNSで存在を知らせる', description: 'TwitterでもnoteでもInstagramでも。「英語を教えてる人」として認識される投稿を10本出す。', daysTypical: 21 },
            { step: 4, title: '最初の体験レッスン', description: '誰でもいい。知り合い、フォロワー、友達の友達。最初の1人を通す経験が全てを変える。', daysTypical: 7 },
            { step: 5, title: '初の有料生徒', description: '体験後に「続けたい」と言ってもらう。金額は関係ない。お金をもらって教えた事実がキャリアの始まり。ゴール。', daysTypical: 14 },
        ],
        walkers: [
            { id: 'w-fs01', nickname: 'ノリコ', badge: 'tabi', startedAt: '2026-03-18', lastActiveAt: TODAY, currentMilestone: 4, daysWalking: 24, sharedCount: 11, learnedCount: 9, note: '元英語教師。学校を辞めてオンラインで個人レッスンを始めた。今体験レッスン設計中。' },
            { id: 'w-fs02', nickname: 'ケイタ', badge: 'tabi', startedAt: '2026-03-25', lastActiveAt: TODAY, currentMilestone: 3, daysWalking: 17, sharedCount: 8, learnedCount: 12, note: '海外在住10年。英語は話せる。でも「教え方」が全くわからない。どこから始めればいい？' },
            { id: 'w-fs03', nickname: 'ルミ', badge: 'aruki', startedAt: '2026-04-05', lastActiveAt: TODAY, currentMilestone: 1, daysWalking: 6, sharedCount: 2, learnedCount: 6, note: 'フリーランサーを目指してる。英語発音矯正に特化しようとしてるが、需要があるのかが不安。' },
            { id: 'w-fs04', nickname: 'マサキ', badge: 'michibiki', startedAt: '2026-03-18', lastActiveAt: TODAY, currentMilestone: 5, daysWalking: 24, sharedCount: 19, learnedCount: 8, note: '初の有料生徒が来た。月謝8000円。泣いた。お金もらって教えるって、認めてもらえた感じがする。' },
        ],
        footprints: [
            { id: 'fp-fs01', walkerId: 'w-fs04', nickname: 'マサキ', badge: 'michibiki', milestoneStep: 5, text: '初の有料生徒が取れた。月謝8000円。金額は関係なかった。「お金を払ってでも教わりたい」と言ってもらえた事実が、私がコーチであることの証明になった。半年間の準備期間が一瞬で報われた。', date: '2026-04-11', thanksCount: 28, type: 'breakthrough', noteUrl: 'https://note.com/masaki_lesson/n/n9d3f6b2c8e17' },
            { id: 'fp-fs02', walkerId: 'w-fs02', nickname: 'ケイタ', badge: 'tabi', milestoneStep: 1, text: '英語は話せるのに「なぜこの文法が間違いか」を説明できなかった。英語が体に染み込みすぎて、言語化する回路がない。ネイティブスピーカーが一番教えるのが難しいって本当だった。', date: '2026-04-10', thanksCount: 15, type: 'struggle' },
            { id: 'fp-fs03', walkerId: 'w-fs01', nickname: 'ノリコ', badge: 'tabi', milestoneStep: 2, text: '体験レッスンの設計で気づいたこと。最初の10分で「この先生、自分のことをわかってる」と感じさせないと離脱する。だから冒頭は絶対に相手の話を聞く時間にしてる。教えるのは後半でいい。', date: '2026-04-11', thanksCount: 11, type: 'tip', noteUrl: 'https://note.com/noriko_teacher/n/n4b8e1a5f9c32' },
            { id: 'fp-fs04', walkerId: 'w-fs03', nickname: 'ルミ', badge: 'aruki', milestoneStep: 1, text: '発音矯正に需要があるか不安だったが、Twitterで「日本人の英語発音」について投稿したら予想外に反応があった。需要を調べる前に発信してみる、という順番のほうが早かった。', date: '2026-04-11', thanksCount: 7, type: 'breakthrough' },
            { id: 'fp-fs05', walkerId: 'w-fs04', nickname: 'マサキ', badge: 'michibiki', milestoneStep: 3, text: 'SNS発信で一番効いたのは「今日の生徒の気づき」を匿名で投稿すること。「こんな人が教わってる」が伝わる。実績ゼロでも生徒の声がコンテンツになる。生徒が増えるほど投稿ネタも増える。', date: '2026-04-09', thanksCount: 14, type: 'tip' },
        ],
        latestFootprint: {
            nickname: 'マサキ',
            badge: 'michibiki',
            text: '初の有料生徒が来た。月謝8000円。お金をもらって教えるって、認められた感じがした。',
            type: 'breakthrough',
            date: '2026-04-11',
        },
        members: [
            { id: 'w-fs01', nickname: 'ノリコ', joinedAt: '2026-03-18', lastActiveAt: TODAY, badge: 'tabi', daysActive: 24, taughtCount: 11, learnedCount: 9, strengths: ['教える経験', '学校現場'], weaknesses: ['SNS発信', '集客'], currentDay: 18, message: '学校を出た。次は自分で生徒を集める。' },
            { id: 'w-fs02', nickname: 'ケイタ', joinedAt: '2026-03-25', lastActiveAt: TODAY, badge: 'tabi', daysActive: 17, taughtCount: 8, learnedCount: 12, strengths: ['英語力', '海外経験'], weaknesses: ['文法の言語化', '教え方'], currentDay: 14, message: '英語は話せる。教え方を学んでる。' },
            { id: 'w-fs03', nickname: 'ルミ', joinedAt: '2026-04-05', lastActiveAt: TODAY, badge: 'aruki', daysActive: 6, taughtCount: 2, learnedCount: 6, strengths: ['発音矯正の知識'], weaknesses: ['集客', '自信'], currentDay: 4 },
            { id: 'w-fs04', nickname: 'マサキ', joinedAt: '2026-03-18', lastActiveAt: TODAY, badge: 'michibiki', daysActive: 24, taughtCount: 19, learnedCount: 8, strengths: ['SNS発信', 'コンテンツ設計'], weaknesses: ['価格設定', '規模拡大'], currentDay: 24, message: '初の有料生徒が来た。泣いた。' },
        ],
        posts: [
            { id: 'p801', memberId: 'w-fs04', memberNickname: 'マサキ', memberBadge: 'michibiki', content: '初の有料生徒が来た。月謝8000円。金額関係ない。「払ってでも教わりたい」と言われた事実が全て。半年間の準備が報われた。', createdAt: '2026-04-11T09:30:00', helpfulCount: 28, isQuestion: false },
            { id: 'p802', memberId: 'w-fs02', memberNickname: 'ケイタ', memberBadge: 'tabi', content: '英語が体に染み込みすぎて言語化できない。ネイティブスピーカーが一番教えるのが難しいって本当だった。', createdAt: '2026-04-10T22:00:00', helpfulCount: 15, isQuestion: false },
            { id: 'p803', memberId: 'w-fs01', memberNickname: 'ノリコ', memberBadge: 'tabi', content: '体験レッスンの最初10分は絶対に相手の話を聞く時間にしてる。「この先生わかってる」と感じさせないと離脱する。教えるのは後半でいい。', createdAt: '2026-04-11T11:00:00', helpfulCount: 11, isQuestion: false },
            { id: 'p804', memberId: 'w-fs03', memberNickname: 'ルミ', memberBadge: 'aruki', content: '需要を調べる前に発信してみたら反応があった。Twitterで発音の投稿したら想定外のいいね数。市場調査より先に動く、という順番のほうが早かった。', createdAt: '2026-04-11T13:00:00', helpfulCount: 7, isQuestion: false },
            { id: 'p805', memberId: 'w-fs04', memberNickname: 'マサキ', memberBadge: 'michibiki', content: 'SNSで一番効いたのは「今日の生徒の気づき」を匿名投稿すること。実績ゼロでも生徒の声がコンテンツになる。', createdAt: '2026-04-09T20:00:00', helpfulCount: 14, isQuestion: false },
        ],
    },
];

// ============================================================
// LOCAL STORAGE HELPERS
// ============================================================

const NOREN_NICKNAME_KEY = 'noren-nickname';
const NOREN_GOAL_KEY = 'noren-goal';
const NOREN_TOKEN_KEY = 'noren-token';
const NOREN_WALKING_KEY = 'noren-walking';

export function getNorenNickname(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(NOREN_NICKNAME_KEY);
}

export function setNorenNickname(name: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(NOREN_NICKNAME_KEY, name);
    if (!localStorage.getItem(NOREN_TOKEN_KEY)) {
        localStorage.setItem(NOREN_TOKEN_KEY, crypto.randomUUID());
    }
}

export function getNorenGoal(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(NOREN_GOAL_KEY);
}

export function setNorenGoal(goal: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(NOREN_GOAL_KEY, goal);
}

export function getNorenToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(NOREN_TOKEN_KEY);
}

export function getWalkingNorens(): string[] {
    if (typeof window === 'undefined') return [];
    // Check both keys for backward compat with existing localStorage
    const raw = localStorage.getItem(NOREN_WALKING_KEY)
        || localStorage.getItem('noren-joined');
    return raw ? JSON.parse(raw) : [];
}

export function startWalking(norenId: string): void {
    if (typeof window === 'undefined') return;
    const walking = getWalkingNorens();
    if (!walking.includes(norenId)) {
        walking.push(norenId);
        localStorage.setItem(NOREN_WALKING_KEY, JSON.stringify(walking));
    }
}

export function stopWalking(norenId: string): void {
    if (typeof window === 'undefined') return;
    const walking = getWalkingNorens().filter(id => id !== norenId);
    localStorage.setItem(NOREN_WALKING_KEY, JSON.stringify(walking));
}

export function isWalking(norenId: string): boolean {
    return getWalkingNorens().includes(norenId);
}

// ============================================================
// PHASE 1: USER FOOTPRINTS (足跡を残す)
// ============================================================

const NOREN_FOOTPRINTS_KEY = 'noren-user-footprints';

export function addUserFootprint(norenId: string, footprint: {
    text: string;
    type: 'breakthrough' | 'struggle' | 'tip';
    milestoneStep: number;
    noteUrl?: string;
}): Footprint {
    const nickname = getNorenNickname() ?? 'anonymous';
    const token = getNorenToken() ?? 'unknown';
    const milestone = getUserMilestone(norenId);
    const badge = calculateUserBadge(norenId);

    const newFootprint: Footprint = {
        id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        walkerId: token,
        nickname,
        badge,
        milestoneStep: footprint.milestoneStep,
        text: footprint.text,
        date: new Date().toISOString().split('T')[0],
        thanksCount: 0,
        type: footprint.type,
        ...(footprint.noteUrl ? { noteUrl: footprint.noteUrl } : {}),
    };

    const all = getAllUserFootprints();
    if (!all[norenId]) all[norenId] = [];
    all[norenId].push(newFootprint);

    if (typeof window !== 'undefined') {
        localStorage.setItem(NOREN_FOOTPRINTS_KEY, JSON.stringify(all));
    }

    return newFootprint;
}

export function getUserFootprints(norenId: string): Footprint[] {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(NOREN_FOOTPRINTS_KEY);
    if (!raw) return [];
    const all: Record<string, Footprint[]> = JSON.parse(raw);
    return all[norenId] ?? [];
}

export function getAllUserFootprints(): Record<string, Footprint[]> {
    if (typeof window === 'undefined') return {};
    const raw = localStorage.getItem(NOREN_FOOTPRINTS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
}

// ============================================================
// PHASE 1: MILESTONE PROGRESS (マイルストーン進捗)
// ============================================================

const NOREN_PROGRESS_KEY = 'noren-milestone-progress';

export function setUserMilestone(norenId: string, step: number): void {
    if (typeof window === 'undefined') return;
    const all = getAllMilestoneProgress();
    all[norenId] = step;
    localStorage.setItem(NOREN_PROGRESS_KEY, JSON.stringify(all));
}

export function getUserMilestone(norenId: string): number {
    if (typeof window === 'undefined') return 0;
    const raw = localStorage.getItem(NOREN_PROGRESS_KEY);
    if (!raw) return 0;
    const all: Record<string, number> = JSON.parse(raw);
    return all[norenId] ?? 0;
}

export function getAllMilestoneProgress(): Record<string, number> {
    if (typeof window === 'undefined') return {};
    const raw = localStorage.getItem(NOREN_PROGRESS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
}

// ============================================================
// PHASE 1: MERGED FOOTPRINTS (sample + user)
// ============================================================

export function getMergedFootprints(norenId: string): Footprint[] {
    const noren = SAMPLE_NORENS.find(n => n.id === norenId);
    const sampleFps = noren?.footprints ?? [];
    const userFps = getUserFootprints(norenId);
    return [...sampleFps, ...userFps].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
}

// ============================================================
// PHASE 1: USER BADGE CALCULATION
// ============================================================

export function calculateUserBadge(norenId: string): BadgeLevel {
    const footprints = getUserFootprints(norenId);
    const count = footprints.length;
    if (count >= 10) return 'michibiki';
    if (count >= 3) return 'tabi';
    return 'aruki';
}

// ============================================================
// STORY VIEW HELPERS
// ============================================================

/**
 * Groups footprints by ISO week (Monday start) and sorts each group
 * chronologically. Weeks are sorted newest first.
 */
export function getStoryWeeks(footprints: Footprint[]): StoryWeek[] {
    const weekMap = new Map<string, { weekLabel: string; startDate: string; footprints: Footprint[] }>();

    for (const fp of footprints) {
        const date = new Date(fp.date);
        // Shift so Monday = 0 instead of Sunday = 0
        const dayOfWeek = (date.getDay() + 6) % 7;
        const monday = new Date(date);
        monday.setDate(date.getDate() - dayOfWeek);
        const startDate = monday.toISOString().slice(0, 10);

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        const weekLabel = `${startDate} - ${sunday.toISOString().slice(0, 10)}`;

        if (!weekMap.has(startDate)) {
            weekMap.set(startDate, { weekLabel, startDate, footprints: [] });
        }
        weekMap.get(startDate)!.footprints.push(fp);
    }

    // Sort footprints within each week chronologically (oldest first)
    for (const week of weekMap.values()) {
        week.footprints.sort((a, b) => a.date.localeCompare(b.date));
    }

    // Sort weeks newest first
    return Array.from(weekMap.values()).sort((a, b) => b.startDate.localeCompare(a.startDate));
}

// Legacy aliases for backward compatibility
export const getJoinedNorens = getWalkingNorens;
export const joinNoren = startWalking;
export const leaveNoren = stopWalking;
export const hasJoinedNoren = isWalking;
