// 居酒屋TOEIC -- Shared Light Theme (matches iwasaki-naisou main site)

export const T = {
  bg: '#FAFAF9',
  bgSecondary: '#F5F5F4',
  surface: '#FFFFFF',
  surfaceHover: '#F5F5F4',
  gold: '#D4AF37',
  goldLight: '#FDE68A',
  goldBg: 'rgba(212,175,55,0.08)',
  goldBorder: 'rgba(212,175,55,0.2)',
  goldGlow: '0 0 20px rgba(212,175,55,0.15)',
  green: '#10B981',
  greenBg: 'rgba(16,185,129,0.08)',
  blue: '#3B82F6',
  purple: '#8B5CF6',
  red: '#EF4444',
  orange: '#F97316',
  pink: '#EC4899',
  text: '#1C1917',
  textSub: '#57534E',
  textMuted: '#A8A29E',
  border: '#E7E5E4',
  borderLight: '#F5F5F4',
  shadow: '0 2px 8px rgba(0,0,0,0.04)',
  shadowMd: '0 4px 16px rgba(0,0,0,0.06)',
};

export const PART_COLORS: Record<number, string> = {
  1: '#10B981', 2: '#D4AF37', 3: '#3B82F6', 4: '#8B5CF6',
  5: '#EC4899', 6: '#F97316', 7: '#EF4444',
};

export const PART_LABELS: Record<number, string> = {
  1: 'Part 1', 2: 'Part 2', 3: 'Part 3', 4: 'Part 4',
  5: 'Part 5', 6: 'Part 6', 7: 'Part 7',
};

// Parse "M: text\nW: text" format into individual lines
export interface ConversationLine {
  speaker: 'M' | 'W' | 'M1' | 'M2' | 'W1' | 'W2' | string;
  speakerLabel: string;
  text: string;
  gender: 'male' | 'female';
}

export function parseConversation(script: string): ConversationLine[] {
  if (!script) return [];
  const lines = script.split('\n').filter(Boolean);
  return lines.map(line => {
    const match = line.match(/^([MW]\d?):\s*(.+)$/);
    if (match) {
      const speaker = match[1];
      const gender: 'male' | 'female' = speaker.startsWith('M') ? 'male' : 'female';
      const label = gender === 'male' ? 'Man' : 'Woman';
      return { speaker, speakerLabel: label, text: match[2].trim(), gender };
    }
    return { speaker: '?', speakerLabel: 'Speaker', text: line.trim(), gender: 'male' as const };
  });
}

// Check if an audioScript is a multi-line conversation (Part 3/4)
export function isConversation(script: string | undefined): boolean {
  if (!script) return false;
  return /^[MW]\d?:\s/.test(script) && script.includes('\n');
}
