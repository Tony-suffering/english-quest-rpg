# Transcript Processing Guide for English Listening Content

## Overview

This guide documents the systematic approach for converting YouTube transcripts into structured listening content for the `/english/listening` page.

## Key Principle: NO SHORTCUTS

**CRITICAL**: When processing transcripts, cover the ENTIRE video comprehensively.
- Do NOT create "highlight" segments only
- Do NOT skip sections deemed "less important"
- Work in batches if the content is too large for one session
- Each batch should be ~15 minutes of video content

## Input Format

### Transcript File Structure
```
[YouTube URL - line 1]
[Japanese text]
[Timestamp in format: 0:17, 16:29, or 1:00:02]
[Japanese text]
[Timestamp]
... (alternating pattern)
```

### Timestamp Parsing
| Format | Example | Seconds |
|--------|---------|---------|
| M:SS | 0:17 | 17 |
| MM:SS | 16:29 | 989 |
| H:MM:SS | 1:00:02 | 3602 |

```typescript
// Timestamp to seconds conversion
function parseTimestamp(ts: string): number {
    const parts = ts.split(':').map(Number);
    if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return 0;
}
```

## Output Format

### Data Structure (english-listening.ts)
```typescript
export interface ScriptSegment {
    startTime: number;    // seconds from video start
    endTime?: number;     // optional
    english: string;      // translated text
    japanese: string;     // original text
}

export interface ListeningContent {
    id: string;           // kebab-case identifier
    youtubeId: string;    // 11-character YouTube ID
    title: string;        // English title
    description: string;  // Brief English description
    segments: ScriptSegment[];
}
```

## Batch Processing Workflow

### Step 1: Analyze the Transcript
```
1. Count total timestamps (grep -c "^[0-9]" file.txt)
2. Calculate video length from last timestamp
3. Divide into ~15-minute batches
4. Create TODO list with all batches
```

### Step 2: Batch Division (Standard)
| Batch | Time Range | Approx Timestamps |
|-------|-----------|-------------------|
| 1 | 0:00-15:00 | ~100-150 |
| 2 | 15:00-30:00 | ~100-150 |
| 3 | 30:00-45:00 | ~100-150 |
| 4 | 45:00-60:00 | ~100-150 |
| 5+ | 60:00+ | varies |

### Step 3: Process Each Batch
For each batch:
1. Read transcript section for that time range
2. Group related lines into logical segments (3-10 lines typically)
3. Translate Japanese to natural English
4. Create segment objects with correct startTime
5. Add to english-listening.ts
6. Mark batch as complete in TODO

### Step 4: Verification
```bash
# Count total segments
grep -c "startTime:" src/data/english-listening.ts

# Verify entry exists
grep "id: \"your-entry-id\"" src/data/english-listening.ts

# Check last timestamp
grep "startTime:" src/data/english-listening.ts | tail -5
```

## Segment Creation Guidelines

### Grouping Rules
- Group by topic/thought (not strictly by timestamp)
- Keep segments 1-4 sentences typically
- Natural conversation breaks = new segment
- Include speaker reactions, filler words for authenticity

### Translation Guidelines
- Translate meaning, not word-for-word
- Keep casual tone for casual content
- Preserve slang appropriately (やばい → "insane", "crazy")
- Include context when Japanese is ambiguous

### Example Segment
```typescript
{
    startTime: 904,  // 15:04
    english: "Wait, is this for real? Kyle Tucker to the Dodgers? No way!",
    japanese: "え、まじ？カイル・タッカーがドジャースに？うそでしょ！"
}
```

## Common Mistakes to Avoid

### DO NOT:
- Create only "highlight" segments
- Skip "boring" sections (viewer chat, stream setup, etc.)
- Combine too many lines into one segment
- Leave batches incomplete without clear handoff notes
- Forget to update TODO list

### DO:
- Process systematically from start to end
- Include ALL content (even "um", "uh", reactions)
- Take breaks between batches if needed
- Verify segment count matches expected coverage
- Mark progress clearly in TODO

## Handoff Protocol (If Session Ends Mid-Task)

If you must stop before completing all batches:

1. **Complete current batch fully** - no partial batches
2. **Update TODO list** - mark completed/remaining batches
3. **Leave session note** in this format:
```
HANDOFF STATE:
- Completed: Batches 1-3 (0:00-45:00)
- Remaining: Batches 4-5 (45:00-end)
- Last segment added: startTime 2700
- Next segment starts at: 45:12 in transcript
```

## Quick Reference

### Typical Video Coverage
| Video Length | Batches | Total Segments |
|-------------|---------|----------------|
| 30 min | 2 | 60-80 |
| 60 min | 4 | 120-160 |
| 90 min | 6 | 180-240 |
| 120 min | 8 | 240-320 |

### Quality Checklist
- [ ] All timestamps covered (no gaps > 2 min)
- [ ] Translations are natural English
- [ ] Japanese text matches transcript exactly
- [ ] Segments have logical groupings
- [ ] Entry added to listeningContents array
- [ ] No TypeScript errors
- [ ] TODO list fully updated

## Example: Kyle Tucker Video (Completed)

**Source**: 117felix.txt (82 min, 738 timestamps)
**Output**: 181 segments in 5 batches
**ID**: kyle-tucker-dodgers-signing
**YouTubeId**: PO5NbXnUWwg

This serves as the reference implementation for comprehensive transcript processing.
