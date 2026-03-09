# Pro System - Master Spec (Expression Teaching)

## CRITICAL: What Pro IS and IS NOT

**Pro = expression teaching with bilingual explanation.**
**Pro != narrative summary. Pro != monologue. Pro != story retelling.**

Each entry's `englishSummary` picks 4-6 expressions from the Memoria + Tangent conversations and teaches each one with casual English usage paragraphs and Japanese nuance paragraphs.

**Gold standard: Entry 130 (`pachinko-learning-entry.ts`)**. Read it before writing ANY Pro content.

---

## Pro vs Memoria (MANDATORY distinction)

| | Pro (`englishSummary`) | Memoria (`conversationData`) |
|---|---|---|
| **Format** | Expression-teaching sections | Two-person conversation |
| **Content** | Bilingual explanation of expressions | Natural dialogue on journal topic |
| **Structure** | heading + 3 EN paragraphs + 3 JA paragraphs | speaker/text pairs |
| **Purpose** | Teach individual expressions with context | Conversation listening practice |
| **Heading** | `"Expression -- Japanese"` | N/A (dialogue lines) |
| **Voice** | Teacher-friend explaining expressions | Male/female characters talking |

**If your englishSummary reads like a story, article, or Memoria summary, it's WRONG. Rewrite it.**

---

## A. Section Format (Absolute Rules)

### TypeScript Structure

```typescript
englishSummary: {
    title: "{N} Expressions from the {Topic} Episode",
    readTime: number,
    sections: [
        {
            heading: "Expression -- Japanese translation",
            paragraphs: [string, string, string],        // EXACTLY 3
            japaneseParagraphs: [string, string, string]  // EXACTLY 3
        }
    ]
}
```

### Title Format

- MUST be: `"{N} Expressions from the {Topic} Episode"`
- Good: `"Six Expressions from the Pachinko Episode"`
- Bad: `"When English Hits You at the Register"` (narrative title)
- Bad: `"When Vercel Went Down"` (story title)

### Heading Format

- MUST be: `"English Expression -- Japanese, brief explanation"`
- The expression is the star. The `--` separator is mandatory. Japanese follows.
- Good: `"Double Down -- backreference, further commitment"`
- Good: `"The House Always Wins -- The house always wins"`
- Bad: `"The Six Words That Broke Me"` (narrative, no expression)
- Bad: `"Everything's a Surrender Game"` (topic description)
- Bad: `"The Deploy That Went Nowhere"` (story heading)
- Bad: `"What Got Translated"` (summary heading)
- Bad: `"Conclusion"` (essay heading)

### Paragraphs (English) -- EXACTLY 3 per section

1. **Paragraph 1**: Introduce the expression. Where it came from in the conversation. What it literally means. The image or metaphor behind it.
2. **Paragraph 2**: Broader usage. Example sentences in different contexts. When and how native speakers use it.
3. **Paragraph 3**: Related expressions, opposites, or how to combine with other phrases. Stack expressions together.

Style: casual, spoken English. Contractions, fillers, g-dropping. Like a friend explaining an expression at a bar, not a textbook.

### japaneseParagraphs (Japanese) -- EXACTLY 3 per section

- Match the 3 English paragraphs in topic (not literal translation)
- Izakaya-friend tone. Natural Japanese.
- Explain what Japanese speakers specifically need to know
- Include: cultural context, common mistakes, nuance that doesn't translate 1:1
- NOT translation-ese. NOT textbook Japanese.

---

## B. Expression Selection Rules

### Where to find expressions

- Draw from BOTH the Memoria conversation AND the Tangent conversation
- Each conversation should contribute at least 1-2 expressions
- 4-6 expressions per entry (4-6 sections total)

### What makes a good expression

- Actually useful in daily English
- Has nuance that Japanese speakers would miss
- Appeared naturally in one of the conversations
- Interesting enough to teach (not just basic vocab)
- Has related expressions or opposites worth mentioning

### What to AVOID

- Expressions so basic they don't need teaching (hello, thank you, sorry)
- Expressions that only work in the specific journal context
- Overly obscure idioms nobody actually uses
- Expressions already covered in recent entries

---

## C. Spoken English Rules (for paragraphs)

Apply these to BOTH English paragraphs and any English examples:

- **Contractions always**: I'm, don't, can't, wouldn't, gonna, wanna, gotta, kinda, sorta
- **Fillers naturally**: "like", "honestly", "I mean", "you know", "right?"
- **Fragment sentences OK**: "Such a pain." "No way." "Totally worth it."
- **Casual connectors**: "so", "and then", "but like", "anyway"
- **g-dropping**: "thinkin'", "runnin'", "workin'", "nothin'"
- **First-person**: "I", direct address ("you know?", "right?")
- **Casual pronunciation**: "'cause" (because), "'em" (them), "lemme", "gimme"

### What to AVOID in paragraphs

- Formal/academic sentence structure
- Passive voice ("It was discovered that...")
- Essay transitions ("Furthermore," "In conclusion,")
- Textbook-sounding English ("One might argue that...")

---

## D. Red Flags (WRONG format -- rewrite immediately)

### Structural red flags

- Heading without `--` separator
- Heading that describes a story beat instead of naming an expression
- Missing `japaneseParagraphs`
- Paragraph count != 3
- Title that reads like a story/article title instead of "{N} Expressions from..."

### Content red flags

- Paragraphs that narrate the journal entry instead of teaching an expression
- No expression being explicitly named and taught in a section
- Content that overlaps with what Memoria already covers (conversation summary)
- japaneseParagraphs that are literal translations of English paragraphs

### Quick test

Ask yourself: "If I removed the Memoria, would Pro still make sense as a standalone expression lesson?" If yes, it's correct. If it depends on reading the journal story first, it's wrong.

---

## E. Before/After Examples

### Section heading

**BEFORE (narrative - WRONG)**:
```
heading: "The Six Words That Broke Me"
```

**AFTER (expression - CORRECT)**:
```
heading: "Freeze (Up) -- fixed, unresponsive"
```

### Paragraph content

**BEFORE (story retelling - WRONG)**:
> "So I'm standin' at FamilyMart, right? Same store I go to every day. The guy at the register goes, 'Hey, you dropped something.' And my brain just... quit."

**AFTER (expression teaching - CORRECT)**:
> "'I froze.' Simple, devastating, and every English speaker knows exactly what you mean. In the Memoria, he's at FamilyMart and someone speaks English -- and his brain just stops. That's a freeze. Not cold-temperature freeze. Brain-won't-work freeze."

### Title

**BEFORE (narrative - WRONG)**:
```
title: "When English Hits You at the Register -- And Your Brain Just Quits"
```

**AFTER (expression-focused - CORRECT)**:
```
title: "Five Expressions from the Convenience Store Episode"
```

---

## F. ConversationData Guidelines

### CRITICAL: Read `docs/memoria-speech-spec.md` FIRST

The surface rules below (contractions, fillers, g-dropping) are NECESSARY but NOT SUFFICIENT.
All conversationData MUST also pass the 7 structural rules in `docs/memoria-speech-spec.md`:

1. **Information density**: 60%+ function words per utterance
2. **Cognitive markers**: um/uh/false starts every 5-8 lines
3. **Clause chains**: 30%+ of utterances with 4+ adhesive connectors
4. **g-dropping variability**: 70-80%, not 100%
5. **Turn length variation**: 20%+ short (1-5 words), 20%+ long (50+ words)
6. **Repetition**: Key points stated 2-3 times with variation
7. **Cross-turn building**: 20%+ turns reference previous speaker

If dialogue reads like a Q&A interview with decorated grammar, it FAILS. Rewrite.

### Voice Distinction
- **Male** = the author's voice: casual, philosophical, data-heavy, occasional dark humor
  - Longer turns with more clause chains (he's telling the story)
  - More cognitive markers when tackling complex ideas
- **Female** = thoughtful listener: pushes back, asks good questions, calls out BS
  - More short turns: "Wait, what?", "No way.", "That's actually smart."
  - Echoes and rephrases the male's points before adding her own
  - Should NOT just ask questions -- she reacts, challenges, extends

### Japanese Side
- Should match the English conversation in meaning (not literal translation)
- Use natural Japanese, not translation-ese
- Match the tone (if English is playful, Japanese should be too)

---

## G. Generation Workflow

### Step-by-step for Pro (`englishSummary`):

1. **Read the Memoria and Tangent conversations**
   - Identify interesting expressions, idioms, phrasal verbs, cultural phrases
   - Note expressions that have nuance a Japanese learner would miss

2. **Select 4-6 expressions**
   - Mix from Memoria and Tangent
   - Prioritize: useful > interesting > obscure
   - Check they haven't been covered in recent entries

3. **For each expression, write ONE section**
   - Heading: `"Expression -- Japanese"`
   - 3 English paragraphs: introduce, expand, connect
   - 3 Japanese paragraphs: nuance, context, tips

4. **Set metadata**
   - Title: `"{N} Expressions from the {Topic} Episode"`
   - readTime: roughly 1 min per section

5. **Quality check** (see Section H)

---

## H. Quality Checklist

### Pro (`englishSummary`)

- [ ] Title follows `"{N} Expressions from..."` format?
- [ ] Every heading has `--` separator with Japanese?
- [ ] Every section has EXACTLY 3 paragraphs?
- [ ] Every section has EXACTLY 3 japaneseParagraphs?
- [ ] Each section teaches ONE specific expression?
- [ ] Paragraphs use casual spoken English (contractions, fillers)?
- [ ] japaneseParagraphs use natural Japanese (not translation-ese)?
- [ ] Expressions drawn from both Memoria AND Tangent?
- [ ] Content teaches the expression, not retells the journal story?

### ConversationData red flags (see `docs/memoria-speech-spec.md`):
- 8+ consecutive dialogue lines with zero "um", "uh", or false starts
- Every turn is 20-40 words (uniform length = written, not spoken)
- Every -ing word has the g dropped (should be 70-80%)
- Speaker states key opinion once and moves on (should restate 2-3x)
- Both speakers have equal total word counts (host should be shorter)
- Dialogue reads like a Q&A interview, not overlapping conversation

---

## I. When to Create English Versions

### Rule: ALL entries get `englishSummary`

Every journal entry must have Pro content (expression teaching). No exceptions.

### Rule: ALL entries get `conversationData`

Every journal entry MUST have `conversationData` (male/female dialogue for Memoria page). No exceptions.

---

## J. File Locations

| File | Purpose |
|------|---------|
| `docs/english-journal-spec.md` | This file (master spec) |
| `src/data/journal/types.ts` | TypeScript types (EnglishSummary, SummarySection) |
| `src/data/journal/2026/*.ts` | Individual journal entries |
| `src/data/journal/2026/01-january.ts` | January month file (imports/exports) |
| `src/data/journal/2026/02-february.ts` | February month file (imports/exports) |
| `src/data/journal/2026/03-march.ts` | March month file (imports/exports) |
| `src/app/english/journal/[id]/page.tsx` | English journal player page |

---

## K. Progress Tracker

### Entries with correct expression-teaching format:

| ID | File | Status |
|----|------|--------|
| 130 | pachinko-learning-entry.ts | Gold standard |
| 131 | productive-despair-entry.ts | Correct |
| 132 | convenience-store-panic-entry.ts | Fixed (was narrative) |
| 133 | vercel-surrender-entry.ts | Fixed (was narrative) |

### Legacy entries (pre-130):

Existing englishSummary content is essay/podcast-style (pre-expression format). Upgrading to expression-teaching format is tracked separately.
