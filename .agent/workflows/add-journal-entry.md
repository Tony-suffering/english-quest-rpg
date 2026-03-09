---
description: How to add a complete journal entry with all required components
---

# Adding a Complete Journal Entry

When adding a new journal entry, you MUST include all of the following components. No exceptions!

## Required Components

### 1. Basic Fields
- `id` - Unique entry number (e.g., '070')
- `date` - YYYY-MM-DD format
- `title` - Japanese title
- `summary` - Short Japanese summary
- `featured`, `readTime`, `businessTags`, `techTags`

### 2. Hero Image
- Generate a new image for each entry
- Upload to Cloudflare Images: `npm run upload-image <path>`
- Or save to `/public/images/journal/` temporarily

### 3. Main Content (`conversation`)
- Full Japanese article in markdown format
- Include sections, images, code blocks as needed

### 4. English Summary (`englishSummary`)
```typescript
englishSummary: {
    title: "English Title",
    readTime: 5,
    sections: [
        {
            heading: "Section Title",
            paragraphs: ["Paragraph 1", "Paragraph 2"]
        }
    ]
}
```
This appears at `/english/journal/[id]`

### 5. Conversation Data (`conversationData`)
```typescript
conversationData: {
    english: [
        { speaker: 'male', text: "English dialogue line" },
        { speaker: 'female', text: "Response" }
    ],
    japanese: [
        { speaker: 'male', text: "日本語の会話" },
        { speaker: 'female', text: "返答" }
    ],
    tone: 'philosophical' | 'casual' | 'humorous' | 'formal',
    generatedAt: new Date('YYYY-MM-DD')
}
```
This appears at `/memoria/journal-[id]`

## File Structure

Create entry in: `src/data/journal/2026/[entry-name]-entry.ts`

Example:
```typescript
import { JournalEntry } from '../types';

export const myEntry: JournalEntry = {
    id: '070',
    date: '2026-01-15',
    title: 'タイトル',
    summary: '概要',
    featured: true,
    readTime: 5,
    businessTags: ['tag1'],
    techTags: ['tag2'],
    heroImage: '/images/journal/hero.png',
    englishSummary: { ... },
    conversationData: { ... },
    conversation: `...`
};
```

## Add to Monthly Index

Update `src/data/journal/2026/01-january.ts`:
```typescript
import { myEntry } from './my-entry';

export const january2026Entries: JournalEntry[] = [
    myEntry, // Add at top for newest first
    ...existingEntries
];
```

## Verification Checklist

// turbo-all
1. Build check: `npm run build`
2. View Japanese article: `/journal/[id]`
3. View English article: `/english/journal/[id]`
4. View Memoria: `/memoria/journal-[id]`
5. Test TTS playback in Memoria

## Common Mistakes (DON'T DO THESE)

❌ Forgetting conversationData → Memoria won't work
❌ Forgetting englishSummary → English Journal page empty
❌ Reusing old hero image → Lazy!
❌ Not adding to monthly index → Entry won't show
❌ Cloudflare upload without auth → Use local fallback
