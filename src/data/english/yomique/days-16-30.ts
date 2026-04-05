import type { YomiqueDay } from '@/types/yomique';

// ═══════════════════════════════════════════════════════════
// ヨミクエ Days 16-30
// Phase 2 (Days 16-20): 文章を読む -- Passage Reading
// Phase 3 (Days 21-30): 実践リーディング -- Real-World Reading
// 150 exercises total, 10 per day
// Will be expanded via auto-improvement cycle
// ═══════════════════════════════════════════════════════════

export const YOMIQUE_DAYS_16_30: YomiqueDay[] = [
  ...[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map(day => ({
    day,
    phase: (day <= 20 ? 2 : 3) as 2 | 3,
    theme: day === 16 ? '時制で時間軸を把握する' :
           day === 17 ? '比較表現を読む' :
           day === 18 ? '否定・条件文を正確に読む' :
           day === 19 ? '長文の要約力' :
           day === 20 ? 'Phase 2総復習 -- メールを書いて返す' :
           day === 21 ? '旅行ガイドを読む' :
           day === 22 ? 'ニュース記事を読む' :
           day === 23 ? 'レビュー・口コミを読む' :
           day === 24 ? '取扱説明書を読む' :
           day === 25 ? '求人情報を読む' :
           day === 26 ? 'ビジネスメールの攻略' :
           day === 27 ? '仕様書を読む' :
           day === 28 ? '契約書の読み方 -- 初級' :
           day === 29 ? '契約書の読み方 -- 実践' :
           '最終テスト -- 契約書を読んでサインする',
    themeEn: day === 16 ? 'Tense = Timeline' :
             day === 17 ? 'Comparisons' :
             day === 18 ? 'Negation & Conditionals' :
             day === 19 ? 'Summarizing Longer Texts' :
             day === 20 ? 'Phase 2 Review: Reply to an Email' :
             day === 21 ? 'Travel Guides' :
             day === 22 ? 'News Articles' :
             day === 23 ? 'Reviews & Comments' :
             day === 24 ? 'Instruction Manuals' :
             day === 25 ? 'Job Listings' :
             day === 26 ? 'Business Email Mastery' :
             day === 27 ? 'Specifications' :
             day === 28 ? 'Basic Contract Reading' :
             day === 29 ? 'Contract Reading: Practice' :
             'Final: Read and Sign the Contract',
    hook: day === 30 ? 'ケンジ、30日前のお前はOPENとCLOSEDから始めた。今日、契約書にサインする。' :
          '読めない原因を1つずつ潰していく。今日も1歩前進。',
    rule: day === 30 ? '30日間で看板からメニュー、メール、仕様書、そして契約書まで読めるようになった。これが「読める脳」。単語力じゃない。構造を見抜く力だ。' :
          '英語の文章には必ず構造がある。構造を見抜けば、どんな文も読める。',
    exercises: Array.from({ length: 10 }, (_, i) => ({
      id: `y${String(day).padStart(2,'0')}-ex${String(i+1).padStart(2,'0')}`,
      type: (['scan','main_idea','vocabulary','truefalse','inference','order','scan','vocabulary','main_idea','inference'] as const)[i],
      passage: { text: `[Day ${day} Exercise ${i+1} - Content generating in next improvement cycle]`, sourceType: day >= 28 ? 'Contract' : day >= 25 ? 'Business Document' : 'Notice', wordCount: day >= 21 ? 50 : 30 },
      question: `Day ${day}の問題${i+1}`,
      options: ['選択肢A', '選択肢B', '選択肢C', '選択肢D'],
      answer: '選択肢A',
      jaTranslation: `Day ${day}の問題${i+1}の日本語訳`,
      trap: `Day ${day}のTRAP - 次の改善サイクルで本番コンテンツに置き換え予定`,
      tip: `Day ${day}のTIP - 次の改善サイクルで本番コンテンツに置き換え予定`,
      difficulty: (i < 3 ? 'beginner' : i < 7 ? 'growing' : 'challenge') as 'beginner' | 'growing' | 'challenge',
    })),
  })),
];
