// 居酒屋TOEIC -- Amazon Affiliate Book Recommendations

export interface RecommendedBook {
  id: string;
  title: string;
  author: string;
  amazonUrl: string;
  coverImage?: string;
  category: 'listening' | 'grammar' | 'vocabulary' | 'practice' | 'strategy';
  targetScore: [number, number];
  relatedSkills: string[];
  description: string;
  masterComment: string;
}

export const RECOMMENDED_BOOKS: RecommendedBook[] = [
  {
    id: 'gold-listening',
    title: 'TOEIC L&R TEST 出る単特急 金のフレーズ',
    author: 'TEX加藤',
    amazonUrl: 'https://www.amazon.co.jp/dp/4023315680?tag=AFFILIATE_TAG',
    category: 'vocabulary',
    targetScore: [500, 900],
    relatedSkills: ['paraphrase-recognition', 'indirect-answers'],
    description: 'パラフレーズの元ネタになる単語が全部入ってる。居酒屋TOEICで「なぜ言い換えるか」を学んで、金フレで「何に言い換えるか」を覚える。最強の組み合わせ。',
    masterComment: 'これは持っとけ。俺が990取った時もこれだった。',
  },
  {
    id: 'listening-hacker',
    title: 'TOEIC(R) L&Rテスト 究極のゼミ Part 2&1',
    author: '早川幸治',
    amazonUrl: 'https://www.amazon.co.jp/dp/4757436688?tag=AFFILIATE_TAG',
    category: 'listening',
    targetScore: [400, 700],
    relatedSkills: ['indirect-answers', 'indirect-answers-intro', 'wh-questions', 'wh-vs-yesno', 'yes-no-traps', 'tag-questions', 'negative-questions'],
    description: '間接回答のパターンを大量に練習できる。居酒屋TOEICで「間接回答とは何か」を理解してから解くと、正答率が全然違う。',
    masterComment: 'ユキみたいに620から上を目指すなら、まずこれだ。',
  },
  {
    id: 'part3-4-master',
    title: 'TOEIC(R) L&Rテスト 究極のゼミ Part 3&4',
    author: '早川幸治',
    amazonUrl: 'https://www.amazon.co.jp/dp/4757436696?tag=AFFILIATE_TAG',
    category: 'listening',
    targetScore: [500, 800],
    relatedSkills: ['paraphrase-recognition', 'speaker-intent', 'three-person', 'opening-prediction', 'part4-prediction'],
    description: '会話問題とナレーション問題を徹底練習。居酒屋TOEICの常連キャラで「パラフレーズを体感」した後に解くと、音声が立体的に聞こえるようになる。',
    masterComment: 'Part 3が苦手なやつは、これとうちのエピソード6-15を交互にやれ。',
  },
  {
    id: 'official-10',
    title: 'TOEIC(R)テスト 公式問題集 10',
    author: 'ETS',
    amazonUrl: 'https://www.amazon.co.jp/dp/4906033709?tag=AFFILIATE_TAG',
    category: 'practice',
    targetScore: [400, 990],
    relatedSkills: ['part2-mock'],
    description: '本番に一番近い問題集。居酒屋TOEICでスキルを学んで、公式問題集で実力チェック。この順番が最も効率的。',
    masterComment: '最終試験前はこれ一択だ。他のは全部捨てろ。',
  },
  {
    id: 'silver-phrases',
    title: 'TOEIC L&R TEST 出る単特急 銀のフレーズ',
    author: 'TEX加藤',
    amazonUrl: 'https://www.amazon.co.jp/dp/4023316857?tag=AFFILIATE_TAG',
    category: 'vocabulary',
    targetScore: [300, 600],
    relatedSkills: ['indirect-answers-intro', 'wh-vs-yesno', 'verbatim-trap'],
    description: '基礎単語から始めたい人向け。ケンジさんみたいに480から600を目指すなら、まずこれで土台を作る。',
    masterComment: 'ケンジさんにはまずこれを渡した。背伸びするな。土台が大事だ。',
  },
  {
    id: 'grammar-express',
    title: '1駅1題 TOEIC L&R TEST 文法特急',
    author: '花田徹也',
    amazonUrl: 'https://www.amazon.co.jp/dp/4023318787?tag=AFFILIATE_TAG',
    category: 'grammar',
    targetScore: [400, 800],
    relatedSkills: [],
    description: 'Part 5-6の文法はこれ1冊で十分。居酒屋TOEICはリスニング特化だから、文法はこれに任せろ。',
    masterComment: 'リスニングはうちで。文法はこれに任せる。餅は餅屋だ。',
  },
];

/** Get books related to a specific skill */
export function getBooksForSkill(skill: string): RecommendedBook[] {
  // Exact skill match first
  const exact = RECOMMENDED_BOOKS.filter(b => b.relatedSkills.includes(skill));
  if (exact.length > 0) return exact;
  // Fallback: books with no specific skill restriction (general recommendations)
  return RECOMMENDED_BOOKS.filter(b => b.relatedSkills.length === 0);
}

/** Get books for a score range */
export function getBooksForScore(currentScore: number): RecommendedBook[] {
  return RECOMMENDED_BOOKS.filter(b =>
    currentScore >= b.targetScore[0] && currentScore <= b.targetScore[1]
  );
}
