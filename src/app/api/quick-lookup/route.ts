import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { input } = await request.json();

        if (!input || typeof input !== 'string') {
            return NextResponse.json(
                { error: 'Input is required', success: false },
                { status: 400 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `You are an English vocabulary expert. Given a word or phrase, provide:
1. The exact phrase (normalized)
2. Type (one of: word, phrasal verb, idiom, slang, collocation, expression)
3. Japanese meaning (concise, natural Japanese)
4. Usage note (when/how to use it, nuance, in Japanese)

Respond in JSON format:
{
  "phrase": "the exact phrase",
  "type": "type",
  "meaning": "日本語の意味",
  "note": "使い方のポイント（日本語）"
}

Be concise. Focus on practical usage for Japanese learners.`
                },
                {
                    role: 'user',
                    content: input
                }
            ],
            response_format: { type: 'json_object' },
            max_tokens: 300,
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) {
            return NextResponse.json(
                { error: 'No response from AI', success: false },
                { status: 500 }
            );
        }

        const result = JSON.parse(content);

        return NextResponse.json({
            result: {
                phrase: result.phrase || input,
                type: result.type || 'word',
                meaning: result.meaning || '',
                note: result.note || '',
            },
            success: true,
        });
    } catch (error) {
        console.error('Quick lookup error:', error);
        return NextResponse.json(
            { error: 'Lookup failed', success: false },
            { status: 500 }
        );
    }
}
