// 俺の英語エラー帳 — とにおの繰り返し文法ミスの蓄積ログ
// 英会話/英作文でミスが出るたびに追記する。本人が見返して復習する用。
// (Claude側の参照は memory/english-errors-log.md、こっちは本人が見る表)

export interface Mistake {
    id: string;
    date: string;        // YYYY-MM-DD
    said: string;        // 言った/書いた
    fix: string;         // 直し
    patternKey: string;  // 集計キー
    pattern: string;     // パターン解説
    context?: string;    // どこで出たか
}

// パターン名(集計表示用)
export const PATTERN_LABELS: Record<string, string> = {
    article: '冠詞 the の過剰',
    'third-s': '三単現の -s 落ち',
    appreciate: 'appreciate の誤用',
    make: '使役 make 抜け',
    'noun-adj': '名詞/形容詞の取り違え',
    'aux-base': '助動詞+原形に have',
    uncountable: '不可算の複数化',
    'extra-to': '余分な to / to の不足',
    ramble: 'ランブル(長すぎ/言い切れない)',
    'word-choice': '語の取り違え',
    other: 'その他',
};

export const MISTAKES: Mistake[] = [
    { id: 'm-001', date: '2026-06-07', context: 'DMM会話 ChopValue回', said: "I was really appreciated / I'm appreciating that", fix: "I really appreciated it.", patternKey: 'appreciate', pattern: 'appreciateは他動詞・目的語it・過去形。受動/進行はダメ' },
    { id: 'm-002', date: '2026-06-07', context: 'DMM会話 ChopValue回', said: "I don't have pay much attention", fix: "I don't pay much attention", patternKey: 'aux-base', pattern: '助動詞+原形に have を挟むな' },
    { id: 'm-003', date: '2026-06-07', context: 'DMM会話 ChopValue回', said: "I want to this monologue useful", fix: "I want to make this monologue useful", patternKey: 'make', pattern: '使役の make 抜け' },
    { id: 'm-004', date: '2026-06-07', context: 'DMM会話 ChopValue回', said: "this part kind of irony", fix: "this part is kind of ironic", patternKey: 'noun-adj', pattern: 'irony=名詞 / ironic=形容詞。be動詞も抜けた' },
    { id: 'm-005', date: '2026-06-07', context: 'DMM会話 ChopValue回', said: "ChopValue collect / China ignore", fix: "collects / ignores", patternKey: 'third-s', pattern: '三単現の -s' },
    { id: 'm-006', date: '2026-06-07', context: 'DMM会話 ChopValue回', said: "ignore the morality / pay attention to the morality side", fix: "ignore morality", patternKey: 'article', pattern: '抽象・総称名詞に the を付けない' },
    { id: 'm-007', date: '2026-06-07', context: 'DMM会話 ChopValue回', said: "no such things as internet", fix: "no such thing as the internet", patternKey: 'uncountable', pattern: '不可算の複数化' },
    { id: 'm-008', date: '2026-06-07', context: 'DMM会話 ChopValue回', said: "trying to the same stuff", fix: "trying the same thing", patternKey: 'extra-to', pattern: '余分な to' },
    { id: 'm-009', date: '2026-06-06', context: 'v6 反射トレ指摘', said: "I have so many works", fix: "I have so much work", patternKey: 'uncountable', pattern: 'work は不可算。many works は誤り' },
    { id: 'm-010', date: '2026-06-07', context: 'DMM 自己紹介回(Mark)', said: "casually enjoying English contents", fix: "enjoying English content", patternKey: 'uncountable', pattern: 'content は不可算。contents は「目次・中身一覧」の別語。これで不可算ミス3度目(work/work/content)。最頻出。' },
    { id: 'm-011', date: '2026-06-07', context: 'DMM 自己紹介回(Mark)', said: "jobs that requires English", fix: "jobs that require English", patternKey: 'third-s', pattern: '先行詞 jobs は複数→関係詞内も require。三単現を逆に付けた。主語との一致を見る。' },
    { id: 'm-012', date: '2026-06-07', context: 'DMM 自己紹介回(Mark)', said: "I didn't have a energy", fix: "I didn't have the energy", patternKey: 'article', pattern: 'energy は不可算、a は付かない。the energy / any energy。冠詞ミス再発。' },
    { id: 'm-013', date: '2026-06-07', context: 'DMM 自己紹介回(Mark)', said: "I had to dug into the awning", fix: "I had to duck into the awning", patternKey: 'word-choice', pattern: 'duck into=さっと身をかがめて入る。dig の過去 dug と混同。to の後は原形 duck。' },
    { id: 'm-014', date: '2026-06-07', context: 'DMM 自己紹介回(Mark)', said: "(長い独白) ...I'm rambling, you know...", fix: "2〜3文で言い切る", patternKey: 'ramble', pattern: '最大の癖。中身は良いが1ターンが長すぎて、自分でも「rambling」と自覚してる。内容は削らず、2-3文のバイトサイズに切る練習。文法より先にこれ。' },
];
