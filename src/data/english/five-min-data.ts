// ─── 5-Minute Daily English: Survival 50 ─────────────────────
// 10 days x 5 phrases + 1 conversation scene per day
// Rotates every 10 days. Repetition is the point.

export interface SurvivalPhrase {
  english: string;
  japanese: string;
  tip: string;
}

export interface ConvoChoice {
  text: string;
  vibe: string;
}

export interface ConvoExchange {
  speaker: string;
  line: string;
  lineJa: string;
  choices: ConvoChoice[];
}

export interface DailyLesson {
  day: number;
  theme: string;
  themeJa: string;
  label: string;
  phrases: SurvivalPhrase[];
  conversation: {
    setting: string;
    exchanges: ConvoExchange[];
  };
}

export const DAILY_LESSONS: DailyLesson[] = [
  // ─── Day 1: Coffee Shop ─────────────────────────────────
  {
    day: 1,
    theme: 'Ordering Coffee',
    themeJa: 'カフェで注文',
    label: 'CAFE',
    phrases: [
      {
        english: 'Can I get a latte?',
        japanese: 'ラテもらえますか？',
        tip: 'Can I get... で何でも頼める。覚えるフレーズはこれ1個でいい',
      },
      {
        english: 'A medium, please.',
        japanese: 'Mサイズで。',
        tip: 'サイズ聞かれたらこれ。please つけとけば間違いない',
      },
      {
        english: 'For here, thanks.',
        japanese: '店内で。',
        tip: '持ち帰りなら "To go" に変えるだけ',
      },
      {
        english: "That's it.",
        japanese: '以上です。',
        tip: '"Anything else?" って聞かれたらこれ一発',
      },
      {
        english: 'Keep the change.',
        japanese: 'おつりいらないです。',
        tip: 'チップ文化の基本。小銭のとき使う',
      },
    ],
    conversation: {
      setting: 'カフェ。朝の通勤前。列に並んでたら自分の番が来た。',
      exchanges: [
        {
          speaker: 'Barista',
          line: "Hey! What can I get ya?",
          lineJa: 'いらっしゃい！何にする？',
          choices: [
            { text: 'Can I get a latte?', vibe: 'ストレート' },
            { text: "Uh, I'll have a latte, please.", vibe: 'ちょい丁寧' },
            { text: 'A latte, please.', vibe: '最小限' },
          ],
        },
        {
          speaker: 'Barista',
          line: 'What size?',
          lineJa: 'サイズは？',
          choices: [
            { text: 'Medium, please.', vibe: '定番' },
            { text: "A medium's good.", vibe: 'カジュアル' },
            { text: 'Just a regular.', vibe: 'アメリカ風' },
          ],
        },
        {
          speaker: 'Barista',
          line: 'For here or to go?',
          lineJa: '店内？持ち帰り？',
          choices: [
            { text: 'For here, thanks.', vibe: '丁寧' },
            { text: "I'll have it here.", vibe: 'フルセンテンス' },
            { text: "Here's fine.", vibe: 'サクッと' },
          ],
        },
      ],
    },
  },

  // ─── Day 2: Meeting Someone ─────────────────────────────
  {
    day: 2,
    theme: 'Meeting Someone',
    themeJa: '初対面',
    label: 'MEET',
    phrases: [
      {
        english: 'Nice to meet you.',
        japanese: 'はじめまして。',
        tip: '鉄板。これ言えないと何も始まらない',
      },
      {
        english: 'What do you do?',
        japanese: '仕事は何してるの？',
        tip: '直訳は「何するの？」だけど意味は「職業は？」',
      },
      {
        english: 'Where are you from?',
        japanese: 'どこ出身？',
        tip: '世界中どこでも使える万能質問。必ず聞かれるし聞ける',
      },
      {
        english: 'How long have you been here?',
        japanese: 'どのくらいここにいるの？',
        tip: '旅行者にも在住者にも使える。会話が広がる',
      },
      {
        english: 'It was great talking to you.',
        japanese: '話せてよかった。',
        tip: '別れ際にこれ言えると印象が全然違う',
      },
    ],
    conversation: {
      setting: '友達の家パーティー。知らない人に話しかけられた。',
      exchanges: [
        {
          speaker: 'Stranger',
          line: "Hey, I'm Alex. I don't think we've met?",
          lineJa: 'ねえ、Alexだよ。初めまして？',
          choices: [
            { text: "Hi, I'm Tonio. Nice to meet you.", vibe: '王道' },
            { text: "Oh hey! I'm Tonio. Nice to meet you!", vibe: 'フレンドリー' },
            { text: "Nice to meet you! I'm Tonio.", vibe: '順番逆パターン' },
          ],
        },
        {
          speaker: 'Alex',
          line: "So what do you do? Are you in tech or something?",
          lineJa: '仕事何してるの？IT系？',
          choices: [
            { text: "Yeah, I'm a web developer.", vibe: 'シンプル' },
            { text: "Something like that. I build websites.", vibe: 'ゆるめ' },
            { text: "I do web stuff. How about you?", vibe: '質問返し' },
          ],
        },
        {
          speaker: 'Alex',
          line: "Oh cool! How long have you been doing that?",
          lineJa: 'いいね！どのくらいやってるの？',
          choices: [
            { text: "About three years now.", vibe: 'ストレート' },
            { text: "Not that long, actually. Maybe three years?", vibe: '謙遜入り' },
            { text: "A few years. Still learning though.", vibe: '正直' },
          ],
        },
      ],
    },
  },

  // ─── Day 3: Reacting ────────────────────────────────────
  {
    day: 3,
    theme: 'Reacting to Stories',
    themeJa: 'リアクション',
    label: 'REACT',
    phrases: [
      {
        english: 'No way!',
        japanese: 'まじで！',
        tip: '驚いた時の第一声。これだけでネイティブっぽくなる',
      },
      {
        english: "That's crazy.",
        japanese: 'やばいな。',
        tip: 'いい意味でも悪い意味でも使える万能リアクション',
      },
      {
        english: 'I know, right?',
        japanese: 'だよね！',
        tip: '共感の最強フレーズ。略して "I know" だけでもOK',
      },
      {
        english: 'Makes sense.',
        japanese: 'なるほどね。',
        tip: '相手の説明を理解した時。相槌として最高',
      },
      {
        english: 'Tell me about it.',
        japanese: 'ほんとそれ。',
        tip: '直訳は「教えて」だけど実際は「激しく同意」の意味',
      },
    ],
    conversation: {
      setting: '友達とランチ。友達が最近あった出来事を話してる。',
      exchanges: [
        {
          speaker: 'Friend',
          line: "Dude, I just found out my rent is going up 20% next month.",
          lineJa: 'やばい、来月から家賃20%上がるって。',
          choices: [
            { text: "No way! That's insane.", vibe: '驚き全開' },
            { text: "That's crazy. Are you serious?", vibe: '確認入り' },
            { text: 'Wait, 20%? What the heck.', vibe: '具体的に驚く' },
          ],
        },
        {
          speaker: 'Friend',
          line: "Yeah, and my landlord said it's because of 'market adjustments.' Whatever that means.",
          lineJa: 'しかも大家が「市場の調整」とか言ってきてさ。意味わかんない。',
          choices: [
            { text: 'Makes sense... for them, I guess.', vibe: '皮肉入り' },
            { text: 'Tell me about it. Rent everywhere is crazy.', vibe: '共感' },
            { text: "I know, right? They always say that.", vibe: 'あるある感' },
          ],
        },
        {
          speaker: 'Friend',
          line: "I'm thinking about just moving. Starting over somewhere cheaper.",
          lineJa: 'もう引っ越そうかなって。もっと安いとこに。',
          choices: [
            { text: "That's probably smart, honestly.", vibe: '賛成' },
            { text: "Makes sense. Sometimes you just gotta move on.", vibe: '理解を示す' },
            { text: "I mean, 20%? Yeah, I'd move too.", vibe: '自分ならパターン' },
          ],
        },
      ],
    },
  },

  // ─── Day 4: Getting Around ──────────────────────────────
  {
    day: 4,
    theme: 'Getting Around',
    themeJa: '道に迷った',
    label: 'WALK',
    phrases: [
      {
        english: "Excuse me, where's the nearest station?",
        japanese: 'すみません、一番近い駅はどこですか？',
        tip: 'nearest を変えれば何でも聞ける。nearest bathroom, nearest ATM...',
      },
      {
        english: 'Is it far from here?',
        japanese: 'ここから遠い？',
        tip: '距離感を確認。歩くかタクシーか決められる',
      },
      {
        english: 'Can I walk there?',
        japanese: '歩いて行ける？',
        tip: '「遠い？」の次に聞く質問。セットで覚える',
      },
      {
        english: "I'm looking for...",
        japanese: '〜を探してるんですが。',
        tip: '店でも道でも使える。探し物の基本形',
      },
      {
        english: 'Thanks, I appreciate it.',
        japanese: 'ありがとう、助かります。',
        tip: 'Thank you より一段上の感謝。道案内の後に最適',
      },
    ],
    conversation: {
      setting: '海外旅行中。ホテルに戻りたいけど道がわからない。',
      exchanges: [
        {
          speaker: 'Local',
          line: "You look lost. Need help?",
          lineJa: '迷ってる？手伝おうか？',
          choices: [
            { text: "Yeah, I'm looking for the train station.", vibe: '素直' },
            { text: "Actually, yeah. Is the station near here?", vibe: 'ちょい照れ' },
            { text: "Oh, thanks! Where's the nearest station?", vibe: '感謝先行' },
          ],
        },
        {
          speaker: 'Local',
          line: "Oh, it's like two blocks that way. Maybe a five-minute walk.",
          lineJa: 'あっち2ブロック行ったとこ。歩いて5分くらい。',
          choices: [
            { text: 'Can I walk there? Is it safe at night?', vibe: '安全確認' },
            { text: 'Oh nice, so not too far.', vibe: '安心' },
            { text: 'Two blocks? Got it.', vibe: '理解を示す' },
          ],
        },
        {
          speaker: 'Local',
          line: "Yeah, totally safe. Just go straight and you'll see it on your left.",
          lineJa: '全然安全だよ。まっすぐ行けば左手に見えるから。',
          choices: [
            { text: 'Thanks, I appreciate it. Really.', vibe: '丁寧' },
            { text: 'Got it. Thanks a lot!', vibe: 'カジュアル' },
            { text: "Awesome, thanks! You're a lifesaver.", vibe: '大げさめ' },
          ],
        },
      ],
    },
  },

  // ─── Day 5: When You're Lost in Conversation ────────────
  {
    day: 5,
    theme: "When You're Lost",
    themeJa: '聞き取れない時',
    label: 'HELP',
    phrases: [
      {
        english: 'Sorry, one more time?',
        japanese: 'ごめん、もう一回言って？',
        tip: '最重要フレーズ。これさえ言えれば会話は死なない',
      },
      {
        english: 'What do you mean?',
        japanese: 'どういう意味？',
        tip: '聞き取れた上で意味がわからない時。失礼じゃない',
      },
      {
        english: 'How do you say...?',
        japanese: 'なんて言うんだっけ...',
        tip: '単語が出てこない時。ジェスチャー付きで全然OK',
      },
      {
        english: 'Let me think...',
        japanese: 'ちょっと考えさせて...',
        tip: '沈黙が怖い時の時間稼ぎ。考えてる感が出る',
      },
      {
        english: 'Something like that.',
        japanese: 'そんな感じ。',
        tip: '完璧に説明できなくてもこれで会話は続く',
      },
    ],
    conversation: {
      setting: '外国人の同僚と雑談。話が速くてついていけなくなった。',
      exchanges: [
        {
          speaker: 'Colleague',
          line: "So basically the whole restructuring is gonna affect our Q3 deliverables and the stakeholder alignment.",
          lineJa: 'つまり組織再編でQ3の成果物とかステークホルダーの調整に影響出るって話。',
          choices: [
            { text: 'Sorry, one more time? I lost you at restructuring.', vibe: '正直' },
            { text: 'Wait, what do you mean by stakeholder alignment?', vibe: 'ピンポイント' },
            { text: 'Hmm, let me think... so basically things are changing?', vibe: '要約で確認' },
          ],
        },
        {
          speaker: 'Colleague',
          line: "Oh sorry, yeah. Basically, our team might get merged with the product team.",
          lineJa: 'あ、ごめん。要はうちのチーム、プロダクトチームと合併するかもって話。',
          choices: [
            { text: 'Oh, makes sense. So like, a bigger team?', vibe: '理解を示す' },
            { text: 'Something like that? So we\'d work together?', vibe: '確認入り' },
            { text: 'Got it. That\'s... a lot to take in.', vibe: '素直な感想' },
          ],
        },
        {
          speaker: 'Colleague',
          line: "Yeah, it's still up in the air though. Nothing's official yet.",
          lineJa: 'まだ未定だけどね。正式決定はまだ。',
          choices: [
            { text: "Okay, cool. Let me know if you hear anything.", vibe: '落ち着いてる' },
            { text: "Right. I guess we'll see.", vibe: '様子見' },
            { text: "Something like that happens, I wanna know early.", vibe: '情報ほしい感' },
          ],
        },
      ],
    },
  },

  // ─── Day 6: At a Restaurant ─────────────────────────────
  {
    day: 6,
    theme: 'At a Restaurant',
    themeJa: 'レストランで',
    label: 'EAT',
    phrases: [
      {
        english: 'Table for two, please.',
        japanese: '2名です。',
        tip: '人数変えるだけ。for three, for four... シンプル',
      },
      {
        english: 'What do you recommend?',
        japanese: 'おすすめは？',
        tip: '迷った時に最強。店員との会話も広がる',
      },
      {
        english: "I'll have the...",
        japanese: '〜にします。',
        tip: '注文の定型。メニューを指差しながらでOK',
      },
      {
        english: 'Could I get the check?',
        japanese: 'お会計お願いします。',
        tip: 'アメリカでは check、イギリスでは bill',
      },
      {
        english: 'It was delicious, thank you.',
        japanese: 'おいしかったです。',
        tip: '帰り際にこれ言うと店員めっちゃ喜ぶ',
      },
    ],
    conversation: {
      setting: '旅行先のレストラン。ウェイターが来た。メニューは英語のみ。',
      exchanges: [
        {
          speaker: 'Waiter',
          line: "Hi there! Table for...?",
          lineJa: 'いらっしゃいませ！何名様ですか？',
          choices: [
            { text: 'Two, please.', vibe: '最小限' },
            { text: 'Table for two, please.', vibe: 'フルセンテンス' },
            { text: 'Just two of us.', vibe: 'カジュアル' },
          ],
        },
        {
          speaker: 'Waiter',
          line: "Here's the menu. Can I start you off with something to drink?",
          lineJa: 'メニューどうぞ。お飲み物から先にいかがですか？',
          choices: [
            { text: "Just water for now, thanks. What do you recommend for food?", vibe: '聞き上手' },
            { text: "I'll have a water. And can I get a few minutes?", vibe: '時間もらう' },
            { text: "Water's fine. We're still deciding.", vibe: 'サクッと' },
          ],
        },
        {
          speaker: 'Waiter',
          line: "The grilled salmon is really popular. It comes with a side salad.",
          lineJa: 'グリルサーモンが人気ですよ。サイドサラダ付きです。',
          choices: [
            { text: "Sounds great. I'll have that.", vibe: '即決' },
            { text: "Oh yeah? I'll try that then.", vibe: '乗ってみる' },
            { text: "I'll have the salmon, please.", vibe: 'シンプル注文' },
          ],
        },
      ],
    },
  },

  // ─── Day 7: Making Plans ────────────────────────────────
  {
    day: 7,
    theme: 'Making Plans',
    themeJa: '予定を立てる',
    label: 'PLAN',
    phrases: [
      {
        english: 'What are you up to this weekend?',
        japanese: '週末何するの？',
        tip: '"What are you up to" = 今何してる or 予定は？ の万能フレーズ',
      },
      {
        english: "I'm down.",
        japanese: 'いいよ、やろう。',
        tip: '誘われた時のカジュアルOK。若者も大人も使う',
      },
      {
        english: 'How about Saturday?',
        japanese: '土曜はどう？',
        tip: '曜日を提案する基本形。How about... で何でも提案できる',
      },
      {
        english: 'Works for me.',
        japanese: 'それでOK。',
        tip: '相手の提案に賛成する時。ビジネスでもカジュアルでも使える',
      },
      {
        english: "Let's figure it out later.",
        japanese: '後で決めよう。',
        tip: '保留したい時。日本人が苦手な「後で」をスマートに',
      },
    ],
    conversation: {
      setting: '金曜日の夕方。同僚と週末の話になった。',
      exchanges: [
        {
          speaker: 'Coworker',
          line: "Hey, what are you up to this weekend? A bunch of us are thinking of going hiking.",
          lineJa: 'ねえ、週末何するの？みんなでハイキング行こうかって話してて。',
          choices: [
            { text: "Oh, that sounds fun. I'm down!", vibe: 'ノリいい' },
            { text: 'Hiking? I could be into that. When are you thinking?', vibe: '前向きに確認' },
            { text: "Hmm, depends on the weather. But I'm interested.", vibe: '慎重' },
          ],
        },
        {
          speaker: 'Coworker',
          line: "Awesome! We're thinking either Saturday morning or Sunday. What works better for you?",
          lineJa: 'やった！土曜の朝か日曜で考えてるんだけど、どっちがいい？',
          choices: [
            { text: 'How about Saturday? I got stuff on Sunday.', vibe: '具体的' },
            { text: "Saturday works for me.", vibe: 'シンプル' },
            { text: "Either works. Let's go with whatever everyone else wants.", vibe: '合わせる' },
          ],
        },
        {
          speaker: 'Coworker',
          line: "Saturday it is. I'll send the details in the group chat later tonight.",
          lineJa: '土曜で決まり。詳細は今夜グループチャットに送るね。',
          choices: [
            { text: 'Sounds good. See you Saturday!', vibe: 'まとめ上手' },
            { text: "Cool, I'll check it later.", vibe: 'ゆるめ' },
            { text: "Works for me. Can't wait!", vibe: '楽しみ感' },
          ],
        },
      ],
    },
  },

  // ─── Day 8: Sharing Opinions ────────────────────────────
  {
    day: 8,
    theme: 'Sharing Opinions',
    themeJa: '意見を言う',
    label: 'THINK',
    phrases: [
      {
        english: 'To be honest...',
        japanese: '正直に言うと...',
        tip: '意見を言う前のクッション。これで空気が柔らかくなる',
      },
      {
        english: "I'm not really into that.",
        japanese: 'あんま興味ないな。',
        tip: 'やんわり断る最強フレーズ。I hate it より100倍スマート',
      },
      {
        english: 'It depends.',
        japanese: '場合による。',
        tip: 'Yes/No で答えたくない時の万能回答',
      },
      {
        english: 'Fair enough.',
        japanese: 'まあそうだね。',
        tip: '相手の意見を認める時。同意じゃなくて「一理ある」のニュアンス',
      },
      {
        english: 'I see your point.',
        japanese: '言いたいことはわかる。',
        tip: '反論する前に一回これ挟むと大人の会話になる',
      },
    ],
    conversation: {
      setting: '友達と映画を観た帰り。感想を話してる。',
      exchanges: [
        {
          speaker: 'Friend',
          line: "That movie was amazing, right? The ending totally got me.",
          lineJa: 'あの映画やばくなかった？ラストまじで泣いた。',
          choices: [
            { text: 'To be honest, I liked it but the ending felt kinda rushed.', vibe: '素直な感想' },
            { text: "Yeah, it was pretty good! The ending was intense.", vibe: '共感寄り' },
            { text: 'It depends on what you expected, I guess. I wanted more action.', vibe: '分析的' },
          ],
        },
        {
          speaker: 'Friend',
          line: "Really? I thought the slow build made the ending hit harder.",
          lineJa: 'まじ？ゆっくり盛り上げたからこそラストが効いたと思うけど。',
          choices: [
            { text: "I see your point. The buildup was good.", vibe: '認める' },
            { text: "Fair enough. I just like faster pacing, I guess.", vibe: '好みの違い' },
            { text: "Hmm, that's true actually. Maybe I need to watch it again.", vibe: '考え直す' },
          ],
        },
        {
          speaker: 'Friend',
          line: "Wanna watch the sequel next week? It comes out Friday.",
          lineJa: '来週続編観ない？金曜公開だよ。',
          choices: [
            { text: "I'm down. Friday works.", vibe: '即答' },
            { text: 'To be honest, sequels are usually worse. But sure, why not.', vibe: '正直だけど行く' },
            { text: "Yeah, let's do it.", vibe: 'シンプル' },
          ],
        },
      ],
    },
  },

  // ─── Day 9: Handling Problems ───────────────────────────
  {
    day: 9,
    theme: 'Handling Problems',
    themeJa: '困った時',
    label: 'FIX',
    phrases: [
      {
        english: "I'm sorry, but...",
        japanese: 'すみませんが...',
        tip: '問題を伝える前のクッション。but の後に本題',
      },
      {
        english: 'Is there any way to...?',
        japanese: 'なんとかなりませんか？',
        tip: '要望を丁寧に伝える。ゴリ押しじゃなくてお願いの形',
      },
      {
        english: "That's not what I ordered.",
        japanese: '注文と違います。',
        tip: 'クレームじゃなくて事実の伝達。冷静に言えば全然OK',
      },
      {
        english: "I'd appreciate it.",
        japanese: '助かります。',
        tip: 'お願いした後に添える一言。丁寧さが上がる',
      },
      {
        english: 'No worries.',
        japanese: '大丈夫ですよ。',
        tip: '相手がミスした時。許す時のカジュアルな一言',
      },
    ],
    conversation: {
      setting: 'ホテルにチェックイン。予約した部屋と違う部屋を案内された。',
      exchanges: [
        {
          speaker: 'Front Desk',
          line: "Here's your room key. You're in room 305, a standard single.",
          lineJa: 'ルームキーです。305号室、スタンダードシングルになります。',
          choices: [
            { text: "I'm sorry, but I think I booked a double room.", vibe: '丁寧に指摘' },
            { text: "Wait, that's not what I ordered. I reserved a double.", vibe: 'ストレート' },
            { text: 'Hmm, I actually booked a double. Could you check?', vibe: 'お願い形' },
          ],
        },
        {
          speaker: 'Front Desk',
          line: "Oh, let me check... You're right, I'm so sorry about that. Let me see if we have a double available.",
          lineJa: '確認しますね...おっしゃる通りです。申し訳ございません。ダブルの空きを確認します。',
          choices: [
            { text: "No worries. I'd appreciate it.", vibe: '大人の対応' },
            { text: "Thanks. Is there any way to get a room with a view too?", vibe: 'ついでにお願い' },
            { text: "No problem, take your time.", vibe: 'ゆったり' },
          ],
        },
        {
          speaker: 'Front Desk',
          line: "Great news! Room 512 is available. It's a double with a city view. I've upgraded you for free.",
          lineJa: '512号室が空いてます！ダブルで眺望付き。無料アップグレードさせていただきます。',
          choices: [
            { text: "Oh wow, that's amazing. Thank you so much!", vibe: '感謝全開' },
            { text: "I'd appreciate it. Thanks a lot!", vibe: '丁寧' },
            { text: "Nice! That's way better. Thanks!", vibe: 'テンション上がる' },
          ],
        },
      ],
    },
  },

  // ─── Day 10: Saying Goodbye ─────────────────────────────
  {
    day: 10,
    theme: 'Wrapping Up',
    themeJa: '別れ際',
    label: 'BYE',
    phrases: [
      {
        english: 'I should get going.',
        japanese: 'そろそろ行かないと。',
        tip: '帰りたい時の切り出し方。唐突に Bye より100倍自然',
      },
      {
        english: "Let's do this again sometime.",
        japanese: 'またやろう。',
        tip: '社交辞令にも本気にも使える。便利',
      },
      {
        english: 'Take care.',
        japanese: '気をつけてね。',
        tip: 'Bye よりちょっと温かい。誰にでも使える',
      },
      {
        english: 'It was fun.',
        japanese: '楽しかった。',
        tip: 'シンプルだけどこれが一番嬉しい一言',
      },
      {
        english: 'See you around.',
        japanese: 'またね。',
        tip: '「またどこかで」のニュアンス。約束なしの軽い別れ',
      },
    ],
    conversation: {
      setting: '友達の家でご飯食べた帰り。そろそろ終電の時間。',
      exchanges: [
        {
          speaker: 'Host',
          line: "Want another drink? We still have some wine.",
          lineJa: 'もう1杯飲む？ワインまだあるよ。',
          choices: [
            { text: "I'd love to, but I should get going. Last train.", vibe: '名残惜しい' },
            { text: "Nah, I'm good. Gotta catch my train.", vibe: 'カジュアル' },
            { text: "Tempting, but I should head out soon.", vibe: '大人っぽい' },
          ],
        },
        {
          speaker: 'Host',
          line: "Aw, already? Alright, well thanks for coming!",
          lineJa: 'えーもう？わかった、来てくれてありがとう！',
          choices: [
            { text: "It was fun. Thanks for having me.", vibe: '感謝' },
            { text: "Thanks for the food! Everything was amazing.", vibe: '料理を褒める' },
            { text: "Yeah, I had a great time. For real.", vibe: '本音' },
          ],
        },
        {
          speaker: 'Host',
          line: "Anytime! Get home safe.",
          lineJa: 'いつでもおいで！気をつけてね。',
          choices: [
            { text: "Thanks! Let's do this again sometime. Take care!", vibe: 'フルコンボ' },
            { text: "See you around. Night!", vibe: 'サクッと' },
            { text: "Will do. See you at work Monday!", vibe: '次の予定に繋げる' },
          ],
        },
      ],
    },
  },

  // ─── Day 11: Shopping ─────────────────────────────────
  {
    day: 11,
    theme: 'Shopping',
    themeJa: '買い物',
    label: 'SHOP',
    phrases: [
      {
        english: "I'm just looking, thanks.",
        japanese: '見てるだけです。',
        tip: '店員に話しかけられた時の最強シールド。これ一発で解放される',
      },
      {
        english: 'Do you have this in a medium?',
        japanese: 'これのMサイズありますか？',
        tip: 'in a + サイズ で何でも聞ける。in a small, in a large...',
      },
      {
        english: 'Can I try this on?',
        japanese: '試着していいですか？',
        tip: '服屋で必須。try on = 試着。靴でも服でも使える',
      },
      {
        english: "That's a bit out of my budget.",
        japanese: 'ちょっと予算オーバーかな。',
        tip: 'too expensive よりスマート。大人の断り方',
      },
      {
        english: "I'll take it.",
        japanese: 'これにします。',
        tip: '買う決心がついた時の一言。これでレジに行ける',
      },
    ],
    conversation: {
      setting: '海外旅行中。おしゃれなセレクトショップに入った。店員が近づいてきた。',
      exchanges: [
        {
          speaker: 'Staff',
          line: "Hey! Welcome in. Anything I can help you find today?",
          lineJa: 'いらっしゃいませ！何かお探しですか？',
          choices: [
            { text: "I'm just looking for now, thanks.", vibe: '様子見' },
            { text: "Actually, yeah. Do you have any jackets?", vibe: '目的あり' },
            { text: "Oh, I'm good. Just browsing.", vibe: 'ゆるめ' },
          ],
        },
        {
          speaker: 'Staff',
          line: "Sure thing! Oh, that one's really popular right now. Wanna try it on?",
          lineJa: 'もちろん！あ、それ今すごい人気ですよ。試着します？',
          choices: [
            { text: 'Can I try this on? Where are the fitting rooms?', vibe: '積極的' },
            { text: "Yeah, I'll try it. Do you have this in a medium?", vibe: 'サイズ確認' },
            { text: "Hmm, how much is it first?", vibe: '値段チェック' },
          ],
        },
        {
          speaker: 'Staff',
          line: "It's $120. But we're doing 20% off everything this week.",
          lineJa: '120ドルです。でも今週全品20%オフですよ。',
          choices: [
            { text: "Oh nice, I'll take it then!", vibe: '即決' },
            { text: "That's not bad with the discount. Let me think about it.", vibe: '保留' },
            { text: "Hmm, still a bit out of my budget. Anything similar but cheaper?", vibe: '交渉上手' },
          ],
        },
      ],
    },
  },

  // ─── Day 12: Feeling Sick ─────────────────────────────
  {
    day: 12,
    theme: 'Feeling Sick',
    themeJa: '体調が悪い',
    label: 'SICK',
    phrases: [
      {
        english: "I'm not feeling well.",
        japanese: '体調悪いです。',
        tip: '体調不良を伝える基本形。I\'m sick より幅広く使える',
      },
      {
        english: 'I think I need to see a doctor.',
        japanese: '医者に行った方がいいかも。',
        tip: 'I think で柔らかく伝える。海外で体調崩した時の命綱',
      },
      {
        english: 'My stomach is killing me.',
        japanese: 'お腹がめちゃくちゃ痛い。',
        tip: 'is killing me = めっちゃ痛い。head, back, throat に変えて使い回せる',
      },
      {
        english: 'I should probably take the day off.',
        japanese: '今日休んだ方がいいかも。',
        tip: 'probably を入れるとゴリ押し感が消える。上司にも使える',
      },
      {
        english: 'I need some rest.',
        japanese: 'ちょっと休まないと。',
        tip: 'シンプルだけど伝わる。これ以上説明しなくていい',
      },
    ],
    conversation: {
      setting: '朝起きたら体調最悪。とりあえず同僚に連絡しないと。',
      exchanges: [
        {
          speaker: 'Coworker',
          line: "Morning! You coming in today? We got that meeting at 10.",
          lineJa: 'おはよ！今日来る？10時からミーティングあるけど。',
          choices: [
            { text: "Hey, I'm not feeling well. I think I need to stay home.", vibe: 'ストレート' },
            { text: "Actually, my stomach is killing me. I should probably take the day off.", vibe: '具体的' },
            { text: "Ugh, I woke up feeling awful. Can I call in sick?", vibe: '相談' },
          ],
        },
        {
          speaker: 'Coworker',
          line: "Oh no, that sucks. Do you need anything? Medicine or something?",
          lineJa: 'うわ、大丈夫？何かいる？薬とか。',
          choices: [
            { text: "I'm okay, I just need some rest. Thanks though.", vibe: '感謝しつつ断る' },
            { text: "I think I'm good. Might go see a doctor later.", vibe: '自分で対処' },
            { text: "Honestly? Some soup would be amazing. But don't worry about it.", vibe: '冗談交じり' },
          ],
        },
        {
          speaker: 'Coworker',
          line: "Alright, take it easy. I'll cover the meeting for you. Just get better!",
          lineJa: 'わかった、ゆっくり休んで。ミーティングはカバーしとくから。お大事に！',
          choices: [
            { text: "You're a lifesaver. I owe you one.", vibe: '感謝全開' },
            { text: "Thanks, I appreciate it. I'll try to be back tomorrow.", vibe: '丁寧' },
            { text: "Seriously, thank you. I'll make it up to you.", vibe: '借りを返す宣言' },
          ],
        },
      ],
    },
  },

  // ─── Day 13: Phone Calls ──────────────────────────────
  {
    day: 13,
    theme: 'Phone Calls',
    themeJa: '電話する',
    label: 'CALL',
    phrases: [
      {
        english: "Hey, is this a good time?",
        japanese: '今大丈夫？',
        tip: '電話の最初に絶対聞け。これで相手のストレスが消える',
      },
      {
        english: "Sorry, I can't hear you very well.",
        japanese: 'ごめん、よく聞こえない。',
        tip: '電波悪い時。hear の後に very well つけると丁寧',
      },
      {
        english: "Can I call you back?",
        japanese: '折り返していい？',
        tip: '今話せない時の神フレーズ。call back = 折り返す',
      },
      {
        english: "I'll text you the details.",
        japanese: '詳細はテキストで送るね。',
        tip: '電話で全部説明するより楽。text が動詞として使える',
      },
      {
        english: "Anyway, I gotta go.",
        japanese: 'じゃ、そろそろ切るね。',
        tip: '電話を終わらせる時の定番。I should get going と同じ発想',
      },
    ],
    conversation: {
      setting: '久しぶりの友達から突然の電話。ちょうど電車降りたとこ。',
      exchanges: [
        {
          speaker: 'Friend',
          line: "Yooo, what's up! It's been forever. You got a sec?",
          lineJa: 'よー！久しぶり！ちょっといい？',
          choices: [
            { text: "Hey! Yeah, I got a minute. What's going on?", vibe: '話聞くよ' },
            { text: "Oh wow, hey! Is this a good time? I mean, yeah, what's up?", vibe: 'テンパり気味' },
            { text: "Dude, it HAS been forever. Yeah, go ahead.", vibe: '懐かしい' },
          ],
        },
        {
          speaker: 'Friend',
          line: "So listen, I'm planning a trip next month and I was thinking... wait, can you hear me okay?",
          lineJa: 'あのさ、来月旅行計画してて...あ、聞こえてる？',
          choices: [
            { text: "Yeah, I can hear you. A trip? Where to?", vibe: '食いつく' },
            { text: "Kinda? You're breaking up a little. But keep going.", vibe: '正直に言う' },
            { text: "Sorry, I can't hear you very well. One sec, let me move.", vibe: '場所移動' },
          ],
        },
        {
          speaker: 'Friend',
          line: "Okay cool. So yeah, a bunch of us are going to Bali. You in?",
          lineJa: 'ん。で、バリにみんなで行くんだけど。来る？',
          choices: [
            { text: "Whoa, Bali? I'm interested. I'll text you later about details.", vibe: '前向きに保留' },
            { text: "That sounds sick! Let me check my schedule and call you back.", vibe: '折り返す' },
            { text: "Oh man, I wish. Anyway, I gotta go, but text me the details!", vibe: '切り上げる' },
          ],
        },
      ],
    },
  },

  // ─── Day 14: Asking Favors ────────────────────────────
  {
    day: 14,
    theme: 'Asking Favors',
    themeJa: 'お願いする',
    label: 'ASK',
    phrases: [
      {
        english: "Hey, can I ask you a favor?",
        japanese: 'ねえ、ちょっとお願いしていい？',
        tip: '前置きの基本。いきなり本題より100倍好印象',
      },
      {
        english: "Would you mind...?",
        japanese: '〜してもらっても大丈夫？',
        tip: '丁寧なお願い。Can you...? の敬語バージョン',
      },
      {
        english: "No pressure, but...",
        japanese: '無理しなくていいんだけど...',
        tip: '断りやすくしてあげる魔法の前置き。相手が楽になる',
      },
      {
        english: "I owe you one.",
        japanese: '借り一つね。',
        tip: '助けてもらった後のカジュアルな感謝。友達間で最強',
      },
      {
        english: "No worries if you can't.",
        japanese: '無理なら全然いいよ。',
        tip: 'お願いの後に添える逃げ道。日本語の「大丈夫だよ」に近い',
      },
    ],
    conversation: {
      setting: '引っ越し前日。車を持ってる友達にヘルプを頼みたい。',
      exchanges: [
        {
          speaker: 'You',
          line: "(You need to ask your friend for help moving tomorrow.)",
          lineJa: '（明日の引っ越し、友達に車出してもらいたい）',
          choices: [
            { text: "Hey, can I ask you a favor? I'm moving tomorrow and I could really use a car.", vibe: '正攻法' },
            { text: "So... no pressure, but any chance you're free tomorrow? I'm moving.", vibe: 'やんわり' },
            { text: "Dude, I need help. Moving day is tomorrow. You and your truck available?", vibe: 'ストレート' },
          ],
        },
        {
          speaker: 'Friend',
          line: "Oof, tomorrow? What time? I got plans in the evening but morning might work.",
          lineJa: 'うわ、明日？何時？夜は予定あるけど朝ならいけるかも。',
          choices: [
            { text: "Morning's perfect. Like 9 or 10? No worries if you can't.", vibe: '逃げ道つき' },
            { text: "Would you mind coming around 9? I'll buy you lunch after.", vibe: 'お礼つき' },
            { text: "Anytime in the morning works. Seriously, I owe you one.", vibe: '感謝先行' },
          ],
        },
        {
          speaker: 'Friend',
          line: "Alright, I'll be there at 9. You better have coffee ready though.",
          lineJa: 'OK、9時に行くわ。コーヒー用意しといてよ。',
          choices: [
            { text: "Done. Coffee AND donuts. I owe you big time.", vibe: '感謝マシマシ' },
            { text: "Ha, deal. You're the best, seriously.", vibe: '嬉しい' },
            { text: "Obviously. Thanks man, you're saving my life.", vibe: '大げさめ' },
          ],
        },
      ],
    },
  },

  // ─── Day 15: Giving Compliments ───────────────────────
  {
    day: 15,
    theme: 'Giving Compliments',
    themeJa: '褒める',
    label: 'NICE',
    phrases: [
      {
        english: 'I love your jacket!',
        japanese: 'そのジャケットいいね！',
        tip: 'I love your + アイテム名。服、髪型、バッグ、何でも褒められる',
      },
      {
        english: "You're really good at this.",
        japanese: 'これめっちゃ上手いね。',
        tip: 'good at + スキル名。料理、ゲーム、プレゼン何でも',
      },
      {
        english: 'That looks amazing on you.',
        japanese: 'めっちゃ似合ってる。',
        tip: '服とか髪型とか。on you がポイント。「あなたに」似合ってる',
      },
      {
        english: 'How do you do that?',
        japanese: 'どうやってるの？',
        tip: '褒め＋興味のコンボ。相手が嬉しくなる質問',
      },
      {
        english: 'You always know the best spots.',
        japanese: 'いっつもいい店知ってるよね。',
        tip: 'You always... で相手の「いつもの良さ」を褒める',
      },
    ],
    conversation: {
      setting: '同僚がプレゼンを終えた。めちゃくちゃ良かった。声かけに行く。',
      exchanges: [
        {
          speaker: 'You',
          line: "(Your coworker just nailed a presentation. Go say something.)",
          lineJa: '（同僚のプレゼンが神だった。褒めに行こう）',
          choices: [
            { text: "Hey, that was awesome. You're really good at presenting.", vibe: 'ストレート' },
            { text: "Dude, that presentation was fire. How do you stay so calm up there?", vibe: '質問で褒める' },
            { text: "Seriously impressive. The way you explained that data? Chef's kiss.", vibe: '具体的に褒める' },
          ],
        },
        {
          speaker: 'Coworker',
          line: "Aw, thanks! I was so nervous honestly. I kept thinking I'd mess up.",
          lineJa: 'ありがとう！正直めっちゃ緊張してた。ミスしそうで。',
          choices: [
            { text: "No way, you couldn't tell at all. You looked super confident.", vibe: '安心させる' },
            { text: "Are you kidding? That was smooth. You made it look easy.", vibe: '大げさに否定' },
            { text: "Well, you totally nailed it. You should do these more often.", vibe: '背中押す' },
          ],
        },
        {
          speaker: 'Coworker',
          line: "Ha, I don't know about that. But thanks, that means a lot.",
          lineJa: 'いやーどうかな。でもありがとう、嬉しい。',
          choices: [
            { text: "For real though. The team loved it.", vibe: 'みんなの声' },
            { text: "I'm serious! Also, love the new slides. Way cleaner than before.", vibe: '追加で褒める' },
            { text: "Anytime. You crushed it.", vibe: 'サクッと締め' },
          ],
        },
      ],
    },
  },

  // ─── Day 16: Giving Directions ────────────────────────
  {
    day: 16,
    theme: 'Giving Directions',
    themeJa: '道案内する',
    label: 'MAP',
    phrases: [
      {
        english: "Go straight and turn right at the light.",
        japanese: 'まっすぐ行って信号を右。',
        tip: 'go straight + turn right/left。道案内のベース。これだけで8割伝わる',
      },
      {
        english: "It's on your left.",
        japanese: '左側にあるよ。',
        tip: 'on your left / on your right。目的地がどっち側かを伝える',
      },
      {
        english: "You can't miss it.",
        japanese: '絶対わかるよ。',
        tip: '目立つ建物を教えた後にこれ。相手を安心させる一言',
      },
      {
        english: "It's about a five-minute walk.",
        japanese: '歩いて5分くらい。',
        tip: '距離じゃなくて時間で伝える。英語圏の基本',
      },
      {
        english: "It's right across from the station.",
        japanese: '駅のちょうど向かい。',
        tip: 'across from = 〜の向かい。ランドマーク使って位置を伝える',
      },
    ],
    conversation: {
      setting: '外国人観光客に道を聞かれた。コンビニの場所を教えてあげる。',
      exchanges: [
        {
          speaker: 'Tourist',
          line: "Hey, excuse me. Is there a convenience store around here?",
          lineJa: 'すみません、この辺にコンビニあります？',
          choices: [
            { text: "Yeah, there's one pretty close. Go straight that way.", vibe: 'シンプル' },
            { text: "Oh yeah, there's a 7-Eleven like two minutes from here.", vibe: '具体的' },
            { text: "Sure! It's right across from the station actually.", vibe: 'ランドマーク' },
          ],
        },
        {
          speaker: 'Tourist',
          line: "Oh great. Which way do I go?",
          lineJa: 'おー、どっちに行けばいい？',
          choices: [
            { text: "Go straight and turn right at the light. It's on your left.", vibe: '丁寧に' },
            { text: "See that big building? Go past it and it's right there.", vibe: '目印で' },
            { text: "Just go down this street. It's about a two-minute walk. You can't miss it.", vibe: '距離+安心' },
          ],
        },
        {
          speaker: 'Tourist',
          line: "Awesome, thanks so much! Oh, do they have an ATM inside?",
          lineJa: 'ありがとう！中にATMあるかな？',
          choices: [
            { text: "Yeah, most of them do. You should be good.", vibe: '安心させる' },
            { text: "I think so, yeah. Japanese convenience stores have everything.", vibe: 'プチ自慢' },
            { text: "Pretty sure, yeah. If not, there's a bank right next to it.", vibe: 'バックアップ情報' },
          ],
        },
      ],
    },
  },

  // ─── Day 17: Weather Talk ─────────────────────────────
  {
    day: 17,
    theme: 'Weather Talk',
    themeJa: '天気の話',
    label: 'SKY',
    phrases: [
      {
        english: "It's so hot today.",
        japanese: '今日めっちゃ暑い。',
        tip: '天気の話は会話の入口。エレベーターで隣の人にも使える',
      },
      {
        english: "Looks like it's gonna rain.",
        japanese: '雨降りそうだね。',
        tip: 'looks like = 〜そう。見た目で判断する時の万能フレーズ',
      },
      {
        english: "I didn't bring an umbrella.",
        japanese: '傘持ってきてない。',
        tip: '困った状況の共有。ここから会話が広がる',
      },
      {
        english: "Nice day, huh?",
        japanese: 'いい天気だね。',
        tip: '語尾の huh? = だね？ 確認＋共感を求めるカジュアルな一言',
      },
      {
        english: "I can't stand the humidity.",
        japanese: '湿気ほんと無理。',
        tip: "can't stand = 〜が耐えられない。嫌いの強調版。日常で超使う",
      },
    ],
    conversation: {
      setting: '月曜の朝。オフィスのエレベーターで同僚と一緒になった。外は大雨。',
      exchanges: [
        {
          speaker: 'Colleague',
          line: "Ugh, what a morning. Did you see that rain? I'm soaked.",
          lineJa: 'うわ、最悪な朝。雨見た？びしょ濡れ。',
          choices: [
            { text: "Same here. I didn't bring an umbrella. Big mistake.", vibe: '同じ被害者' },
            { text: "I know, right? It was not supposed to rain today!", vibe: '天気予報ハズレ' },
            { text: "Yeah, it's crazy out there. Looks like it's gonna rain all day too.", vibe: '追い打ち情報' },
          ],
        },
        {
          speaker: 'Colleague',
          line: "The forecast said sunny. I literally checked this morning!",
          lineJa: '予報は晴れだったよ。今朝確認したのに！',
          choices: [
            { text: "Tell me about it. Can't trust the weather app anymore.", vibe: 'あるある共感' },
            { text: "Ha, same. I checked too. What a joke.", vibe: '一緒に怒る' },
            { text: "Yeah, the forecast is never right here. I just gave up checking.", vibe: '諦めた系' },
          ],
        },
        {
          speaker: 'Colleague',
          line: "At least it's supposed to be nice this weekend. Fingers crossed.",
          lineJa: '週末は晴れるらしいけどね。当てにならないけど。',
          choices: [
            { text: "Nice day this weekend? I'll believe it when I see it.", vibe: '信じない' },
            { text: "Fingers crossed. I got outdoor plans.", vibe: '祈る' },
            { text: "Hope so. I can't stand another rainy weekend.", vibe: 'もう限界' },
          ],
        },
      ],
    },
  },

  // ─── Day 18: Hobbies ──────────────────────────────────
  {
    day: 18,
    theme: 'Hobbies',
    themeJa: '趣味の話',
    label: 'HOBBY',
    phrases: [
      {
        english: "I'm really into photography lately.",
        japanese: '最近写真にハマってる。',
        tip: "I'm into = ハマってる。ネイティブの趣味の話し方はこれ",
      },
      {
        english: "How long have you been doing that?",
        japanese: 'どのくらいやってるの？',
        tip: '趣味の話を広げる鉄板質問。相手が嬉しくなる',
      },
      {
        english: "I've always wanted to try that.",
        japanese: 'ずっとやってみたいと思ってた。',
        tip: '相手の趣味に興味を示す最高のリアクション',
      },
      {
        english: "It's a good way to unwind.",
        japanese: 'いい気分転換になるよ。',
        tip: 'unwind = リラックスする。趣味の良さを説明する時に',
      },
      {
        english: "We should do it together sometime.",
        japanese: '今度一緒にやろうよ。',
        tip: '趣味の話から誘いに繋げる。会話の着地点に最適',
      },
    ],
    conversation: {
      setting: '飲み会の席。隣に座った人と趣味の話になった。',
      exchanges: [
        {
          speaker: 'New Friend',
          line: "So what do you do for fun? Like outside of work.",
          lineJa: '趣味とかある？仕事以外で。',
          choices: [
            { text: "I'm really into cooking lately. Like, trying new recipes and stuff.", vibe: '具体的' },
            { text: "Hmm, I play guitar. Not great at it, but it's fun.", vibe: '謙遜入り' },
            { text: "Honestly? I just watch a lot of YouTube. Ha.", vibe: '正直すぎる' },
          ],
        },
        {
          speaker: 'New Friend',
          line: "Oh, that's cool! How long have you been doing that?",
          lineJa: 'いいね！どのくらいやってるの？',
          choices: [
            { text: "Maybe a year? I started during the pandemic actually.", vibe: 'きっかけ付き' },
            { text: "Not that long. Like, a few months? Still figuring it out.", vibe: '初心者アピール' },
            { text: "On and off for a while. But I got serious about it recently.", vibe: '本気度の変化' },
          ],
        },
        {
          speaker: 'New Friend',
          line: "Nice. I've always wanted to try that. Is it hard to get started?",
          lineJa: 'いいなあ。やってみたいと思ってた。始めるの大変？',
          choices: [
            { text: "Nah, it's pretty easy to start. We should do it together sometime!", vibe: '誘い' },
            { text: "Not really. YouTube tutorials are your best friend.", vibe: 'アドバイス' },
            { text: "It's a good way to unwind, honestly. I'll show you the basics if you want.", vibe: '教えたい' },
          ],
        },
      ],
    },
  },

  // ─── Day 19: Food Talk ────────────────────────────────
  {
    day: 19,
    theme: 'Food Talk',
    themeJa: '食べ物の話',
    label: 'FOOD',
    phrases: [
      {
        english: "Have you tried the ramen place on 5th?",
        japanese: '5丁目のラーメン屋行った？',
        tip: 'Have you tried...? = 行った？/食べた？ 食べ物トークの入口',
      },
      {
        english: "I could go for some pizza right now.",
        japanese: '今ピザ食べたい気分。',
        tip: 'I could go for = 〜食べたい気分。I want より自然',
      },
      {
        english: "It's nothing fancy, but it's really good.",
        japanese: '別にオシャレじゃないけど、まじ美味い。',
        tip: 'nothing fancy = 高級じゃない。B級グルメを紹介する時の前置き',
      },
      {
        english: "I'm a huge fan of street food.",
        japanese: '屋台メシ大好き。',
        tip: "I'm a huge fan of = 大ファン。食の好みを語る時の表現",
      },
      {
        english: "You gotta try their tacos.",
        japanese: 'あそこのタコスまじ食べてみて。',
        tip: 'You gotta try = 絶対食べて。強いおすすめ。説得力がすごい',
      },
    ],
    conversation: {
      setting: '昼休み。同僚とランチどこ行くか相談中。お腹ぺこぺこ。',
      exchanges: [
        {
          speaker: 'Coworker',
          line: "I'm starving. Wanna grab lunch? What are you in the mood for?",
          lineJa: 'お腹やばい。ランチ行かない？何食べたい？',
          choices: [
            { text: "I could go for some Thai food. There's a new place around the corner.", vibe: '提案型' },
            { text: "Anything, honestly. I'm so hungry I'd eat anything.", vibe: '何でもいい系' },
            { text: "Have you tried that taco truck by the park? I keep hearing it's good.", vibe: '噂のとこ' },
          ],
        },
        {
          speaker: 'Coworker',
          line: "Ooh, the taco truck? I went last week. The al pastor is insane.",
          lineJa: 'あのタコストラック？先週行った。アルパストールやばいよ。',
          choices: [
            { text: "Oh yeah? You gotta take me. What else is good there?", vibe: '食いつく' },
            { text: "Nice, I'm sold. Let's go. Is there a long line usually?", vibe: '即決' },
            { text: "It's nothing fancy but it's good, right? I love that kind of food.", vibe: 'B級グルメ愛' },
          ],
        },
        {
          speaker: 'Coworker',
          line: "No line right now, probably. Their churros are amazing too. Get the combo.",
          lineJa: '今なら並ばないと思う。チュロスもやばい。コンボがいいよ。',
          choices: [
            { text: "Say no more. Let's go right now. I'm getting everything.", vibe: '全部食う' },
            { text: "Churros too? I'm a huge fan of street food. This is perfect.", vibe: 'ファン宣言' },
            { text: "Alright, you convinced me. Combo it is.", vibe: '説得された' },
          ],
        },
      ],
    },
  },

  // ─── Day 20: Sports Talk ──────────────────────────────
  {
    day: 20,
    theme: 'Sports Talk',
    themeJa: 'スポーツの話',
    label: 'GAME',
    phrases: [
      {
        english: "Did you catch the game last night?",
        japanese: '昨日の試合見た？',
        tip: 'catch the game = 試合を見る。スポーツトークの定番オープナー',
      },
      {
        english: "He's been on fire lately.",
        japanese: '最近あいつ絶好調。',
        tip: 'on fire = 絶好調。スポーツ以外でも使える。仕事でも',
      },
      {
        english: "That play was unreal.",
        japanese: 'あのプレーやばかった。',
        tip: 'unreal = ヤバい、信じられない。いい意味でしか使わない',
      },
      {
        english: "I'm rooting for the underdog.",
        japanese: '俺は負けてる方を応援する派。',
        tip: 'root for = 応援する。underdog = 弱い方。判官贔屓を英語で',
      },
      {
        english: "We got robbed, man.",
        japanese: '完全にやられたわ。',
        tip: 'got robbed = ひどい負け方した。審判がひどい時にも使う',
      },
    ],
    conversation: {
      setting: '月曜の朝。スポーツ好きの同僚が興奮気味に話しかけてきた。',
      exchanges: [
        {
          speaker: 'Colleague',
          line: "Dude! Did you catch the game last night? That ending was INSANE.",
          lineJa: 'おい！昨日の試合見た？あのラストやばすぎ。',
          choices: [
            { text: "No way, I missed it! What happened?", vibe: '見逃した' },
            { text: "YES. That last play was unreal. I was screaming.", vibe: '見た見た' },
            { text: "I caught the highlights. Looked crazy. Fill me in.", vibe: 'ハイライトだけ' },
          ],
        },
        {
          speaker: 'Colleague',
          line: "Okay so it's tied in the 9th, right? And then Rodriguez hits a walk-off homer. The crowd went nuts.",
          lineJa: '9回同点でさ、ロドリゲスがサヨナラホームラン打ったの。球場大爆発。',
          choices: [
            { text: "That's insane. He's been on fire lately. Dude can't miss.", vibe: '選手を褒める' },
            { text: "A walk-off?! Man, I shoulda watched. That's the best kind of ending.", vibe: '見ればよかった' },
            { text: "No way. We got robbed last time they played us, so this feels good.", vibe: 'リベンジ感' },
          ],
        },
        {
          speaker: 'Colleague',
          line: "Right? And they play again Thursday. We should watch it together at the sports bar.",
          lineJa: 'ね？木曜にまた試合あるよ。スポーツバーで一緒に見ない？',
          choices: [
            { text: "I'm so down. Thursday works. I'm rooting for a repeat.", vibe: '即答' },
            { text: "Bet. I'm not missing this one. What time does it start?", vibe: '今度は見る' },
            { text: "Only if you're buying the first round. Ha, just kidding. I'm in.", vibe: '冗談入り' },
          ],
        },
      ],
    },
  },
  // ─── Day 21: Airport ─────────────────────────────────
  {
    day: 21,
    theme: 'At the Airport',
    themeJa: '空港で',
    label: 'AIRPORT',
    phrases: [
      {
        english: "Where's the check-in counter?",
        japanese: 'チェックインカウンターどこですか？',
        tip: "Where's the ___? は空港でもどこでも使える万能フレーズ",
      },
      {
        english: 'Window seat, please.',
        japanese: '窓側でお願いします。',
        tip: 'aisle seat = 通路側。どっちか言えればOK',
      },
      {
        english: 'Is this the right gate?',
        japanese: 'このゲートで合ってますか？',
        tip: 'Is this the right ___? = これで合ってる？不安な時の救世主',
      },
      {
        english: 'My flight got delayed.',
        japanese: '飛行機遅延になった。',
        tip: 'got delayed = 遅延した。cancelled = 欠航。この2つは覚えとけ',
      },
      {
        english: 'How long is the layover?',
        japanese: '乗り継ぎ何時間ある？',
        tip: 'layover = 乗り継ぎ待ち。stopover とも言う',
      },
    ],
    conversation: {
      setting: '初めての海外旅行。空港のインフォメーションで不安そうに聞いている。',
      exchanges: [
        {
          speaker: 'Staff',
          line: "Hi! How can I help you today?",
          lineJa: 'こんにちは！何かお手伝いしましょうか？',
          choices: [
            { text: "Hi, where's Gate 22? I'm totally lost.", vibe: '迷子' },
            { text: "My flight got delayed. What do I do now?", vibe: '遅延' },
            { text: "Is this the right terminal for international flights?", vibe: '確認' },
          ],
        },
        {
          speaker: 'Staff',
          line: "No worries! Gate 22 is down this hall, past the food court. About a 5-minute walk.",
          lineJa: '大丈夫ですよ！このホールをまっすぐ行って、フードコート過ぎたところです。歩いて5分くらい。',
          choices: [
            { text: "Got it, thanks! Is there time to grab coffee on the way?", vibe: 'コーヒー' },
            { text: "Five minutes? Okay cool. My flight boards in 40 minutes so I'm good.", vibe: '余裕' },
            { text: "Oh thank god. I thought I was in the wrong terminal. Thanks so much.", vibe: '安心' },
          ],
        },
        {
          speaker: 'Staff',
          line: "You've got plenty of time. There's a Starbucks right before the gate. Have a safe flight!",
          lineJa: '時間たっぷりありますよ。ゲートの手前にスタバありますよ。良い旅を！',
          choices: [
            { text: "Perfect. You just saved my morning. Thanks!", vibe: '感謝' },
            { text: "A Starbucks? Now we're talkin'. Have a good one!", vibe: 'テンション上がる' },
            { text: "Thanks! First time flying alone so I'm kinda nervous, ha.", vibe: '正直' },
          ],
        },
      ],
    },
  },
  // ─── Day 22: Rideshare ─────────────────────────────────
  {
    day: 22,
    theme: 'Taking a Rideshare',
    themeJa: 'Uber/タクシーで',
    label: 'RIDE',
    phrases: [
      {
        english: "Are you my Uber?",
        japanese: 'Uberの方ですか？',
        tip: 'これが第一声。名前確認 Are you ___? もセットで',
      },
      {
        english: 'Can you drop me off here?',
        japanese: 'ここで降ろしてもらえますか？',
        tip: 'drop me off = 降ろす。pick me up = 迎えに来る。セットで覚えろ',
      },
      {
        english: "How far is it from here?",
        japanese: 'ここからどのくらい？',
        tip: 'How far = 距離。How long = 時間。混同しがちだけど別物',
      },
      {
        english: 'Keep the change.',
        japanese: 'おつりはいいです。',
        tip: 'チップ文化の国で使う。Uberならアプリでチップ。タクシーならこれ',
      },
      {
        english: "There's a lot of traffic today.",
        japanese: '今日すごい渋滞だね。',
        tip: 'traffic = 渋滞。stuck in traffic = 渋滞にハマってる',
      },
    ],
    conversation: {
      setting: 'ホテルの前でUberを待っている。車が到着した。',
      exchanges: [
        {
          speaker: 'Driver',
          line: "Hey! You heading to downtown?",
          lineJa: 'やあ！ダウンタウンまで？',
          choices: [
            { text: "Yeah, the convention center. Are you Marcus?", vibe: '名前確認' },
            { text: "That's me! Sorry, is it okay if I put my bag in the back?", vibe: '荷物' },
            { text: "Yep! How long's it gonna take? I've got a meeting at 2.", vibe: '時間確認' },
          ],
        },
        {
          speaker: 'Driver',
          line: "About 20 minutes, but there's a lot of traffic today. Might take a bit longer.",
          lineJa: '20分くらいだけど、今日渋滞すごくてもうちょいかかるかも。',
          choices: [
            { text: "No worries, I left early just in case. Take your time.", vibe: '余裕' },
            { text: "Ah man, really? Is there a faster route maybe?", vibe: '急いでる' },
            { text: "That's fine. I'll just enjoy the ride. Nice car, by the way.", vibe: 'リラックス' },
          ],
        },
        {
          speaker: 'Driver',
          line: "Thanks! So what brings you to town? Business or vacation?",
          lineJa: 'ありがとう！何で来たの？仕事？旅行？',
          choices: [
            { text: "A tech conference. My first time here though, so I'm exploring too.", vibe: '両方' },
            { text: "Business, but I'm sneaking in some sightseeing after. Any recommendations?", vibe: 'おすすめ聞く' },
            { text: "Just visiting a friend. He moved here last year. Loves it.", vibe: '友人訪問' },
          ],
        },
      ],
    },
  },
  // ─── Day 23: Saying No ─────────────────────────────────
  {
    day: 23,
    theme: 'Politely Declining',
    themeJa: 'やんわり断る',
    label: 'DECLINE',
    phrases: [
      {
        english: "I appreciate the offer, but I'll pass.",
        japanese: 'ありがたいけど、遠慮しとく。',
        tip: "I'll pass = やめとく。カジュアルに断る定番",
      },
      {
        english: "I'm good, thanks.",
        japanese: '大丈夫、ありがとう。',
        tip: "I'm good = いらない/大丈夫。No thanksより柔らかい",
      },
      {
        english: "Maybe next time.",
        japanese: 'また今度ね。',
        tip: '断りの緩衝材。本当に行く気がなくても使う',
      },
      {
        english: "I wish I could, but I can't.",
        japanese: '行きたいけど無理なんだ。',
        tip: 'I wish I could = 行きたいのは本当。理由なしでも失礼じゃない',
      },
      {
        english: "Not really my thing.",
        japanese: 'あんまり俺向きじゃないかな。',
        tip: 'not my thing = 好みじゃない。嫌いとは言ってない。絶妙な断り方',
      },
    ],
    conversation: {
      setting: '同僚がカラオケに誘ってきたけど、今日は家でゆっくりしたい。',
      exchanges: [
        {
          speaker: 'Coworker',
          line: "Hey! A bunch of us are hitting karaoke tonight. You in?",
          lineJa: '今夜みんなでカラオケ行くけど、来る？',
          choices: [
            { text: "Ah, sounds fun but I'm beat today. Maybe next time?", vibe: '疲れてる' },
            { text: "I wish I could, but I've got plans already. Have fun though!", vibe: '予定ある' },
            { text: "Karaoke's not really my thing, honestly. But thanks for asking!", vibe: '正直' },
          ],
        },
        {
          speaker: 'Coworker',
          line: "Aw come on! You never come out with us. Just one song!",
          lineJa: 'えーいつも来ないじゃん！1曲だけ！',
          choices: [
            { text: "Ha, I know, I know. I owe you one. Next time for real.", vibe: '次回約束' },
            { text: "One song? That's what you said last time and we were there till midnight.", vibe: '笑いで返す' },
            { text: "I appreciate it, I really do. But tonight I just need to recharge.", vibe: '丁寧に' },
          ],
        },
        {
          speaker: 'Coworker',
          line: "Alright, alright. But I'm holding you to 'next time'. Deal?",
          lineJa: 'わかったわかった。でも「次回」は約束ね？',
          choices: [
            { text: "Deal. Text me next time and I'm there. Promise.", vibe: '約束する' },
            { text: "Ha, deal. As long as it's not a Monday night.", vibe: '条件付き' },
            { text: "You got it. Have fun tonight! Don't sing my song without me.", vibe: '冗談' },
          ],
        },
      ],
    },
  },
  // ─── Day 24: Apologizing ─────────────────────────────────
  {
    day: 24,
    theme: 'Saying Sorry',
    themeJa: '謝る',
    label: 'SORRY',
    phrases: [
      {
        english: 'My bad.',
        japanese: '俺のミス。',
        tip: 'カジュアルな謝罪。友達同士ならこれでOK',
      },
      {
        english: "I didn't mean to.",
        japanese: 'わざとじゃないんだ。',
        tip: "I didn't mean to = 悪気はなかった。言い訳ではなく事実として",
      },
      {
        english: "I shouldn't have said that.",
        japanese: 'あんなこと言うべきじゃなかった。',
        tip: "shouldn't have + 過去分詞 = やるべきじゃなかった。後悔の表現",
      },
      {
        english: "Let me make it up to you.",
        japanese: '埋め合わせさせて。',
        tip: 'make it up to you = 埋め合わせる。具体的な行動と一緒に使え',
      },
      {
        english: "I owe you an apology.",
        japanese: '謝らなきゃいけないことがある。',
        tip: '改まった謝罪の入り方。大人っぽくて使えると格が上がる',
      },
    ],
    conversation: {
      setting: '友達との約束をすっぽかしてしまった翌日。カフェで会って謝る。',
      exchanges: [
        {
          speaker: 'Friend',
          line: "So... you just didn't show up yesterday? I waited for like 30 minutes.",
          lineJa: 'で…昨日来なかったよね？30分待ったんだけど。',
          choices: [
            { text: "I know, I know. I'm so sorry. I completely lost track of time.", vibe: '素直に謝る' },
            { text: "Dude, my bad. I fell asleep and my alarm didn't go off. I feel terrible.", vibe: '理由あり' },
            { text: "I owe you a huge apology. Seriously, that was not cool of me.", vibe: '真剣に' },
          ],
        },
        {
          speaker: 'Friend',
          line: "I mean, a text would've been nice at least. I didn't know if something happened to you.",
          lineJa: 'せめてLINEくれればよかったのに。何かあったのかと思ったよ。',
          choices: [
            { text: "You're right. I should've texted. There's no excuse for that.", vibe: '認める' },
            { text: "Yeah, I shouldn't have left you hanging like that. Won't happen again.", vibe: '約束' },
            { text: "I know. That's the worst part. I didn't even think to message. I'm sorry.", vibe: '反省' },
          ],
        },
        {
          speaker: 'Friend',
          line: "Alright. Just don't make it a habit, okay? We're good.",
          lineJa: 'わかった。癖にならなきゃいいよ。もう大丈夫。',
          choices: [
            { text: "We're good? For real? Let me make it up to you. Lunch is on me.", vibe: '埋め合わせ' },
            { text: "I promise it won't happen again. Thanks for being cool about it.", vibe: '感謝' },
            { text: "You're too nice, honestly. I don't deserve you. Next hangout, I'm planning everything.", vibe: '大げさ感謝' },
          ],
        },
      ],
    },
  },
  // ─── Day 25: Disagreeing ─────────────────────────────────
  {
    day: 25,
    theme: 'Polite Disagreement',
    themeJa: '穏やかに反論する',
    label: 'DISAGREE',
    phrases: [
      {
        english: "I see your point, but...",
        japanese: '言いたいことはわかるけど…',
        tip: '反論の前に相手を認める。これだけで印象が全然違う',
      },
      {
        english: "I'm not so sure about that.",
        japanese: 'それはどうかなぁ。',
        tip: "直接 No じゃなくて I'm not sure で柔らかくする技",
      },
      {
        english: "That's one way to look at it.",
        japanese: 'そういう見方もあるよね。',
        tip: '「でも俺は違う」を暗示。大人の反論',
      },
      {
        english: "I get where you're coming from.",
        japanese: 'そう思う気持ちはわかる。',
        tip: "where you're coming from = あなたの立場。共感してから反論する型",
      },
      {
        english: "Hmm, I'd have to disagree on that one.",
        japanese: 'うーん、それはちょっと違うと思う。',
        tip: "I'd have to = 〜せざるを得ない。丁寧だけどしっかり反論",
      },
    ],
    conversation: {
      setting: '友達と映画の話。意見が割れたけど、ケンカにはしたくない。',
      exchanges: [
        {
          speaker: 'Friend',
          line: "That movie was incredible. Honestly, best film of the year, easy.",
          lineJa: 'あの映画やばかった。今年一番でしょ、余裕で。',
          choices: [
            { text: "It was good, but best of the year? I'm not so sure about that.", vibe: 'やんわり' },
            { text: "I see your point, but the ending kinda lost me. It felt rushed.", vibe: '具体的' },
            { text: "That's one way to look at it. I thought the first half was better than the second.", vibe: '部分同意' },
          ],
        },
        {
          speaker: 'Friend',
          line: "What?! The ending was the best part! The twist? Come on.",
          lineJa: 'えっ！？ラスト最高じゃん！あのどんでん返し！',
          choices: [
            { text: "I get where you're coming from, but I saw it coming from a mile away.", vibe: '予測できた' },
            { text: "The twist was cool, I'll give you that. But cool doesn't mean great.", vibe: '認めつつ' },
            { text: "I mean, it was surprising, sure. But surprising isn't the same as satisfying.", vibe: '深い反論' },
          ],
        },
        {
          speaker: 'Friend',
          line: "Huh. Okay, fair point. What would you say IS the best this year then?",
          lineJa: 'ふーん。まぁ一理あるか。じゃあ今年一番は何？',
          choices: [
            { text: "Honestly? That indie one we saw last month. Way more original.", vibe: '対案' },
            { text: "I don't even have a number one yet. But this wasn't it for me.", vibe: '決めてない' },
            { text: "Different taste, I guess. But that's what makes talking about movies fun.", vibe: '丸くおさめる' },
          ],
        },
      ],
    },
  },
  // ─── Day 26: Consoling Someone ─────────────────────────────────
  {
    day: 26,
    theme: 'Cheering Someone Up',
    themeJa: '元気づける',
    label: 'CHEER',
    phrases: [
      {
        english: "That really sucks. I'm sorry.",
        japanese: 'それはつらいね。',
        tip: 'That sucks = それは最悪だね。共感が先。アドバイスは後',
      },
      {
        english: "I'm here if you need to talk.",
        japanese: '話聞くよ。',
        tip: 'if you need to talk = 話したかったら。押しつけない優しさ',
      },
      {
        english: "You'll get through this.",
        japanese: '乗り越えられるよ。',
        tip: 'get through = 乗り越える。困難を通り抜けるイメージ',
      },
      {
        english: "It's okay to not be okay.",
        japanese: '辛い時は辛くていいんだよ。',
        tip: '無理にポジティブにならなくていい、というメッセージ',
      },
      {
        english: "Take all the time you need.",
        japanese: '焦らなくていいよ。',
        tip: '回復を急かさない。時間をあげるという最大の優しさ',
      },
    ],
    conversation: {
      setting: '友達が失恋して落ち込んでいる。カフェで話を聞いている。',
      exchanges: [
        {
          speaker: 'Friend',
          line: "We broke up. After three years. I still can't believe it.",
          lineJa: '別れた。3年付き合って。まだ信じられない。',
          choices: [
            { text: "Oh man. That really sucks. I'm sorry. You okay?", vibe: '共感' },
            { text: "Three years... that's huge. I'm here for you. Seriously.", vibe: '寄り添う' },
            { text: "Wow. I had no idea. Do you wanna talk about it?", vibe: '聞く姿勢' },
          ],
        },
        {
          speaker: 'Friend',
          line: "I just feel like I wasted all that time. Like what was the point?",
          lineJa: '時間無駄にした気分。何だったんだろうって。',
          choices: [
            { text: "It wasn't wasted. You grew a lot in those three years. That's real.", vibe: '肯定する' },
            { text: "I get that feeling. But it doesn't mean those years didn't matter.", vibe: '理解を示す' },
            { text: "Hey, it's okay to feel that way right now. Take all the time you need.", vibe: '焦らせない' },
          ],
        },
        {
          speaker: 'Friend',
          line: "Yeah... thanks. I just needed someone to listen.",
          lineJa: 'うん…ありがとう。誰かに聞いてほしかっただけかも。',
          choices: [
            { text: "Anytime. You don't have to go through this alone.", vibe: 'いつでも' },
            { text: "That's what I'm here for. And we're getting ice cream after this. Non-negotiable.", vibe: 'アイス作戦' },
            { text: "You'll get through this. I know it doesn't feel like it now, but you will.", vibe: '励まし' },
          ],
        },
      ],
    },
  },
  // ─── Day 27: Getting Excited ─────────────────────────────────
  {
    day: 27,
    theme: 'Sharing Excitement',
    themeJa: 'テンション上がる',
    label: 'HYPE',
    phrases: [
      {
        english: "No way! Are you serious?!",
        japanese: 'マジで！？嘘でしょ！',
        tip: 'No way! = テンション爆上げの第一声。毎日使えるレベル',
      },
      {
        english: "I'm so hyped right now.",
        japanese: 'テンション爆上がり。',
        tip: 'hyped = ワクワクしてる。excited よりカジュアルで勢いがある',
      },
      {
        english: "This is gonna be epic.",
        japanese: 'これやばいやつじゃん。',
        tip: 'epic = 壮大な、やばい。ポジティブ限定',
      },
      {
        english: "I've been looking forward to this all week.",
        japanese: '今週ずっとこれ楽しみにしてた。',
        tip: 'look forward to = 楽しみにする。現在完了進行形で「ずっと」感を出す',
      },
      {
        english: "Let's gooo!",
        japanese: 'よっしゃ行くぞ！',
        tip: "Let's go! は英語圏の「よっしゃ」。oを伸ばすとテンション表現",
      },
    ],
    conversation: {
      setting: '友達が好きなアーティストのライブチケットが取れたと報告してきた。',
      exchanges: [
        {
          speaker: 'Friend',
          line: "DUDE. I just got two tickets to the concert. FRONT ROW.",
          lineJa: 'おい聞いて。ライブのチケット2枚取れた。最前列。',
          choices: [
            { text: "NO WAY. Front row?! Are you serious right now?!", vibe: '爆発' },
            { text: "SHUT UP. How did you even get those?! I'm so hyped!", vibe: '驚き' },
            { text: "Bro. This is gonna be epic. I've been wanting to see them forever.", vibe: '即反応' },
          ],
        },
        {
          speaker: 'Friend',
          line: "Dead serious. I was refreshing the page for like 20 minutes straight. Almost gave up.",
          lineJa: 'ガチ。20分ずっとページ更新してた。もう諦めかけてた。',
          choices: [
            { text: "20 minutes? That's dedication. You're a hero. When is it?", vibe: '称賛' },
            { text: "Worth it though. Front row! We're gonna be SO close. I can't even.", vibe: '興奮' },
            { text: "I've been looking forward to this all week and I JUST found out. Let's gooo!", vibe: 'テンションMAX' },
          ],
        },
        {
          speaker: 'Friend',
          line: "Next Saturday. We gotta plan outfits. This is a big deal.",
          lineJa: '来週の土曜。服決めなきゃ。一大イベントだよこれ。',
          choices: [
            { text: "Oh we're going all out. This is not a jeans-and-t-shirt kind of night.", vibe: '気合い入れる' },
            { text: "Outfits? Bro, I'm planning my entire week around this. Saturday can't come fast enough.", vibe: '待ちきれない' },
            { text: "I'm already excited and it's a week away. How am I supposed to focus on anything?", vibe: '集中できない' },
          ],
        },
      ],
    },
  },
  // ─── Day 28: Reminiscing ─────────────────────────────────
  {
    day: 28,
    theme: 'Talking About the Past',
    themeJa: '昔話をする',
    label: 'MEMORY',
    phrases: [
      {
        english: 'Remember when we...?',
        japanese: 'あの時さぁ…覚えてる？',
        tip: 'Remember when ___? = 昔話の定番オープナー。これで始めろ',
      },
      {
        english: 'Those were the days.',
        japanese: 'あの頃はよかったなぁ。',
        tip: '懐かしむ定番フレーズ。感慨深い時に',
      },
      {
        english: 'I totally forgot about that!',
        japanese: '完全に忘れてた！',
        tip: '相手に言われて思い出した時のリアクション',
      },
      {
        english: 'That feels like forever ago.',
        japanese: 'めっちゃ昔に感じる。',
        tip: 'feels like = 〜のように感じる。実際の時間と感覚のギャップ',
      },
      {
        english: "I can't believe that was five years ago.",
        japanese: 'あれからもう5年って信じられない。',
        tip: "I can't believe = 信じられない。時の流れに驚く時",
      },
    ],
    conversation: {
      setting: '久しぶりに会った旧友と、昔の思い出話で盛り上がっている。',
      exchanges: [
        {
          speaker: 'Old Friend',
          line: "Man, remember when we used to skip class and go to that ramen place?",
          lineJa: 'なぁ、授業サボってあのラーメン屋行ってたの覚えてる？',
          choices: [
            { text: "Dude, YES. The one with the old guy who always gave us extra noodles?", vibe: '覚えてる' },
            { text: "Oh my god, I totally forgot about that! We went like every week.", vibe: '思い出した' },
            { text: "Ha! Those were the days. We had no responsibilities. Just vibes.", vibe: '懐かしむ' },
          ],
        },
        {
          speaker: 'Old Friend',
          line: "I can't believe that was like ten years ago. Feels like yesterday.",
          lineJa: 'あれもう10年前って信じられない。昨日のことみたい。',
          choices: [
            { text: "TEN years?! No way. That feels like forever ago and yesterday at the same time.", vibe: '時間の感覚' },
            { text: "Right? We were so young and dumb. I kinda miss it though.", vibe: '若さ' },
            { text: "Time flies, man. We gotta hang out more. Like actually, not just say it.", vibe: 'もっと会おう' },
          ],
        },
        {
          speaker: 'Old Friend',
          line: "For real. Let's not wait another ten years. Same ramen place next week?",
          lineJa: 'マジで。あと10年空けるのはなしね。来週あのラーメン屋行く？',
          choices: [
            { text: "Done. But if the old guy's not there anymore I'm gonna be so sad.", vibe: '約束' },
            { text: "Absolutely. And this time we don't have to skip class to do it. Ha.", vibe: '笑い' },
            { text: "I'm in. Let's make it a thing. Monthly ramen. No excuses.", vibe: '定期化' },
          ],
        },
      ],
    },
  },
  // ─── Day 29: Giving Advice ─────────────────────────────────
  {
    day: 29,
    theme: 'Giving Advice',
    themeJa: 'アドバイスする',
    label: 'ADVICE',
    phrases: [
      {
        english: 'If I were you, I would...',
        japanese: '俺だったら…',
        tip: '仮定法。「俺だったら」はアドバイスの鉄板入り方',
      },
      {
        english: 'Have you thought about...?',
        japanese: '…って考えたことある？',
        tip: '押しつけない提案。相手に考えさせる聞き方',
      },
      {
        english: "You might want to...",
        japanese: '…した方がいいかも。',
        tip: "might want to = した方がいいかも。should より100倍柔らかい",
      },
      {
        english: "Here's what I'd do.",
        japanese: '俺ならこうする。',
        tip: '具体的なアドバイスの前フリ。自信ある時に使え',
      },
      {
        english: "Don't overthink it.",
        japanese: '考えすぎないで。',
        tip: 'overthink = 考えすぎる。日本人が最も言われるべきアドバイス',
      },
    ],
    conversation: {
      setting: '後輩が転職するかどうか悩んでいる。ランチしながら相談に乗っている。',
      exchanges: [
        {
          speaker: 'Junior',
          line: "I've been thinking about changing jobs, but I'm scared. What if it's a mistake?",
          lineJa: '転職考えてるんだけど、怖くて。間違いだったらどうしよう。',
          choices: [
            { text: "I get that. But have you thought about what happens if you DON'T change?", vibe: '逆の視点' },
            { text: "If I were you, I'd at least start looking. Doesn't mean you have to jump.", vibe: '段階的' },
            { text: "Here's what I'd do: make a list. What do you hate now vs what do you want?", vibe: '具体策' },
          ],
        },
        {
          speaker: 'Junior',
          line: "That's true. I just keep going back and forth. One day I'm like 'yes' and the next I'm like 'no'.",
          lineJa: 'そうなんだけど。行ったり来たりで。「よし行こう」と思った翌日に「やっぱ無理」ってなる。',
          choices: [
            { text: "That's normal. Big decisions are scary. But don't overthink it forever.", vibe: '背中押す' },
            { text: "You know what, that back and forth IS your answer. You're not happy where you are.", vibe: '核心' },
            { text: "You might want to set a deadline. Like, 'I'll decide by the end of the month.'", vibe: '期限設定' },
          ],
        },
        {
          speaker: 'Junior',
          line: "Hmm yeah. I think I just needed someone to tell me it's okay to go for it.",
          lineJa: 'うん…。誰かに「行っていいよ」って言ってほしかっただけかも。',
          choices: [
            { text: "Then go for it. Worst case, you learn something. Best case, you love it.", vibe: 'Go' },
            { text: "You don't need my permission, but yeah — go for it. You've got this.", vibe: '自信持たせる' },
            { text: "Life's too short to stay somewhere that doesn't excite you. You'll be fine.", vibe: '人生短い' },
          ],
        },
      ],
    },
  },
  // ─── Day 30: Saying Goodbye ─────────────────────────────────
  {
    day: 30,
    theme: 'Heartfelt Goodbyes',
    themeJa: '気持ちを込めた別れ',
    label: 'BYE',
    phrases: [
      {
        english: "It was so good seeing you.",
        japanese: '会えてよかった。',
        tip: 'It was good ___ing = 〜できてよかった。別れ際の定番',
      },
      {
        english: "Let's not lose touch.",
        japanese: '連絡途切れないようにしよう。',
        tip: 'lose touch = 連絡が途絶える。keep in touch の逆',
      },
      {
        english: "Take care of yourself.",
        japanese: '体に気をつけて。',
        tip: 'Take care = じゃあね。of yourself を足すと気持ちが込もる',
      },
      {
        english: "I'm really gonna miss this.",
        japanese: 'これ本当に寂しくなるな。',
        tip: "gonna miss = 寂しくなる。人にも場所にもモノにも使える",
      },
      {
        english: "Until next time.",
        japanese: 'また会う日まで。',
        tip: '「さよなら」じゃなくて「また会おう」。前向きな別れ方',
      },
    ],
    conversation: {
      setting: '留学を終えて帰国する日。ホストファミリーと空港でお別れ。',
      exchanges: [
        {
          speaker: 'Host Mom',
          line: "I can't believe today's the day. It went by so fast.",
          lineJa: '今日なんだね。あっという間だった。',
          choices: [
            { text: "I know. I'm really gonna miss this. All of it. You guys, this house, everything.", vibe: '寂しい' },
            { text: "It did. But in the best way. I had the time of my life here.", vibe: '感謝' },
            { text: "Don't make me cry before I even get through security. Ha.", vibe: '笑いで耐える' },
          ],
        },
        {
          speaker: 'Host Mom',
          line: "You're always welcome here. This is your home too, okay?",
          lineJa: 'いつでも帰っておいで。ここはあなたの家でもあるんだから。',
          choices: [
            { text: "That means everything to me. Seriously. Thank you for everything.", vibe: '感動' },
            { text: "I'll be back. That's not a maybe, that's a promise.", vibe: '約束' },
            { text: "Stop, I'm gonna lose it. You've been like a second mom to me.", vibe: '泣きそう' },
          ],
        },
        {
          speaker: 'Host Mom',
          line: "Okay, you better go before we both start crying. Have a safe flight, sweetheart.",
          lineJa: '早く行きなさい、二人とも泣いちゃうから。気をつけてね。',
          choices: [
            { text: "Take care of yourself. And let's not lose touch, okay? I'll call every week.", vibe: '連絡する約束' },
            { text: "Thank you. For everything. Until next time. I love you guys.", vibe: '愛を伝える' },
            { text: "Okay. I'm going. But I'm not saying goodbye. Just... see you later.", vibe: 'さよなら言わない' },
          ],
        },
      ],
    },
  },
];
