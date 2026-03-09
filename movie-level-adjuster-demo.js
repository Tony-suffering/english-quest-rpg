// 映画字幕難易度調整デモ
// 実際にOpenAI APIで動作

const movieScenes = [
    {
        scene: "The Dark Knight (2008)",
        original: "You either die a hero, or you live long enough to see yourself become the villain."
    },
    {
        scene: "Inception (2010)",
        original: "An idea is like a virus. Resilient. Highly contagious. And even the smallest seed of an idea can grow."
    },
    {
        scene: "Interstellar (2014)",
        original: "We used to look up at the sky and wonder at our place in the stars. Now we just look down and worry about our place in the dirt."
    }
];

async function adjustDifficulty(text, level) {
    const prompts = {
        beginner: `
以下の映画のセリフを、TOEIC 400点レベルの初級学習者向けに簡略化してください。

ルール:
1. 中学英語レベルの単語のみ使用
2. 短い文に分割
3. 難しい表現は簡単な言葉に置き換え
4. 元の意味は保持

セリフ: "${text}"

簡略化した英文のみを出力してください（説明不要）。`,

        intermediate: `
以下の映画のセリフを、TOEIC 600点レベルの中級学習者向けに調整してください。

ルール:
1. 高校英語レベルまで
2. やや複雑な文法もOK
3. 難しすぎる語彙は置き換え
4. 元の意味とトーンを保持

セリフ: "${text}"

調整した英文のみを出力してください（説明不要）。`,

        advanced: `
以下の映画のセリフを、TOEIC 800点以上の上級学習者向けに最適化してください。

ルール:
1. ネイティブレベルの表現を維持
2. より洗練された語彙があれば提案
3. 文学的・哲学的なニュアンスを強調
4. 完全に自然な英語

セリフ: "${text}"

最適化した英文のみを出力してください（説明不要）。`
    };

    const prompt = prompts[level];

    console.log(`\n🎯 ${level.toUpperCase()}レベルに調整中...`);

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    { role: 'user', content: prompt }
                ],
                temperature: 0.3,
                max_tokens: 200
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error(`❌ エラー: ${error.message}`);
        return `[Error: ${error.message}]`;
    }
}

async function demo() {
    console.log('\n🎬 映画字幕難易度調整デモ');
    console.log('='.repeat(60));

    // APIキーチェック
    if (!process.env.OPENAI_API_KEY) {
        console.log('\n❌ エラー: OPENAI_API_KEYが設定されていません');
        console.log('以下のコマンドで設定してください:');
        console.log('$env:OPENAI_API_KEY="your-api-key-here"');
        return;
    }

    for (const scene of movieScenes) {
        console.log(`\n\n📽️  ${scene.scene}`);
        console.log('-'.repeat(60));
        console.log(`\n元のセリフ:\n"${scene.original}"\n`);

        const beginner = await adjustDifficulty(scene.original, 'beginner');
        const intermediate = await adjustDifficulty(scene.original, 'intermediate');
        const advanced = await adjustDifficulty(scene.original, 'advanced');

        console.log(`\n📊 調整結果:\n`);
        console.log(`🟢 初級 (TOEIC 400):\n"${beginner}"\n`);
        console.log(`🟡 中級 (TOEIC 600):\n"${intermediate}"\n`);
        console.log(`🔴 上級 (TOEIC 800+):\n"${advanced}"\n`);

        // 少し待つ（APIレート制限対策）
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ デモ完了！');
    console.log('\n💡 これで好きな映画を、あなたのレベルに合わせて学習できます。');
}

demo().catch(console.error);
