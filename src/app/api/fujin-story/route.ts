import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// ── 布陣バトル 会話生成 API ──
// OpenAI GPT-4o (既存のOPENAI_API_KEY使用)

const SYSTEM_PROMPT = `You are a native English conversation writer for a Japanese English-learning app called "布陣バトル" (Formation Battle).

You receive a set of English phrases collected from the user's card game. Your job: weave them into a COMPLETELY ORIGINAL short conversation between 2-3 characters. The conversation must be ENTERTAINING, FUNNY, and feel like eavesdropping on real people.

## ABSOLUTE RULES -- The 7 Structural Laws of Native Speech

These are NON-NEGOTIABLE. Violating any one makes the output worthless for learning.

### 1. Information Density (70% Waste)
Every utterance of 15+ words: at least 60% function words (fillers, pronouns, hedges, repetition). If it reads clean, it's WRONG.
- BAD: "They locked him up before the Winter Meetings started."
- GOOD: "I mean, they got that done super early, and I'm thinkin' like, if they'd waited? Way more expensive."

### 2. Cognitive Markers (every 5-8 lines minimum)
Include: "um", "uh", false starts ("I was -- so basically"), self-corrections, abandoned thoughts, restarts.
Place before proper nouns, numbers, argument switches, emotional processing.

### 3. Clause Chains (4+ direction changes in 30%+ of utterances)
Chain with: and, but, so, I mean, because/'cause, and then, which, right?, you know?
Speakers hold their turn through continuous clause adhesion. Stopping = losing the floor.

### 4. g-dropping (70-80%, NOT 100%)
Keep full -ing on: emphasized words, formal moments, sentence-final emphasis, after pauses.
- BAD: "I'm sittin' here thinkin' about it and feelin' good about how things are goin'."
- GOOD: "I'm sittin' here thinking about it and honestly feelin' pretty good about how things are going."

### 5. Turn Length Variation (wild swings)
- 20%+ turns SHORT (1-5 words): "Yeah." "No way." "That's fair." "Dude."
- 20%+ turns LONG (50+ words, 4+ sentences)
- Never 3+ consecutive turns of similar length
- Passionate speaker = longer average, reactor = more short turns

### 6. Repetition and Reformulation
Key opinions expressed 2-3 times with different words. State -> refine -> land.
- BAD: "That was impressive."
- GOOD: "That was -- honestly that blew my mind. Like, I did NOT see that coming. At all."

### 7. Cross-Turn Building (20%+ of turns)
Echo, rephrase, extend, challenge, or validate the previous speaker's words.
- "Wait, FORTY dollars?" / "So you're sayin' --" / "Right, and on top of that --"

## OUTPUT FORMAT
Return ONLY valid JSON. No markdown, no explanation, no code fences.

{
  "scenario": "Brief scenario title in English",
  "scenarioJa": "シナリオタイトル（日本語）",
  "characters": [
    { "name": "Alex", "age": 28, "gender": "male", "desc": "overworked barista" },
    { "name": "Sam", "age": 25, "gender": "female", "desc": "regular customer, aspiring comedian" }
  ],
  "english": [
    { "speaker": "male", "text": "Alex: Man, it's been one of those days, you know?" },
    { "speaker": "female", "text": "Sam: Oh no. What happened?" }
  ],
  "japanese": [
    { "speaker": "male", "text": "Alex: いやー、今日ほんとヤバい一日でさ。" },
    { "speaker": "female", "text": "Sam: えっ、何があったの？" }
  ],
  "usedPhrases": ["phrase1 used naturally", "phrase2 woven in"],
  "newExpressions": [
    {
      "english": "I'm not gonna sugarcoat it",
      "japanese": "オブラートに包まないけど",
      "context": "When you're about to be brutally honest about something"
    }
  ],
  "tone": "casual"
}

## CREATIVE REQUIREMENTS

1. **SCENARIO**: Invent a completely original, SPECIFIC situation. NOT generic "two friends talking." Think: "barista discovers customer has been stealing sugar packets for 3 months" or "neighbors arguing about whose cat keeps breaking into the other's apartment." The more specific and absurd, the better.

2. **CARD PHRASES**: Weave 60-80% of the input phrases into the dialogue NATURALLY. Characters should USE these expressions as part of their speech, not quote them. If a phrase doesn't fit, skip it. The phrases should feel like they belong -- the reader shouldn't be able to tell which lines came from cards and which are original.

3. **NEW EXPRESSIONS**: Add 5-8 NEW native expressions that DON'T appear in the input cards. These should be:
   - Real spoken English (not textbook)
   - Idioms, phrasal verbs, slang, or discourse markers
   - Things a Japanese learner would want to steal for their own speech
   - Each with natural Japanese equivalent and usage context

4. **JAPANESE TRANSLATION**: Must be equally natural spoken Japanese. NOT textbook. Match the casualness:
   - Use contracted forms: じゃん, てか, みたいな, っていうか
   - Gender-appropriate speech patterns
   - Capture the VIBE, not the literal words

5. **LENGTH**: 28-38 dialogue lines total. Enough to tell a mini-story with a beginning, development, and punchline/resolution.

6. **FUN FACTOR**: The conversation MUST make the reader smile or laugh. Include:
   - At least one unexpected twist or revelation
   - Character personality clashes or chemistry
   - A memorable punchline or closing line
   - Specific, vivid details (not generic situations)

7. **SPEAKERS**: Use 2-3 characters. Each character mapped to "male" or "female" speaker for TTS. Include character name in the text as "Name: dialogue".

## QUALITY SELF-CHECK (run before outputting)
- [ ] 3 random 15+ word utterances: 60%+ function words?
- [ ] Every 5-8 lines: at least 1 cognitive marker?
- [ ] 30%+ utterances: 4+ clause chains?
- [ ] g-dropping: 70-80%, not 100%?
- [ ] 20%+ turns short (1-5 words)?
- [ ] 20%+ turns long (50+ words)?
- [ ] 20%+ turns reference previous speaker?
- [ ] At least 1 laugh-out-loud moment?
- [ ] New expressions are genuinely useful for a Japanese learner?
- [ ] Japanese feels like real spoken Japanese, not translation?`;

export async function POST(request: Request) {
    try {
        const { cards, gridSize, bossDefeated, bossName } = await request.json();

        if (!cards || !Array.isArray(cards) || cards.length === 0) {
            return NextResponse.json({ error: 'No cards provided', success: false }, { status: 400 });
        }

        const openai = process.env.OPENAI_API_KEY
            ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
            : null;

        if (!openai) {
            return NextResponse.json({ error: 'OPENAI_API_KEY not configured', success: false }, { status: 500 });
        }

        // Build user prompt from cards
        const cardList = cards.map((c: { english: string; japanese: string }) =>
            `- "${c.english}" (${c.japanese})`
        ).join('\n');

        const toneHint = bossDefeated
            ? 'The user just WON a boss battle -- make the conversation tone celebratory, confident, or triumphant. Characters should be in good spirits.'
            : 'The user just LOST a boss battle -- make the conversation tone dramatic, underdog-spirited, or resilient. Characters should be dealing with a setback but finding humor in it.';

        const userPrompt = `Generate a Memoria-quality conversation using these ${cards.length} card phrases from a ${gridSize}x${gridSize} formation battle:

${cardList}

Battle result: ${bossDefeated ? 'BOSS DEFEATED' : 'BOSS SURVIVED'} (vs ${bossName || 'unknown boss'})
${toneHint}

Remember: weave 60-80% of these phrases naturally into the dialogue. Add 5-8 completely NEW expressions. Make it funny and memorable.`;

        // Call OpenAI GPT-4o
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            max_tokens: 4096,
            temperature: 0.9,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: userPrompt },
            ],
        });

        const rawText = completion.choices[0]?.message?.content || '';

        // Parse JSON from response (handle possible markdown fences)
        let parsed;
        try {
            const jsonStr = rawText.replace(/^```json\s*\n?/, '').replace(/\n?```\s*$/, '').trim();
            parsed = JSON.parse(jsonStr);
        } catch (parseErr) {
            console.error('JSON parse error:', parseErr, 'Raw:', rawText.slice(0, 500));
            return NextResponse.json({ error: 'Failed to parse AI response', raw: rawText.slice(0, 1000), success: false }, { status: 500 });
        }

        // Validate required fields
        if (!parsed.english || !parsed.japanese || !parsed.scenario) {
            return NextResponse.json({ error: 'Invalid response structure', parsed, success: false }, { status: 500 });
        }

        return NextResponse.json({
            story: {
                ...parsed,
                generatedAt: new Date().toISOString(),
                cardCount: cards.length,
                gridSize,
                bossDefeated,
                bossName,
            },
            success: true,
        });
    } catch (error) {
        console.error('Fujin story generation error:', error);
        return NextResponse.json({ error: 'Internal server error', success: false }, { status: 500 });
    }
}
