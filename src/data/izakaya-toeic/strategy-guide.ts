// 居酒屋TOEIC -- Strategy Guide
// Part-by-part listening strategies, izakaya casual tone

export interface Technique {
  id: string;
  name: string;
  nameJa: string;
  description: string;      // Japanese explanation
  example: string;          // English example
  effectiveness: 1 | 2 | 3; // Stars
}

export interface CommonMistake {
  mistake: string;  // Japanese
  why: string;      // Why people make this mistake
  fix: string;      // How to fix it
}

export interface StrategySection {
  partNumber: number;
  partName: string;
  partNameJa: string;
  questionCount: number;
  timePerQuestion: string;
  overview: string;       // Japanese, casual izakaya tone
  masterQuote: string;    // Master's one-liner wisdom
  techniques: Technique[];
  commonMistakes: CommonMistake[];
  scoreImpact: string;    // How much this part affects total score
}

const part1Strategies: StrategySection = {
  partNumber: 1,
  partName: 'Photographs',
  partNameJa: '写真描写問題',
  questionCount: 6,
  timePerQuestion: '約5秒',
  overview:
    '写真を見て、4択から正しい描写を選ぶ。問題数は少ないが、ここで落とすとメンタルに来る。焦らず、消去法で攻めるのが正解。マスター的には「写真に写ってないことは言われてない」が鉄則。',
  masterQuote:
    '「写真が全て。音だけ聞いてたら負けや。目と耳、両方使え。」',
  scoreImpact:
    '6問中5問正解が理想。ここは確実に点を取れる部分。1問落とすと5点前後の失点。600点以上を狙うなら6問全取りが目安。',
  techniques: [
    {
      id: 'p1-eliminate-verb',
      name: 'Eliminate Wrong Verbs',
      nameJa: '動詞の消去法',
      description:
        '動詞（is sitting, are carrying, has been placed など）に注目して、写真の動作と合わない選択肢を先に消す。名詞が合ってても動詞がズレてたら不正解。「人が立ってる写真」で "is sitting" と聞こえたら即アウト。',
      example:
        'Photo: man standing at a whiteboard\nWrong: "He is writing on a whiteboard." (if hand not moving)\nRight: "He is standing in front of a whiteboard."',
      effectiveness: 3,
    },
    {
      id: 'p1-prepositions',
      name: 'Watch for Prepositions',
      nameJa: '前置詞チェック',
      description:
        '前置詞（on, in, next to, behind, across from）のミスは定番の引っかけ。「机の上に」なのに "under the desk" と言われたり。写真を見たら、モノの位置関係を頭の中で整理しておく。特に indoor シーンで多い。',
      example:
        'Photo: laptop on a desk\nTrap: "The laptop is beside the desk."\nRight: "The laptop is on the desk."',
      effectiveness: 3,
    },
    {
      id: 'p1-similar-sounds',
      name: 'Ignore Similar Sounds',
      nameJa: '似た音スルー技',
      description:
        '写真の単語に音が似てるだけで内容が違う選択肢は罠。例：road/load、shore/store、rowing/mowing。音に釣られず、意味が写真と合うかで判断する。速攻で「意味確認モード」に入る癖をつける。',
      example:
        'Photo: man mowing the lawn\nTrap: "He is rowing a boat." (rowing sounds like mowing)\nRight: "He is mowing the grass."',
      effectiveness: 2,
    },
    {
      id: 'p1-people-vs-objects',
      name: 'People vs Object Shift',
      nameJa: '人物↔物体すり替え',
      description:
        '人が写ってる写真で、物だけの描写が入ってくるパターン。人の行動を聞いてるのに建物の特徴を言われたり。逆に物の写真なのに人の動作が入る選択肢も罠。写真に「主役は何か」を意識する。',
      example:
        'Photo: woman typing at a computer\nTrap: "The computer is turned off."\nRight: "A woman is working at a computer."',
      effectiveness: 2,
    },
    {
      id: 'p1-singular-plural',
      name: 'Singular vs Plural',
      nameJa: '単複チェック',
      description:
        '写真に人が1人なのに "they are" と言われたら即消去。複数いるのに "a person is" も同様。特に outdoor の crowd シーンや、複数の物が写ってる写真で注意。一瞬で判断できるのに意外と見逃す。',
      example:
        'Photo: two women talking\nTrap: "A woman is talking on the phone."\nRight: "Two women are having a conversation."',
      effectiveness: 2,
    },
    {
      id: 'p1-unverifiable',
      name: 'Unverifiable Information',
      nameJa: '確認不能情報の排除',
      description:
        '写真から確認できない情報（感情、職業、目的、関係性）を断言してる選択肢は基本アウト。"She looks happy" は微妙だが "She is a nurse" のように職業を断定するのは危険。見えることだけで判断。',
      example:
        'Photo: woman in white coat\nTrap: "She is treating a patient."\nRight: "A woman is wearing a white coat."',
      effectiveness: 3,
    },
  ],
  commonMistakes: [
    {
      mistake: '音声に引っ張られて写真を見るのを忘れる',
      why: 'リスニングに集中しすぎて、視覚情報をサボる。英語が聞き取れたと思うと安心してしまう。',
      fix: '音声が始まる前に写真を10秒分析する習慣をつける。人・物・場所・動作の4点を素早くチェック。',
    },
    {
      mistake: '消去法を使わず「なんとなく正解」を選んでしまう',
      why: '自信がある選択肢をすぐ選んでしまい、残り3択を確認しない。',
      fix: '必ず4択全部の致命的なミスを探す。1つ正しいを探すより、3つの間違いを見つける方が確実。',
    },
    {
      mistake: '屋外シーンで背景の描写に惑わされる',
      why: '建物、空、車などが写ってると、その描写が正解っぽく聞こえてしまう。',
      fix: '写真の「主役（メインの被写体）」を先に決めてから聞く。背景の正確な描写より主役の描写を優先。',
    },
  ],
};

const part2Strategies: StrategySection = {
  partNumber: 2,
  partName: 'Question-Response',
  partNameJa: '応答問題',
  questionCount: 25,
  timePerQuestion: '約5秒',
  overview:
    'Part 2は難関。25問全部で短いやりとりを聞いて、最も自然な応答を(A)(B)(C)から選ぶ。正解がストレートな回答じゃないことが多い。マスター曰く、「日本語感覚で考えてたら負け」。間接回答と引っかけの嵐。',
  masterQuote:
    '「質問に直接答えてない選択肢が正解、なんてザラにある。会話ってそういうもんや。」',
  scoreImpact:
    '25問中20問以上正解が700点台の目安。間接回答パターンを習得すれば正答率が10〜15%上がる。Part 2の習得がリスニング全体のカギ。',
  techniques: [
    {
      id: 'p2-indirect-answer',
      name: 'Indirect Answer Pattern',
      nameJa: '間接回答パターン',
      description:
        '質問に直接答えてない選択肢が正解になるパターン。"Why is he late?" → "He didn\'t call." は直接の理由ではないが文脈上自然な応答。直接的な回答がなければ、会話として成立するかで判断。これがPart 2最重要テクニック。',
      example:
        'Q: "Why is the meeting canceled?"\n(A) Because the manager is sick. ← Too direct/suspicious\n(B) I haven\'t heard anything. ← Natural indirect response\n(C) It was scheduled for Monday. ← Trap: meeting info but wrong',
      effectiveness: 3,
    },
    {
      id: 'p2-ignore-repeated-words',
      name: 'Ignore Repeated Words',
      nameJa: '繰り返し単語スルー',
      description:
        '質問で使われた単語がそのまま選択肢に出てきたら疑え。TOEICは問題音声の単語を選択肢に仕込む「音の罠」を多用する。例：「meeting」と聞こえたら(A)に「meeting」が入ってても選ばない。',
      example:
        'Q: "When is the next board meeting?"\nTrap: (A) "The meeting will be in the boardroom."\nRight: (B) "I think it\'s on Thursday."',
      effectiveness: 3,
    },
    {
      id: 'p2-yes-no-indirect',
      name: 'Yes/No but Indirect',
      nameJa: 'Yes/No問題の間接回答',
      description:
        'Yes/No疑問文でも、"Yes" や "No" で始まらない選択肢が正解になる。"Can you finish by noon?" → "I\'ll do my best." が自然な場合も。また "Yes" で始まっても中身がズレてたら不正解。',
      example:
        'Q: "Can you send me the report today?"\nTrap: (A) "Yes, I\'ll send it to your office." ← Office not mentioned\nRight: (B) "I should have it ready by this afternoon."',
      effectiveness: 3,
    },
    {
      id: 'p2-wh-question-types',
      name: 'WH-Question Type Recognition',
      nameJa: 'WH疑問詞の種類認識',
      description:
        'Who/What/Where/When/Why/How を瞬時に識別して、それに合う答えの型を準備する。Who→人名・役職、When→時間表現、Where→場所、Why→理由（Because〜かIndirect）。最初の1語が勝負。',
      example:
        'Q: "Where should I submit the form?"\nWrong: (A) "The form takes about an hour." ← How long, not where\nRight: (B) "Leave it on the front desk."',
      effectiveness: 2,
    },
    {
      id: 'p2-negative-question',
      name: 'Negative Question Handling',
      nameJa: '否定疑問文の処理',
      description:
        '「〜じゃないの？」系の否定疑問文は日本語感覚で答えると逆になる。"Isn\'t the store closed?" → 閉まってたら "Yes, it is." 閉まってなければ "No, it isn\'t." 日本語の「はい、閉まってます」が Yes なのと同じ。',
      example:
        'Q: "Didn\'t you already submit the proposal?"\nConfusing: (A) "No, I forgot to." ← Actually correct English\nJapanese trap: thinking "no" here means 提出した',
      effectiveness: 2,
    },
    {
      id: 'p2-or-question',
      name: 'Or-Question Pattern',
      nameJa: 'A or B型の特殊応答',
      description:
        '"Would you prefer coffee or tea?" のような選択疑問文には Yes/No は不正解。どちらかを選ぶか、「どちらでもいい」「別のものにする」が正解候補。これを知らないと選択肢が全部変に見える。',
      example:
        'Q: "Are you coming by train or by car?"\nWrong: (A) "Yes, I\'m coming."\nWrong: (B) "No, I\'m not."\nRight: (C) "I\'ll probably drive."',
      effectiveness: 2,
    },
    {
      id: 'p2-tag-question',
      name: 'Tag Question Strategy',
      nameJa: '付加疑問文の戦略',
      description:
        '"You\'ve met John before, haven\'t you?" などの付加疑問文。基本は Yes/No どちらでも成立する応答を選ぶ。「確認」のニュアンスなので、相手が同意するか否定するかどちらも自然。文脈で判断。',
      example:
        'Q: "The new policy starts next month, doesn\'t it?"\nRight: (A) "That\'s what I heard."\nRight: (B) "Actually, I think it\'s been delayed."',
      effectiveness: 1,
    },
    {
      id: 'p2-first-word-lock',
      name: 'First-Word Lock Strategy',
      nameJa: '最初の1語ロック戦略',
      description:
        'Part 2は問題が印刷されてないため、最初の疑問詞1語を絶対に聞き逃さない。"When..." "Where..." "Why..." の1語が聞こえたら答えの型が決まる。最初を聞き逃したら当て勘より時間節約で次問に集中する選択肢も。',
      example:
        '"When" → 時間・日時の答えを探す\n"Where" → 場所の答えを探す\n"Why" → Because〜 または間接的な理由を探す',
      effectiveness: 3,
    },
  ],
  commonMistakes: [
    {
      mistake: '直接的な回答がないと不安になって変な選択肢を選ぶ',
      why: '「質問には直接答えるもの」という先入観。間接回答に慣れていない。',
      fix: '「会話として成立するか」を基準にする。ストレートな答えがない＝間接回答の可能性大。',
    },
    {
      mistake: '問題音声の単語と同じ単語が入った選択肢を選んでしまう',
      why: '聞き取れた単語に安心感を覚えてしまう。それが罠だと気づかない。',
      fix: '問題で使われた単語がそのまま選択肢にある場合は疑う習慣を。「音の一致」と「意味の一致」は別物。',
    },
    {
      mistake: '否定疑問文で Yes/No の意味が逆になる',
      why: '日本語の「はい・いいえ」と英語の Yes/No は構造が違う。',
      fix: 'Yes/No は事実に対して答える（肯定事実なら Yes、否定事実なら No）と覚える。質問の形に引っ張られない。',
    },
    {
      mistake: 'Part 2の後半（問題20〜25）で集中力が落ちる',
      why: '25問連続は疲れる。後半になるほど難易度も上がる設計になっている。',
      fix: '前半で貯金を作る意識を持つ。後半は1問ずつリセット。前の問題を引きずらない。',
    },
  ],
};

const part3Strategies: StrategySection = {
  partNumber: 3,
  partName: 'Conversations',
  partNameJa: '会話問題',
  questionCount: 39,
  timePerQuestion: '約8秒（3問セットで約24秒）',
  overview:
    '13組の会話×3問。リスニングセクション最大のボリューム。会話を聞きながら同時に設問も読む「並列処理」が要求される。マスターが「これが全部できたら900点見えてくる」と言う所以はここ。',
  masterQuote:
    '「会話が始まる前に設問を読め。準備なしで聞くのは目を閉じて運転するようなもんや。」',
  scoreImpact:
    '39問でリスニング全体の40%近くを占める。700点台と900点台の差がここに集中している。1セット（3問）で平均2問以上取れると800台が見える。',
  techniques: [
    {
      id: 'p3-pre-read',
      name: 'Pre-Read Questions',
      nameJa: '先読み戦略（最重要）',
      description:
        '会話音声が始まる前の数秒で設問と選択肢を読んでおく。3問の設問から「この会話は何について？誰が何を求めてる？」を予測する。先読みがあるかないかで正答率が20〜30%変わる。Part 3最重要テクニック。',
      example:
        'Before audio: Read "What is the woman asking about?" + "What will the man do next?"\n→ Now you know: listen for a request and a promised action.\n→ All other details become noise you can ignore.',
      effectiveness: 3,
    },
    {
      id: 'p3-topic-not-speaker',
      name: 'Track Topic, Not Speaker',
      nameJa: 'トピック追跡（話者より内容）',
      description:
        '誰が言ったかより何が言われたかを追う。TOEICの会話は情報量が多く、話者を意識しすぎると本質を見失う。ただし "What does the man suggest?" のように話者指定があれば話者も追う。設問で確認。',
      example:
        'Focus: What is being discussed → topic flow\nOnly track speaker when question says "What does the woman mean..."\nor "According to the man, why..."',
      effectiveness: 2,
    },
    {
      id: 'p3-paraphrase-matching',
      name: 'Paraphrase Matching',
      nameJa: 'パラフレーズ対応',
      description:
        '音声で言われた内容が選択肢では別の言い方になってる。"too expensive" → "out of their budget"、"call back later" → "contact them again" のように。音声の単語そのままの選択肢は逆に罠。意味の一致を探す。',
      example:
        'Audio: "We don\'t have enough staff right now."\nTrap: (A) "The staff is unavailable."\nRight: (B) "They are understaffed." ← Paraphrase match',
      effectiveness: 3,
    },
    {
      id: 'p3-graphic-questions',
      name: 'Graphic-Integrated Questions',
      nameJa: 'グラフィック連動問題',
      description:
        '図・表・地図・スケジュールと音声を組み合わせる問題。音声だけでは答えが出ない設計。先読み時に図を確認して、音声で「どの項目か」を特定する。図の中で「言及されない項目」が正解のヒントになることも。',
      example:
        'Graphic: Meeting schedule showing Mon-Fri slots\nAudio: "The only day that works for both of us is right after the long weekend."\n→ Match with calendar graphic to find correct day.',
      effectiveness: 3,
    },
    {
      id: 'p3-three-speaker',
      name: 'Three-Speaker Conversations',
      nameJa: '3人会話の攻略法',
      description:
        'Part 3に数問含まれる3人会話。誰が誰を指してるか混乱しやすい。設問が "What does the woman suggest?" のように話者を絞ってるので、設問先読み時に注目話者を確認。名前が出たら意識して記憶。',
      example:
        'Audio: Tom, Sarah, and Mike discuss project deadlines.\nQ: "What does Sarah suggest?"\n→ Focus only on Sarah\'s lines after identifying her voice or name.',
      effectiveness: 2,
    },
    {
      id: 'p3-last-exchange',
      name: 'Last-Exchange Focus',
      nameJa: '最後の発言フォーカス',
      description:
        '"What will the speaker do next?" "What will happen after the conversation?" など次の行動系の設問は会話の最後の発言に答えが集中する。前半の詳細を全部追うより、最後の交換に意識を向ける。',
      example:
        'Audio final lines: "Let me check with the manager and get back to you by Friday."\nQ: "What will the man most likely do next?"\nRight: "Contact someone to confirm" or "Follow up on Friday"',
      effectiveness: 2,
    },
    {
      id: 'p3-intention-questions',
      name: 'Speaker Intention Questions',
      nameJa: '発言意図問題の対処法',
      description:
        '"What does the man mean when he says \'...\'?" 系の問題。引用された発言を文脈から解釈する。言葉の表面的な意味じゃなく、会話の流れの中での「意図」を問われる。事前に設問の引用文をチェックしておく。',
      example:
        '"What does she mean when she says \'That\'s interesting\'?"\n→ In context of a complaint, "interesting" = polite way of saying she disagrees\n→ Not literally that something is interesting',
      effectiveness: 2,
    },
  ],
  commonMistakes: [
    {
      mistake: '先読みをサボってぶっつけ本番で聞く',
      why: '「聞きながら読めない」と思ってしまう。準備の効果を過小評価している。',
      fix: '先読みは「完璧に読む」じゃなく「キーワードを拾う」だけでいい。10〜15秒で設問の動詞と名詞だけ確認する練習から始める。',
    },
    {
      mistake: '会話全体の詳細を全部覚えようとして混乱する',
      why: 'リスニングで聞こえたものを全部メモしようとする。短期記憶がパンクする。',
      fix: '設問に関係する情報だけ追う。設問を先読みすれば「何を聞けばいいか」が事前にわかる。',
    },
    {
      mistake: '音声の単語と同じ単語が入った選択肢を選んでしまう',
      why: 'Part 2と同じ罠。聞こえた単語＝正解という誤った安心感。',
      fix: 'TOEICは意図的に音声の単語を不正解選択肢に仕込む。意味でマッチングする意識を持つ。',
    },
    {
      mistake: '前の問題を引きずって次のセットに集中できない',
      why: '前の会話の内容が頭に残ってしまう。特に難しかった設問の後。',
      fix: '各セットは完全独立。1セット終わったら「リセット」と意識的に切り替え。次の先読み時間を活用する。',
    },
  ],
};

const part4Strategies: StrategySection = {
  partNumber: 4,
  partName: 'Talks',
  partNameJa: '説明文問題',
  questionCount: 30,
  timePerQuestion: '約8秒（3問セットで約24秒）',
  overview:
    '10本のトーク×3問。ニュース、アナウンス、ボイスメール、広告など1人が話す形式。会話がない分、情報が高密度で流れてくる。マスター曰く「最初の1文で内容の8割がわかる。最初を聞き逃したら諦めろ」。',
  masterQuote:
    '「ボイスメールは必ず名乗る。アナウンスは必ず目的を言う。パターンを知れば聞く前から半分わかる。」',
  scoreImpact:
    '30問で700点超えのカギになる部分。特に後半の難しいトーク（問題31〜70内の後半）は900点ユーザーでも落とす。ここで20問以上取れれば全体が安定する。',
  techniques: [
    {
      id: 'p4-predict-from-intro',
      name: 'Predict from Introduction',
      nameJa: 'イントロからの予測',
      description:
        'トークの最初2〜3文でジャンル・話題・目的が判明する。"Welcome to our annual awards ceremony..." と聞こえたら「授賞式のアナウンス、受賞者情報が出る」と予測できる。予測が当たれば後半は楽に聞ける。',
      example:
        '"Hello, this is Jennifer from Riverside Medical Clinic calling for Mr. Harrison."\n→ Voicemail / medical / scheduling → Next info will be: appointment detail or request to call back',
      effectiveness: 3,
    },
    {
      id: 'p4-first-sentence-topic',
      name: 'First-Sentence Topic Lock',
      nameJa: '第1文でトピックロック',
      description:
        '第1文が全体のトピックを確定させる。ここを聞き逃すと残り全部が霧の中になる。先読み後、音声開始直後は最大集中。特に設問の "What is the main topic of this talk?" は第1文で9割答えが出る。',
      example:
        'Q: "What is the talk mainly about?"\nFirst sentence: "Today, we\'re announcing some major changes to our customer loyalty program."\n→ Answer: Changes to a rewards program',
      effectiveness: 3,
    },
    {
      id: 'p4-last-sentence-action',
      name: 'Last-Sentence Action',
      nameJa: '最終文アクション確認',
      description:
        '「次に何をするべきか」「リスナーへの要求は何か」は最後の1〜2文に集中する。特にボイスメール・アナウンス系で顕著。先読みで "What are listeners asked to do?" 系の設問を確認したら最終文に全集中する。',
      example:
        '"Please call us back at 555-2345 before 5 PM to reschedule your appointment."\nQ: "What are listeners asked to do?"\nRight: "Call to rearrange a meeting time"',
      effectiveness: 3,
    },
    {
      id: 'p4-voicemail-structure',
      name: 'Voicemail Structure',
      nameJa: 'ボイスメール構造の理解',
      description:
        'ボイスメールには固定パターンがある：①名乗り ②目的説明 ③詳細（日時・場所・条件） ④依頼事項 ⑤連絡先。この型を知ってれば聞く前から「何が来るか」がわかる。設問も「目的は？」「依頼内容は？」が多い。',
      example:
        'Pattern: "Hi, this is [name] from [company]. I\'m calling about [topic]. [Details]. Please [action] at [contact]."\n→ Q: "Why is she calling?" → Topic part\n→ Q: "What should the listener do?" → Action part',
      effectiveness: 3,
    },
    {
      id: 'p4-announcement-patterns',
      name: 'Announcement Pattern Recognition',
      nameJa: 'アナウンス型の構造認識',
      description:
        '空港・店舗・職場でのアナウンスにも定型がある：①対象者 ②場所・時間 ③内容・変更 ④対応依頼。"Attention passengers on Flight 302..." と始まったら「遅延・ゲート変更・搭乗案内」のどれかがほぼ確定。',
      example:
        '"Attention all shoppers. The store will be closing in 15 minutes. Please bring your selections to the register."\n→ Pattern: Store closing announcement\n→ Q "What are customers asked to do?": "Go to the checkout"',
      effectiveness: 2,
    },
    {
      id: 'p4-news-report-structure',
      name: 'News Report Structure',
      nameJa: 'ニュース型の構造認識',
      description:
        'ニュース形式のトークは：①ヘッドライン（何が起きた） ②詳細（いつ・どこ・誰） ③影響・コメント ④今後の動向の順。設問の "According to the report..." は詳細部分、"What might happen next?" は最後の展望部分を指す。',
      example:
        '"In local business news, a major tech company announced today it will be relocating its headquarters downtown."\n→ Who: tech company, What: relocation, When: today\n→ Details to follow about why/where/when exactly',
      effectiveness: 2,
    },
    {
      id: 'p4-advertisement-cues',
      name: 'Advertisement Recognition',
      nameJa: '広告型の見抜き方',
      description:
        '広告トークはポジティブな誇張表現が続く。"best", "exclusive", "limited time", "don\'t miss out" が頻出。設問は「何を宣伝してるか」「どこに連絡するか」「特典は何か」が多い。感情的な言葉に惑わされず事実を拾う。',
      example:
        '"This weekend only, enjoy 30% off all furniture at Morrison\'s Home. Visit us at 450 Oak Street or call 555-HOME."\n→ Q "What discount is offered?": 30%\n→ Q "How can listeners contact the store?": Phone or in-person',
      effectiveness: 2,
    },
  ],
  commonMistakes: [
    {
      mistake: 'トークの第1文を先読みに気を取られて聞き逃す',
      why: '先読みに夢中になり、音声開始の瞬間を見逃してしまう。',
      fix: '先読みは音声の合間（前のセットの解答後〜次のセット音声開始前）に行う。音声が始まったら即座に耳モードに切り替える。',
    },
    {
      mistake: '全部の情報を記憶しようとして混乱する',
      why: '1人が長く話すため、情報量が多すぎて処理しきれない。',
      fix: '設問で聞かれていること以外はノイズと割り切る。先読みで「何を聞くか」を決めてから聞くと、必要な情報だけが耳に入ってくる。',
    },
    {
      mistake: 'ボイスメールで名前や電話番号を完全に記憶しようとする',
      why: '数字や固有名詞が出ると記憶しようとして本文の内容を見失う。',
      fix: '電話番号や具体的な数字は選択肢と突き合わせれば判断できる。完全記憶より「こういう数字が出た」という程度の記憶で十分。',
    },
    {
      mistake: 'グラフィック問題で図を見るタイミングが遅れる',
      why: '音声に集中しすぎて、図を参照するのが後回しになる。',
      fix: '先読み時に図の構造（行・列・項目名）を把握しておく。音声で「数字や固有名詞が言及された瞬間」に図を参照する。',
    },
  ],
};

export const strategyGuide: StrategySection[] = [
  part1Strategies,
  part2Strategies,
  part3Strategies,
  part4Strategies,
];

// Helper: Get strategy by part number
export function getStrategyByPart(part: number): StrategySection | undefined {
  return strategyGuide.find((s) => s.partNumber === part);
}

// Helper: Get all techniques for a part
export function getTechniquesForPart(part: number): Technique[] {
  return getStrategyByPart(part)?.techniques ?? [];
}

// Helper: Get techniques by effectiveness
export function getTopTechniques(minEffectiveness: 1 | 2 | 3 = 3): Technique[] {
  return strategyGuide.flatMap((s) =>
    s.techniques.filter((t) => t.effectiveness >= minEffectiveness)
  );
}

// Helper: Get common mistakes for a part
export function getMistakesForPart(part: number): CommonMistake[] {
  return getStrategyByPart(part)?.commonMistakes ?? [];
}

export default strategyGuide;
