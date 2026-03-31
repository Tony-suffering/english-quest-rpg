/**
 * Creator Voice — とにおの魂をアプリに埋め込む
 *
 * noteから来るユーザーにnote記事を見せても意味がない。
 * 代わりに、アプリ自体が作者の声で語りかける。
 * TOEIC 900、喋れない、毎日更新中。その人間がここにいる。
 */

// ── Streak Commentary ──
// Based on current streak, return a creator-voice message

const STREAK_LINES: { min: number; max: number; lines: string[] }[] = [
  { min: 0, max: 0, lines: [
    'ストリーク0日。俺もTOEIC 900なのに喋れないから大丈夫。一緒に始めよう。',
    '今日が1日目になる。俺はもう毎日コード書いてる。次はお前の番。',
    'まだ0日。でも開いた時点で偉い。俺なんて3年ためらってからやっと始めた。',
  ]},
  { min: 1, max: 1, lines: [
    '1日目。全ての連続記録はここから始まった。',
    'ようこそ1日目。俺がこのアプリ作り始めた日もこんな感じだった。',
  ]},
  { min: 2, max: 4, lines: [
    '続いてるじゃん。この調子。',
    '地味に続いてる。これが一番強い。',
    'まだ序盤。でも「続いてる」って事実がでかい。',
  ]},
  { min: 5, max: 9, lines: [
    'もう{n}日。習慣になりかけてる。ここが分かれ道。',
    '{n}日連続。俺がnote毎日書き始めた頃と同じペース。',
    '1週間が見えてきた。俺は見えてから崩れるタイプだった。お前は違うと信じてる。',
  ]},
  { min: 10, max: 29, lines: [
    '{n}日。もう「たまたま」じゃない。これはお前の実力。',
    '{n}日連続って、俺がアプリの最初のバージョン作るのにかかった日数より長い。',
    'すごいな{n}日。正直に言う、俺は{n}日連続で英語の勉強したことない。コード書くのは別だけど。',
  ]},
  { min: 30, max: 59, lines: [
    '{n}日。1ヶ月超えた。お前、もう俺より偉い。',
    '{n}日連続。これはもう才能じゃなくて性格。最強のやつ。',
  ]},
  { min: 60, max: 99, lines: [
    '{n}日。もはや生活の一部。歯磨きと同じレベル。',
    '{n}日連続とか、俺のnote連続更新記録に追いつきそうなんだが。',
  ]},
  { min: 100, max: Infinity, lines: [
    '{n}日。伝説。お前のことnoteに書いていい？',
    '{n}日連続。もうお前がアプリ作る側になれ。',
    '{n}日。俺が毎日コード書くのと、お前が毎日英語やるの、同じ執念だと思う。',
  ]},
];

export function getStreakComment(streak: number): string {
  const bucket = STREAK_LINES.find(b => streak >= b.min && streak <= b.max);
  if (!bucket) return '';
  const line = bucket.lines[Math.floor(Math.random() * bucket.lines.length)];
  return line.replace(/\{n\}/g, String(streak));
}

// ── Dashboard Commentary ──
// Based on total progress, add creator personality

export function getDashboardComment(stats: {
  totalActions: number;
  streak: number;
  level: number;
  mastered: number;
  days: number;
}): string {
  const { totalActions, streak, level, mastered, days } = stats;

  if (totalActions === 0) {
    return 'まだ何もない。でもここを開いた。それが最初のアクション。俺もそうだった。';
  }
  if (totalActions < 10) {
    return '始まったばかり。俺がこのアプリ作り始めた時も、最初の10行のコードはゴミだった。でもそこから全部始まった。';
  }
  if (streak >= 30 && mastered >= 50) {
    return `${mastered}個マスターで${streak}日連続。お前、俺よりちゃんと英語やってる。作者として複雑な気持ち。`;
  }
  if (level >= 5) {
    return `Lv.${level}。レベルが上がると嬉しいだろ？俺もユーザーのレベルが上がると嬉しい。同じ気持ちだ。`;
  }
  if (days >= 7) {
    return `${days}日アクティブ。「毎日やる」と「ちょこちょこやる」は全然違う。お前は前者っぽい。`;
  }
  if (mastered >= 10) {
    return `${mastered}個マスター。数字だけ見ると地味だけど、${mastered}個の英語が脳に染み込んでるってこと。`;
  }

  return '積み上げてるな。俺も毎日コード書いてアプリ作ってる。お互い続けよう。';
}

// ── Mission Complete Commentary ──
// When a day is fully cleared

export function getMissionCompleteComment(dayNumber: number, streak: number): string {
  const lines = [
    'お疲れ。また明日。',
    '完璧。こういう日が積み重なって、気づいたら喋れるようになる。はず。俺はまだだけど。',
    `Day ${dayNumber}クリア。俺がこの日のコンテンツ作るのに何時間かかったか知ってるか？お前は数分で吸収した。悔しい。`,
    '全部マスター。俺もTOEICの勉強してた時、こういう達成感が次の日のモチベになってた。',
    'クリア。次の日はもっと面白いフレーズ入れといた。たぶん。',
  ];

  if (streak >= 7) {
    lines.push(`${streak}日連続でクリアし続けてるのか。お前のこと記事に書きたい。マジで。`);
  }

  return lines[Math.floor(Math.random() * lines.length)];
}

// ── Empty State Messages ──
// When lists are empty or nothing is selected

export function getEmptyStateMessage(context: 'training' | 'calendar' | 'general'): string {
  const messages: Record<string, string[]> = {
    training: [
      'まだ何も登録してない。英会話マスター365で気になったフレーズを登録してみて。',
      '空っぽ。でもそれは「これから全部自分で選べる」ってこと。',
    ],
    calendar: [
      'カレンダーから日付を選んで。毎日10フレーズ、1年で3650。俺が全部作った。',
    ],
    general: [
      'まだ何もない。でも大丈夫。俺だってTOEIC900取ってから英語喋れるまで何年もかかってる。まだかかってる。',
    ],
  };

  const pool = messages[context] || messages.general;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── Progress Milestone Lines ──
// For specific achievement thresholds

export function getMilestoneComment(type: 'mastered_10' | 'mastered_50' | 'mastered_100' | 'mastered_365' | 'level_up' | 'first_clear'): string {
  const lines: Record<string, string> = {
    mastered_10: '10個マスター。最初の10が一番きつい。ここからは加速する。',
    mastered_50: '50個。もうお前の脳内に50個の英語回路ができてる。',
    mastered_100: '100個マスター。3桁。100個の英語が口から出る準備ができてる。',
    mastered_365: '365個。1年分。お前、やりきった。俺はこのアプリ作るのに1年以上かかった。お互い1年組だ。',
    level_up: 'レベルアップ。数字が上がるの、気持ちいいだろ。俺もそう思って作った。',
    first_clear: '初クリア。ここから始まる。俺の英語人生もTOEIC受けた日から始まった。点数は取れた。喋れないけど。',
  };
  return lines[type] || '';
}

// ── Creator Profile (for about section) ──
// Not a separate page, but can be shown inline as a small card

export const CREATOR_PROFILE = {
  tagline: 'TOEIC 900、喋れない、毎日更新中',
  description: '英語のテストは解ける。リスニングもできる。でも目の前のネイティブに一言も返せない。その悔しさでこのアプリを1人で作ってる。',
  noteUrl: 'https://note.com/tonio_english',
} as const;
