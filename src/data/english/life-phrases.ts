// Life Phrases -- 「俺の日本語を全部英語にする」プロダクトのコアデータ
// 日常生活のあらゆる場面をカバーする表現辞書
// context = 商品の核。なぜその英語がそう動くのか、居酒屋トーンで解説

export type LifeCategory =
  | 'work'        // 仕事 -- 上司、同僚、会議、残業、通勤
  | 'food'        // 食事 -- 料理、外食、コンビニ、酒
  | 'money'       // 金 -- 給料、節約、無駄遣い、支払い
  | 'health'      // 体調 -- 疲れ、病気、睡眠、運動
  | 'weather'     // 天気 -- 暑い、寒い、雨、季節
  | 'family'      // 家族 -- 親、子供、夫婦、実家
  | 'love'        // 恋愛 -- 出会い、デート、喧嘩、別れ
  | 'friends'     // 友達 -- 飲み会、約束、愚痴、再会
  | 'hobbies'     // 趣味 -- ゲーム、映画、音楽、スポーツ
  | 'emotions'    // 感情 -- 嬉しい、悲しい、怒り、不安
  | 'shopping'    // 買い物 -- ネット通販、セール、衝動買い
  | 'home'        // 住居 -- 掃除、引越し、近所、修理
  | 'transport'   // 移動 -- 電車、車、渋滞、旅行
  | 'tech'        // テクノロジー -- スマホ、SNS、Wi-Fi
  | 'time'        // 時間 -- 朝、夜、締切、週末
  | 'school'      // 学校 -- 勉強、試験、先生、同級生
  | 'appearance'  // 外見 -- 服、髪、体型、老化
  | 'society'     // 社会 -- ニュース、政治、マナー、常識
  | 'life-events' // 人生 -- 就職、結婚、引退、老い
  | 'inner-voice' // 内面 -- 独り言、自己ツッコミ、葛藤、決意

export interface LifePhrase {
  id: string;
  japanese: string;
  english: [string, string, string, string];
  literal?: string;
  context: string;
  category: LifeCategory;
  subcategory?: string;
  situation?: string;
}

// Category metadata for UI
export const CATEGORY_META: Record<LifeCategory, { label: string; labelEn: string; icon: string; color: string; bg: string }> = {
  work:        { label: '仕事',   labelEn: 'Work',       icon: 'Briefcase',   color: '#92400E', bg: '#FEF3C7' },
  food:        { label: '食事',   labelEn: 'Food',       icon: 'UtensilsCrossed', color: '#DC2626', bg: '#FEE2E2' },
  money:       { label: '金',     labelEn: 'Money',      icon: 'Wallet',      color: '#B45309', bg: '#FEF3C7' },
  health:      { label: '体調',   labelEn: 'Health',     icon: 'Heart',       color: '#059669', bg: '#D1FAE5' },
  weather:     { label: '天気',   labelEn: 'Weather',    icon: 'Cloud',       color: '#2563EB', bg: '#DBEAFE' },
  family:      { label: '家族',   labelEn: 'Family',     icon: 'Users',       color: '#7C3AED', bg: '#EDE9FE' },
  love:        { label: '恋愛',   labelEn: 'Love',       icon: 'HeartHandshake', color: '#DB2777', bg: '#FCE7F3' },
  friends:     { label: '友達',   labelEn: 'Friends',    icon: 'Beer',        color: '#D97706', bg: '#FEF3C7' },
  hobbies:     { label: '趣味',   labelEn: 'Hobbies',    icon: 'Gamepad2',    color: '#4F46E5', bg: '#E0E7FF' },
  emotions:    { label: '感情',   labelEn: 'Emotions',   icon: 'Flame',       color: '#E11D48', bg: '#FFE4E6' },
  shopping:    { label: '買い物', labelEn: 'Shopping',   icon: 'ShoppingBag', color: '#0891B2', bg: '#CFFAFE' },
  home:        { label: '住居',   labelEn: 'Home',       icon: 'Home',        color: '#65A30D', bg: '#ECFCCB' },
  transport:   { label: '移動',   labelEn: 'Transport',  icon: 'Train',       color: '#0284C7', bg: '#E0F2FE' },
  tech:        { label: 'テクノロジー', labelEn: 'Tech', icon: 'Smartphone',  color: '#6366F1', bg: '#E0E7FF' },
  time:        { label: '時間',   labelEn: 'Time',       icon: 'Clock',       color: '#78716C', bg: '#F5F5F4' },
  school:      { label: '学校',   labelEn: 'School',     icon: 'GraduationCap', color: '#0D9488', bg: '#CCFBF1' },
  appearance:  { label: '外見',   labelEn: 'Looks',      icon: 'Shirt',       color: '#A855F7', bg: '#F3E8FF' },
  society:     { label: '社会',   labelEn: 'Society',    icon: 'Newspaper',   color: '#64748B', bg: '#F1F5F9' },
  'life-events': { label: '人生', labelEn: 'Life',       icon: 'Milestone',   color: '#CA8A04', bg: '#FEF9C3' },
  'inner-voice': { label: '内面', labelEn: 'Inner Voice', icon: 'Brain',      color: '#475569', bg: '#F1F5F9' },
};

// ============================================================
// IMPORTS
// ============================================================
import { workPhrases } from './life-phrases-work';
import { foodPhrases } from './life-phrases-food';
import { moneyPhrases } from './life-phrases-money';
import { healthPhrases } from './life-phrases-health';
import { weatherPhrases } from './life-phrases-weather';
import { familyPhrases } from './life-phrases-family';
import { lovePhrases } from './life-phrases-love';
import { friendsPhrases } from './life-phrases-friends';
import { hobbiesPhrases } from './life-phrases-hobbies';
import { emotionsPhrases } from './life-phrases-emotions';
import { shoppingPhrases } from './life-phrases-shopping';
import { homePhrases } from './life-phrases-home';
import { transportPhrases } from './life-phrases-transport';
import { techPhrases } from './life-phrases-tech';
import { timePhrases } from './life-phrases-time';
import { schoolPhrases } from './life-phrases-school';
import { societyPhrases } from './life-phrases-society';
import { appearancePhrases } from './life-phrases-appearance';
import { innerVoicePhrases } from './life-phrases-inner-voice';
import { lifeEventsPhrases } from './life-phrases-life-events';

// ============================================================
// LIFE PHRASES DATABASE
// ============================================================
export const LIFE_PHRASES: LifePhrase[] = [
  ...workPhrases,
  ...foodPhrases,
  ...moneyPhrases,
  ...healthPhrases,
  ...weatherPhrases,
  ...familyPhrases,
  ...lovePhrases,
  ...friendsPhrases,
  ...hobbiesPhrases,
  ...emotionsPhrases,
  ...shoppingPhrases,
  ...homePhrases,
  ...transportPhrases,
  ...techPhrases,
  ...timePhrases,
  ...schoolPhrases,
  ...societyPhrases,
  ...appearancePhrases,
  ...innerVoicePhrases,
  ...lifeEventsPhrases,
];
