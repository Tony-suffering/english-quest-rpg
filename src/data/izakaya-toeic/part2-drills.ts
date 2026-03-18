// 居酒屋TOEIC -- Part 2 Rapid-Fire Drill Bank
// 120+ questions covering all Part 2 question types

export interface Part2Choice {
  text: string;
  isCorrect: boolean;
  trapType?: string;
}

export type Part2QuestionType =
  | 'wh-who'
  | 'wh-what'
  | 'wh-where'
  | 'wh-when'
  | 'wh-why'
  | 'wh-how'
  | 'yes-no'
  | 'negative'
  | 'tag'
  | 'choice'
  | 'suggestion'
  | 'request'
  | 'offer'
  | 'statement';

export interface Part2Drill {
  id: string;
  audioScript: string;
  choices: [Part2Choice, Part2Choice, Part2Choice];
  correctIndex: 0 | 1 | 2;
  questionType: Part2QuestionType;
  trapType?: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  scoreLevel: 400 | 500 | 600 | 700 | 800;
  tip?: string;
}

// ---------------------------------------------------------------------------
// WH -- WHO (8 questions)
// ---------------------------------------------------------------------------

const whoQuestions: Part2Drill[] = [
  {
    id: 'p2-who-001',
    audioScript: 'Who is responsible for the marketing campaign?',
    choices: [
      { text: 'Sandra from the advertising team.', isCorrect: true },
      { text: 'The campaign starts next Monday.', isCorrect: false, trapType: 'topic-shift' },
      { text: 'It was very successful.', isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-who',
    explanation: 'Who → 人を答える。B・Cは「キャンペーンの日程/結果」を答えてて完全にズレ。',
    difficulty: 'easy',
    scoreLevel: 400,
    tip: 'Whoには必ず人名・部署・役職で返す。',
  },
  {
    id: 'p2-who-002',
    audioScript: "Who approved the budget for the new project?",
    choices: [
      { text: 'The budget was approved last week.', isCorrect: false, trapType: 'topic-shift' },
      { text: 'Mr. Tanaka in the finance department.', isCorrect: true },
      { text: 'About two million dollars.', isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-who',
    explanation: '予算を承認したのは誰？→ 人名＋部署で答えるAが正解。Cは金額を答えてて完全にズレ。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-who-003',
    audioScript: "Who will be presenting at tomorrow's conference?",
    choices: [
      { text: "I'm not sure, but I think it's Dr. Williams.", isCorrect: true },
      { text: "The conference is in the main hall.", isCorrect: false, trapType: 'topic-shift' },
      { text: "Yes, I attended last year.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 0,
    questionType: 'wh-who',
    explanation: '「誰が発表するか」→ 間接的でもDr. Williamsという人名が入ってるAが正解。YesはWho質問に使えない。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-who-004',
    audioScript: "Who should I contact about the equipment malfunction?",
    choices: [
      { text: "The equipment is on the third floor.", isCorrect: false, trapType: 'verbatim' },
      { text: "Try calling the facilities manager.", isCorrect: true },
      { text: "It happened this morning.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-who',
    explanation: '「誰に連絡すべきか」→ facilitiesマネージャーに電話してという提案が正解。Aはequipmentを繰り返す音罠。',
    difficulty: 'medium',
    scoreLevel: 500,
    tip: '問題文の単語を繰り返す選択肢はほぼ罠。',
  },
  {
    id: 'p2-who-005',
    audioScript: "Who handles customer complaints in this department?",
    choices: [
      { text: "We receive a lot of complaints.", isCorrect: false, trapType: 'verbatim' },
      { text: "Customer service is on the second floor.", isCorrect: false, trapType: 'similar-sound' },
      { text: "That would be Ms. Park or her assistant.", isCorrect: true },
    ],
    correctIndex: 2,
    questionType: 'wh-who',
    explanation: '担当者を問う→ Ms. Parkまたはアシスタントという人名回答が正解。Bは場所を答えててズレ。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-who-006',
    audioScript: "Who did you speak with at the branch office?",
    choices: [
      { text: "I spoke with the regional director.", isCorrect: true },
      { text: "I went there last Tuesday.", isCorrect: false, trapType: 'topic-shift' },
      { text: "The branch office is quite large.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 0,
    questionType: 'wh-who',
    explanation: '「誰と話したか」→ regional directorという役職回答が正解。Bは時期、Cは場所の説明でどちらもズレ。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-who-007',
    audioScript: "Who authorized the overtime pay for last month?",
    choices: [
      { text: "Overtime was necessary due to the deadline.", isCorrect: false, trapType: 'verbatim' },
      { text: "You'd have to ask HR about that.", isCorrect: true },
      { text: "It was paid on the fifteenth.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-who',
    explanation: '「誰が承認したか」→ HRに聞いてという間接回答が正解。TOEICは「知らない/他の人に聞け」系の間接回答が頻出。',
    difficulty: 'hard',
    scoreLevel: 600,
    tip: '「You\'d have to ask...」「I\'m not sure who...」系は正解率高い間接回答パターン。',
  },
  {
    id: 'p2-who-008',
    audioScript: "Who's in charge while the director is away?",
    choices: [
      { text: "She'll be back on Thursday.", isCorrect: false, trapType: 'topic-shift' },
      { text: "The director's office is on the top floor.", isCorrect: false, trapType: 'verbatim' },
      { text: "Mr. Chen is acting as interim director.", isCorrect: true },
    ],
    correctIndex: 2,
    questionType: 'wh-who',
    explanation: '「誰が代理か」→ Mr. Chenが代理という人名回答が正解。Aは帰還日、Bは場所を答えてズレ。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
];

// ---------------------------------------------------------------------------
// WH -- WHAT (8 questions)
// ---------------------------------------------------------------------------

const whatQuestions: Part2Drill[] = [
  {
    id: 'p2-what-001',
    audioScript: 'What time does the meeting start?',
    choices: [
      { text: 'In the large conference room.', isCorrect: false, trapType: 'topic-shift' },
      { text: 'At two thirty this afternoon.', isCorrect: true },
      { text: 'About twenty people are attending.', isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-what',
    explanation: 'What time → 時刻を答える。Aは場所、Cは人数。両方ともwhat time質問への回答として完全にズレ。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-what-002',
    audioScript: 'What did the client say about the proposal?',
    choices: [
      { text: 'They seemed very impressed with it.', isCorrect: true },
      { text: 'The proposal is due next Friday.', isCorrect: false, trapType: 'verbatim' },
      { text: 'I sent it to them yesterday.', isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-what',
    explanation: '「クライアントが何と言ったか」→ 感想を伝えるAが正解。Bはproposalを繰り返す音罠。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-what-003',
    audioScript: 'What is included in the service package?',
    choices: [
      { text: 'The package is available online.', isCorrect: false, trapType: 'similar-sound' },
      { text: 'It covers installation and two years of support.', isCorrect: true },
      { text: 'We offer several service options.', isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-what',
    explanation: '「何が含まれるか」→ 内容を具体的に説明するBが正解。Cは「オプションがある」とはぐらかしてるだけ。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-what-004',
    audioScript: "What's the best way to get to the airport from here?",
    choices: [
      { text: 'Taking the express train would be fastest.', isCorrect: true },
      { text: 'The airport is about thirty kilometers away.', isCorrect: false, trapType: 'topic-shift' },
      { text: "Your flight departs at eight.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-what',
    explanation: '「どうやって行くか」→ 交通手段を答えるAが正解。Bは距離、Cは出発時刻でズレ。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-what-005',
    audioScript: 'What changes were made to the annual report?',
    choices: [
      { text: 'The report was submitted on time.', isCorrect: false, trapType: 'verbatim' },
      { text: 'Several charts were updated and the summary was revised.', isCorrect: true },
      { text: 'It covers the full fiscal year.', isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-what',
    explanation: '「何が変更されたか」→ 変更内容を具体的に述べるBが正解。reportを繰り返すAは音罠。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-what-006',
    audioScript: 'What do you think about the new office layout?',
    choices: [
      { text: 'The office was renovated last spring.', isCorrect: false, trapType: 'verbatim' },
      { text: "I haven't had a chance to see it yet.", isCorrect: true },
      { text: 'There are about fifty employees here.', isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-what',
    explanation: '「どう思うか」→ まだ見てないという間接回答Bが正解。TOEICでは「まだ知らない」系回答が頻出。',
    difficulty: 'medium',
    scoreLevel: 600,
    tip: '「I haven\'t had a chance to...」は正解パターンの定番。',
  },
  {
    id: 'p2-what-007',
    audioScript: 'What seems to be the problem with the photocopier?',
    choices: [
      { text: "It's on the second floor near the elevator.", isCorrect: false, trapType: 'topic-shift' },
      { text: "I think it's out of paper.", isCorrect: true },
      { text: 'We bought it three years ago.', isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-what',
    explanation: '「コピー機の問題は何か」→ 紙切れという具体的な問題を述べるBが正解。場所や購入時期は完全にズレ。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-what-008',
    audioScript: 'What position did she apply for?',
    choices: [
      { text: 'She applied last month.', isCorrect: false, trapType: 'similar-sound' },
      { text: "I believe it was the marketing coordinator role.", isCorrect: true },
      { text: 'Her application was very impressive.', isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 1,
    questionType: 'wh-what',
    explanation: '「何のポジションに応募したか」→ 役職名を答えるBが正解。Aはapplyを繰り返す音罠。',
    difficulty: 'hard',
    scoreLevel: 600,
  },
];

// ---------------------------------------------------------------------------
// WH -- WHERE (8 questions)
// ---------------------------------------------------------------------------

const whereQuestions: Part2Drill[] = [
  {
    id: 'p2-where-001',
    audioScript: 'Where should I put these documents?',
    choices: [
      { text: "Just leave them on my desk, please.", isCorrect: true },
      { text: "They're very important documents.", isCorrect: false, trapType: 'verbatim' },
      { text: "I'll file them later today.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-where',
    explanation: '「どこに置けばいいか」→ 場所（デスクの上）を具体的に指示するAが正解。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-where-002',
    audioScript: 'Where is the annual shareholders meeting being held?',
    choices: [
      { text: "It's scheduled for next Thursday.", isCorrect: false, trapType: 'topic-shift' },
      { text: "At the Grand Hyatt downtown.", isCorrect: true },
      { text: "About three hundred shareholders will attend.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-where',
    explanation: 'Where → 場所を答える。日程(A)も人数(C)も「どこ」への回答にならない。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-where-003',
    audioScript: 'Where can I find the employee handbook?',
    choices: [
      { text: "HR should be able to give you a copy.", isCorrect: true },
      { text: "The handbook was updated recently.", isCorrect: false, trapType: 'verbatim' },
      { text: "New employees receive it on their first day.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-where',
    explanation: '「どこで見つけられるか」→ HRに聞けという場所の代替回答Aが正解。間接的でも「HRに行け」＝場所の情報。',
    difficulty: 'medium',
    scoreLevel: 500,
    tip: '「どこ」への回答は場所だけでなく「誰に聞け」系の間接回答もOK。',
  },
  {
    id: 'p2-where-004',
    audioScript: 'Where did you park your car this morning?',
    choices: [
      { text: "I took the subway today.", isCorrect: true },
      { text: "I usually park in lot B.", isCorrect: false, trapType: 'topic-shift' },
      { text: "My car is the blue sedan.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-where',
    explanation: '「今朝どこに駐車したか」→ 地下鉄で来たという間接回答Aが正解。駐車しなかった、という意味になる。',
    difficulty: 'hard',
    scoreLevel: 700,
    tip: '質問の前提を否定する間接回答はTOEIC最難関パターン。「駐車してない」を遠回しに言う。',
  },
  {
    id: 'p2-where-005',
    audioScript: 'Where will the training session take place?',
    choices: [
      { text: 'Room 204 on the second floor.', isCorrect: true },
      { text: 'The training lasts three hours.', isCorrect: false, trapType: 'topic-shift' },
      { text: "It's for all new hires.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-where',
    explanation: '「どこで行われるか」→ 部屋番号という場所を答えるAが正解。時間(B)も対象者(C)も場所じゃない。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-where-006',
    audioScript: 'Where do you usually hold client meetings?',
    choices: [
      { text: 'We typically meet twice a month.', isCorrect: false, trapType: 'topic-shift' },
      { text: 'Either here or at their office, depending on the client.', isCorrect: true },
      { text: 'The meetings usually last about an hour.', isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-where',
    explanation: '「どこで開くか」→ 「ここかクライアントの事務所」という場所の回答Bが正解。頻度(A)時間(C)はズレ。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-where-007',
    audioScript: "Where's the nearest coffee shop from this building?",
    choices: [
      { text: "There's one about a two-minute walk down the street.", isCorrect: true },
      { text: "I prefer tea myself.", isCorrect: false, trapType: 'topic-shift' },
      { text: "The coffee machine is on the third floor.", isCorrect: false, trapType: 'similar-sound' },
    ],
    correctIndex: 0,
    questionType: 'wh-where',
    explanation: '「どこにコーヒーショップがあるか」→ 徒歩2分という場所情報Aが正解。Cはcoffeeを使った音罠。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-where-008',
    audioScript: 'Where were the inventory discrepancies reported?',
    choices: [
      { text: "I'll look into it right away.", isCorrect: false, trapType: 'topic-shift' },
      { text: "In the monthly audit for the eastern warehouse.", isCorrect: true },
      { text: "The discrepancies were quite significant.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 1,
    questionType: 'wh-where',
    explanation: '「どこで報告されたか」→ 場所（東倉庫の月次監査）を答えるBが正解。discrepanciesを繰り返すCは音罠。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
];

// ---------------------------------------------------------------------------
// WH -- WHEN (8 questions)
// ---------------------------------------------------------------------------

const whenQuestions: Part2Drill[] = [
  {
    id: 'p2-when-001',
    audioScript: 'When is the deadline for the proposal?',
    choices: [
      { text: 'By end of business on Friday.', isCorrect: true },
      { text: "It's a very detailed proposal.", isCorrect: false, trapType: 'verbatim' },
      { text: "I'll submit it to the client.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-when',
    explanation: 'When → 時を答える。金曜EOBという期限がAの正解。BはProposalの繰り返し、Cは行動を述べてズレ。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-when-002',
    audioScript: 'When does the new policy take effect?',
    choices: [
      { text: "Starting from the first of next month.", isCorrect: true },
      { text: "The HR department drafted it.", isCorrect: false, trapType: 'topic-shift' },
      { text: "All employees must comply.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-when',
    explanation: '「いつ発効するか」→ 来月一日という日程Aが正解。誰が作ったか・誰が従うかはwhenへの答えじゃない。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-when-003',
    audioScript: 'When will the renovation work be completed?',
    choices: [
      { text: "It'll be quite expensive.", isCorrect: false, trapType: 'topic-shift' },
      { text: 'Sometime in mid-April, according to the contractor.', isCorrect: true },
      { text: 'The third floor is being renovated.', isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 1,
    questionType: 'wh-when',
    explanation: '「いつ完成するか」→ 4月中旬という時期Bが正解。費用(A)も場所(C)もwhenに答えてない。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-when-004',
    audioScript: "When did you last update your contact information?",
    choices: [
      { text: "My contact information is correct.", isCorrect: false, trapType: 'verbatim' },
      { text: "I think it was about six months ago.", isCorrect: true },
      { text: "You can update it on the company website.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-when',
    explanation: '「いつ最後に更新したか」→ 約6ヶ月前という時期Bが正解。Cは更新方法でズレ。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-when-005',
    audioScript: 'When can I expect a response to my application?',
    choices: [
      { text: "We'll be in touch within two weeks.", isCorrect: true },
      { text: "Applications can be submitted online.", isCorrect: false, trapType: 'verbatim' },
      { text: "We received many strong candidates.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-when',
    explanation: '「いつ返事がもらえるか」→ 2週間以内というAが正解。Bはapplicationを使った音罠。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-when-006',
    audioScript: 'When is a good time to schedule the performance review?',
    choices: [
      { text: "Performance reviews are very important.", isCorrect: false, trapType: 'verbatim' },
      { text: "How about sometime next week?", isCorrect: true },
      { text: "Mr. Robertson conducts all reviews.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-when',
    explanation: '「いつがいいか」→ 来週はどうかという時期の提案Bが正解。誰がやるか(C)はwhenに答えてない。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-when-007',
    audioScript: 'When was the last time the safety equipment was inspected?',
    choices: [
      { text: "I'll check the maintenance log for you.", isCorrect: true },
      { text: "All safety equipment is properly stored.", isCorrect: false, trapType: 'verbatim' },
      { text: "The inspection team has five members.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-when',
    explanation: '「いつ点検したか」→ メンテナンスログを確認するという間接回答Aが正解。知らないけど調べてあげる系。',
    difficulty: 'hard',
    scoreLevel: 600,
    tip: '「Let me check...」「I\'ll find out...」も立派な間接正解。',
  },
  {
    id: 'p2-when-008',
    audioScript: "When do you expect the shipment to arrive?",
    choices: [
      { text: "It depends on customs clearance.", isCorrect: true },
      { text: "We ordered about five hundred units.", isCorrect: false, trapType: 'topic-shift' },
      { text: "The shipping cost was reasonable.", isCorrect: false, trapType: 'similar-sound' },
    ],
    correctIndex: 0,
    questionType: 'wh-when',
    explanation: '「いつ到着するか」→ 税関次第という曖昧だが時期に関連した間接回答Aが正解。数量(B)費用(C)はズレ。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
];

// ---------------------------------------------------------------------------
// WH -- WHY (8 questions)
// ---------------------------------------------------------------------------

const whyQuestions: Part2Drill[] = [
  {
    id: 'p2-why-001',
    audioScript: 'Why was the conference postponed?',
    choices: [
      { text: 'The keynote speaker had a scheduling conflict.', isCorrect: true },
      { text: 'It was held at the convention center.', isCorrect: false, trapType: 'topic-shift' },
      { text: 'About two hundred people attended.', isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-why',
    explanation: 'Why → 理由を答える。スピーカーの都合という理由Aが正解。場所(B)人数(C)はwhyに答えていない。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-why-002',
    audioScript: "Why didn't you attend the morning briefing?",
    choices: [
      { text: "I had a client call that ran over.", isCorrect: true },
      { text: "The briefing was at nine o'clock.", isCorrect: false, trapType: 'topic-shift' },
      { text: "I attended all last week.", isCorrect: false, trapType: 'similar-sound' },
    ],
    correctIndex: 0,
    questionType: 'wh-why',
    explanation: '「なぜ出席しなかったか」→ クライアントとの電話が延びたという理由Aが正解。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-why-003',
    audioScript: 'Why is the lobby under construction?',
    choices: [
      { text: "They're upgrading the ventilation system.", isCorrect: true },
      { text: "Construction is expected to finish in March.", isCorrect: false, trapType: 'topic-shift' },
      { text: 'Use the side entrance instead.', isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-why',
    explanation: '「なぜ工事中か」→ 換気システム改修という理由Aが正解。完成時期(B)代替入口(C)はwhyへの答えじゃない。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-why-004',
    audioScript: 'Why do we need to revise the contract terms?',
    choices: [
      { text: "The contract expires next year.", isCorrect: false, trapType: 'verbatim' },
      { text: "The client requested some modifications.", isCorrect: true },
      { text: "Legal reviewed it last month.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-why',
    explanation: '「なぜ修正が必要か」→ クライアントが変更を要求したという理由Bが正解。contractを繰り返すAは音罠。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-why-005',
    audioScript: 'Why are so many employees working overtime this week?',
    choices: [
      { text: "We're trying to meet a major product launch deadline.", isCorrect: true },
      { text: "Overtime pay is approved by management.", isCorrect: false, trapType: 'topic-shift' },
      { text: "Not everyone is working late.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-why',
    explanation: '「なぜ残業が多いか」→ 製品ローンチの締め切りという理由Aが正解。承認者(B)や反論(C)はwhyに答えていない。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-why-006',
    audioScript: "Why hasn't the invoice been processed yet?",
    choices: [
      { text: "The invoice total is quite high.", isCorrect: false, trapType: 'verbatim' },
      { text: "There was a discrepancy in the billing amount.", isCorrect: true },
      { text: "Payments are made on the last business day.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-why',
    explanation: '「なぜまだ処理されてないか」→ 請求額に誤差があったという理由Bが正解。invoiceを繰り返すAは音罠。',
    difficulty: 'medium',
    scoreLevel: 600,
  },
  {
    id: 'p2-why-007',
    audioScript: "Why was the product recall issued?",
    choices: [
      { text: "A potential safety defect was discovered in testing.", isCorrect: true },
      { text: "The recall affected about ten thousand units.", isCorrect: false, trapType: 'verbatim' },
      { text: "It was announced last Tuesday.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-why',
    explanation: '「なぜリコールが出たか」→ 安全上の欠陥発見という理由Aが正解。数量(B)日程(C)はwhyに答えていない。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
  {
    id: 'p2-why-008',
    audioScript: "Why is the system down this morning?",
    choices: [
      { text: "IT is performing scheduled maintenance.", isCorrect: true },
      { text: "The system was installed two years ago.", isCorrect: false, trapType: 'topic-shift' },
      { text: "It should be back up shortly.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-why',
    explanation: '「なぜシステムがダウンしてるか」→ 定期メンテという理由Aが正解。Cは「いつ回復するか」を答えてズレ。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
];

// ---------------------------------------------------------------------------
// WH -- HOW (10 questions)
// ---------------------------------------------------------------------------

const howQuestions: Part2Drill[] = [
  {
    id: 'p2-how-001',
    audioScript: 'How long will the renovation take?',
    choices: [
      { text: 'About three to four weeks.', isCorrect: true },
      { text: "It's going to be very disruptive.", isCorrect: false, trapType: 'topic-shift' },
      { text: "They're renovating the east wing.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-how',
    explanation: 'How long → 期間を答える。3〜4週間というAが正解。感想(B)場所(C)はhow longに答えていない。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-how-002',
    audioScript: 'How many copies do we need for the presentation?',
    choices: [
      { text: "The presentation is at two o'clock.", isCorrect: false, trapType: 'topic-shift' },
      { text: 'Please print thirty, just to be safe.', isCorrect: true },
      { text: "I'll prepare the slides.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-how',
    explanation: 'How many → 数を答える。30部というBが正解。時間(A)や準備の話(C)はhow manyに答えていない。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-how-003',
    audioScript: 'How do I submit my expense report?',
    choices: [
      { text: 'Expense reports must be submitted monthly.', isCorrect: false, trapType: 'verbatim' },
      { text: 'You can do it through the online portal.', isCorrect: true },
      { text: 'Your manager needs to approve it first.', isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-how',
    explanation: '「どうやって提出するか」→ オンラインポータルという方法Bが正解。頻度(A)承認者(C)はhow=方法に答えていない。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-how-004',
    audioScript: 'How much does the extended warranty cost?',
    choices: [
      { text: 'The warranty covers all parts and labor.', isCorrect: false, trapType: 'verbatim' },
      { text: "It's an additional ninety-nine dollars per year.", isCorrect: true },
      { text: 'Our products are very reliable.', isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-how',
    explanation: 'How much → 金額を答える。99ドル/年というBが正解。内容(A)品質の話(C)はhow muchに答えていない。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-how-005',
    audioScript: 'How often does the management team hold all-hands meetings?',
    choices: [
      { text: 'Usually once a quarter.', isCorrect: true },
      { text: 'All employees are required to attend.', isCorrect: false, trapType: 'topic-shift' },
      { text: "They're held in the auditorium.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-how',
    explanation: 'How often → 頻度を答える。四半期に一度というAが正解。参加義務(B)場所(C)はhow oftenへの答えじゃない。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-how-006',
    audioScript: "How would you rate the new software interface?",
    choices: [
      { text: "It was installed last week.", isCorrect: false, trapType: 'topic-shift' },
      { text: "Honestly, I find it a bit complicated.", isCorrect: true },
      { text: "All staff have received training.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-how',
    explanation: '「どう評価するか」→ 正直少し複雑だという意見Bが正解。インストール時期(A)や研修(C)はhow=評価に答えていない。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-how-007',
    audioScript: "How did you find out about the job opening?",
    choices: [
      { text: "The position is still available.", isCorrect: false, trapType: 'verbatim' },
      { text: "A colleague recommended me to apply.", isCorrect: true },
      { text: "I've been job hunting for three months.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-how',
    explanation: '「どうやって知ったか」→ 同僚が勧めたという経緯Bが正解。求人状況(A)期間(C)はhow=経路に答えていない。',
    difficulty: 'medium',
    scoreLevel: 600,
  },
  {
    id: 'p2-how-008',
    audioScript: "How are the quarterly sales figures looking?",
    choices: [
      { text: "We report quarterly to the board.", isCorrect: false, trapType: 'verbatim' },
      { text: "Better than expected, actually.", isCorrect: true },
      { text: "The sales team is very dedicated.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-how',
    explanation: '「四半期売上はどうか」→ 予想より良いという状況報告Bが正解。quarterly(A)やsales(C)を使った音罠に注意。',
    difficulty: 'medium',
    scoreLevel: 600,
  },
  {
    id: 'p2-how-009',
    audioScript: "How soon can the design team deliver the mockups?",
    choices: [
      { text: "The design is really impressive.", isCorrect: false, trapType: 'verbatim' },
      { text: "They said by end of day Thursday.", isCorrect: true },
      { text: "There are four people on the design team.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'wh-how',
    explanation: 'How soon → 期限を答える。木曜日の終業時というBが正解。design(A)やteam(C)を繰り返す音罠に注意。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
  {
    id: 'p2-how-010',
    audioScript: "How should we handle the discrepancy in the inventory count?",
    choices: [
      { text: "We should recount the affected items immediately.", isCorrect: true },
      { text: "The inventory is done every six months.", isCorrect: false, trapType: 'verbatim' },
      { text: "The warehouse manager noticed it.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'wh-how',
    explanation: '「どう対応すべきか」→ 即座に再カウントという対処法Aが正解。inventory(B)を繰り返す音罠に注意。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
];

// ---------------------------------------------------------------------------
// YES/NO QUESTIONS (20 questions)
// ---------------------------------------------------------------------------

const yesNoQuestions: Part2Drill[] = [
  {
    id: 'p2-yn-001',
    audioScript: 'Is the report ready to be submitted?',
    choices: [
      { text: "Yes, I just finished it.", isCorrect: true },
      { text: "The report is on your desk.", isCorrect: false, trapType: 'verbatim' },
      { text: "It was submitted last week.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'yes-no',
    explanation: '「レポートは準備できているか」→ はい、今仕上げたというAが正解。reportを繰り返すBは音罠。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-yn-002',
    audioScript: 'Did anyone call while I was in the meeting?',
    choices: [
      { text: "Yes, Mr. Hoffman left a message.", isCorrect: true },
      { text: "The meeting ran a bit long.", isCorrect: false, trapType: 'similar-sound' },
      { text: "I'll set up a call for you.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'yes-no',
    explanation: '「会議中に電話があったか」→ はい、Hoffmanさんがメッセージを残したというAが正解。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-yn-003',
    audioScript: 'Have you reviewed the new company policy?',
    choices: [
      { text: "Not yet, I've been swamped today.", isCorrect: true },
      { text: "The company has several policies.", isCorrect: false, trapType: 'verbatim' },
      { text: "It was implemented last quarter.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'yes-no',
    explanation: '「新ポリシーを確認したか」→ まだ、今日は忙しかったという間接否定Aが正解。companyを繰り返すBは音罠。',
    difficulty: 'easy',
    scoreLevel: 400,
    tip: '「Not yet」「I haven\'t had time」は間接否定の定番。Yes/No両方カバーして覚える。',
  },
  {
    id: 'p2-yn-004',
    audioScript: 'Can you cover for me at the three o\'clock presentation?',
    choices: [
      { text: "I have a meeting at that time, unfortunately.", isCorrect: true },
      { text: "The presentation is in room three.", isCorrect: false, trapType: 'similar-sound' },
      { text: "Three o'clock works for me.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 0,
    questionType: 'yes-no',
    explanation: '「3時のプレゼンを代わりにやってもらえるか」→ その時間は会議があるという丁寧な断りAが正解。「three」を繰り返すBは音罠。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-yn-005',
    audioScript: 'Is there parking available near the venue?',
    choices: [
      { text: "The venue has a capacity of five hundred.", isCorrect: false, trapType: 'topic-shift' },
      { text: "I believe there's a garage two blocks away.", isCorrect: true },
      { text: "You should park legally.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'yes-no',
    explanation: '「駐車場はあるか」→ 2ブロック先にガレージがあるという間接的なYes回答Bが正解。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-yn-006',
    audioScript: "Do you know if the store closes early on Sundays?",
    choices: [
      { text: "The store is well-stocked.", isCorrect: false, trapType: 'verbatim' },
      { text: "I'm not sure -- you could check their website.", isCorrect: false, trapType: 'topic-shift' },
      { text: "You'd have to call and ask them.", isCorrect: true },
    ],
    correctIndex: 2,
    questionType: 'yes-no',
    explanation: '「日曜日に早く閉まるか知ってるか」→ 電話して聞いてみてという間接回答Cが正解。知らないけど調べる手段を提示。',
    difficulty: 'medium',
    scoreLevel: 600,
    tip: '「知らないけど〇〇で確認できるよ」系の間接回答はTOEIC頻出正解パターン。',
  },
  {
    id: 'p2-yn-007',
    audioScript: "Are you free for lunch tomorrow?",
    choices: [
      { text: "I'll have to check my schedule.", isCorrect: true },
      { text: "Lunch is served in the cafeteria.", isCorrect: false, trapType: 'similar-sound' },
      { text: "I usually eat at my desk.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'yes-no',
    explanation: '「明日ランチ空いてるか」→ スケジュールを確認しなきゃというAが正解。lunchを繰り返すBは音罠。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-yn-008',
    audioScript: 'Has the new product been approved for launch?',
    choices: [
      { text: "The approval process takes two weeks.", isCorrect: false, trapType: 'verbatim' },
      { text: "Yes, we got the green light yesterday.", isCorrect: true },
      { text: "The product will be sold internationally.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'yes-no',
    explanation: '「新製品はローンチ承認されたか」→ はい、昨日許可が出たというBが正解。approvalを繰り返すAは音罠。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-yn-009',
    audioScript: "Is the conference room booked for this afternoon?",
    choices: [
      { text: "Let me check the reservation calendar.", isCorrect: true },
      { text: "The conference was last week.", isCorrect: false, trapType: 'similar-sound' },
      { text: "We have a large conference room.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 0,
    questionType: 'yes-no',
    explanation: '「今日の午後、会議室は予約されているか」→ 予約カレンダーを確認するという間接回答Aが正解。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-yn-010',
    audioScript: "Were you able to reach the supplier this morning?",
    choices: [
      { text: "I'll contact them right away.", isCorrect: false, trapType: 'topic-shift' },
      { text: "They supply us with raw materials.", isCorrect: false, trapType: 'verbatim' },
      { text: "Their line was busy, so I left a message.", isCorrect: true },
    ],
    correctIndex: 2,
    questionType: 'yes-no',
    explanation: '「今朝サプライヤーに連絡できたか」→ 話し中でメッセージを残したという間接的な「できなかった」Cが正解。',
    difficulty: 'hard',
    scoreLevel: 700,
    tip: 'Yes/Noを言わずに状況を説明する間接回答は700点以上の壁。ストーリーを追う力が必要。',
  },
  {
    id: 'p2-yn-011',
    audioScript: "Do we have enough budget for the additional staff?",
    choices: [
      { text: "You'll have to ask the finance department.", isCorrect: true },
      { text: "The staff is very experienced.", isCorrect: false, trapType: 'verbatim' },
      { text: "Budget reports are due Friday.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 0,
    questionType: 'yes-no',
    explanation: '「追加スタッフの予算があるか」→ 財務部に聞いてという間接回答Aが正解。staffとbudget両方繰り返す罠に注意。',
    difficulty: 'medium',
    scoreLevel: 600,
  },
  {
    id: 'p2-yn-012',
    audioScript: "Will the guest speaker be joining us by video call?",
    choices: [
      { text: "She's planning to attend in person, I think.", isCorrect: true },
      { text: "Video calls can be unreliable.", isCorrect: false, trapType: 'verbatim' },
      { text: "The speaker is very well-known.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 0,
    questionType: 'yes-no',
    explanation: '「ビデオ通話で参加するか」→ 実際には対面参加予定というAが正解。video callを繰り返すBは音罠。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
  {
    id: 'p2-yn-013',
    audioScript: "Could the deadline be extended if necessary?",
    choices: [
      { text: "The deadline is the fifteenth.", isCorrect: false, trapType: 'verbatim' },
      { text: "That would be up to the project manager.", isCorrect: true },
      { text: "It's a very tight deadline.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 1,
    questionType: 'yes-no',
    explanation: '「締め切りを延ばせるか」→ プロジェクトマネージャー次第という間接回答Bが正解。deadlineを繰り返す罠が2つある。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
  {
    id: 'p2-yn-014',
    audioScript: "Does the hotel offer a shuttle service to the airport?",
    choices: [
      { text: "The hotel is close to downtown.", isCorrect: false, trapType: 'topic-shift' },
      { text: "I'm not sure -- I can look it up.", isCorrect: true },
      { text: "We should book early.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'yes-no',
    explanation: '「シャトルサービスはあるか」→ 知らないけど調べてあげるという間接回答Bが正解。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-yn-015',
    audioScript: "Has the catering order been confirmed?",
    choices: [
      { text: "Yes, I spoke with them this morning.", isCorrect: true },
      { text: "The catering service is highly recommended.", isCorrect: false, trapType: 'verbatim' },
      { text: "We need food for about forty people.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'yes-no',
    explanation: '「ケータリングの注文は確認できたか」→ はい、今朝話したというAが正解。cateringを繰り返すBは音罠。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-yn-016',
    audioScript: "Is the IT department aware of the network issue?",
    choices: [
      { text: "I reported it to them an hour ago.", isCorrect: true },
      { text: "The IT department is on the fourth floor.", isCorrect: false, trapType: 'verbatim' },
      { text: "Network issues happen all the time.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 0,
    questionType: 'yes-no',
    explanation: '「IT部門はネットワーク問題を知っているか」→ 1時間前に報告したというAが正解。IT departmentとnetworkを繰り返す罠が多い。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-yn-017',
    audioScript: "Do you need any help preparing for the audit?",
    choices: [
      { text: "The audit is scheduled for Thursday.", isCorrect: false, trapType: 'verbatim' },
      { text: "Actually, some extra hands would be great.", isCorrect: true },
      { text: "We passed the last one with no issues.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'yes-no',
    explanation: '「監査の準備を手伝おうか」→ はい、手を貸してもらえると助かるというBが正解。auditを繰り返すAは音罠。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-yn-018',
    audioScript: "Can the seminar be moved to a larger room?",
    choices: [
      { text: "The seminar topic is very popular.", isCorrect: false, trapType: 'verbatim' },
      { text: "All our larger rooms are already reserved.", isCorrect: true },
      { text: "It starts at ten in the morning.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'yes-no',
    explanation: '「もっと大きな部屋に移せるか」→ 大きな部屋は全部予約済みという間接的な「できない」Bが正解。',
    difficulty: 'hard',
    scoreLevel: 600,
  },
  {
    id: 'p2-yn-019',
    audioScript: "Did management approve the travel reimbursement?",
    choices: [
      { text: "I'll reimburse you for all expenses.", isCorrect: false, trapType: 'similar-sound' },
      { text: "Travel for business is quite common.", isCorrect: false, trapType: 'topic-shift' },
      { text: "I haven't heard back yet.", isCorrect: true },
    ],
    correctIndex: 2,
    questionType: 'yes-no',
    explanation: '「経費精算が承認されたか」→ まだ返事をもらっていないという間接回答Cが正解。reimbursement(A)を繰り返す音罠に注意。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
  {
    id: 'p2-yn-020',
    audioScript: "Will you be attending the industry conference in Chicago?",
    choices: [
      { text: "Chicago is a great city for conferences.", isCorrect: false, trapType: 'verbatim' },
      { text: "My manager hasn't approved the trip yet.", isCorrect: true },
      { text: "The conference covers many topics.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 1,
    questionType: 'yes-no',
    explanation: '「シカゴの会議に出席するか」→ マネージャーがまだ承認していないという間接的なYet to be decidedのBが正解。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
];

// ---------------------------------------------------------------------------
// NEGATIVE QUESTIONS (15 questions) -- THE HARDEST TYPE
// ---------------------------------------------------------------------------

const negativeQuestions: Part2Drill[] = [
  {
    id: 'p2-neg-001',
    audioScript: "Hasn't the package arrived yet?",
    choices: [
      { text: "No, I'm still waiting for it.", isCorrect: true },
      { text: "Yes, it hasn't been delivered.", isCorrect: false, trapType: 'wrong-tense' },
      { text: "The package is quite heavy.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 0,
    questionType: 'negative',
    explanation: '「まだ届いていないの？」→ No＝そう、まだ待ってるという回答Aが正解。Bは「Yes + haven\'t」という矛盾した論理的な罠。',
    difficulty: 'medium',
    scoreLevel: 600,
    tip: '否定疑問文: No=「そうだ、〜してない」。Yes=「いや、〜した」。日本語の感覚と逆になる。',
  },
  {
    id: 'p2-neg-002',
    audioScript: "Don't you think we should reconsider the budget?",
    choices: [
      { text: "Actually, I agree we should review it.", isCorrect: true },
      { text: "The budget was set last quarter.", isCorrect: false, trapType: 'verbatim' },
      { text: "No, I don't think about it.", isCorrect: false, trapType: 'similar-sound' },
    ],
    correctIndex: 0,
    questionType: 'negative',
    explanation: '「予算を見直すべきだと思わない？」→ 同意してレビューすべきと言うAが正解。Cはdon\'tを繰り返す文法的な罠。',
    difficulty: 'medium',
    scoreLevel: 600,
  },
  {
    id: 'p2-neg-003',
    audioScript: "Isn't there a meeting this afternoon?",
    choices: [
      { text: "Meetings are held every Monday.", isCorrect: false, trapType: 'verbatim' },
      { text: "It was rescheduled to tomorrow.", isCorrect: true },
      { text: "Yes, there isn't one.", isCorrect: false, trapType: 'wrong-tense' },
    ],
    correctIndex: 1,
    questionType: 'negative',
    explanation: '「今日の午後、会議じゃなかった？」→ 明日に変更されたという間接回答Bが正解。Cは「Yes + isn\'t」という矛盾。',
    difficulty: 'medium',
    scoreLevel: 600,
    tip: '否定疑問文への「Yes, there isn\'t」は絶対に正解にならない。論理的矛盾。',
  },
  {
    id: 'p2-neg-004',
    audioScript: "Didn't the client request a revised quote?",
    choices: [
      { text: "Yes, I'll prepare one right away.", isCorrect: true },
      { text: "The client is very demanding.", isCorrect: false, trapType: 'verbatim' },
      { text: "We quote all our projects separately.", isCorrect: false, trapType: 'similar-sound' },
    ],
    correctIndex: 0,
    questionType: 'negative',
    explanation: '「クライアントは修正見積を要求しなかった？」→ Yes（要求した）、すぐ準備するというAが正解。',
    difficulty: 'medium',
    scoreLevel: 600,
  },
  {
    id: 'p2-neg-005',
    audioScript: "Haven't you met the new operations manager?",
    choices: [
      { text: "Operations have been running smoothly.", isCorrect: false, trapType: 'similar-sound' },
      { text: "No, I've been on leave this week.", isCorrect: true },
      { text: "The manager is very experienced.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 1,
    questionType: 'negative',
    explanation: '「もう新しいオペレーションマネージャーに会った？」→ No（会ってない）、今週休暇中だったというBが正解。',
    difficulty: 'medium',
    scoreLevel: 600,
  },
  {
    id: 'p2-neg-006',
    audioScript: "Wasn't the sales target met last quarter?",
    choices: [
      { text: "No, we fell a little short.", isCorrect: true },
      { text: "Sales targets are set annually.", isCorrect: false, trapType: 'verbatim' },
      { text: "Last quarter was very challenging.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'negative',
    explanation: '「先四半期、目標達成できなかった？」→ No（できなかった）、少し届かなかったというAが正解。',
    difficulty: 'hard',
    scoreLevel: 700,
    tip: 'No = 「そう、できなかった」。Yes = 「いや、できた」。否定疑問は日本語話者の鬼門。',
  },
  {
    id: 'p2-neg-007',
    audioScript: "Shouldn't we notify the client about the delay?",
    choices: [
      { text: "The delay is due to supply issues.", isCorrect: false, trapType: 'topic-shift' },
      { text: "I was just about to do that.", isCorrect: true },
      { text: "No, we shouldn't notify them.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 1,
    questionType: 'negative',
    explanation: '「クライアントに遅延を連絡すべきじゃない？」→ 今まさにしようとしてたというBが正解。shouldを繰り返すCは音罠。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
  {
    id: 'p2-neg-008',
    audioScript: "Won't the additional costs affect our profit margin?",
    choices: [
      { text: "We might need to adjust our pricing.", isCorrect: true },
      { text: "The costs were unexpected.", isCorrect: false, trapType: 'verbatim' },
      { text: "Profit is our primary goal.", isCorrect: false, trapType: 'similar-sound' },
    ],
    correctIndex: 0,
    questionType: 'negative',
    explanation: '「追加コストは利益率に影響しない？」→ 価格調整が必要かもという間接的な「影響する」Aが正解。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
  {
    id: 'p2-neg-009',
    audioScript: "Couldn't the project be completed ahead of schedule?",
    choices: [
      { text: "It's possible if we add more resources.", isCorrect: true },
      { text: "The schedule has already been set.", isCorrect: false, trapType: 'verbatim' },
      { text: "The project team is working hard.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'negative',
    explanation: '「前倒しで完成できない？」→ リソースを追加すれば可能というAが正解。scheduleを繰り返すBは音罠。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
  {
    id: 'p2-neg-010',
    audioScript: "Aren't the new regulations supposed to take effect next month?",
    choices: [
      { text: "Regulations change frequently in this industry.", isCorrect: false, trapType: 'verbatim' },
      { text: "The deadline was pushed back to January.", isCorrect: true },
      { text: "We'll need to update our procedures.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'negative',
    explanation: '「新規制は来月から施行じゃないの？」→ 1月に延期になったというBが正解。regulationsを繰り返すAは音罠。',
    difficulty: 'hard',
    scoreLevel: 800,
  },
  {
    id: 'p2-neg-011',
    audioScript: "Didn't you say the presentation was moved to Thursday?",
    choices: [
      { text: "The presentation is very comprehensive.", isCorrect: false, trapType: 'verbatim' },
      { text: "Actually, it's still on Wednesday.", isCorrect: true },
      { text: "I'll check the meeting agenda.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'negative',
    explanation: '「木曜に変更って言ってなかった？」→ いや、水曜のままというBが正解。前提を否定する難問。',
    difficulty: 'hard',
    scoreLevel: 800,
  },
  {
    id: 'p2-neg-012',
    audioScript: "Hasn't someone already reserved that meeting room?",
    choices: [
      { text: "Meeting rooms are available to all staff.", isCorrect: false, trapType: 'verbatim' },
      { text: "I'm not sure -- the calendar looked open.", isCorrect: true },
      { text: "Yes, we should reserve it.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'negative',
    explanation: '「その会議室、もう誰かが予約してない？」→ 不確かだけどカレンダーは空いてたという間接回答Bが正解。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
  {
    id: 'p2-neg-013',
    audioScript: "Weren't you supposed to call the vendor this morning?",
    choices: [
      { text: "I forgot -- I'll do it now.", isCorrect: true },
      { text: "The vendor has a good reputation.", isCorrect: false, trapType: 'verbatim' },
      { text: "Calls should go through reception.", isCorrect: false, trapType: 'similar-sound' },
    ],
    correctIndex: 0,
    questionType: 'negative',
    explanation: '「今朝、ベンダーに電話するはずじゃなかった？」→ 忘れてた、今やるというAが正解。シンプルだが「supposed to」の理解が必要。',
    difficulty: 'medium',
    scoreLevel: 600,
  },
  {
    id: 'p2-neg-014',
    audioScript: "Isn't the parking garage closed for maintenance today?",
    choices: [
      { text: "I heard it reopens at noon.", isCorrect: true },
      { text: "Maintenance is done regularly.", isCorrect: false, trapType: 'verbatim' },
      { text: "Parking is included in the lease.", isCorrect: false, trapType: 'similar-sound' },
    ],
    correctIndex: 0,
    questionType: 'negative',
    explanation: '「駐車場は今日メンテのため閉まってない？」→ 正午に再開するという情報Aが正解。closedに対して reopensで答える高度な応答。',
    difficulty: 'hard',
    scoreLevel: 800,
  },
  {
    id: 'p2-neg-015',
    audioScript: "Don't we need board approval for expenditures over ten thousand?",
    choices: [
      { text: "Board meetings are held quarterly.", isCorrect: false, trapType: 'topic-shift' },
      { text: "That threshold was raised last year.", isCorrect: true },
      { text: "Expenditures must be documented.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 1,
    questionType: 'negative',
    explanation: '「1万ドル超の支出は取締役承認が必要じゃない？」→ その基準は昨年引き上げられたというBが正解。前提を修正する最難関パターン。',
    difficulty: 'hard',
    scoreLevel: 800,
    tip: '前提の事実関係そのものを修正する間接回答はTOEIC最難関。「その前提、もう古いよ」パターン。',
  },
];

// ---------------------------------------------------------------------------
// TAG QUESTIONS (10 questions)
// ---------------------------------------------------------------------------

const tagQuestions: Part2Drill[] = [
  {
    id: 'p2-tag-001',
    audioScript: "The report is due Friday, isn't it?",
    choices: [
      { text: "Yes, by five o'clock.", isCorrect: true },
      { text: "The report is very detailed.", isCorrect: false, trapType: 'verbatim' },
      { text: "Friday is usually quite busy.", isCorrect: false, trapType: 'similar-sound' },
    ],
    correctIndex: 0,
    questionType: 'tag',
    explanation: '「レポートは金曜締めだよね？」→ はい、5時までにというAが正解。付加疑問文は同意or訂正で返す。',
    difficulty: 'easy',
    scoreLevel: 400,
    tip: '付加疑問文は「そうだよね？」と確認している。同意or訂正が正解。',
  },
  {
    id: 'p2-tag-002',
    audioScript: "You haven't met the new manager, have you?",
    choices: [
      { text: "No, I've been traveling all week.", isCorrect: true },
      { text: "The manager is very competent.", isCorrect: false, trapType: 'verbatim' },
      { text: "Yes, I haven't seen him.", isCorrect: false, trapType: 'wrong-tense' },
    ],
    correctIndex: 0,
    questionType: 'tag',
    explanation: '「新しいマネージャーにまだ会ってないでしょ？」→ No（会ってない）、今週ずっと出張だったというAが正解。Cは「Yes + haven\'t」の矛盾。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-tag-003',
    audioScript: "The office supply order was placed yesterday, wasn't it?",
    choices: [
      { text: "Actually, I think it was this morning.", isCorrect: true },
      { text: "Office supplies are ordered monthly.", isCorrect: false, trapType: 'verbatim' },
      { text: "Yes, it wasn't placed yet.", isCorrect: false, trapType: 'wrong-tense' },
    ],
    correctIndex: 0,
    questionType: 'tag',
    explanation: '「備品の注文は昨日したよね？」→ 実は今朝だったという訂正Aが正解。付加疑問文への「訂正」パターン。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-tag-004',
    audioScript: "This is your first time attending the global summit, isn't it?",
    choices: [
      { text: "The summit is held annually.", isCorrect: false, trapType: 'verbatim' },
      { text: "Actually, I attended two years ago.", isCorrect: true },
      { text: "Yes, it isn't my first time.", isCorrect: false, trapType: 'wrong-tense' },
    ],
    correctIndex: 1,
    questionType: 'tag',
    explanation: '「グローバルサミット初参加だよね？」→ 実は2年前も参加したという訂正Bが正解。Cは「Yes + isn\'t」の矛盾。',
    difficulty: 'medium',
    scoreLevel: 600,
  },
  {
    id: 'p2-tag-005',
    audioScript: "The contractors finished ahead of schedule, didn't they?",
    choices: [
      { text: "Yes, they completed it two days early.", isCorrect: true },
      { text: "Contractors are hired on a project basis.", isCorrect: false, trapType: 'verbatim' },
      { text: "The schedule was very tight.", isCorrect: false, trapType: 'similar-sound' },
    ],
    correctIndex: 0,
    questionType: 'tag',
    explanation: '「業者は予定より早く終わったよね？」→ Yes、2日早く完了したというAが正解。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-tag-006',
    audioScript: "We need to finalize the agenda before the meeting, don't we?",
    choices: [
      { text: "The meeting is at three o'clock.", isCorrect: false, trapType: 'topic-shift' },
      { text: "Yes, I'll send out a draft shortly.", isCorrect: true },
      { text: "Agendas should be concise.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 1,
    questionType: 'tag',
    explanation: '「会議前にアジェンダをまとめる必要があるよね？」→ はい、すぐ草案を送るというBが正解。同意＋行動の回答パターン。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-tag-007',
    audioScript: "Ms. Kim will be leading the workshop, won't she?",
    choices: [
      { text: "The workshop lasts all day.", isCorrect: false, trapType: 'topic-shift' },
      { text: "I heard Mr. Lee is filling in for her.", isCorrect: true },
      { text: "Yes, she won't be able to attend.", isCorrect: false, trapType: 'wrong-tense' },
    ],
    correctIndex: 1,
    questionType: 'tag',
    explanation: '「Kimさんがワークショップを仕切るよね？」→ Leeさんが代わりにやると聞いたという訂正Bが正解。Cは「Yes + won\'t」の矛盾。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
  {
    id: 'p2-tag-008',
    audioScript: "The new hires have all completed their onboarding, haven't they?",
    choices: [
      { text: "New employees start next week.", isCorrect: false, trapType: 'topic-shift' },
      { text: "There are still two who haven't finished.", isCorrect: true },
      { text: "Onboarding usually takes three days.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 1,
    questionType: 'tag',
    explanation: '「新入社員全員オンボーディング終わったよね？」→ まだ2人終わってないという部分訂正Bが正解。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
  {
    id: 'p2-tag-009',
    audioScript: "That client has worked with us for over a decade, hasn't she?",
    choices: [
      { text: "She's been a loyal customer since the beginning.", isCorrect: true },
      { text: "The client base has grown significantly.", isCorrect: false, trapType: 'topic-shift' },
      { text: "Our contract is renewed yearly.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'tag',
    explanation: '「そのクライアント、10年以上のお付き合いだよね？」→ 最初から忠実な顧客だったというAが正解。同意の回答。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-tag-010',
    audioScript: "The maintenance team checked the server room last week, didn't they?",
    choices: [
      { text: "Server maintenance is very important.", isCorrect: false, trapType: 'verbatim' },
      { text: "I'll verify that in the log.", isCorrect: true },
      { text: "The server room is on the basement level.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'tag',
    explanation: '「メンテチームは先週サーバールームを点検したよね？」→ ログで確認するという間接回答Bが正解。確信がないときの定番。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
];

// ---------------------------------------------------------------------------
// CHOICE QUESTIONS (10 questions)
// ---------------------------------------------------------------------------

const choiceQuestions: Part2Drill[] = [
  {
    id: 'p2-choice-001',
    audioScript: "Should we take the train or drive to the client's office?",
    choices: [
      { text: "Yes, let's take the train.", isCorrect: false, trapType: 'wrong-tense' },
      { text: "The train would be faster given the traffic.", isCorrect: true },
      { text: "The client's office is downtown.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 1,
    questionType: 'choice',
    explanation: '「電車か車か」→ 電車の方が速いというBが正解。A「Yes」はorの二択に使えない！orの罠。',
    difficulty: 'medium',
    scoreLevel: 500,
    tip: 'A or B型の質問にYes/Noで答えるのはNG。どちらか一方を選ぶ。',
  },
  {
    id: 'p2-choice-002',
    audioScript: "Would you prefer the window or aisle seat?",
    choices: [
      { text: "Either one is fine with me.", isCorrect: true },
      { text: "Yes, I prefer the window.", isCorrect: false, trapType: 'wrong-tense' },
      { text: "The flight is three hours long.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'choice',
    explanation: '「窓側か通路側か」→ どちらでもいいというAが正解。orの質問に「Yes」と答えるBは罠。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-choice-003',
    audioScript: "Do you want to meet in the morning or afternoon?",
    choices: [
      { text: "I have meetings all morning, so afternoon would be better.", isCorrect: true },
      { text: "Yes, morning is good.", isCorrect: false, trapType: 'wrong-tense' },
      { text: "We can meet at the usual place.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'choice',
    explanation: '「午前か午後か」→ 午前は会議があるので午後というAが正解。理由付きで片方を選ぶのが自然な回答。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-choice-004',
    audioScript: "Should I email the proposal or send it by mail?",
    choices: [
      { text: "Email would be quicker and easier to track.", isCorrect: true },
      { text: "The proposal is ready to send.", isCorrect: false, trapType: 'verbatim' },
      { text: "Yes, please send it right away.", isCorrect: false, trapType: 'wrong-tense' },
    ],
    correctIndex: 0,
    questionType: 'choice',
    explanation: '「メールか郵便か」→ メールの方が早くて追跡しやすいというAが正解。二択にYesで答えるCは罠。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-choice-005',
    audioScript: "Is the product available in blue or only in black?",
    choices: [
      { text: "It comes in several colors actually.", isCorrect: true },
      { text: "Yes, it's available in blue.", isCorrect: false, trapType: 'wrong-tense' },
      { text: "Black is a popular color choice.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 0,
    questionType: 'choice',
    explanation: '「青か黒だけか」→ 実は複数の色があるというAが正解。二択の前提を崩す「第三の選択肢」パターン。',
    difficulty: 'hard',
    scoreLevel: 700,
    tip: '二択を超えた第三の回答「両方ない」「他にもある」は高難度パターン。',
  },
  {
    id: 'p2-choice-006',
    audioScript: "Will the new hire report to you or to the department head?",
    choices: [
      { text: "She'll report directly to the department head.", isCorrect: true },
      { text: "We've hired several new people recently.", isCorrect: false, trapType: 'topic-shift' },
      { text: "Yes, reporting is important.", isCorrect: false, trapType: 'wrong-tense' },
    ],
    correctIndex: 0,
    questionType: 'choice',
    explanation: '「あなたか部門長か」→ 部門長に直接報告するというAが正解。二択への明確な回答。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-choice-007',
    audioScript: "Should we order Thai food or Italian for the team lunch?",
    choices: [
      { text: "Let me check if anyone has dietary restrictions first.", isCorrect: true },
      { text: "Yes, Thai is everyone's favorite.", isCorrect: false, trapType: 'wrong-tense' },
      { text: "Lunch starts at noon.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'choice',
    explanation: '「タイ料理かイタリアンか」→ まず食事制限がある人を確認するという間接回答Aが正解。即答しない自然な反応。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
  {
    id: 'p2-choice-008',
    audioScript: "Do you want me to handle the client or would you prefer to?",
    choices: [
      { text: "I'll take care of it -- you focus on the report.", isCorrect: true },
      { text: "Yes, the client is important.", isCorrect: false, trapType: 'wrong-tense' },
      { text: "Clients need special attention.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 0,
    questionType: 'choice',
    explanation: '「私が対応するか、あなたがするか」→ 私がやるからレポートに集中してというAが正解。二択への明確な意思表示。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-choice-009',
    audioScript: "Should the seminar be recorded for online viewing or kept in-person only?",
    choices: [
      { text: "Recording it would reach a wider audience.", isCorrect: true },
      { text: "Yes, we should record everything.", isCorrect: false, trapType: 'wrong-tense' },
      { text: "In-person seminars are more effective.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'choice',
    explanation: '「録画配信か対面のみか」→ 録画の方がより多くの聴衆にリーチできるという理由付き回答Aが正解。',
    difficulty: 'medium',
    scoreLevel: 600,
  },
  {
    id: 'p2-choice-010',
    audioScript: "Do you need the report in PDF or Word format?",
    choices: [
      { text: "Reports are due at the end of the month.", isCorrect: false, trapType: 'verbatim' },
      { text: "PDF would be preferable for distribution.", isCorrect: true },
      { text: "Yes, I need both formats.", isCorrect: false, trapType: 'wrong-tense' },
    ],
    correctIndex: 1,
    questionType: 'choice',
    explanation: '「PDFかWordか」→ 配布にはPDFが好ましいというBが正解。reportを繰り返すAは音罠。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
];

// ---------------------------------------------------------------------------
// SUGGESTIONS (5 questions)
// ---------------------------------------------------------------------------

const suggestionQuestions: Part2Drill[] = [
  {
    id: 'p2-sug-001',
    audioScript: "Why don't we reschedule the meeting to next week?",
    choices: [
      { text: "That sounds reasonable to me.", isCorrect: true },
      { text: "The meeting is at two o'clock.", isCorrect: false, trapType: 'verbatim' },
      { text: "Because we have a deadline.", isCorrect: false, trapType: 'similar-sound' },
    ],
    correctIndex: 0,
    questionType: 'suggestion',
    explanation: '「Why don\'t we ~?」は提案。「Because ~」と理由で答えるCは文法的な罠（whyに反応してしまう）。',
    difficulty: 'medium',
    scoreLevel: 500,
    tip: '「Why don\'t we ~?」は「なぜしないのか？」ではなく「〜しましょうよ」という提案。',
  },
  {
    id: 'p2-sug-002',
    audioScript: "How about holding the event outdoors this year?",
    choices: [
      { text: "That depends on the weather.", isCorrect: true },
      { text: "The event is very popular.", isCorrect: false, trapType: 'verbatim' },
      { text: "No, I don't hold events.", isCorrect: false, trapType: 'similar-sound' },
    ],
    correctIndex: 0,
    questionType: 'suggestion',
    explanation: '「今年は屋外でイベントをやるのはどう？」→ 天気次第というAが正解。提案への条件付き回答パターン。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-sug-003',
    audioScript: "Let's have a team lunch to celebrate the project completion.",
    choices: [
      { text: "Great idea -- I'll book a restaurant.", isCorrect: true },
      { text: "The project was completed last week.", isCorrect: false, trapType: 'verbatim' },
      { text: "Yes, let's not celebrate.", isCorrect: false, trapType: 'wrong-tense' },
    ],
    correctIndex: 0,
    questionType: 'suggestion',
    explanation: '「プロジェクト完成のお祝いランチをしよう」→ いい案、レストランを予約するというAが正解。同意＋行動パターン。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-sug-004',
    audioScript: "Why don't you ask a colleague to proofread your report?",
    choices: [
      { text: "Good idea -- I'll ask Ms. Kim.", isCorrect: true },
      { text: "Because the report is already finished.", isCorrect: false, trapType: 'similar-sound' },
      { text: "My report covers the full quarter.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 0,
    questionType: 'suggestion',
    explanation: '「同僚に校正を頼んだら？」→ いいね、Kimさんに頼むというAが正解。whyに「because」で返すBは典型的な罠。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-sug-005',
    audioScript: "We should consider hiring a freelancer for this project.",
    choices: [
      { text: "I've worked with a few reliable ones before.", isCorrect: true },
      { text: "The project deadline is in March.", isCorrect: false, trapType: 'topic-shift' },
      { text: "Freelancers are expensive.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'suggestion',
    explanation: '「フリーランサー採用を検討すべき」→ 以前信頼できる人と仕事したことがあるという間接的な賛成Aが正解。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
];

// ---------------------------------------------------------------------------
// REQUESTS (5 questions)
// ---------------------------------------------------------------------------

const requestQuestions: Part2Drill[] = [
  {
    id: 'p2-req-001',
    audioScript: "Could you forward me that email from the supplier?",
    choices: [
      { text: "Sure, I'll do it right now.", isCorrect: true },
      { text: "The supplier sent it yesterday.", isCorrect: false, trapType: 'topic-shift' },
      { text: "Email is the best way to communicate.", isCorrect: false, trapType: 'similar-sound' },
    ],
    correctIndex: 0,
    questionType: 'request',
    explanation: '「サプライヤーのメールを転送してもらえますか」→ いいよ、今すぐやるというAが正解。依頼への承諾。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-req-002',
    audioScript: "Could you make sure the projector is set up before the presentation?",
    choices: [
      { text: "The presentation is about quarterly results.", isCorrect: false, trapType: 'verbatim' },
      { text: "Of course, I'll check it this morning.", isCorrect: true },
      { text: "Yes, the projector is very old.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 1,
    questionType: 'request',
    explanation: '「プレゼン前にプロジェクターをセットしておいてもらえますか」→ もちろん、今朝確認するというBが正解。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-req-003',
    audioScript: "Would you mind staying a bit late tonight to finish the proposal?",
    choices: [
      { text: "The proposal looks very promising.", isCorrect: false, trapType: 'verbatim' },
      { text: "Not at all -- I can stay until seven.", isCorrect: true },
      { text: "Tonight's dinner plans are at eight.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'request',
    explanation: '「今夜少し残って提案書を仕上げてもらえますか」→ 全然構わない、7時まで残れるというBが正解。',
    difficulty: 'medium',
    scoreLevel: 500,
    tip: '「Would you mind ~?」に「Not at all」= 承諾。「Yes」= 拒否。日本語感覚と逆。',
  },
  {
    id: 'p2-req-004',
    audioScript: "Can you have the revised contract ready by Thursday?",
    choices: [
      { text: "Thursday is usually a busy day.", isCorrect: false, trapType: 'similar-sound' },
      { text: "I'll need to check with the legal team first.", isCorrect: true },
      { text: "The contract covers three years.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 1,
    questionType: 'request',
    explanation: '「木曜までに修正した契約書を準備できますか」→ まず法務チームに確認が必要という条件付き回答Bが正解。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
  {
    id: 'p2-req-005',
    audioScript: "Please ensure all team members receive a copy of the new guidelines.",
    choices: [
      { text: "The guidelines were updated recently.", isCorrect: false, trapType: 'verbatim' },
      { text: "I'll email everyone by end of day.", isCorrect: true },
      { text: "Team meetings are held weekly.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'request',
    explanation: '「新しいガイドラインを全員に配布してください」→ 今日中にメールするというBが正解。指示への明確な承諾＋行動。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
];

// ---------------------------------------------------------------------------
// OFFERS (5 questions)
// ---------------------------------------------------------------------------

const offerQuestions: Part2Drill[] = [
  {
    id: 'p2-offer-001',
    audioScript: "Would you like me to make a restaurant reservation for the team dinner?",
    choices: [
      { text: "Yes, please -- for eight people at seven o'clock.", isCorrect: true },
      { text: "The restaurant is very popular.", isCorrect: false, trapType: 'topic-shift' },
      { text: "Dinner is usually around seven.", isCorrect: false, trapType: 'similar-sound' },
    ],
    correctIndex: 0,
    questionType: 'offer',
    explanation: '「チームディナーの予約しましょうか」→ はい、8名で7時にというAが正解。申し出への具体的な承諾。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-offer-002',
    audioScript: "Can I get you something to drink while you wait?",
    choices: [
      { text: "Water would be great, thank you.", isCorrect: true },
      { text: "I've been waiting for a while.", isCorrect: false, trapType: 'similar-sound' },
      { text: "We have coffee and tea available.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'offer',
    explanation: '「お待ちの間、何かお飲み物を」→ 水をいただけますかというAが正解。申し出への自然な承諾。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-offer-003',
    audioScript: "Would you like me to translate the document for you?",
    choices: [
      { text: "The document is very technical.", isCorrect: false, trapType: 'verbatim' },
      { text: "That would save me a lot of time.", isCorrect: true },
      { text: "I'll have it translated by next week.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'offer',
    explanation: '「書類を翻訳しましょうか」→ それは時間の節約になるというBが正解。感謝+承諾の婉曲的な表現。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-offer-004',
    audioScript: "Shall I set up a conference call with the overseas office?",
    choices: [
      { text: "The overseas office is in Singapore.", isCorrect: false, trapType: 'topic-shift' },
      { text: "Actually, an in-person visit might work better.", isCorrect: true },
      { text: "Yes, please -- that would be helpful.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'offer',
    explanation: '「海外オフィスとのコンフェレンスコールを設定しましょうか」→ 実は対面の方がいいかもというBが正解。申し出への代替提案。',
    difficulty: 'hard',
    scoreLevel: 700,
    tip: '申し出への回答として「別の方法の方がいい」という代替提案は高難度パターン。',
  },
  {
    id: 'p2-offer-005',
    audioScript: "I can show you how to use the new invoicing software if you'd like.",
    choices: [
      { text: "The software is quite intuitive.", isCorrect: false, trapType: 'topic-shift' },
      { text: "I'd really appreciate that.", isCorrect: true },
      { text: "Invoices are processed monthly.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 1,
    questionType: 'offer',
    explanation: '「新しい請求ソフトの使い方を教えましょうか」→ ありがたいというBが正解。シンプルな承諾。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
];

// ---------------------------------------------------------------------------
// STATEMENT RESPONSES (10 questions)
// ---------------------------------------------------------------------------

const statementQuestions: Part2Drill[] = [
  {
    id: 'p2-stmt-001',
    audioScript: "I'm having trouble with the printer.",
    choices: [
      { text: "The printer is on the second floor.", isCorrect: false, trapType: 'topic-shift' },
      { text: "Have you tried restarting it?", isCorrect: true },
      { text: "We print documents every day.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 1,
    questionType: 'statement',
    explanation: '「プリンターで困ってる」→ 再起動してみた？という問題解決提案Bが正解。場所や説明はズレ。',
    difficulty: 'easy',
    scoreLevel: 400,
    tip: '陳述文への返答は「共感・提案・情報提供」のどれか。Yes/Noは使えない。',
  },
  {
    id: 'p2-stmt-002',
    audioScript: "The quarterly results look very promising.",
    choices: [
      { text: "Yes, the team has worked really hard.", isCorrect: true },
      { text: "Results are published every quarter.", isCorrect: false, trapType: 'verbatim' },
      { text: "The quarterly meeting is next week.", isCorrect: false, trapType: 'similar-sound' },
    ],
    correctIndex: 0,
    questionType: 'statement',
    explanation: '「四半期結果は有望そうだ」→ チームが頑張ったねという共感Aが正解。quarterlyを繰り返すB・Cは音罠。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-stmt-003',
    audioScript: "I left my badge at home this morning.",
    choices: [
      { text: "Badges are required for building access.", isCorrect: false, trapType: 'topic-shift' },
      { text: "You can get a temporary pass from security.", isCorrect: true },
      { text: "It's important not to forget it.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'statement',
    explanation: '「今朝バッジを家に忘れた」→ セキュリティで一時パスをもらえるという解決策Bが正解。説教(C)は的外れ。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-stmt-004',
    audioScript: "The new software update keeps crashing my computer.",
    choices: [
      { text: "Software updates are released regularly.", isCorrect: false, trapType: 'verbatim' },
      { text: "Have you reported it to IT support?", isCorrect: true },
      { text: "You should save your work often.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 1,
    questionType: 'statement',
    explanation: '「新しいソフトのアップデートでパソコンがクラッシュする」→ ITサポートに報告した？というBが正解。実用的な提案。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-stmt-005',
    audioScript: "Our biggest client just renewed their contract for another three years.",
    choices: [
      { text: "That's great news for the whole team.", isCorrect: true },
      { text: "Client contracts are typically annual.", isCorrect: false, trapType: 'verbatim' },
      { text: "We should contact more clients.", isCorrect: false, trapType: 'topic-shift' },
    ],
    correctIndex: 0,
    questionType: 'statement',
    explanation: '「最大のクライアントが3年更新した」→ チーム全体にとって素晴らしいニュースというAが正解。適切な反応。',
    difficulty: 'easy',
    scoreLevel: 400,
  },
  {
    id: 'p2-stmt-006',
    audioScript: "I don't think the current filing system is very efficient.",
    choices: [
      { text: "The filing system was set up three years ago.", isCorrect: false, trapType: 'topic-shift' },
      { text: "I agree -- we should probably digitize everything.", isCorrect: true },
      { text: "Filing is done by the administrative team.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 1,
    questionType: 'statement',
    explanation: '「現在のファイリングシステムはあまり効率的でないと思う」→ 同意してデジタル化を提案するBが正解。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-stmt-007',
    audioScript: "The conference room smells like paint.",
    choices: [
      { text: "They were repainting it last weekend.", isCorrect: true },
      { text: "Conference rooms should be reserved in advance.", isCorrect: false, trapType: 'topic-shift' },
      { text: "Paint is available in the supply room.", isCorrect: false, trapType: 'similar-sound' },
    ],
    correctIndex: 0,
    questionType: 'statement',
    explanation: '「会議室が塗料の臭いがする」→ 先週末に塗り替えたというAが正解。状況を説明する理由の回答。',
    difficulty: 'medium',
    scoreLevel: 600,
  },
  {
    id: 'p2-stmt-008',
    audioScript: "I noticed the office kitchen is out of coffee.",
    choices: [
      { text: "Coffee is purchased monthly.", isCorrect: false, trapType: 'topic-shift' },
      { text: "I'll add it to the supply order.", isCorrect: true },
      { text: "The kitchen was renovated recently.", isCorrect: false, trapType: 'similar-sound' },
    ],
    correctIndex: 1,
    questionType: 'statement',
    explanation: '「オフィスのキッチンのコーヒーが切れた」→ 備品注文に追加するというBが正解。問題を解決する自然な反応。',
    difficulty: 'medium',
    scoreLevel: 500,
  },
  {
    id: 'p2-stmt-009',
    audioScript: "Our presentation to the board went much better than expected.",
    choices: [
      { text: "Board presentations are always nerve-wracking.", isCorrect: false, trapType: 'topic-shift' },
      { text: "I'm glad to hear that -- what was the feedback?", isCorrect: true },
      { text: "The board meets quarterly.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 1,
    questionType: 'statement',
    explanation: '「役員へのプレゼンが予想以上に上手くいった」→ よかった、フィードバックは？という自然な会話の続きBが正解。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
  {
    id: 'p2-stmt-010',
    audioScript: "The merger negotiations have been going on for months.",
    choices: [
      { text: "I wonder when they'll reach an agreement.", isCorrect: true },
      { text: "Mergers require board approval.", isCorrect: false, trapType: 'topic-shift' },
      { text: "Negotiations are led by both legal teams.", isCorrect: false, trapType: 'verbatim' },
    ],
    correctIndex: 0,
    questionType: 'statement',
    explanation: '「合併交渉が何ヶ月も続いている」→ いつ合意に達するかと気にかけるAが正解。自然な会話の継続。',
    difficulty: 'hard',
    scoreLevel: 700,
  },
];

// ---------------------------------------------------------------------------
// COMBINE ALL DRILLS
// ---------------------------------------------------------------------------

export const PART2_DRILLS: Part2Drill[] = [
  ...whoQuestions,
  ...whatQuestions,
  ...whereQuestions,
  ...whenQuestions,
  ...whyQuestions,
  ...howQuestions,
  ...yesNoQuestions,
  ...negativeQuestions,
  ...tagQuestions,
  ...choiceQuestions,
  ...suggestionQuestions,
  ...requestQuestions,
  ...offerQuestions,
  ...statementQuestions,
];

// ---------------------------------------------------------------------------
// METADATA
// ---------------------------------------------------------------------------

export const PART2_QUESTION_TYPES: Record<Part2QuestionType, string> = {
  'wh-who': 'Who質問 (人)',
  'wh-what': 'What質問 (もの・こと)',
  'wh-where': 'Where質問 (場所)',
  'wh-when': 'When質問 (時)',
  'wh-why': 'Why質問 (理由)',
  'wh-how': 'How質問 (方法・量・程度)',
  'yes-no': 'Yes/No質問',
  'negative': '否定疑問文 ★最難関★',
  'tag': '付加疑問文',
  'choice': '選択疑問文 (A or B)',
  'suggestion': '提案 (Why don\'t we / Let\'s)',
  'request': '依頼 (Could you / Can you)',
  'offer': '申し出 (Would you like / Shall I)',
  'statement': '陳述文への反応',
};

export const PART2_TYPE_TIPS: Record<Part2QuestionType, string> = {
  'wh-who': '「人名・役職・部署」で返す。間接回答は「Ask HR」「I\'m not sure who」パターン。',
  'wh-what': '「もの・こと・状況」で返す。問題文の単語を繰り返す選択肢は音罠。',
  'wh-where': '「場所・方向」で返す。「Ask someone」系も場所の代替情報として正解になる。',
  'wh-when': '「日付・時刻・期間」で返す。「I\'ll check」も間接正解パターン。',
  'wh-why': '「理由・原因」で返す。Becauseで始まる選択肢は必ずしも正解じゃない。',
  'wh-how': 'how longは期間、how manyは数、how muchは金額、how oftenは頻度。それぞれ対応する答えを。',
  'yes-no': 'Yes/Noを言わない間接回答が多い。ストーリーを追う。問題文の単語繰り返し＝音罠。',
  'negative': '★最重要★ No=「そう、〜してない」、Yes=「いや、〜した」。日本語と逆。「Yes, it isn\'t」は矛盾。',
  'tag': '同意または訂正で返す。「Yes + 否定」「No + 肯定」は文法的矛盾で必ず不正解。',
  'choice': '「A or B?」にYes/Noで答えない。片方を選ぶか、「どちらでも」か、第三の選択肢。',
  'suggestion': '「Why don\'t we?」はなぜ？ではなく提案。Becauseで返すのは典型的な罠。',
  'request': '承諾・断り・条件付き承諾の3パターン。断りは直接「No」より「I\'m afraid I can\'t...」が多い。',
  'offer': '「Would you mind?」にNot at all=承諾。「Yes」=拒否。日本語感覚と逆。',
  'statement': '質問ではないのでYes/No不可。共感・提案・情報提供・質問で返す。',
};

// ---------------------------------------------------------------------------
// HELPER FUNCTIONS
// ---------------------------------------------------------------------------

export function getPart2DrillsByType(type: Part2QuestionType): Part2Drill[] {
  return PART2_DRILLS.filter(d => d.questionType === type);
}

export function getPart2DrillsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Part2Drill[] {
  return PART2_DRILLS.filter(d => d.difficulty === difficulty);
}

export function getRandomPart2Set(count: number): Part2Drill[] {
  const shuffled = [...PART2_DRILLS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, PART2_DRILLS.length));
}

export function getPart2DrillsByScore(level: 400 | 500 | 600 | 700 | 800): Part2Drill[] {
  return PART2_DRILLS.filter(d => d.scoreLevel === level);
}

export function getPart2Stats() {
  const byType = {} as Record<Part2QuestionType, number>;
  const byDifficulty = { easy: 0, medium: 0, hard: 0 };
  const byScore: Record<number, number> = { 400: 0, 500: 0, 600: 0, 700: 0, 800: 0 };

  for (const drill of PART2_DRILLS) {
    byType[drill.questionType] = (byType[drill.questionType] || 0) + 1;
    byDifficulty[drill.difficulty]++;
    byScore[drill.scoreLevel]++;
  }

  return { total: PART2_DRILLS.length, byType, byDifficulty, byScore };
}
