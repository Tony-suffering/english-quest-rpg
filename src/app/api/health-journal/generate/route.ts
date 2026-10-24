/**
 * Health Journal - 英語翻訳 & 健康情報生成API
 * 日本語の健康報告をカジュアルなネイティブ英語に変換し、健康アドバイスを追加
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { HealthJournalInput, EnglishTranslation, HealthInsights } from '@/types/health-journal';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface GenerateRequest {
    input: HealthJournalInput;
}

export async function POST(request: NextRequest) {
    try {
        const body: GenerateRequest = await request.json();
        const { input } = body;

        if (!input.food && !input.body && !input.exercise && !input.sleep && !input.notes) {
            return NextResponse.json({ error: 'At least one field is required' }, { status: 400 });
        }

        // 入力内容をまとめる
        const sections: string[] = [];
        if (input.food) sections.push(`【食事】${input.food}`);
        if (input.body) sections.push(`【体調】${input.body}`);
        if (input.exercise) sections.push(`【運動】${input.exercise}`);
        if (input.sleep) sections.push(`【睡眠】${input.sleep}`);
        if (input.notes) sections.push(`【メモ】${input.notes}`);

        const japaneseContent = sections.join('\n');

        // 英語翻訳プロンプト（日本語訳付き）
        const translationPrompt = `あなたはカジュアルで自然なネイティブ英語を話すフィットネストレーナーです。
以下の日本語の健康報告を、トレーナーとクライアントの会話形式で自然な英語に変換してください。

日本語報告:
${japaneseContent}

要件:
1. トレーナー（trainer）とクライアント（you）の2人の会話として構成
2. カジュアルで友達のような口調（"Hey!", "man", "dude", "like", "you know" など使用OK）
3. 自然なネイティブ英語（fillers, contractions, colloquialisms含む）
4. 10-15往復程度の会話
5. 報告内容を自然に会話に織り込む
6. 各発言は1-3文程度に
7. 学習に役立つ表現を含める
8. 【重要】各英語セリフに対応する日本語訳を必ず含める

また、会話から学べる語彙・表現を5-8個抽出してください。
健康・フィットネス関連の表現を優先。

出力フォーマット（JSON）:
{
  "conversation": [
    {"speaker": "trainer", "text": "Hey! How's it going today?", "japanese": "よう！今日の調子はどう？"},
    {"speaker": "you", "text": "Pretty good, man. Let me tell you about my day.", "japanese": "まあまあかな。今日のこと話すわ。"},
    ...
  ],
  "vocabulary": [
    {
      "word": "hit the gym",
      "meaning": "ジムに行く・トレーニングする",
      "type": "phrasal verb",
      "example": "I hit the gym this morning",
      "healthContext": "運動について話す時によく使う表現"
    },
    ...
  ]
}

重要:
- 必ずJSONのみを返してください
- 各会話行にjapaneseフィールドを必ず含めてください
- 日本語訳はカジュアルで自然な日本語にしてください`;

        // 健康アドバイスプロンプト
        const healthPrompt = `あなたは健康・栄養・フィットネスの専門家です。
以下の健康報告を分析し、役立つ健康情報とアドバイスを提供してください。

報告内容:
${japaneseContent}

要件:
1. 報告内容に関連した具体的なアドバイスを3-5個
2. 科学的根拠のある情報を提供
3. 日本語と英語の両方で回答
4. 励ましの言葉も含める
5. 必要であれば注意点も

出力フォーマット（JSON）:
{
  "tips": [
    {
      "category": "nutrition",
      "titleJa": "タンパク質の摂取タイミング",
      "titleEn": "Protein Timing",
      "contentJa": "運動後30分以内にタンパク質を摂取すると...",
      "contentEn": "Consuming protein within 30 minutes after exercise helps..."
    },
    ...
  ],
  "warnings": ["注意点があれば"],
  "encouragement": "励ましのメッセージ（日本語）"
}

重要: 必ずJSONのみを返してください。`;

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

        // 並列で両方生成
        const [translationResult, healthResult] = await Promise.all([
            model.generateContent(translationPrompt),
            model.generateContent(healthPrompt),
        ]);

        // JSONを抽出
        const parseJson = (text: string) => {
            let jsonText = text.trim();
            if (jsonText.startsWith('```json')) {
                jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
            } else if (jsonText.startsWith('```')) {
                jsonText = jsonText.replace(/```\n?/g, '').replace(/```\n?$/g, '');
            }
            return JSON.parse(jsonText);
        };

        const translationData = parseJson(translationResult.response.text());
        const healthData = parseJson(healthResult.response.text());

        const englishTranslation: EnglishTranslation = {
            conversation: translationData.conversation,
            vocabulary: translationData.vocabulary,
            generatedAt: new Date(),
        };

        const healthInsights: HealthInsights = {
            tips: healthData.tips,
            warnings: healthData.warnings,
            encouragement: healthData.encouragement,
            generatedAt: new Date(),
        };

        return NextResponse.json({
            englishTranslation,
            healthInsights,
            generatedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Health journal generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate content', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
