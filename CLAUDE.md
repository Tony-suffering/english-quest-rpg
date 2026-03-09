# Iwasaki Naisou Website - Claude Guidelines

## MANDATORY: 俺語録 Auto-Curation (Every Session)

**This fires EVERY conversation. No exceptions.**

Throughout the conversation, collect the user's natural Japanese expressions and
prepare goroku entries. At the END of the conversation (or when the user asks),
present the curated expressions.

Rules:
- Read `docs/ore-goroku-spec.md` curation section before any goroku work
- Translate the PERSON, not the words. Find what a native would actually say
- Ultra-casual English: contractions, g-dropping, fillers
- Match the user's blunt/funny/sarcastic personality
- Skip 1:1 translations (うーん->hmm) -- only interesting gaps
- Each expression must map to one of the 10 speech patterns from Journal #115
- Present as a table at conversation end: Japanese | Pattern | English | Category

---

## Design Rules

### Color Scheme
- **Primary**: Gold (#D4AF37) - コルクじじい
- **Secondary**: Emerald/Green (#10B981) - AIタクミ
- **Background**: White, Stone-50, Stone-100
- **Text**: Stone-700, Stone-800, Stone-900

### Typography
- Clean, professional Japanese/English mix
- Tracking-wider for headers
- Font-medium for labels

### UI/UX Principles
- High-end, luxury aesthetic
- Minimalist design
- White space is important
- Subtle gradients (amber-50 to emerald-50)

## Absolute Rules

### NO EMOJIS
**Emojis are strictly forbidden in this codebase.**

Do not use:
- Emoji icons (e.g., 📺, 🖥️, 🎙️, ✨, 🌐, 👥, 💬, etc.)
- Emoji in UI labels, buttons, headers
- Emoji in comments or documentation
- Emoji in any user-facing text

Instead use:
- Text labels (e.g., "LIVE", "NEWS", "WEATHER")
- Lucide icons sparingly where absolutely necessary
- Typography and color to convey meaning

### Why?
- Professional, high-end appearance
- Consistent with site's luxury branding
- Better cross-platform rendering
- Cleaner, more refined UI/UX

## Component Guidelines

### CorkJijiiTV
- White background with gold/green accents
- Character avatars as small circles
- Clean segment labels (text only)
- Subtle animations
- No CRT effects or retro styling

### General Components
- Border-radius: rounded-xl or rounded-2xl
- Borders: border-stone-200
- Shadows: shadow-lg (subtle)
- Transitions: transition-all with sensible duration

## English Practice Mode

When triggered, translate user's Japanese to English and teach natural expressions.

### Format
1. **Direct Translation**: Translate the Japanese literally
2. **Native Version**: How a native speaker would actually say it
3. **Key Vocabulary**: Important words/phrases in a table
4. **Response**: Continue the conversation in English

### Example

**User says:** "今日めっちゃ疲れた。仕事やばかった。"

**Response:**

1) Direct: "I'm super tired today. Work was crazy."
2) Native: "I'm exhausted. Work was insane today."

| Japanese | English | Note |
|----------|---------|------|
| めっちゃ | super / really / so | casual |
| やばい | crazy / insane / intense | context-dependent |

3) Response: What happened at work? Was it busy, or did something stressful come up?

### Triggers
- User says "英語で", "英会話", "English mode"
- User says "英語練習" or "English practice"
- User writes Japanese after activating this mode

### Style Guidelines
- Direct translation shows structure, native version shows natural flow
- Vocabulary tables for slang, idioms, or tricky words
- Response keeps conversation going in English
- Explain nuance when Japanese doesn't map 1:1 to English
