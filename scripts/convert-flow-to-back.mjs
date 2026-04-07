/**
 * Convert Flow (4th level long monologue) to Back (short response)
 *
 * Reads a weekly expression file, rewrites english[3] to a short 1-2 sentence
 * natural conversational response from the other person.
 *
 * Usage: node scripts/convert-flow-to-back.mjs <file>
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const file = process.argv[2];
if (!file) {
    console.error('Usage: node scripts/convert-flow-to-back.mjs <file>');
    process.exit(1);
}

const fullPath = resolve(file);
const content = readFileSync(fullPath, 'utf-8');

// Parse the file to find english arrays and rewrite the 4th element
const lines = content.split('\n');
const newLines = [];
let count = 0;

// State tracking
let currentJapanese = '';
let inEnglishArray = false;
let englishElementCount = 0;
let currentScene = '';
let bracketDepth = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Capture japanese field
    const jaMatch = line.match(/japanese:\s*['"]([^'"]+)['"]/);
    if (jaMatch) currentJapanese = jaMatch[1];

    // Detect english array - check if inline (all on one line) or multi-line
    if (!inEnglishArray && trimmed.includes('english:') && trimmed.includes('[')) {
        // Check if the array closes on the same line (inline format)
        const openCount = (line.match(/\[/g) || []).length;
        const closeCount = (line.match(/\]/g) || []).length;
        if (openCount === closeCount) {
            // Inline array: english: ['...', '...', '...', '...']
            // Extract all 4 string elements and replace the 4th
            const arrayMatch = line.match(/english:\s*\[(.+)\]/);
            if (arrayMatch) {
                const inner = arrayMatch[1];
                // Split by ', ' but respect quotes — find all quoted strings
                const elements = [];
                const re = /(['"])((?:(?!\1).|\\.)*?)\1/g;
                let m;
                while ((m = re.exec(inner)) !== null) {
                    elements.push({ quote: m[1], text: m[2], start: m.index, end: re.lastIndex });
                }
                if (elements.length >= 4) {
                    // Get Scene (3rd element) and generate Back
                    const sceneText = elements[2].text;
                    const back = generateBack(currentJapanese, sceneText);
                    const escaped = back.replace(/'/g, "\\'");
                    // Rebuild the array with the 4th element replaced
                    const prefix = line.slice(0, line.indexOf('[') + 1);
                    const suffix = line.slice(line.lastIndexOf(']'));
                    const newElements = elements.map((el, idx) => {
                        if (idx === 3) return `'${escaped}'`;
                        return el.quote + el.text + el.quote;
                    });
                    newLines.push(prefix + newElements.join(', ') + suffix);
                    count++;
                } else {
                    newLines.push(line);
                }
            } else {
                newLines.push(line);
            }
            continue;
        }
        // Multi-line array
        inEnglishArray = true;
        bracketDepth = openCount - closeCount;
        englishElementCount = 0;
        currentScene = '';
        newLines.push(line);
        continue;
    }

    if (inEnglishArray) {
        // Track bracket depth
        bracketDepth += (line.match(/\[/g) || []).length;
        bracketDepth -= (line.match(/\]/g) || []).length;

        // Is this a string element line? (starts with quote after whitespace)
        const isStringLine = /^\s+['"`]/.test(line);

        if (isStringLine) {
            englishElementCount++;

            if (englishElementCount === 3) {
                // Capture Scene text
                const m = line.match(/['"`](.+?)['"`]/);
                if (m) currentScene = m[1];
                newLines.push(line);
            } else if (englishElementCount === 4) {
                // REWRITE this line - generate Back
                const back = generateBack(currentJapanese, currentScene);
                const indent = line.match(/^(\s+)/)?.[1] || '            ';
                // Escape single quotes for JS single-quoted string
                const escaped = back.replace(/'/g, "\\'");
                const hasComma = trimmed.endsWith("',") || trimmed.endsWith('",') || trimmed.endsWith('`,');
                newLines.push(`${indent}'${escaped}'${hasComma ? ',' : ''}`);
                count++;
            } else {
                newLines.push(line);
            }
        } else {
            newLines.push(line);
        }

        if (bracketDepth <= 0) {
            inEnglishArray = false;
        }
        continue;
    }

    newLines.push(line);
}

writeFileSync(fullPath, newLines.join('\n'), 'utf-8');
console.log(`[DONE] ${count} expressions converted in ${file}`);


// ─── generateBack: context-aware response generator ───
// Returns PLAIN strings (no escaping). Escaping happens at write time.

function generateBack(japanese, scene) {
    const ja = japanese;
    const en = scene.toLowerCase();

    // ── PHASE 1: Match on Japanese (most reliable) ──

    // Self-introduction / origin
    if (ja.includes('出身')) return "Oh nice! I've always wanted to visit there.";
    if (ja.includes('名前は') || ja.includes('と申します')) return "Great name! I'm terrible with names, so remind me later.";
    if (ja.includes('歳') || ja.includes('年齢')) return "No way, you don't look it at all!";
    if (ja.includes('家族') && !ja.includes('食')) return "That's great! My family's about the same size.";
    if (ja.includes('趣味')) return "Oh cool! How long have you been into that?";
    if (ja.includes('ペット') || ja.includes('犬') || ja.includes('猫')) return "Aw, you gotta show me pictures!";
    if (ja.includes('好き') && !ja.includes('食')) return "Same here! We should hang out more.";

    // Duration / time
    if (ja.includes('年') && (ja.includes('くらい') || ja.includes('ぐらい') || ja.includes('ほど'))) return "Wow, that long? Time really flies.";
    if (ja.includes('年目') || ja.includes('年間')) return "That's impressive! You've been at it a while.";

    // Study / learning
    if (ja.includes('勉強') || ja.includes('練習')) return "That's awesome! How's it going so far?";
    if (ja.includes('英語') && !ja.includes('勉強')) return "Your English is great! Keep it up.";

    // IT / work intro
    if (ja.includes('IT') || ja.includes('エンジニア') || ja.includes('プログラ')) return "Oh cool! What kind of stuff do you work on?";
    if (ja.includes('先生') || ja.includes('教師')) return "That's such an important job! What do you teach?";
    if (ja.includes('看護') || ja.includes('医師') || ja.includes('ドクター')) return "Wow, that's a tough gig. Respect.";
    if (ja.includes('デザイン') || ja.includes('デザイナー')) return "That's cool! I'd love to see your work sometime.";

    // Greetings
    if (ja.includes('はじめまして') || ja.includes('初めまして')) return "Hey, welcome! Great to have you here.";
    if (ja.includes('よろしく')) return "Likewise! Looking forward to hanging out.";
    if (ja.includes('久しぶり')) return "I know, right? It's been forever!";
    if (ja.includes('おはよう')) return "Morning! You're here early today.";
    if (ja.includes('おやすみ')) return "Night! Sleep well.";
    if (ja.includes('お疲れ')) return "You too! Rough day?";
    if (ja.includes('ただいま')) return "Welcome back! How was your day?";
    if (ja.includes('いってきます') || ja.includes('行ってきます')) return "Have a good one! See you later.";
    if (ja.includes('元気')) return "Doing great! How about you?";
    if (ja.includes('さようなら') || ja.includes('バイバイ') || ja.includes('じゃあね')) return "See ya! Let's do this again soon.";

    // Thanks / apology
    if (ja.includes('ありがとう') || ja.includes('サンキュー')) return "No problem! Anytime.";
    if (ja.includes('すみません') && ja.includes('遅')) return "All good! We just sat down anyway.";
    if (ja.includes('すみません') || ja.includes('ごめん')) return "Don't worry about it! Seriously.";

    // Food & drink
    if (ja.includes('ビール')) return "Coming right up! Draft okay?";
    if (ja.includes('注文') || ja.includes('オーダー')) return "Sure! Take your time, no rush.";
    if (ja.includes('おすすめ')) return "Oh, you gotta try the daily special. It's amazing.";
    if (ja.includes('お会計') || ja.includes('会計') || ja.includes('払')) return "I got this one. You can get the next round.";
    if (ja.includes('お水') || ja.includes('水を')) return "Here you go! Want some ice with that?";
    if (ja.includes('おいしい') || ja.includes('うまい') || ja.includes('美味しい')) return "Right?! Told you this place is the real deal.";
    if (ja.includes('お腹') && ja.includes('空')) return "Same! Let's order something. I'm starving.";
    if (ja.includes('辛い') && !ja.includes('つらい')) return "Too spicy? Here, drink some milk. It helps.";
    if (ja.includes('乾杯') || ja.includes('カンパイ')) return "Cheers! Here's to a great night!";
    if (ja.includes('食べ') && (ja.includes('たい') || ja.includes('よう'))) return "Sounds good! I know just the place.";
    if (ja.includes('お酒') || ja.includes('飲み') && !ja.includes('飲みますか')) return "Count me in! What are we having?";
    if (ja.includes('料理')) return "You cook?! Okay, I'm coming over next time.";
    if (ja.includes('満腹') || ja.includes('お腹いっぱい')) return "Same, I'm stuffed. That was so good.";
    if (ja.includes('メニュー')) return "Let me grab one for you. The specials are on the board.";
    if (ja.includes('ワイン')) return "Red or white? They've got a great house wine.";
    if (ja.includes('コーヒー') || ja.includes('紅茶') || ja.includes('お茶')) return "Good call! I could use one too.";
    if (ja.includes('デザート') || ja.includes('甘い')) return "Oh, absolutely. You can't skip dessert here.";
    if (ja.includes('朝ごはん') || ja.includes('朝食') || ja.includes('ランチ')) return "I'm so hungry. Let's order right away.";
    if (ja.includes('晩ご飯') || ja.includes('夕飯') || ja.includes('ディナー')) return "What are you in the mood for? I'm down for anything.";
    if (ja.includes('出汁') || ja.includes('だし')) return "Oh yeah, that umami flavor is something else.";
    if (ja.includes('ラーメン') || ja.includes('うどん') || ja.includes('そば')) return "Now I'm craving some! Let's go grab a bowl.";
    if (ja.includes('寿司') || ja.includes('刺身')) return "Oh man, you're making me hungry just talking about it.";
    if (ja.includes('居酒屋')) return "Best way to end the day! Let's get a table.";
    if (ja.includes('回転')) return "Right? It's genius. So fun to watch too.";
    if (ja.includes('食べ放題')) return "Sounds good! I know just the place.";
    if (ja.includes('弁当')) return "Homemade? That's impressive!";
    if (ja.includes('旬') || ja.includes('季節') && ja.includes('食')) return "Totally! Seasonal stuff just hits different.";

    // Feelings
    if (ja.includes('疲れ') || ja.includes('ヘトヘト') || ja.includes('へとへと')) return "You look beat. Sit down, I'll get you something.";
    if (ja.includes('嬉しい') || ja.includes('うれしい')) return "That's awesome! You deserve it.";
    if (ja.includes('悲しい')) return "Hey, you okay? I'm here if you need to talk.";
    if (ja.includes('心配') || ja.includes('不安')) return "It'll work out. Trust the process.";
    if (ja.includes('楽しい') || ja.includes('楽しみ')) return "Same here! Can't wait.";
    if (ja.includes('怒') || ja.includes('むかつく') || ja.includes('イライラ')) return "Whoa, what happened? That sounds awful.";
    if (ja.includes('緊張')) return "Deep breaths! You've got this.";
    if (ja.includes('寂しい') || ja.includes('さみしい')) return "Aw, we're right here! Come hang out anytime.";
    if (ja.includes('驚') || ja.includes('びっくり') || ja.includes('マジ')) return "Wait, for real?! Tell me everything.";
    if (ja.includes('恥ずかしい')) return "Ha, don't be! Everyone's been there.";
    if (ja.includes('自信')) return "Come on, you're way better than you think.";
    if (ja.includes('つらい') || ja.includes('大変')) return "That sounds rough. Hang in there.";
    if (ja.includes('ストレス')) return "Yeah, that'll do it. You need a break.";
    if (ja.includes('幸せ') || ja.includes('しあわせ')) return "Love that energy! It's contagious.";
    if (ja.includes('感動') || ja.includes('泣')) return "Aw, that's beautiful. I might tear up too.";
    if (ja.includes('退屈') || ja.includes('暇')) return "Bored? Come on, let's go do something fun!";
    if (ja.includes('最高')) return "Totally! Best one yet.";
    if (ja.includes('ヤバい') || ja.includes('やばい')) return "Wait, good yabai or bad yabai?";
    if (ja.includes('やった') || ja.includes('よし')) return "Let's go! That's what I'm talking about!";
    if (ja.includes('無理')) return "Hey, don't push it. Take it one step at a time.";
    if (ja.includes('頑張')) return "You've got this! I believe in you.";
    if (ja.includes('落ち込')) return "Hey, chin up. Tomorrow's a new day.";
    if (ja.includes('感謝')) return "That means a lot. Really.";

    // Work
    if (ja.includes('仕事') && (ja.includes('辞') || ja.includes('やめ'))) return "Seriously? What's the plan after?";
    if (ja.includes('仕事') || ja.includes('働')) return "I feel you. Work never stops, does it?";
    if (ja.includes('会議') || ja.includes('ミーティング')) return "Ugh, those things always take forever.";
    if (ja.includes('残業')) return "Again? You gotta take care of yourself too.";
    if (ja.includes('休み') || ja.includes('休日') || ja.includes('連休')) return "Nice! Any plans?";
    if (ja.includes('忙しい')) return "I bet! Don't burn yourself out.";
    if (ja.includes('遅刻') || ja.includes('遅れ')) return "You're fine! Don't stress about it.";
    if (ja.includes('上司') || ja.includes('ボス')) return "Yikes. That's tough. What did you say?";
    if (ja.includes('転職')) return "Oh wow! What's the new job?";
    if (ja.includes('給料') || ja.includes('salary')) return "Ha, don't even get me started on that topic.";
    if (ja.includes('同僚') || ja.includes('チーム')) return "You've got a good team? That makes all the difference.";
    if (ja.includes('プロジェクト') || ja.includes('締め切り') || ja.includes('〆切')) return "When's the deadline? We can figure this out.";
    if (ja.includes('出張')) return "Where to? Anywhere fun at least?";
    if (ja.includes('昇進') || ja.includes('昇給')) return "Congrats! That's well deserved!";

    // Travel
    if (ja.includes('道') && (ja.includes('迷') || ja.includes('わから'))) return "Here, pull up the map. I'll show you.";
    if (ja.includes('電車') || ja.includes('駅')) return "It's two stops from here. I can walk you there.";
    if (ja.includes('タクシー')) return "Want me to call one? It'll be faster.";
    if (ja.includes('飛行機') || ja.includes('空港')) return "When's your flight? Don't cut it too close!";
    if (ja.includes('旅行') || ja.includes('旅')) return "Oh nice! Where are you going?";
    if (ja.includes('ホテル') || ja.includes('宿')) return "How's your place? Mine's a quick walk from here.";
    if (ja.includes('地図') || ja.includes('マップ')) return "Let me pull it up. Okay, we're here...";
    if (ja.includes('予約')) return "Done! I booked us a table for seven.";
    if (ja.includes('海外')) return "Oh, international? That's exciting!";
    if (ja.includes('お土産')) return "You didn't have to! But I love it, thanks!";
    if (ja.includes('観光')) return "There's so much to see! Where do you wanna start?";
    if (ja.includes('切符') || ja.includes('チケット')) return "Got them! We're all set.";

    // Shopping
    if (ja.includes('高い') && !ja.includes('背')) return "Yeah, that's pricey. Try the shop down the block.";
    if (ja.includes('安い') || ja.includes('セール')) return "Seriously? That's a steal! Where?";
    if (ja.includes('サイズ')) return "Want me to ask if they have a different size?";
    if (ja.includes('買い物') || ja.includes('ショッピング')) return "Find anything good? I need to look too.";
    if (ja.includes('値段') || ja.includes('いくら')) return "Hmm, let me check the price real quick.";
    if (ja.includes('試着')) return "Go try it on! I'll wait right here.";

    // Social
    if (ja.includes('映画') || ja.includes('ドラマ')) return "Have you seen it yet? No spoilers!";
    if (ja.includes('音楽')) return "What kind? I'm always looking for new stuff.";
    if (ja.includes('スポーツ')) return "Did you catch the game? It was insane.";
    if (ja.includes('天気')) return "I know, right? This weather is something else.";
    if (ja.includes('暑い')) return "Ugh, it's boiling out there. Stay hydrated!";
    if (ja.includes('寒い')) return "Right? I'm freezing. Let's go somewhere warm.";
    if (ja.includes('雨') || ja.includes('傘')) return "Figures. Did you bring an umbrella?";
    if (ja.includes('週末')) return "Sounds good! I'm in.";
    if (ja.includes('誕生日') || ja.includes('おめでとう')) return "Happy birthday! This round's on me!";
    if (ja.includes('結婚')) return "Congrats! When's the wedding?";
    if (ja.includes('彼女') || ja.includes('彼氏') || ja.includes('恋人')) return "Ooh, tell me more! Details!";
    if (ja.includes('引っ越し')) return "Where to? That's a big change!";
    if (ja.includes('約束')) return "Got it! I'll be there for sure.";
    if (ja.includes('写真') || ja.includes('フォト')) return "Let me see! Oh that's a great shot.";
    if (ja.includes('SNS') || ja.includes('インスタ')) return "Send me the link! I'll follow you.";
    if (ja.includes('プレゼント')) return "Aw, you didn't have to! Thank you!";
    if (ja.includes('パーティ') || ja.includes('パーティー')) return "I'm so there! What should I bring?";
    if (ja.includes('ゲーム')) return "Oh, which one? I've been hooked on that too.";
    if (ja.includes('本') && !ja.includes('本当') && !ja.includes('日本')) return "Good read? What's it about?";
    if (ja.includes('漫画') || ja.includes('アニメ')) return "No way, you too?! What's your favorite?";
    if (ja.includes('カラオケ')) return "Let's go! I call first song!";
    if (ja.includes('散歩') || ja.includes('ウォーキング')) return "Nice! The weather's perfect for it.";

    // Health
    if (ja.includes('病気') || ja.includes('風邪') || ja.includes('熱')) return "Oh no, take it easy. Want me to grab you some medicine?";
    if (ja.includes('病院') || ja.includes('医者')) return "You should go. Better safe than sorry.";
    if (ja.includes('アレルギー')) return "Good to know! I'll make sure we avoid that.";
    if (ja.includes('運動') || ja.includes('ジム')) return "Nice! I should start working out too.";
    if (ja.includes('ダイエット')) return "Ha, you and me both. Let's start tomorrow.";
    if (ja.includes('薬')) return "Did you take it already? Don't skip doses.";
    if (ja.includes('睡眠') || ja.includes('眠')) return "Get some rest! Sleep is everything.";
    if (ja.includes('健康')) return "That's the way! Health comes first.";

    // Agreement / opinion
    if (ja.includes('そうだ') || ja.includes('その通り')) return "See? I've been saying that all along!";
    if (ja.includes('違う') || ja.includes('そうじゃない')) return "Oh wait, my bad. What do you mean?";
    if (ja.includes('わかった') || ja.includes('了解')) return "Cool! We're all set then.";
    if (ja.includes('わからない') || ja.includes('分からない')) return "No worries! Let me break it down for you.";
    if (ja.includes('なるほど')) return "Right? It all makes sense now.";
    if (ja.includes('確かに')) return "Exactly! Couldn't have said it better.";
    if (ja.includes('そうかも') || ja.includes('かもしれ')) return "Yeah, you might be onto something there.";
    if (ja.includes('信じられない')) return "I know, right?! I couldn't believe it either.";
    if (ja.includes('面白い') || ja.includes('おもしろい')) return "Ha, right?! Gets me every time.";
    if (ja.includes('賛成')) return "I'm with you on that. One hundred percent.";
    if (ja.includes('反対') && !ja.includes('反対側')) return "Hmm, I see your point. Let me think about it.";

    // Requests
    if (ja.includes('教えて')) return "Sure! Ask me anything.";
    if (ja.includes('助けて') || ja.includes('手伝')) return "On it! What do you need?";
    if (ja.includes('待って')) return "Take your time! No rush at all.";
    if (ja.includes('貸して')) return "Yeah, here you go! Keep it as long as you need.";
    if (ja.includes('お願い')) return "Leave it to me! Consider it done.";
    if (ja.includes('相談')) return "Of course! I'm all ears. What's up?";
    if (ja.includes('許して') || ja.includes('許可')) return "You don't even have to ask. Go for it!";

    // Phone / communication
    if (ja.includes('電話') || ja.includes('メール') || ja.includes('メッセージ')) return "Got it! I'll get back to you ASAP.";
    if (ja.includes('LINE') || ja.includes('連絡')) return "Sure thing! I'll message you later.";

    // Time
    if (ja.includes('時間') && (ja.includes('ない') || ja.includes('ある'))) return "Yeah, let's figure out a time that works.";
    if (ja.includes('早い')) return "Whoa, already? That was fast!";
    if (ja.includes('遅い') && !ja.includes('遅刻')) return "No rush! We've got plenty of time.";
    if (ja.includes('明日')) return "Sounds like a plan! See you tomorrow then.";
    if (ja.includes('今日')) return "Let's make the most of it!";
    if (ja.includes('最近')) return "Oh yeah? What's been going on?";

    // Places
    if (ja.includes('家') && !ja.includes('家族')) return "Your place? Cool, what time should I come over?";
    if (ja.includes('学校') || ja.includes('大学')) return "How's school going? Keeping busy?";
    if (ja.includes('コンビニ')) return "Want me to grab you anything while I'm there?";
    if (ja.includes('スーパー')) return "I need to go too! Let's walk together.";
    if (ja.includes('公園')) return "Great idea! Some fresh air would be nice.";

    // Culture / Japan-specific
    if (ja.includes('文化') || ja.includes('伝統')) return "That's fascinating! Japan's culture is so unique.";
    if (ja.includes('日本') && (ja.includes('独自') || ja.includes('独特') || ja.includes('ならでは'))) return "Yeah, that's so uniquely Japanese. Love it.";
    if (ja.includes('お辞儀') || ja.includes('礼儀') || ja.includes('マナー')) return "Makes sense! It's all about respect, right?";
    if (ja.includes('名刺')) return "Oh yeah, the business card thing! That's a whole ritual.";
    if (ja.includes('判子') || ja.includes('はんこ') || ja.includes('印鑑')) return "Still? I thought everything was going digital.";
    if (ja.includes('敬語') || ja.includes('丁寧語') || ja.includes('尊敬語')) return "That's the hardest part of Japanese for me!";
    if (ja.includes('温泉') || ja.includes('銭湯')) return "Love it! Nothing beats a good soak.";
    if (ja.includes('新幹線')) return "So fast! I still can't get over that.";
    if (ja.includes('花見') || ja.includes('桜') || ja.includes('紅葉')) return "So beautiful! That's one of the best things about Japan.";
    if (ja.includes('花火')) return "Amazing! I love the summer ones.";
    if (ja.includes('祭り') || ja.includes('まつり')) return "Those are the best! The energy is incredible.";
    if (ja.includes('初詣') || ja.includes('神社') || ja.includes('お寺')) return "The atmosphere there is something special.";
    if (ja.includes('正月') || ja.includes('年末') || ja.includes('大晦日')) return "That's such a nice tradition. I love how special it is.";
    if (ja.includes('節分') || ja.includes('七夕') || ja.includes('ひな祭り')) return "Those traditions are so cool! We don't have that.";
    if (ja.includes('盆') || ja.includes('お盆')) return "Family time is the best. That's really sweet.";
    if (ja.includes('四季') || ja.includes('季節')) return "Japan's seasons are really something special.";
    if (ja.includes('もったいない')) return "I love that word! We need that concept in English.";
    if (ja.includes('空気') && (ja.includes('読') || ja.includes('よ'))) return "Ha, yeah. That's such a Japanese thing.";
    if (ja.includes('本音') || ja.includes('建前')) return "That dual thing is so interesting. Takes getting used to.";
    if (ja.includes('おもてなし')) return "Japanese hospitality is next level. Seriously.";
    if (ja.includes('漫画') || ja.includes('マンガ')) return "No way, you too?! What's your favorite?";
    if (ja.includes('アニメ')) return "Which one? I've been binge-watching lately.";
    if (ja.includes('声優')) return "They're basically celebrities, right? That's wild.";
    if (ja.includes('コミケ') || ja.includes('同人')) return "That's massive! I've always wanted to go.";
    if (ja.includes('ジャンプ') || ja.includes('連載') || ja.includes('打ち切り')) return "The manga industry is brutal! So competitive.";
    if (ja.includes('受験') || ja.includes('入試') || ja.includes('試験')) return "That sounds intense! The pressure must be crazy.";
    if (ja.includes('給食')) return "School lunch? That's actually a great system.";
    if (ja.includes('部活')) return "That dedication is amazing. So much discipline.";
    if (ja.includes('体育祭') || ja.includes('文化祭')) return "Those events look so fun! Wish we had that.";
    if (ja.includes('道徳')) return "Interesting! Character education, basically.";
    if (ja.includes('識字率') || ja.includes('教育')) return "That's impressive! Education is everything.";
    if (ja.includes('新卒') || ja.includes('就活') || ja.includes('採用')) return "That system is so different from ours!";
    if (ja.includes('終身雇用') || ja.includes('年功序列')) return "Times are changing, though, right?";
    if (ja.includes('靴') && ja.includes('脱')) return "Makes total sense! Keeps everything clean.";

    // Pharmacy / medical context
    if (ja.includes('処方') || ja.includes('処方箋')) return "Got it! Let me check what we have.";
    if (ja.includes('副作用')) return "Good question! Let me look that up for you.";
    if (ja.includes('日焼け止め') || ja.includes('虫除け') || ja.includes('目薬')) return "Aisle three, I think. Let me show you.";
    if (ja.includes('何回') && ja.includes('飲')) return "Three times a day, after meals. Don't forget!";
    if (ja.includes('食後') || ja.includes('食前')) return "Yep, timing matters with this one.";
    if (ja.includes('効く') || ja.includes('効きます')) return "It should kick in within thirty minutes or so.";

    // Hotel context
    if (ja.includes('チェックイン') || ja.includes('チェックアウト')) return "Of course! Right this way.";
    if (ja.includes('部屋') && (ja.includes('変え') || ja.includes('替え'))) return "Let me check what's available. One moment!";
    if (ja.includes('タオル') && ja.includes('追加')) return "No problem! I'll send some up right away.";
    if (ja.includes('エアコン') && (ja.includes('効') || ja.includes('つか'))) return "Oh no, sorry about that! Let me call maintenance.";
    if (ja.includes('荷物') && ja.includes('預')) return "Sure! We'll keep them safe for you.";
    if (ja.includes('何時') && (ja.includes('から') || ja.includes('まで'))) return "Let me double-check that for you real quick.";

    // Directions context
    if (ja.includes('まっすぐ') || ja.includes('真っ直ぐ')) return "Got it! Thanks, I think I can find it now.";
    if (ja.includes('曲が') || ja.includes('曲って')) return "Got it! Thanks, I think I can find it now.";
    if (ja.includes('信号') || ja.includes('交差点')) return "Okay, I see it! Thanks for the directions.";
    if (ja.includes('反対側')) return "Oh, the other side? Got it, thanks!";
    if (ja.includes('通り過ぎ')) return "Ah shoot, I went too far? Let me turn around.";
    if (ja.includes('道沿い') || ja.includes('この道')) return "Along this road? Easy enough!";
    if (ja.includes('一緒に行') || ja.includes('案内')) return "That'd be great! Thanks for offering.";

    // Living / address
    if (ja.includes('住んで') || ja.includes('住まい') || ja.includes('住所')) return "Oh nice! How's the neighborhood?";

    // Past / experience
    if (ja.includes('前は') || ja.includes('以前') || ja.includes('昔は')) return "Oh wow, that's a big change! What happened?";
    if (ja.includes('夢は') || ja.includes('目標') || ja.includes('将来')) return "That's an amazing goal! You'll get there.";

    // Explanatory / だよね pattern (catches cultural commentary)
    if (ja.includes('すごいよね') || ja.includes('すごいんだよ') || ja.includes('すごいらしい')) return "No way, really?! That's wild.";
    if (ja.includes('だよね') && ja.length > 10) return "Yeah, totally! I was just thinking that.";
    if (ja.includes('なんだよ') && ja.length > 10) return "Oh, I didn't know that! Makes sense though.";
    if (ja.includes('んだよね') && ja.length > 10) return "Right?! It's one of those things.";
    if (ja.includes('ないの？') || ja.includes('なの？')) return "Ha, good question! It's complicated.";
    if (ja.includes('って') && ja.includes('よね')) return "Yeah, you're so right about that.";
    if (ja.includes('って') && ja.includes('だよ') && ja.length > 10) return "Huh, interesting! Tell me more about that.";

    // Technology
    if (ja.includes('AI') || ja.includes('ロボット')) return "Crazy, right? Technology is moving so fast.";
    if (ja.includes('アプリ') || ja.includes('アップデート')) return "Ugh, updates are the worst. Did it break something?";
    if (ja.includes('Wi-Fi') || ja.includes('WiFi') || ja.includes('ネット')) return "Let me check... try this password.";
    if (ja.includes('SNS') || ja.includes('インスタ') || ja.includes('TikTok')) return "Send me the link! I'll follow you.";
    if (ja.includes('YouTube') || ja.includes('動画')) return "Which channel? I'm always looking for good stuff.";
    if (ja.includes('スマホ') || ja.includes('携帯') || ja.includes('充電')) return "Here, use my charger. I've got one.";
    if (ja.includes('SIM') || ja.includes('データ')) return "There's a shop nearby that can sort that out.";
    if (ja.includes('パスワード')) return "Let me look it up. It should be written somewhere.";
    if (ja.includes('Google') || ja.includes('検索')) return "Let me look that up real quick...";

    // Opinion / commentary with specific verbs
    if (ja.includes('普通') && !ja.includes('普通に')) return "Interesting! It's different where I'm from.";
    if (ja.includes('発明') || ja.includes('発見')) return "Genius, right? I love stuff like that.";
    if (ja.includes('当たり前')) return "Funny how what's normal is so different everywhere.";
    if (ja.includes('大事') || ja.includes('大切')) return "Couldn't agree more. That's so important.";
    if (ja.includes('残酷') || ja.includes('過酷') || ja.includes('厳しい')) return "Yeah, that's pretty intense. Not for the faint of heart.";
    if (ja.includes('自慢')) return "Ha, I mean, it is pretty impressive!";
    if (ja.includes('美しい') || ja.includes('きれい') || ja.includes('綺麗')) return "Gorgeous! I could look at that all day.";
    if (ja.includes('便利') || ja.includes('不便')) return "Right? It makes such a difference.";
    if (ja.includes('不思議') || ja.includes('謎')) return "Yeah, that's weird! I wonder why.";
    if (ja.includes('問題') || ja.includes('課題')) return "That's a real issue. Something needs to change.";
    if (ja.includes('やっぱり') || ja.includes('やはり')) return "See? I told you! It always comes back to that.";
    if (ja.includes('実は') || ja.includes('実際')) return "Wait, really?! I had no idea.";

    // Cross-cultural / カルチャーショック
    if (ja.includes('カルチャーショック') || ja.includes('慣れ')) return "Yeah, that takes time. You'll get there though.";
    if (ja.includes('宗教') || ja.includes('信仰') || ja.includes('クリスマス') && ja.includes('宗教')) return "That's a big topic! Everyone sees it differently.";
    if (ja.includes('チップ') || ja.includes('税')) return "I know, right? It gets confusing.";
    if (ja.includes('ジョーク') || ja.includes('冗談') || ja.includes('笑い') || ja.includes('白け')) return "Ha, humor is so different across cultures!";
    if (ja.includes('シエスタ') || ja.includes('閉まる') || ja.includes('休業')) return "Yeah, that's how it works here. Takes some getting used to.";
    if (ja.includes('養子') || ja.includes('家庭') || ja.includes('多様')) return "Times are changing. It's beautiful, honestly.";
    if (ja.includes('チャレンジ') || ja.includes('挑戦')) return "Go for it! What's the worst that can happen?";
    if (ja.includes('成長') || ja.includes('経験')) return "Exactly! That's how you grow.";
    if (ja.includes('制限') || ja.includes('ルール') || ja.includes('規則')) return "Oh, good to know! I'll keep that in mind.";
    if (ja.includes('名前') && ja.includes('呼')) return "Of course! Just call me whatever feels right.";
    if (ja.includes('持ち上げ') || ja.includes('マナー違反')) return "Oops, I didn't know that! Thanks for telling me.";
    if (ja.includes('言っちゃ') || ja.includes('言って') && ja.includes('いい')) return "Ha, that's a tricky one! Depends on the situation.";
    if (ja.includes('知らなかった') || ja.includes('初めて知')) return "Yeah, there's so much to learn! It's actually fun.";
    if (ja.includes('半年') || ja.includes('かかった') || ja.includes('時間がかか')) return "That sounds about right. Some things just take time.";
    if (ja.includes('めんどくさい') || ja.includes('面倒')) return "Tell me about it! But you get used to it.";
    if (ja.includes('不親切') || ja.includes('分かりにくい') || ja.includes('わかりにくい')) return "I know, right? They should really fix that.";

    // ── PHASE 2: Match on Scene english content ──

    if (en.includes('sorry') || en.includes('apologize') || en.includes('my fault')) return "Honestly, don't even worry about it. We're good.";
    if (en.includes('miss') && (en.includes('home') || en.includes('family'))) return "That's natural. It gets easier, I promise.";
    if (en.includes('actually') && en.includes('enjoy')) return "See? I knew you'd come around!";
    if (en.includes('first time')) return "Welcome! You're gonna love it.";
    if (en.includes('recommendation') || en.includes('suggest')) return "Oh, easy! You've gotta go with the signature dish.";
    if (en.includes('excuse me') || en.includes('pardon')) return "No worries! What can I do for you?";
    if (en.includes('can i') || en.includes('could i') || en.includes('may i')) return "Of course! Go right ahead.";
    if (en.includes('how about') || en.includes('what about') || en.includes('shall we')) return "I'm down! Let's do it.";
    if (en.includes('looking forward')) return "Same! It's gonna be great.";
    if (en.includes('worry') || en.includes('anxious') || en.includes('nervous')) return "Hey, relax. Everything's going to be fine.";
    if (en.includes('ready') || en.includes('prepared')) return "Born ready! Let's go.";
    if (en.includes('perfect') || en.includes('exactly')) return "Nailed it! Couldn't agree more.";
    if (en.includes('direction') || en.includes('turn left') || en.includes('turn right') || en.includes('go straight')) return "Got it! Thanks, I think I can find it now.";
    if (en.includes('cost') || en.includes('price') || en.includes('how much')) return "Let me check... it's about that much, yeah.";
    if (en.includes('introduce')) return "Nice to meet you! I've heard good things.";
    if (en.includes('hurry') || en.includes('rush') || en.includes('quick')) return "Yeah, we should get moving! Let's go.";
    if (en.includes('dream') || en.includes('goal') || en.includes('wish')) return "That's a great goal. You can totally do it.";
    if (en.includes('problem') || en.includes('trouble') || en.includes('issue')) return "Let me take a look. Maybe I can help.";
    if (en.includes('surprise')) return "No way! I did not see that coming!";
    if (en.includes('luck') || en.includes('lucky')) return "Fingers crossed! You got this.";
    if (en.includes('promise')) return "I'll hold you to that! Ha.";
    if (en.includes('secret')) return "Ooh, now you have to tell me. My lips are sealed.";
    if (en.includes('improve') || en.includes('getting better')) return "That's the spirit! Keep it up.";
    if (en.includes('crazy') || en.includes('insane')) return "Ha! Only you could pull that off.";
    if (en.includes('honest') || en.includes('truth')) return "I appreciate that. Seriously.";
    if (en.includes('agree')) return "One hundred percent. Could not agree more.";
    if (en.includes('idea')) return "Oh, that's actually genius. Let's try it.";
    if (en.includes('hope')) return "Me too! Keeping my fingers crossed.";
    if (en.includes('understand') || en.includes('get it')) return "Yeah, I totally get where you're coming from.";
    if (en.includes('remember')) return "Oh yeah! How could I forget?";
    if (en.includes('forget')) return "It happens! Don't beat yourself up.";
    if (en.includes('try') || en.includes('attempt')) return "Go for it! Nothing to lose, right?";
    if (en.includes('love')) return "Aw, that's sweet. You're the best.";
    if (en.includes('hate')) return "Yeah, I can see why. That's frustrating.";
    if (en.includes('think') || en.includes('wonder')) return "Hmm, good question. What do you think?";
    if (en.includes('help')) return "Of course! What do you need?";
    if (en.includes('wait')) return "No worries, take your time!";
    if (en.includes('know')) return "Oh really? Tell me more!";
    if (en.includes('want') || en.includes('need')) return "Say no more! Let's make it happen.";
    if (en.includes('like')) return "Me too! Great minds think alike.";
    if (en.includes('feel')) return "I hear you. That's totally valid.";
    if (en.includes('tell')) return "Go on, I'm listening!";
    if (en.includes('come') || en.includes('go')) return "Let's do it! I'm right behind you.";
    if (en.includes('see') || en.includes('look')) return "Oh wow, you're right! Good eye.";
    if (en.includes('hear') || en.includes('listen')) return "Yeah, I heard about that. Wild, right?";

    // ── PHASE 3: Deterministic fallback based on hash ──
    // These must be universally appropriate for any statement/opinion/observation
    const fallbacks = [
        "Yeah, totally! That's a great point.",
        "Ha, for real? That's interesting!",
        "Right? I was just thinking that.",
        "Oh yeah, that makes a lot of sense.",
        "Huh, I never thought about it that way!",
        "Ha, you're not wrong about that!",
        "Interesting! Tell me more about that.",
        "Yeah, I can totally see that.",
        "Oh wow, good to know!",
        "Ha, that's so true! Love it.",
        "You know what, you're absolutely right.",
        "Wait, really?! That's fascinating.",
        "Yeah, it's pretty wild when you think about it.",
        "Oh, for sure. I've noticed that too.",
        "Ha, that's a great way to put it!",
        "Wow, I had no idea! That's cool.",
    ];

    let hash = 0;
    for (let i = 0; i < japanese.length; i++) {
        hash = ((hash << 5) - hash) + japanese.charCodeAt(i);
        hash = hash & hash;
    }
    return fallbacks[Math.abs(hash) % fallbacks.length];
}
