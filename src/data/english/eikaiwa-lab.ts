// ============================================================
// 英会話Lab - DMM英会話戦略的レッスンプラン
// ============================================================

export type LessonCategory = 'casual' | 'opinion' | 'explain' | 'story' | 'debate';
export type Difficulty = 1 | 2 | 3;

export interface TargetExpression {
  en: string;
  jp: string;
  usage: string;
}

export interface LessonPlan {
  id: number;
  codename: string;
  theme_jp: string;
  theme_en: string;
  category: LessonCategory;
  difficulty: Difficulty;
  goal: string;
  briefing: string;
  target_expressions: TargetExpression[];
  talking_points: string[];
  secret_mission: string;
  tips: string;
  chatgpt_prompt: string;
}

export const CATEGORY_META: Record<LessonCategory, { label: string; color: string; bg: string }> = {
  casual:  { label: 'Casual Talk',   color: '#D4AF37', bg: 'rgba(212,175,55,0.08)' },
  opinion: { label: 'Opinion',       color: '#2563EB', bg: 'rgba(37,99,235,0.08)' },
  explain: { label: 'Explain',       color: '#10B981', bg: 'rgba(16,185,129,0.08)' },
  story:   { label: 'Storytelling',  color: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
  debate:  { label: 'Debate',        color: '#DC2626', bg: 'rgba(220,38,38,0.08)' },
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  1: 'WARM-UP',
  2: 'STANDARD',
  3: 'HARD MODE',
};

export const LESSON_PLANS: LessonPlan[] = [
  // ── SESSION 01 ──────────────────────────────────────────
  {
    id: 1,
    codename: 'ICEBREAKER KILLER',
    theme_jp: '自己紹介を武器にする',
    theme_en: 'Turn your self-intro into a weapon',
    category: 'casual',
    difficulty: 1,
    goal: '自己紹介を30秒で切り上げて、すぐ会話に転じる力',
    briefing:
      '毎回同じ自己紹介するのはもう終わり。「英語喋れないのに英語アプリ作ってる男」をネタにして、' +
      '相手を笑わせて会話を始めろ。自己紹介は30秒で切り上げて、すぐ質問に転じるのがコツ。' +
      '講師が話してる間に次の質問を準備しろ。',
    target_expressions: [
      { en: 'So basically...', jp: '要するに', usage: '説明の出だしに。堅くならない万能スターター' },
      { en: '...which is kinda ironic', jp: '皮肉だよね', usage: '自虐ネタに最適。笑いを取れる' },
      { en: 'What about you?', jp: 'あなたは？', usage: '話を振り返す最強の武器。沈黙の特効薬' },
      { en: "I've been into...", jp: '最近ハマってて', usage: '趣味の話への自然な橋渡し' },
      { en: 'Not gonna lie', jp: '正直なところ', usage: '本音を出す前の前置き。カジュアルで自然' },
    ],
    talking_points: [
      '"I build English learning apps but I can barely speak English" -- use this as your opener',
      '"What\'s the most interesting thing a student has told you?" -- flip the spotlight',
      '"What made you become an English teacher?" -- people love talking about their origin story',
    ],
    secret_mission: '自己紹介を30秒以内で終わらせて、残り24分30秒は質問と会話に使え。タイマーは脳内で。',
    tips: '講師に質問を多めにぶつけろ。質問する側が会話をコントロールしてる。受け身になるな。',
    chatgpt_prompt:
      "Let's practice casual conversation in English. I'm going to introduce myself briefly, then I want you to ask me follow-up questions to keep the conversation going. " +
      "Don't correct my grammar -- just respond naturally like a friend. " +
      "I want to practice using these phrases: 'So basically...', '...which is kinda ironic', 'What about you?', 'I've been into...', and 'Not gonna lie'. " +
      "Here's my intro: I'm Tonio. I build English learning apps, which is kinda ironic because I can barely speak English myself. What about you -- what do you do?",
  },

  // ── SESSION 02 ──────────────────────────────────────────
  {
    id: 2,
    codename: 'PITCH PERFECT',
    theme_jp: '自分のアプリを英語で売り込め',
    theme_en: 'Pitch your app to a non-engineer',
    category: 'explain',
    difficulty: 2,
    goal: '技術的なことを非エンジニアに伝える「翻訳力」',
    briefing:
      'お前が毎日作ってるアプリのことを、プログラミングゼロの人に説明しろ。' +
      '「Next.jsで...」は禁止。「毎日英語の表現が届いて、ゲームみたいに覚えられるアプリ」みたいに、' +
      '機能じゃなくて体験を語れ。相手の反応が薄かったら説明が下手なサイン。',
    target_expressions: [
      { en: 'Think of it like...', jp: '例えるなら', usage: '抽象→具体の最強ツール。アナロジーの入り口' },
      { en: 'The whole point is...', jp: '要は何がしたいかって言うと', usage: '核心を一発で突く' },
      { en: 'What makes it different is...', jp: '他と違うのは', usage: '差別化を語るときの定型' },
      { en: "It's kind of like... but for...", jp: '〇〇みたいなやつの△△版', usage: 'アナロジー。"It\'s like Duolingo but for speaking"' },
      { en: 'Does that make sense?', jp: '伝わってる？', usage: '理解確認。聞くだけで相手が安心する' },
    ],
    talking_points: [
      'Describe your app as a 30-second elevator pitch -- no tech jargon allowed',
      'What problem does it solve? Why does it need to exist?',
      'Why did YOU start building it? The personal story sells it.',
    ],
    secret_mission: '"Think of it like..." を3回使って、毎回違うアナロジーで攻めろ。3つ目が一番刺さるはず。',
    tips: '相手が "Oh interesting!" と言ったらそこを掘り下げろ。反応が薄いところは説明が下手なポイント。',
    chatgpt_prompt:
      "Pretend you know nothing about technology or programming. I'm going to pitch you my app -- it's an English learning platform I built. " +
      "Ask me questions like a curious non-tech person would. If I use any jargon or technical terms, say 'Wait, what does that mean?' " +
      "I want to practice using: 'Think of it like...', 'The whole point is...', 'What makes it different is...', 'It's kind of like... but for...', and 'Does that make sense?'. " +
      "Let me start: So I built this app that helps you learn English...",
  },

  // ── SESSION 03 ──────────────────────────────────────────
  {
    id: 3,
    codename: 'HOT TAKE FACTORY',
    theme_jp: '物議を醸す意見を堂々と言え',
    theme_en: 'Drop a hot take and defend it',
    category: 'opinion',
    difficulty: 2,
    goal: '意見を言う→理由を述べる→相手の反応に対応する 3ステップの体得',
    briefing:
      '「TOEICは無意味」「英語は文法から入るべきじゃない」「日本の英語教育は全部間違ってる」。' +
      'こういう強い意見をぶつけて議論する練習。大事なのは意見の中身じゃなくて、' +
      '意見を言う→守る→修正する、の流れを身体に染み込ませること。',
    target_expressions: [
      { en: 'Honestly, I think...', jp: '正直思うんだけど', usage: '意見表明の王道。"I think"より本気度が出る' },
      { en: "Here's the thing though", jp: 'でもね、ポイントは', usage: '反論や補足の前に。会話のギアチェンジ' },
      { en: 'I see what you mean, but...', jp: '言いたいことはわかるけど', usage: '最も丁寧な反論。相手を否定せず自分の意見を出す' },
      { en: "That's a fair point", jp: 'それは確かに', usage: '相手の意見を認める。これを言える人は強い' },
      { en: 'I might be wrong, but...', jp: '間違ってるかもだけど', usage: 'ヘッジング。自信なさげに見えて実は主張を強める' },
    ],
    talking_points: [
      '"TOEIC is completely useless for real English ability" -- defend this',
      '"Learning grammar rules actually kills your speaking ability" -- hot take',
      '"AI will make language learning totally unnecessary in 5 years" -- argue for or against',
    ],
    secret_mission: '講師の意見に最低1回 "I totally disagree" と言ってから、丁寧に理由を述べろ。強く出てから柔らかく着地。',
    tips: '反論されても焦るな。"That\'s a fair point" で一回受け止めてから、自分の意見に戻れ。認める→返す、のリズム。',
    chatgpt_prompt:
      "Let's have a debate. I'm going to drop a hot take, and I want you to push back hard. Disagree with me, challenge my reasoning, play devil's advocate. " +
      "Don't correct my English -- just argue back naturally. " +
      "I want to practice: 'Honestly, I think...', 'Here's the thing though', 'I see what you mean, but...', 'That's a fair point', and 'I might be wrong, but...'. " +
      "Here's my hot take: I think TOEIC is completely useless for learning real English. What do you think?",
  },

  // ── SESSION 04 ──────────────────────────────────────────
  {
    id: 4,
    codename: 'PLOT TWIST',
    theme_jp: '最悪の失敗を笑い話にしろ',
    theme_en: 'Turn your worst fail into a killer story',
    category: 'story',
    difficulty: 2,
    goal: '過去形の自然な運用 + ストーリーテリングの構造（導入→展開→オチ）',
    briefing:
      '仕事の失敗、日常のやらかし、恥ずかしい経験。なんでもいい。大事なのはオチをつけること。' +
      '英語の面白い話は「setup → build-up → punchline」の構造。日本語の「つかみ→フリ→オチ」と同じ。' +
      'オチまで言わずに溜めて落とせ。',
    target_expressions: [
      { en: 'So this one time...', jp: 'あのさ、一回ね', usage: '話の出だし。これだけでストーリーモードに入れる' },
      { en: 'And I was like...', jp: 'で、俺は〇〇って感じで', usage: '自分のリアクション描写。臨場感が出る' },
      { en: 'You know what the worst part was?', jp: '一番ヤバかったのがさ', usage: '盛り上げポイント。聞き手の注意を引きつける' },
      { en: 'I literally...', jp: 'マジで〇〇した', usage: '強調。ただし使いすぎると効果が薄れる' },
      { en: 'Long story short', jp: '端的に言うと', usage: '話を巻く時に。長くなりすぎた時の救済' },
    ],
    talking_points: [
      'A time you broke something at work -- deleted a database, crashed a server, shipped a bug',
      'Your most embarrassing language mistake in English or Japanese',
      'The single worst day you\'ve had in the last year -- what happened?',
    ],
    secret_mission: '話の途中で "And guess what happened next?" と言って講師に予想させろ。予想を外すのがオチの快感。',
    tips: '全部言わない。「最後にどうなったと思う？」で相手を巻き込んでから落とせ。',
    chatgpt_prompt:
      "I'm going to tell you a funny story about something that went wrong. Your job is to be an engaged listener -- react, laugh, ask 'and then what?', and try to guess what happened next. " +
      "Don't correct my English. Just be a good audience. " +
      "I want to practice: 'So this one time...', 'And I was like...', 'You know what the worst part was?', 'I literally...', and 'Long story short'. " +
      "OK so this one time at work...",
  },

  // ── SESSION 05 ──────────────────────────────────────────
  {
    id: 5,
    codename: 'LOST IN TRANSLATION',
    theme_jp: '日本の「空気を読む」を説明しろ',
    theme_en: 'Explain "reading the air" to a foreigner',
    category: 'explain',
    difficulty: 3,
    goal: '抽象的な文化概念を具体例で伝える力。翻訳不能な概念の橋渡し',
    briefing:
      '「空気を読む」「察する」「本音と建前」「遠慮」。日本人には当たり前だけど外国人には意味不明な概念を、' +
      '具体的なシチュエーションで説明しろ。定義を言うんじゃなくて、' +
      '「例えばこういう場面で...」で攻めろ。抽象→具体→確認のサイクル。',
    target_expressions: [
      { en: "It's hard to explain, but...", jp: '説明しにくいんだけど', usage: '前置き。これ自体が「難しい概念です」というシグナル' },
      { en: 'Let me give you an example', jp: '例を出すとね', usage: '抽象→具体への転換点。説明上手の必須スキル' },
      { en: 'The closest thing in English would be...', jp: '英語で一番近いのは', usage: '翻訳不能な概念を橋渡しする時に' },
      { en: "It's not exactly... it's more like...", jp: '正確には違くて、もっと', usage: 'ニュアンスの微調整。精度を上げる' },
      { en: 'You know how in your culture...', jp: 'あなたの文化だと〇〇でしょ？', usage: '比較からの説明。相手の経験に接続する' },
    ],
    talking_points: [
      '"Reading the air" -- when everyone at a dinner wants to leave but nobody says it',
      '"Honne and tatemae" -- what you really think vs what you actually say at work',
      'Why Japanese people say "maybe" or "it\'s a little difficult" when they mean "absolutely no"',
    ],
    secret_mission: '講師の国の似た文化習慣を1つ引き出せ。"Do you have anything similar in your country?"',
    tips: '抽象的な説明→具体例→「伝わった？」の確認、を繰り返せ。1回で伝わらなくて当然。',
    chatgpt_prompt:
      "Pretend you're an American who has never been to Japan and doesn't know much about Japanese culture. I'm going to try to explain some Japanese cultural concepts that are really hard to translate. " +
      "Ask genuine questions when you don't understand. Say things like 'So it's like...?' to check your understanding. " +
      "I want to practice: 'It's hard to explain, but...', 'Let me give you an example', 'The closest thing in English would be...', 'It's not exactly... it's more like...', and 'You know how in your culture...'. " +
      "Let me start with this one: In Japan, we have this concept called 'reading the air'...",
  },

  // ── SESSION 06 ──────────────────────────────────────────
  {
    id: 6,
    codename: 'FOOD FIGHT',
    theme_jp: 'コンビニ飯 vs 高級レストラン',
    theme_en: 'Convenience store food is better than restaurants',
    category: 'debate',
    difficulty: 1,
    goal: '立場を決めて主張→根拠→再反論のリズムを体に覚えさせる',
    briefing:
      '「日本のコンビニ飯はその辺のレストランより美味い」を本気で主張しろ。' +
      'バカバカしいテーマほど練習になる。大事なのは勝つことじゃなくて、' +
      '主張→根拠→再反論のリズムを身体に覚えさせること。講師が正しくても認めるな（練習だから）。',
    target_expressions: [
      { en: "Here's why I think that", jp: 'なぜかって言うとね', usage: '根拠を出す前のセットアップ' },
      { en: 'First of all... On top of that...', jp: 'まず / それに加えて', usage: '論点を積み重ねる。説得力が倍増' },
      { en: 'But have you considered...', jp: 'でもこう考えたことある？', usage: '切り返し。攻守交代の合図' },
      { en: 'I get that, but...', jp: 'それはわかるけど', usage: '譲歩→反論。最も使える接続パターン' },
      { en: 'At the end of the day...', jp: '結局のところ', usage: '結論に持っていく。議論の着地点' },
    ],
    talking_points: [
      'Japanese konbini onigiri and sandwiches vs a $30 restaurant meal -- which is actually better?',
      'Price, consistency, convenience, availability -- build your case',
      'Ask teacher: "What\'s the best cheap food in your country?"',
    ],
    secret_mission: '"At the end of the day..." で3回まとめを試みろ。3回とも違う角度で。',
    tips: '"I get that, but..." を反射的に出せるようになれば、どんな議論でも詰まらなくなる。',
    chatgpt_prompt:
      "Let's have a fun debate. I'm going to argue that Japanese convenience store food is better than most restaurants. You defend restaurants. " +
      "Be passionate! Push back on my points. Don't correct my English -- just debate naturally. " +
      "I want to practice: 'Here's why I think that', 'First of all... On top of that...', 'But have you considered...', 'I get that, but...', and 'At the end of the day...'. " +
      "I'll start: Honestly, I think a 7-Eleven onigiri beats most restaurant meals. Here's why I think that...",
  },

  // ── SESSION 07 ──────────────────────────────────────────
  {
    id: 7,
    codename: 'ELI5',
    theme_jp: 'AIを5歳児に説明しろ',
    theme_en: 'Explain AI without using a single tech word',
    category: 'explain',
    difficulty: 2,
    goal: '専門用語ゼロで複雑な概念を伝える「簡略化力」',
    briefing:
      'ChatGPT、バイブコーディング、機械学習。毎日触ってるものを、' +
      'テクノロジーを全く知らない人に説明しろ。' +
      '「ニューラルネットワーク」とか言った瞬間負け。子供でもわかる言葉だけで勝負。' +
      'アナロジーが命。',
    target_expressions: [
      { en: 'Imagine you have a...', jp: '例えば〇〇があるとして', usage: 'アナロジーの入り口。想像させることで理解を促す' },
      { en: 'What it basically does is...', jp: '要は何するかっていうと', usage: '一文で核心を突く簡潔な説明' },
      { en: 'You know how your phone can...', jp: 'スマホで〇〇できるでしょ？あれ', usage: '身近な例から入る。誰でもわかる起点' },
      { en: 'The cool part is...', jp: '面白いのはさ', usage: '興味を引く。説明が一方通行にならない' },
      { en: "It sounds complicated but it's actually pretty simple", jp: '難しそうだけど実は簡単', usage: '聞き手の心理的ハードルを下げる' },
    ],
    talking_points: [
      'Explain what AI is to someone who has never used a computer',
      'Explain what you do for a living to your grandma',
      '"Vibe coding" -- explain this concept without any programming jargon',
    ],
    secret_mission: '専門用語を1回も使わずに25分乗り切れ。algorithm, database, framework, API 全部禁止。',
    tips: '「It\'s like...」のアナロジーを武器にしろ。「AIは超賢い犬みたいなもの。教えたことは覚えるけど、自分で考えてるわけじゃない」みたいに。',
    chatgpt_prompt:
      "Pretend you're my grandma who doesn't know what a computer is. I'm going to explain AI and what I do for work using only simple words. " +
      "If I accidentally use any technical term like 'algorithm', 'database', 'API', or 'framework', stop me and say 'Honey, what does that mean?' " +
      "I want to practice: 'Imagine you have a...', 'What it basically does is...', 'You know how your phone can...', 'The cool part is...', and 'It sounds complicated but it's actually pretty simple'. " +
      "OK grandma, let me tell you what I do at work. Imagine you have a really smart helper...",
  },

  // ── SESSION 08 ──────────────────────────────────────────
  {
    id: 8,
    codename: 'SPORTS BAR',
    theme_jp: '野球を熱く語れ',
    theme_en: 'Talk sports like you\'re at a bar',
    category: 'casual',
    difficulty: 1,
    goal: '感情を込めて話す練習。熱量がある時、英語は自然に出る',
    briefing:
      '好きなスポーツを語るのは英会話の最高の練習。なぜなら「感情」が入るから。' +
      '感情が入ると自然にフレーズが出てくる。' +
      '講師が野球を知らなくても関係ない。お前の熱量を伝えろ。情熱は言語を超える。',
    target_expressions: [
      { en: "I'm a huge fan of...", jp: '〇〇の大ファンで', usage: '入り口。ここから熱量を上げていく' },
      { en: "They totally should've...", jp: '絶対〇〇すべきだった', usage: '後知恵批評。スポーツトークの華' },
      { en: 'What drives me crazy is...', jp: 'イラつくのがさ', usage: '感情を出す。これが言えると会話が生きる' },
      { en: 'No way that was...', jp: 'あれが〇〇なわけない', usage: '否定の強調。判定への不満など' },
      { en: "I'm telling you...", jp: 'マジで言うけど', usage: '確信を持って語る時の前置き' },
    ],
    talking_points: [
      'Your favorite team and WHY -- not just "I like them", tell the story',
      'A game you will never forget -- describe it like you\'re reliving it',
      'If you were the manager, what would you change?',
    ],
    secret_mission: '講師が野球を知らなくても、レッスン終わりに「ちょっと見てみようかな」と思わせたら勝ち。',
    tips: '感情込めろ。棒読みで "They should have traded him" じゃなくて、"They SHOULD\'VE traded him!" と力を入れて。声のトーンも英語。',
    chatgpt_prompt:
      "Let's talk about sports like we're at a bar. I'm going to talk passionately about baseball -- even if you don't know much about it, just go with it. " +
      "React to what I say, ask follow-up questions, share opinions. Match my energy! " +
      "I want to practice: 'I'm a huge fan of...', 'They totally should've...', 'What drives me crazy is...', 'No way that was...', and 'I'm telling you...'. " +
      "Dude, I'm telling you, the Mariners are going to be insane this year...",
  },

  // ── SESSION 09 ──────────────────────────────────────────
  {
    id: 9,
    codename: 'CRITIC MODE',
    theme_jp: '映画レビュー30秒チャレンジ',
    theme_en: '30-second movie review -- no "good" or "interesting" allowed',
    category: 'story',
    difficulty: 2,
    goal: '簡潔に要点を伝える力。形容詞のバリエーション拡張',
    briefing:
      '最近見た映画、ドラマ、アニメを30秒でレビューしろ。' +
      '「It was good」「It was interesting」禁止。もっと具体的な形容詞を使え。' +
      '30秒で「何が」「なぜ」良かったor悪かったかを伝える練習。短く、鋭く。',
    target_expressions: [
      { en: 'It blew my mind', jp: '衝撃だった', usage: '"good"より100倍インパクトがある。感動を伝える最強フレーズ' },
      { en: 'The thing that got me was...', jp: 'グッときたのは', usage: '感動ポイントを特定する。具体的に語れる' },
      { en: "It's one of those movies where...", jp: 'あの系の映画で', usage: 'カテゴライズ。相手にジャンルを掴ませる' },
      { en: "If you're into..., you'd love it", jp: '〇〇好きならハマる', usage: 'おすすめの定型。相手の好みに合わせて推す' },
      { en: "I couldn't stop watching", jp: '止まらなかった', usage: '中毒性を表現。シンプルだけど伝わる' },
    ],
    talking_points: [
      'Review something you watched recently -- you have 30 seconds. Timer starts NOW.',
      'The worst movie you\'ve ever seen -- tear it apart',
      'Recommend something to your teacher based on what THEY like, not what you like',
    ],
    secret_mission: '"good", "interesting", "nice" 使用禁止。もっと具体的な形容詞だけで25分。',
    tips: '"It was good because..." じゃなくて "The thing that got me was..." で入れ。具体性が説得力。',
    chatgpt_prompt:
      "Let's take turns reviewing movies and shows. I'll review something, then you review something. " +
      "Important rule: neither of us can use the words 'good', 'interesting', or 'nice'. Use more specific words. If I accidentally say one of those, call me out! " +
      "I want to practice: 'It blew my mind', 'The thing that got me was...', 'It's one of those movies where...', 'If you're into..., you'd love it', and 'I couldn't stop watching'. " +
      "OK I'll go first. So I just finished watching...",
  },

  // ── SESSION 10 ──────────────────────────────────────────
  {
    id: 10,
    codename: 'TIME MACHINE',
    theme_jp: '10年前の自分にアドバイス',
    theme_en: 'What would you tell your younger self?',
    category: 'opinion',
    difficulty: 2,
    goal: '仮定法（would / could / should have）の自然な運用',
    briefing:
      '10年前の自分にアドバイスするなら何を言う？英語？キャリア？生活？' +
      '仮定法は日本人が一番苦手な文法の一つ。でも「もし〇〇だったら」って誰でも考えるシチュエーション。' +
      '文法書じゃなくて実戦で身体に入れろ。',
    target_expressions: [
      { en: 'If I could go back...', jp: '戻れるなら', usage: '仮定法の鉄板入り口。ここから展開する' },
      { en: "I should've...", jp: '〇〇すべきだった', usage: '後悔の表現。過去の選択を振り返る時に' },
      { en: "Looking back, I wish I'd...", jp: '振り返ると、〇〇してればなあ', usage: '回想モード。深い会話になる' },
      { en: "I wouldn't change... though", jp: 'でも〇〇は変えない', usage: 'バランス。後悔だけじゃなくて肯定も入れる' },
      { en: 'What would you tell your younger self?', jp: '若い自分に何て言う？', usage: '逆質問。講師にも考えさせる' },
    ],
    talking_points: [
      'Career advice to your 20-year-old self -- what would you do differently?',
      '"Start speaking English from day one" -- how would your life be different now?',
      'One thing you would absolutely NOT change, no matter what',
    ],
    secret_mission: '"I should\'ve" と "I wish I\'d" を合計5回、自然な文脈で使え。数えろ。',
    tips: '後悔だけ語ると暗くなる。「でもあの経験があったから今がある」も入れると会話に奥行きが出る。',
    chatgpt_prompt:
      "Let's have a deep conversation about life. We're both going to imagine we could go back in time 10 years and talk to our younger selves. " +
      "Share your own 'advice to younger me' too so it feels like a real conversation, not an interview. " +
      "I want to practice: 'If I could go back...', 'I should've...', 'Looking back, I wish I'd...', 'I wouldn't change... though', and 'What would you tell your younger self?'. " +
      "If I could go back 10 years, the first thing I'd say is...",
  },

  // ── SESSION 11 ──────────────────────────────────────────
  {
    id: 11,
    codename: 'CASTAWAY',
    theme_jp: '無人島に3つ持っていくなら',
    theme_en: 'Desert island -- 3 items, defend your choices',
    category: 'casual',
    difficulty: 1,
    goal: '選択を正当化する力。"because"以外の接続を増やす',
    briefing:
      '定番トピックだけど、実は「理由を説明する」最高の練習。' +
      '「スマホ」って言ったら「電波ないけど？」って突っ込まれる。そこでどう返すか。' +
      '理由→反論→再理由のラリーが自然に生まれる。ありきたりな答えは禁止。',
    target_expressions: [
      { en: 'The reason I\'d pick... is...', jp: '〇〇を選ぶ理由は', usage: '選択の正当化。構造的に理由を述べる' },
      { en: 'Not because of... but because...', jp: '〇〇じゃなくて、△△だから', usage: '理由の修正・明確化。精度が上がる' },
      { en: "That's actually a good point, let me rethink", jp: '確かに、考え直すわ', usage: '柔軟さの表現。意見を変えられる人は強い' },
      { en: "I didn't think of that", jp: 'それは考えなかった', usage: '素直な反応。会話が自然になる' },
      { en: 'OK hear me out...', jp: 'ちょっと聞いて', usage: '突拍子もない提案の前に。注意を引きつける' },
    ],
    talking_points: [
      'Your 3 items -- but "knife" and "water filter" are too boring. Be creative.',
      'What single SKILL would be most useful on a desert island?',
      'If you could bring one person (alive or dead), who and why?',
    ],
    secret_mission: '"OK hear me out..." で講師に明らかにヤバい選択肢を真剣にプレゼンしろ。笑わせたら勝ち。',
    tips: 'ありきたりな答え（水、ナイフ、火）を避けろ。面白い選択肢の方が100%会話が弾む。',
    chatgpt_prompt:
      "Desert island game! We each pick 3 items to bring to a desert island, and we have to defend our choices. " +
      "Challenge my picks! If I pick something boring like 'water' or 'knife', tell me that's too boring and make me choose something more creative. " +
      "I want to practice: 'The reason I'd pick... is...', 'Not because of... but because...', 'That's actually a good point, let me rethink', 'I didn't think of that', and 'OK hear me out...'. " +
      "OK hear me out -- my first pick is going to sound crazy...",
  },

  // ── SESSION 12 ──────────────────────────────────────────
  {
    id: 12,
    codename: 'MYTH BUSTER',
    theme_jp: '外国人の日本への誤解を正せ',
    theme_en: 'Bust the top 5 myths about Japan',
    category: 'debate',
    difficulty: 2,
    goal: '訂正・修正の表現を自然に使いこなす。全否定じゃなくて部分修正。',
    briefing:
      '「日本人はみんな寿司好き」「東京は超安全」「日本語に主語はない」。' +
      '外国人の誤解を丁寧に、でも明確に正す練習。' +
      'ポイントは「否定」じゃなくて「修正」。相手を不快にさせずに事実を伝える技術。',
    target_expressions: [
      { en: "Actually, it's a bit different", jp: '実はちょっと違くて', usage: '柔らかい訂正の入り口。攻撃的にならない' },
      { en: "That's a common misconception", jp: 'よくある誤解なんだけど', usage: '一般化。「あなたが」じゃなくて「みんな」が間違ってる' },
      { en: "It's true that... but...", jp: '確かに〇〇だけど', usage: '部分肯定→修正。最も丁寧な訂正パターン' },
      { en: 'A better way to think about it is...', jp: 'もっと正確に言うと', usage: '否定じゃなくて代替案を提示。建設的' },
      { en: 'From my experience...', jp: '俺の経験だと', usage: '個人の視点から語る。押し付けにならない' },
    ],
    talking_points: [
      '"All Japanese people work insane hours" -- how true is this really?',
      '"Japan is the safest country in the world" -- the nuances nobody talks about',
      'Ask your teacher: "What\'s the biggest thing that surprised you about Japan?"',
    ],
    secret_mission: '"That\'s a common misconception" を自然に2回使え。3回使えたらボーナスポイント。',
    tips: '全否定するより "It\'s true that... but..." で部分的に認めてから修正。これが大人の英語。',
    chatgpt_prompt:
      "You're a foreigner who has some common misconceptions about Japan. Bring up stereotypes like 'Everyone in Japan eats sushi every day', 'Tokyo is super dangerous', 'Japanese people work 20 hours a day', etc. " +
      "I'll politely correct you. Be genuinely curious and keep asking follow-up questions. " +
      "I want to practice: 'Actually, it's a bit different', 'That's a common misconception', 'It's true that... but...', 'A better way to think about it is...', and 'From my experience...'. " +
      "Go ahead, hit me with your first assumption about Japan!",
  },

  // ── SESSION 13 ──────────────────────────────────────────
  {
    id: 13,
    codename: 'LIFE HACK SHOW',
    theme_jp: '生活の裏技をプレゼンしろ',
    theme_en: 'Present your best life hacks',
    category: 'explain',
    difficulty: 1,
    goal: '手順・方法の説明力。命令形とシーケンスマーカーの習得',
    briefing:
      '料理のコツ、掃除の裏技、仕事の効率化、なんでもいい。' +
      '「こうするといいよ」を英語で伝える練習。日本語だと「〇〇して、△△して」と並べるだけだけど、' +
      '英語はつなぎ言葉とステップ表現が命。相手に「やってみたい」と思わせたら成功。',
    target_expressions: [
      { en: 'What you wanna do is...', jp: '何するかっていうと', usage: '手順説明の出だし。カジュアルで自然' },
      { en: 'The trick is...', jp: 'コツは', usage: '秘訣・ポイントを伝える。これで注目を集める' },
      { en: 'Once you do that, then...', jp: 'それやったら次に', usage: 'ステップ接続。流れを作る' },
      { en: 'Trust me, it works', jp: 'マジで効くから', usage: '説得のクロージング。自信を持って言え' },
      { en: 'Game changer', jp: '革命的 / 世界変わる', usage: '結果の強調。一言で価値を伝える' },
    ],
    talking_points: [
      'A cooking shortcut you discovered -- be specific (not "cook better", but "make eggs fluffy")',
      'A productivity hack that actually changed your workflow',
      'The weirdest life hack you found on the internet -- does it actually work?',
    ],
    secret_mission: '講師から "I\'ll try that!" か "That\'s a good idea!" を引き出せ。本気で実践させろ。',
    tips: '具体的に語れ。「料理が上手くなる」じゃなくて「卵焼きが3倍ふわふわになる」。具体性が説得力。',
    chatgpt_prompt:
      "I'm going to share some life hacks and tips with you, and you share yours too. Make it a back-and-forth -- I share one, you share one. " +
      "If my hack sounds useful, say 'I'll try that!' If it sounds weird, push back. " +
      "I want to practice: 'What you wanna do is...', 'The trick is...', 'Once you do that, then...', 'Trust me, it works', and 'Game changer'. " +
      "OK so I've got this life hack that's a total game changer. What you wanna do is...",
  },

  // ── SESSION 14 ──────────────────────────────────────────
  {
    id: 14,
    codename: 'TINFOIL HAT',
    theme_jp: 'くだらない陰謀論を真剣に議論しろ',
    theme_en: 'Defend an absurd conspiracy theory with a straight face',
    category: 'debate',
    difficulty: 3,
    goal: '推測・仮説の表現。ヘッジングと反論の高度な練習',
    briefing:
      '「鳥は政府のドローン」「フィンランドは存在しない」「猫は宇宙人のスパイ」。' +
      'バカバカしい陰謀論を大真面目に議論しろ。' +
      '笑えるテーマでも推測表現は超実用的。仕事のプレゼンでも使う表現ばかり。',
    target_expressions: [
      { en: 'What if I told you...', jp: 'もし俺が〇〇って言ったら', usage: '挑発的な入り。プレゼンの掴みにも使える' },
      { en: 'Think about it...', jp: '考えてみろよ', usage: '相手を引き込む。間を作って考えさせる' },
      { en: "There's no proof that it's NOT true", jp: '嘘だって証拠もないだろ', usage: '逆転の論法。論理のトリック' },
      { en: "I'm not saying... I'm just saying...", jp: '断言してない、ただ言ってるだけ', usage: '逃げ道の確保。責任回避しながら主張する技' },
      { en: 'Coincidence? I think not.', jp: '偶然？いや違うね', usage: '決め台詞。ドラマチックに締める' },
    ],
    talking_points: [
      '"Birds aren\'t real" -- present the evidence. Make it convincing.',
      'Why do ALL convenience stores worldwide play the same kind of music? Explain.',
      'Pick any ridiculous theory and defend it for 3 straight minutes without laughing',
    ],
    secret_mission: '講師を5秒でも「え、マジで...？」と疑わせたら大勝利。真顔で。笑ったら負け。',
    tips: 'これはプレゼン力の練習。真顔で馬鹿なことを論理的に語る能力は、仕事でも最強のスキル。',
    chatgpt_prompt:
      "We're going to debate a completely absurd conspiracy theory as if it's real. You have to take it seriously too -- no laughing, no breaking character. " +
      "I'll present my theory, you either support it with more 'evidence' or try to debunk it. Either way, keep a straight face. " +
      "I want to practice: 'What if I told you...', 'Think about it...', 'There's no proof that it's NOT true', 'I'm not saying... I'm just saying...', and 'Coincidence? I think not.' " +
      "OK, what if I told you that birds aren't real? Think about it...",
  },

  // ── SESSION 15 ──────────────────────────────────────────
  {
    id: 15,
    codename: 'FUTURE SELF',
    theme_jp: '5年後の俺はどうなってる？',
    theme_en: 'Where will you be in 5 years?',
    category: 'opinion',
    difficulty: 2,
    goal: '未来表現の使い分け。plan（計画）/ hope（希望）/ think（予測）の違い',
    briefing:
      '5年後にどうなっていたいか。アプリはどうなってる？英語力は？仕事は？' +
      '「will」「going to」「hope to」「plan to」の微妙な違いを実戦で掴め。' +
      '計画と希望と予測は全部違うニュアンス。使い分けられたら上級者。',
    target_expressions: [
      { en: "I'm planning to...", jp: '計画してるのは', usage: '確実な予定。「やる」と決めてること' },
      { en: "Ideally, I'd...", jp: '理想を言えば', usage: '希望・理想。現実とのギャップを意識してる' },
      { en: 'Realistically though...', jp: '現実的には', usage: '理想→現実の切り替え。大人の会話に必須' },
      { en: 'I have no idea, but...', jp: '全然わかんないけど', usage: '不確実さの表現。正直さが信頼を生む' },
      { en: 'Where do you see yourself in...?', jp: '〇〇年後はどうなってる？', usage: '逆質問。講師にも将来を語らせる' },
    ],
    talking_points: [
      'Your English app in 5 years -- what does success look like?',
      'Your English speaking ability -- where do you realistically think you\'ll be?',
      'The one thing you\'re most excited about for the future',
    ],
    secret_mission: '"Realistically though..." で自分の夢を一回冷静に否定してから、もう一回熱く語り直せ。ギャップが面白い。',
    tips: '"I\'m planning to" = 確定 / "I hope to" = 願望 / "I think I\'ll" = 予測。この3つを意識的に使い分けろ。',
    chatgpt_prompt:
      "Let's talk about the future -- where we see ourselves in 5 years. This is a real conversation, not an interview, so share your own future plans too. " +
      "Push me to be specific. If I say something vague like 'I want to be successful', ask 'What does that actually look like?' " +
      "I want to practice: 'I'm planning to...', 'Ideally, I'd...', 'Realistically though...', 'I have no idea, but...', and 'Where do you see yourself in...?'. " +
      "So I've been thinking about where I'll be in 5 years. I'm planning to...",
  },
];
