import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'nodejs';

const openai = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

function decodeHtmlEntities(text: string): string {
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&#x2F;/g, '/');
}

function extractVideoId(url: string): string | null {
    // Handle various YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/, // Just the ID
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

interface RawSegment {
    text: string;
    offset: number; // milliseconds
    duration: number;
}

interface MergedSegment {
    startTime: number; // seconds
    text: string;
}

function mergeSegments(raw: RawSegment[], targetDurationSec: number = 25): MergedSegment[] {
    if (raw.length === 0) return [];

    const merged: MergedSegment[] = [];
    let currentTexts: string[] = [];
    let currentStart = Math.floor(raw[0].offset / 1000);

    for (const seg of raw) {
        const segStartSec = Math.floor(seg.offset / 1000);

        if (currentTexts.length > 0 && segStartSec - currentStart >= targetDurationSec) {
            merged.push({
                startTime: currentStart,
                text: currentTexts.join(' ').replace(/\s+/g, ' ').trim(),
            });
            currentTexts = [];
            currentStart = segStartSec;
        }

        if (currentTexts.length === 0) {
            currentStart = segStartSec;
        }
        currentTexts.push(decodeHtmlEntities(seg.text).trim());
    }

    if (currentTexts.length > 0) {
        merged.push({
            startTime: currentStart,
            text: currentTexts.join(' ').replace(/\s+/g, ' ').trim(),
        });
    }

    return merged;
}

async function fetchVideoMeta(videoId: string): Promise<{ title: string; description: string }> {
    try {
        const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
        if (res.ok) {
            const data = await res.json();
            return {
                title: data.title || `YouTube Video ${videoId}`,
                description: data.author_name ? `by ${data.author_name}` : '',
            };
        }
    } catch { /* fallback below */ }
    return { title: `YouTube Video ${videoId}`, description: '' };
}

export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
        }

        const videoId = extractVideoId(url.trim());
        if (!videoId) {
            return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
        }

        // Step 1: Fetch transcript
        const { YoutubeTranscript } = await import('youtube-transcript-plus');
        let rawSegments: RawSegment[] = [];

        try {
            const transcript = await YoutubeTranscript.fetchTranscript(videoId);
            if (transcript && transcript.length > 0) {
                rawSegments = transcript.map(seg => ({
                    text: seg.text || '',
                    offset: Math.round((seg.offset || 0) * 1000),
                    duration: Math.round((seg.duration || 0) * 1000),
                }));
            }
        } catch (err) {
            console.error('Transcript fetch failed:', err);
            return NextResponse.json({
                error: 'この動画には字幕がありません。字幕付きの動画を選んでください。',
            }, { status: 422 });
        }

        if (rawSegments.length === 0) {
            return NextResponse.json({
                error: 'この動画には字幕がありません。字幕付きの動画を選んでください。',
            }, { status: 422 });
        }

        // Step 2: Merge into ~25 second segments
        const merged = mergeSegments(rawSegments);

        // Step 3: Fetch video metadata
        const meta = await fetchVideoMeta(videoId);

        // Step 4: AI processing (translate + extract expressions)
        if (!openai) {
            // Fallback without AI: return segments without translation/expressions
            return NextResponse.json({
                content: {
                    id: `yt-${videoId}`,
                    youtubeId: videoId,
                    title: meta.title,
                    description: meta.description,
                    date: new Date().toISOString().split('T')[0],
                    segments: merged.map(s => ({
                        startTime: s.startTime,
                        english: s.text,
                        japanese: '',
                    })),
                    expressions: [],
                },
                mode: 'no-ai',
                success: true,
            });
        }

        // Build the AI prompt
        const segmentList = merged.map((s, i) =>
            `[${i + 1}] (${formatTime(s.startTime)}) ${s.text}`
        ).join('\n');

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `You are an English learning assistant for Japanese speakers. You will receive YouTube video captions split into segments.

Your job:
1. For each segment, clean up the text (fix auto-caption errors, remove "[Music]" tags, merge broken sentences) and translate to natural Japanese.
2. Extract exactly 10 interesting English expressions from the ENTIRE transcript that would be valuable for Japanese learners.

SEGMENT RULES:
- Clean up auto-caption artifacts but keep the natural spoken style
- If the original language is Japanese, swap: the "english" field should contain the English translation, "japanese" should be the original
- Keep segments in order with their original startTime

EXPRESSION RULES (ExpressionPick format):
- Pick expressions that are genuinely useful: phrasal verbs, idioms, slang, collocations, discourse markers
- Skip boring/obvious ones (hello, thank you, etc.)
- "japanese": concise Japanese meaning (not a textbook definition, casual)
- "english": the expression itself (2-5 words)
- "context": the actual sentence from the video where it appeared (quote it)
- "why": one sentence explaining why this is useful for Japanese learners - make it interesting, not textbook-y

Return ONLY valid JSON, no markdown:
{
  "segments": [
    { "startTime": 0, "english": "cleaned english text", "japanese": "自然な日本語訳" },
    ...
  ],
  "expressions": [
    { "english": "break the ice", "japanese": "場を和ませる", "context": "He tried to break the ice with a joke", "why": "初対面の会話でめちゃくちゃ使う。日本語の「アイスブレイク」の元ネタ" },
    ...
  ]
}`
                },
                {
                    role: 'user',
                    content: `Video: "${meta.title}"\n\nSegments:\n${segmentList}`
                }
            ],
            temperature: 0.3,
            max_tokens: 4000,
        });

        const aiContent = completion.choices[0]?.message?.content || '{}';

        let parsed: { segments?: Array<{ startTime: number; english: string; japanese: string }>; expressions?: Array<{ english: string; japanese: string; context?: string; why?: string }> } = {};
        try {
            const cleaned = aiContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            parsed = JSON.parse(cleaned);
        } catch (e) {
            console.error('Failed to parse AI response:', aiContent);
            // Fallback: use raw segments without AI
            parsed = {
                segments: merged.map(s => ({
                    startTime: s.startTime,
                    english: s.text,
                    japanese: '',
                })),
                expressions: [],
            };
        }

        const content = {
            id: `yt-${videoId}`,
            youtubeId: videoId,
            title: meta.title,
            description: meta.description,
            date: new Date().toISOString().split('T')[0],
            segments: (parsed.segments || []).map(s => ({
                startTime: s.startTime,
                english: s.english,
                japanese: s.japanese,
            })),
            expressions: (parsed.expressions || []).slice(0, 10).map(e => ({
                english: e.english,
                japanese: e.japanese,
                context: e.context || '',
                why: e.why || '',
            })),
        };

        return NextResponse.json({ content, success: true });
    } catch (error: unknown) {
        console.error('YouTube process error:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: 'Processing failed', message }, { status: 500 });
    }
}

function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
}
