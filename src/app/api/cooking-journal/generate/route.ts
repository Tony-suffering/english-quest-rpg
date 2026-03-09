/**
 * Cooking Journal - AI生成API
 * シェフメンターとの対話 & 料理英語学習コンテンツ生成
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { CookingJournalInput, CookingEnglishTranslation, CookingInsights } from '@/types/cooking-journal';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface GenerateRequest {
    input: CookingJournalInput;
}

export async function POST(request: NextRequest) {
    try {
        const body: GenerateRequest = await request.json();
        const { input } = body;

        if (!input.dishName || !input.ingredients || !input.process) {
            return NextResponse.json({ error: 'dishName, ingredients, and process are required' }, { status: 400 });
        }

        // 星の評価を文字列に変換
        const ratingToText = (r: number) => {
            if (r >= 5) return '最高';
            if (r >= 4) return '良い';
            if (r >= 3) return '普通';
            if (r >= 2) return 'まあまあ';
            return '改善が必要';
        };

        // 入力内容をまとめる
        const cookingReport = `
【料理名】${input.dishName}${input.dishNameEn ? ` (${input.dishNameEn})` : ''}
【材料】${input.ingredients}
【調理手順】${input.process}
【味の評価】${input.tasteRating}/5 (${ratingToText(input.tasteRating)})
【見た目の評価】${input.presentationRating}/5 (${ratingToText(input.presentationRating)})
【難易度】${input.difficultyRating}/5
${input.notes ? `【メモ】${input.notes}` : ''}
        `.trim();

        // シェフメンター対話プロンプト
        const conversationPrompt = `あなたは料理学校のシェフ講師です。生徒の料理報告を聞いて、自然な英語で対話してください。

生徒の料理報告:
${cookingReport}

要件:
1. シェフ（chef）と生徒（you）の2人の会話として構成
2. プロの料理人らしい温かみのある口調
3. 料理用語を自然に使う（sauté, simmer, season, garnish など）
4. 10-15往復程度の会話
5. 具体的な料理のフィードバックを含める
6. 食感や味の表現を豊富に使う
7. 【重要】各英語セリフに対応する日本語訳を必ず含める

また、この料理に関連する語彙を6-10個抽出してください。
カテゴリ: technique（調理技法）, ingredient（材料）, texture（食感）, taste（味）, equipment（道具）, measurement（計量）

出力フォーマット（JSON）:
{
  "conversation": [
    {"speaker": "chef", "text": "Welcome back! What did you cook today?", "japanese": "おかえり！今日は何を作ったの？"},
    {"speaker": "you", "text": "I made some homemade gyoza from scratch!", "japanese": "手作り餃子を一から作りました！"},
    ...
  ],
  "vocabulary": [
    {
      "word": "fold",
      "meaning": "（生地を）包む・折りたたむ",
      "type": "verb",
      "example": "Fold the wrapper over the filling",
      "category": "technique",
      "culturalNote": "餃子の包み方は地域によって異なります"
    },
    ...
  ]
}

重要:
- 必ずJSONのみを返してください
- 各会話行にjapaneseフィールドを必ず含めてください
- 料理特有の表現を優先してください`;

        // 料理Insightsプロンプト
        const insightsPrompt = `あなたは料理の専門家です。以下の料理報告を分析し、役立つ情報とアドバイスを提供してください。

報告内容:
${cookingReport}

要件:
1. この料理に関連した具体的なTipsを3-4個
2. 日本料理と西洋料理の文化比較を含める
3. 次回の改善提案を2-3個
4. 励ましの言葉
5. 日本語と英語の両方で回答

出力フォーマット（JSON）:
{
  "tips": [
    {
      "titleJa": "餃子の皮をパリッと焼くコツ",
      "titleEn": "Tips for Crispy Gyoza",
      "contentJa": "水を加えた後、蓋をして蒸し焼きにし、水分が飛んだら蓋を外して...",
      "contentEn": "After adding water, cover and steam. Once the water evaporates, remove the lid...",
      "category": "technique"
    },
    ...
  ],
  "improvements": [
    "次回は肉汁をもっと閉じ込めるために、具材を冷やしてから包むといいですよ",
    "ニンニクをすりおろしてから加えると、より風味が出ます"
  ],
  "encouragement": "手作り餃子に挑戦したこと自体が素晴らしい！包むのは練習あるのみ。回数を重ねればどんどん上手くなりますよ。"
}

重要: 必ずJSONのみを返してください。`;

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

        // 並列で両方生成
        const [conversationResult, insightsResult] = await Promise.all([
            model.generateContent(conversationPrompt),
            model.generateContent(insightsPrompt),
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

        const conversationData = parseJson(conversationResult.response.text());
        const insightsData = parseJson(insightsResult.response.text());

        const englishTranslation: CookingEnglishTranslation = {
            conversation: conversationData.conversation,
            vocabulary: conversationData.vocabulary,
            generatedAt: new Date(),
        };

        const cookingInsights: CookingInsights = {
            tips: insightsData.tips,
            improvements: insightsData.improvements || [],
            encouragement: insightsData.encouragement,
            generatedAt: new Date(),
        };

        return NextResponse.json({
            englishTranslation,
            cookingInsights,
            generatedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Cooking journal generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate content', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
