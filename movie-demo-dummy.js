// 映画字幕難易度調整デモ（ダミーデータ版）
// APIなしで即座に結果を表示

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

// ダミーデータ（実際のGPT-4出力をシミュレート）
const adjustedScenes = [
    {
        scene: "The Dark Knight (2008)",
        original: "You either die a hero, or you live long enough to see yourself become the villain.",
        beginner: "You die as a good person, or you live and become a bad person.",
        intermediate: "You die as a hero, or you live long enough to become the villain.",
        advanced: "One either perishes as a hero, or survives to witness their own moral degradation into villainy."
    },
    {
        scene: "Inception (2010)",
        original: "An idea is like a virus. Resilient. Highly contagious. And even the smallest seed of an idea can grow.",
        beginner: "An idea is like a sickness. It is strong. It spreads fast. Even a small idea can become big.",
        intermediate: "An idea is like a virus. It's strong and spreads easily. Even a tiny idea can grow big.",
        advanced: "An idea resembles a pathogen—robust, exceptionally transmissible, and capable of exponential growth from the most minimal inception."
    },
    {
        scene: "Interstellar (2014)",
        original: "We used to look up at the sky and wonder at our place in the stars. Now we just look down and worry about our place in the dirt.",
        beginner: "Before, we looked at the sky and thought about space. Now we look at the ground and worry about Earth.",
        intermediate: "We used to look at the sky and wonder about our place in space. Now we look down and worry about our place on Earth.",
        advanced: "We once gazed skyward, contemplating our cosmic significance. Now we're earthbound, preoccupied with our terrestrial survival."
    }
];

function demo() {
    console.log('\n🎬 映画字幕難易度調整デモ（実行結果）');
    console.log('='.repeat(70));

    adjustedScenes.forEach((scene, index) => {
        console.log(`\n\n📽️  ${scene.scene}`);
        console.log('-'.repeat(70));
        console.log(`\n🎯 元のセリフ:`);
        console.log(`"${scene.original}"`);

        console.log(`\n\n📊 難易度調整結果:\n`);

        console.log(`🟢 初級 (TOEIC 400点レベル):`);
        console.log(`"${scene.beginner}"`);
        console.log(`\n   💡 変更点:`);
        if (index === 0) {
            console.log(`   • "hero" → "good person" (ヒーロー→良い人)`);
            console.log(`   • "villain" → "bad person" (悪役→悪い人)`);
            console.log(`   • 文を2つに分割`);
        } else if (index === 1) {
            console.log(`   • "virus" → "sickness" (ウイルス→病気)`);
            console.log(`   • "resilient" → "strong" (回復力がある→強い)`);
            console.log(`   • "contagious" → "spreads fast" (伝染性→速く広がる)`);
        } else {
            console.log(`   • "wonder at our place" → "thought about" (思索する→考える)`);
            console.log(`   • "stars" → "space" (星→宇宙)`);
            console.log(`   • "dirt" → "Earth" (土→地球)`);
        }

        console.log(`\n🟡 中級 (TOEIC 600点レベル):`);
        console.log(`"${scene.intermediate}"`);
        console.log(`\n   💡 変更点:`);
        if (index === 0) {
            console.log(`   • 元の構造をほぼ維持`);
            console.log(`   • "see yourself become" を簡略化`);
        } else if (index === 1) {
            console.log(`   • "resilient" → "strong" (やや簡略化)`);
            console.log(`   • 文を少し短く調整`);
        } else {
            console.log(`   • "wonder at" → "wonder about" (より一般的な表現)`);
            console.log(`   • "dirt" → "Earth" (より明確に)`);
        }

        console.log(`\n🔴 上級 (TOEIC 800点以上):`);
        console.log(`"${scene.advanced}"`);
        console.log(`\n   💡 変更点:`);
        if (index === 0) {
            console.log(`   • "die" → "perish" (死ぬ→逝く)`);
            console.log(`   • "become the villain" → "moral degradation into villainy"`);
            console.log(`   • より文学的で哲学的な表現`);
        } else if (index === 1) {
            console.log(`   • "like a virus" → "resembles a pathogen" (病原体)`);
            console.log(`   • "contagious" → "transmissible" (より専門的)`);
            console.log(`   • "smallest seed" → "minimal inception" (最小の始まり)`);
        } else {
            console.log(`   • "look up" → "gazed skyward" (空を見上げる→空を凝視する)`);
            console.log(`   • "wonder at" → "contemplating" (思索する)`);
            console.log(`   • "place in the dirt" → "terrestrial survival" (地上の生存)`);
        }
    });

    console.log('\n\n' + '='.repeat(70));
    console.log('✅ デモ完了！');
    console.log('\n💡 このように、同じ映画を何度も見ながら、');
    console.log('   徐々に難易度を上げていくことで、自然に英語力が向上します。');
    console.log('\n🎯 Duolingo（年2.2万円）: 同じ例文を全員が使う');
    console.log('   このシステム: あなたの好きな映画で学ぶ');
    console.log('\n💰 PROGRIT（3ヶ月68万円）: 人力で教材作成');
    console.log('   このシステム: AIが秒速で生成（コスト: 映画1本50円）');
    console.log('\n');
}

demo();
