export interface EverydayWordSeed {
    en: string;      // English word
    pron: string;    // Katakana pronunciation
    ja: string;      // Japanese meaning
    note: string;    // Usage context (short)
    why?: string;    // Why this word matters for Japanese learners (evidence/insight)
    cat: string;     // Category key
    day: number;     // day_slot (1-200)
}

// Category metadata for display
// Original topic-based categories (existing 5000 words use these)
// + New learner-centric categories for Quest/RPG content
export const WORD_CATEGORIES: Record<string, { label: string; labelEn: string; color: string; bg: string }> = {
    // ── Original categories (DO NOT REMOVE - used by days-006 through days-200) ──
    home:       { label: '家・住宅',       labelEn: 'Home',         color: '#8B5CF6', bg: '#F5F3FF' },
    kitchen:    { label: 'キッチン・料理', labelEn: 'Kitchen',      color: '#EA580C', bg: '#FFF7ED' },
    garden:     { label: '庭・アウトドア', labelEn: 'Garden',       color: '#16A34A', bg: '#F0FDF4' },
    baby:       { label: '育児・子育て',   labelEn: 'Parenting',    color: '#EC4899', bg: '#FDF2F8' },
    school:     { label: '学校・教育',     labelEn: 'School',       color: '#2563EB', bg: '#EFF6FF' },
    medical:    { label: '医療・健康',     labelEn: 'Medical',      color: '#DC2626', bg: '#FEF2F2' },
    car:        { label: '車・運転',       labelEn: 'Car',          color: '#4F46E5', bg: '#EEF2FF' },
    work:       { label: '仕事・オフィス', labelEn: 'Work',         color: '#64748B', bg: '#F8FAFC' },
    grocery:    { label: '買い物',         labelEn: 'Shopping',     color: '#D97706', bg: '#FFFBEB' },
    fashion:    { label: 'ファッション',   labelEn: 'Fashion',      color: '#A855F7', bg: '#FAF5FF' },
    travel:     { label: '旅行・移動',     labelEn: 'Travel',       color: '#0891B2', bg: '#ECFEFF' },
    restaurant: { label: '外食・レストラン', labelEn: 'Dining',     color: '#B45309', bg: '#FFFBEB' },
    pet:        { label: 'ペット・動物',   labelEn: 'Pets',         color: '#65A30D', bg: '#F7FEE7' },
    weather:    { label: '天気・自然',     labelEn: 'Nature',       color: '#0D9488', bg: '#F0FDFA' },
    legal:      { label: '法律・金融',     labelEn: 'Legal',        color: '#78716C', bg: '#FAFAF9' },
    diy:        { label: 'DIY・工具',      labelEn: 'DIY',          color: '#92400E', bg: '#FFFBEB' },
    sports:     { label: 'スポーツ',       labelEn: 'Sports',       color: '#059669', bg: '#ECFDF5' },
    tech:       { label: 'テクノロジー',   labelEn: 'Tech',         color: '#7C3AED', bg: '#F5F3FF' },
    beauty:     { label: '美容・衛生',     labelEn: 'Beauty',       color: '#DB2777', bg: '#FDF2F8' },
    social:     { label: '社交・人間関係', labelEn: 'Social',       color: '#E11D48', bg: '#FFF1F2' },
    // ── New learner-centric categories (days-001-020 new content) ──
    blind:     { label: '知ってるつもり',     labelEn: 'False Friends', color: '#DC2626', bg: '#FEF2F2' },
    katakana:  { label: 'カタカナの嘘',       labelEn: 'Katakana Trap', color: '#EA580C', bg: '#FFF7ED' },
    nogap:     { label: '日本語にない感覚',   labelEn: 'No JA Match',   color: '#8B5CF6', bg: '#F5F3FF' },
    glue:      { label: 'つなぎ言葉',         labelEn: 'Glue Words',    color: '#2563EB', bg: '#EFF6FF' },
    core:      { label: '超基本なのに',       labelEn: 'Core Blind',    color: '#D4AF37', bg: '#FFFBEB' },
    feel:      { label: '感情・感覚',         labelEn: 'Feelings',      color: '#EC4899', bg: '#FDF2F8' },
    daily:     { label: '毎日の動作',         labelEn: 'Daily Action',  color: '#16A34A', bg: '#F0FDF4' },
    think:     { label: '考える系',           labelEn: 'Thinking',      color: '#0891B2', bg: '#ECFEFF' },
    power:     { label: '万能ワード',         labelEn: 'Power Word',    color: '#7C3AED', bg: '#F5F3FF' },
};
