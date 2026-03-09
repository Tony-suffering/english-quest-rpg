import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { execSync } from 'child_process';
import readline from 'readline';

// Load environment variables
dotenv.config({ path: '.env.local' });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Configure Cloudflare
const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

// Readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query: string): Promise<string> => {
    return new Promise(resolve => rl.question(query, resolve));
};

// --- Persona Definition ---
const SYSTEM_PERSONA = `あなたは30年の経験を持つ内装職人の親方「イワサキ」ですが、同時にサブカルチャーやゲーム、哲学、Web3、Biohackingに造詣が深いユニークな思想家です。
語り口は「〜だ」「〜である」調で、ハードボイルドかつ哲学的。
建築現場のメタファー（足場、パテ埋め、墨出しなど）と、最先端のテック用語（n8n, Next.js, AIなど）を無理やり融合させて語るのが特徴です。
読者が「なんだこの記事はw」と笑いながらも、最後には深く納得してしまうような「狂気と知性」のバランスを目指してください。`;

async function main() {
    console.log('\n🔵 --- Iwasaki Insights Professional Generator (Multi-Step Edition) ---');
    console.log('高品質かつ長文、そして「濃い」記事を作成します。\n');

    const topic = await askQuestion('📝 テーマ/タイトル案: ');
    const context = await askQuestion('📚 リサーチ資料/メモ (具体的な指示): ');

    console.log('\n⚠️  COST WARNING ⚠️');
    console.log('このスクリプトは高品質化のために複数のAI生成ステップ（構成→各章執筆→編集）を実行します。');
    console.log('推定コスト: $0.10 - $0.30 USD (OpenAI API)');
    const confirm = await askQuestion('実行しますか？ (y/n): ');

    if (confirm.toLowerCase() !== 'y') {
        console.log('中止しました。');
        rl.close();
        return;
    }

    rl.close();
    console.log('\n🚀 Starting Multi-Step Generation Process...');

    try {
        // Step 1: Architect (Outline)
        console.log('\n🏗️  Step 1: Designing Structure (Architect Mode)...');
        const outline = await generateOutline(topic, context);
        console.log(`\n📋 Outline Generated: ${outline.sections.length} sections.`);
        outline.sections.forEach((s: any, i: number) => console.log(`  ${i + 1}. ${s.title}`));

        // Step 2: Writer (Sections)
        console.log('\n✍️  Step 2: Writing Content (Writer Mode)...');
        const sectionsData = [];
        for (const section of outline.sections) {
            process.stdout.write(`  Writing "${section.title}"... `);
            const content = await generateSection(topic, section, outline.tone_guide);
            sectionsData.push({ title: section.title, content });
            process.stdout.write('Done.\n');
        }

        // Step 3: Editor (Assembly)
        console.log('\n🎬  Step 3: Assembling & Editing (Editor Mode)...');
        const finalArticle = await assembleArticle(topic, context, sectionsData);

        // Step 4: Image Generation
        console.log(`\n🎨  Step 4: Generating Image... [Prompt: ${finalArticle.image_prompt}]`);
        const imageUrl = await generateImage(finalArticle.image_prompt);

        // Step 5: Upload & Save
        console.log('\n☁️  Step 5: Uploading & Saving...');
        const finalImageUrl = await uploadImage(imageUrl);
        const savedPath = saveMarkdown(finalArticle, finalImageUrl);

        console.log(`\n✅ Post created successfully: ${savedPath}`);

        // Stage for git
        try {
            execSync(`git add ${savedPath}`);
            console.log('📦 File staged for git.');
        } catch (e) {
            // ignore
        }

    } catch (error: any) {
        console.error('\n❌ Error during generation:', error.message);
    }
}

// --- Helper Functions ---

async function generateOutline(topic: string, context: string) {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: SYSTEM_PERSONA },
            {
                role: 'user',
                content: `以下のテーマでブログ記事の構成案（目次）を作成してください。
                出力はJSON形式で、以下の構造にしてください。
                
                {
                    "title": "記事のキャッチーなタイトル",
                    "tone_guide": "記事全体のトーンや方向性のメモ",
                    "sections": [
                        { "title": "セクションのタイトル", "description": "このセクションで書くべき内容の要点" },
                        ...
                    ]
                }
                
                テーマ: ${topic}
                コンテキスト: ${context}
                
                要件: 
                - 少なくとも4〜5つのセクションを作成すること。
                - 導入、本論（複数の視点）、結論の流れを作ること。
                - 各セクションは深く掘り下げる余地のあるものにすること。`
            }
        ],
        response_format: { type: "json_object" }
    });
    return JSON.parse(completion.choices[0].message.content || '{}');
}

async function generateSection(topic: string, section: any, toneGuide: string) {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: SYSTEM_PERSONA },
            {
                role: 'user',
                content: `以下のセクションの本文を執筆してください。
                
                記事全体のテーマ: ${topic}
                全体のトーン: ${toneGuide}
                
                担当するセクション: ${section.title}
                内容の指示: ${section.description}
                
                要件:
                - Markdown形式で出力すること（見出しは含めないこと。本文のみ）。
                - 800文字以上書くこと。具体例、比喩、哲学的な考察を盛り込むこと。
                - 読者を飽きさせない「イワサキ」節を炸裂させること。`
            }
        ]
    });
    return completion.choices[0].message.content || '';
}

async function assembleArticle(topic: string, context: string, sections: any[]) {
    // Combine sections into a simplified format for the editor to review and extract metadata
    const fullText = sections.map(s => `## ${s.title}\n\n${s.content}`).join('\n\n');

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: SYSTEM_PERSONA },
            {
                role: 'user',
                content: `以下のテキストは、各セクションごとに生成された記事の原稿です。
                これを統合し、最終的な記事データを作成してください。
                
                本文の内容は基本的にそのまま活かしますが、接続詞や導入部を微調整して、全体として一つの流れるような記事にしてください。
                
                出力はJSON形式で:
                {
                    "title": "最終決定タイトル",
                    "description": "SNSシェア用の概要（120文字）",
                    "content": "統合されたMarkdown本文（見出しH2などを含む）",
                    "image_prompt": "DALL-E 3用画像プロンプト（英語）。Cinematic, Architectural, Surrealな空間。",
                    "businessTags": ["タグ1", "タグ2"],
                    "techTags": ["タグ3", "タグ4"]
                }

                原稿:
                ${fullText.substring(0, 15000)}` // Limit context if too large
            }
        ],
        response_format: { type: "json_object" }
    });
    return JSON.parse(completion.choices[0].message.content || '{}');
}

async function generateImage(prompt: string) {
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
    });
    if (!response.data || !response.data[0]) return '';
    return response.data[0].url || '';
}

async function uploadImage(url: string) {
    if (!url) return '';
    // Fetch image buffer
    const imgRes = await fetch(url);
    const buffer = await imgRes.arrayBuffer();
    const fileBlob = new Blob([buffer], { type: 'image/png' });

    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const filename = `blog-${timestamp}.png`;

    if (CF_ACCOUNT_ID && CF_API_TOKEN) {
        try {
            // A. Get Direct Upload URL
            const endpoint = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/images/v2/direct_upload`;
            const formData = new FormData();
            formData.append('requireSignedURLs', 'false');

            const urlRes = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${CF_API_TOKEN}` },
                body: formData
            });

            const urlData = await urlRes.json();
            if (!urlData.success) throw new Error(`Failed to get upload URL: ${JSON.stringify(urlData.errors)}`);
            const uploadURL = urlData.result.uploadURL;

            // B. Upload Content
            const uploadFormData = new FormData();
            uploadFormData.append('file', fileBlob, filename);

            const uploadRes = await fetch(uploadURL, {
                method: 'POST',
                body: uploadFormData
            });

            const uploadResult = await uploadRes.json();
            if (!uploadResult.success) throw new Error(`Upload failed: ${JSON.stringify(uploadResult.errors)}`);

            const variants = uploadResult.result.variants as string[];
            return variants.find(v => v.endsWith('/public')) || variants[0];
        } catch (e: any) {
            console.warn('⚠️ Cloudflare warning:', e.message);
        }
    }

    // Fallback to local
    console.log('💾 Saving image locally...');
    const localDir = path.join(process.cwd(), 'public', 'images', 'generated');
    if (!fs.existsSync(localDir)) fs.mkdirSync(localDir, { recursive: true });
    const localPath = path.join(localDir, filename);
    fs.writeFileSync(localPath, Buffer.from(buffer));
    return `/images/generated/${filename}`;
}

function saveMarkdown(articleData: any, imageUrl: string) {
    const today = new Date().toISOString().slice(0, 10);
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);

    const mdContent = `---
title: '${articleData.title.replace(/'/g, "''")}'
date: '${today}'
image: '${imageUrl}'
description: '${articleData.description.replace(/'/g, "''")}'
businessTags: ${JSON.stringify(articleData.businessTags)}
techTags: ${JSON.stringify(articleData.techTags)}
featured: false
---

${articleData.content}

`;

    const postsDir = path.join(process.cwd(), 'src', 'posts');
    const filename = `${today}-${timestamp}.md`;
    const fullPath = path.join(postsDir, filename);

    if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });
    fs.writeFileSync(fullPath, mdContent);

    return `src/posts/${filename}`;
}

main().catch(console.error);
