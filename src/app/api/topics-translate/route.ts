// /english/training/topics 専用の日本語→自然な英語変換 API
// 既存 /api/phrases/generate は Gemini で env 未設定。こちらは OpenAI (GPT-4o mini) を使う

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'nodejs';

const openai = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

interface TranslateRequest {
    japanese: string;
    context?: string;
}

interface ExpressionOut {
    english: string;
    nuance?: string;
    emotion?: string;
}

interface TranslateResponse {
    japanese: string;
    expressions: ExpressionOut[];
    category: string;
    generatedAt: string;
}

export async function POST(request: NextRequest) {
    if (!openai) {
        return NextResponse.json(
            { error: 'OPENAI_API_KEY is not set' },
            { status: 500 },
        );
    }

    try {
        const body: TranslateRequest = await request.json();
        const { japanese, context } = body;

        if (!japanese?.trim()) {
            return NextResponse.json({ error: 'japanese is required' }, { status: 400 });
        }

        const systemPrompt = [
            'You are a native English speaker who specializes in turning Japanese into the kind of English a native would actually say in casual conversation.',
            'Translate the PERSON, not the words. Match their tone: blunt, funny, sarcastic when the JP is, soft when the JP is.',
            'Forbidden: textbook English, polite-formal phrasing when the JP is casual, literal 1:1 mapping.',
            'Allowed (and encouraged when natural): contractions, fillers (like "honestly", "I mean", "kinda"), slang, sentence fragments, mild profanity if the JP is rough.',
            'Output JSON ONLY. No prose, no markdown fences.',
        ].join(' ');

        const userPrompt = [
            `Japanese:`,
            japanese.trim(),
            context ? `\nContext (topic prompt this is answering): ${context}` : '',
            '',
            'Return JSON with this exact shape:',
            '{',
            '  "expressions": [',
            '    { "english": "...", "nuance": "短い日本語ニュアンス", "emotion": "one-word emotion in english" },',
            '    { "english": "...", "nuance": "...", "emotion": "..." },',
            '    { "english": "...", "nuance": "...", "emotion": "..." }',
            '  ],',
            '  "category": "Feeling | Daily | Rant | Work | Reflect | etc"',
            '}',
            '',
            'Rules for the 3 expressions:',
            '- Each must be meaningfully DIFFERENT (different vibe, different word choice).',
            '- All 3 should be things a native would actually say, not paraphrases of textbook English.',
            '- Keep each under ~20 words.',
        ].join('\n');

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.8,
            max_tokens: 600,
        });

        const raw = completion.choices[0]?.message?.content;
        if (!raw) {
            return NextResponse.json({ error: 'Empty response from model' }, { status: 502 });
        }

        let parsed: any;
        try {
            parsed = JSON.parse(raw);
        } catch {
            return NextResponse.json({ error: 'Model returned invalid JSON', raw }, { status: 502 });
        }

        const expressions: ExpressionOut[] = Array.isArray(parsed.expressions)
            ? parsed.expressions
                .filter((e: any) => e && typeof e.english === 'string' && e.english.trim())
                .slice(0, 5)
                .map((e: any) => ({
                    english: String(e.english).trim(),
                    nuance: typeof e.nuance === 'string' ? e.nuance : undefined,
                    emotion: typeof e.emotion === 'string' ? e.emotion : undefined,
                }))
            : [];

        if (expressions.length === 0) {
            return NextResponse.json({ error: 'No expressions returned', raw }, { status: 502 });
        }

        const response: TranslateResponse = {
            japanese: japanese.trim(),
            expressions,
            category: typeof parsed.category === 'string' ? parsed.category : 'General',
            generatedAt: new Date().toISOString(),
        };
        return NextResponse.json(response);
    } catch (error) {
        console.error('topics-translate error:', error);
        return NextResponse.json(
            { error: 'Failed to translate', details: error instanceof Error ? error.message : 'Unknown' },
            { status: 500 },
        );
    }
}
