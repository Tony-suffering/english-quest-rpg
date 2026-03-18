// 居酒屋TOEIC -- 30-Day Program Plan

export interface DailyPhrase {
  english: string;
  japanese: string;
  usage: string;
}

export interface DayPlan {
  day: number;
  episodeId: string;
  weekNumber: 1 | 2 | 3 | 4 | 5;
  weekTheme: string;
  dayTitle: string;
  skill: string;
  outputType: 'shadow' | 'speak' | 'write' | 'paraphrase' | 'review';
  dailyPhrases: DailyPhrase[];
  unlocks?: string;
}

export const WEEK_THEMES = [
  { week: 1, title: 'Part 2 -- カウンターに座る', subtitle: '間接応答・WH疑問文・提案/申し出', color: '#D4AF37' },
  { week: 2, title: 'Part 3 -- 常連になる', subtitle: 'パラフレーズ・3人会話・先読み', color: '#10B981' },
  { week: 3, title: 'Part 4 -- 一人で聞ける', subtitle: 'アナウンス・留守電・グラフィック', color: '#3B82F6' },
  { week: 4, title: '総合力 -- 聞くから使うへ', subtitle: 'パラフレーズ発話・音変化・スピーキング', color: '#8B5CF6' },
  { week: 5, title: '卒業 -- マスターが認めた夜', subtitle: '試験前夜・秘密・卒業', color: '#D4AF37' },
];

export const THIRTY_DAY_PLAN: DayPlan[] = [
  // ══════════════════════════════════════════
  // Week 1 (Day 1-7): Part 2 -- カウンターに座る
  // ══════════════════════════════════════════
  {
    day: 1,
    episodeId: 'ep-001',
    weekNumber: 1,
    weekTheme: 'Part 2 -- カウンターに座る',
    dayTitle: '間接応答',
    skill: '間接応答の基本 -- 「答えない答え」を見抜く',
    outputType: 'shadow',
    dailyPhrases: [
      { english: "I'm not sure, but I think it's on the third floor.", japanese: '確かじゃないけど、3階だと思います。', usage: '直接答えず曖昧に返す典型パターン。Part 2頻出。' },
      { english: "You'd better ask the front desk.", japanese: 'フロントに聞いた方がいいですよ。', usage: '質問に直接答えず、別の人を紹介する間接応答。' },
      { english: "Let me check the schedule first.", japanese: 'まずスケジュールを確認させてください。', usage: '即答を避ける間接応答。Yes/Noを言わない。' },
      { english: "It depends on the manager's approval.", japanese: 'マネージャーの承認次第です。', usage: '条件付きで返す間接応答パターン。' },
      { english: "I thought it was moved to Friday.", japanese: '金曜日に変更になったと思ったけど。', usage: '記憶ベースで曖昧に返す。I thoughtが間接応答のサイン。' },
    ],
  },
  {
    day: 2,
    episodeId: 'ep-002',
    weekNumber: 1,
    weekTheme: 'Part 2 -- カウンターに座る',
    dayTitle: 'リピートトラップ',
    skill: '音の繰り返し罠 -- 同じ単語に騙されない',
    outputType: 'shadow',
    dailyPhrases: [
      { english: "The report is due by the end of the day.", japanese: '報告書は今日中が締め切りです。', usage: 'reportが聞こえたら選びがち。実際の答えは別。' },
      { english: "We should postpone the meeting until next week.", japanese: '会議は来週まで延期すべきです。', usage: 'meetingを含む選択肢がトラップ。正解はmeetingを言い換え。' },
      { english: "I haven't received the updated version yet.", japanese: 'まだ更新版を受け取っていません。', usage: 'version/updatedの繰り返しに注意。' },
      { english: "Could you send me the revised draft?", japanese: '修正版の草案を送ってもらえますか？', usage: 'revise/draftの音でひっかける典型パターン。' },
      { english: "The deadline was extended to Thursday.", japanese: '締め切りは木曜まで延長されました。', usage: 'deadlineが音声と選択肢両方に出るトラップ。' },
    ],
  },
  {
    day: 3,
    episodeId: 'ep-003',
    weekNumber: 1,
    weekTheme: 'Part 2 -- カウンターに座る',
    dayTitle: 'WH疑問文',
    skill: 'WH疑問文 -- 最初の一語で勝負が決まる',
    outputType: 'speak',
    dailyPhrases: [
      { english: "Where can I find the supply closet?", japanese: '備品室はどこですか？', usage: 'Whereで始まる → 場所を答える選択肢が正解。' },
      { english: "When is the training session scheduled?", japanese: '研修はいつ予定されていますか？', usage: 'Whenで始まる → 時間/日付の答えを探す。' },
      { english: "Who is in charge of the project?", japanese: 'プロジェクトの担当は誰ですか？', usage: 'Whoで始まる → 人名・役職が正解になる。' },
      { english: "Why was the shipment delayed?", japanese: 'なぜ出荷が遅れたのですか？', usage: 'Whyで始まる → 理由（Because/Due to）を探す。' },
      { english: "How long will the renovation take?", japanese: '改装にはどのくらいかかりますか？', usage: 'How longで始まる → 期間を答える。How+形容詞に注意。' },
    ],
  },
  {
    day: 4,
    episodeId: 'ep-004',
    weekNumber: 1,
    weekTheme: 'Part 2 -- カウンターに座る',
    dayTitle: '提案・申し出',
    skill: '提案と申し出 -- Would you like / Shall I パターン',
    outputType: 'speak',
    dailyPhrases: [
      { english: "Would you like me to set up the projector?", japanese: 'プロジェクターをセットしましょうか？', usage: 'Would you like me to ~ は申し出。That would be great.が典型正解。' },
      { english: "Shall I make copies for everyone?", japanese: '皆さん分のコピーを作りましょうか？', usage: 'Shall I ~ は申し出。Yes, please. / That would help. が正解。' },
      { english: "Why don't we take a break?", japanese: '休憩しませんか？', usage: 'Why don\'t we ~ は提案。That sounds good. / Good idea. が正解。' },
      { english: "How about scheduling it for next Monday?", japanese: '来週の月曜はどうですか？', usage: 'How about ~ は提案。日程系の返答か同意が正解。' },
      { english: "Do you want me to forward the email?", japanese: 'メールを転送しましょうか？', usage: 'Do you want me to ~ は申し出のカジュアル版。' },
    ],
  },
  {
    day: 5,
    episodeId: 'ep-005',
    weekNumber: 1,
    weekTheme: 'Part 2 -- カウンターに座る',
    dayTitle: 'ミニテスト',
    skill: 'Part 2 総合チェック -- Day 1-4 の復習',
    outputType: 'review',
    dailyPhrases: [
      { english: "Has the client confirmed the order yet?", japanese: 'クライアントはもう注文を確認しましたか？', usage: 'Yes/No疑問文だが間接応答もありうる。' },
      { english: "Where should I put these boxes?", japanese: 'この箱はどこに置けばいいですか？', usage: 'WH疑問文 + 場所。答えは具体的な場所名。' },
      { english: "Would you mind closing the window?", japanese: '窓を閉めていただけますか？', usage: '依頼表現。Not at all. / Sure. が典型正解。' },
      { english: "The printer isn't working again, is it?", japanese: 'またプリンターが動かないんじゃない？', usage: '付加疑問文。Yes/No + 追加情報が正解パターン。' },
      { english: "Who's going to lead the presentation?", japanese: 'プレゼンは誰が担当するの？', usage: 'Who疑問文。人名・I will / Ms. Kim will が典型。' },
    ],
  },
  {
    day: 6,
    episodeId: 'ep-021',
    weekNumber: 1,
    weekTheme: 'Part 2 -- カウンターに座る',
    dayTitle: '付加疑問文',
    skill: '付加疑問文 -- 語尾の確認に惑わされない',
    outputType: 'speak',
    dailyPhrases: [
      { english: "The meeting starts at 10, doesn't it?", japanese: '会議は10時からですよね？', usage: '付加疑問文。肯定で確認→Yes, that\'s right.が基本。' },
      { english: "You haven't sent the invoice yet, have you?", japanese: 'まだ請求書送ってないよね？', usage: '否定+付加疑問。No, not yet. / Actually, I already did.が正解。' },
      { english: "This is the right address, isn't it?", japanese: 'この住所で合ってますよね？', usage: '確認を求める付加疑問。Yes/Noどちらも正解になりうる。' },
      { english: "We need to finish by Friday, don't we?", japanese: '金曜までに終わらせないといけないよね？', usage: '義務の確認。Yes, the deadline is Friday.が典型正解。' },
      { english: "She used to work here, didn't she?", japanese: '彼女、ここで働いてたよね？', usage: '過去の確認。Yes, she left last year.のように追加情報付きが多い。' },
    ],
  },
  {
    day: 7,
    episodeId: 'ep-022',
    weekNumber: 1,
    weekTheme: 'Part 2 -- カウンターに座る',
    dayTitle: 'Part 2 総力戦',
    skill: 'Part 2 ボス戦 -- 全パターン混合演習',
    outputType: 'review',
    unlocks: 'Part 2 badge',
    dailyPhrases: [
      { english: "Didn't the supervisor approve the budget?", japanese: '上司は予算を承認しなかったの？', usage: '否定疑問文。Yes/Noが逆になりやすいトラップ。' },
      { english: "Should we order lunch now or wait?", japanese: '今昼食を注文する？それとも待つ？', usage: '選択疑問文。AかBか、または第三の選択肢が正解。' },
      { english: "I wonder if the package has arrived.", japanese: '荷物届いたかな。', usage: '平叙文の疑問。I\'ll check. / Let me look.が典型正解。' },
      { english: "How often do you travel for business?", japanese: 'どのくらいの頻度で出張しますか？', usage: 'How often → 頻度で答える。About twice a month.など。' },
      { english: "That was a productive meeting, wasn't it?", japanese: '生産的な会議だったよね？', usage: '感想+付加疑問。同意か、別の感想で返す。' },
    ],
  },

  // ══════════════════════════════════════════
  // Week 2 (Day 8-14): Part 3 -- 常連になる
  // ══════════════════════════════════════════
  {
    day: 8,
    episodeId: 'ep-006',
    weekNumber: 2,
    weekTheme: 'Part 3 -- 常連になる',
    dayTitle: 'パラフレーズの壁',
    skill: 'パラフレーズ -- 同じ意味の別表現を聞き取る',
    outputType: 'paraphrase',
    dailyPhrases: [
      { english: "We need to push back the deadline.", japanese: '締め切りを延期する必要があります。', usage: 'push back = postpone。パラフレーズの王道。' },
      { english: "The store is located right around the corner.", japanese: 'その店はすぐ角を曲がったところにあります。', usage: 'right around the corner = very close / nearby。' },
      { english: "I'm tied up in a meeting until three.", japanese: '3時まで会議で手が離せません。', usage: 'tied up = busy / unavailable。Part 3頻出。' },
      { english: "They've decided to go with a different vendor.", japanese: '彼らは別の業者にすることに決めました。', usage: 'go with = choose / select。ビジネス会話の定番。' },
      { english: "Let's touch base after the conference.", japanese: '会議の後に連絡を取り合いましょう。', usage: 'touch base = contact / check in with。' },
    ],
  },
  {
    day: 9,
    episodeId: 'ep-007',
    weekNumber: 2,
    weekTheme: 'Part 3 -- 常連になる',
    dayTitle: '3人会話',
    skill: '3人会話 -- 話者の切り替えを追う',
    outputType: 'shadow',
    dailyPhrases: [
      { english: "Actually, I was thinking we could try a new approach.", japanese: '実は、新しいアプローチを試せないかと思って。', usage: 'Actually は話題転換のサイン。3人目の発言でよく出る。' },
      { english: "That's a good point, but what about the cost?", japanese: 'いい指摘だけど、コストはどうなの？', usage: '同意→反論パターン。3人会話では立場の違いに注目。' },
      { english: "I agree with Sarah on this one.", japanese: 'この件はサラに賛成です。', usage: '誰に賛成しているか。話者の立場を追う練習。' },
      { english: "Why don't we ask the IT department?", japanese: 'IT部門に聞いてみたらどう？', usage: '3人目が新しい解決策を提案するパターン。' },
      { english: "Didn't we try that last quarter?", japanese: '前の四半期にそれ試さなかった？', usage: '過去の経験を持ち出す。3人会話の情報追加パターン。' },
    ],
  },
  {
    day: 10,
    episodeId: 'ep-008',
    weekNumber: 2,
    weekTheme: 'Part 3 -- 常連になる',
    dayTitle: '推測問題',
    skill: '推測問題 -- 「おそらく〜だろう」を聞き取る',
    outputType: 'speak',
    dailyPhrases: [
      { english: "The man most likely works in the accounting department.", japanese: 'その男性はおそらく経理部で働いている。', usage: 'most likely は推測問題のキーワード。直接言わない情報を推測。' },
      { english: "Based on the conversation, they will probably reschedule.", japanese: '会話から判断すると、おそらくスケジュールを変更するだろう。', usage: 'probably = 推測。会話全体から判断する問題。' },
      { english: "It can be inferred that the woman is a new employee.", japanese: 'その女性は新入社員だと推測できる。', usage: 'It can be inferred は推測問題の決まり文句。' },
      { english: "What does the man imply when he says...?", japanese: '男性が〜と言った時、何を暗示していますか？', usage: 'imply問題。言葉の裏にある意味を読む。' },
      { english: "The speakers are most likely at a restaurant.", japanese: '話者たちはおそらくレストランにいる。', usage: '場所の推測。menu/order/tableなどのキーワードから判断。' },
    ],
  },
  {
    day: 11,
    episodeId: 'ep-009',
    weekNumber: 2,
    weekTheme: 'Part 3 -- 常連になる',
    dayTitle: 'Part 2応用',
    skill: 'Part 2 応用 -- 平叙文の質問と否定疑問文',
    outputType: 'write',
    dailyPhrases: [
      { english: "The copier seems to be jammed again.", japanese: 'コピー機がまた詰まったみたい。', usage: '平叙文だが暗に「直して」という依頼。I\'ll take a look.が正解。' },
      { english: "I can't find the quarterly report anywhere.", japanese: '四半期報告書がどこにも見当たらない。', usage: '困っている状況を述べる→助けを申し出る応答が正解。' },
      { english: "Don't you think we should start earlier?", japanese: 'もっと早く始めるべきだと思わない？', usage: '否定疑問文。意見を求めている。同意/反対で答える。' },
      { english: "Isn't the conference room available tomorrow?", japanese: '明日会議室空いてないの？', usage: '否定疑問文。Yes/Noの意味が紛らわしいトラップ。' },
      { english: "There's no milk left in the break room.", japanese: '休憩室にミルクがなくなった。', usage: '状況報告→I\'ll pick some up.のような行動提案が正解。' },
    ],
  },
  {
    day: 12,
    episodeId: 'ep-010',
    weekNumber: 2,
    weekTheme: 'Part 3 -- 常連になる',
    dayTitle: '発話意図',
    skill: '発話意図 -- 「なぜそう言ったのか」を問う',
    outputType: 'speak',
    dailyPhrases: [
      { english: "What does the woman mean when she says, 'That's cutting it close'?", japanese: '女性が「ギリギリだね」と言った時、何を意味しているか？', usage: '意図問題の典型。idiomの意味を文脈から判断。' },
      { english: "Why does the man say, 'You can say that again'?", japanese: '男性はなぜ「まったくだ」と言ったのか？', usage: '強い同意を表すidiom。文字通りの意味ではない。' },
      { english: "What is implied by the phrase 'back to square one'?", japanese: '「振り出しに戻る」という表現で何が暗示されているか？', usage: '最初からやり直し。プロジェクトの失敗を暗示。' },
      { english: "The speaker says 'It's not set in stone' to indicate...", japanese: '「まだ確定じゃない」は〜を示すために言った。', usage: '変更可能であることを示す。柔軟性の暗示。' },
      { english: "By saying 'Let's sleep on it,' the man suggests...", japanese: '「一晩考えよう」と言って、男性は〜を提案している。', usage: '即決を避ける。慎重に考えたいという意図。' },
    ],
  },
  {
    day: 13,
    episodeId: 'ep-023',
    weekNumber: 2,
    weekTheme: 'Part 3 -- 常連になる',
    dayTitle: '先読みの極意',
    skill: '先読みテクニック -- 音声の前に設問を読む',
    outputType: 'write',
    dailyPhrases: [
      { english: "What are the speakers mainly discussing?", japanese: '話者たちは主に何について話していますか？', usage: '主題問題。会話の最初の数文で判断できることが多い。' },
      { english: "What does the man suggest they do?", japanese: '男性は何をすることを提案していますか？', usage: '提案問題。suggest/recommend/proposeがキーワード。' },
      { english: "What will the woman probably do next?", japanese: '女性はおそらく次に何をしますか？', usage: '次の行動問題。会話の最後に答えが来ることが多い。' },
      { english: "According to the man, what is the problem?", japanese: '男性によると、問題は何ですか？', usage: '問題特定。According to ~ で話者を限定。' },
      { english: "What does the woman offer to do?", japanese: '女性は何をすると申し出ていますか？', usage: '申し出問題。I\'ll / Let me / I can がサイン。' },
    ],
  },
  {
    day: 14,
    episodeId: 'ep-024',
    weekNumber: 2,
    weekTheme: 'Part 3 -- 常連になる',
    dayTitle: 'Part 3 総力戦',
    skill: 'Part 3 ボス戦 -- パラフレーズ+先読み混合演習',
    outputType: 'review',
    unlocks: 'Part 3 badge',
    dailyPhrases: [
      { english: "The woman mentions that the budget has been cut.", japanese: '女性は予算が削減されたと述べている。', usage: 'mentions = says / states。パラフレーズ問題。' },
      { english: "They agree to hold off on hiring until next quarter.", japanese: '来期まで採用を保留することに同意した。', usage: 'hold off on = delay / postpone。ビジネスパラフレーズ。' },
      { english: "What can be inferred about the man?", japanese: '男性について何が推測できますか？', usage: '推測問題。直接述べられていない情報を読む。' },
      { english: "The woman will most likely contact the supplier.", japanese: '女性はおそらくサプライヤーに連絡する。', usage: '次の行動推測。会話の最後の発言がヒント。' },
      { english: "They decided to go ahead with the original plan.", japanese: '彼らは当初の計画通り進めることに決めた。', usage: 'go ahead with = proceed with。決定問題の典型。' },
    ],
  },

  // ══════════════════════════════════════════
  // Week 3 (Day 15-21): Part 4 -- 一人で聞ける
  // ══════════════════════════════════════════
  {
    day: 15,
    episodeId: 'ep-011',
    weekNumber: 3,
    weekTheme: 'Part 4 -- 一人で聞ける',
    dayTitle: 'Part 3応用',
    skill: 'Part 3 応用 -- 複雑な会話の要点を掴む',
    outputType: 'shadow',
    dailyPhrases: [
      { english: "We're running behind schedule on the renovation.", japanese: '改装が予定より遅れています。', usage: 'running behind schedule = delayed。進捗報告の定番。' },
      { english: "I'll have the estimate ready by end of day.", japanese: '見積もりは今日中に準備します。', usage: 'estimate（見積もり）はTOEICビジネス会話の頻出語。' },
      { english: "The client wants to make some last-minute changes.", japanese: 'クライアントが直前の変更を希望しています。', usage: 'last-minute changes は問題発生を示すキーフレーズ。' },
      { english: "Let's go over the proposal one more time.", japanese: '提案書をもう一度確認しましょう。', usage: 'go over = review。確認作業を示す。' },
      { english: "Could you walk me through the new process?", japanese: '新しいプロセスを説明してもらえますか？', usage: 'walk me through = explain step by step。' },
    ],
  },
  {
    day: 16,
    episodeId: 'ep-012',
    weekNumber: 3,
    weekTheme: 'Part 4 -- 一人で聞ける',
    dayTitle: 'Part 4入門',
    skill: 'Part 4 入門 -- 一人の話者を長く聞く',
    outputType: 'shadow',
    dailyPhrases: [
      { english: "Good morning, everyone. Thank you for joining today's meeting.", japanese: '皆さん、おはようございます。本日の会議にご参加ありがとうございます。', usage: 'Part 4 会議冒頭の定番。話のジャンルを即判断する練習。' },
      { english: "I'd like to bring your attention to the sales figures.", japanese: '売上数字に注目していただきたいと思います。', usage: 'bring your attention to = 注目させる。プレゼンの導入。' },
      { english: "As you may already know, we've decided to expand.", japanese: 'ご存知かもしれませんが、拡大することに決めました。', usage: 'As you may know は前提共有。Part 4の冒頭パターン。' },
      { english: "Before we wrap up, are there any questions?", japanese: '終わる前に、質問はありますか？', usage: 'wrap up = finish / conclude。会議の締めくくり。' },
      { english: "Please don't hesitate to reach out if you need anything.", japanese: '何かあれば遠慮なくご連絡ください。', usage: 'don\'t hesitate to = feel free to。締めの定番表現。' },
    ],
  },
  {
    day: 17,
    episodeId: 'ep-013',
    weekNumber: 3,
    weekTheme: 'Part 4 -- 一人で聞ける',
    dayTitle: '意図問題',
    skill: '意図問題 Part 4 -- 話者の真意を読む',
    outputType: 'speak',
    dailyPhrases: [
      { english: "I hate to be the bearer of bad news, but...", japanese: '悪い知らせを伝えるのは嫌なんですが...', usage: '悪いニュースの前置き。but以降が本題。意図問題の定番。' },
      { english: "With that said, let's move on to the next item.", japanese: 'とはいえ、次の議題に移りましょう。', usage: 'With that said = 話題転換。前の話を締めくくる合図。' },
      { english: "I'm glad you brought that up.", japanese: 'その点を挙げてくれて嬉しいです。', usage: '相手の発言を肯定しつつ話を広げる。意図は同意+追加。' },
      { english: "That's easier said than done.", japanese: '言うは易く行うは難し。', usage: '理論と実践のギャップを指摘。反対意見の柔らかい表現。' },
      { english: "Let's not get ahead of ourselves.", japanese: '先走りすぎないようにしましょう。', usage: '慎重さを促す。計画の早すぎる進行を抑える意図。' },
    ],
  },
  {
    day: 18,
    episodeId: 'ep-014',
    weekNumber: 3,
    weekTheme: 'Part 4 -- 一人で聞ける',
    dayTitle: '模試形式',
    skill: '模試形式 -- 本番と同じ流れで解く',
    outputType: 'write',
    dailyPhrases: [
      { english: "Attention, shoppers. The store will be closing in 15 minutes.", japanese: 'お客様にお知らせです。閉店まであと15分です。', usage: 'Attention は店内アナウンスの開始合図。Part 4頻出。' },
      { english: "Due to construction, the east entrance will be closed.", japanese: '工事のため、東側入口は閉鎖されます。', usage: 'Due to ~ は原因説明。アナウンス問題の定番。' },
      { english: "For more information, please visit our website.", japanese: '詳細はウェブサイトをご覧ください。', usage: 'アナウンスの締めくくり。追加情報の案内。' },
      { english: "We apologize for any inconvenience this may cause.", japanese: 'ご不便をおかけして申し訳ございません。', usage: '問題報告後の定番フレーズ。トラブル系アナウンス。' },
      { english: "All employees are required to attend the safety briefing.", japanese: '全従業員は安全説明会への出席が必要です。', usage: 'are required to = must。義務を伝える社内アナウンス。' },
    ],
  },
  {
    day: 19,
    episodeId: 'ep-015',
    weekNumber: 3,
    weekTheme: 'Part 4 -- 一人で聞ける',
    dayTitle: '先読みテクニック',
    skill: '先読み Part 4 -- 設問から話の展開を予測する',
    outputType: 'paraphrase',
    dailyPhrases: [
      { english: "What is the purpose of the announcement?", japanese: 'アナウンスの目的は何ですか？', usage: '目的問題。最初の1-2文で判断。先読みで予測可能。' },
      { english: "What are listeners asked to do?", japanese: '聞き手は何をするよう求められていますか？', usage: '行動要求問題。please/should/mustがヒント。' },
      { english: "According to the speaker, what has changed?", japanese: '話者によると、何が変わりましたか？', usage: '変更点問題。however/but/now が変更の合図。' },
      { english: "What will happen next Tuesday?", japanese: '来週火曜日に何が起こりますか？', usage: '具体日時問題。先読みで火曜日を待ち構える。' },
      { english: "Who most likely is the speaker?", japanese: '話者はおそらく誰ですか？', usage: '話者推測。職業・場所・語彙から判断する。' },
    ],
  },
  {
    day: 20,
    episodeId: 'ep-016',
    weekNumber: 3,
    weekTheme: 'Part 4 -- 一人で聞ける',
    dayTitle: '留守電',
    skill: '留守電メッセージ -- 要件と折り返し先を掴む',
    outputType: 'write',
    dailyPhrases: [
      { english: "Hi, this is Karen from Westside Dental calling about your appointment.", japanese: 'こんにちは、ウエストサイド歯科のカレンです。予約の件でお電話しています。', usage: '留守電の冒頭パターン。名前+所属+用件。' },
      { english: "I'm calling to let you know that your order is ready for pickup.", japanese: 'ご注文の商品が受け取り可能になりましたのでお知らせします。', usage: 'calling to let you know = 通知目的の留守電。' },
      { english: "Please give me a call back at 555-0142.", japanese: '555-0142に折り返しお電話ください。', usage: '折り返し番号。数字のリスニングが問われる。' },
      { english: "If I don't hear from you by Friday, I'll assume the original time works.", japanese: '金曜までにご連絡がなければ、元の時間で大丈夫と判断します。', usage: '条件付き確認。「連絡がなければ」パターン。' },
      { english: "I'll be in the office until five today if you'd like to discuss this further.", japanese: '詳しくお話しされたい場合、今日5時までオフィスにいます。', usage: '対応可能時間の案内。留守電の締めくくりパターン。' },
    ],
  },
  {
    day: 21,
    episodeId: 'ep-025',
    weekNumber: 3,
    weekTheme: 'Part 4 -- 一人で聞ける',
    dayTitle: 'Part 4 総力戦',
    skill: 'Part 4 ボス戦 -- アナウンス+留守電+会議混合',
    outputType: 'review',
    unlocks: 'Part 4 badge',
    dailyPhrases: [
      { english: "This is to remind you that the deadline for submissions is this Friday.", japanese: '提出期限が今週金曜であることをお知らせします。', usage: 'This is to remind you = リマインダー型アナウンス。' },
      { english: "We've received several complaints regarding the new policy.", japanese: '新方針について苦情が複数寄せられています。', usage: '問題提起。complaints/concerns/issuesが問題系キーワード。' },
      { english: "I wanted to follow up on our conversation from yesterday.", japanese: '昨日の会話のフォローアップをしたくて。', usage: 'follow up on = 前回の話の続き。留守電の定番。' },
      { english: "Going forward, all requests must be submitted online.", japanese: '今後、全てのリクエストはオンラインで提出してください。', usage: 'Going forward = from now on。変更通知のキーフレーズ。' },
      { english: "On behalf of the entire team, I'd like to thank you for your support.", japanese: 'チーム全員を代表して、ご支援に感謝します。', usage: 'On behalf of = 〜を代表して。スピーチの定番。' },
    ],
  },

  // ══════════════════════════════════════════
  // Week 4 (Day 22-28): 総合力 -- 聞くから使うへ
  // ══════════════════════════════════════════
  {
    day: 22,
    episodeId: 'ep-017',
    weekNumber: 4,
    weekTheme: '総合力 -- 聞くから使うへ',
    dayTitle: 'グラフィック問題',
    skill: 'グラフィック問題 -- 図表と音声を同時に処理する',
    outputType: 'speak',
    dailyPhrases: [
      { english: "Look at the graphic. Which department exceeded its target?", japanese: '図を見てください。どの部署が目標を超えましたか？', usage: 'グラフィック問題。音声と図の両方から情報を合わせる。' },
      { english: "According to the chart, sales increased by 15 percent.", japanese: 'グラフによると、売上は15%増加した。', usage: 'According to the chart は図表参照のサイン。' },
      { english: "The price listed for the deluxe package is $299.", japanese: 'デラックスパッケージの表示価格は299ドルです。', usage: '価格表問題。音声の情報で正しい行を特定する。' },
      { english: "Based on the schedule, the workshop starts at 2 PM.", japanese: 'スケジュールによると、ワークショップは午後2時開始。', usage: 'スケジュール表問題。時間と内容の照合。' },
      { english: "Which floor is the human resources department on?", japanese: '人事部は何階ですか？', usage: 'フロアマップ問題。場所と部署名の照合。' },
    ],
  },
  {
    day: 23,
    episodeId: 'ep-018',
    weekNumber: 4,
    weekTheme: '総合力 -- 聞くから使うへ',
    dayTitle: 'アナウンス応用',
    skill: 'アナウンス応用 -- 複雑な情報を整理して聞く',
    outputType: 'paraphrase',
    dailyPhrases: [
      { english: "Passengers on Flight 247 to Chicago, your gate has been changed to B12.", japanese: 'シカゴ行き247便のお客様、搭乗口がB12に変更になりました。', usage: '空港アナウンス。便名+変更情報の組み合わせ。' },
      { english: "The workshop originally scheduled for Room 3 will now be held in the auditorium.", japanese: '会議室3で予定されていたワークショップは講堂で行われます。', usage: '場所変更アナウンス。originally → now の対比。' },
      { english: "Complimentary refreshments will be available in the lobby.", japanese: 'ロビーで無料の軽食をご用意しています。', usage: 'complimentary = free。ホテル/会議のアナウンス。' },
      { english: "Please note that the parking garage will be closed for maintenance this weekend.", japanese: '今週末、駐車場はメンテナンスのため閉鎖されますのでご注意ください。', usage: 'Please note that = 重要情報の前置き。' },
      { english: "For those of you attending the reception, it begins at six in the Maple Room.", japanese: 'レセプションにご出席の方、メイプルルームで6時から始まります。', usage: 'For those of you = 対象者を限定。複数イベントの区別。' },
    ],
  },
  {
    day: 24,
    episodeId: 'ep-026',
    weekNumber: 4,
    weekTheme: '総合力 -- 聞くから使うへ',
    dayTitle: 'パラフレーズ道場',
    skill: 'パラフレーズ発話 -- 聞いた表現を自分の言葉で言い換える',
    outputType: 'paraphrase',
    dailyPhrases: [
      { english: "The project is on track. → We're making good progress on the project.", japanese: 'プロジェクトは順調です。→ プロジェクトは順調に進んでいます。', usage: 'on track = making good progress。同じ意味の言い換え練習。' },
      { english: "We need to cut costs. → We have to reduce our expenses.", japanese: 'コスト削減が必要だ。→ 支出を減らさなければならない。', usage: 'cut costs = reduce expenses。ビジネス頻出パラフレーズ。' },
      { english: "She's in charge of marketing. → She heads up the marketing department.", japanese: '彼女はマーケティング担当だ。→ 彼女がマーケティング部門を率いている。', usage: 'in charge of = heads up。役職の言い換え。' },
      { english: "The event was called off. → They canceled the event.", japanese: 'イベントは中止になった。→ 彼らはイベントをキャンセルした。', usage: 'called off = canceled。phrasal verb → 一語動詞。' },
      { english: "I'll get back to you. → I'll follow up with you later.", japanese: '折り返します。→ 後ほどフォローアップします。', usage: 'get back to = follow up with。ビジネス応答の言い換え。' },
    ],
  },
  {
    day: 25,
    episodeId: 'ep-027',
    weekNumber: 4,
    weekTheme: '総合力 -- 聞くから使うへ',
    dayTitle: '音変化マスター',
    skill: '音変化 -- リンキング・リダクション・フラッピング',
    outputType: 'shadow',
    dailyPhrases: [
      { english: "I'm gonna have to get back to you on that.", japanese: 'それについては折り返しますね。', usage: 'gonna = going to。リダクション。TOEICでも自然な発音で出る。' },
      { english: "Could you tell him I called?", japanese: '電話があったと伝えてもらえますか？', usage: 'tell him → テリム。リンキング。h音が消える。' },
      { english: "We need to sort it out before the deadline.", japanese: '締め切り前に解決する必要がある。', usage: 'sort it out → ソーリラウト。t+母音のフラッピング。' },
      { english: "What do you think about the new proposal?", japanese: '新しい提案についてどう思いますか？', usage: 'What do you → ワダヤ。連結+リダクション。' },
      { english: "I should have mentioned it earlier.", japanese: 'もっと早く言っておくべきだった。', usage: 'should have → シュダブ。have の弱形。' },
    ],
  },
  {
    day: 26,
    episodeId: 'ep-028',
    weekNumber: 4,
    weekTheme: '総合力 -- 聞くから使うへ',
    dayTitle: 'スピーキング実践',
    skill: 'スピーキング -- 音声の話者になりきって答える',
    outputType: 'speak',
    dailyPhrases: [
      { english: "I'd recommend going with the second option.", japanese: '2番目の選択肢をお勧めします。', usage: '推薦表現。自分が話者として意見を述べる練習。' },
      { english: "That works for me. What time should we meet?", japanese: 'それで大丈夫です。何時に会いましょうか？', usage: '同意+提案。自然な会話の流れを作る。' },
      { english: "I'm afraid that won't be possible on such short notice.", japanese: '急なご依頼では難しいと思います。', usage: 'I\'m afraid = 丁寧な断り。ビジネスの柔らかい拒否。' },
      { english: "Let me double-check with my supervisor and get back to you.", japanese: '上司に確認して折り返します。', usage: '即答を避ける丁寧な応答。ビジネスの定番。' },
      { english: "Actually, I was wondering if we could push it to Thursday.", japanese: '実は、木曜日にずらせないかと思っていたんですが。', usage: 'I was wondering if = 控えめな提案。丁寧度が高い。' },
    ],
  },
  {
    day: 27,
    episodeId: 'ep-029',
    weekNumber: 4,
    weekTheme: '総合力 -- 聞くから使うへ',
    dayTitle: '総合模試',
    skill: '総合模試 -- Part 2/3/4 混合フルセット',
    outputType: 'review',
    dailyPhrases: [
      { english: "The quarterly results exceeded our expectations.", japanese: '四半期の業績は期待を上回りました。', usage: 'exceeded expectations = did better than expected。成果報告。' },
      { english: "We're looking into alternative suppliers.", japanese: '代替サプライヤーを検討しています。', usage: 'looking into = investigating / considering。調査中。' },
      { english: "The renovation should be completed by the end of March.", japanese: '改装は3月末までに完了する予定です。', usage: 'should be completed by = 完了予定。スケジュール表現。' },
      { english: "I'll send out the meeting minutes by end of day.", japanese: '議事録は今日中に送ります。', usage: 'meeting minutes = 議事録。send out = distribute。' },
      { english: "Have you had a chance to review the contract?", japanese: '契約書を確認する時間はありましたか？', usage: 'Have you had a chance to = 丁寧に確認を促す。催促の婉曲表現。' },
    ],
  },
  {
    day: 28,
    episodeId: 'ep-030',
    weekNumber: 4,
    weekTheme: '総合力 -- 聞くから使うへ',
    dayTitle: '弱点克服ナイト',
    skill: '弱点克服 -- 苦手パターンを集中的に潰す',
    outputType: 'review',
    unlocks: 'Full mock access',
    dailyPhrases: [
      { english: "I keep confusing 'affect' and 'effect' in listening.", japanese: 'リスニングで affect と effect を混同し続けている。', usage: '似た音の単語ペア。Part 2/3で頻出の聞き間違いパターン。' },
      { english: "The key is to listen for the first word of the response.", japanese: '回答の最初の一語を聞くのがコツ。', usage: 'Part 2攻略法。最初の一語でYes/No/間接を判断。' },
      { english: "Don't try to understand every word -- focus on the main idea.", japanese: '全部聞き取ろうとしない。メインアイデアに集中する。', usage: 'Part 3/4の鉄則。完璧主義を捨てる。' },
      { english: "Practice with 1.2x speed to build your processing capacity.", japanese: '1.2倍速で練習して処理能力を上げる。', usage: '速聴トレーニング。本番が楽に聞こえるようになる。' },
      { english: "Review your mistakes -- they show you exactly where to focus.", japanese: '間違いを復習する。どこに集中すべきかを正確に教えてくれる。', usage: '復習の重要性。弱点を可視化する。' },
    ],
  },

  // ══════════════════════════════════════════
  // Week 5 (Day 29-30): 卒業
  // ══════════════════════════════════════════
  {
    day: 29,
    episodeId: 'ep-019',
    weekNumber: 5,
    weekTheme: '卒業 -- マスターが認めた夜',
    dayTitle: '試験前夜',
    skill: '試験前夜 -- メンタルと最終チェック',
    outputType: 'shadow',
    dailyPhrases: [
      { english: "Trust the process. You've put in the work.", japanese: 'プロセスを信じろ。やるべきことはやった。', usage: 'マスターの言葉。試験前のメンタル管理。' },
      { english: "Don't cram the night before -- just review your notes.", japanese: '前日の詰め込みはするな。ノートを見返すだけでいい。', usage: '試験前日のアドバイス。軽い復習のみ。' },
      { english: "Get a good night's sleep. Your brain needs rest to perform.", japanese: 'しっかり寝ろ。脳はパフォーマンスのために休息が必要だ。', usage: '睡眠の重要性。認知機能と休息の関係。' },
      { english: "Read the questions before the audio starts playing.", japanese: '音声が流れる前に設問を読め。', usage: '先読みの最終確認。Part 3/4の生命線。' },
      { english: "You're more prepared than you think you are.", japanese: '自分が思っている以上に準備はできている。', usage: 'マスターの激励。自信を持って臨む。' },
    ],
  },
  {
    day: 30,
    episodeId: 'ep-020',
    weekNumber: 5,
    weekTheme: '卒業 -- マスターが認めた夜',
    dayTitle: 'マスターの秘密・卒業',
    skill: '卒業 -- マスターの秘密と次のステージ',
    outputType: 'review',
    unlocks: 'Graduation certificate',
    dailyPhrases: [
      { english: "The secret is consistency, not intensity.", japanese: '秘密は激しさではなく、継続だ。', usage: 'マスターの秘密。毎日の積み重ねが最強。' },
      { english: "I used to struggle with listening too, you know.", japanese: '俺もリスニングで苦しんでたんだよ。', usage: 'マスターの過去。満点講師も最初は苦手だった。' },
      { english: "From today, you're not a student. You're a regular.", japanese: '今日から、お前は生徒じゃない。常連だ。', usage: 'マスターの卒業認定。居酒屋の常連として認められる。' },
      { english: "The real test isn't the score -- it's whether you keep going.", japanese: '本当のテストはスコアじゃない。続けるかどうかだ。', usage: 'プログラム後の心構え。学習は終わりではない。' },
      { english: "Same seat, same beer, same time next week?", japanese: '来週も同じ席、同じビール、同じ時間で？', usage: 'マスターの最後のセリフ。居酒屋は常にここにある。' },
    ],
  },
];

// ── Helper Functions ──

export function getDayPlan(day: number): DayPlan | undefined {
  return THIRTY_DAY_PLAN.find(d => d.day === day);
}

export function getWeekDays(week: number): DayPlan[] {
  return THIRTY_DAY_PLAN.filter(d => d.weekNumber === week);
}

const STORAGE_KEY = 'izakaya_30day_progress';

function loadProgress(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveProgressData(days: number[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(days));
}

export function getCompletedDays(): number[] {
  return loadProgress();
}

export function markDayComplete(day: number): void {
  const days = loadProgress();
  if (!days.includes(day)) {
    days.push(day);
    days.sort((a, b) => a - b);
    saveProgressData(days);
  }
}

export function isDayComplete(day: number): boolean {
  return loadProgress().includes(day);
}

export function getStreakDays(): number {
  const completed = loadProgress().sort((a, b) => a - b);
  if (completed.length === 0) return 0;
  let streak = 1;
  for (let i = completed.length - 1; i > 0; i--) {
    if (completed[i] - completed[i - 1] === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export function getProgramProgress(): { completed: number; total: 30; percentage: number } {
  const completed = loadProgress().length;
  return { completed, total: 30, percentage: Math.round((completed / 30) * 100) };
}
