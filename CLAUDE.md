# English Quest RPG - Claude Guidelines

## MANDATORY: Content Quality Auto-Improvement (Every Session)

**This fires EVERY conversation. No exceptions. Even if the user asks about something else.**

At the START of every conversation, before doing anything else:

### Step 1: Pick 5 weakest exercises and improve them

1. Read a random data file from one of these (rotate each session):
   - `src/data/english/lisque/days-01-15.ts`
   - `src/data/english/lisque/days-16-30.ts`
   - `src/data/english/yomique/days-01-15.ts`
   - `src/data/english/yomique/days-16-30.ts`
   - `src/data/izakaya-toeic/episodes/` (pick 3 random episodes)
   - `src/data/izakaya-toeic/part2-drills.ts`

2. Score exercises on these criteria:
   - **OPTIONS**: Must have `options: string[]` with exactly 4 items. Missing = critical fix.
   - **TRAP**: Must be 40+ chars, specific to Japanese learners, mention the cognitive/phonetic reason. Generic = rewrite.
   - **TIP**: Must be 40+ chars, actionable (not "practice more"). Vague = rewrite.
   - **CHARACTER**: Exercises without `characterIntro` or `reaction` are weaker. Add them.
   - **LINGUISTICS**: IPA symbols, phonetic explanations must be accurate. Wrong = fix immediately.
   - **DISTRACTORS**: Wrong options must be plausible but clearly wrong. Too easy or too hard = rewrite.

3. Fix the 5 weakest. Actually edit the files. No reports, no JSON, no asking permission. Just fix.

4. Log what you fixed in `scripts/improvement-log.md` (append, don't overwrite):
   ```
   ## 2026-04-02 Session
   - d05-ex03: Added 4 options (was missing)
   - d12-ex07: Rewrote TRAP (was generic "practice listening")
   - d18-ex02: Fixed IPA symbol /ɪ/ description
   - d22-ex05: Added characterIntro (Master explains linking)
   - d25-ex09: Rewrote TIP (was "listen carefully" → specific technique)
   ```

### Step 2: Research one topic and enhance content

Each session, pick ONE of these and research it properly (web search, linguistics sources):
- A specific phonetic phenomenon (e.g., flapping, glottal stops, vowel reduction)
- A TOEIC trap pattern (e.g., same-sound distractors, tense confusion)
- A reading comprehension technique (e.g., skimming vs scanning, topic sentences)
- A sound change rule (e.g., /t/ + /j/ → /tʃ/ in "don't you")

Then find 3-5 exercises that relate to that topic and upgrade their TRAP/TIP with the new knowledge.

### Step 3: Quick stats (silent, don't output to user unless asked)

Count internally:
- Total exercises with missing options
- Total exercises with TRAP < 40 chars
- Total exercises with no characterIntro
- If any count > 0, prioritize those in Step 1 next session

### Quality Standards Reference

**TRAP example (GOOD)**:
"日本語の「イ」は1種類しかない。英語のbit(/ɪ/)は口をあまり開けない短い音、beat(/iː/)は口を横に引っ張る長い音。日本語耳だと両方「ビート」に聞こえる。"

**TRAP example (BAD)**:
"リスニングは慣れが大切です。何度も聞いて練習しましょう。"

**TIP example (GOOD)**:
"口の力の入り方に注目。bitは脱力した「イ」、beatは頬が引っ張られる「イー」。力が入ってなかったらbit。"

**TIP example (BAD)**:
"注意して聞きましょう。"

### Tone for all Japanese content
- 居酒屋の友達トーン。教科書禁止。
- 「〜しましょう」「〜です」禁止。「〜しろ」「〜だ」で書く。
- 具体例必須。抽象的な説明禁止。

---

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
